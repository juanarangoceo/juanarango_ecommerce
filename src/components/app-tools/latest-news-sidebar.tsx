import Link from "next/link"
import { Newspaper } from "lucide-react"

interface Post {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
}

interface LatestNewsSidebarProps {
  posts: Post[]
}

export function LatestNewsSidebar({ posts }: LatestNewsSidebarProps) {
  if (!posts || posts.length === 0) return null

  return (
    <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-5 shadow-lg">
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-zinc-800/80">
        <Newspaper className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-bold text-white">Últimas Noticias</h3>
      </div>
      
      <div className="flex flex-col gap-4">
        {posts.map((post) => {
          // Format date like '21 Feb, 2026'
          const date = new Date(post.publishedAt)
          const formattedDate = date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })

          return (
            <Link 
              key={post._id} 
              href={`/blog/${post.slug?.current || ''}`}
              className="group flex flex-col gap-1.5"
            >
              <h4 className="text-sm font-medium text-zinc-200 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                {post.title}
              </h4>
              <time className="text-xs text-zinc-500 font-medium">
                {formattedDate}
              </time>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
