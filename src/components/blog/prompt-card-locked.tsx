"use client";

import { Lock, Sparkles } from "lucide-react";
import Image from "next/image";
import { CATEGORY_CONFIG } from "@/components/blog/prompt-card";

interface PromptCardLockedProps {
  prompt: {
    _id: string;
    title: string;
    imageUrl: string;
    tool: string;
    category?: string;
  };
  onLoginClick: () => void;
}

export function PromptCardLocked({ prompt, onLoginClick }: PromptCardLockedProps) {
  const categoryConfig = prompt.category ? CATEGORY_CONFIG[prompt.category] : null;

  return (
    <div className="group relative flex flex-col bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-500/10">
      {/* Image with blur overlay */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-800 flex-shrink-0">
        {prompt.imageUrl ? (
          <>
            <Image
              src={prompt.imageUrl}
              alt={prompt.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover scale-105 blur-[2px] brightness-50"
            />
          </>
        ) : (
          <div className="w-full h-full bg-zinc-800" />
        )}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-transparent" />

        {/* Pills row */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          {categoryConfig && (
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md border ${categoryConfig.bg} ${categoryConfig.border} ${categoryConfig.color}`}>
              {categoryConfig.label}
            </span>
          )}
          <span className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-black/60 backdrop-blur-md border border-white/10 text-zinc-300 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
            {prompt.tool}
          </span>
        </div>

        {/* Lock overlay — center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-500/30 backdrop-blur-sm flex items-center justify-center">
            <Lock className="w-5 h-5 text-purple-300" />
          </div>
          <span className="text-[11px] font-semibold text-purple-300 uppercase tracking-widest bg-black/40 px-3 py-1 rounded-full backdrop-blur-sm">
            Premium
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="font-bold text-white text-base leading-snug line-clamp-2">
          {prompt.title}
        </h3>

        {/* Blurred prompt text */}
        <div className="relative flex-1 bg-zinc-950/60 border border-zinc-800/60 rounded-xl overflow-hidden">
          <div className="h-[96px] p-3 select-none">
            <p className="font-mono text-[11px] leading-relaxed text-zinc-400 blur-sm pointer-events-none">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
              veniam, quis nostrud exercitation ullamco laboris.
            </p>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onLoginClick}
          className="w-full flex items-center justify-center gap-2 bg-purple-600/80 hover:bg-purple-600 border border-purple-500/40 hover:border-purple-500/70 text-white font-semibold py-2.5 rounded-xl transition-all duration-200 text-sm"
        >
          <Sparkles className="w-4 h-4" />
          Iniciar sesión para ver
        </button>
      </div>
    </div>
  );
}
