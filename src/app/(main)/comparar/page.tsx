import { Metadata } from "next"
import Link from "next/link"
import { client } from "@/sanity/lib/client"
import { StarRating } from "@/components/app-tools/star-rating"
import { ArrowRight, Swords, Trophy } from "lucide-react"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "Comparativas de Apps IA | Juan Arango",
  description: "Comparaciones detalladas entre las mejores herramientas de inteligencia artificial. Encuentra la app perfecta para ti con nuestras comparativas lado a lado.",
  openGraph: {
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
    <div className="bg-white dark:bg-zinc-950 min-h-screen">
      {/* Hero */}
      <header className="container mx-auto px-4 pt-32 pb-12 max-w-5xl">
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
          <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            Inicio
          </Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-100">Comparativas</span>
        </nav>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center shadow-lg">
            <Swords className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.1]">
              Comparativas de Apps IA
            </h1>
          </div>
        </div>

        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Comparaciones detalladas lado a lado entre las mejores herramientas de inteligencia artificial. 
          Descubre cuál se adapta mejor a tus necesidades.
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
                className="group flex flex-col rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-6 transition-all hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5"
              >
                {/* VS Header */}
                <div className="flex items-center gap-3 mb-4">
                  {comp.app1 && (
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${comp.app1.iconBg || 'bg-emerald-500'}`}>
                      {comp.app1.appName?.charAt(0)}
                    </div>
                  )}
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">VS</span>
                  {comp.app2 && (
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm ${comp.app2.iconBg || 'bg-blue-500'}`}>
                      {comp.app2.appName?.charAt(0)}
                    </div>
                  )}
                </div>

                {/* Title */}
                <h2 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2 mb-2">
                  {comp.title || `${comp.app1?.appName} vs ${comp.app2?.appName}`}
                </h2>

                {/* Description */}
                <p className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-4">
                  {comp.metaDescription || comp.verdict}
                </p>

                {/* App Quick Info */}
                <div className="flex flex-col gap-2 mb-4">
                  {[comp.app1, comp.app2].map((app: any, i: number) =>
                    app ? (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <span className="font-medium text-zinc-700 dark:text-zinc-300">{app.appName}</span>
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
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-zinc-800">
                  <span className="text-xs text-zinc-500">
                    {comp.publishedAt
                      ? new Date(comp.publishedAt).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })
                      : ""}
                  </span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Ver comparativa <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700">
            <Swords className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-zinc-700 dark:text-zinc-300 mb-2">
              Próximamente
            </h2>
            <p className="text-zinc-500 dark:text-zinc-400">
              Estamos preparando comparativas detalladas de las mejores apps de IA.
            </p>
          </div>
        )}

        {/* Cross-link to IA Apps */}
        <Link
          href="/app-tools"
          className="group mt-10 flex items-center gap-4 rounded-xl border border-emerald-200 dark:border-emerald-900/50 bg-gradient-to-r from-emerald-50 to-white dark:from-emerald-950/30 dark:to-zinc-900 p-5 md:p-6 transition-all hover:border-emerald-400 hover:shadow-lg hover:shadow-emerald-500/10"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/20">
            <Trophy className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base md:text-lg font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
              🏆 Ver el Ranking Completo de Apps IA
            </h3>
            <p className="text-xs md:text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">
              +25 herramientas analizadas con rating, precios y reviews detalladas.
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
