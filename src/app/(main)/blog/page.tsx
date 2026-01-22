import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { urlForImage } from "@/sanity/lib/image";
import { NewsletterForm } from "@/components/newsletter-form";
import { BlogSearch } from "@/components/blog-search";
import { RecentPostPills } from "@/components/recent-post-pills";

// GROQ Query - Standard
const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  _createdAt,
  mainImage,
  excerpt,
  topic,
  estimatedReadingTime
}`;

export const dynamic = 'force-dynamic'; 

import { Clock, Calendar } from "lucide-react";

export default async function BlogPage() {
  let posts: any[] = [];
  
  try {
    posts = await client.fetch(POSTS_QUERY);
  } catch (error) {
    console.error("❌ Error fetching posts for blog page:", error);
    // Continue with empty posts array to avoid build failure
  }

  // Ensure posts is an array before slicing
  const safelyFilesPosts = Array.isArray(posts) ? posts : [];

  // Prepare data for "Recent Pills" (Top 5 latest - sorting is handled by GROQ)
  // Mapping just title and slug
  const recentPosts = safelyFilesPosts.slice(0, 5).map((p: any) => ({
    title: p.title,
    slug: p?.slug?.current || ""
  }));

  return (
    <main className="container mx-auto px-4 py-20 min-h-screen">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Nitro Tech Blog
        </h1>
        <p className="text-xl text-muted-foreground">
          Perspectivas sobre E-commerce, Tecnología y Escalamiento.
        </p>
      </div>

      {/* 2. Enhanced Search Bar (First) */}
      <div className="mb-8">
         <BlogSearch />
      </div>

      {/* 1. Recent Post Pills (Below Search) */}
      <div className="w-full max-w-5xl mx-auto mb-16">
         <RecentPostPills posts={recentPosts} />
      </div>

      {/* 3. Main Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {safelyFilesPosts.length > 0 ? (
          safelyFilesPosts.map((post: any) => (
            <Card key={post._id} className="flex flex-col h-full hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 bg-zinc-900/50 border-zinc-800 hover:border-emerald-500/30 group">
              {post.mainImage?.asset?._ref && (
                <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
                  <img 
                    src={urlForImage(post.mainImage).url()} 
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  {/* Reuse topic field as a visual badge if it exists */}
                  {post.topic && (
                    <span className="absolute top-2 right-2 px-3 py-1 text-[10px] font-black tracking-widest uppercase bg-black/60 backdrop-blur-md text-white rounded-md border border-white/10 shadow-lg">
                      {post.topic}
                    </span>
                  )}
                </div>
              )}
              <CardHeader className="space-y-3">
                <CardTitle className="leading-tight text-xl text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
                  {post.title}
                </CardTitle>
                <div className="flex items-center gap-4 text-xs font-medium text-zinc-500">
                  <span className="flex items-center gap-1.5 bg-zinc-800/50 px-2 py-1 rounded">
                    <Calendar className="w-3.5 h-3.5" />
                    {new Date(post.publishedAt || post._createdAt).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                  
                  {post.estimatedReadingTime && (
                    <span className="flex items-center gap-1.5 bg-zinc-800/50 px-2 py-1 rounded text-emerald-500/80">
                      <Clock className="w-3.5 h-3.5" />
                      {post.estimatedReadingTime} min de lectura
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-zinc-400 line-clamp-3 text-sm leading-relaxed">
                  {post.excerpt || "Lee el artículo completo para descubrir más detalles sobre este tema..."}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800 text-zinc-300">
                  <Link href={`/blog/${post.slug.current}`}>Leer Artículo</Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-xl text-muted-foreground">Cargando artículos...</p>
          </div>
        )}
      </div>
      
      {/* 4. Newsletter at the bottom */}
      <div className="mt-16 border-t border-white/5 pt-16">
        <NewsletterForm />
      </div>

    </main>
  );
}
