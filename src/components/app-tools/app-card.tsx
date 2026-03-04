import Link from "next/link"
import { cn } from "@/lib/utils"
import { getCategoryLabel } from "@/lib/app-tools-queries"
import type { AppToolSanity } from "@/lib/app-tools-queries"
import { AppIcon } from "./app-icon"
import { PricingBadge } from "./pricing-badge"
import { StarRating } from "./star-rating"

export function AppCard({
  app,
  className,
}: {
  app: AppToolSanity
  className?: string
}) {
  return (
    <Link
      href={`/app-tools/${app.slug.current}`}
      className={cn(
        "group flex flex-col rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/30 hover:bg-card/80",
        className
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <AppIcon category={app.category} iconBg={app.iconBg} logoUrl={(app as any).logoUrl} size="md" />
        <PricingBadge pricing={app.pricing} className="shrink-0" />
      </div>

      <div className="mt-4 flex flex-col items-start gap-1.5 flex-1">
        <span className="inline-block rounded-md border border-border bg-secondary/50 px-2 py-0.5 text-[10px] uppercase font-semibold tracking-wider text-muted-foreground">
          {getCategoryLabel(app.category)}
        </span>
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors text-balance text-lg line-clamp-1">
          {app.appName}
        </h3>
        <p className="text-sm text-zinc-300 line-clamp-2 leading-relaxed">
          {app.description}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-border/50 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          {app.rating ? <StarRating rating={app.rating} /> : <span />}
        </div>
        
        {app.priceDetail && (
          <div className="flex items-center justify-end">
            <span className="text-sm font-medium text-zinc-400 text-right w-full">
              {app.priceDetail}
            </span>
          </div>
        )}
      </div>
    </Link>
  )
}
