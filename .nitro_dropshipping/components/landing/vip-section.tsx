import { MessageCircle, TrendingUp, Shield, Users, Sparkles } from "lucide-react"

const benefits = [
  {
    icon: TrendingUp,
    title: "Productos ganadores de la semana",
    desc: "Datos reales de miembros activos. Entras con ventaja antes de invertir en publicidad.",
  },
  {
    icon: Shield,
    title: "Lista negra de proveedores",
    desc: "Evita estafas y retrasos. Solo proveedores verificados por la comunidad.",
  },
  {
    icon: MessageCircle,
    title: "Soporte tecnico directo",
    desc: "Algo fallo? Alguien que ya lo resolvio te ayuda hoy mismo. Sin tickets, sin esperas.",
  },
  {
    icon: Users,
    title: "Networking con otros sellers",
    desc: "Conecta con personas en tu mismo camino. Comparte estrategias, alianzas y aprendizajes.",
  },
]

export function VIPSection() {
  return (
    <section className="py-16 md:py-20 lg:py-28 border-b border-border relative overflow-hidden">
      <div className="absolute -right-20 bottom-0 text-[20vw] md:text-[25vw] font-heading leading-none text-foreground/[0.02] pointer-events-none select-none">
        VIP
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-10 md:mb-12">
          <div className="lg:col-span-2">
            <div className="font-mono text-[11px] md:text-xs text-primary tracking-[0.25em] uppercase mb-5 md:mb-6">
              {'// COMUNIDAD VIP'}
            </div>
            <h2 className="font-heading text-[clamp(2.2rem,5vw,5rem)] leading-[0.85] mb-5 md:mb-6 text-balance">
              NO SOLO APRENDES.<br />
              <span className="text-primary">CRECES CON OTROS.</span>
            </h2>
            <p className="text-foreground/70 text-base md:text-lg max-w-xl leading-relaxed">
              El curso te da el metodo. La comunidad VIP te da soporte real, datos actualizados
              y la motivacion para seguir cuando las cosas se ponen dificiles. Incluida gratis con tu compra.
            </p>
          </div>

          {/* Video */}
          <div className="video-frame-glitch aspect-[9/16] max-h-[340px] lg:max-h-[400px] bg-nitro-dark flex flex-col items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary/30 mb-3" />
            <span className="font-mono text-[10px] text-foreground/25 uppercase tracking-widest">Comunidad</span>
            <span className="font-mono text-[10px] text-foreground/15 mt-1">Video</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border mb-8 md:mb-12">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="bg-background p-6 md:p-8 lg:p-10 group hover:bg-card transition-colors"
            >
              <div className="w-10 h-10 border border-primary/30 flex items-center justify-center mb-5 md:mb-6 group-hover:border-primary group-hover:bg-primary/5 transition-colors">
                <b.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-base md:text-lg text-foreground mb-2 md:mb-3">{b.title}</h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border p-5 md:p-8 lg:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-primary pulse-dot shrink-0" />
            <div>
              <div className="text-foreground font-bold text-sm md:text-base mb-1">
                Grupo VIP en Telegram — Incluido gratis
              </div>
              <div className="text-foreground/50 text-xs md:text-sm">
                Acceso inmediato al comprar el curso. Comunidad activa 24/7.
              </div>
            </div>
          </div>
          <div className="shrink-0 w-full md:w-auto">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-[10px] md:text-xs text-foreground/40 uppercase tracking-wider">
                Capacidad
              </span>
              <span className="font-mono text-[10px] md:text-xs text-primary font-bold">71% ocupado</span>
            </div>
            <div className="w-full md:w-48 h-1.5 bg-secondary overflow-hidden">
              <div className="h-full bg-primary w-[71%]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
