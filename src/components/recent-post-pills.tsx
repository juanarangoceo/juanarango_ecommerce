"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { TrendingUp } from "lucide-react"

interface RecentPostPillsProps {
  posts: { title: string; slug: string; category?: string }[]
}

export function RecentPostPills({ posts }: RecentPostPillsProps) {
  if (!posts || posts.length === 0) return null

  return (
    <div className="w-full mb-8">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-emerald-400" />
        <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
          Más recientes
        </span>
      </div>

      {/* Pills — horizontal scroll on mobile, centered flex on desktop */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 px-4 md:px-0 md:flex-wrap md:justify-center scrollbar-hide">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={post.category ? `/blog/${post.category}/${post.slug}` : `/blog/${post.slug}`}
            className={cn(
              "inline-flex items-center shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-200",
              "bg-zinc-900 text-zinc-300 border border-zinc-700 hover:bg-emerald-500/10 hover:text-emerald-400 hover:border-emerald-500/40",
              "md:max-w-[260px]"
            )}
          >
            <span className="truncate">{post.title}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
