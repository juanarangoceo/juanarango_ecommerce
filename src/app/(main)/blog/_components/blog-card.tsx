import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { urlForImage } from "@/sanity/lib/image";
import { Clock, Calendar } from "lucide-react";
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
}

export function BlogCard({ post }: BlogCardProps) {
  const imageUrl = post.mainImage?.asset?._ref 
    ? urlForImage(post.mainImage).url() 
    : null;

  return (
    <Card className="flex flex-col md:flex-row h-full hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 bg-zinc-900/50 border-zinc-800 hover:border-emerald-500/30 group overflow-hidden">
      {/* Image Section */}
      {imageUrl && (
        <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0 overflow-hidden">
          <Image
            src={imageUrl}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, 256px"
          />
          {post.topic && (
            <span className="absolute top-2 right-2 px-3 py-1 text-[10px] font-black tracking-widest uppercase bg-black/60 backdrop-blur-md text-white rounded-md border border-white/10 shadow-lg">
              {post.topic}
            </span>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="flex flex-col flex-1">
        <CardHeader className="space-y-3">
          <CardTitle className="leading-tight text-xl text-white group-hover:text-emerald-400 transition-colors line-clamp-2">
            {post.title}
          </CardTitle>
          <div className="flex items-center gap-4 text-xs font-medium text-zinc-500">
            <span className="flex items-center gap-1.5 bg-zinc-800/50 px-2 py-1 rounded">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(post.publishedAt || post._createdAt).toLocaleDateString("es-ES", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
            
            <span className="flex items-center gap-1.5 bg-zinc-800/50 px-2 py-1 rounded text-emerald-500/80">
              <Clock className="w-3.5 h-3.5" />
              {post.estimatedReadingTime || 5} min de lectura
            </span>
          </div>
        </CardHeader>
        
        <CardContent className="flex-grow">
          <p className="text-zinc-400 line-clamp-3 text-sm leading-relaxed">
            {post.excerpt || "Lee el artículo completo para descubrir más detalles sobre este tema..."}
          </p>
        </CardContent>
        
        <CardFooter>
          <Button asChild variant="outline" className="w-full border-zinc-700 hover:bg-zinc-800 text-zinc-300">
            <Link href={`/blog/${post.slug.current}`}>Leer Artículo</Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
