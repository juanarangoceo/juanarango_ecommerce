import { PortableText } from "next-sanity";
import ReactMarkdown from 'react-markdown';
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { urlForImage } from "@/sanity/lib/image";
import { ArrowLeft, Clock, Calendar, User, ArrowRight } from "lucide-react";
import { BlogProgressBar } from "./_components/BlogProgressBar";
import { ShareButtons } from "./_components/ShareButtons";
import { TableOfContents } from "./_components/TableOfContents";
import { NitroCtaCard } from "./_components/NitroCtaCard";
import { NewsletterForm } from "@/components/newsletter-form";
import Script from "next/script";
import { constructMetadata } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TikTokEmbed } from "@/components/blog/tiktok-embed";
import { Badge } from "@/components/ui/badge";

// GROQ Query for Single Post (Updated)
const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title,
  mainImage,
  body,
  content,
  publishedAt,
  _createdAt,
  "slug": slug.current,
  author,
  faq,
  "relatedPosts": *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3] {
    title,
    "slug": slug.current,
    mainImage,
    publishedAt
  }
}`;

export const revalidate = 60;

function calculateReadingTime(text: string): number {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Portable Text Components (with TikTok)
const ptComponents = {
  types: {
    tiktokEmbed: ({ value }: any) => {
      return <TikTokEmbed url={value.url} caption={value.caption} />;
    },
    image: ({ value }: any) => {
        if (!value?.asset?._ref) return null;
        return (
          <div className="relative w-full aspect-video my-8 rounded-lg overflow-hidden">
            <Image
              src={urlForImage(value).url()}
              alt={value.alt || 'Blog Image'}
              fill
              className="object-cover"
            />
          </div>
        );
      }
  },
};

// Generate metadata for SEO
export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await client.fetch(POST_QUERY, { slug: params.slug });

  if (!post) {
    return {
      title: 'Post no encontrado',
    };
  }

  const rawContent = post.content || "";
  const excerpt = rawContent 
    ? rawContent.substring(0, 160).replace(/[#*`]/g, '').trim() + '...'
    : post.title;

  return constructMetadata({
    title: `${post.title} | Blog Nitro Ecom`,
    description: excerpt,
    image: post.mainImage?.asset?._ref ? urlForImage(post.mainImage).url() : undefined,
    canonical: `https://www.juanarangoecommerce.com/blog/${post.slug}`,
  });
}

export default async function BlogPostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const post = await client.fetch(POST_QUERY, { slug: params.slug });

  if (!post) {
    notFound();
  }

  // Determine content source and reading time
  const rawContent = post.content || ""; 
  const readingTime = rawContent ? calculateReadingTime(rawContent) : 5; 

  const date = new Date(post.publishedAt || post._createdAt).toLocaleDateString("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const authorName = post.author || "Juan Arango";

  // Schema Markup: BlogPosting & FAQPage
  const imageUrl = post.mainImage?.asset?._ref 
    ? urlForImage(post.mainImage).url() 
    : "https://res.cloudinary.com/dohwyszdj/image/upload/v1769285570/logo_pt9zn7.jpg";

  const excerpt = rawContent 
    ? rawContent.substring(0, 160).replace(/[#*`]/g, '').trim() + '...'
    : post.title;

  const faqSchema = post.faq && post.faq.length > 0 ? {
    "@type": "FAQPage",
    "mainEntity": post.faq.map((f: any) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer
      }
    }))
  } : null;

  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    image: imageUrl,
    datePublished: post.publishedAt || post._createdAt,
    dateModified: post.publishedAt || post._createdAt,
    author: {
      "@type": "Person",
      name: authorName,
      url: "https://www.juanarangoecommerce.com/sobre-mi"
    },
    publisher: {
      "@type": "Organization",
      name: "Nitro Ecom",
      logo: {
        "@type": "ImageObject",
        url: "https://res.cloudinary.com/dohwyszdj/image/upload/v1769285570/logo_pt9zn7.jpg"
      }
    },
    description: excerpt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.juanarangoecommerce.com/blog/${post.slug}`
    },
    wordCount: rawContent.split(/\s+/).length,
    timeRequired: `PT${readingTime}M`,
    inLanguage: "es-ES"
  };

  const jsonLd: any[] = [blogPostSchema];
  if (faqSchema) {
    jsonLd.push(faqSchema);
  }

  return (
    <>
      {/* Schema Markup */}
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BlogProgressBar />
      
      <div className="bg-white dark:bg-zinc-950 min-h-screen">
        {/* Minimalist Hero Section */}
        <header className="container mx-auto px-4 pt-32 pb-12 max-w-5xl">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al Blog
            </Link>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-8 leading-[1.1]">
              {post.title}
            </h1>

            <div className="flex flex-wrap gap-6 items-center text-sm text-zinc-500 dark:text-zinc-400 border-t border-b border-zinc-100 dark:border-zinc-900 py-6">
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="font-semibold text-zinc-900 dark:text-zinc-200">{authorName}</span>
                </div>
                <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{date}</span>
                </div>
                <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800" />
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{readingTime} min de lectura</span>
                </div>
            </div>
        </header>

        {/* Main Content Layout */}
        <div className="container mx-auto px-4 pb-24 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                <article className="lg:col-span-8">
                    {post.mainImage?.asset?._ref && (
                        <div className="mb-12 rounded-lg overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-sm relative aspect-video">
                            <Image 
                                src={urlForImage(post.mainImage).url()} 
                                alt={post.title}
                                fill
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 800px"
                                className="object-cover"
                            />
                        </div>
                    )}

                    {/* TikToks or other PortableText Blocks (rendered BEFORE markdown if specified? No, usually after or mixed. 
                        Since 'content' is markdown, we render that first. If the user wants TikToks, they might add them to 'body' in Studio.
                        We render Body here as well to support embeds.)
                    */}
                    
                    <div className="prose prose-zinc dark:prose-invert prose-lg max-w-none
                        prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-zinc-900 dark:prose-headings:text-white
                        prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-zinc-100 dark:prose-h2:border-zinc-900
                        prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-300
                        prose-strong:text-zinc-900 dark:prose-strong:text-white prose-strong:font-semibold
                        prose-blockquote:border-l-4 prose-blockquote:border-green-500 prose-blockquote:bg-zinc-50 dark:prose-blockquote:bg-zinc-900 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
                        prose-ul:list-disc prose-ul:pl-6
                        prose-li:marker:text-green-500
                    ">
                        {post.content && (
                            <ReactMarkdown
                                components={{
                                    h2: ({node, ...props}) => {
                                        const text = String(props.children);
                                        const id = slugify(text);
                                        return <h2 id={id} className="text-3xl font-bold mt-12 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white" {...props}>{props.children}</h2>;
                                    },
                                    h3: ({node, ...props}) => {
                                        const text = String(props.children);
                                        const id = slugify(text);
                                        return <h3 id={id} className="text-2xl font-bold mt-8 mb-4 text-zinc-900 dark:text-zinc-100" {...props}>{props.children}</h3>;
                                    },
                                    p: ({node, ...props}) => {
                                        return <p className="mb-6 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300" {...props}>{props.children}</p>;
                                    },
                                    ul: ({node, ...props}) => {
                                        return <ul className="my-6 space-y-2 pl-6 list-disc text-zinc-700 dark:text-zinc-300" {...props}>{props.children}</ul>;
                                    },
                                    ol: ({node, ...props}) => {
                                        return <ol className="my-6 space-y-2 pl-6 list-decimal text-zinc-700 dark:text-zinc-300" {...props}>{props.children}</ol>;
                                    },
                                    li: ({node, ...props}) => {
                                        return <li className="mb-2" {...props}>{props.children}</li>;
                                    },
                                    strong: ({node, ...props}) => {
                                        return <strong className="font-bold text-zinc-900 dark:text-white" {...props}>{props.children}</strong>;
                                    },
                                    blockquote: ({node, ...props}) => {
                                        return <blockquote className="border-l-4 border-green-500 bg-zinc-50 dark:bg-zinc-900 py-3 px-6 my-8 rounded-r-lg italic text-zinc-700 dark:text-zinc-300" {...props}>{props.children}</blockquote>;
                                    }
                                }}
                            >
                                {post.content}
                            </ReactMarkdown>
                        )}
                        
                        {/* Render PortableText mainly for Embedding capability (like TikTok) */}
                        {post.body && (
                            <div className="mt-8">
                                <PortableText value={post.body} components={ptComponents} />
                            </div>
                        )}
                    </div>

                     {/* FAQ Section */}
                     {post.faq && post.faq.length > 0 && (
                        <div className="mt-16 pt-12 border-t border-zinc-100 dark:border-zinc-800">
                          <h2 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-white">Preguntas Frecuentes</h2>
                          <Accordion type="single" collapsible className="w-full">
                            {post.faq.map((item: any, index: number) => (
                              <AccordionItem key={index} value={`item-${index}`} className="border-zinc-200 dark:border-zinc-800">
                                <AccordionTrigger className="text-left text-zinc-900 dark:text-white hover:text-primary hover:no-underline">
                                  {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-zinc-600 dark:text-zinc-400">
                                  {item.answer}
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                        </div>
                     )}

                    <div className="mt-12 mb-12">
                      <NewsletterForm />
                    </div>

                    {/* Related Posts */}
                     {post.relatedPosts && post.relatedPosts.length > 0 && (
                        <div className="mt-16 pt-12 border-t border-zinc-100 dark:border-zinc-800">
                          <h3 className="text-xl font-bold mb-6 text-zinc-900 dark:text-white flex items-center gap-2">
                             También podría interesarte
                          </h3>
                          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                             {post.relatedPosts.map((related: any) => (
                                <Link key={related.slug} href={`/blog/${related.slug}`} className="group block">
                                   <div className="aspect-video relative rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-3">
                                      {related.mainImage ? (
                                         <Image 
                                            src={urlForImage(related.mainImage).url()} 
                                            alt={related.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                         />
                                      ) : (
                                         <div className="flex items-center justify-center h-full text-zinc-400">
                                            <span className="text-xs">Sin imagen</span>
                                         </div>
                                      )}
                                   </div>
                                   <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors text-sm line-clamp-2">
                                      {related.title}
                                   </h4>
                                </Link>
                             ))}
                          </div>
                        </div>
                     )}

                    {/* Mobile CTA (Bottom of Post) */}
                    <div className="mt-12 lg:hidden">
                        <NitroCtaCard />
                    </div>
                </article>

                {/* Right: Sidebar (Desktop) */}
                <aside className="hidden lg:block lg:col-span-4 space-y-8">
                    <div className="sticky top-24 space-y-8">
                        {/* High Converting CTA */}
                        <NitroCtaCard />

                        {/* Table of Contents Box */}
                         {post.content && (
                            <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-800">
                                <TableOfContents content={post.content} />
                            </div>
                         )}

                         {/* Share Action */}
                         <div>
                            <h4 className="font-bold text-sm uppercase tracking-wider text-zinc-500 mb-4">Compartir</h4>
                            <ShareButtons title={post.title} slug={post.slug} />
                         </div>
                    </div>
                </aside>

            </div>
        </div>
      </div>
    </>
  );
}
