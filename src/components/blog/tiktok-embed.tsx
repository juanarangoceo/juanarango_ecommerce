"use client"

import { useState, useEffect, useRef } from 'react';
import { TikTokEmbed as TikTok } from 'react-social-media-embed';
import { cn } from '@/lib/utils';

interface TikTokEmbedProps {
  url: string;
  caption?: string;
  className?: string;
}

export const TikTokEmbed = ({ url, caption, className }: TikTokEmbedProps) => {
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on client-side
    if (typeof window === 'undefined') return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Load TikTok when it's about to enter viewport (with 200px margin)
          if (entry.isIntersecting) {
            setShouldLoad(true);
            observer.disconnect(); // Stop observing after loading
          }
        });
      },
      {
        rootMargin: '200px', // Start loading 200px before entering viewport
        threshold: 0
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  if (!url) return null;

  return (
    <div 
      ref={containerRef}
      className={cn("my-8 flex flex-col items-center justify-center", className)}
    >
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '325px', minHeight: '600px' }}>
        {shouldLoad ? (
          <TikTok url={url} width={325} />
        ) : (
          <div className="w-[325px] h-[600px] bg-zinc-100 dark:bg-zinc-900 rounded-lg flex items-center justify-center border border-zinc-200 dark:border-zinc-800">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                <svg className="w-6 h-6 text-zinc-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">TikTok Video</p>
            </div>
          </div>
        )}
      </div>
      {caption && (
        <p className="mt-2 text-sm text-center text-muted-foreground italic">
          {caption}
        </p>
      )}
    </div>
  );
};
