import { client } from "@/sanity/lib/client";
import { BlogCard } from "@/components/blog/blog-card";
import { NitroCtaCard } from "@/components/blog/nitro-cta-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Tag } from "lucide-react";
import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/utils";
import { normalizeTagSlug } from "@/lib/normalize-tag";

// GROQ Queries
const TAG_DATA_QUERY = `
  {
    "tagDoc": *[_type == "tag" && slug.current == $slug][0] {
      name,
      description,
      seoTitle,
      seoDescription
    },
    "posts": *[_type == "post" && ($slug in tags[] || $originalName in tags[]) && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) {
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
    }
  }
`;

interface Props {
  params: Promise<{ tag: string }>
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const decodedTag = decodeURIComponent(params.tag);
  const normalizedSlug = normalizeTagSlug(decodedTag);
  
  // Fetch just enough data for metadata
  const data = await client.fetch(`
    {
      "tagDoc": *[_type == "tag" && slug.current == $slug][0] {
        name,
        description,
        seoTitle,
        seoDescription
      },
      "postCount": count(*[_type == "post" && ($slug in tags[] || $originalName in tags[]) && defined(slug.current)])
    }
  `, { slug: normalizedSlug, originalName: decodedTag });

  const { tagDoc, postCount } = data;
  const displayTitle = tagDoc?.seoTitle || `Posts sobre ${tagDoc?.name || decodedTag} | Blog Nitro Ecom`;
  const displayDesc = tagDoc?.seoDescription || tagDoc?.description || `Descubre nuestros artículos y guías sobre ${decodedTag} en el blog de Nitro Ecom.`;

  return constructMetadata({
    title: displayTitle,
    description: displayDesc,
    canonical: `https://www.juanarangoecommerce.com/blog/tags/${params.tag}`,
    // Robost Logic: Noindex if less than 3 posts (Thin Content)
    noIndex: postCount < 3
  });
}

import { MarkdownRenderer } from "@/components/blog/markdown-renderer";

// ... existing imports ...

export default async function TagPage(props: Props) {
  const params = await props.params;
  const decodedTag = decodeURIComponent(params.tag);
  const normalizedSlug = normalizeTagSlug(decodedTag);

  const { tagDoc, posts } = await client.fetch(TAG_DATA_QUERY, { 
    slug: normalizedSlug, 
    originalName: decodedTag 
  });

  // If no posts and no tag doc, 404
  if ((!posts || posts.length === 0) && !tagDoc) {
     return notFound();
  }

  const displayName = tagDoc?.name || decodedTag;
  // If we have a tagDoc description, it's now Markdown. If not, use the fallback text.
  const hasRichContent = !!tagDoc?.description;
  const fallbackDescription = `Explorando ${posts.length} ${posts.length === 1 ? 'artículo' : 'artículos'} etiquetados con "${displayName}".`;

  return (
    <main className="container mx-auto px-4 py-20 min-h-screen">
      
      {/* 2-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT COLUMN: Content + Posts (col-8) */}
        <div className="lg:col-span-8">
            
            {/* Header Content moved here */}
            <div className="mb-12 border-b border-zinc-100 dark:border-zinc-800 pb-8">
                <Link 
                href="/blog" 
                className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-6 group"
                >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
                Volver al Blog
                </Link>
                
                <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <Tag className="w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl capitalize">
                        {displayName}
                    </h1>
                </div>

                {hasRichContent ? (
                    <MarkdownRenderer content={tagDoc.description} />
                ) : (
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        {fallbackDescription}
                    </p>
                )}
            </div>

            {/* Posts Grid */}
            <div>
                <h3 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white flex items-center gap-2">
                    <span className="bg-emerald-500 w-2 h-8 rounded-full inline-block"/>
                    Artículos Recientes
                </h3>
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {posts.map((post: any, index: number) => (
                        <BlogCard key={post._id} post={post} priority={index < 2} />
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
        </div>

        {/* RIGHT COLUMN: Sidebar (col-4) starts at top */}
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
