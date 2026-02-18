import type { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import {
  ALL_APP_TOOLS_QUERY,
  FEATURED_APP_QUERY,
  TRENDING_APPS_QUERY,
} from "@/lib/app-tools-queries"
import type { AppToolSanity } from "@/lib/app-tools-queries"
import { HeroBanner } from "@/components/app-tools/hero-banner"
import { TrendingSection } from "@/components/app-tools/trending-section"
import { RankingTable } from "@/components/app-tools/ranking-table"
import { Sparkles, Library } from "lucide-react"

export const revalidate = 60 // TODO: subir a 3600 en producción

export const metadata: Metadata = {
  title: "Mejores Apps y Herramientas de IA | Biblioteca Completa - Nitro Ecom",
  description:
    "Descubre las mejores apps y herramientas de inteligencia artificial para tu negocio. Ranking actualizado con reseñas, funcionalidades, precios y comparativas.",
  openGraph: {
    title: "Mejores Apps y Herramientas de IA | Biblioteca Completa",
    description:
      "Ranking actualizado de las mejores herramientas de IA para productividad, marketing, diseño, código y más.",
    url: "https://juanarango.com/app-tools",
  },
  alternates: {
    canonical: "https://juanarango.com/app-tools",
  },
}

export default async function AppToolsPage() {
  const [allApps, featuredApp, trendingApps] = await Promise.all([
    client.fetch<AppToolSanity[]>(ALL_APP_TOOLS_QUERY),
    client.fetch<AppToolSanity | null>(FEATURED_APP_QUERY),
    client.fetch<AppToolSanity[]>(TRENDING_APPS_QUERY),
  ])

  return (
    <main className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      {/* ===== HERO INTRO ===== */}
      <section className="mb-10">
        <div className="flex items-center gap-2 text-primary">
          <Sparkles className="size-5" aria-hidden="true" />
          <span className="text-sm font-semibold tracking-wide uppercase">
            Biblioteca de Apps
          </span>
        </div>
        <h1 className="mt-2 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl text-balance">
          Las Mejores Herramientas de{" "}
          <span className="text-primary">Inteligencia Artificial</span>
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted-foreground leading-relaxed">
          Descubre, compara y elige las mejores apps de IA para potenciar tu
          negocio. Cada herramienta ha sido investigada y analizada para que
          tomes la mejor decisión.
        </p>
      </section>

      {/* ===== FEATURED APP ===== */}
      {featuredApp && (
        <section className="mb-12">
          <HeroBanner app={featuredApp} />
        </section>
      )}

      {/* ===== TRENDING ===== */}
      {trendingApps && trendingApps.length > 0 && (
        <section className="mb-12">
          <TrendingSection apps={trendingApps} />
        </section>
      )}

      {/* ===== RANKING TABLE ===== */}
      <section>
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-5">
          <Library className="size-5 text-primary" aria-hidden="true" />
          Biblioteca Completa
        </h2>
        <RankingTable apps={allApps || []} />
      </section>
    </main>
  )
}
