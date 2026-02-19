import { Metadata } from "next"
import { notFound } from "next/navigation"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { client } from "@/sanity/lib/client"
import { ChevronDown, ExternalLink, ArrowRight } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { StarRating } from "@/components/app-tools/star-rating"

export const revalidate = 86400

// GROQ Queries
const COMPARISON_BY_SLUG_QUERY = `*[_type == "appComparison" && slug.current == $slug && !(_id in path("drafts.**"))][0]{
  _id,
  title,
  slug,
  metaDescription,
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

// Generate static params for ISR
export async function generateStaticParams() {
  const comparisons = await client.fetch(ALL_COMPARISONS_QUERY)
  return (comparisons || []).map((c: any) => ({ slug: c.slug }))
}

// Dynamic Metadata
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

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const comparison = await client.fetch(COMPARISON_BY_SLUG_QUERY, { slug })

  if (!comparison) notFound()

  const { app1, app2 } = comparison

  // Schema.org Markup
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: comparison.title,
        description: comparison.metaDescription,
        url: `https://www.juanarangoecommerce.com/comparar/${comparison.slug?.current}`,
        datePublished: comparison.publishedAt,
        author: {
          "@type": "Person",
          name: "Juan Arango",
        },
      },
      ...(comparison.faq?.length > 0 ? [{
        "@type": "FAQPage",
        mainEntity: comparison.faq.map((item: any) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }] : []),
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-white dark:bg-zinc-950 min-h-screen">
        {/* Hero Section */}
        <header className="container mx-auto px-4 pt-32 pb-12 max-w-5xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-6">
            <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              Inicio
            </Link>
            <span>/</span>
            <Link href="/app-tools" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
              App Tools
            </Link>
            <span>/</span>
            <span className="text-zinc-900 dark:text-zinc-100">Comparar</span>
          </nav>

          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-8 leading-[1.1]">
            {comparison.title}
          </h1>

          {/* VS Cards */}
          {app1 && app2 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[app1, app2].map((app: any, i: number) => (
                <Link
                  key={app._id}
                  href={`/app-tools/${app.slug?.current}`}
                  className="group flex flex-col rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-6 transition-all hover:border-emerald-500/40 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg ${app.iconBg || 'bg-emerald-500'}`}>
                      {app.appName?.charAt(0)}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      app.pricing === 'Free' ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300' :
                      app.pricing === 'Freemium' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300' :
                      'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
                    }`}>
                      {app.pricing}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {app.appName}
                  </h2>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">{app.description}</p>
                  <div className="mt-3 flex items-center justify-between">
                    {app.rating && <StarRating rating={app.rating} />}
                    {app.priceDetail && (
                      <span className="text-xs font-medium text-zinc-500">{app.priceDetail}</span>
                    )}
                  </div>
                  <span className="mt-4 text-xs text-emerald-600 dark:text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                    Ver detalle <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Main Content */}
        <div className="container mx-auto px-4 pb-12 md:pb-24 max-w-5xl">
          {/* Comparison Table */}
          {comparison.comparisonTable && comparison.comparisonTable.length > 0 && (
            <div className="mb-12 overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-zinc-100 dark:bg-zinc-900">
                    <th className="text-left px-4 py-3 font-semibold text-zinc-700 dark:text-zinc-300">Característica</th>
                    <th className="text-left px-4 py-3 font-semibold text-emerald-700 dark:text-emerald-400">{app1?.appName}</th>
                    <th className="text-left px-4 py-3 font-semibold text-blue-700 dark:text-blue-400">{app2?.appName}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
                  {comparison.comparisonTable.map((row: any, i: number) => (
                    <tr key={i} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-zinc-900 dark:text-zinc-100">{row.feature}</td>
                      <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{row.app1Value}</td>
                      <td className="px-4 py-3 text-zinc-700 dark:text-zinc-300">{row.app2Value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Markdown Content */}
          {comparison.content && (
            <article className="prose prose-zinc dark:prose-invert prose-lg max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-4 prose-h2:border-b prose-h2:border-zinc-100 dark:prose-h2:border-zinc-900
              prose-p:leading-relaxed prose-p:text-zinc-600 dark:prose-p:text-zinc-300
              prose-strong:text-zinc-900 dark:prose-strong:text-white
              prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-zinc-50 dark:prose-blockquote:bg-zinc-900 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
              prose-ul:list-disc prose-ul:pl-6
              prose-li:marker:text-emerald-500
            ">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({node, ...props}) => {
                    const text = String(props.children);
                    const id = slugify(text);
                    return <h2 id={id} className="text-3xl font-bold mt-12 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-800" {...props}>{props.children}</h2>;
                  },
                  h2: ({node, ...props}) => {
                    const text = String(props.children);
                    const id = slugify(text);
                    return <h2 id={id} className="text-3xl font-bold mt-12 mb-6 pb-2 border-b border-zinc-200 dark:border-zinc-800" {...props}>{props.children}</h2>;
                  },
                  h3: ({node, ...props}) => {
                    const text = String(props.children);
                    const id = slugify(text);
                    return <h3 id={id} className="text-2xl font-bold mt-8 mb-4" {...props}>{props.children}</h3>;
                  },
                  table: ({node, ...props}) => (
                    <div className="overflow-x-auto my-8 rounded-lg border border-zinc-200 dark:border-zinc-800">
                      <table className="w-full text-left text-sm" {...props}>{props.children}</table>
                    </div>
                  ),
                  thead: ({node, ...props}) => (
                    <thead className="bg-zinc-100 dark:bg-zinc-900 font-semibold" {...props}>{props.children}</thead>
                  ),
                  tbody: ({node, ...props}) => (
                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800" {...props}>{props.children}</tbody>
                  ),
                  th: ({node, ...props}) => <th className="px-4 py-3" {...props}>{props.children}</th>,
                  td: ({node, ...props}) => <td className="px-4 py-3" {...props}>{props.children}</td>,
                }}
              >
                {comparison.content}
              </ReactMarkdown>
            </article>
          )}

          {/* Verdict Section */}
          {comparison.verdict && (
            <div className="mt-12 rounded-xl border-2 border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/20 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4 flex items-center gap-2">
                🏆 Veredicto Final
              </h2>
              <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {comparison.verdict}
              </p>
            </div>
          )}

          {/* FAQ Section */}
          {comparison.faq && comparison.faq.length > 0 && (
            <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t border-zinc-100 dark:border-zinc-800">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-zinc-900 dark:text-white">
                Preguntas Frecuentes
              </h2>
              <Accordion type="single" collapsible className="w-full space-y-4">
                {comparison.faq.map((item: any, index: number) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-zinc-200 dark:border-zinc-800 rounded-lg px-6 py-2 bg-white dark:bg-zinc-950 hover:border-emerald-500/50 transition-all duration-200 shadow-sm hover:shadow-md"
                  >
                    <AccordionTrigger className="text-left text-base md:text-lg font-semibold text-zinc-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 hover:no-underline py-4">
                      <span className="flex items-start gap-3">
                        <ChevronDown className="w-5 h-5 shrink-0 transition-transform duration-200 mt-0.5" />
                        <span className="flex-1">{item.question}</span>
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-zinc-600 dark:text-zinc-400 pt-2 pb-4 text-sm md:text-base leading-relaxed pl-8">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          )}

          {/* CTA: Links to Both Apps */}
          {app1 && app2 && (
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[app1, app2].map((app: any) => (
                <div key={app._id} className="flex flex-col gap-3 rounded-lg border border-zinc-200 dark:border-zinc-800 p-4">
                  <span className="font-semibold text-zinc-900 dark:text-white">{app.appName}</span>
                  <div className="flex gap-2 flex-wrap">
                    <Link
                      href={`/app-tools/${app.slug?.current}`}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
                    >
                      Ver Review <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    {(app.affiliateUrl || app.websiteUrl) && (
                      <a
                        href={app.affiliateUrl || app.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-4 py-2 rounded-lg bg-emerald-600 text-sm font-medium text-white hover:bg-emerald-700 transition-colors"
                      >
                        Visitar <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
