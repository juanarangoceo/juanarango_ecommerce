import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { renderToBuffer } from '@react-pdf/renderer'
import { GoogleGenAI } from '@google/genai'
import React from 'react'
import { client } from '@/sanity/lib/client'
import { supabaseAdmin } from '@/lib/supabase'
import { BlogSummaryPdf } from '@/lib/pdf/blog-summary-pdf'
import { BlogSummaryEmail } from '@/emails/blog-summary-email'
import { render as renderEmail } from '@react-email/components'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const maxDuration = 60 // Vercel Pro supports up to 300s

// ── Env ────────────────────────────────────────────────────────────────────
const resend = new Resend(process.env.RESEND_API_KEY)
const gemini = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY! })

// ── GROQ Query ─────────────────────────────────────────────────────────────
const PDF_POST_QUERY = `*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  title,
  content,
  publishedAt,
  author,
  category,
  tags,
  "slug": slug.current,
  "pdfConfig": *[_type == "blogPdfConfig" && post._ref == ^._id && isActive == true][0]{
    isActive,
    hookTitle,
    hookDescription
  }
}`

// ── Email validator ─────────────────────────────────────────────────────────
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// ── Anti-spam: check if already requested in last 24h ─────────────────────
async function hasRecentRequest(email: string, postSlug: string): Promise<boolean> {
  if (!supabaseAdmin) return false
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  const { count } = await supabaseAdmin
    .from('pdf_summary_leads')
    .select('*', { count: 'exact', head: true })
    .eq('email', email.toLowerCase())
    .eq('post_slug', postSlug)
    .gte('created_at', since)

  return (count ?? 0) > 0
}

// ── Save lead ──────────────────────────────────────────────────────────────
async function saveLead(email: string, postSlug: string, postTitle: string): Promise<void> {
  if (!supabaseAdmin) return
  await supabaseAdmin.from('pdf_summary_leads').insert({
    email: email.toLowerCase(),
    post_slug: postSlug,
    post_title: postTitle,
  })
}

// ── Gemini: Generate Summary ──────────────────────────────────────────────
interface SummarySection {
  heading: string
  bullets: string[]
}

interface GeneratedSummary {
  intro: string
  sections: SummarySection[]
  conclusion: string
  keyTakeaways: string[]
}

async function generateSummaryWithGemini(
  postTitle: string,
  postContent: string
): Promise<GeneratedSummary> {
  // Trim content to avoid token overload (first ~8000 chars is enough for a good summary)
  const trimmedContent = postContent.substring(0, 8000)

  const prompt = `Eres un experto en síntesis de contenido de marketing digital y ecommerce. Tu misión es generar un resumen ejecutivo PROFESIONAL y ACCIONABLE de un artículo de blog para enviarlo como PDF a un lector que lo solicitó.

ARTÍCULO: "${postTitle}"
CONTENIDO:
---
${trimmedContent}
---

Genera un resumen ejecutivo en formato JSON con la siguiente estructura EXACTA (sin markdown, solo JSON puro):

{
  "intro": "Un párrafo introductorio de 2-3 frases que capture la esencia y el valor del artículo. Debe enganchar al lector desde el principio.",
  "keyTakeaways": [
    "Punto clave 1 en 1 frase clara y específica",
    "Punto clave 2 en 1 frase clara y específica",
    "Punto clave 3 en 1 frase clara y específica",
    "Punto clave 4 en 1 frase clara y específica"
  ],
  "sections": [
    {
      "heading": "Título de sección 1 (extraído o inferido del artículo)",
      "bullets": [
        "Idea principal de esta sección en 1 frase accionable",
        "Segunda idea importante de esta sección",
        "Tercera idea o dato relevante"
      ]
    },
    {
      "heading": "Título de sección 2",
      "bullets": [
        "Idea principal",
        "Segunda idea",
        "Tercera idea"
      ]
    }
  ],
  "conclusion": "Un párrafo de cierre de 2-3 frases con el mensaje principal y un llamado a la acción implícito hacia la implementación."
}

REGLAS CRÍTICAS:
- Máximo 4 secciones, mínimo 2.
- Cada bullet debe ser ESPECÍFICO y ACCIONABLE, no genérico.
- Usa el español de España/Latinoamérica de forma profesional.
- El tono debe ser directo, experto y motivador — al estilo de Juan Arango.
- NO incluyas emojis en el JSON.
- Responde SOLO con el JSON, sin ningún texto adicional ni bloques de código.`

  const response = await gemini.models.generateContent({
    model: 'gemini-2.0-flash',
    contents: prompt,
  })

  const rawText = response.text?.trim() ?? ''

  // Clean potential markdown code fences
  const cleanJson = rawText
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/i, '')
    .trim()

  try {
    return JSON.parse(cleanJson) as GeneratedSummary
  } catch {
    // Fallback summary if parsing fails
    return {
      intro: `Este resumen sintetiza los puntos más importantes de "${postTitle}".`,
      keyTakeaways: [
        'Revisa el artículo completo para los detalles de implementación.',
      ],
      sections: [
        {
          heading: 'Resumen del artículo',
          bullets: [postContent.substring(0, 400).replace(/[#*`]/g, '').trim()],
        },
      ],
      conclusion: 'Visita el blog completo para profundizar en cada punto y comenzar a aplicar las estrategias.',
    }
  }
}

// ── Main Handler ────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, postSlug } = body as { email?: string; postSlug?: string }

    // — Validation —
    if (!email || !isValidEmail(email)) {
      return NextResponse.json({ error: 'Email inválido.' }, { status: 400 })
    }
    if (!postSlug || typeof postSlug !== 'string') {
      return NextResponse.json({ error: 'Slug del post requerido.' }, { status: 400 })
    }

    // — Anti-spam check —
    const alreadyRequested = await hasRecentRequest(email, postSlug)
    if (alreadyRequested) {
      return NextResponse.json({
        success: true,
        message: 'Ya enviamos tu resumen anteriormente. Revisa tu bandeja de entrada.',
      })
    }

    // — Fetch post from Sanity —
    const post = await client.fetch(PDF_POST_QUERY, { slug: postSlug })
    if (!post) {
      return NextResponse.json({ error: 'Post no encontrado.' }, { status: 404 })
    }

    // — Check PDF config is active —
    if (!post.pdfConfig?.isActive) {
      return NextResponse.json({ error: 'PDF Summary no está activo para este post.' }, { status: 403 })
    }

    const rawContent = post.content ?? ''

    // — Generate summary with Gemini —
    const summary = await generateSummaryWithGemini(post.title, rawContent)

    // — Generate PDF buffer —
    const pdfElement = React.createElement(BlogSummaryPdf, {
      postTitle: post.title,
      postSlug: post.slug,
      postCategory: post.category,
      publishedAt: post.publishedAt,
      author: post.author ?? 'Juan Arango',
      summary,
    })

    const pdfBuffer = await renderToBuffer(pdfElement as any)

    // — Save lead to Supabase —
    await saveLead(email, postSlug, post.title)

    // — Render email HTML —
    const emailHtml = await renderEmail(
      React.createElement(BlogSummaryEmail, {
        postTitle: post.title,
        postSlug: post.slug,
        postCategory: post.category,
        recipientEmail: email,
      })
    )

    // — Send email with Resend —
    const safeTitle = post.title.replace(/[^\w\s-]/g, '').trim().replace(/\s+/g, '-').toLowerCase()

    const { error: sendError } = await resend.emails.send({
      from: 'Juan Arango <hola@juanarangoecommerce.com>',
      to: [email],
      subject: `📄 Tu resumen de "${post.title}" está listo`,
      html: emailHtml,
      attachments: [
        {
          filename: `resumen-${safeTitle}.pdf`,
          content: pdfBuffer,
        },
      ],
    })

    if (sendError) {
      console.error('❌ Resend error:', sendError)
      return NextResponse.json({ error: 'Error al enviar el email.' }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: '¡Listo! Revisa tu bandeja de entrada en unos segundos.',
    })
  } catch (err) {
    console.error('❌ PDF Summary error:', err)
    return NextResponse.json(
      { error: 'Error interno. Por favor intenta de nuevo.' },
      { status: 500 }
    )
  }
}
