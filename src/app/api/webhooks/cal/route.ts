import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { triggerEvent, payload } = body

    // Only process booking creation events
    if (triggerEvent !== 'BOOKING_CREATED') {
      return NextResponse.json({ received: true, message: 'Event ignored' })
    }

    // Extract relevant data
    const bookingId = payload.uid
    const attendee = payload.attendees[0] // Assuming single attendee for primary contact
    const { name, email } = attendee
    const { startTime, endTime } = payload

    // Insert into Supabase
    const { error } = await supabase
      .from('bookings')
      .insert({
        booking_id: bookingId,
        customer_name: name,
        customer_email: email,
        start_time: startTime,
        end_time: endTime,
        created_at: new Date().toISOString(),
      })

    if (error) {
      console.error('Supabase Error:', error)
      return NextResponse.json({ error: 'Failed to save booking' }, { status: 500 })
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
