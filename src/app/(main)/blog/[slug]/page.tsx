import { PortableText } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { urlForImage } from "@/sanity/lib/image";

// GROQ Query for Single Post
const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title,
  mainImage,
  body,
  publishedAt,
  _createdAt
}`;

export const revalidate = 60;

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await client.fetch(POST_QUERY, { slug: params.slug });

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-20 min-h-screen max-w-3xl">
      <div className="mb-8">
        <Button asChild variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-primary">
          <Link href="/blog">← Volver al Blog</Link>
        </Button>
        
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">
          {post.title}
        </h1>
        
        <p className="text-muted-foreground mb-8">
          {new Date(post.publishedAt || post._createdAt).toLocaleDateString("es-ES", {
             weekday: "long",
             year: "numeric",
             month: "long",
             day: "numeric",
          })}
        </p>

        {post.mainImage?.asset?._ref && (
           <div className="relative w-full h-[400px] mb-10 overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800">
             <img 
               src={urlForImage(post.mainImage).url()} 
               alt={post.title}
               className="object-cover w-full h-full"
             />
           </div>
        )}
      </div>

      <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-zinc-300 prose-a:text-blue-400">
        <PortableText value={post.body} />
      </div>
    </article>
  );
}
