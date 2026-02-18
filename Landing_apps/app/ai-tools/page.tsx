import { apps } from "@/lib/ai-tools-data"
import { HeroBanner } from "@/components/ai-tools/hero-banner"
import { TrendingSection } from "@/components/ai-tools/trending-section"
import { RankingTable } from "@/components/ai-tools/ranking-table"

export default function AiToolsPage() {
  const featuredApp = apps[0]
  const trendingApps = apps.slice(0, 8)

  return (
    <div className="flex flex-col gap-10">
      {/* Intro */}
      <section className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl lg:text-5xl text-balance leading-tight">
          Las Mejores Herramientas de IA y Productividad para tu Negocio
        </h1>
        <p className="max-w-3xl text-base text-muted-foreground leading-relaxed md:text-lg">
          En Nitro Ecom seleccionamos, probamos y organizamos las aplicaciones
          de inteligencia artificial y productividad que realmente marcan la
          diferencia. Esta biblioteca es tu recurso para descubrir herramientas
          que te ayuden a automatizar, crear contenido, gestionar proyectos y
          escalar tu negocio online.
        </p>
      </section>

      {/* Hero */}
      <HeroBanner app={featuredApp} />

      {/* Trending - always visible */}
      <TrendingSection apps={trendingApps} />

      {/* Ranking Table with category filter inside */}
      <section>
        <h2 className="mb-4 text-lg font-semibold text-foreground">
          Biblioteca Completa
        </h2>
        <div className="rounded-xl border border-border bg-card p-4 md:p-6">
          <RankingTable apps={apps} />
        </div>
      </section>
    </div>
  )
}
