import Link from "next/link"
import { cn } from "@/lib/utils"
import { getCategoryLabel } from "@/lib/app-tools-queries"
import type { AppToolSanity } from "@/lib/app-tools-queries"
import { AppIcon } from "./app-icon"
import { PricingBadge } from "./pricing-badge"

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
      <div className="flex items-start justify-between gap-3">
        <AppIcon category={app.category} iconBg={app.iconBg} size="md" />
        <PricingBadge pricing={app.pricing} />
      </div>
      <h3 className="mt-3 font-semibold text-foreground group-hover:text-primary transition-colors text-balance">
        {app.appName}
      </h3>
      <p className="mt-1 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
        {app.description}
      </p>
      <div className="mt-auto flex items-center justify-between pt-4">
        <span className="inline-block rounded-md border border-border bg-secondary/50 px-2 py-0.5 text-xs text-muted-foreground">
          {getCategoryLabel(app.category)}
        </span>
        <span className="text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
          Ver detalle
        </span>
      </div>
    </Link>
  )
}
