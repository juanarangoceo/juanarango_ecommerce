import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import { ArrowRight } from "lucide-react";

interface FeaturedPromoBlockProps {
  block: {
    image?: any;
    title?: string;
    description?: string;
    linkUrl?: string;
    linkText?: string;
  };
}

export function FeaturedPromoBlock({ block }: FeaturedPromoBlockProps) {
  // Solo renderiza si hay imagen configurada
  if (!block?.image?.asset?._ref) return null;

  const imageUrl = urlForImage(block.image).width(800).height(400).url();
  const href = block.linkUrl || "#";
  const isExternal = href.startsWith("http");

  return (
    <div className="mt-10 mb-2 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link
        href={href}
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="group block"
      >
        {/* Imagen */}
        <div className="relative w-full aspect-[16/7] overflow-hidden">
          <Image
            src={imageUrl}
            alt={block.title || "Contenido recomendado"}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          {/* Overlay degradado */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          {/* Badge */}
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full uppercase tracking-wide">
              Recomendado
            </span>
          </div>
        </div>

        {/* Contenido textual */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 md:p-6">
          <div className="flex-1 min-w-0">
            {block.title && (
              <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors leading-snug mb-1">
                {block.title}
              </h3>
            )}
            {block.description && (
              <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 line-clamp-2">
                {block.description}
              </p>
            )}
          </div>

          {block.linkUrl && (
            <div className="flex-shrink-0">
              <span className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors duration-200 group-hover:gap-3">
                {block.linkText || "Conoce más"}
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
