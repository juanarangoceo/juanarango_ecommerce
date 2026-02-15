import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"
import OpenAI from "https://esm.sh/openai@4.28.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text, voice, segmentIndex, postId } = await req.json()

    if (!text || !postId) {
      throw new Error('Missing required fields: text, postId')
    }

    // 1. Initialize OpenAI
    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })

    // 2. Initialize Supabase Admin Client
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    console.log(`Generating audio for post ${postId}, segment ${segmentIndex}...`)

    // 3. Generate Audio with OpenAI TTS
    const mp3 = await openai.audio.speech.create({
      model: "tts-1",
      voice: voice || "onyx",
      input: text,
    })

    const buffer = new Uint8Array(await mp3.arrayBuffer())

    // 4. Upload to Supabase Storage
    const fileName = `${postId}/${Date.now()}-segment-${segmentIndex}.mp3`
    const { data: uploadData, error: uploadError } = await supabaseAdmin
      .storage
      .from('blog-audio')
      .upload(fileName, buffer, {
        contentType: 'audio/mpeg',
        upsert: true
      })

    if (uploadError) throw uploadError

    // 5. Get Public URL
    const { data: { publicUrl } } = supabaseAdmin
      .storage
      .from('blog-audio')
      .getPublicUrl(fileName)

    return new Response(
      JSON.stringify({ 
        url: publicUrl,
        message: 'Audio segment generated successfully' 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
