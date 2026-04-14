import { Metadata } from "next"
import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/client"
import { B2B_ALL_SLUGS_QUERY, B2B_SOLUTION_BY_SLUG_QUERY, B2BSolution } from "@/lib/b2b-queries"
import { ContactForm } from "@/components/ui/contact-form"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, Zap, Smartphone, CalendarClock, Globe, Shield, TrendingUp, Users, Target, Activity } from "lucide-react"

// Types
type Props = {
  params: Promise<{ slug: string }>
}

// SSG Paths
export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(B2B_ALL_SLUGS_QUERY)
  return slugs.map((item) => ({ slug: item.slug }))
}

// Meta
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const solution = await client.fetch<B2BSolution | null>(B2B_SOLUTION_BY_SLUG_QUERY, { slug })

  if (!solution) {
    return { title: 'No Encontrado | Nitro B2B' }
  }

  return {
    title: solution.metaTitle || `${solution.title} | Solución B2B Nitro`,
    description: solution.metaDescription || solution.heroSubtitle || solution.targetAudience,
  }
}

// Helpers
const getFeatureIcon = (iconName: string) => {
  const n = (iconName || "").toLowerCase();
  if (n.includes('zap') || n.includes('velocidad')) return <Zap className="w-6 h-6" />;
  if (n.includes('smart') || n.includes('movil')) return <Smartphone className="w-6 h-6" />;
  if (n.includes('calendar') || n.includes('agend')) return <CalendarClock className="w-6 h-6" />;
  if (n.includes('globe') || n.includes('red')) return <Globe className="w-6 h-6" />;
  if (n.includes('shield') || n.includes('segur')) return <Shield className="w-6 h-6" />;
  if (n.includes('trend') || n.includes('ventas')) return <TrendingUp className="w-6 h-6" />;
  if (n.includes('user') || n.includes('leads')) return <Users className="w-6 h-6" />;
  if (n.includes('target') || n.includes('objetiv')) return <Target className="w-6 h-6" />;
  if (n.includes('activity') || n.includes('salud')) return <Activity className="w-6 h-6" />;
  return <CheckCircle2 className="w-6 h-6" />;
}

export default async function B2BSolutionPage({ params }: Props) {
  const { slug } = await params;
  const sol = await client.fetch<B2BSolution | null>(B2B_SOLUTION_BY_SLUG_QUERY, { slug })

  if (!sol) {
    notFound()
  }

  // Same colors
  const accentColors = {
    emerald: 'text-emerald-400',
    blue: 'text-blue-400',
    orange: 'text-orange-400',
    violet: 'text-violet-400',
    rose: 'text-rose-400',
    amber: 'text-amber-400',
    default: 'text-teal-400'
  }
  const colorClass = accentColors[sol.accentColor as keyof typeof accentColors] || accentColors.default;

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-teal-500/30 pb-20">
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/10 via-[#050505] to-[#050505] pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <Link href="/soluciones/b2b" className="inline-flex items-center text-sm text-zinc-400 hover:text-white transition-colors mb-8">
              <ArrowLeft className="w-4 h-4 mr-2" /> Todas las Soluciones
            </Link>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-sm font-medium mb-6">
              <span>Solución Especializada:</span>
              <span className={`font-bold ${colorClass}`}>{sol.niche}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-white text-balance leading-tight">
              {sol.heroTitle || sol.title}
            </h1>
            
            <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
              {sol.heroSubtitle}
            </p>

            <a href="#contacto" className="bg-white text-black hover:bg-zinc-200 font-bold py-3 px-8 rounded-full transition-all inline-block">
              Solicitar Demostración
            </a>
          </div>
        </div>
      </section>

      {/* 2. Page Image (optional) */}
      {sol.pageImageUrl && (
         <section className="py-12">
            <div className="container mx-auto px-6">
               <div className="rounded-2xl overflow-hidden border border-white/10 relative w-full h-[50vh] md:h-[70vh]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={sol.pageImageUrl} alt={sol.heroTitle || sol.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-80" />
               </div>
            </div>
         </section>
      )}

      {/* 3. Features (What you get) */}
      {sol.whatYouGet && sol.whatYouGet.length > 0 && (
        <section className="py-20 bg-zinc-950/50">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16">Infraestructura Incluida</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {sol.whatYouGet.map((feature, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 relative overflow-hidden group hover:border-white/20 transition-all">
                  <div className={`mb-4 transition-transform group-hover:scale-110 ${colorClass}`}>
                    {getFeatureIcon(feature.icon)}
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Target Audience */}
      {sol.targetAudience && (
         <section className="py-20 border-y border-white/5">
            <div className="container mx-auto px-6 max-w-4xl text-center">
               <span className={`font-mono text-sm uppercase tracking-widest mb-4 block ${colorClass}`}>¿Para Quién Es Esta Solución?</span>
               <h2 className="text-2xl md:text-4xl font-bold mb-8 leading-tight text-balance">Potenciamos empresas que buscan escalar a través de automatización real.</h2>
               <p className="text-xl text-zinc-400 leading-relaxed mx-auto">
                  {sol.targetAudience}
               </p>
            </div>
         </section>
      )}

      {/* 5. Contact Section */}
      <section id="contacto" className="py-24">
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Hablemos sobre tu infraestructura</h2>
            <p className="text-zinc-400">Déjanos tus datos y te mostraremos cómo implementar <strong className="text-white">{sol.title}</strong> en tu negocio.</p>
          </div>
          <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-3xl">
             <ContactForm />
          </div>
        </div>
      </section>

    </main>
  )
}
