import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
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
  } else {
    console.warn('[Cal Webhook] WARNING: CAL_WEBHOOK_SECRET is not set. Skipping signature verification. This is insecure.')
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

    // 2. DATABASE: Use Admin Client
    if (!supabaseAdmin) {
      throw new Error("Supabase Admin client is not initialized. Check SUPABASE_SERVICE_ROLE_KEY.")
    }

    // Insert into Supabase
    const { data, error } = await supabaseAdmin
      .from('bookings')
      .insert({
        booking_id: bookingId,
        customer_name: name,
        customer_email: email,
        start_time: startTime,
        end_time: endTime,
        created_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      console.error('[Cal Webhook] Supabase Insert Error:', error)
      return NextResponse.json({ error: 'Failed to save booking', details: error }, { status: 500 })
    }

    console.log('[Cal Webhook] Success:', data);
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[Cal Webhook] Internal Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
