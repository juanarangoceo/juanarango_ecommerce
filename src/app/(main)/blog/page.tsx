import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { NewsletterForm } from "@/components/newsletter-form";
import { BlogSearch } from "@/components/blog-search";
import { RecentPostPills } from "@/components/recent-post-pills";
import { BlogCard } from "./_components/blog-card";
import { NitroCtaCard } from "./[slug]/_components/NitroCtaCard";
import { Pagination } from "@/components/ui/pagination";

// GROQ Query - Sorted by date, with pagination
const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc) {
  _id,
  title,
  slug,
  publishedAt,
  _createdAt,
  mainImage,
  excerpt,
  topic,
  estimatedReadingTime
}`;

const POSTS_COUNT_QUERY = `count(*[_type == "post" && defined(slug.current)])`;

export const dynamic = 'force-dynamic'; 

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
    slug: p?.slug?.current || ""
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

      {/* Recent Post Pills */}
      <div className="w-full max-w-5xl mx-auto mb-16">
         <RecentPostPills posts={recentPosts} />
      </div>

      {/* Main Content: 2 Column Layout (Desktop) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Blog Posts */}
        <div className="lg:col-span-8 space-y-6">
          {safelyFilesPosts.length > 0 ? (
            <>
              {safelyFilesPosts.map((post: any) => (
                <BlogCard key={post._id} post={post} />
              ))}
              
              {/* Pagination */}
              <Pagination currentPage={currentPage} totalPages={totalPages} />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground">Cargando artículos...</p>
            </div>
          )}
        </div>

        {/* Right: Sidebar (Desktop) / Bottom (Mobile) */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="lg:sticky lg:top-24 space-y-6">
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
