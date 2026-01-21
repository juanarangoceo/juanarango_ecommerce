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
  topic
}`;

export const dynamic = 'force-dynamic'; 

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

  // Prepare data for "Recent Pills" (Top 5 latest)
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

      {/* 1. Recent Post Pills (Móvil: Carrusel / Desktop: Cloud) */}
      <div className="w-full max-w-5xl mx-auto">
         <RecentPostPills posts={recentPosts} />
      </div>

      {/* 2. Enhanced Search Bar */}
      <div className="mb-20">
         <BlogSearch />
      </div>

      {/* 3. Main Post Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {posts.length > 0 ? (
          posts.map((post: any) => (
            <Card key={post._id} className="flex flex-col h-full hover:shadow-lg transition-shadow bg-zinc-900/50 border-zinc-800">
              {post.mainImage?.asset?._ref && (
                <div className="relative w-full h-48 overflow-hidden rounded-t-xl group">
                  <img 
                    src={urlForImage(post.mainImage).url()} 
                    alt={post.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Reuse topic field as a visual badge if it exists */}
                  {post.topic && (
                    <span className="absolute top-2 right-2 px-2 py-1 text-xs font-bold bg-black/60 backdrop-blur-md text-white rounded-md border border-white/10">
                      {post.topic}
                    </span>
                  )}
                </div>
              )}
              <CardHeader>
                <CardTitle className="leading-tight text-xl text-white">{post.title}</CardTitle>
                <CardDescription suppressHydrationWarning className="flex items-center gap-2">
                  <span>
                    {new Date(post.publishedAt || post._createdAt).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-zinc-400 line-clamp-3">
                  {post.excerpt || "Lee el artículo completo para descubrir más..."}
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
