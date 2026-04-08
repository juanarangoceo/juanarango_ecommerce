"use client"

import { useEffect, useRef, useState } from "react"
import { Star, Quote, ArrowRight, Zap } from "lucide-react"

function AnimatedNumber({ prefix = "", value, suffix = "" }: { prefix?: string; value: number; suffix?: string }) {
  const [current, setCurrent] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const ran = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !ran.current) {
          ran.current = true
          const duration = 1600
          const steps = 60
          let step = 0
          const timer = setInterval(() => {
            step++
            const progress = step / steps
            const eased = 1 - Math.pow(1 - progress, 3)
            setCurrent(Math.round(eased * value))
            if (step >= steps) clearInterval(timer)
          }, duration / steps)
        }
      },
      { threshold: 0.6 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value])

  return (
    <div ref={ref} className="font-heading text-4xl md:text-5xl text-primary text-glow tabular-nums">
      {prefix}{current}{suffix}
    </div>
  )
}

const testimonials = [
  {
    name: "Carlos M.",
    role: "Dropshipper",
    country: "🇨🇴 Colombia",
    initials: "CM",
    color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    text: "Monté mi primera tienda de un dispensador de agua en una tarde. Sin saber programar absolutamente nada. La IA hizo la web en React y yo solo modifiqué el copy. Ya llevo 3 tiendas activas validadas a $0 USD de costo inicial.",
    stars: 5,
  },
  {
    name: "Valentina R.",
    role: "Emprendedora",
    country: "🇲🇽 México",
    initials: "VR",
    color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    text: "Estaba pagando el plan de $39 en Shopify más $20 en apps variadas sin vender nada constante. Me estaba desangrando mes a mes. Con Nitro validé 4 productos a coste cero hasta encontrar mi Winner. Eso es no jugar a la defensiva.",
    stars: 5,
  },
  {
    name: "Andrés P.",
    role: "Ecom Seller",
    country: "🇪🇸 España",
    initials: "AP",
    color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    text: "Lo que más me voló la cabeza es la velocidad. Al estar deployado en Vercel Edge, mi tienda carga en literal 0.6 segundos en mobile. Mis métricas de conversión subieron un 43% frente a mi antigua tienda en Shopify porque la gente ya no se va esperando a que cargue.",
    stars: 5,
  },
]

export function SocialProof() {
  return (
    <section className="py-16 md:py-20 lg:py-28 border-b border-border bg-card">
      <div className="max-w-6xl mx-auto px-5 md:px-6 lg:px-12">
        <div className="font-mono text-[11px] md:text-xs text-primary tracking-[0.25em] uppercase mb-5 md:mb-6 text-center font-bold">
          {'// LO QUE DICEN NUESTROS ALUMNOS'}
        </div>
        <h2 className="font-heading text-[clamp(2.2rem,5vw,5rem)] leading-[0.85] mb-12 md:mb-16 text-center text-balance">
          RESULTADOS MEDIBLES<br />
          <span className="text-primary text-glow">DE OPERADORES REALES.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-background/80 p-6 md:p-8 lg:p-10 flex flex-col hover:bg-card transition-colors relative group">
              <Quote className="absolute top-6 right-6 w-12 h-12 text-foreground/[0.03] group-hover:text-primary/[0.05] transition-colors pointer-events-none" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-5 md:mb-6">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-primary fill-primary drop-shadow-[0_0_8px_rgba(0,255,157,0.5)]" />
                ))}
              </div>

              <p className="text-foreground/80 text-sm md:text-base leading-relaxed mb-8 md:mb-10 flex-1 font-medium">
                {'"'}{t.text}{'"'}
              </p>

              <div className="border-t border-border/50 pt-5 mt-auto flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-heading text-lg border ${t.color}`}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-bold text-sm md:text-base text-foreground flex items-center gap-2">
                    {t.name}
                  </div>
                  <div className="font-mono text-[10px] md:text-[11px] text-foreground/50 uppercase tracking-wider mt-1 flex items-center gap-2">
                    <span>{t.role}</span>
                    <span className="w-1 h-1 rounded-full bg-border" />
                    <span>{t.country}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stats layout optimized for trust */}
        <div className="mt-8 md:mt-12 bg-primary/[0.02] border border-primary/10 p-6 md:p-8 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 text-center">
          <div>
            <AnimatedNumber prefix="+" value={250} />
            <div className="font-mono text-[10px] md:text-[11px] text-foreground/50 uppercase tracking-wider mt-2 font-bold">Alumnos implementando</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-border relative">
             <div className="absolute top-1/2 -mt-1 -ml-1 w-2 h-2 rounded-full bg-primary/20" />
          </div>
          <div>
            <div className="font-heading text-4xl md:text-5xl text-primary text-glow">4.9/5</div>
            <div className="font-mono text-[10px] md:text-[11px] text-foreground/50 uppercase tracking-wider mt-2 font-bold">Satisfacción de comunidad</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-border relative">
             <div className="absolute top-1/2 -mt-1 -ml-1 w-2 h-2 rounded-full bg-primary/20" />
          </div>
          <div>
            <AnimatedNumber prefix="+" value={700} />
            <div className="font-mono text-[10px] md:text-[11px] text-foreground/50 uppercase tracking-wider mt-2 font-bold">Tiendas deployadas</div>
          </div>
        </div>

        {/* Strategic CTA */}
        <div className="mt-8 md:mt-12 flex justify-center">
          <a
            href="#acceso"
            className="btn-glitch inline-flex items-center justify-center gap-3 bg-destructive text-destructive-foreground font-mono text-xs md:text-sm font-bold uppercase tracking-wider px-8 py-4 md:py-5 shadow-[0_0_30px_rgba(255,45,45,0.2)] hover:shadow-[0_0_50px_rgba(255,45,45,0.4)] transition-shadow w-full md:w-auto"
          >
            <Zap className="w-4 h-4" />
            QUIERO SER EL PRÓXIMO CASO DE ÉXITO
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
