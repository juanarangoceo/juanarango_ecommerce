import { Sparkles, Globe, ShoppingCart, Bot, RefreshCw, ArrowDown, Coffee, ArrowRight, Zap } from "lucide-react"

const steps = [
  {
    num: "01",
    icon: Sparkles,
    title: "La Inteligencia Artificial diseña tu tienda",
    desc: "Le describes a la IA qué producto vendes y ella genera una landing page profesional, única y optimizada psicológicamente para vender. Tú solo apruebas el resultado.",
    tags: ["v0.dev", "IA Generativa", "React UI"],
    time: "30 min",
  },
  {
    num: "02",
    icon: Globe,
    title: "Despliegue gratuito en infraestructura Enterprise",
    desc: "Un solo clic y tu tienda está online a nivel global. Usamos la misma infraestructura que las Fortune 500, con hosting gratuito y velocidad de carga instantánea.",
    tags: ["Vercel Edge", "Deploy", "Next.js"],
    time: "20 min",
  },
  {
    num: "03",
    icon: ShoppingCart,
    title: "Recibes pedidos 100% libres de comisiones",
    desc: "Sistema nativo de contraentrega que guarda pedidos automáticamente en tu base de datos cloud. Sin pasarelas usureras, sin porcentaje por venta. Todo tu margen es tuyo.",
    tags: ["Supabase", "Pedidos", "COD"],
    time: "40 min",
  },
  {
    num: "04",
    icon: Bot,
    title: "Un vendedor IA atiende a tus clientes 24/7",
    desc: "Un agente autónomo inteligente que responde dudas técnicas, maneja objeciones y convence a tu cliente en WhatsApp. Él cierra ventas mientras tú duermes o tomas café.",
    tags: ["Gemini AI", "WhatsApp", "Autómata"],
    time: "30 min",
  },
  {
    num: "05",
    icon: RefreshCw,
    title: "Pivoteas radicalmente a coste Cero",
    desc: "¿El producto no vende tras 2 días de prueba? Cambias de producto, la IA regenera todo el contenido y relanzas sin perder dinero en suscripciones. Tu ecosistema es inmortal.",
    tags: ["Pivoteo Ágil", "Zero Cost", "Resiliencia"],
    time: "5 min",
  },
]

export function TechStack() {
  return (
    <section className="py-16 md:py-20 lg:py-28 border-b border-border bg-background">
      <div className="max-w-6xl mx-auto px-5 md:px-6 lg:px-12">
        <div className="font-mono text-[11px] md:text-xs text-primary tracking-[0.25em] uppercase mb-5 md:mb-6 font-bold">
          {'// LA INGENIERÍA DETRÁS DEL MÉTODO'}
        </div>
        <h2 className="font-heading text-[clamp(2.2rem,5vw,5rem)] leading-[0.85] mb-5 md:mb-6 text-balance">
          DE CERO A INFRAESTRUCTURA DE ESCALA<br />
          <span className="text-primary">EN 5 PASOS CON IA.</span>
        </h2>
        <p className="text-foreground/70 text-base md:text-lg max-w-2xl mb-12 md:mb-16 leading-relaxed text-pretty">
          La Inteligencia Artificial hace el 90% del trabajo técnico pesado. Tú solo sigues el paso a paso en video, aplicas el modelo de negocio y controlas las estrategias.
          Asi de fácil. Asi de rápido.
        </p>

        {/* Steps */}
        <div className="relative">
          {/* Vertical line on desktop */}
          <div className="hidden lg:block absolute left-[2.75rem] top-0 bottom-0 w-px bg-border hover:bg-primary/50 transition-colors duration-1000" />

          {steps.map((step, i) => (
            <div key={step.num} className="relative mb-6 md:mb-8 last:mb-0">
              <div className="flex gap-4 md:gap-6 lg:gap-10 items-start group">
                {/* Left: Icon */}
                <div className="shrink-0 flex flex-col items-center relative z-10">
                  <div
                    className={`w-12 h-12 md:w-14 md:h-14 lg:w-[5.5rem] lg:h-[5.5rem] border flex items-center justify-center transition-all duration-300 bg-background ${
                      i === steps.length - 1
                        ? "border-primary bg-primary/[0.08]"
                        : "border-border group-hover:border-primary group-hover:bg-primary/[0.02] shadow-[0_0_0_0_transparent] group-hover:shadow-[0_0_15px_rgba(0,255,157,0.2)]"
                    }`}
                  >
                    <step.icon
                      className={`w-5 h-5 md:w-6 md:h-6 lg:w-8 lg:h-8 transition-colors ${
                        i === steps.length - 1
                          ? "text-primary"
                          : "text-foreground/40 group-hover:text-primary"
                      }`}
                    />
                  </div>
                  {i < steps.length - 1 && (
                    <div className="lg:hidden flex flex-col items-center mt-2 mb-0">
                      <div className="w-px h-6 bg-border group-hover:bg-primary/50 transition-colors" />
                      <ArrowDown className="w-3 h-3 text-border group-hover:text-primary/50 transition-colors" />
                    </div>
                  )}
                </div>

                {/* Right: Content */}
                <div className="flex-1 border border-border bg-card p-5 md:p-6 lg:p-8 group-hover:border-primary/30 transition-all duration-300">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 md:gap-3 mb-3 md:mb-4">
                    <span className="font-mono text-[11px] md:text-xs text-primary tracking-widest uppercase font-bold px-2 py-0.5 border border-primary/30 bg-primary/10">
                      Fase {step.num}
                    </span>
                    <span className="font-mono text-[10px] md:text-xs text-foreground/40 tracking-wider">
                      ~ {step.time} de inversión
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg lg:text-xl font-bold text-foreground mb-2 md:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-foreground/60 text-sm md:text-base leading-relaxed mb-4 md:mb-5">
                    {step.desc}
                  </p>
                  <div className="flex gap-2 flex-wrap mt-auto">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 md:px-3 py-1 border border-border bg-background text-[10px] md:text-[11px] font-mono text-foreground/50 uppercase tracking-wider"
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
          <div className="mt-6 md:mt-8 bg-primary/[0.03] border-l-4 border-l-primary border-y border-r border-y-border border-r-border p-5 md:p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 md:gap-6 hover:bg-primary/[0.05] transition-colors">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Coffee className="w-4 h-4 text-primary" />
                <div className="font-mono text-[11px] md:text-xs text-primary uppercase tracking-widest font-bold">
                  Tiempo total de despliegue estimado
                </div>
              </div>
              <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
                En aproximádamente 3 horas tendrás tu ecosistema comercial validando mercado.
                <span className="text-foreground/50 italic"> Sí, eso incluye tomar café e ir al baño.</span>
              </p>
            </div>
            <div className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary leading-none shrink-0 text-glow">
              ~3h
            </div>
          </div>

          {/* Strategic CTA */}
          <div className="mt-8 md:mt-12 flex justify-center">
            <a
              href="#acceso"
              className="btn-glitch inline-flex items-center justify-center gap-3 bg-destructive text-destructive-foreground font-mono text-xs md:text-sm font-bold uppercase tracking-wider px-8 py-4 md:py-5 shadow-[0_0_30px_rgba(255,45,45,0.2)] hover:shadow-[0_0_50px_rgba(255,45,45,0.4)] transition-shadow w-full md:w-auto"
            >
              <Zap className="w-4 h-4" />
              SÍ, QUIERO APRENDER ESTE MÉTODO
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
