import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog/blog-card";
import { client } from "@/sanity/lib/client";

// La home es comercial: muestra artículos de ventas, WhatsApp y ecommerce
// en lugar de las noticias generales de IA más recientes.
const LATEST_POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
  && !(_id in path("drafts.**"))
  && (category == "ecommerce" || title match "WhatsApp" || title match "Shopify" || title match "ventas" || title match "ecommerce")
]|order(coalesce(publishedAt, _createdAt) desc)[0...3] {
  _id,
  title,
  slug,
  publishedAt,
  _createdAt,
  mainImage,
  "excerpt": coalesce(excerpt, array::join(string::split(pt::text(body), "")[0..199], "") + "…"),
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
    <section className="border-t border-white/9 bg-[#0b0e0c] px-5 pb-16 pt-14 lg:px-8 lg:pb-24 lg:pt-20" data-nitro-orb="ideas">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-8 lg:mb-12">
          <h2 className="max-w-4xl text-center font-display text-4xl font-bold tracking-tight text-white md:text-left sm:text-6xl"><span className="text-primary">Ideas para vender mejor</span> antes de comprar otra herramienta.</h2>
          <Button asChild variant="outline" className="hidden shrink-0 gap-2 border-white/10 text-white/78 hover:bg-[#0d110e] md:flex">
            <Link href="/blog">
              Ver todos los artículos
              <ArrowRight className="size-4" />
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

        <div className="mt-10 flex justify-center md:hidden">
            <Button asChild variant="outline" className="w-full gap-2 group border-white/10 hover:bg-[#0d110e] text-white/78">
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
