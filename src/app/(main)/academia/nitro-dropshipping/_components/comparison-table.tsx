"use client"

import { useEffect, useRef, useState } from "react"
import { Check, X } from "lucide-react"

const rows = [
  { label: "Costo mensual", old: "$39+ USD / mes", nitro: "$0 / mes", highlight: false },
  { label: "Apps y extensiones", old: "$15 - $80 USD / mes", nitro: "Incluidas en el stack base", highlight: false },
  { label: "Comisión por venta", old: "0.5% - 2% directo", nitro: "0% — todo tu margen queda intacto", highlight: false },
  { label: "Velocidad de carga", old: "2 - 4 segundos", nitro: "Menos de 1 segundo (Vercel Edge)", highlight: false },
  { label: "Personalización", old: "Plantillas limitadas y quemadas", nitro: "IA genera diseños únicos", highlight: false },
  { label: "Conocimiento técnico", old: "Medio - Alto (Liquid, CSS)", nitro: "Cero. La IA escribe el código.", highlight: false },
  { label: "Si el producto fracasa", old: "Sigues pagando mensualidad", nitro: "No pagas nada. Pivoteas al instante.", highlight: true },
]

// Stat numbers for the animated counter showcase
const stats = [
  { prefix: "+", value: 43, suffix: "%", label: "Más conversiones en promedio vs tiendas en Shopify" },
  { prefix: "$", value: 0, suffix: "/mes", label: "Costo de infraestructura al empezar" },
  { prefix: "", value: 3, suffix: "h", label: "Para tener tu ecosistema online desde cero" },
]

function AnimatedNumber({ target, prefix = "", suffix = "" }: { target: number; prefix?: string; suffix?: string }) {
  const [current, setCurrent] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const ran = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !ran.current) {
          ran.current = true
          if (target === 0) { setCurrent(0); return }
          const duration = 1400
          const steps = 50
          const increment = target / steps
          let step = 0
          const timer = setInterval(() => {
            step++
            setCurrent((prev) => {
              const next = Math.round(increment * step)
              return next >= target ? target : next
            })
            if (step >= steps) clearInterval(timer)
          }, duration / steps)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [target])

  return (
    <div ref={ref} className="font-heading text-5xl md:text-6xl lg:text-7xl text-primary leading-none text-glow tabular-nums">
      {prefix}{current}{suffix}
    </div>
  )
}

export function ComparisonTable() {
  return (
    <section className="py-16 md:py-20 lg:py-28 border-b border-border bg-card">
      <div className="max-w-6xl mx-auto px-5 md:px-6 lg:px-12">
        <div className="font-mono text-[11px] md:text-xs text-primary tracking-[0.25em] uppercase mb-5 md:mb-6 font-bold">
          {'// COMPARATIVA REAL E IMPARCIAL'}
        </div>
        <h2 className="font-heading text-[clamp(2.2rem,5vw,5rem)] leading-[0.85] mb-5 md:mb-6 text-balance">
          RESULTADOS SUPERIORES.<br />
          <span className="text-primary">CON MENOS COSTOS DE OPERACIÓN.</span>
        </h2>
        <p className="text-foreground/70 text-base md:text-lg max-w-2xl mb-10 md:mb-14 leading-relaxed">
          Con el método Nitro no solo ahorras dinero: construyes una tienda más rápida, más personalizada
          y diseñada psicológicamente para convertir mejor desde el día uno.
        </p>

        {/* Animated Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border border border-border mb-10 md:mb-14">
          {stats.map((s) => (
            <div key={s.label} className="bg-background/80 p-6 md:p-8 lg:p-10 hover:bg-card transition-colors">
              <AnimatedNumber target={s.value} prefix={s.prefix} suffix={s.suffix} />
              <p className="text-foreground/60 text-xs md:text-sm leading-relaxed mt-3 font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Mobile cards */}
        <div className="md:hidden space-y-3">
          {rows.map((row) => (
            <div
              key={row.label}
              className={`border p-4 ${row.highlight ? "border-primary/40 bg-primary/[0.05]" : "border-border bg-background/50"}`}
            >
              <div className={`font-bold text-sm mb-4 ${row.highlight ? "text-primary text-glow" : "text-foreground"}`}>{row.label}</div>
              <div className="flex flex-col gap-4">
                <div className="flex-1 bg-destructive/[0.03] p-3 border border-destructive/10">
                  <div className="font-mono text-[10px] text-destructive/80 uppercase tracking-widest mb-1.5 flex items-center gap-1.5 font-bold">
                    <X className="w-3 h-3" /> Tradicional
                  </div>
                  <div className="font-mono text-xs text-foreground/60">{row.old}</div>
                </div>
                <div className="flex-1 bg-primary/[0.05] p-3 border border-primary/20">
                  <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-1.5 flex items-center gap-1.5 font-bold">
                    <Check className="w-3 h-3" /> Nitro
                  </div>
                  <div className="font-mono text-xs text-primary font-bold">{row.nitro}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto rounded-none border border-border">
          <table className="w-full border-collapse text-left bg-background/50">
            <thead>
              <tr className="border-b-2 border-border bg-card">
                <th className="py-5 px-6 font-mono text-xs uppercase tracking-widest text-foreground/50 w-[40%] font-bold">
                  Característica Evaluada
                </th>
                <th className="py-5 px-6 font-mono text-xs uppercase tracking-widest text-destructive w-[30%] font-bold">
                  <span className="flex items-center gap-2">
                    <X className="w-4 h-4" />
                    Plataformas tradicionales
                  </span>
                </th>
                <th className="py-5 px-6 font-mono text-xs uppercase tracking-widest text-primary w-[30%] font-bold bg-primary/[0.03]">
                  <span className="flex items-center gap-2 text-glow">
                    <Check className="w-4 h-4" />
                    Método Nitro
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.label}
                  className={`border-b border-border/50 transition-colors hover:bg-card ${
                    row.highlight ? "bg-primary/[0.05] hover:bg-primary/[0.08]" : ""
                  }`}
                >
                  <td className={`py-5 px-6 text-sm lg:text-base ${row.highlight ? "text-primary font-bold" : "text-foreground/80 font-medium"}`}>
                    {row.label}
                  </td>
                  <td className="py-5 px-6 font-mono text-sm text-destructive/80">
                    {row.old}
                  </td>
                  <td className={`py-5 px-6 font-mono text-sm text-primary font-bold ${row.highlight ? "border-l-2 border-primary" : "bg-primary/[0.02]"}`}>
                    {row.nitro}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
