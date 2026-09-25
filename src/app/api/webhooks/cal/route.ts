import { NextResponse } from 'next/server'
import { captureContact } from '@/lib/crm/capture'
import crypto from 'crypto'

export async function POST(req: Request) {
  const signature = req.headers.get('X-Cal-Signature-256')
  const bodyText = await req.text() // Read text first for verification
  
  // 1. SECURITY: Verify Cal.com Signature
  // You must set CAL_WEBHOOK_SECRET in your .env variables
  const webhookSecret = process.env.CAL_WEBHOOK_SECRET

  if (webhookSecret) {
    if (!signature) {
      console.error('[Cal Webhook] Missing signature header')
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 })
    }

    const hmac = crypto.createHmac('sha256', webhookSecret)
    hmac.update(bodyText)
    const digest = hmac.digest('hex')

    if (signature !== digest) {
      console.error('[Cal Webhook] Invalid signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }
  } else if (process.env.VERCEL_ENV === 'production') {
    // Sin secreto cualquiera podría inyectar contactos «calificados» en el CRM.
    console.error('[Cal Webhook] CAL_WEBHOOK_SECRET no está configurado; webhook cerrado.')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 503 })
  } else {
    console.warn('[Cal Webhook] CAL_WEBHOOK_SECRET no está configurado (solo se tolera fuera de producción).')
  }

  try {
    const body = JSON.parse(bodyText) // Parse JSON manually after checking signature
    console.log('[Cal Webhook] Triggered at:', new Date().toISOString());
    // console.log('[Cal Webhook] Payload:', JSON.stringify(body, null, 2));

    const { triggerEvent, payload } = body

    // Only process booking creation events
    if (triggerEvent !== 'BOOKING_CREATED') {
      console.log('[Cal Webhook] Ignored event:', triggerEvent);
      return NextResponse.json({ received: true, message: 'Event ignored' })
    }

    // Extract relevant data
    const bookingId = payload.uid
    const attendee = payload.attendees[0] // Assuming single attendee for primary contact
    const { name, email } = attendee
    const { startTime, endTime } = payload

    console.log('[Cal Webhook] extracted data:', { bookingId, name, email });

    // 2. CRM: la reserva queda en el historial del contacto. El uid de Cal.com
    // evita duplicados si Cal reintenta el webhook. (Antes escribía en una
    // tabla `bookings` que nunca existió.)
    const data = await captureContact({
      email,
      name,
      phone: attendee.phoneNumber ?? null,
      type: 'booking',
      form: 'agenda',
      lifecycle: 'calificado',
      summary: payload.title ? `Agendó: ${String(payload.title).slice(0, 160)}` : 'Agendó una llamada',
      data: { booking_id: bookingId, start_time: startTime, end_time: endTime, event_type: payload.type ?? null },
      dedupeKey: bookingId ? `cal:${bookingId}` : undefined,
    })

    if (!data) {
      return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 })
    }

    console.log('[Cal Webhook] Success:', data.contact_id);
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[Cal Webhook] Internal Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
