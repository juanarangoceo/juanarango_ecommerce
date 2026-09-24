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
      <Card className="flex flex-col h-full hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 bg-[#0d110e]/60 border-white/10 hover:border-primary/30 overflow-hidden">
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d110e]/60 via-transparent to-transparent" />
          </div>
        )}

        {/* Content Section */}
        <div className="flex flex-col flex-1 p-5">
          <CardTitle className="leading-snug text-lg text-white group-hover:text-primary transition-colors line-clamp-2 mb-3">
            {post.title}
          </CardTitle>
          
          <div className="flex items-center gap-3 text-xs font-medium text-white/45 mb-3">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.publishedAt || post._createdAt).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
            
            <span className="w-1 h-1 rounded-full bg-white/10" />

            <span className="flex items-center gap-1.5 text-primary/70">
              <Clock className="w-3.5 h-3.5" />
              {post.estimatedReadingTime || 5} min
            </span>
          </div>
          
          <p className="text-white/58 line-clamp-2 text-sm leading-relaxed mb-4 flex-grow">
            {post.excerpt}
          </p>
          
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:text-primary transition-colors mt-auto">
            Leer Artículo
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
