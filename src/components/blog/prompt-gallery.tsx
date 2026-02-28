"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Copy, Check, ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PromptType {
  _id: string;
  title: string;
  prompt: string;
  imageUrl: string;
  tool: string;
  publishedAt: string;
}

interface PromptGalleryProps {
  prompts: PromptType[];
}

export function PromptGallery({ prompts }: PromptGalleryProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  if (!prompts || prompts.length === 0) return null;

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(Math.round(scrollLeft) + clientWidth < scrollWidth);
  };

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, [prompts]);

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    
    // Calculate scroll amount based on visible width to paginate effectively
    const scrollAmount = container.clientWidth * 0.8;
    
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <div className="w-full max-w-7xl mx-auto mb-16 relative">
      <div className="flex items-center justify-between mb-6 px-2">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Zap className="w-5 h-5 text-emerald-500" />
            Galería de Prompts
          </h2>
          <p className="text-muted-foreground text-sm mt-1">Copia y pega estos comandos para obtener resultados increíbles.</p>
        </div>
        
        {/* Navigation Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => scrollByAmount('left')}
            disabled={!canScrollLeft}
            className="h-9 w-9 rounded-full bg-zinc-900 border-zinc-800 disabled:opacity-30"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => scrollByAmount('right')}
            disabled={!canScrollRight}
            className="h-9 w-9 rounded-full bg-zinc-900 border-zinc-800 disabled:opacity-30"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Required for fade edges */}
      <div className="relative group">
        {/* Left Fade */}
        <div className={`absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollLeft ? 'opacity-100' : 'opacity-0'}`} />
        
        {/* Carousel Container */}
        <div 
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto gap-6 pb-6 pt-2 px-2 snap-x snap-mandatory hide-scrollbar relative"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {prompts.map((item) => (
            <div 
              key={item._id} 
              className="snap-start shrink-0 w-[280px] md:w-[320px] bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden flex flex-col group/card hover:border-zinc-700 transition-colors"
            >
              <div className="relative aspect-square w-full bg-zinc-800 overflow-hidden">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="object-cover w-full h-full group-hover/card:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600">No Image</div>
                )}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-mono text-zinc-300 tracking-wider uppercase">{item.tool}</span>
                </div>
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-zinc-200 mb-3 truncate">{item.title}</h3>
                
                <div className="bg-zinc-950/50 border border-zinc-800/50 rounded-lg p-3 relative flex-1 group/code">
                  <p className="font-mono text-[11px] leading-relaxed text-zinc-400 line-clamp-4 group-hover/code:line-clamp-none transition-all">
                    {item.prompt}
                  </p>
                  
                  <button
                    onClick={() => handleCopy(item._id, item.prompt)}
                    className="absolute top-2 right-2 p-1.5 bg-zinc-800 hover:bg-zinc-700 rounded-md text-zinc-400 hover:text-white transition-colors border border-zinc-700 shadow-xl opacity-0 group-hover/code:opacity-100 focus:opacity-100"
                    title="Copiar prompt"
                  >
                    {copiedId === item._id ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Fade */}
        <div className={`absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none transition-opacity duration-300 ${canScrollRight ? 'opacity-100' : 'opacity-0'}`} />
      </div>

    </div>
  );
}
