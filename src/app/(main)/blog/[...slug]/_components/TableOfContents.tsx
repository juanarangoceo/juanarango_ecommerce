"use client"

import { TOCItem } from "@/lib/toc"
import Link from "next/link"
import { MouseEvent } from "react"

interface TableOfContentsProps {
  toc: TOCItem[]
}

export function TableOfContents({ toc }: TableOfContentsProps) {
  if (!toc || toc.length === 0) return null





  return (
    <nav className="space-y-2">
      <h4 className="font-bold text-sm uppercase tracking-wider text-zinc-500 mb-4">En este artículo</h4>
      <ul className="space-y-2 text-sm border-l border-zinc-200 dark:border-zinc-800 pl-4">
        {toc.map((item) => (
          <li key={item.id} style={{ marginLeft: (item.level - 2) * 12 }}>
            <Link 
              href={`#${item.id}`} 
              className="text-zinc-600 dark:text-zinc-400 hover:text-green-600 dark:hover:text-green-400 transition-colors block py-1"
              onClick={(e: MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault()
                document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" })
              }}
            >
              {item.text}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
