import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { _id, postId, status, voice, audioSegments, mode } = body

    // Mode: 'create' or 'update'
    
    if (mode === 'create') {
      const doc = await client.create({
        _type: 'audioResource',
        post: { _type: 'reference', _ref: postId },
        status: status || 'generating',
        voice: voice || 'onyx',
        audioSegments: audioSegments || []
      })
      return NextResponse.json(doc)
    }

    if (mode === 'update') {
      if (!_id) throw new Error('Missing _id for update')
      const doc = await client
        .patch(_id)
        .set({ 
          status, 
          audioSegments 
        })
        .commit()
      return NextResponse.json(doc)
    }

    return NextResponse.json({ error: 'Invalid mode' }, { status: 400 })

  } catch (error: any) {
    console.error('Error saving audio resource:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
