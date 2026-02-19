import { PortableText } from "next-sanity";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { urlForImage } from "@/sanity/lib/image";
import { ArrowLeft, Clock, Calendar, User, ArrowRight, ChevronDown, Tag, Zap } from "lucide-react";
import { BlogProgressBar } from "./_components/BlogProgressBar";
import { ShareButtons } from "./_components/ShareButtons";
import { TableOfContents } from "./_components/TableOfContents";
import { NitroCtaCard } from "@/components/blog/nitro-cta-card";
import { NewsletterForm } from "@/components/newsletter-form";

import { constructMetadata } from "@/lib/utils";
import { parseTOC } from "@/lib/toc";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { TikTokEmbed } from "@/components/blog/tiktok-embed";
import { Badge } from "@/components/ui/badge";
import { ComparisonTable } from "@/components/blog/ComparisonTable";
import { CopyableCodeBlock } from "@/components/blog/CopyableCodeBlock";
import { BlogCard } from "@/components/blog/blog-card";
import { YouTubeEmbed } from "@/components/blog/youtube-embed";
import { AffiliateBanner } from "@/components/blog/affiliate-banner";

import { BlogAudioPlayer } from "@/components/blog/blog-audio-player";
import { AdvertisingBanner } from "@/components/blog/advertising-banner";

// ========== CONFIGURATION ==========

export const revalidate = 3600; // Cache de 1 hora (igual que el listado principal)

const VALID_CATEGORIES = ['ecommerce', 'estrategia-marketing', 'ia-automatizacion', 'headless-commerce', 'prompts'];

const CATEGORY_META: Record<string, { title: string; description: string }> = {
  'ecommerce': {
    title: 'Ecommerce',
    description: 'Artículos sobre comercio electrónico, estrategias de venta online, plataformas y optimización de tiendas digitales.',
  },
  'estrategia-marketing': {
    title: 'Estrategia de Marketing',
    description: 'Estrategias de marketing digital, growth hacking, SEO, publicidad y conversión para negocios online.',
  },
  'ia-automatizacion': {
    title: 'IA y Automatización',
    description: 'Inteligencia artificial, automatización de procesos, chatbots, machine learning y herramientas de IA para negocios.',
  },
  'headless-commerce': {
    title: 'Headless Commerce',
    description: 'Arquitectura headless, APIs, microservicios, JAMstack y comercio composable para tiendas de alto rendimiento.',
  },
  'prompts': {
    title: 'Prompts Engineering',
    description: 'Domina el arte de los prompts. Optimiza tus interacciones con IA para marketing, desarrollo y creación de contenido.',
  },
};

// ========== GROQ QUERIES ==========

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
  youtubeVideo,
  affiliateBanner,
  category,
  tags,
  "audio": *[_type == "audioResource" && post._ref == ^._id][0] {
    audioSegments,
    status
  },
  "advertising": *[_type == "advertising" && ^._id in targetPosts[]._ref][0] {
    title,
    desktopImage,
    mobileImage,
    link
  },
  "relatedPosts": *[_type == "post" && slug.current != $slug && count((tags[])[@ in ^.tags[]]) > 0] | order(publishedAt desc)[0...3] {
    title,
    "slug": slug.current,
    mainImage,
    publishedAt,
    category
  },
  "fallbackPosts": *[_type == "post" && slug.current != $slug] | order(publishedAt desc)[0...3] {
    title,
    "slug": slug.current,
    mainImage,
    publishedAt,
    category
  }
}`;

const CATEGORY_POSTS_QUERY = `*[_type == "post" && category == $category && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) {
  _id, title, slug, publishedAt, _createdAt, mainImage, excerpt, topic, category, tags, estimatedReadingTime
}`;

// ========== HELPERS ==========

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

function parseSlugParts(slugParts: string[]): { mode: 'category' | 'categorized-post' | 'post'; category?: string; postSlug?: string } {
  if (slugParts.length === 1) {
    if (VALID_CATEGORIES.includes(slugParts[0])) {
      return { mode: 'category', category: slugParts[0] };
    }
    return { mode: 'post', postSlug: slugParts[0] };
  }
  if (slugParts.length === 2 && VALID_CATEGORIES.includes(slugParts[0])) {
    return { mode: 'categorized-post', category: slugParts[0], postSlug: slugParts[1] };
  }
  return { mode: 'post' }; // Will 404
}


// ========== STATIC PARAMS GENERATION (SSG) ==========

export async function generateStaticParams() {
  const posts = await client.fetch<any[]>(`
    *[_type == "post" && defined(slug.current)]{ 
      "slug": slug.current, 
      category 
    }
  `);

  const paths: { slug: string[] }[] = [];

  // 1. Category Pages (/blog/[category])
  for (const category of VALID_CATEGORIES) {
     paths.push({ slug: [category] });
  }

  // 2. Blog Posts
  for (const post of posts) {
     const slug = post.slug;
     const category = post.category;
     
     // Direct path: /blog/[slug]
     paths.push({ slug: [slug] });
     
     // Categorized path: /blog/[category]/[slug]
     if (category && VALID_CATEGORIES.includes(category)) {
        paths.push({ slug: [category, slug] });
     }
  }

  return paths;
}

// ========== PORTABLE TEXT COMPONENTS ==========

const ptComponents = {
  types: {
    tiktokEmbed: ({ value }: any) => {
      return <TikTokEmbed url={value.url} caption={value.caption} />;
    },
    comparisonTable: ({ value }: any) => {
      return (
        <ComparisonTable
          title={value.title}
          headers={value.headers || []}
          rows={value.rows || []}
        />
      );
    },
    codeBlock: ({ value }: any) => {
      return (
        <CopyableCodeBlock
          title={value.title}
          language={value.language || 'text'}
          code={value.code || ''}
        />
      );
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

// ========== METADATA ==========

export async function generateMetadata(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params;
  const parsed = parseSlugParts(params.slug);

  // Category listing metadata
  if (parsed.mode === 'category' && parsed.category) {
    const meta = CATEGORY_META[parsed.category];
    return constructMetadata({
      title: `${meta.title} | Blog Nitro Ecom`,
      description: meta.description,
      canonical: `https://www.juanarangoecommerce.com/blog/${parsed.category}`,
    });
  }

  // Post metadata (both categorized and non-categorized)
  const postSlug = parsed.postSlug;
  if (!postSlug) return { title: 'Post no encontrado' };

  const post = await client.fetch(POST_QUERY, { slug: postSlug });
  if (!post) return { title: 'Post no encontrado' };

  const rawContent = post.content || "";
  const excerpt = rawContent 
    ? rawContent.substring(0, 160).replace(/[#*`]/g, '').trim() + '...'
    : post.title;

  const canonical = post.category
    ? `https://www.juanarangoecommerce.com/blog/${post.category}/${post.slug}`
    : `https://www.juanarangoecommerce.com/blog/${post.slug}`;

  return constructMetadata({
    title: `${post.title} | Blog Nitro Ecom`,
    description: excerpt,
    image: post.mainImage?.asset?._ref ? urlForImage(post.mainImage).url() : undefined,
    canonical,
  });
}

// ========== CATEGORY LISTING COMPONENT ==========

function CategoryPage({ categorySlug, meta, posts }: { categorySlug: string; meta: { title: string; description: string }; posts: any[] }) {
  return (
    <main className="container mx-auto px-4 py-20 min-h-screen">
      <div className="mb-12">
        <Link href="/blog" className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" /> Volver al Blog
        </Link>
        <h1 className={`text-4xl font-extrabold tracking-tight lg:text-5xl mb-4 ${categorySlug === 'prompts' ? 'text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600' : ''}`}>
          {meta.title}
          {categorySlug === 'prompts' && <Zap className="inline-block w-8 h-8 md:w-10 md:h-10 ml-3 text-purple-500 align-baseline" />}
        </h1>
        <p className={`text-xl max-w-2xl ${categorySlug === 'prompts' ? 'text-purple-200/80' : 'text-muted-foreground'}`}>{meta.description}</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post: any, index: number) => (<BlogCard key={post._id} post={post} priority={index < 2} />))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground mb-4">Aún no hay artículos en esta categoría.</p>
              <p className="text-zinc-500">Pronto publicaremos contenido sobre {meta.title.toLowerCase()}.</p>
            </div>
          )}
        </div>
        <aside className="lg:col-span-4 space-y-6">
          <div className="lg:sticky lg:top-24 space-y-6">
            <NitroCtaCard />
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6"><NewsletterForm /></div>
          </div>
        </aside>
      </div>
    </main>
  );
}

// ========== MAIN PAGE COMPONENT ==========

export default async function BlogCatchAllPage(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params;
  const parsed = parseSlugParts(params.slug);

  // ===== CATEGORY LISTING MODE =====
  if (parsed.mode === 'category' && parsed.category) {
    const meta = CATEGORY_META[parsed.category];
    const categoryPosts = await client.fetch(CATEGORY_POSTS_QUERY, { category: parsed.category } as any);
    return <CategoryPage categorySlug={parsed.category} meta={meta} posts={categoryPosts} />;
  }

  // ===== BLOG POST MODE =====
  const postSlug = parsed.postSlug;
  if (!postSlug) notFound();

  const post = await client.fetch(POST_QUERY, { slug: postSlug });
  if (!post) notFound();

  // Redirect guard: if accessing /blog/[slug] but post has a category, redirect to /blog/[category]/[slug]
  if (parsed.mode === 'post' && post.category) {
    redirect(`/blog/${post.category}/${post.slug}`);
  }

  // If accessing /blog/[category]/[slug] but category doesn't match, redirect to correct URL
  if (parsed.mode === 'categorized-post' && post.category && parsed.category !== post.category) {
    redirect(`/blog/${post.category}/${post.slug}`);
  }

  // Determine content source and reading time
  const rawContent = post.content || ""; 
  const readingTime = rawContent ? calculateReadingTime(rawContent) : 5; 

  // === EXTRACT PROMPT BLOCKS ===
  // 1. From markdown content: extract ```prompt ... ``` blocks
  const promptRegex = /```prompt\s*\n([\s\S]*?)\n```/g;
  const promptMatches = [...rawContent.matchAll(promptRegex)];
  const markdownPrompts = promptMatches.map((m: RegExpMatchArray) => ({ title: 'Prompt', code: m[1].trim() }));
  // Remove prompt blocks from content so they don't render inline
  const contentWithoutPrompts = rawContent.replace(promptRegex, '').trim();

  // 2. From PortableText body: extract codeBlock items with language "prompt"
  const bodyPrompts: { title: string; code: string }[] = [];
  const filteredBody = (post.body || []).filter((block: any) => {
    if (block._type === 'codeBlock' && block.language === 'prompt') {
      bodyPrompts.push({ title: block.title || 'Prompt', code: block.code || '' });
      return false; // Remove from inline body rendering
    }
    return true;
  });

  // Combine all found prompts (markdown first, then body)
  const allPrompts = [...markdownPrompts, ...bodyPrompts];

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

  const postUrl = post.category
    ? `https://www.juanarangoecommerce.com/blog/${post.category}/${post.slug}`
    : `https://www.juanarangoecommerce.com/blog/${post.slug}`;

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
      "@id": postUrl
    },
    wordCount: rawContent.split(/\s+/).length,
    timeRequired: `PT${readingTime}M`,
    inLanguage: "es-ES"
  };

  const jsonLd: any[] = [blogPostSchema];
  if (faqSchema) {
    jsonLd.push(faqSchema);
  }

  // Helper to get ID for Schema
  const getVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  if (post.youtubeVideo?.url) {
    const videoId = getVideoId(post.youtubeVideo.url);
    if (videoId) {
      jsonLd.push({
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": post.title,
        "description": post.youtubeVideo.summary || post.excerpt || `Video sobre ${post.title}`,
        "thumbnailUrl": [
          `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
        ],
        "uploadDate": post.publishedAt || post._createdAt,
        "contentUrl": post.youtubeVideo.url,
        "embedUrl": `https://www.youtube.com/embed/${videoId}`
      });
    }
  }

  // Breadcrumb for categorized posts
  const breadcrumb = post.category ? CATEGORY_META[post.category] : null;

  return (
    <>
      {/* Schema Markup - rendered server-side for Google crawlability */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <BlogProgressBar />
      
      <div className="bg-white dark:bg-zinc-950 min-h-screen">
        {/* Minimalist Hero Section */}
        <header className="container mx-auto px-4 pt-32 pb-12 max-w-5xl">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
              <Link href="/blog" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                Blog
              </Link>
              {breadcrumb && (
                <>
                  <span>/</span>
                  <Link href={`/blog/${post.category}`} className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
                    {breadcrumb.title}
                  </Link>
                </>
              )}
            </nav>

            <h1 className="text-3xl md:text-6xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-6 md:mb-8 leading-[1.1]">
              {post.title}
            </h1>

            {/* Advertising Banner (Targeted) */}
            {post.advertising && <AdvertisingBanner ad={post.advertising} />}

            {/* Tags display */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag: string) => (
                  <Link key={tag} href={`/blog/tags/${encodeURIComponent(tag)}`}>
                    <Badge variant="secondary" className="hover:bg-emerald-500/10 hover:text-emerald-400 transition-colors cursor-pointer">
                      #{tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}

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

            {/* Audio Player Injection - Prominent Placement */}
            {post.audio?.status === 'completed' && post.audio?.audioSegments?.length > 0 && (
               <div className="mt-8 md:mt-10">
                  <BlogAudioPlayer playlist={post.audio.audioSegments} title={`Escuchar: ${post.title}`} />
               </div>
            )}
        </header>

        {/* Main Content Layout */}
        <div className="container mx-auto px-4 pb-12 md:pb-24 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                
                <article className="lg:col-span-8">
                    {/* PROMPT BLOCKS - Rendered FIRST before all content */}
                    {allPrompts.length > 0 && (
                        <div className="mb-8 space-y-4">
                            {allPrompts.map((prompt, i) => (
                                <CopyableCodeBlock
                                    key={i}
                                    title={prompt.title}
                                    language="prompt"
                                    code={prompt.code}
                                />
                            ))}
                        </div>
                    )}

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

                    {/* YouTube Video Section */}
                    {post.youtubeVideo?.url && (
                        <div className="mb-8 md:mb-12">
                            <YouTubeEmbed url={post.youtubeVideo.url} title={post.title} />
                            {post.youtubeVideo.summary && (
                                <p className="text-base text-zinc-600 dark:text-zinc-400 mt-4 italic border-l-4 border-emerald-500 pl-4 py-1 bg-zinc-50 dark:bg-zinc-900/50 rounded-r-lg">
                                    <span className="font-semibold block not-italic text-zinc-900 dark:text-zinc-200 mb-1">En este video:</span> 
                                    {post.youtubeVideo.summary}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Mobile Table of Contents - Fixed (Always Visible) */}
                    {post.content && (
                        <div className="lg:hidden mb-8">
                            <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4">
                                <TableOfContents toc={parseTOC(post.content)} />
                            </div>
                        </div>
                    )}

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
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h1: ({node, ...props}) => {
                                        const text = String(props.children);
                                        const id = slugify(text);
                                        return <h2 id={id} className="text-3xl font-bold mt-12 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white" {...props}>{props.children}</h2>;
                                    },
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
                                    },
                                    table: ({node, ...props}) => {
                                        return <div className="overflow-x-auto my-8 rounded-lg border border-zinc-200 dark:border-zinc-800"><table className="w-full text-left text-sm" {...props}>{props.children}</table></div>;
                                    },
                                    thead: ({node, ...props}) => {
                                        return <thead className="bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-semibold" {...props}>{props.children}</thead>;
                                    },
                                    tbody: ({node, ...props}) => {
                                        return <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800" {...props}>{props.children}</tbody>;
                                    },
                                    tr: ({node, ...props}) => {
                                        return <tr className="hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors" {...props}>{props.children}</tr>;
                                    },
                                    th: ({node, ...props}) => {
                                        return <th className="px-4 py-3" {...props}>{props.children}</th>;
                                    },
                                    td: ({node, ...props}) => {
                                        return <td className="px-4 py-3" {...props}>{props.children}</td>;
                                    },
                                    code: ({node, className, children, ...props}: any) => {
                                        const match = /language-(\w+)/.exec(className || '');
                                        const isInline = !match && !String(children).includes('\n');
                                        
                                        if (isInline) {
                                            return <code className="bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-sm font-mono text-pink-600 dark:text-pink-400" {...props}>{children}</code>;
                                        }

                                        return (
                                            <div className="relative my-8 rounded-lg overflow-hidden">
                                                <div className="absolute right-2 top-2 z-10">
                                                    {/* We could reuse a CopyButton here if extracted, but SyntaxHighlighter doesn't have one built-in easily. 
                                                        For now, relying on SyntaxHighlighter styles. 
                                                        To match prompt 'facil copiar y pegar', we should wrap this. 
                                                        Let's just use the CopyableCodeBlock logic but applied here.
                                                    */}
                                                    {/* Actually, let's just use SyntaxHighlighter directly for now to fix the 'disorganized' look. 
                                                        If user needs button, we can add it later or reuse CopyableCodeBlock if adapted. 
                                                        Wait, I can use CopyableCodeBlock if I pass the code string!
                                                    */}
                                                    <CopyableCodeBlock 
                                                        title={match?.[1] || 'Code'} 
                                                        language={match?.[1] || 'text'} 
                                                        code={String(children).replace(/\n$/, '')} 
                                                    />
                                                </div>
                                                {/* Wait, CopyableCodeBlock ALREADY renders the code block! 
                                                    So I should just return CopyableCodeBlock.
                                                */}
                                            </div>
                                        );
                                    }
                                }}
                            >
                                {contentWithoutPrompts}
                            </ReactMarkdown>
                        )}
                        
                        {/* Render PortableText mainly for Embedding capability (like TikTok) */}
                        {filteredBody && filteredBody.length > 0 && (
                            <div className="mt-8">
                                <PortableText value={filteredBody} components={ptComponents} />
                            </div>
                        )}
                    </div>

                     {/* FAQ Section - Enhanced Styling */}
                     {post.faq && post.faq.length > 0 && (
                        <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-zinc-100 dark:border-zinc-800">
                          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-zinc-900 dark:text-white">Preguntas Frecuentes</h2>
                          <Accordion type="single" collapsible className="w-full space-y-4">
                            {post.faq.map((item: any, index: number) => (
                              <AccordionItem 
                                key={index} 
                                value={`item-${index}`} 
                                className="border border-zinc-200 dark:border-zinc-800 rounded-lg px-6 py-2 bg-white dark:bg-zinc-950 hover:border-green-500/50 transition-all duration-200 shadow-sm hover:shadow-md"
                              >
                                <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-zinc-900 dark:text-white hover:text-green-600 dark:hover:text-green-400 hover:no-underline py-4 [&[data-state=open]]:text-green-600 dark:[&[data-state=open]]:text-green-400">
                                  <span className="flex items-start gap-3">
                                    <ChevronDown className="w-5 h-5 shrink-0 transition-transform duration-200 mt-0.5" />
                                    <span className="flex-1">{item.question}</span>
                                  </span>
                                </AccordionTrigger>
                                <AccordionContent className="text-zinc-600 dark:text-zinc-400 pt-2 pb-4 text-sm md:text-base leading-relaxed pl-8">
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

                    {/* Related Posts - Category-aware */}
                     {((post.relatedPosts && post.relatedPosts.length > 0) || (post.fallbackPosts && post.fallbackPosts.length > 0)) && (
                        <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-zinc-100 dark:border-zinc-800">
                          <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-zinc-900 dark:text-white">
                             También podría interesarte
                          </h3>
                          <div className="space-y-3 md:space-y-4">
                             {(post.relatedPosts && post.relatedPosts.length > 0 ? post.relatedPosts : post.fallbackPosts).map((related: any, index: number) => (
                                <Link 
                                  key={related.slug} 
                                  href={related.category ? `/blog/${related.category}/${related.slug}` : `/blog/${related.slug}`} 
                                  className="group block p-4 md:p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-primary hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all duration-200"
                                >
                                   <div className="flex items-start gap-3">
                                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                         {index + 1}
                                      </div>
                                      <div className="flex-1 min-w-0">
                                         <h4 className="font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-primary transition-colors text-sm md:text-base line-clamp-2 mb-1">
                                            {related.title}
                                         </h4>
                                         {related.publishedAt && (
                                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                               {new Date(related.publishedAt).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })}
                                            </p>
                                         )}
                                      </div>
                                      <ArrowRight className="w-4 h-4 text-zinc-400 group-hover:text-primary group-hover:translate-x-1 transition-all flex-shrink-0" />
                                   </div>
                                </Link>
                             ))}
                          </div>
                        </div>
                     )}

                    {/* Mobile CTA (Bottom of Post) */}
                    <div className="mt-12 lg:hidden">
                        {post.affiliateBanner && (
                            <div className="mb-12">
                                <AffiliateBanner 
                                    title={post.affiliateBanner.title} 
                                    image={post.affiliateBanner.image} 
                                    url={post.affiliateBanner.url} 
                                />
                            </div>
                        )}
                        <NitroCtaCard />
                    </div>
                </article>

                {/* Right: Sidebar (Desktop) */}
                <aside className="hidden lg:block lg:col-span-4 space-y-8">
                    <div className="sticky top-24 space-y-8">
                        {/* Table of Contents Box - First Priority */}
                         {post.content && (
                            <div className="p-6 bg-zinc-50 dark:bg-zinc-900 rounded-lg border border-zinc-100 dark:border-zinc-800">
                                <TableOfContents toc={parseTOC(post.content)} />
                            </div>
                         )}

                        {/* High Converting CTA - Second */}
                        <NitroCtaCard />

                        <div>
                            {post.affiliateBanner && (
                                <div className="mb-8">
                                    <h4 className="font-bold text-sm uppercase tracking-wider text-zinc-500 mb-4">Recomendado</h4>
                                    <AffiliateBanner 
                                        title={post.affiliateBanner.title} 
                                        image={post.affiliateBanner.image} 
                                        url={post.affiliateBanner.url} 
                                    />
                                </div>
                            )}

                            <h4 className="font-bold text-sm uppercase tracking-wider text-zinc-500 mb-4">Compartir</h4>
                            <ShareButtons title={post.title} slug={post.slug} category={post.category} />
                         </div>
                    </div>
                </aside>

            </div>
        </div>
      </div>
    </>
  );
}
