import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { createClient } from '@supabase/supabase-js'

// No caching for this page as it depends on headers
export const dynamic = 'force-dynamic'

function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(supabaseUrl, supabaseKey)
}

export default async function NitroCommerceRedirect() {
  const headersList = await headers()
  
  // Get city from Vercel headers (or local dev header)
  // x-vercel-ip-city is usually capitalized (e.g., "Bogota")
  const city = headersList.get('x-vercel-ip-city')
  
  // Default fallback
  const defaultSlug = 'clinicas-esteticas-bogota'
  let destination = `/soluciones/nitro-commerce/${defaultSlug}`

  if (city) {
    // Normalize city for slug: lowercase, replace spaces with hyphens
    // e.g. "New York" -> "new-york"
    // Also remove accents just in case, though usually headers are ASCII? Vercel docs say it's city name.
    // We'll simplisticly handle it.
    const normalizedCity = city.toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // remove accents
      .replace(/[^a-z0-9]+/g, '-') // replace non-alphanumeric with hyphens
      .replace(/^-+|-+$/g, '') // trim hyphens

    // Assumption: The niche is "clinicas-esteticas". 
    // In a future v2, we could detect niche from referring URL or other signals.
    const targetSlug = `clinicas-esteticas-${normalizedCity}`
    
    // Check if this specific page exists in Supabase
    const supabase = getSupabaseClient()
    const { data } = await supabase
      .from('pseo_pages')
      .select('slug')
      .eq('slug', targetSlug)
      .single()

    if (data) {
      destination = `/soluciones/nitro-commerce/${targetSlug}`
    } else {
        // Optional: We could try to find *any* page for this city?
        // For now, if exact match fails, fallback to Bogota default.
        // Or we could log this miss.
    }
  }

  // Redirect to the resolved destination
  redirect(destination)
}
