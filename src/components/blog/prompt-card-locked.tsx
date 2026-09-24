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
    <div className="group relative flex flex-col bg-[#0d110e]/60 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/10">
      {/* Image with blur overlay */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111512] flex-shrink-0">
        {prompt.imageUrl ? (
          <>
            <Image
              src={prompt.imageUrl}
              alt={prompt.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </>
        ) : (
          <div className="w-full h-full bg-[#111512]" />
        )}

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d110e]/80 via-transparent to-transparent" />

        {/* Pills row */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          {categoryConfig && (
            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md border ${categoryConfig.bg} ${categoryConfig.border} ${categoryConfig.color}`}>
              {categoryConfig.label}
            </span>
          )}
          <span className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-black/60 backdrop-blur-md border border-white/10 text-white/78 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
            {prompt.tool}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <h3 className="font-bold text-white text-base leading-snug line-clamp-2">
          {prompt.title}
        </h3>

        {/* Blurred prompt text with lock overlay */}
        <div className="relative flex-1 min-h-[110px] bg-[#0b0e0c]/60 border border-white/10 rounded-xl overflow-hidden shadow-inner">
          <div className="absolute inset-0 p-3 select-none overflow-hidden">
            <p className="font-mono text-[11px] leading-relaxed text-white/58 blur-[4px] opacity-40 pointer-events-none">
              [System prompt structure init...] You are an expert AI assistant specialized in advanced marketing strategies. Your primary objective is to evaluate context and generate high-conversion outputs. Analyze user behavior patterns. [End instruction block] Let's proceed with generating the strategy.
            </p>
          </div>
          
          {/* Lock overlay — center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-t from-[#0d110e]/90 via-[#0d110e]/50 to-transparent">
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.15)] mt-4">
              <Lock className="w-4 h-4 text-primary drop-shadow-md" />
            </div>
            <span className="text-[10px] font-semibold text-primary uppercase tracking-widest bg-primary/10 border border-primary/20 px-2.5 py-0.5 rounded-full backdrop-blur-md">
              Premium
            </span>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={onLoginClick}
          className="w-full flex items-center justify-center gap-2 bg-primary/80 hover:bg-primary border border-primary/40 hover:border-primary/70 text-ink font-semibold py-2.5 rounded-xl transition-all duration-200 text-sm"
        >
          <Sparkles className="w-4 h-4" />
          Iniciar sesión para ver
        </button>
      </div>
    </div>
  );
}
