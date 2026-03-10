import { NextResponse } from 'next/server'
import { createClient } from '@sanity/client'
import { requireInternalAuth } from '@/lib/api-auth'
import { checkRateLimit } from '@/lib/rate-limit'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

export async function POST(req: Request) {
  const authError = requireInternalAuth(req)
  if (authError) return authError

  // Rate limit: 5 per hour
  const token = req.headers.get('Authorization') ?? 'anon'
  const rl = checkRateLimit(`telegram-prompt:${token}`, 5, 60 * 60 * 1000)
  if (!rl.allowed) {
    return NextResponse.json(
      { error: `Demasiadas publicaciones. Reintenta en ${rl.retryAfter}s.` },
      { status: 429 }
    )
  }

  try {
    const { promptId } = await req.json()
    if (!promptId) {
      return NextResponse.json({ error: 'Falta el promptId' }, { status: 400 })
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const channelId = process.env.TELEGRAM_CHANNEL_ID
    if (!botToken || !channelId) {
      return NextResponse.json(
        { error: 'Faltan variables de entorno: TELEGRAM_BOT_TOKEN o TELEGRAM_CHANNEL_ID' },
        { status: 500 }
      )
    }

    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
    if (!projectId || !dataset) {
      return NextResponse.json({ error: 'Faltan variables de entorno de Sanity' }, { status: 500 })
    }

    const sanity = createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    })

    // Fetch the prompt from Sanity (also try draft version)
    const prompt = await sanity.fetch(
      `*[(_id == $id || _id == $draftId) && _type == "promptGallery"][0]{
        title,
        prompt,
        tool,
        category,
        "imageUrl": image.asset->url
      }`,
      { id: promptId, draftId: `drafts.${promptId}` }
    )

    if (!prompt) {
      return NextResponse.json({ error: 'Prompt no encontrado en Sanity' }, { status: 404 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.juanarangoecommerce.com'
    const promptsUrl = `${baseUrl}/blog/prompts`

    // Category emoji mapping
    const categoryEmoji: Record<string, string> = {
      imagenes: '🖼️',
      apps: '📱',
      desarrollo: '💻',
      marketing: '📣',
      video: '🎬',
      texto: '✍️',
    }
    const catEmoji = prompt.category ? (categoryEmoji[prompt.category] ?? '✨') : '✨'

    // Build Telegram message — image + prompt text + link
    const messageText = [
      `${catEmoji} *${prompt.title}*`,
      '',
      '🤖 _Herramienta:_ ' + (prompt.tool || 'IA'),
      '',
      '📋 *Prompt listo para copiar:*',
      '`' + (prompt.prompt || '').slice(0, 800) + (prompt.prompt?.length > 800 ? '...' : '') + '`',
      '',
      '👉 Ver más prompts gratuitos:',
      promptsUrl,
    ].join('\n')

    let telegramRes: Response
    let telegramData: any

    if (prompt.imageUrl) {
      // Send photo with caption
      const photoUrl = `https://api.telegram.org/bot${botToken}/sendPhoto`
      telegramRes = await fetch(photoUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: channelId,
          photo: prompt.imageUrl,
          caption: messageText,
          parse_mode: 'Markdown',
        }),
      })
    } else {
      // Send plain text if no image
      const textUrl = `https://api.telegram.org/bot${botToken}/sendMessage`
      telegramRes = await fetch(textUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: channelId,
          text: messageText,
          parse_mode: 'Markdown',
        }),
      })
    }

    if (!telegramRes.ok) {
      const telegramErr = await telegramRes.json().catch(() => ({}))
      console.error('Telegram API error:', telegramErr)
      return NextResponse.json(
        { error: `Error de Telegram: ${telegramErr?.description || telegramRes.statusText}` },
        { status: 502 }
      )
    }

    telegramData = await telegramRes.json()

    return NextResponse.json({
      success: true,
      message: '¡Prompt publicado en el canal de Telegram!',
      messageId: telegramData.result?.message_id,
      preview: messageText.slice(0, 200) + '...',
    })
  } catch (error: any) {
    console.error('❌ telegram-prompt-publish error:', error)
    return NextResponse.json({ error: error.message || 'Error desconocido' }, { status: 500 })
  }
}
