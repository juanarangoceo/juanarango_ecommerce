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
import { Library, Swords, ArrowRight, BookOpen } from "lucide-react"
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



export const metadata: Metadata = {
  title: "Mejores Apps y Herramientas de IA | Biblioteca Completa - Nitro Ecom",
  description:
    "Descubre las mejores apps y herramientas de inteligencia artificial para tu negocio. Ranking actualizado con reseñas, funcionalidades, precios y comparativas.",
  openGraph: {
    images: [{ url: "/og-nitro.png", width: 1200, height: 630 }],
    title: "Mejores Apps y Herramientas de IA | Biblioteca Completa",
    description:
      "Ranking actualizado de las mejores herramientas de IA para productividad, marketing, diseño, código y más.",
    url: "https://juanarango.com/app-tools",
  },
  alternates: {
    canonical: "https://www.juanarangoecommerce.com/app-tools",
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
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-32 lg:px-8 lg:pt-44">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LADO IZQUIERDO: Contenido Principal */}
        <div className="lg:col-span-8 flex flex-col gap-12">
          
          {/* ===== HERO INTRO ===== */}
          <section className="pb-4 text-center lg:text-left">
            <h1 className="text-balance font-display text-[clamp(2.8rem,6vw,5.5rem)] font-bold leading-[.97] tracking-[-0.05em] text-white">
              Encuentra la herramienta adecuada para <span className="text-primary">el trabajo real.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/55 lg:mx-0">
              Explora aplicaciones de IA, compara funciones y entiende para qué
              tipo de tarea puede servir cada una antes de incorporarla a tu flujo.
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
              className="group flex items-center gap-4 rounded-2xl border border-white/9 bg-[#0d110e] p-5 transition-colors hover:border-primary/35 md:p-6"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/9 text-primary">
                <Swords className="size-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-white transition-colors group-hover:text-primary md:text-lg">
                  Compara las opciones lado a lado
                </h3>
                <p className="text-xs md:text-sm text-white/58 mt-0.5">
                  Comparaciones lado a lado con veredicto, tabla comparativa y análisis detallado.
                </p>
              </div>
              <ArrowRight className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
            </Link>

            {/* CROSS-LINK: Guías Especializadas */}
            <Link
              href="/guias"
              className="group mt-3 flex items-center gap-4 rounded-2xl border border-white/9 bg-[#0d110e] p-5 transition-colors hover:border-primary/35 md:p-6"
            >
              <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/9 text-primary">
                <BookOpen className="size-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-base font-bold text-white transition-colors group-hover:text-primary md:text-lg">
                  Aprende el contexto con una guía completa
                </h3>
                <p className="text-xs md:text-sm text-white/58 mt-0.5">
                  Shopify, MCP, Claude Code y OpenClaw AI — guías completas paso a paso.
                </p>
              </div>
              <ArrowRight className="size-5 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
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
            <div className="rounded-2xl border border-white/9 bg-[#0d110e] p-6">
              <NewsletterForm />
            </div>
          </div>
        </aside>

      </div>
    </div>
  )
}
