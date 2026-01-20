"use server";

import { supabaseAdmin } from "@/lib/supabase";
import { generateEmbedding } from "@/lib/embeddings";

export interface SearchResult {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  similarity: number;
}

export async function searchBlog(query: string): Promise<SearchResult[]> {
  if (!query || query.length < 3) return [];

  try {
    // 1. Generate Embedding for user query
    const embedding = await generateEmbedding(query);

    // 2. Search via RPC
    const { data: results, error } = await supabaseAdmin!.rpc("match_posts", {
      query_embedding: embedding,
      match_threshold: 0.5, // Adjust this threshold based on testing
      match_count: 5
    });

    if (error) {
      console.error("Search RPC Error:", error);
      return [];
    }

    return results as SearchResult[];

  } catch (err) {
    console.error("Search Action Error:", err);
    return [];
  }
}
