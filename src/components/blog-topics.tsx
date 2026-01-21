"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface BlogTopicsProps {
  topics: string[]
}

export function BlogTopics({ topics }: BlogTopicsProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentTopic = searchParams.get("topic")

  // Helper to toggle topic
  const handleTopicClick = (topic: string) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (currentTopic === topic) {
      params.delete("topic") // Deselect if already active
    } else {
      params.set("topic", topic)
    }

    router.push(`/blog?${params.toString()}`, { scroll: false })
  }

  // If no topics, don't render anything
  if (!topics || topics.length === 0) return null

  return (
    <div className="w-full mb-8">
      <ScrollArea className="w-full whitespace-nowrap rounded-md border border-white/5 bg-zinc-900/30 p-1">
        <div className="flex w-max space-x-2 p-2">
          {/* 'All' / Clear filter button */}
          <button
            onClick={() => router.push("/blog", { scroll: false })}
            className={cn(
              "inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
              !currentTopic
                ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                : "border border-input bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            Todos
          </button>

          {/* Dynamic Topics */}
          {topics.map((topic) => (
            <button
              key={topic}
              onClick={() => handleTopicClick(topic)}
              className={cn(
                "inline-flex items-center justify-center rounded-full px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
                currentTopic === topic
                  ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90"
                  : "border border-input bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {topic}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="invisible" />
      </ScrollArea>
    </div>
  )
}
