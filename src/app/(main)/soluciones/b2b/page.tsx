import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import { ALL_B2B_SOLUTIONS_QUERY, B2BSolution } from "@/lib/b2b-queries"
import { SpotlightCard } from "@/components/ui/spotlight-card"
import { Briefcase, ArrowRight, Stethoscope, Store, Building2, Shield, TrendingUp, Users, Bot, Zap } from "lucide-react"
import Link from "next/link"

// ✅ No cache — cualquier cambio en Sanity se ve de inmediato
export const revalidate = 0

export const metadata: Metadata = {
  title: "Infraestructura Agéntica Modular | Soluciones B2B - Nitro Ecom",
  description: "Ecosistemas digitales automatizados diseñados para tu industria. Captación de leads, agendamiento y velocidad extrema por nicho de mercado.",
  openGraph: {
    title: "Infraestructura Agéntica Modular | Soluciones B2B",
    description: "Ecosistemas digitales automatizados diseñados para tu industria. Captación de leads, agendamiento y velocidad extrema por nicho de mercado.",
  }
}

// Helper: map niche string → icon
const getIconComponent = (niche: string) => {
  const n = (niche || "").toLowerCase();
  if (n.includes('clíni') || n.includes('salud') || n.includes('health')) return <Stethoscope className="w-6 h-6" />;
  if (n.includes('retail') || n.includes('tiend') || n.includes('ecomm')) return <Store className="w-6 h-6" />;
  if (n.includes('inmobi') || n.includes('finca') || n.includes('real')) return <Building2 className="w-6 h-6" />;
  if (n.includes('legal') || n.includes('abogad')) return <Shield className="w-6 h-6" />;
  if (n.includes('coach') || n.includes('educ')) return <TrendingUp className="w-6 h-6" />;
  return <Briefcase className="w-6 h-6" />;
}

// Accent color map tailored for premium aesthetics
const accentStyles: Record<string, { bg: string; text: string; hover: string; spotlight: string; border: string; iconBg: string }> = {
  emerald: { bg: 'bg-emerald-950/20', text: 'text-emerald-400', hover: 'group-hover:text-emerald-300', spotlight: 'rgba(16, 185, 129, 0.15)', border: 'group-hover:border-emerald-500/30', iconBg: 'bg-emerald-500/10' },
  blue:    { bg: 'bg-blue-950/20',    text: 'text-blue-400',    hover: 'group-hover:text-blue-300',    spotlight: 'rgba(59, 130, 246, 0.15)', border: 'group-hover:border-blue-500/30', iconBg: 'bg-blue-500/10' },
  orange:  { bg: 'bg-orange-950/20',  text: 'text-orange-400',  hover: 'group-hover:text-orange-300',  spotlight: 'rgba(249, 115, 22, 0.15)', border: 'group-hover:border-orange-500/30', iconBg: 'bg-orange-500/10' },
  violet:  { bg: 'bg-violet-950/20',  text: 'text-violet-400',  hover: 'group-hover:text-violet-300',  spotlight: 'rgba(139, 92, 246, 0.15)', border: 'group-hover:border-violet-500/30', iconBg: 'bg-violet-500/10' },
  rose:    { bg: 'bg-rose-950/20',    text: 'text-rose-400',    hover: 'group-hover:text-rose-300',    spotlight: 'rgba(244, 63, 94, 0.15)', border: 'group-hover:border-rose-500/30', iconBg: 'bg-rose-500/10' },
  amber:   { bg: 'bg-amber-950/20',   text: 'text-amber-400',   hover: 'group-hover:text-amber-300',   spotlight: 'rgba(245, 158, 11, 0.15)', border: 'group-hover:border-amber-500/30', iconBg: 'bg-amber-500/10' },
  default: { bg: 'bg-zinc-900/50',    text: 'text-zinc-300',    hover: 'group-hover:text-white',       spotlight: 'rgba(255, 255, 255, 0.05)', border: 'group-hover:border-white/20', iconBg: 'bg-white/5' },
}

export default async function B2BHubPage() {
  // Fetch fresh from Sanity — no CDN cache
  const solutions = await client.fetch<B2BSolution[]>(
    ALL_B2B_SOLUTIONS_QUERY,
    {},
    { cache: 'no-store' }
  )

  return (
    <main className="min-h-screen bg-[#030303] text-white selection:bg-teal-500/30 overflow-hidden relative">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-teal-900/15 via-[#030303] to-[#030303] pointer-events-none" />
      <div className="absolute -top-[500px] left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 py-24 relative z-10 max-w-7xl">
        {/* Hero Section */}
        <div className="mb-24 max-w-4xl mx-auto text-center flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-white text-balance leading-tight">
            Infraestructura Agéntica <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-400 to-cyan-400 drop-shadow-sm">
              Modular a Medida
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-light text-balance max-w-3xl mb-12">
            Tu modelo de negocio es único. Por eso, reemplazamos las páginas web convencionales por <strong className="text-zinc-200 font-semibold shadow-emerald-500/10 text-shadow-sm">ecosistemas agénticos de alto rendimiento</strong>. Sistemas autónomos que operan 24/7 para capturar, filtrar y multiplicar tus cierres de ventas.
          </p>

          {/* Connected Flow Element */}
          <div className="flex items-center justify-center text-emerald-500/80">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.15)] relative transform transition-transform hover:scale-110">
                <Users className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
            
            {/* Connection 1 */}
            <div className="w-16 md:w-24 h-[2px] bg-gradient-to-r from-emerald-500/20 via-emerald-400/60 to-emerald-500/20 relative">
               <div className="absolute inset-0 bg-emerald-400 blur-[2px] opacity-30" />
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.15)] transform transition-transform hover:scale-110">
                <Bot className="w-6 h-6 text-emerald-400" />
              </div>
            </div>

            {/* Connection 2 */}
            <div className="w-16 md:w-24 h-[2px] bg-gradient-to-r from-emerald-500/20 via-emerald-400/60 to-emerald-500/20 relative">
               <div className="absolute inset-0 bg-emerald-400 blur-[2px] opacity-30" />
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_25px_rgba(16,185,129,0.15)] transform transition-transform hover:scale-110">
                <Zap className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Solutions Grid */}
        {solutions && solutions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((sol) => {
              const styles = accentStyles[sol.accentColor] || accentStyles.default
              
              // Use the direct link configured in Sanity CMS
              const href = sol.link || "#";
              return (
                <Link key={sol._id} href={href} className="block group h-full">
                  <SpotlightCard
                    spotlightColor={styles.spotlight}
                    className={`h-full flex flex-col bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden transition-all duration-300 ${styles.border} hover:shadow-2xl hover:-translate-y-1`}
                  >
                    {/* Header Image or Gradient Block */}
                    {sol.cardImageUrl ? (
                      <div className="w-full h-56 relative overflow-hidden flex-shrink-0 border-b border-white/5">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={sol.cardImageUrl}
                          alt={sol.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-90" />
                        
                        <div className="absolute top-4 left-4">
                           <div className={`p-3 rounded-2xl backdrop-blur-md bg-[#09090b]/60 border border-white/10 ${styles.text}`}>
                              {getIconComponent(sol.niche)}
                           </div>
                        </div>

                        {sol.isFeatured && (
                          <div className="absolute top-4 right-4 animate-pulse-slow">
                            <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-white text-black rounded-full shadow-lg">
                              Disponible
                            </span>
                          </div>
                        )}
                      </div>
                    ) : (
                      // Fallback Header area
                      <div className={`w-full h-32 relative overflow-hidden flex-shrink-0 border-b border-white/5 ${styles.bg}`}>
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_24px]" />
                        <div className="absolute top-6 left-6 p-3 rounded-2xl bg-[#09090b]/80 border border-white/10 backdrop-blur-sm z-10 shadow-xl">
                          <div className={styles.text}>{getIconComponent(sol.niche)}</div>
                        </div>
                        {sol.isFeatured && (
                          <div className="absolute top-6 right-6">
                            <span className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-white text-black rounded-full shadow-lg">
                              Disponible
                            </span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Card Body */}
                    <div className="p-8 flex flex-col flex-1 relative z-10">
                      {/* Niche Tag */}
                      <span className={`inline-block font-mono tracking-widest text-[11px] font-semibold uppercase mb-4 ${styles.text}`}>
                        {sol.niche}
                      </span>
                      
                      <h3 className={`text-3xl font-bold mb-4 text-zinc-100 transition-colors tracking-tight ${styles.hover}`}>
                        {sol.title}
                      </h3>

                      <p className="text-zinc-400/90 leading-relaxed text-sm flex-1 mb-8 font-medium">
                        {sol.cardDescription}
                      </p>

                      {/* Footer CTA */}
                      <div className={`mt-auto pt-6 flex items-center justify-between border-t border-white/5`}>
                         <span className={`font-semibold text-sm transition-colors ${styles.text}`}>
                           {sol.ctaLabel || "Explorar Solución"}
                         </span>
                         <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${styles.iconBg} group-hover:scale-110 group-hover:bg-white`}>
                           <ArrowRight className={`w-4 h-4 transition-colors ${styles.text} group-hover:text-black`} />
                         </div>
                      </div>
                    </div>
                  </SpotlightCard>
                </Link>
              )
            })}
          </div>
        ) : (
          // Empty state
          <div className="text-center py-32 border border-white/5 rounded-3xl bg-zinc-900/30 backdrop-blur-md">
            <Briefcase className="w-16 h-16 text-zinc-600 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-white mb-3">Preparando Entornos</h3>
            <p className="text-zinc-500 max-w-md mx-auto text-lg">
              Pronto estarán activas nuestras soluciones B2B especializadas por nicho.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}
