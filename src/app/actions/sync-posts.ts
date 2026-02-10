"use server";

import { client } from "@/sanity/lib/client";
import { supabaseAdmin } from "@/lib/supabase";
import { generateEmbedding } from "@/lib/embeddings";

const POSTS_QUERY = `*[_type == "post" && defined(slug.current)]{
  _id,
  title,
  slug,
  excerpt,
  content,
  publishedAt,
  _createdAt
}`;

export async function syncSanityPosts() {
  console.log("🔄 Starting Blog Sync > Supabase...");
  
  try {
    const posts = await client.fetch(POSTS_QUERY);
    console.log(`Found ${posts.length} posts in Sanity.`);

    if (!supabaseAdmin) {
      throw new Error("Supabase Admin client not initialized");
    }

    let syncedCount = 0;
    let errorCount = 0;

    for (const post of posts) {
        try {
            // 1. Prepare Content for Embedding
            // We combine title, excerpt and a chunk of content for semantic meaning
            const textToEmbed = `${post.title} ${post.excerpt || ""} ${post.content?.slice(0, 1000) || ""}`.trim();

            if (!textToEmbed) {
                console.warn(`Skipping post ${post.title} (no content to embed)`);
                continue;
            }

            // 2. Generate Embedding
            // Note: In a real prod env, we might want to check if the post 
            // has changed before burning embedding credits.
            // For now, we'll just upsert.
            const embedding = await generateEmbedding(textToEmbed);

            // 3. Upsert to Supabase
            const { error } = await supabaseAdmin.from("posts").upsert({
                sanity_id: post._id,
                title: post.title,
                slug: post.slug.current,
                excerpt: post.excerpt || "",
                content: post.content || "", 
                published_at: post.publishedAt || post._createdAt,
                embedding: embedding,
                category: post.category,
                tags: post.tags,
                updated_at: new Date().toISOString()
            }, { onConflict: 'sanity_id' });

            if (error) {
                console.error(`Failed to sync post ${post.title}:`, error);
                errorCount++;
            } else {
                syncedCount++;
            }

        } catch (err) {
            console.error(`Error processing post ${post.title}:`, err);
            errorCount++;
        }
    }

    console.log(`✅ Sync Complete: ${syncedCount} synced, ${errorCount} errors.`);
    return { success: true, synced: syncedCount, errors: errorCount };

  } catch (error) {
    console.error("Sync Fatal Error:", error);
    return { success: false, error: "Failed to sync posts" };
  }
}
