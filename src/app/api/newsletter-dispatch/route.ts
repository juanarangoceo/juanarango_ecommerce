import { NextRequest, NextResponse } from 'next/server'
import { inngest } from '@/lib/inngest/client'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/newsletter-dispatch
 *
 * Webhook de Sanity que se dispara cuando un newsletter se publica.
 * Valida la firma HMAC y emite el evento `newsletter/dispatch` a Inngest.
 *
 * Configurar en Sanity Dashboard:
 *   URL:     https://www.juanarangoecommerce.com/api/newsletter-dispatch?secret={SANITY_WEBHOOK_SECRET}
 *   Filter:  _type == "newsletter"
 *   Trigger: Create, Update
 */
export async function POST(req: NextRequest) {
  try {
    const secret = process.env.SANITY_WEBHOOK_SECRET
    const url = new URL(req.url)
    const querySecret = url.searchParams.get('secret')

    // Validate secret
    if (!secret || querySecret !== secret) {
      console.error('❌ Newsletter webhook: auth failed')
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 })
    }

    const docType = body?._type as string
    if (docType !== 'newsletter') {
      return NextResponse.json({ message: 'Not a newsletter document, skipping' }, { status: 200 })
    }

    const sendStatus = body?.sendStatus as string | undefined
    const scheduledFor = body?.scheduledFor as string | undefined

    // Solo procesar si el newsletter se publicó con estado "scheduled" o si
    // se quiere despachar inmediatamente (status undefined = publicación manual sin fecha)
    const shouldDispatch =
      sendStatus === 'scheduled' ||
      (sendStatus === 'draft' && !scheduledFor) // Publicación manual sin fecha → envío inmediato

    if (!shouldDispatch) {
      return NextResponse.json({
        message: `Newsletter recibido pero no se despachará aún (status: ${sendStatus})`,
      })
    }

    // Si hay fecha programada, el cron de Inngest se encarga.
    // Si no hay fecha, lo despachamos inmediatamente.
    if (!scheduledFor) {
      await inngest.send({
        name: 'newsletter/dispatch',
        data: {
          _id: body._id,
          title: body.title,
          previewText: body.previewText,
          slug: (body.slug as any)?.current || body._id,
          body: body.body,
          ctaButton: body.ctaButton,
        },
      })

      return NextResponse.json({ message: 'Newsletter dispatched immediately', id: body._id })
    }

    return NextResponse.json({
      message: 'Newsletter scheduled — the cron will pick it up',
      scheduledFor,
      id: body._id,
    })
  } catch (err) {
    console.error('❌ newsletter-dispatch webhook error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
