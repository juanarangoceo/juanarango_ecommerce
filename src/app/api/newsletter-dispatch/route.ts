import { NextRequest, NextResponse } from 'next/server'
import { inngest } from '@/lib/inngest/client'
import { createClient } from 'next-sanity'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * POST /api/newsletter-dispatch
 *
 * Webhook de Sanity que se dispara cuando un newsletter se publica.
 * Maneja dos casos:
 *
 *   A) Sin fecha → Envío inmediato via Inngest
 *   B) Con fecha  → Marca el doc como "scheduled" en Sanity para que el cron lo recoja
 *
 * Configurar en Sanity Dashboard:
 *   URL:     https://www.juanarangoecommerce.com/api/newsletter-dispatch?secret={SANITY_WEBHOOK_SECRET}
 *   Filter:  _type == "newsletter"
 *   Trigger: Create, Update (publicado)
 */

const getSanityClient = () =>
  createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  })

export async function POST(req: NextRequest) {
  try {
    // ── Auth ───────────────────────────────────────────────────────────────
    const secret = process.env.SANITY_WEBHOOK_SECRET
    const url = new URL(req.url)
    const querySecret = url.searchParams.get('secret')

    if (!secret || querySecret !== secret) {
      console.error('❌ Newsletter webhook: auth failed')
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    // ── Parse body ─────────────────────────────────────────────────────────
    let body: Record<string, unknown>
    try {
      body = await req.json()
    } catch {
      return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 })
    }

    const docType = body?._type as string
    if (docType !== 'newsletter') {
      return NextResponse.json({ message: 'Not a newsletter document, skipping' })
    }

    const docId = body._id as string
    const sendStatus = body?.sendStatus as string | undefined
    const scheduledFor = body?.scheduledFor as string | undefined

    console.log(`📬 Newsletter webhook recibido — id: ${docId} | status: ${sendStatus} | scheduledFor: ${scheduledFor ?? 'ninguna'}`)

    // ── Ignorar si ya fue enviado o está en proceso ────────────────────────
    if (sendStatus === 'sent' || sendStatus === 'sending') {
      return NextResponse.json({
        message: `Newsletter ya procesado (status: ${sendStatus}), ignorando.`,
      })
    }

    const newsletterPayload = {
      _id: docId,
      title: body.title,
      previewText: body.previewText,
      slug: (body.slug as any)?.current || docId,
      body: body.body,
      ctaButton: body.ctaButton,
    }

    // ── CASO A: Con fecha programada ───────────────────────────────────────
    // Marcamos como "scheduled" en Sanity para que el cron de Inngest lo recoja
    if (scheduledFor) {
      const sanity = getSanityClient()
      await sanity
        .patch(docId)
        .set({ sendStatus: 'scheduled' })
        .commit()

      console.log(`✅ Newsletter marcado como "scheduled" → el cron lo enviará el ${scheduledFor}`)
      return NextResponse.json({
        message: 'Newsletter marcado como scheduled — el cron lo enviará a tiempo',
        scheduledFor,
        id: docId,
      })
    }

    // ── CASO B: Sin fecha → envío inmediato ────────────────────────────────
    await inngest.send({
      name: 'newsletter/dispatch',
      data: newsletterPayload,
    })

    console.log(`🚀 Newsletter despachado inmediatamente — id: ${docId}`)
    return NextResponse.json({ message: 'Newsletter dispatched immediately', id: docId })

  } catch (err) {
    console.error('❌ newsletter-dispatch webhook error:', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
