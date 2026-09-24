import { client } from "@/sanity/lib/client";
import { BlogCard } from "@/components/blog/blog-card";
import { NitroCtaCard } from "@/components/blog/nitro-cta-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Tag, ChevronDown } from "lucide-react";
import { notFound } from "next/navigation";
import { constructMetadata } from "@/lib/utils";
import { normalizeTagSlug } from "@/lib/normalize-tag";
import { MarkdownRenderer } from "@/components/blog/markdown-renderer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// GROQ Queries
const TAG_DATA_QUERY = `
  {
    "tagDoc": *[_type == "tag" && slug.current == $slug][0] {
      name,
      h1,
      description,
      faq,
      seoTitle,
      seoDescription
    },
    "posts": *[_type == "post" && ($slug in tags[] || $originalName in tags[]) && defined(slug.current) && !(_id in path("drafts.**"))] | order(coalesce(publishedAt, _createdAt) desc) {
      _id,
      title,
      slug,
      publishedAt,
      _createdAt,
      mainImage,
      "excerpt": coalesce(excerpt, array::join(string::split(pt::text(body), "")[0..199], "") + "…"),
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
        seoTitle,
        seoDescription,
        description,
        forzarIndexacion
      },
      "postCount": count(*[_type == "post" && ($slug in tags[] || $originalName in tags[]) && defined(slug.current) && !(_id in path("drafts.**"))])
    }
  `, { slug: normalizedSlug, originalName: decodedTag });

  const { tagDoc, postCount } = data;
  const displayTitle = tagDoc?.seoTitle || `Posts sobre ${tagDoc?.name || decodedTag} | Blog Nitro Ecom`;
  const displayDesc = tagDoc?.seoDescription || tagDoc?.description || `Descubre nuestros artículos y guías sobre ${decodedTag} en el blog de Nitro Ecom.`;

  return constructMetadata({
    title: displayTitle,
    description: displayDesc,
    canonical: `https://www.juanarangoecommerce.com/blog/tags/${params.tag}`,
    // Indexing only if forced or has at least 2 posts (=> noIndex if not forced AND postCount < 2)
    noIndex: !tagDoc?.forzarIndexacion && postCount < 2
  });
}

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
  const displayH1 = tagDoc?.h1 || displayName;
  
  // If we have a tagDoc description, it's now Markdown. If not, use the fallback text.
  const hasRichContent = !!tagDoc?.description;
  const fallbackDescription = `Explorando ${posts.length} ${posts.length === 1 ? 'artículo' : 'artículos'} etiquetados con "${displayName}".`;

  // FAQ Schema
  const faqSchema = tagDoc?.faq && tagDoc.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": tagDoc.faq.map((f: any) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  } : null;

  return (
    <>
      {faqSchema && (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <main className="container mx-auto px-4 py-20 min-h-screen">
        
        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT COLUMN: Content + Posts (col-8) */}
          <div className="lg:col-span-8">
              
              {/* Header Content moved here */}
              <div className="mb-12 border-b border-white/10 pb-8">
                  <Link 
                  href="/blog" 
                  className="inline-flex items-center text-sm font-medium text-white/45 hover:text-white transition-colors mb-6 group"
                  >
                  <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
                  Volver al Blog
                  </Link>
                  
                  <div className="flex items-start gap-4 mb-6">
                      <div className="p-3 rounded-full bg-primary/10 text-primary dark:text-primary mt-1 shrink-0">
                          <Tag className="w-8 h-8" />
                      </div>
                      <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl capitalize leading-[1.1]">
                          {displayH1}
                      </h1>
                  </div>

                  {hasRichContent ? (
                      <MarkdownRenderer content={tagDoc.description} />
                  ) : (
                      <p className="text-xl text-muted-foreground leading-relaxed">
                          {fallbackDescription}
                      </p>
                  )}

                  {/* FAQ Section */}
                  {tagDoc?.faq && tagDoc.faq.length > 0 && (
                      <div className="mt-12 pt-8 border-t border-white/10">
                      <h2 className="text-2xl font-bold mb-6 text-white">Preguntas Frecuentes</h2>
                      <Accordion type="single" collapsible className="w-full space-y-4">
                          {tagDoc.faq.map((item: any, index: number) => (
                          <AccordionItem 
                              key={index} 
                              value={`item-${index}`} 
                              className="border border-white/10 rounded-lg px-6 py-2 bg-[#0b0e0c] hover:border-primary/50 transition-all duration-200 shadow-sm hover:shadow-md"
                          >
                              <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-white hover:text-primary dark:hover:text-primary hover:no-underline py-4 [&[data-state=open]]:text-primary dark:[&[data-state=open]]:text-primary">
                              <span className="flex items-start gap-3">
                                  <ChevronDown className="w-5 h-5 shrink-0 transition-transform duration-200 mt-0.5" />
                                  <span className="flex-1">{item.question}</span>
                              </span>
                              </AccordionTrigger>
                              <AccordionContent className="text-white/58 pt-2 pb-4 text-sm md:text-base leading-relaxed pl-8">
                              {item.answer}
                              </AccordionContent>
                          </AccordionItem>
                          ))}
                      </Accordion>
                      </div>
                  )}
              </div>

              {/* Posts Grid */}
              <div>
                  <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
                      <span className="bg-primary w-2 h-8 rounded-full inline-block"/>
                      Artículos Recientes
                  </h3>
                  {posts.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {posts.map((post: any, index: number) => (
                          <BlogCard key={post._id} post={post} priority={index < 2} />
                      ))}
                      </div>
                  ) : (
                      <div className="text-center py-20 bg-[#0d110e] rounded-xl border border-white/10">
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
              <div className="bg-[#0d110e]/60 border border-white/10 rounded-xl p-6">
                  <NewsletterForm />
              </div>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
