import { Sparkles, Globe, ShoppingCart, Bot, RefreshCw, ArrowDown, Coffee } from "lucide-react"

const steps = [
  {
    num: "01",
    icon: Sparkles,
    title: "La IA disena tu tienda",
    desc: "Le dices a la IA que producto vendes y ella genera una landing page profesional, unica y optimizada para vender. Tu solo apruebas el resultado.",
    tags: ["v0.dev", "IA Generativa", "React"],
    time: "30 min",
  },
  {
    num: "02",
    icon: Globe,
    title: "Publicas gratis con tu dominio",
    desc: "Un click y tu tienda esta en internet. Con dominio personalizado, hosting gratuito y velocidad de carga instantanea. Sin configuraciones tecnicas.",
    tags: ["Vercel", "Deploy", "Dominio"],
    time: "20 min",
  },
  {
    num: "03",
    icon: ShoppingCart,
    title: "Recibes pedidos sin comision",
    desc: "Sistema de contraentrega que guarda pedidos automaticamente. Sin pasarelas costosas, sin porcentaje por venta. Lo que vendes es 100% tuyo.",
    tags: ["Supabase", "Pedidos", "COD"],
    time: "40 min",
  },
  {
    num: "04",
    icon: Bot,
    title: "Un vendedor IA trabaja por ti 24/7",
    desc: "Un chatbot inteligente que responde dudas, maneja objeciones y convence a tu cliente. El cierra ventas mientras tu duermes o tomas cafe.",
    tags: ["Gemini", "WhatsApp", "Chatbot"],
    time: "30 min",
  },
  {
    num: "05",
    icon: RefreshCw,
    title: "Si no vende, pivoteas en 5 minutos",
    desc: "Cambias de producto, la IA regenera el contenido y relanzas sin perder nada. Tu infraestructura sobrevive a cualquier producto.",
    tags: ["Pivoteo", "Zero Cost", "Rapido"],
    time: "5 min",
  },
]

export function TechStack() {
  return (
    <section className="py-16 md:py-20 lg:py-28 border-b border-border bg-card">
      <div className="max-w-6xl mx-auto px-5 md:px-6 lg:px-12">
        <div className="font-mono text-[11px] md:text-xs text-primary tracking-[0.25em] uppercase mb-5 md:mb-6">
          {'// EL METODO NITRO — PASO A PASO'}
        </div>
        <h2 className="font-heading text-[clamp(2.2rem,5vw,5rem)] leading-[0.85] mb-5 md:mb-6 text-balance">
          DE CERO A TIENDA ONLINE<br />
          <span className="text-primary">EN 5 PASOS SIMPLES.</span>
        </h2>
        <p className="text-foreground/70 text-base md:text-lg max-w-2xl mb-12 md:mb-16 leading-relaxed">
          La IA hace el trabajo pesado. Tu solo sigues el paso a paso en video y apruebas el resultado.
          Asi de facil. Asi de rapido.
        </p>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line on desktop */}
          <div className="hidden lg:block absolute left-[2.75rem] top-0 bottom-0 w-px bg-border" />

          {steps.map((step, i) => (
            <div key={step.num} className="relative mb-6 md:mb-8 last:mb-0">
              <div className="flex gap-4 md:gap-6 lg:gap-10 items-start group">
                {/* Left: Icon */}
                <div className="shrink-0 flex flex-col items-center relative z-10">
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 lg:w-[5.5rem] lg:h-[5.5rem] border-2 flex items-center justify-center transition-colors bg-card ${
                      i === steps.length - 1
                        ? "border-primary bg-primary/10"
                        : "border-border group-hover:border-primary/50"
                    }`}
                  >
                    <step.icon
                      className={`w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 transition-colors ${
                        i === steps.length - 1
                          ? "text-primary"
                          : "text-foreground/50 group-hover:text-primary"
                      }`}
                    />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="lg:hidden flex flex-col items-center mt-2 mb-0">
                      <div className="w-px h-6 bg-primary/20" />
                      <ArrowDown className="w-3 h-3 text-primary/30" />
                    </div>
                  )}
                </div>

                {/* Right: Content */}
                <div className="flex-1 border border-border bg-background p-5 md:p-6 lg:p-8 group-hover:border-primary/20 transition-colors">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <span className="font-mono text-[11px] md:text-xs text-primary tracking-widest uppercase font-bold">
                      Paso {step.num}
                    </span>
                    <span className="font-mono text-[10px] md:text-xs text-foreground/40 tracking-wider">
                      ~ {step.time}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-foreground mb-2 md:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-foreground/60 text-sm md:text-base leading-relaxed mb-4 md:mb-5">
                    {step.desc}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 md:px-3 py-1 border border-border text-[10px] md:text-[11px] font-mono text-foreground/50 uppercase tracking-wider"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Bottom summary */}
          <div className="mt-6 md:mt-8 bg-primary/5 border border-primary/20 p-5 md:p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Coffee className="w-4 h-4 text-primary" />
                <div className="font-mono text-[11px] md:text-xs text-primary uppercase tracking-widest font-bold">
                  Tiempo total estimado
                </div>
              </div>
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed">
                En unas 3 horas tendras tu tienda funcionando y recibiendo pedidos.
                <span className="text-foreground/50 italic"> Si, tomando cafe y haciendo pausas.</span>
              </p>
            </div>
            <div className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary leading-none shrink-0">
              ~3h
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
