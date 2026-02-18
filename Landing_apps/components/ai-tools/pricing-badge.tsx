import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { Pricing } from "@/lib/ai-tools-data"

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
      className={cn(pricingStyles[pricing], "text-xs font-medium", className)}
    >
      {pricing}
    </Badge>
  )
}
