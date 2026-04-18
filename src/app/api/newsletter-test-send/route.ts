import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { render } from '@react-email/render'
import { toHTML } from '@portabletext/to-html'
import { NewsletterEmail } from '@/emails/newsletter-email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const resend = new Resend(process.env.RESEND_API_KEY)

/**
 * POST /api/newsletter-test-send
 *
 * Envía una copia de prueba del newsletter a un email específico.
 * Llamado desde el componente SendTestEmailButton en Sanity Studio.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { testEmail, title, previewText, body: portableBody, ctaButton } = body

    // ── Validaciones básicas ────────────────────────────────────────────────
    if (!testEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testEmail)) {
      return NextResponse.json(
        { success: false, error: 'Email de destino inválido.' },
        { status: 400 }
      )
    }

    if (!title) {
      return NextResponse.json(
        { success: false, error: 'El newsletter necesita al menos un título (asunto).' },
        { status: 400 }
      )
    }

    // ── Convertir Portable Text → HTML ──────────────────────────────────────
    let contentHtml = ''
    if (portableBody && Array.isArray(portableBody) && portableBody.length > 0) {
      contentHtml = toHTML(portableBody, {
        components: {
          types: {
            callout: ({ value }: any) =>
              `<div style="background:#1a2e1a;border-left:4px solid #4ade80;padding:16px 20px;margin:16px 0;border-radius:0 8px 8px 0;">
                <p style="margin:0;color:#e2e8f0;font-size:15px;">${value.emoji || '📌'} ${value.text || ''}</p>
              </div>`,
            image: ({ value }: any) => {
              if (!value?.asset?._ref) return ''
              const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
              const ref = value.asset._ref
                .replace('image-', '')
                .replace(/-(\w+)$/, '.$1')
                .replace(/-/g, '/')
              return `<img src="https://cdn.sanity.io/images/${projectId}/production/${ref}" alt="${value.alt || ''}" style="max-width:100%;border-radius:8px;margin:16px 0;" />`
            },
          },
          block: {
            h2: ({ children }: any) =>
              `<h2 style="color:#ffffff;font-size:22px;font-weight:700;margin:24px 0 12px 0;font-family:Inter,sans-serif;">${children}</h2>`,
            h3: ({ children }: any) =>
              `<h3 style="color:#ffffff;font-size:18px;font-weight:600;margin:20px 0 10px 0;font-family:Inter,sans-serif;">${children}</h3>`,
            normal: ({ children }: any) =>
              `<p style="color:#a1a1aa;font-size:15px;line-height:1.7;margin:0 0 16px 0;font-family:Inter,sans-serif;">${children}</p>`,
            blockquote: ({ children }: any) =>
              `<blockquote style="border-left:3px solid #4ade80;margin:16px 0;padding:12px 20px;color:#71717a;font-style:italic;">${children}</blockquote>`,
          },
          marks: {
            strong: ({ children }: any) => `<strong style="color:#ffffff;">${children}</strong>`,
            em: ({ children }: any) => `<em>${children}</em>`,
            code: ({ children }: any) =>
              `<code style="background:#1f1f1f;padding:2px 6px;border-radius:4px;font-family:monospace;color:#4ade80;font-size:13px;">${children}</code>`,
            link: ({ children, value }: any) =>
              `<a href="${value?.href || '#'}" style="color:#4ade80;text-decoration:underline;" target="_blank" rel="noopener noreferrer">${children}</a>`,
          },
        },
      })
    }

    // ── Renderizar el template de email ─────────────────────────────────────
    const html = await render(
      NewsletterEmail({
        title: `[PRUEBA] ${title}`,
        previewText: previewText ? `[TEST] ${previewText}` : undefined,
        contentHtml,
        ctaText: ctaButton?.text,
        ctaUrl: ctaButton?.url,
        firstName: 'Juan', // Preview con nombre por defecto
        unsubscribeUrl: undefined, // No en emails de prueba
      })
    )

    // ── Enviar via Resend ───────────────────────────────────────────────────
    const { error } = await resend.emails.send({
      from: 'Juan Arango <nitro@juanarangoecommerce.com>',
      to: testEmail,
      subject: `[PRUEBA] ${title}`,
      html,
    })

    if (error) {
      console.error('Resend test send error:', error)
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }

    console.log(`✅ Newsletter test sent to ${testEmail}`)
    return NextResponse.json({
      success: true,
      message: `Email de prueba enviado a ${testEmail}`,
    })
  } catch (err) {
    console.error('newsletter-test-send error:', err)
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error desconocido' },
      { status: 500 }
    )
  }
}
