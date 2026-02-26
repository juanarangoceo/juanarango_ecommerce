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
import { Sparkles, Library, Swords, ArrowRight } from "lucide-react"
import Link from "next/link"
import { LatestNewsSidebar } from "@/components/app-tools/latest-news-sidebar"
import { NewsletterForm } from "@/components/newsletter-form"

// Fetch 10 most recent posts
const LATEST_POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(coalesce(publishedAt, _createdAt) desc)[0...10] {
  _id,
  title,
  slug,
  "publishedAt": coalesce(publishedAt, _createdAt)
}`

export const revalidate = 3600

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
  const [allApps, featuredApp, trendingApps, latestPosts] = await Promise.all([
    client.fetch<AppToolSanity[]>(ALL_APP_TOOLS_QUERY),
    client.fetch<AppToolSanity | null>(FEATURED_APP_QUERY),
    client.fetch<AppToolSanity[]>(TRENDING_APPS_QUERY),
    client.fetch(LATEST_POSTS_QUERY),
  ])

  return (
    <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LADO IZQUIERDO: Contenido Principal */}
        <div className="lg:col-span-8 flex flex-col gap-12">
          
          {/* ===== HERO INTRO ===== */}
          <section>
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
            <section>
              <HeroBanner app={featuredApp} />
            </section>
          )}

          {/* ===== TRENDING ===== */}
          {trendingApps && trendingApps.length > 0 && (
            <section>
              <TrendingSection apps={trendingApps} />
            </section>
          )}

          {/* ===== CROSS-LINK: Comparativas ===== */}
          <section>
            <Link
              href="/comparar"
              className="group flex items-center gap-4 rounded-xl border border-blue-200 dark:border-blue-900/50 bg-gradient-to-r from-blue-50 to-white dark:from-blue-950/30 dark:to-zinc-900 p-5 md:p-6 transition-all hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/10"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
                <Swords className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base md:text-lg font-bold text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  ⚔️ ¿No sabes cuál elegir? Mira nuestras Comparativas
                </h3>
                <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
                  Comparaciones lado a lado con veredicto, tabla comparativa y análisis detallado.
                </p>
              </div>
              <ArrowRight className="w-5 h-5 text-blue-500 shrink-0 transition-transform group-hover:translate-x-1" />
            </Link>
          </section>

          {/* ===== RANKING TABLE ===== */}
          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground mb-5">
              <Library className="size-5 text-primary" aria-hidden="true" />
              Biblioteca Completa
            </h2>
            <RankingTable apps={allApps || []} />
          </section>
        </div>

        {/* LADO DERECHO: Sidebar Pegajoso (News + Newsletter) */}
        <aside className="lg:col-span-4 mt-12 lg:mt-0">
          <div className="lg:sticky lg:top-24 space-y-6">
            <LatestNewsSidebar posts={latestPosts} />
            
            {/* Newsletter */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <NewsletterForm />
            </div>
          </div>
        </aside>

      </div>
    </main>
  )
}
