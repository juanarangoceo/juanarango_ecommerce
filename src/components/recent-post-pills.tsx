"use client"

import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface RecentPostPillsProps {
  posts: { title: string; slug: string }[]
}

export function RecentPostPills({ posts }: RecentPostPillsProps) {
  if (!posts || posts.length === 0) return null

  return (
    <div className="w-full mb-12">
      {/* Mobile: Wrapped Chips (Small & Uniform) */}
      <div className="md:hidden flex flex-wrap justify-center gap-2 px-4">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={cn(
              "inline-flex items-center justify-center rounded-full px-3 py-1 text-xs font-semibold transition-all shadow-sm",
              "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-black hover:border-emerald-400"
            )}
          >
            {post.title}
          </Link>
        ))}
      </div>

      {/* Desktop: Scattered / Full Width */}
      <div className="hidden md:flex flex-wrap justify-center gap-3 w-full px-8">
        {posts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className={cn(
              "inline-flex items-center justify-center rounded-full px-4 h-8 text-sm font-medium transition-all duration-300 shadow-sm hover:scale-105",
              "bg-emerald-500 text-black border border-emerald-400 hover:bg-emerald-400 hover:shadow-emerald-500/20",
              // Minimal vertical offset for organic feel, but less chaotic
              index % 2 === 0 ? "mt-1" : "-mt-1" 
            )}
          >
            {post.title}
          </Link>
        ))}
      </div>
    </div>
  )
}
