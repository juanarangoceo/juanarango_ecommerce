import { Metadata } from "next"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { StarRating } from "@/components/app-tools/star-rating"
import { ArrowRight, Swords, Trophy } from "lucide-react"



export const metadata: Metadata = {
  title: "Comparativas de Apps IA",
  description: "Comparaciones detalladas entre las mejores herramientas de inteligencia artificial. Encuentra la app perfecta para ti con nuestras comparativas lado a lado.",
  openGraph: {
    images: [{ url: "/og-nitro.png", width: 1200, height: 630 }],
    title: "Comparativas de Apps IA",
    description: "Comparaciones detalladas entre las mejores herramientas de inteligencia artificial.",
    type: "website",
  },
  alternates: {
    canonical: "https://www.juanarangoecommerce.com/comparar",
  },
}

const ALL_COMPARISONS_QUERY = `*[_type == "appComparison" && defined(slug.current) && !(_id in path("drafts.**"))] | order(publishedAt desc) {
  _id,
  title,
  slug,
  metaDescription,
  verdict,
  publishedAt,
  "app1": app1->{
    appName, slug, description, pricing, priceDetail, rating, iconBg, category
  },
  "app2": app2->{
    appName, slug, description, pricing, priceDetail, rating, iconBg, category
  }
}`

export default async function CompararPage() {
  const comparisons = await client.fetch(ALL_COMPARISONS_QUERY)

  return (
    <div className="min-h-screen pb-24">
      {/* Hero */}
      <header className="mx-auto max-w-5xl px-5 pb-14 pt-32 text-center lg:px-8 lg:pb-20 lg:pt-44">
        <nav className="mb-8 flex items-center justify-center gap-2 text-sm text-white/38">
          <Link href="/" className="hover:text-white transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-white">Comparativas</span>
        </nav>

        <div className="flex flex-col items-center gap-5">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/9 text-primary">
            <Swords className="size-7" />
          </div>
          <div>
            <h1 className="text-balance font-display text-[clamp(2.8rem,7vw,5.8rem)] font-bold leading-[.97] tracking-[-0.05em] text-white">
              Compara antes de <span className="text-primary">sumar otra herramienta.</span>
            </h1>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/55">
          Revisa funciones, precios declarados y diferencias de uso para elegir con más contexto.
        </p>
      </header>

      {/* Comparisons Grid */}
      <div className="container mx-auto px-4 pb-16 md:pb-24 max-w-5xl">
        {comparisons && comparisons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {comparisons.map((comp: any) => (
              <Link
                key={comp._id}
                href={`/comparar/${comp.slug?.current}`}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/9 bg-[#0d110e] p-6 transition-[border-color,transform,background-color] hover:-translate-y-1 hover:border-primary/35 hover:bg-[#101611]"
              >
                {/* VS Header */}
                <div className="flex items-center gap-3 mb-4">
                  {comp.app1 && (
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${comp.app1.iconBg || 'bg-emerald-500'}`}>
                      {comp.app1.appName?.charAt(0)}
                    </div>
                  )}
                  <span className="text-xs font-bold text-white/58 uppercase tracking-wider">VS</span>
                  {comp.app2 && (
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${comp.app2.iconBg || 'bg-blue-500'}`}>
                      {comp.app2.appName?.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Title */}
                <h2 className="mb-2 line-clamp-2 text-lg font-bold text-white transition-colors group-hover:text-primary">
                  {comp.title || `${comp.app1?.appName} vs ${comp.app2?.appName}`}
                </h2>

                {/* Description */}
                <p className="text-sm text-white/58 line-clamp-2 mb-4">
                  {comp.metaDescription || comp.verdict}
                </p>

                {/* App Quick Info */}
                <div className="flex flex-col gap-2 mb-4">
                  {[comp.app1, comp.app2].map((app: any, i: number) =>
                    app ? (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <span className="font-medium text-white/78">{app.appName}</span>
                        <div className="flex items-center gap-2">
                          {app.rating && <StarRating rating={app.rating} className="scale-90" />}
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                            app.pricing === 'Free' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                            app.pricing === 'Freemium' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' :
                            'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
                          }`}>
                            {app.pricing}
                          </span>
                        </div>
                      </div>
                    ) : null
                  )}
                </div>

                {/* CTA */}
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/10">
                  <span className="text-xs text-white/45">
                    {comp.publishedAt
                      ? new Date(comp.publishedAt).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })
                      : ""}
                  </span>
                  <span className="flex items-center gap-1 text-xs font-medium text-primary transition-opacity">
                    Ver comparativa <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-xl border border-dashed border-white/15">
            <Swords className="w-12 h-12 text-white/58 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-white/78 mb-2">
              Próximamente
            </h2>
            <p className="text-white/58">
              Estamos preparando comparativas detalladas de las mejores apps de IA.
            </p>
          </div>
        )}

        {/* Cross-link to IA Apps */}
        <Link
          href="/app-tools"
          className="group mt-10 flex items-center gap-4 rounded-2xl border border-primary/18 bg-[#0d110e] p-5 transition-colors hover:border-primary/40 md:p-6"
        >
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-primary/9 text-primary">
            <Trophy className="size-6" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-bold text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              Explorar la biblioteca completa de herramientas
            </h3>
            <p className="text-xs md:text-sm text-white/58 mt-0.5">
              Rankings, fichas y contexto de uso reunidos en un solo lugar.
            </p>
          </div>
          <ArrowRight className="w-5 h-5 text-emerald-500 shrink-0 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Comparativas de Apps IA",
            description: "Comparaciones detalladas entre las mejores herramientas de inteligencia artificial.",
            url: "https://www.juanarangoecommerce.com/comparar",
          }),
        }}
      />
    </div>
  )
}
