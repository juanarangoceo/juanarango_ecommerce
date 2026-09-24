"use client";

import { useState } from "react";
import Image from "next/image";
import { Copy, Check, Heart } from "lucide-react";

// ─── Category Config ───────────────────────────────────────────────────────
export const CATEGORY_CONFIG: Record<
  string,
  { label: string; color: string; bg: string; border: string }
> = {
  imagenes: {
    label: "🖼️ Imágenes",
    color: "text-primary",
    bg: "bg-primary/20",
    border: "border-primary/30",
  },
  apps: {
    label: "📱 Apps",
    color: "text-blue-300",
    bg: "bg-blue-500/20",
    border: "border-blue-500/30",
  },
  desarrollo: {
    label: "💻 Desarrollo",
    color: "text-primary",
    bg: "bg-primary/20",
    border: "border-primary/30",
  },
  marketing: {
    label: "📣 Marketing",
    color: "text-amber-300",
    bg: "bg-amber-500/20",
    border: "border-amber-500/30",
  },
  video: {
    label: "🎬 Video",
    color: "text-rose-300",
    bg: "bg-rose-500/20",
    border: "border-rose-500/30",
  },
  texto: {
    label: "✍️ Texto",
    color: "text-cyan-300",
    bg: "bg-cyan-500/20",
    border: "border-cyan-500/30",
  },
};

// ─── Types ─────────────────────────────────────────────────────────────────
interface PromptCardProps {
  prompt: {
    _id: string;
    title: string;
    prompt: string;
    instructions?: string;
    imageUrl: string;
    tool: string;
    category?: string;
    publishedAt?: string;
  };
  initialLikeCount?: number;
  priority?: boolean;
}

// ─── Component ─────────────────────────────────────────────────────────────
export function PromptCard({
  prompt,
  initialLikeCount = 0,
  priority = false,
}: PromptCardProps) {
  const [copied, setCopied] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [liked, setLiked] = useState(() => {
    if (typeof window === "undefined") return false;
    const stored = localStorage.getItem("liked_prompts");
    if (!stored) return false;
    try {
      return JSON.parse(stored).includes(prompt._id);
    } catch {
      return false;
    }
  });
  const [likeLoading, setLikeLoading] = useState(false);

  const categoryConfig = prompt.category
    ? CATEGORY_CONFIG[prompt.category]
    : null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleLike = async () => {
    if (likeLoading) return;
    setLikeLoading(true);

    const action = liked ? "unlike" : "like";
    const optimisticCount = liked ? likeCount - 1 : likeCount + 1;

    // Optimistic update
    setLiked(!liked);
    setLikeCount(optimisticCount);

    // Update localStorage
    try {
      const stored = localStorage.getItem("liked_prompts");
      const likedList: string[] = stored ? JSON.parse(stored) : [];
      if (action === "like") {
        likedList.push(prompt._id);
      } else {
        const idx = likedList.indexOf(prompt._id);
        if (idx !== -1) likedList.splice(idx, 1);
      }
      localStorage.setItem("liked_prompts", JSON.stringify(likedList));
    } catch {
      // ignore localStorage errors
    }

    // Call API
    try {
      const res = await fetch("/api/prompts/like", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promptId: prompt._id, action }),
      });
      if (res.ok) {
        const data = await res.json();
        setLikeCount(data.count ?? optimisticCount);
      }
    } catch {
      // Revert on error
      setLiked(liked);
      setLikeCount(likeCount);
    } finally {
      setLikeLoading(false);
    }
  };

  return (
    <div className="group relative flex flex-col bg-[#0d110e]/60 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/15 hover:shadow-xl hover:shadow-black/30 hover:-translate-y-0.5">
      {/* ── Image ─────────────────────────────── */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#111512] flex-shrink-0">
        {prompt.imageUrl ? (
          <Image
            src={prompt.imageUrl}
            alt={prompt.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white/38 text-sm">
            Sin imagen
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d110e]/80 via-transparent to-transparent" />

        {/* Pills row on image */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
          {/* Category badge */}
          {categoryConfig && (
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md border ${categoryConfig.bg} ${categoryConfig.border} ${categoryConfig.color}`}
            >
              {categoryConfig.label}
            </span>
          )}

          {/* Tool badge */}
          <span className="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono bg-black/60 backdrop-blur-md border border-white/10 text-white/78 tracking-wider uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
            {prompt.tool}
          </span>
        </div>
      </div>

      {/* ── Content ───────────────────────────── */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Title */}
        <h3 className="font-bold text-white text-base leading-snug line-clamp-2">
          {prompt.title}
        </h3>

        {/* Prompt text block */}
        <div className="relative flex-1 bg-[#0b0e0c]/60 border border-white/10 rounded-xl overflow-hidden flex flex-col">
          <div className="flex-1 max-h-[96px] overflow-y-auto p-3 prompt-scrollbar">
            <p className="font-mono text-[11px] leading-relaxed text-white/58 whitespace-pre-wrap break-words">
              {prompt.prompt}
            </p>
          </div>
          {prompt.instructions && (
            <div className="bg-primary/10 border-t border-primary/20 px-3 py-2 flex-shrink-0">
              <p className="text-[10px] text-primary/90 font-medium leading-relaxed">
                <span className="font-bold">💡 Cómo usar:</span> {prompt.instructions}
              </p>
            </div>
          )}
        </div>

        {/* ── Actions ─────────────────────────── */}
        <div className="flex items-center justify-between pt-1">
          {/* Like button */}
          <button
            onClick={handleLike}
            disabled={likeLoading}
            aria-label={liked ? "Quitar like" : "Dar like"}
            className={`group/like flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 border ${
              liked
                ? "bg-rose-500/15 border-rose-500/30 text-rose-400 hover:bg-rose-500/25"
                : "bg-[#111512]/60 border-white/15 text-white/58 hover:bg-[#111512] hover:text-white/84 hover:border-white/25"
            }`}
          >
            <Heart
              className={`w-4 h-4 transition-all duration-300 ${
                liked
                  ? "fill-rose-400 text-rose-400 scale-110"
                  : "fill-transparent group-hover/like:scale-110"
              }`}
            />
            <span className="tabular-nums">{likeCount}</span>
          </button>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#111512] hover:bg-primary/10 border border-white/15 hover:border-primary/30 rounded-full text-xs font-medium text-white/58 hover:text-primary transition-all duration-200"
            title="Copiar prompt"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-primary" />
                <span className="text-primary">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar prompt</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
