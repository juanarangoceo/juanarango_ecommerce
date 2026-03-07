import { NextResponse } from 'next/server'
import { GoogleGenAI } from '@google/genai'
import { createClient } from '@sanity/client'
import { requireInternalAuth } from '@/lib/api-auth'
import { checkRateLimit } from '@/lib/rate-limit'
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
  const postUrl = post.category
    ? `${baseUrl}/blog/${post.category}/${post.slug}`
    : `${baseUrl}/blog/${post.slug}`

  return `Eres Juan Arango — consultor de ecommerce e IA, con un canal de Telegram donde compartes conocimiento directo, sin rodeos y con personalidad.

Tu misión: escribir un POST NATIVO DE TELEGRAM que resuma de forma entretenida e informativa el siguiente artículo de blog. NO es un anuncio ni una invitación a leer el blog. Es el conocimiento destilado del artículo, presentado de forma que la persona aprenda algo valioso sin necesidad de salir de Telegram.

📋 DATOS DEL ARTÍCULO:
Título: ${post.title}
Categoría: ${post.category}
Contenido:
${post.content.slice(0, 3000)}

━━━━━━━━━━━━━━━━━━━
VOZ Y ESTILO
━━━━━━━━━━━━━━━━━━━
- Escribe en primera persona como Juan Arango. Tono directo, conversacional, con carácter.
- Usa *negrita* (un solo asterisco) para marcar los conceptos más importantes.
- Usa emojis de forma natural y estratégica — no uno por línea, sino donde añadan energía o claridad visual. Entre 5 y 10 emojis en todo el post.
- Lenguaje español latinoamericano. Como si le hablaras a un colega emprendedor en un chat.
- PROHIBIDO usar hashtags (#). Ninguno.

━━━━━━━━━━━━━━━━━━━
ESTRUCTURA DEL POST (OBLIGATORIA)
━━━━━━━━━━━━━━━━━━━

1. *GANCHO* (1 línea): Abre con una afirmación sorprendente, un dato concreto, una provocación o una pregunta que enganche de inmediato. Que dé ganas de seguir leyendo.

2. *EL CONTEXTO EN 2 LÍNEAS*: Por qué este tema importa AHORA para alguien que vende o construye negocios en internet.

3. *LO QUE APRENDÍ / LO QUE FUNCIONA* (3-5 puntos cortos y directos): Extrae los insights, estrategias, datos o aprendizajes más valiosos del artículo. Cada punto empieza con un emoji y va al grano. NO digas "en el artículo se explica..." — DILO TÚ DIRECTAMENTE como si fuera tu propio conocimiento.

4. *REFLEXIÓN FINAL* (1-2 líneas): Un cierre con perspectiva propia. Algo que invite a la reflexión o que deje huella. Opcional: una pregunta abierta a la comunidad.

5. *ENLACE* (última línea, sin texto adicional ni CTA):
👉 ${postUrl}

━━━━━━━━━━━━━━━━━━━
RESTRICCIONES
━━━━━━━━━━━━━━━━━━━
- Máximo 1100 caracteres en total (sin contar la URL).
- NO inventes datos, estadísticas ni herramientas que no estén en el artículo.
- NO uses frases como "En este artículo...", "Lee el post completo...", "Haz clic para saber más..." — el enlace habla solo.
- NO uses doble asterisco (**) para negrita — Telegram usa *un asterisco*.
- NO incluyas hashtags bajo ningún concepto.

Responde SOLO con el texto del post listo para copiar y pegar. Sin explicaciones previas ni comentarios adicionales.`
}

// ─────────────────────────────────────────────
// POST Handler
// ─────────────────────────────────────────────
export async function POST(req: Request) {
  const authError = requireInternalAuth(req);
  if (authError) return authError;

  // Rate limit: 3 requests per 60 minutes per token
  const token = req.headers.get('Authorization') ?? 'anon';
  const rl = checkRateLimit(`telegram-publish:${token}`, 3, 60 * 60 * 1000);
  if (!rl.allowed) {
    return NextResponse.json(
      { error: `Demasiadas publicaciones. Reintenta en ${rl.retryAfter}s.` },
      { status: 429, headers: { 'Retry-After': String(rl.retryAfter) } }
    );
  }

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
