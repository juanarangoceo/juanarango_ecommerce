import { MessageCircle, Lightbulb, Code2, Users, Sparkles, Send } from "lucide-react"

const benefits = [
  {
    icon: Lightbulb,
    title: "Prompts y flujos de IA listos para usar",
    desc: "Prompts probados para v0.dev, Cursor y ChatGPT que generan landing pages, textos de ventas y automatizaciones en segundos. Copias, pegas y ejecutas.",
  },
  {
    icon: Code2,
    title: "Ideas y proyectos de la comunidad",
    desc: "Miembros comparten experimentos reales, tiendas nuevas y automatizaciones en construcción. Aprendes observando lo que otros construyen desde cero.",
  },
  {
    icon: MessageCircle,
    title: "Instrucciones técnicas paso a paso",
    desc: "¿Algo no funcionó en tu deploy? ¿La IA generó código con errores? Alguien del grupo ya pasó por eso y comparte la solución exacta en texto.",
  },
  {
    icon: Users,
    title: "Red de builders en crecimiento",
    desc: "Networking real de personas construyendo activamente negocios digitales con IA. Comparte avances, recibe feedback, colabóra. La red se construye juntos.",
  },
]

export function VIPSection() {
  return (
    <section className="py-16 md:py-20 lg:py-28 border-b border-border relative overflow-hidden bg-background">
      {/* Background massive text */}
      <div className="absolute -right-20 bottom-10 text-[20vw] md:text-[25vw] font-heading leading-none text-foreground/[0.02] pointer-events-none select-none">
        VIP
      </div>

      <div className="max-w-6xl mx-auto px-5 md:px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-10 md:mb-12">
          <div className="lg:col-span-2">
            <div className="font-mono text-[11px] md:text-xs text-primary tracking-[0.25em] uppercase mb-5 md:mb-6 font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              {'// LA VENTAJA COLECTIVA'}
            </div>
            <h2 className="font-heading text-[clamp(2.2rem,5vw,5rem)] leading-[0.85] mb-5 md:mb-6 text-balance">
              NO SOLO APRENDES.<br />
              <span className="text-primary text-glow">CONSTRUYES CON OTROS.</span>
            </h2>
            <p className="text-foreground/70 text-base md:text-lg max-w-xl leading-relaxed">
              El curso te da el método. El grupo VIP te da la inteligencia colectiva: prompts probados,
              proyectos en vivo, instrucciones técnicas y la red de personas que están construyendo lo mismo que tú.{" "}
              <strong className="text-foreground">Acceso inmediato con tu inscripción.</strong>
            </p>
          </div>

          {/* Telegram visual */}
          <div className="video-frame-glitch w-full bg-secondary/20 flex flex-col items-center justify-center relative overflow-hidden border border-border p-8" style={{ aspectRatio: '9/16', maxHeight: '420px' }}>
            <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(0,255,157,0.05)_25%,transparent_25%,transparent_50%,rgba(0,255,157,0.05)_50%,rgba(0,255,157,0.05)_75%,transparent_75%,transparent)] bg-[length:24px_24px] pointer-events-none opacity-20" />
            <div className="relative z-10 flex flex-col items-center">
              <Send className="w-10 h-10 text-primary/50 mb-4 drop-shadow-[0_0_10px_rgba(0,255,157,0.5)]" />
              <span className="font-heading text-2xl text-foreground/40 uppercase tracking-widest">Trincheras</span>
              <span className="font-heading text-lg text-foreground/30 uppercase tracking-widest">Nitro</span>
              <span className="font-mono text-[10px] text-foreground/30 mt-3 tracking-widest border border-border px-3 py-1 bg-background/50">
                TELEGRAM PRIVADO
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-border border border-border mb-8 md:mb-12">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="bg-background/80 p-6 md:p-8 lg:p-10 group hover:bg-card transition-colors relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle_at_top_right,rgba(0,255,157,0.05),transparent)] pointer-events-none" />
              <div className="w-10 h-10 border border-primary/30 flex items-center justify-center mb-5 md:mb-6 group-hover:border-primary group-hover:bg-primary/10 transition-colors">
                <b.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-bold text-base md:text-lg text-foreground mb-2 md:mb-3">{b.title}</h3>
              <p className="text-foreground/60 text-sm md:text-base leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom bar — simple, no capacity meter */}
        <div className="bg-card border border-border p-5 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 hover:border-primary/30 transition-colors group">
          <div className="w-12 h-12 flex items-center justify-center border border-primary/20 bg-primary/5 shrink-0">
            <div className="w-3 h-3 bg-primary pulse-dot" />
          </div>
          <div>
            <div className="text-foreground font-bold text-sm md:text-base mb-1 group-hover:text-primary transition-colors">
              Trincheras Nitro — Grupo VIP Telegram
            </div>
            <div className="text-foreground/60 text-xs md:text-sm font-medium">
              Acceso sin costo adicional al inscribirte. Prompts, proyectos e instrucciones compartidos por la comunidad activa todos los días.
            </div>
          </div>
          <div className="shrink-0 sm:ml-auto">
            <span className="flex items-center gap-2 font-mono text-[10px] md:text-xs uppercase tracking-wider text-primary font-bold border border-primary/20 px-3 py-2 bg-primary/5">
              <Sparkles className="w-3 h-3" />
              Acceso Inmediato
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
