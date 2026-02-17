"use client";

import Image from "next/image";
import Link from "next/link";
import { urlForImage } from "@/sanity/lib/image";
import { cn } from "@/lib/utils";

interface AdvertisingBannerProps {
  ad: {
    title: string;
    desktopImage: any;
    mobileImage: any;
    link: string;
  };
  className?: string;
}

export function AdvertisingBanner({ ad, className }: AdvertisingBannerProps) {
  if (!ad || !ad.link) return null;

  return (
    <div className={cn("w-full my-8", className)}>
      <div className="flex flex-col gap-1 items-start">
        <span className="text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-600 font-medium px-1">
          Publicidad
        </span>
        <Link
          href={ad.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full relative rounded-lg overflow-hidden border border-zinc-100 dark:border-zinc-800 hover:opacity-95 transition-opacity"
        >
          {/* Mobile Image (< 768px) */}
          <div className="block md:hidden relative w-full aspect-[4/5] sm:aspect-video">
            {ad.mobileImage && (
              <Image
                src={urlForImage(ad.mobileImage).url()}
                alt={ad.title || "Publicidad"}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 1px"
              />
            )}
          </div>

          {/* Desktop Image (>= 768px) */}
          <div className="hidden md:block relative w-full aspect-[5/2] lg:aspect-[3/1]">
            {ad.desktopImage && (
              <Image
                src={urlForImage(ad.desktopImage).url()}
                alt={ad.title || "Publicidad"}
                fill
                className="object-cover"
                sizes="(min-width: 768px) 100vw, 1px"
              />
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
