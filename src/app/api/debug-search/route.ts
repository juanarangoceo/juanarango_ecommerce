import { NextResponse } from 'next/server';
import { supabaseAdmin } from "@/lib/supabase";
import { generateEmbedding } from "@/lib/embeddings";

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q') || 'marketing';

  const debug = {
    query,
    timestamp: new Date().toISOString(),
    env: {
       NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
       SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY ? 'Set' : 'Missing',
       OPENAI_API_KEY: !!process.env.OPENAI_API_KEY ? 'Set' : 'Missing',
    },
    steps: [] as string[]
  };

  try {
     // 1. Check Admin Client
     if (!supabaseAdmin) {
         debug.steps.push("❌ Fatal: supabaseAdmin is null. SUPABASE_SERVICE_ROLE_KEY might be invalid or missing.");
         return NextResponse.json(debug, { status: 500 });
     }
     debug.steps.push("✅ Supabase Admin initialized");

     // 2. Generate Embedding
     let embedding: number[] = [];
     try {
        embedding = await generateEmbedding(query);
        debug.steps.push(`✅ Embedding generated. Dimension: ${embedding.length}`);
     } catch (e: any) {
        debug.steps.push(`❌ Embedding Error: ${e.message}`);
        return NextResponse.json(debug, { status: 500 });
     }

     // 3. Run RPC
     const { data, error } = await supabaseAdmin.rpc("match_blog_posts", {
        query_embedding: embedding,
        match_threshold: 0.01, // Extremely low threshold for debugging
        match_count: 5
     });

     if (error) {
         debug.steps.push(`❌ RPC Error code: ${error.code}`);
         debug.steps.push(`❌ RPC Error msg: ${error.message}`);
         debug.steps.push(`❌ RPC Error details: ${error.details}`);
         debug.steps.push(`❌ Hint: Check if function 'match_blog_posts' exists in DB`);
         return NextResponse.json(debug, { status: 500 });
     }

     debug.steps.push(`✅ RPC Success. Found ${data?.length || 0} rows.`);
     
     return NextResponse.json({ ...debug, results: data });

  } catch (err: any) {
      debug.steps.push(`❌ Unhandled Exception: ${err.message}`);
      return NextResponse.json(debug, { status: 500 });
  }
}
