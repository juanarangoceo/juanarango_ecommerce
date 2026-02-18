import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AppIcon } from "./app-icon"
import { PricingBadge } from "./pricing-badge"
import type { AppToolSanity } from "@/lib/app-tools-queries"
import { getAppUrl } from "@/lib/app-tools-queries"

export function HeroBanner({ app }: { app: AppToolSanity }) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-card">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="grid-hero"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 32V.5H32"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-hero)" />
        </svg>
      </div>

      {/* Gradient overlay */}
      <div className="absolute top-0 right-0 h-full w-1/2 bg-[radial-gradient(ellipse_at_top_right,oklch(0.62_0.19_250/0.15),transparent_70%)]" />

      <div className="relative flex flex-col gap-6 p-6 md:p-10">
        <div className="flex items-center gap-3">
          <Badge className="bg-primary/15 text-primary border-primary/25 text-xs font-medium">
            RECOMENDADA POR NITRO ECOM
          </Badge>
          <PricingBadge pricing={app.pricing} />
        </div>

        <div className="flex items-start gap-5">
          <AppIcon
            category={app.category}
            iconBg={app.iconBg}
            size="lg"
          />
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-foreground md:text-4xl text-balance">
              {app.appName}
            </h2>
            <p className="max-w-xl text-sm text-muted-foreground leading-relaxed md:text-base">
              {app.longDescription ? app.longDescription.slice(0, 180) + '...' : app.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
            <a
              href={getAppUrl(app)}
              target="_blank"
              rel="noopener noreferrer sponsored"
            >
              Probar Ahora
              <ArrowRight className="size-4" />
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href={`/app-tools/${app.slug.current}`}>Ver Detalle</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
