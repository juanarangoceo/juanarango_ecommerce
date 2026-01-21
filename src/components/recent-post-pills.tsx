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
      {/* Mobile: Horizontal Scroll (Carousel) */}
      <div className="md:hidden">
        <ScrollArea className="w-full whitespace-nowrap pb-4">
          <div className="flex w-max space-x-3 px-1">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className={cn(
                  "inline-flex items-center justify-center rounded-full px-5 py-2 text-sm font-semibold transition-all shadow-md",
                  "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500 hover:text-black hover:border-emerald-400"
                )}
              >
                {post.title}
              </Link>
            ))}
          </div>
          <ScrollBar orientation="horizontal" className="h-1.5" />
        </ScrollArea>
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
