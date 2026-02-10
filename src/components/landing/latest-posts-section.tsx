import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/app/(main)/blog/_components/blog-card";
import { client } from "@/sanity/lib/client";

const LATEST_POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(coalesce(publishedAt, _createdAt) desc)[0...3] {
  _id,
  title,
  slug,
  publishedAt,
  _createdAt,
  mainImage,
  excerpt,
  topic,
  category,
  estimatedReadingTime
}`;

export async function LatestPostsSection() {
  const posts = await client.fetch(LATEST_POSTS_QUERY);

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 px-6 bg-zinc-950 border-t border-zinc-900">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-500">
              Últimas Novedades
            </h2>
            <p className="text-xl text-zinc-400 max-w-2xl text-pretty">
              Insights estratégicos sobre e-commerce, tecnología y escalamiento digital.
            </p>
          </div>
          <Button asChild variant="outline" className="hidden md:flex gap-2 group border-zinc-800 hover:bg-zinc-900 text-zinc-300">
            <Link href="/blog">
              Ver todos los artículos
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post: any) => (
            <div key={post._id} className="h-full">
               <BlogCard post={post} />
            </div>
          ))}
        </div>

        <div className="mt-12 md:hidden flex justify-center">
            <Button asChild variant="outline" className="w-full gap-2 group border-zinc-800 hover:bg-zinc-900 text-zinc-300">
                <Link href="/blog">
                Ver todos los artículos
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
