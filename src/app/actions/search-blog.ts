"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { generateEmbedding } from "@/lib/embeddings";

export interface SearchResult {
  id: string;
  title: string;
  slug: string;
  category?: string; // Added category
  excerpt: string;
  similarity: number;
}

export async function searchBlog(query: string): Promise<SearchResult[]> {
  if (!query || query.length < 3) return [];

  console.log(`🔍 Searching for: "${query}"`);

  // Explicit check for admin client
  if (!supabaseAdmin) {
    console.error("❌ Critical: SUPABASE_SERVICE_ROLE_KEY is missing or invalid. Search cannot proceed.");
    return [];
  }

  try {
    // 1. Generate Embedding for user query
    const embedding = await generateEmbedding(query);

    // 2. Search via RPC
    const { data: results, error } = await supabaseAdmin.rpc("match_blog_posts", {
      query_embedding: embedding,
      match_threshold: 0.01, // Extremely low threshold to match debug tool
      match_count: 5
    });

    if (error) {
      console.error("❌ Search RPC Error:", error);
      // Verify if function exists or if it's a params issue
      return [];
    }

    console.log(`✅ Found ${results?.length || 0} matches for "${query}"`);
    return results as SearchResult[];

  } catch (err) {
    console.error("❌ Search Action Exception:", err);
    return [];
  }
}
