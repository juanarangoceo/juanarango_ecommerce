import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import {
  APP_TOOL_BY_SLUG_QUERY,
  ALL_APP_TOOLS_QUERY,
  getCategoryLabel,
  getAppUrl,
} from "@/lib/app-tools-queries"
import type { AppToolSanity } from "@/lib/app-tools-queries"
import { AppIcon } from "@/components/app-tools/app-icon"
import { PricingBadge } from "@/components/app-tools/pricing-badge"
import { AppCard } from "@/components/app-tools/app-card"
import {
  ArrowRight,
  ChevronRight,
  CheckCircle,
  XCircle,
  ExternalLink,
  Monitor,
} from "lucide-react"
import { Button } from "@/components/ui/button"

export const revalidate = 3600

type AppToolDetail = AppToolSanity & {
  relatedApps: AppToolSanity[]
}

// ===== STATIC PARAMS =====
export async function generateStaticParams() {
  const apps = await client.fetch<{ slug: { current: string } }[]>(
    `*[_type == "appTool" && defined(slug.current)]{ slug }`
  )
  return apps.map((app) => ({ slug: app.slug.current }))
}

// ===== METADATA =====
export async function generateMetadata(
  props: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const params = await props.params
  const app = await client.fetch<AppToolDetail | null>(APP_TOOL_BY_SLUG_QUERY, {
    slug: params.slug,
  })

  if (!app) return { title: "App no encontrada" }

  return {
    title: `${app.appName} — Reseña, Funcionalidades y Precio | Nitro Ecom`,
    description:
      app.description ||
      `Descubre ${app.appName}: funcionalidades, ventajas, desventajas y precio.`,
    openGraph: {
      title: `${app.appName} — Reseña Completa`,
      description: app.description,
      url: `https://juanarango.com/app-tools/${app.slug.current}`,
    },
    alternates: {
      canonical: `https://juanarango.com/app-tools/${app.slug.current}`,
    },
  }
}

// ===== PAGE =====
export default async function AppToolDetailPage(
  props: { params: Promise<{ slug: string }> }
) {
  const params = await props.params
  const app = await client.fetch<AppToolDetail | null>(APP_TOOL_BY_SLUG_QUERY, {
    slug: params.slug,
  })

  if (!app) notFound()

  const visitUrl = getAppUrl(app)

  return (
    <main className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
      {/* ===== BREADCRUMB ===== */}
      <nav
        aria-label="Breadcrumb"
        className="mb-6 flex items-center gap-1 text-sm text-muted-foreground"
      >
        <Link href="/" className="hover:text-foreground transition-colors">
          Inicio
        </Link>
        <ChevronRight className="size-3" aria-hidden="true" />
        <Link href="/app-tools" className="hover:text-foreground transition-colors">
          App Tools
        </Link>
        <ChevronRight className="size-3" aria-hidden="true" />
        <span className="text-foreground font-medium">{app.appName}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-3">
        {/* ===== MAIN CONTENT ===== */}
        <div className="lg:col-span-2 flex flex-col gap-10">
          {/* Header */}
          <header className="flex items-start gap-4">
            <AppIcon
              category={app.category}
              iconBg={app.iconBg}
              size="lg"
            />
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold text-foreground sm:text-3xl">
                {app.appName}
              </h1>
              <div className="flex items-center gap-2 flex-wrap">
                <PricingBadge pricing={app.pricing} />
                <span className="rounded-md border border-border bg-secondary/50 px-2 py-0.5 text-xs text-muted-foreground">
                  {getCategoryLabel(app.category)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xl">
                {app.description}
              </p>
            </div>
          </header>

          {/* Long Description */}
          {app.longDescription && (
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                ¿Qué es {app.appName}?
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {app.longDescription}
              </p>
            </section>
          )}

          {/* Features */}
          {app.features && app.features.length > 0 && (
            <section>
              <h2 className="text-lg font-semibold text-foreground mb-3">
                Funcionalidades Principales
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {app.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 rounded-lg border border-border bg-card p-3"
                  >
                    <CheckCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                    <p className="text-sm text-muted-foreground">{feature}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Pros & Cons */}
          {(app.pros?.length > 0 || app.cons?.length > 0) && (
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* Pros */}
              {app.pros?.length > 0 && (
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
                  <h3 className="mb-3 font-semibold text-emerald-400">
                    Ventajas
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {app.pros.map((pro, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CheckCircle className="mt-0.5 size-3.5 shrink-0 text-emerald-400" />
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Cons */}
              {app.cons?.length > 0 && (
                <div className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-5">
                  <h3 className="mb-3 font-semibold text-rose-400">
                    Desventajas
                  </h3>
                  <ul className="flex flex-col gap-2">
                    {app.cons.map((con, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <XCircle className="mt-0.5 size-3.5 shrink-0 text-rose-400" />
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          )}

          {/* CTA */}
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
            <p className="mb-3 font-semibold text-foreground">
              ¿Listo para probar {app.appName}?
            </p>
            <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href={visitUrl} target="_blank" rel="noopener noreferrer sponsored">
                Visitar {app.appName}
                <ArrowRight className="size-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* ===== SIDEBAR ===== */}
        <aside className="flex flex-col gap-6">
          {/* Info card */}
          <div className="rounded-xl border border-border bg-card p-5">
            <h3 className="mb-4 font-semibold text-foreground">Detalles</h3>
            <dl className="flex flex-col gap-3 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Precio</dt>
                <dd>
                  <PricingBadge pricing={app.pricing} />
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Categoría</dt>
                <dd className="font-medium text-foreground">
                  {getCategoryLabel(app.category)}
                </dd>
              </div>
              {app.rank && (
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Ranking</dt>
                  <dd className="font-bold text-primary text-lg">#{app.rank}</dd>
                </div>
              )}
            </dl>
            <hr className="my-4 border-border" />
            <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <a href={visitUrl} target="_blank" rel="noopener noreferrer sponsored">
                Probar Ahora <ExternalLink className="size-3.5" />
              </a>
            </Button>
          </div>

          {/* Platforms */}
          {app.platforms && app.platforms.length > 0 && (
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 font-semibold text-foreground flex items-center gap-2">
                <Monitor className="size-4 text-primary" aria-hidden="true" />
                Plataformas
              </h3>
              <div className="flex flex-wrap gap-2">
                {app.platforms.map((platform, i) => (
                  <span
                    key={i}
                    className="rounded-md border border-border bg-secondary/50 px-2.5 py-1 text-xs text-muted-foreground"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* ===== RELATED APPS ===== */}
      {app.relatedApps && app.relatedApps.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-5 text-lg font-semibold text-foreground">
            Apps Similares
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {app.relatedApps.map((related) => (
              <AppCard key={related._id} app={related as AppToolSanity} />
            ))}
          </div>
        </section>
      )}

      {/* ===== SCHEMA MARKUP ===== */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: app.appName,
            description: app.description,
            url: app.websiteUrl,
            applicationCategory: getCategoryLabel(app.category),
            offers: {
              "@type": "Offer",
              price: app.pricing === "Free" ? "0" : undefined,
              priceCurrency: "USD",
              category: app.pricing,
            },
            operatingSystem: app.platforms?.join(", "),
          }),
        }}
      />
    </main>
  )
}
