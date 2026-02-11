import Link from "next/link";
import { Card, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { urlForImage } from "@/sanity/lib/image";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import Image from "next/image";

interface BlogCardProps {
  post: {
    _id: string;
    title: string;
    slug: { current: string };
    publishedAt?: string;
    _createdAt: string;
    mainImage?: any;
    excerpt?: string;
    topic?: string;
    estimatedReadingTime?: number;
  };
  priority?: boolean;
}

export function BlogCard({ post, priority = false }: BlogCardProps) {
  const imageUrl = post.mainImage?.asset?._ref 
    ? urlForImage(post.mainImage).width(600).height(340).format("webp").quality(80).url() 
    : null;

  return (
    <Link href={`/blog/${post.slug.current}`} className="group block h-full">
      <Card className="flex flex-col h-full hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 bg-zinc-900/50 border-zinc-800 hover:border-emerald-500/30 overflow-hidden">
        {/* Image Section */}
        {imageUrl && (
          <div className="relative w-full aspect-[16/9] flex-shrink-0 overflow-hidden">
            <Image
              src={imageUrl}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={priority}
            />
            {/* Gradient overlay for clean separation */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent" />
          </div>
        )}

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-5">
          {/* Topic pill - outside the image */}
          {post.topic && (
            <span className="self-start px-2.5 py-0.5 text-[10px] font-bold tracking-widest uppercase text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20 mb-3">
              {post.topic}
            </span>
          )}

          <CardTitle className="leading-snug text-lg text-white group-hover:text-emerald-400 transition-colors line-clamp-2 mb-3">
            {post.title}
          </CardTitle>
          
          <div className="flex items-center gap-3 text-xs font-medium text-zinc-500 mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.publishedAt || post._createdAt).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
            
            <span className="w-1 h-1 rounded-full bg-zinc-700" />

            <span className="flex items-center gap-1.5 text-emerald-500/70">
              <Clock className="w-3.5 h-3.5" />
              {post.estimatedReadingTime || 5} min
            </span>
          </div>
          
          <p className="text-zinc-400 line-clamp-2 text-sm leading-relaxed mb-4 flex-grow">
            {post.excerpt || "Lee el artículo completo para descubrir más detalles sobre este tema..."}
          </p>
          
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 group-hover:text-emerald-300 transition-colors mt-auto">
            Leer Artículo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
