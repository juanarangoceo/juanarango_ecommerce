import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin, supabaseClient } from '@/lib/supabase'

// GET /api/prompts/like?ids=id1,id2,...
// Returns like counts for the given prompt IDs
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const ids = searchParams.get('ids')

  if (!ids) {
    return NextResponse.json({ counts: {} })
  }

  const idList = ids.split(',').filter(Boolean)

  try {
    const client = supabaseAdmin || supabaseClient
    const { data, error } = await client
      .from('prompt_likes')
      .select('prompt_id, count')
      .in('prompt_id', idList)

    if (error) throw error

    const counts: Record<string, number> = {}
    idList.forEach((id) => { counts[id] = 0 })
    ;(data || []).forEach((row: { prompt_id: string; count: number }) => {
      counts[row.prompt_id] = row.count
    })

    return NextResponse.json({ counts })
  } catch (error) {
    console.error('Error fetching prompt likes:', error)
    return NextResponse.json({ counts: {} }, { status: 500 })
  }
}

// POST /api/prompts/like
// Body: { promptId: string, action: 'like' | 'unlike' }
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { promptId, action } = body

    if (!promptId || typeof promptId !== 'string') {
      return NextResponse.json({ error: 'Invalid promptId' }, { status: 400 })
    }

    const delta = action === 'unlike' ? -1 : 1
    const client = supabaseAdmin || supabaseClient

    // Try to get existing row
    const { data: existing } = await client
      .from('prompt_likes')
      .select('count')
      .eq('prompt_id', promptId)
      .single()

    let newCount: number

    if (existing) {
      newCount = Math.max(0, (existing.count || 0) + delta)
      const { error } = await client
        .from('prompt_likes')
        .update({ count: newCount })
        .eq('prompt_id', promptId)
      if (error) throw error
    } else {
      newCount = Math.max(0, delta)
      const { error } = await client
        .from('prompt_likes')
        .insert({ prompt_id: promptId, count: newCount })
      if (error) throw error
    }

    return NextResponse.json({ count: newCount })
  } catch (error) {
    console.error('Error updating prompt like:', error)
    return NextResponse.json({ error: 'Failed to update like' }, { status: 500 })
  }
}
