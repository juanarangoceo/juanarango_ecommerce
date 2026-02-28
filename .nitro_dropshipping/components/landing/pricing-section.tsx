"use client"

import { useEffect, useState } from "react"
import { ShieldCheck, RefreshCw, BadgeCheck, ArrowRight, Zap, Sparkles } from "lucide-react"

const valueItems = [
  {
    title: "Curso Completo Nitro Dropshipping",
    sub: "5 modulos en video, paso a paso con IA",
    price: "$197",
  },
  {
    title: "Templates Premium para v0",
    sub: "Landing pages React listas para vender",
    price: "$97",
  },
  {
    title: "Acceso VIP Telegram",
    sub: "Comunidad, soporte directo y networking",
    price: "$147",
  },
  {
    title: "Directorio de Proveedores Verificados",
    sub: "Contactos directos sin intermediarios",
    price: "$47",
  },
  {
    title: "Actualizaciones de por vida",
    sub: "Nuevas versiones, metodos y templates incluidos",
    price: "$97",
  },
]

function useCountdown() {
  const [time, setTime] = useState({ hours: 2, minutes: 48, seconds: 12 })

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => {
        let { hours, minutes, seconds } = prev
        seconds -= 1
        if (seconds < 0) {
          seconds = 59
          minutes -= 1
        }
        if (minutes < 0) {
          minutes = 59
          hours -= 1
        }
        if (hours < 0) {
          return { hours: 2, minutes: 48, seconds: 12 }
        }
        return { hours, minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return time
}

export function PricingSection() {
  const countdown = useCountdown()

  return (
    <section
      id="acceso"
      className="py-16 md:py-20 lg:py-28 border-b border-border bg-card relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-6 lg:px-12 relative z-10">
        <div className="font-mono text-[11px] md:text-xs text-primary tracking-[0.25em] uppercase mb-5 md:mb-6 text-center">
          {'// ACCEDE AHORA'}
        </div>
        <h2 className="font-heading text-[clamp(2.2rem,5vw,5rem)] leading-[0.85] mb-5 md:mb-6 text-center text-balance">
          TODO LO QUE NECESITAS<br />
          <span className="text-primary">EN UN SOLO PAGO.</span>
        </h2>
        <p className="text-foreground/60 text-sm md:text-base lg:text-lg max-w-2xl mx-auto mb-12 md:mb-16 text-center leading-relaxed">
          Sin suscripciones. Sin costos ocultos. Un pago unico y acceso de por vida
          a todo el sistema Nitro.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Value Stack */}
          <div className="bg-background border border-border p-6 md:p-8 lg:p-10">
            <div className="font-mono text-[10px] md:text-xs text-primary tracking-widest uppercase mb-6 md:mb-8 font-bold">
              {'// LO QUE INCLUYE'}
            </div>

            <div className="space-y-4 md:space-y-5 mb-8 md:mb-10">
              {valueItems.map((item) => (
                <div
                  key={item.title}
                  className="flex justify-between items-start border-b border-border/50 pb-3 md:pb-4"
                >
                  <div>
                    <div className="text-sm md:text-base text-foreground font-bold">{item.title}</div>
                    <div className="text-[11px] md:text-xs text-foreground/40 uppercase mt-1">
                      {item.sub}
                    </div>
                  </div>
                  <span className="font-mono text-xs md:text-sm text-foreground/30 line-through font-bold shrink-0 ml-4">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-end bg-secondary/50 border border-border p-4 md:p-5">
              <span className="font-mono text-[10px] md:text-xs text-foreground/50 uppercase tracking-widest">
                Valor total
              </span>
              <span className="font-heading text-3xl md:text-4xl text-foreground/40 line-through">
                $585 USD
              </span>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex gap-3 mb-6 md:mb-8 flex-wrap">
              <span className="bg-destructive text-destructive-foreground font-mono text-[10px] md:text-xs font-bold px-3 md:px-4 py-2 uppercase tracking-wider animate-pulse">
                Oferta limitada
              </span>
              <span className="border border-primary text-primary font-mono text-[10px] md:text-xs font-bold px-3 md:px-4 py-2 uppercase tracking-wider">
                14 cupos restantes
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-heading text-[6rem] md:text-[8rem] lg:text-[10rem] leading-none text-primary">
                $49
              </span>
              <span className="font-heading text-2xl md:text-4xl text-foreground/80">USD</span>
            </div>

            <p className="font-mono text-xs md:text-sm text-foreground/60 uppercase tracking-wider mb-2 font-bold">
              Pago unico — Acceso de por vida
            </p>
            <p className="text-foreground/40 text-xs md:text-sm mb-6 md:mb-8">
              Acceso inmediato a todo el contenido, templates y comunidad VIP.
            </p>

            {/* Countdown */}
            <div className="flex gap-3 md:gap-4 mb-8 md:mb-10">
              {[
                { val: countdown.hours, label: "Horas" },
                { val: countdown.minutes, label: "Min" },
                { val: countdown.seconds, label: "Seg" },
              ].map((unit) => (
                <div
                  key={unit.label}
                  className="bg-background border border-border p-2.5 md:p-3 w-14 md:w-16 text-center"
                >
                  <div
                    className={`font-heading text-xl md:text-2xl ${
                      unit.label === "Seg"
                        ? "text-destructive animate-countdown"
                        : "text-foreground"
                    }`}
                  >
                    {String(unit.val).padStart(2, "0")}
                  </div>
                  <div className="text-[8px] md:text-[9px] text-foreground/40 uppercase font-mono mt-1">
                    {unit.label}
                  </div>
                </div>
              ))}
            </div>

            <a
              className="btn-glitch w-full max-w-md flex items-center justify-center gap-3 bg-primary text-primary-foreground font-mono text-xs md:text-sm font-bold uppercase tracking-wider py-5 md:py-6 text-center mb-6 md:mb-8 shadow-[0_0_50px_rgba(200,255,0,0.25)]"
              href="#"
            >
              <Zap className="w-4 h-4" />
              OBTENER ACCESO AHORA
              <ArrowRight className="w-4 h-4" />
            </a>

            {/* Guarantee */}
            <div className="border border-dashed border-border p-4 md:p-5 mb-6 md:mb-8 flex items-start gap-3 md:gap-4 max-w-md w-full">
              <div className="w-9 h-9 md:w-10 md:h-10 shrink-0 border border-primary flex items-center justify-center">
                <BadgeCheck className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <div>
                <div className="text-foreground font-bold text-xs md:text-sm mb-1">
                  Garantia de 7 dias
                </div>
                <div className="text-foreground/50 text-[11px] md:text-xs leading-relaxed">
                  Si sigues el proceso y no logras tener tu tienda funcionando,
                  te devolvemos el 100% de tu dinero. Sin preguntas.
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-4 md:gap-6 flex-wrap">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary/60" />
                <span className="font-mono text-[9px] md:text-[10px] text-foreground/40 uppercase tracking-wider">
                  Pago seguro
                </span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary/60" />
                <span className="font-mono text-[9px] md:text-[10px] text-foreground/40 uppercase tracking-wider">
                  Updates gratis
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary/60" />
                <span className="font-mono text-[9px] md:text-[10px] text-foreground/40 uppercase tracking-wider">
                  100% con IA
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -left-10 md:-left-20 top-1/2 -translate-y-1/2 text-[15vw] md:text-[20vw] font-heading text-foreground/[0.02] select-none pointer-events-none">
        $49
      </div>
    </section>
  )
}
