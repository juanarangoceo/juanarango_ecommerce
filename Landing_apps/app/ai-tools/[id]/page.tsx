import { notFound } from "next/navigation"
import Link from "next/link"
import type { Metadata } from "next"
import {
  ExternalLink,
  Share2,
  ChevronRight,
  Check,
  X,
  Globe,
  Smartphone,
  Monitor,
  Calendar,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { AppIcon } from "@/components/ai-tools/app-icon"
import { PricingBadge } from "@/components/ai-tools/pricing-badge"
import { AppCard } from "@/components/ai-tools/app-card"
import {
  apps,
  getAppById,
  getRelatedApps,
  getCategoryLabel,
  getAppUrl,
} from "@/lib/ai-tools-data"

export function generateStaticParams() {
  return apps.map((app) => ({ id: app.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const app = getAppById(id)
  if (!app) return { title: "App no encontrada" }

  return {
    title: `${app.name} - Recomendacion Nitro Ecom 2026`,
    description: `${app.description}. ${app.pricing}. Descubre funciones, ventajas y alternativas recomendadas por Nitro Ecom.`,
  }
}

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const app = getAppById(id)
  if (!app) notFound()

  const relatedApps = getRelatedApps(app.id, 3)
  const affiliateLink = getAppUrl(app)

  return (
    <div className="flex flex-col gap-8">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-sm text-muted-foreground">
        <Link href="/ai-tools" className="hover:text-foreground transition-colors">
          AI Tools
        </Link>
        <ChevronRight className="size-3.5" aria-hidden="true" />
        <span className="text-foreground font-medium">{app.name}</span>
      </nav>

      {/* Header + Sidebar */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Main content */}
        <div className="flex-1 flex flex-col gap-8">
          {/* App Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
            <AppIcon
              category={app.category}
              iconBg={app.iconBg}
              size="lg"
            />
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold text-foreground md:text-3xl text-balance">
                  {app.name}
                </h1>
                <Badge
                  variant="outline"
                  className="border-primary/30 bg-primary/10 text-primary text-xs"
                >
                  Recomendado
                </Badge>
              </div>
              <p className="text-muted-foreground leading-relaxed max-w-2xl">
                {app.longDescription}
              </p>
              <div className="flex items-center gap-3">
                <PricingBadge pricing={app.pricing} />
                <span className="text-xs text-muted-foreground">
                  Actualizado{" "}
                  {new Date(app.updatedAt).toLocaleDateString("es-ES", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              {/* CTA Buttons */}
              <div className="flex items-center gap-3 pt-1">
                <Button
                  asChild
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <a
                    href={affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer sponsored"
                  >
                    Visitar Sitio
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
                <Button variant="outline" size="icon" aria-label="Compartir">
                  <Share2 className="size-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Features */}
          <section>
            <h2 className="mb-4 text-lg font-semibold text-foreground">
              Funcionalidades Principales
            </h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {app.features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-start gap-2 rounded-lg border border-border bg-secondary/20 px-4 py-3"
                >
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-400" aria-hidden="true" />
                  <span className="text-sm text-foreground leading-relaxed">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Pros & Cons */}
          <section className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                <div className="flex size-6 items-center justify-center rounded-md bg-emerald-500/15">
                  <Check className="size-3.5 text-emerald-400" aria-hidden="true" />
                </div>
                Ventajas
              </h3>
              <ul className="flex flex-col gap-2">
                {app.pros.map((pro) => (
                  <li key={pro} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 size-3.5 shrink-0 text-emerald-400" aria-hidden="true" />
                    <span className="text-muted-foreground leading-relaxed">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-foreground">
                <div className="flex size-6 items-center justify-center rounded-md bg-rose-500/15">
                  <X className="size-3.5 text-rose-400" aria-hidden="true" />
                </div>
                Desventajas
              </h3>
              <ul className="flex flex-col gap-2">
                {app.cons.map((con) => (
                  <li key={con} className="flex items-start gap-2 text-sm">
                    <X className="mt-0.5 size-3.5 shrink-0 text-rose-400" aria-hidden="true" />
                    <span className="text-muted-foreground leading-relaxed">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Affiliate CTA */}
          <section className="rounded-xl border border-primary/20 bg-primary/[0.05] p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-semibold text-foreground">
                  Prueba {app.name} hoy
                </h3>
                <p className="text-sm text-muted-foreground">
                  Recomendado por el equipo de Nitro Ecom para tu negocio.
                </p>
              </div>
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 shrink-0"
              >
                <a
                  href={affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                >
                  Ir a {app.name}
                  <ExternalLink className="size-4" />
                </a>
              </Button>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <aside className="w-full shrink-0 lg:w-72">
          <div className="sticky top-20 flex flex-col gap-4">
            {/* App Details Card */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Detalles
              </h3>
              <dl className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-muted-foreground">Categoria</dt>
                  <dd className="text-sm font-medium text-foreground">
                    {getCategoryLabel(app.category)}
                  </dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-muted-foreground">Precio</dt>
                  <dd>
                    <PricingBadge pricing={app.pricing} />
                  </dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-muted-foreground">Plataformas</dt>
                  <dd className="flex items-center gap-1.5">
                    {app.platforms.map((p) => (
                      <span
                        key={p}
                        className="text-muted-foreground"
                        title={p}
                      >
                        {p === "Web" && <Globe className="size-4" />}
                        {(p === "iOS" || p === "Android") && (
                          <Smartphone className="size-4" />
                        )}
                        {(p === "Desktop" || p === "VS Code" || p === "JetBrains") && (
                          <Monitor className="size-4" />
                        )}
                      </span>
                    ))}
                  </dd>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-muted-foreground">Actualizado</dt>
                  <dd className="flex items-center gap-1 text-sm text-foreground">
                    <Calendar className="size-3.5" aria-hidden="true" />
                    {new Date(app.updatedAt).toLocaleDateString("es-ES", {
                      month: "short",
                      year: "numeric",
                    })}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Tags */}
            <div className="rounded-xl border border-border bg-card p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {app.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="text-xs capitalize"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Related Tools */}
      {relatedApps.length > 0 && (
        <section>
          <Separator className="mb-8" />
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Herramientas Similares
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {relatedApps.map((related) => (
              <AppCard key={related.id} app={related} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
