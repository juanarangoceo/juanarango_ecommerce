import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { urlForImage } from "@/sanity/lib/image";
import { NewsletterForm } from "@/components/newsletter-form";


// GROQ Query
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
  excerpt
}`;

export const revalidate = 60; // Revalidate every minute

export default async function BlogPage() {
  const posts = await client.fetch(POSTS_QUERY);

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

      <div className="mb-16">
        <NewsletterForm />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: any) => (
          <Card key={post._id} className="flex flex-col h-full hover:shadow-lg transition-shadow bg-zinc-900/50 border-zinc-800">
            {post.mainImage?.asset?._ref && (
              <div className="relative w-full h-48 overflow-hidden rounded-t-xl">
                <img 
                  src={urlForImage(post.mainImage).url()} 
                  alt={post.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="leading-tight text-xl text-white">{post.title}</CardTitle>
              <CardDescription suppressHydrationWarning>
                {new Date(post.publishedAt || post._createdAt).toLocaleDateString("es-ES", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
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
        ))}
      </div>
    </main>
  );
}
