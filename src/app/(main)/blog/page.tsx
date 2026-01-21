import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { urlForImage } from "@/sanity/lib/image";
import { NewsletterForm } from "@/components/newsletter-form";
import { BlogSearch } from "@/components/blog-search";
import { BlogTopics } from "@/components/blog-topics";

// GROQ Query - Now fetching 'topic'
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

export const revalidate = 60; 

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ q?: string; topic?: string }> }) {
  const posts = await client.fetch(POSTS_QUERY);
  const resolvedSearchParams = await searchParams;
  const activeTopic = resolvedSearchParams.topic;

  // 1. Extract unique topics from posts
  // Filter out null/undefined topics, get unique values, and sort alphabetically
  const topics = Array.from(
    new Set(
      posts
        .map((p: any) => p.topic)
        .filter((t: string) => t && t.trim() !== "")
    )
  ).sort() as string[];


  // 2. Filter posts if a topic is selected
  const displayedPosts = activeTopic 
    ? posts.filter((post: any) => post.topic === activeTopic)
    : posts;

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

      <div className="mb-8">
        <NewsletterForm />
      </div>

      {/* Topics Navigation */}
      <div className="mb-8 max-w-4xl mx-auto">
         <BlogTopics topics={topics} />
      </div>

      {/* Semantic Search */}
      <div className="mb-16">
         <BlogSearch />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedPosts.length > 0 ? (
          displayedPosts.map((post: any) => (
            <Card key={post._id} className="flex flex-col h-full hover:shadow-lg transition-shadow bg-zinc-900/50 border-zinc-800">
              {post.mainImage?.asset?._ref && (
                <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
                  <img 
                    src={urlForImage(post.mainImage).url()} 
                    alt={post.title}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-500"
                  />
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
            <p className="text-xl text-muted-foreground">No se encontraron artículos para este tema.</p>
            <Button asChild variant="link" className="mt-4 text-primary">
              <Link href="/blog">Ver todos los artículos</Link>
            </Button>
          </div>
        )}
      </div>
    </main>
  );
}
