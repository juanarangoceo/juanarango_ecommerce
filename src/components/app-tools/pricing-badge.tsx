import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Pricing } from "@/lib/app-tools-queries"

const pricingStyles: Record<Pricing, string> = {
  Free: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
  Freemium: "bg-amber-500/15 text-amber-400 border-amber-500/25",
  Paid: "bg-rose-500/15 text-rose-400 border-rose-500/25",
}

export function PricingBadge({
  pricing,
  className,
}: {
  pricing: Pricing
  className?: string
}) {
  return (
    <Badge
      variant="outline"
      className={cn(pricingStyles[pricing], "text-[10px] sm:text-xs px-1.5 py-0.5 font-medium min-w-min whitespace-nowrap", className)}
    >
      {pricing}
    </Badge>
  )
}
