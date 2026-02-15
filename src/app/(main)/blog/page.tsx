import Link from "next/link";
import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { NewsletterForm } from "@/components/newsletter-form";
import { BlogSearch } from "@/components/blog-search";
import { RecentPostPills } from "@/components/recent-post-pills";
import { BlogCard } from "@/components/blog/blog-card";
import { TrendingCard } from "@/components/blog/trending-card";
import { NitroCtaCard } from "@/components/blog/nitro-cta-card";
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
]|order(coalesce(publishedAt, _createdAt) desc) {
  _id,
  title,
  slug,
  publishedAt,
  _createdAt,
  mainImage,
  excerpt,
  topic,
  category,
  tags,
  estimatedReadingTime
}`;

const POSTS_COUNT_QUERY = `count(*[_type == "post" && defined(slug.current)])`;

// ISR: Revalidate every 1 hour — leverages Sanity CDN cache for fast responses
export const revalidate = 3600;

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
    <main className="container mx-auto px-4 py-20 min-h-screen">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-4">
          Nitro Tech Blog
        </h1>
        <p className="text-xl text-muted-foreground">
          Perspectivas sobre E-commerce, Tecnología y Escalamiento.
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
         <BlogSearch />
      </div>

      {/* Category Navigation */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {[
          { slug: 'ecommerce', label: 'Ecommerce' },
          { slug: 'estrategia-marketing', label: 'Marketing' },
          { slug: 'ia-automatizacion', label: 'IA y Automatización' },
          { slug: 'headless-commerce', label: 'Headless Commerce' },
        ].map((cat) => (
          <Link
            key={cat.slug}
            href={`/blog/${cat.slug}`}
            className="px-4 py-2 text-sm font-medium rounded-full bg-zinc-800/50 text-zinc-400 border border-zinc-700/50 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/30 transition-all duration-200"
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

            {/* CTA Card */}
            <NitroCtaCard />
            
            {/* Newsletter */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <NewsletterForm />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
