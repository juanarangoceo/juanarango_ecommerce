import { AlertTriangle, DollarSign, XCircle, Sparkles } from "lucide-react"

const steps = [
  {
    num: "01",
    icon: DollarSign,
    title: "Pagas antes de vender",
    desc: "Abres tu tienda, eliges un plan mensual, instalas apps de pago. Antes de tu primera venta ya invertiste $78+ en suscripciones que no necesitabas.",
  },
  {
    num: "02",
    icon: AlertTriangle,
    title: "Tu tienda no convierte",
    desc: "Lanzas publicidad. La tienda carga lento, el diseño es igual al de todos, el cliente cierra la pestaña. El mes sigue corriendo y la plataforma sigue cobrando.",
  },
  {
    num: "03",
    icon: XCircle,
    title: "Cierras o pagas a ciegas",
    desc: "Llega el cobro de la tarjeta. Vendiste poco o nada. Tienes dos opciones: pagar otro mes esperando un milagro, o cerrar y perder todo lo que invertiste.",
  },
]

export function PainCycle() {
  return (
    <section className="py-16 md:py-20 lg:py-28 border-b border-border bg-background">
      <div className="max-w-6xl mx-auto px-5 md:px-6 lg:px-12">
        {/* Video + Content row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12 md:mb-16">
          <div className="lg:col-span-2">
            <div className="font-mono text-[11px] md:text-xs text-primary tracking-[0.25em] uppercase mb-5 md:mb-6 font-bold">
              {'// EL PROBLEMA REAL'}
            </div>
            <h2 className="font-heading text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.85] mb-5 md:mb-6 text-balance">
              EL CICLO QUE MATA A<br />
              <span className="text-destructive">9 DE CADA 10 TIENDAS.</span>
            </h2>
            <p className="text-foreground/70 text-base md:text-lg max-w-xl leading-relaxed text-pretty">
              Las plataformas tradicionales te cobran mensualidad, apps y comisiones por venta,
              incluso cuando no has generado un solo peso. Testear productos no debería ser tan costoso.
            </p>
          </div>

          {/* Vertical video placeholder */}
          <div className="video-frame-glitch aspect-[9/16] max-h-[360px] lg:max-h-[420px] bg-secondary/30 flex flex-col items-center justify-center group hover:border-destructive/50 transition-colors cursor-pointer">
            <Sparkles className="w-6 h-6 text-primary/30 mb-3 group-hover:scale-110 transition-transform" />
            <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest font-bold">El problema</span>
            <span className="font-mono text-[10px] text-foreground/30 mt-1">Video explicativo (Próximamente)</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-background/80 p-6 md:p-8 lg:p-10 group hover:bg-card transition-colors relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-destructive/5 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out pointer-events-none" />
              <span className="absolute top-3 right-4 md:top-4 md:right-6 text-[5rem] md:text-[6rem] font-heading text-foreground/[0.03] group-hover:text-destructive/[0.05] transition-colors leading-none select-none pointer-events-none">
                {step.num}
              </span>
              <div className="relative z-10">
                <div className="w-11 h-11 md:w-12 md:h-12 border border-border flex items-center justify-center mb-5 md:mb-6 group-hover:border-destructive/50 group-hover:bg-destructive/10 transition-colors">
                  <step.icon className="w-5 h-5 text-destructive" />
                </div>
                <h3 className="font-bold text-base md:text-lg lg:text-xl text-foreground mb-3 md:mb-4">
                  {step.title}
                </h3>
                <p className="text-foreground/60 text-sm md:text-base leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 md:mt-8 bg-destructive/5 border border-destructive/20 p-5 md:p-6 lg:p-8 flex flex-col md:flex-row items-start md:items-center gap-4 hover:bg-destructive/10 transition-colors">
          <AlertTriangle className="w-6 h-6 text-destructive shrink-0" />
          <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
            <strong className="text-foreground">No cerraste porque el producto fuera malo.</strong>{" "}
            Cerraste porque la plataforma te desangró cobrándote antes de dejarte intentarlo lo suficiente.
            Con Nitro, <span className="text-primary font-bold">primero validas a costo cero</span>, despúes decides si inviertes al escalar.
          </p>
        </div>
      </div>
    </section>
  )
}
