import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { createClient } from '@supabase/supabase-js'

// Allow up to 60s for this route (Vercel Pro / Enterprise)
export const maxDuration = 60

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  try {
    const { text, voice, segmentIndex, postId } = await req.json()

    if (!text || !postId) {
      return NextResponse.json(
        { error: 'Missing required fields: text, postId' },
        { status: 400 }
      )
    }

    console.log(`Generating audio for post ${postId}, segment ${segmentIndex}...`)

    // 1. Generate Audio with OpenAI TTS
    const mp3 = await openai.audio.speech.create({
      model: 'tts-1',
      voice: voice || 'onyx',
      input: text,
    })

    const buffer = new Uint8Array(await mp3.arrayBuffer())

    // 2. Upload to Supabase Storage (auto-create bucket if needed)
    const fileName = `${postId}/${Date.now()}-segment-${segmentIndex}.mp3`
    const bucketName = 'blog-audio'

    let uploadResult = await supabaseAdmin
      .storage
      .from(bucketName)
      .upload(fileName, buffer, {
        contentType: 'audio/mpeg',
        upsert: true,
      })

    // If bucket doesn't exist, create it and retry
    if (uploadResult.error && uploadResult.error.message?.includes('not found')) {
      console.log('Bucket not found, creating blog-audio bucket...')
      const { error: bucketError } = await supabaseAdmin.storage.createBucket(bucketName, {
        public: true,
        allowedMimeTypes: ['audio/mpeg'],
        fileSizeLimit: 52428800, // 50MB
      })
      if (bucketError) {
        console.error('Bucket creation error:', bucketError)
        throw new Error(`Failed to create storage bucket: ${bucketError.message}`)
      }
      console.log('Bucket created successfully, retrying upload...')
      // Retry upload
      uploadResult = await supabaseAdmin
        .storage
        .from(bucketName)
        .upload(fileName, buffer, {
          contentType: 'audio/mpeg',
          upsert: true,
        })
    }

    if (uploadResult.error) {
      console.error('Upload error:', uploadResult.error)
      throw new Error(`Storage upload failed: ${uploadResult.error.message}`)
    }

    // 3. Get Public URL
    const { data: { publicUrl } } = supabaseAdmin
      .storage
      .from(bucketName)
      .getPublicUrl(fileName)

    return NextResponse.json({
      url: publicUrl,
      message: 'Audio segment generated successfully',
    })
  } catch (error: any) {
    console.error('Error generating audio chunk:', error)
    return NextResponse.json(
      { error: error.message || 'Unknown error generating audio' },
      { status: 500 }
    )
  }
}
