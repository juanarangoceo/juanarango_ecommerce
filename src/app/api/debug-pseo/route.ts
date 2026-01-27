import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const slug = searchParams.get('slug') || 'clinicas-esteticas-bogota'

  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        error: 'Missing Supabase credentials',
        env: {
          hasUrl: !!supabaseUrl,
          hasKey: !!supabaseKey,
        }
      }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const { data, error } = await supabase
      .from('pseo_pages')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      return NextResponse.json({
        error: 'Supabase query error',
        details: error.message,
        slug,
      }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({
        error: 'Page not found',
        slug,
      }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      slug,
      data,
    })
  } catch (error: any) {
    return NextResponse.json({
      error: 'Unexpected error',
      message: error.message,
    }, { status: 500 })
  }
}
