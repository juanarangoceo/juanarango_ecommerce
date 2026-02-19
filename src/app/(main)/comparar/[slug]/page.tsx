import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { client } from "@/sanity/lib/client"
import { ChevronDown, ExternalLink, ArrowRight, CheckCircle2, XCircle, Target } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { StarRating } from "@/components/app-tools/star-rating"

export const revalidate = 86400

// GROQ Queries
const COMPARISON_BY_SLUG_QUERY = `*[_type == "appComparison" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  _id,
  title,
  slug,
  metaDescription,
  introText,
  app1Summary,
  app2Summary,
  app1BestFor,
  app2BestFor,
  content,
  comparisonTable,
  verdict,
  faq,
  publishedAt,
  "app1": app1->{
    _id, appName, slug, description, category, pricing, priceDetail, rating, iconBg, websiteUrl, affiliateUrl, features, pros, cons, platforms
  },
  "app2": app2->{
    _id, appName, slug, description, category, pricing, priceDetail, rating, iconBg, websiteUrl, affiliateUrl, features, pros, cons, platforms
  }
}`

const ALL_COMPARISONS_QUERY = `*[_type == "appComparison" && defined(slug.current) && !(_id in path("drafts.**"))]{ "slug": slug.current }`

export async function generateStaticParams() {
  const comparisons = await client.fetch(ALL_COMPARISONS_QUERY)
  return (comparisons || []).map((c: any) => ({ slug: c.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const comparison = await client.fetch(COMPARISON_BY_SLUG_QUERY, { slug })
  if (!comparison) return { title: 'Comparación no encontrada' }

  return {
    title: `${comparison.title} | Juan Arango`,
    description: comparison.metaDescription || `Comparación detallada entre ${comparison.app1?.appName} y ${comparison.app2?.appName}`,
    openGraph: {
      title: comparison.title,
      description: comparison.metaDescription,
      type: 'article',
      publishedTime: comparison.publishedAt,
    },
    alternates: {
      canonical: `https://www.juanarangoecommerce.com/comparar/${comparison.slug?.current}`,
    },
  }
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const comparison = await client.fetch(COMPARISON_BY_SLUG_QUERY, { slug })

  if (!comparison) notFound()

  const { app1, app2 } = comparison

  // Schema.org
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: comparison.title,
        description: comparison.metaDescription,
        url: `https://www.juanarangoecommerce.com/comparar/${comparison.slug?.current}`,
        datePublished: comparison.publishedAt,
        author: { "@type": "Person", name: "Juan Arango" },
      },
      ...(comparison.faq?.length > 0 ? [{
        "@type": "FAQPage",
        mainEntity: comparison.faq.map((item: any) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      }] : []),
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="bg-white dark:bg-zinc-950 min-h-screen">
        {/* ===== HERO ===== */}
        <header className="container mx-auto px-4 pt-28 md:pt-32 pb-8 max-w-4xl">
          <nav className="flex items-center gap-2 text-xs text-zinc-500 mb-4">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Inicio</Link>
            <span>/</span>
            <Link href="/comparar" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">Comparativas</Link>
            <span>/</span>
            <span className="text-zinc-900 dark:text-zinc-100 truncate max-w-[200px]">{app1?.appName} vs {app2?.appName}</span>
          </nav>

          <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4 leading-tight">
            {comparison.title}
          </h1>

          {/* Intro text */}
          {comparison.introText && (
            <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
              {comparison.introText}
            </p>
          )}
        </header>

        <div className="container mx-auto px-4 pb-12 md:pb-20 max-w-4xl space-y-8 md:space-y-12">

          {/* ===== VS CARDS ===== */}
          {app1 && app2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { app: app1, summary: comparison.app1Summary, bestFor: comparison.app1BestFor, color: 'emerald' },
                { app: app2, summary: comparison.app2Summary, bestFor: comparison.app2BestFor, color: 'blue' },
              ].map(({ app, summary, bestFor, color }) => (
                <div
                  key={app._id}
                  className={`rounded-xl border p-5 ${
                    color === 'emerald'
                      ? 'border-emerald-200 dark:border-emerald-900/50 bg-emerald-50/50 dark:bg-emerald-950/20'
                      : 'border-blue-200 dark:border-blue-900/50 bg-blue-50/50 dark:bg-blue-950/20'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`w-9 h-9 rounded-lg flex items-center justify-center text-white font-bold text-sm ${app.iconBg || (color === 'emerald' ? 'bg-emerald-500' : 'bg-blue-500')}`}>
                      {app.appName?.charAt(0)}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h2 className="text-lg font-bold text-zinc-900 dark:text-white truncate">{app.appName}</h2>
                      <div className="flex items-center gap-2">
                        {app.rating && <StarRating rating={app.rating} />}
                        <span className={`px-1.5 py-0.5 rounded text-[10px] font-medium ${
                          app.pricing === 'Free' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                          app.pricing === 'Freemium' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' :
                          'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
                        }`}>
                          {app.priceDetail || app.pricing}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-3">
                    {summary || app.description}
                  </p>

                  {bestFor && (
                    <div className={`flex items-start gap-2 text-xs p-2.5 rounded-lg ${
                      color === 'emerald'
                        ? 'bg-emerald-100/80 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-300'
                        : 'bg-blue-100/80 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300'
                    }`}>
                      <Target className="w-3.5 h-3.5 mt-0.5 shrink-0" />
                      <span>{bestFor}</span>
                    </div>
                  )}

                  {/* Pros / Cons mini */}
                  {(app.pros?.length > 0 || app.cons?.length > 0) && (
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="space-y-1">
                        {(app.pros || []).slice(0, 3).map((pro: string, i: number) => (
                          <div key={i} className="flex items-start gap-1.5 text-[11px] text-zinc-600 dark:text-zinc-400">
                            <CheckCircle2 className="w-3 h-3 text-green-500 mt-0.5 shrink-0" />
                            <span className="line-clamp-1">{pro}</span>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-1">
                        {(app.cons || []).slice(0, 3).map((con: string, i: number) => (
                          <div key={i} className="flex items-start gap-1.5 text-[11px] text-zinc-600 dark:text-zinc-400">
                            <XCircle className="w-3 h-3 text-red-400 mt-0.5 shrink-0" />
                            <span className="line-clamp-1">{con}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA */}
                  <div className="mt-3 flex gap-2">
                    <Link
                      href={`/app-tools/${app.slug?.current}`}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 transition-colors"
                    >
                      Ver Review <ArrowRight className="w-3 h-3" />
                    </Link>
                    {(app.affiliateUrl || app.websiteUrl) && (
                      <a
                        href={app.affiliateUrl || app.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-colors ${
                          color === 'emerald' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        Probar <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ===== COMPARISON TABLE ===== */}
          {comparison.comparisonTable?.length > 0 && (
            <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-900">
                    <th className="text-left px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300 text-xs uppercase tracking-wider">Característica</th>
                    <th className="text-left px-4 py-3 font-semibold text-emerald-700 dark:text-emerald-400 text-xs">{app1?.appName}</th>
                    <th className="text-left px-4 py-3 font-semibold text-blue-700 dark:text-blue-400 text-xs">{app2?.appName}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {comparison.comparisonTable.map((row: any, i: number) => (
                    <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-2.5 font-medium text-zinc-900 dark:text-zinc-100 text-sm">{row.feature}</td>
                      <td className="px-4 py-2.5 text-zinc-600 dark:text-zinc-400 text-sm">{row.app1Value}</td>
                      <td className="px-4 py-2.5 text-zinc-600 dark:text-zinc-400 text-sm">{row.app2Value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ===== MARKDOWN CONTENT ===== */}
          {comparison.content && (
            <article className="prose prose-zinc dark:prose-invert prose-sm md:prose-base max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-xl md:prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-zinc-100 dark:prose-h2:border-zinc-800
              prose-h3:text-lg md:prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-400 prose-p:mb-3
              prose-strong:text-zinc-900 dark:prose-strong:text-white
              prose-ul:list-disc prose-ul:pl-5 prose-ul:my-3
              prose-li:marker:text-emerald-500 prose-li:mb-1
            ">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({node, ...props}) => <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800" {...props}>{props.children}</h2>,
                  h2: ({node, ...props}) => <h2 className="text-xl md:text-2xl font-bold mt-8 mb-4 pb-2 border-b border-zinc-200 dark:border-zinc-800" {...props}>{props.children}</h2>,
                  h3: ({node, ...props}) => <h3 className="text-lg md:text-xl font-bold mt-6 mb-3" {...props}>{props.children}</h3>,
                  table: ({node, ...props}) => (
                    <div className="overflow-x-auto my-6 rounded-lg border border-zinc-200 dark:border-zinc-800">
                      <table className="w-full text-left text-sm" {...props}>{props.children}</table>
                    </div>
                  ),
                  thead: ({node, ...props}) => <thead className="bg-zinc-100 dark:bg-zinc-900 font-semibold" {...props}>{props.children}</thead>,
                  tbody: ({node, ...props}) => <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800" {...props}>{props.children}</tbody>,
                  th: ({node, ...props}) => <th className="px-3 py-2 text-xs" {...props}>{props.children}</th>,
                  td: ({node, ...props}) => <td className="px-3 py-2 text-sm" {...props}>{props.children}</td>,
                }}
              >
                {comparison.content}
              </ReactMarkdown>
            </article>
          )}

          {/* ===== VERDICT ===== */}
          {comparison.verdict && (
            <div className="rounded-xl border-2 border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20 p-5 md:p-6">
              <h2 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
                🏆 Veredicto Final
              </h2>
              <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {comparison.verdict}
              </p>
            </div>
          )}

          {/* ===== FAQ ===== */}
          {comparison.faq?.length > 0 && (
            <div className="pt-6 md:pt-8 border-t border-zinc-100 dark:border-zinc-800">
              <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-zinc-900 dark:text-white">
                Preguntas Frecuentes
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-3">
                {comparison.faq.map((item: any, index: number) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 md:px-5 py-1 bg-white dark:bg-zinc-950 hover:border-emerald-500/50 transition-all shadow-sm"
                  >
                    <AccordionTrigger className="text-left text-sm md:text-base font-semibold text-zinc-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 hover:no-underline py-3">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-zinc-600 dark:text-zinc-400 pt-1 pb-3 text-sm leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {/* ===== CTA FOOTER ===== */}
          {app1 && app2 && (
            <div className="grid grid-cols-2 gap-3 pt-4">
              {[app1, app2].map((app: any) => (
                <Link
                  key={app._id}
                  href={`/app-tools/${app.slug?.current}`}
                  className="flex items-center gap-2 p-3 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/40 transition-all group"
                >
                  <span className={`w-8 h-8 rounded-md flex items-center justify-center text-white font-bold text-xs shrink-0 ${app.iconBg || 'bg-emerald-500'}`}>
                    {app.appName?.charAt(0)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-zinc-900 dark:text-white truncate block">{app.appName}</span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                      Ver review <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
