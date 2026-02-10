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
    <div className="w-full mb-12">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <TrendingUp className="w-4 h-4 text-emerald-400" />
        <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
          Artículos Recientes
        </span>
      </div>

      {/* Mobile: Full Width Pills */}
      <div className="md:hidden flex flex-col gap-2 px-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={post.category ? `/blog/${post.category}/${post.slug}` : `/blog/${post.slug}`}
            className={cn(
              "w-full flex items-center justify-start rounded-full px-4 py-2.5 text-sm font-medium transition-all",
              "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-black hover:border-emerald-400"
            )}
          >
            <span className="truncate">{post.title}</span>
          </Link>
        ))}
      </div>

      {/* Desktop: Horizontal Pills */}
      <div className="hidden md:flex justify-center gap-3 w-full px-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={post.category ? `/blog/${post.category}/${post.slug}` : `/blog/${post.slug}`}
            className={cn(
              "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 shadow-sm hover:scale-105",
              "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-black hover:border-emerald-400",
              "max-w-[280px]"
            )}
          >
            <span className="truncate">{post.title}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
