import Link from "next/link"
import { TrendingUp, ArrowUpRight } from "lucide-react"
import { client } from "@/sanity/lib/client"

// GROQ Query to get the first active trending list
const TRENDING_QUERY = `*[_type == "trending" && isActive == true][0] {
  title,
  items[] {
    topic,
    "slug": post->slug.current
  }
}`

export async function TrendingCard() {
  let trendingData = null

  try {
    trendingData = await client.fetch(TRENDING_QUERY)
  } catch (error) {
    console.error("Error fetching trending topics:", error)
  }

  // If no active trending list found, don't render anything
  if (!trendingData || !trendingData.items || trendingData.items.length === 0) {
    return null
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0d110e]/60 backdrop-blur-sm p-6 transition-all hover:border-primary/30">
      {/* Glow Effect */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />
      
      {/* Header */}
      <div className="flex items-center gap-2 mb-6 relative z-10">
        <div className="p-2 rounded-lg bg-primary/10 text-primary">
          <TrendingUp className="w-5 h-5" />
        </div>
        <h3 className="font-bold text-lg text-white tracking-tight">
          Tendencias
        </h3>
      </div>

      {/* List */}
      <ul className="space-y-3 relative z-10">
        {trendingData.items.map((item: any, index: number) => (
          <li key={index}>
            <Link 
              href={`/blog/${item.slug}`}
              className="group/item flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-primary/10 hover:border-primary/20 border border-transparent transition-all duration-200"
            >
              <span className="text-sm font-medium text-white/78 group-hover/item:text-primary transition-colors line-clamp-1">
                {item.topic}
              </span>
              <ArrowUpRight className="w-4 h-4 text-white/38 group-hover/item:text-primary opacity-0 group-hover/item:opacity-100 transition-all duration-200" />
            </Link>
          </li>
        ))}
      </ul>
      
      {/* Decorative Index Label */}
      <div className="absolute bottom-4 right-4 text-[10px] uppercase tracking-widest text-white/5 font-black pointer-events-none">
        TOPICS
      </div>
    </div>
  )
}
