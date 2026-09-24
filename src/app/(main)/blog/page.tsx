import Link from "next/link";
import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { NewsletterForm } from "@/components/newsletter-form";
import { BlogSearch } from "@/components/blog-search";
import { RecentPostPills } from "@/components/recent-post-pills";
import { BlogCard } from "@/components/blog/blog-card";
import { TrendingCard } from "@/components/blog/trending-card";
import { NitroCtaCard } from "@/components/blog/nitro-cta-card";
import { SidebarAppsBanner, SidebarComparisonBanner, SidebarGuidesBanner } from "@/components/blog/sidebar-banners";
import { Pagination } from "@/components/ui/pagination";

import { constructMetadata } from "@/lib/utils";

export const metadata: Metadata = constructMetadata({
  title: 'Blog | Nitro Ecom - E-commerce y Tecnología',
  description: 'Perspectivas sobre E-commerce, Tecnología y Escalamiento. Aprende estrategias avanzadas para hacer crecer tu negocio digital.',
  canonical: 'https://www.juanarangoecommerce.com/blog'
})

// GROQ Query - Sorted by date (newest first), with pagination
// Uses publishedAt if available, otherwise falls back to _createdAt
const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  && !(_id in path("drafts.**"))
]|order(coalesce(publishedAt, _createdAt) desc) {
  _id,
  title,
  slug,
  publishedAt,
  _createdAt,
  mainImage,
  "excerpt": coalesce(excerpt, array::join(string::split(pt::text(body), "")[0..199], "") + "…"),
  topic,
  category,
  tags,
  estimatedReadingTime
}`;

const POSTS_COUNT_QUERY = `count(*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))])`;

// ISR: Revalidate every 1 hour — leverages Sanity CDN cache for fast responses


const POSTS_PER_PAGE = 10;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  
  let posts: any[] = [];
  let totalPosts = 0;
  
  try {
    // Fetch total count
    totalPosts = await client.fetch(POSTS_COUNT_QUERY);
    
    // Fetch paginated posts
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    const paginatedQuery = `${POSTS_QUERY}[${start}...${end}]`;
    posts = await client.fetch(paginatedQuery);
  } catch (error) {
    console.error("❌ Error fetching posts for blog page:", error);
  }

  const safelyFilesPosts = Array.isArray(posts) ? posts : [];
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  // Prepare data for "Recent Pills" (Top 5 latest)
  const recentPosts = safelyFilesPosts.slice(0, 5).map((p: any) => ({
    title: p.title,
    slug: p?.slug?.current || "",
    category: p?.category || undefined
  }));

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-5 pb-24 pt-32 lg:px-8 lg:pt-44">
      {/* Header */}
      <div className="mx-auto mb-12 max-w-4xl text-center lg:mb-16">
        <h1 className="text-balance font-display text-[clamp(2.8rem,7vw,6.5rem)] font-bold leading-[.96] tracking-[-0.05em] text-white">
          Ideas para construir un negocio digital <span className="text-primary">más claro.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/55">
          Análisis y guías sobre ecommerce, tecnología e IA aplicada a decisiones reales.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-6 px-4">
         <BlogSearch />
      </div>

      {/* Category Navigation — horizontal scroll on mobile */}
      <div className="flex gap-2 overflow-x-auto pb-1 px-4 md:px-0 md:flex-wrap md:justify-center mb-8 scrollbar-hide">
        {[
          { slug: 'ecommerce', label: 'Ecommerce' },
          { slug: 'estrategia-marketing', label: 'Marketing' },
          { slug: 'ia-automatizacion', label: 'IA y Automatización' },
          { slug: 'headless-commerce', label: 'Headless Commerce' },
          { slug: 'prompts', label: '⚡ Prompts' },
        ].map((cat) => (
          <Link
            key={cat.slug}
            href={`/blog/${cat.slug}`}
            className={`shrink-0 px-4 py-2 text-sm font-medium rounded-full border transition-all duration-200 flex items-center gap-1.5
              ${
                cat.slug === 'prompts'
                  ? 'bg-primary/8 text-primary border-primary/20 hover:bg-primary/12 hover:border-primary/40'
                  : 'bg-[#0d110e] text-white/55 border-white/9 hover:bg-primary/8 hover:text-primary hover:border-primary/30'
              }`
            }
          >
            {cat.label}
          </Link>
        ))}
      </div>

      {/* Recent Post Pills */}
      <div className="w-full max-w-5xl mx-auto mb-16">
         <RecentPostPills posts={recentPosts} />
      </div>

      {/* Main Content: 2 Column Layout (Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Blog Posts */}
        <div className="lg:col-span-8">
          {/* Grid for 2 cards per row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {safelyFilesPosts.length > 0 ? (
              safelyFilesPosts.map((post: any, index: number) => (
                <BlogCard key={post._id} post={post} priority={index < 2} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-xl text-muted-foreground">Cargando artículos...</p>
              </div>
            )}
          </div>
          
          {/* Pagination */}
          {safelyFilesPosts.length > 0 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} />
          )}
        </div>

        {/* Right: Sidebar (Desktop) / Bottom (Mobile) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* Trending Topics */}
            <TrendingCard />

            {/* Guías Especializadas Banner */}
            <SidebarGuidesBanner />

            {/* IA Apps Ranking Banner */}
            <SidebarAppsBanner />

            {/* Comparativas Banner */}
            <SidebarComparisonBanner />

            {/* CTA Card */}
            <NitroCtaCard />
            
            {/* Newsletter */}
            <div className="rounded-2xl border border-white/9 bg-[#0d110e] p-6">
              <NewsletterForm />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
