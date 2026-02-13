"use client";

import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface YouTubeEmbedProps {
  url: string;
  title?: string;
}

export function YouTubeEmbed({ url, title = "Video de YouTube" }: YouTubeEmbedProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // Extract Video ID
  const getVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getVideoId(url);

  if (!videoId) return null;

  const posterUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  return (
    <div className="my-10 rounded-xl overflow-hidden shadow-lg border border-zinc-200 dark:border-zinc-800 bg-black aspect-video relative group">
      {!isPlaying ? (
        <button
          onClick={() => setIsPlaying(true)}
          className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/10 hover:bg-black/30 transition-all z-10 group"
          aria-label={`Reproducir video: ${title}`}
        >
          <div className="relative w-full h-full">
            <Image
              src={posterUrl}
              alt={`Miniatura de ${title}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-white/90 dark:bg-zinc-900/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-xl group-hover:scale-110 transition-transform duration-300">
                <Play className="w-6 h-6 text-red-600 fill-current ml-1" />
              </div>
            </div>
          </div>
        </button>
      ) : (
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full absolute inset-0"
        />
      )}
    </div>
  );
}
