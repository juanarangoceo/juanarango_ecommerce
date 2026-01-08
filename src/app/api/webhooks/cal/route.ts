import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  console.log('[Cal Webhook] Triggered at:', new Date().toISOString());
  try {
    const body = await req.json()
    console.log('[Cal Webhook] Payload:', JSON.stringify(body, null, 2));

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

    // Insert into Supabase
    const { data, error } = await supabase
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
