"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

interface TOCItem {
  id: string
  text: string
  level: number
}

export function TableOfContents({ content }: { content: string }) {
  const [toc, setToc] = useState<TOCItem[]>([])

  useEffect(() => {
    // Simple regex to find headings in markdown
    // Matches # Heading or ## Heading
    const headingRegex = /^(#{2,3})\s+(.+)$/gm
    const items: TOCItem[] = []
    let match
    
    // Reset regex index
    headingRegex.lastIndex = 0

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      // Create a slug for the id
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')

      items.push({ id, text, level })
    }

    setToc(items)
  }, [content])

  if (toc.length === 0) return null

  return (
    <nav className="space-y-2">
      <h4 className="font-bold text-sm uppercase tracking-wider text-zinc-500 mb-4">En este artículo</h4>
      <ul className="space-y-2 text-sm border-l border-zinc-200 dark:border-zinc-800 pl-4">
        {toc.map((item) => (
          <li key={item.id} style={{ marginLeft: (item.level - 2) * 12 }}>
            <Link 
              href={`#${item.id}`} 
              className="text-zinc-600 dark:text-zinc-400 hover:text-green-600 dark:hover:text-green-400 transition-colors block py-1"
              onClick={(e) => {
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
