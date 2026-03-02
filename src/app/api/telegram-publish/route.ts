import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { createClient } from '@sanity/client'
import { requireInternalAuth } from '@/lib/api-auth'
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 30

// ─────────────────────────────────────────────
// PROMPT MAESTRO
// Genera un resumen optimizado para Telegram con la estrategia correcta,
// emojis relevantes, formato y un CTA con enlace al blog.
// ─────────────────────────────────────────────
function buildMasterPrompt(post: {
  title: string
  content: string
  slug: string
  category: string
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.juanarangoecommerce.com'
  const postUrl = `${baseUrl}/blog/${post.slug}`

  return `Eres el Community Manager experto de "Juan Arango | IA | Ecommerce" — un canal de Telegram sobre ecommerce, 
inteligencia artificial y estrategias para vender más en internet.

Tu misión: convertir el siguiente artículo de blog en un POST VIRAL e INFORMATIVO para la comunidad de Telegram.

💡 DETALLE DE CATEGORÍA: 
El post pertenece a la categoría: "${post.category}". 
- Si es una noticia o actualización de IA, el tono debe ser urgente e informativo ("Última hora").
- Si es un tutorial o guía, el tono debe ser educativo y práctico.
- Si es opinión o estrategia, el tono debe ser analítico y de autoridad.

📋 DATOS DEL ARTÍCULO:
Título: ${post.title}
Categoría: ${post.category}
URL: ${postUrl}
Contenido (extracto):
${post.content.slice(0, 2500)}

📐 REGLAS DE FORMATO OBLIGATORIAS (Markdown de Telegram):
- Usa *texto* para negrita (NO **doble asterisco**)
- Usa emojis estratégicos al inicio de cada sección para dinamismo visual
- Máximo 900 caracteres en total (sin contar el enlace)
- PROHIBIDO USAR HASHTAGS (#). No incluyas ningún hashtag en todo el post.
- El enlace al artículo va exclusivamente en la última línea.

🎯 ESTRUCTURA DEL POST (ÚSA ESTA EXACTAMENTE):
1. GANCHO (1 línea): Una pregunta o afirmación provocadora sobre el tema adaptada a la categoría. Usa un emoji.
2. CONTEXTO (2-3 líneas): Por qué el tema es relevante AHORA para tu audiencia.
3. LO QUE VAN A ENCONTRAR (2-4 bullets): Los 3-4 puntos más valiosos del artículo, con emoji por cada uno.
4. CTA (1 línea clara): Llamada a la acción invitando a ampliar la información. Ej: "👇 Para ampliar esta información y leer el análisis completo, haz clic aquí:"
5. ENLACE DIRECTO: ${postUrl}

⚠️ IMPORTANTE:
- Escribe en español latinoamericano, tono cercano pero muy profesional
- Evita el exceso de emojis (máx. 1 por línea)
- NO inventes información que no esté en el artículo
- Nunca incluyas hashtags en la respuesta

Responde SOLO con el texto del post formateado, sin explicaciones ni saludos previos.`
}

// ─────────────────────────────────────────────
// POST Handler
// ─────────────────────────────────────────────
export async function POST(req: Request) {
  const authError = requireInternalAuth(req);
  if (authError) return authError;

  try {
    // 1. Parse body
    const { postId } = await req.json()
    if (!postId) {
      return NextResponse.json({ error: 'Falta el postId' }, { status: 400 })
    }

    // Validate env vars
    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const channelId = process.env.TELEGRAM_CHANNEL_ID
    if (!botToken || !channelId) {
      return NextResponse.json(
        { error: 'Faltan variables de entorno: TELEGRAM_BOT_TOKEN o TELEGRAM_CHANNEL_ID' },
        { status: 500 }
      )
    }
    if (!process.env.GOOGLE_API_KEY) {
      return NextResponse.json({ error: 'Falta GOOGLE_API_KEY' }, { status: 500 })
    }

    // Initialize clients purely at runtime to avoid Next.js build-time errors
    // Initialize clients purely at runtime to avoid Next.js build-time errors
    const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
    const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET

    if (!projectId || !dataset) {
      return NextResponse.json(
        { error: 'Faltan variables de entorno de Sanity (Project ID o Dataset)' },
        { status: 500 }
      )
    }

    const sanity = createClient({
      projectId,
      dataset,
      apiVersion: '2024-01-01',
      useCdn: false,
      token: process.env.SANITY_API_TOKEN,
    })

    const gemini = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY })

    // 2. Fetch post from Sanity
    const post = await sanity.fetch(
      `*[_id == $id || _id == $draftId][0]{
        title,
        "slug": slug.current,
        category,
        content,
        body
      }`,
      { id: postId, draftId: `drafts.${postId}` }
    )

    if (!post) {
      return NextResponse.json({ error: 'Post no encontrado en Sanity' }, { status: 404 })
    }

    const postTitle = post.title || 'Sin título'
    const postSlug = post.slug || ''
    const postCategory = post.category || 'ecommerce'

    // Prefer markdown content, fall back to extracting text from portable text body
    let rawContent = post.content || ''
    if (!rawContent && Array.isArray(post.body)) {
      rawContent = post.body
        .filter((b: any) => b._type === 'block')
        .flatMap((b: any) => b.children?.map((c: any) => c.text || '') ?? [])
        .join(' ')
    }

    if (!rawContent || rawContent.length < 30) {
      return NextResponse.json(
        { error: 'El post no tiene contenido suficiente para generar un resumen' },
        { status: 422 }
      )
    }

    // 3. Generate summary with Gemini
    const prompt = buildMasterPrompt({
      title: postTitle,
      content: rawContent,
      slug: postSlug,
      category: postCategory,
    })

    const geminiResponse = await gemini.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    } as any)

    // Robust text extraction
    let telegramText = ''
    // @ts-ignore
    if (typeof geminiResponse.text === 'function') {
      // @ts-ignore
      telegramText = geminiResponse.text()
    } else if (typeof geminiResponse.text === 'string') {
      telegramText = geminiResponse.text
    } else if (geminiResponse.candidates?.[0]?.content?.parts?.[0]?.text) {
      telegramText = geminiResponse.candidates[0].content.parts[0].text
    }

    if (!telegramText || telegramText.length < 50) {
      return NextResponse.json(
        { error: 'Gemini no generó un resumen válido. Intenta de nuevo.' },
        { status: 502 }
      )
    }

    // 4. Publish to Telegram
    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`
    const telegramPayload = {
      chat_id: channelId,
      text: telegramText,
      parse_mode: 'Markdown',
      // Disable web preview for the link preview to appear cleanly
      link_preview_options: { is_disabled: false },
    }

    const telegramRes = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(telegramPayload),
    })

    if (!telegramRes.ok) {
      const telegramErr = await telegramRes.json().catch(() => ({}))
      console.error('Telegram API error:', telegramErr)
      return NextResponse.json(
        { error: `Error de Telegram: ${telegramErr?.description || telegramRes.statusText}` },
        { status: 502 }
      )
    }

    const telegramData = await telegramRes.json()

    return NextResponse.json({
      success: true,
      message: '¡Publicado exitosamente en el canal de Telegram!',
      messageId: telegramData.result?.message_id,
      preview: telegramText.slice(0, 200) + '...',
    })
  } catch (error: any) {
    console.error('❌ telegram-publish error:', error)
    return NextResponse.json({ error: error.message || 'Error desconocido' }, { status: 500 })
  }
}
