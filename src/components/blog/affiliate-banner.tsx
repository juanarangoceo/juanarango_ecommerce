"use client";

import { urlForImage } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

interface AffiliateBannerProps {
  title: string;
  image: any;
  url: string;
  className?: string; // To allow external styling overrides
}

export function AffiliateBanner({ title, image, url, className = "" }: AffiliateBannerProps) {
  if (!image?.asset?._ref || !url) return null;

  return (
    <div className={`block my-8 ${className}`}>
      <Link 
        href={url} 
        target="_blank" 
        rel="nofollow noopener noreferrer" // SEO best practice for affiliate links
        className="block group relative overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="relative w-full aspect-square md:aspect-[4/5] lg:aspect-square">
            <Image
                src={urlForImage(image).url()}
                alt={title || "Oferta Especial"}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 400px"
            />
            {/* Optional Overlay or Badge could go here */}
            <div className="absolute top-2 right-2 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
                PUBLICIDAD
            </div>
        </div>
        <div className="p-3 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800 text-center">
             <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400 group-hover:underline decoration-emerald-500/50 underline-offset-4">
                Ver Oferta &rarr;
             </span>
        </div>
      </Link>
    </div>
  );
}
