import { cn } from "@/lib/utils"
import { Star, StarHalf } from "lucide-react"

export function StarRating({
  rating,
  className,
  showNumber = true,
}: {
  rating?: number
  className?: string
  showNumber?: boolean
}) {
  const safeRating = Math.min(5, Math.max(0, rating || 0))
  const fullStars = Math.floor(safeRating)
  const hasHalf = safeRating - fullStars >= 0.5

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center">
        {Array.from({ length: 5 }, (_, i) => {
          if (i < fullStars) {
            return (
              <Star
                key={i}
                className="size-3.5 fill-amber-400 text-amber-400"
                aria-hidden="true"
              />
            )
          }
          if (i === fullStars && hasHalf) {
            return (
              <div key={i} className="relative">
                <Star className="size-3.5 text-zinc-600" aria-hidden="true" />
                <div className="absolute inset-0 overflow-hidden w-[50%]">
                  <Star
                    className="size-3.5 fill-amber-400 text-amber-400"
                    aria-hidden="true"
                  />
                </div>
              </div>
            )
          }
          return (
            <Star
              key={i}
              className="size-3.5 text-zinc-600"
              aria-hidden="true"
            />
          )
        })}
      </div>
      {showNumber && safeRating > 0 && (
        <span className="text-xs font-medium text-amber-400/90">
          {safeRating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
