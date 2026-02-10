import { client } from "@/sanity/lib/client";
import { BlogCard } from "@/components/blog/blog-card";
import { NitroCtaCard } from "@/components/blog/nitro-cta-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/utils";

// GROQ Query to fetch posts by tag
const POSTS_BY_TAG_QUERY = `*[_type == "post" && $tag in tags[] && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) {
  _id,
  title,
  slug,
  publishedAt,
  _createdAt,
  mainImage,
  excerpt,
  category,
  tags,
  estimatedReadingTime
}`;

export async function generateMetadata(props: { params: Promise<{ tag: string }> }) {
  const params = await props.params;
  const tag = decodeURIComponent(params.tag);
  
  return constructMetadata({
    title: `Posts sobre ${tag} | Blog Nitro Ecom`,
    description: `Descubre nuestros artículos y guías sobre ${tag} en el blog de Nitro Ecom.`,
    canonical: `https://www.juanarangoecommerce.com/blog/tags/${params.tag}`,
  });
}

export default async function TagPage(props: { params: Promise<{ tag: string }> }) {
  const params = await props.params;
  const tag = decodeURIComponent(params.tag);
    const posts = await client.fetch(POSTS_BY_TAG_QUERY, { tag } as any);

  if (!posts) {
     return notFound();
  }

  return (
    <main className="container mx-auto px-4 py-20 min-h-screen">
      <div className="mb-12">
        <Link 
          href="/blog" 
          className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
          Volver al Blog
        </Link>
        
        <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Tag className="w-8 h-8" />
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl capitalize">
                #{tag}
            </h1>
        </div>
        <p className="text-xl text-muted-foreground max-w-2xl">
            Explorando {posts.length} {posts.length === 1 ? 'artículo' : 'artículos'} etiquetados con <span className="font-semibold text-zinc-900 dark:text-white">"{tag}"</span>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post: any) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
              <p className="text-xl text-muted-foreground mb-4">No encontramos artículos con esta etiqueta.</p>
              <Link href="/blog">
                <Button variant="outline">Ver todos los artículos</Button>
              </Link>
            </div>
          )}
        </div>

        <aside className="lg:col-span-4 space-y-6">
          <div className="lg:sticky lg:top-24 space-y-6">
            <NitroCtaCard />
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
                <NewsletterForm />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
