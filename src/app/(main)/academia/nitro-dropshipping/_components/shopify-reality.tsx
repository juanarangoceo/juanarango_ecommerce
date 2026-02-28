import { Receipt, TrendingDown, X, ArrowRight, Zap } from "lucide-react"

const invoiceItems = [
  { label: "Plan Basic Shopify", cost: "$39 / mes", note: "Cobra aunque no vendas" },
  { label: "App de Reseñas", cost: "$15 / mes", note: "Para mostrar que confíen" },
  { label: "App de Upsell", cost: "$24 / mes", note: "Para subir el ticket medio" },
  { label: "App de Envíos", cost: "$12 / mes", note: "Para trackear pedidos" },
  { label: "Comisión por venta", cost: "2%", note: "Encima de lo que ya pagas" },
]

export function ShopifyReality() {
  return (
    <section className="py-16 md:py-20 lg:py-28 border-b border-border relative overflow-hidden bg-background">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(168,26,26,0.06),transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 md:px-6 lg:px-12 relative z-10">
        {/* Section label */}
        <div className="font-mono text-[11px] md:text-xs text-destructive tracking-[0.25em] uppercase mb-5 md:mb-6 flex items-center gap-3">
          <TrendingDown className="w-4 h-4" />
          <span className="font-bold">{'// LA REALIDAD QUE NADIE TE CUENTA'}</span>
        </div>

        {/* Big headline */}
        <h2 className="font-heading text-[clamp(3rem,8vw,8rem)] leading-[0.85] tracking-tight mb-6 md:mb-8">
          <span className="text-destructive relative inline-block">
            SHOPIFY
            <span className="absolute left-0 top-1/2 w-full h-[3px] md:h-1 bg-foreground -translate-y-1/2 -rotate-[2deg]" />
          </span>
          <br />
          <span className="text-primary">COBRÓ.</span>
          <br />
          <span className="text-foreground">TÚ NO VENDISTE.</span>
        </h2>

        <p className="text-foreground/70 text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed mb-10 md:mb-14 text-pretty">
          Cada mes que tu tienda no vende, la plataforma igual cobra.
          Apps, comisiones, suscripciones. El contador no se detiene.
          Y mañana volverá a cobrar.
          <strong className="text-foreground font-semibold"> Y tu cuenta de banco se vacía.</strong>
        </p>

        {/* Invoice + Message Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Invoice Card */}
          <div className="bg-card border border-border p-6 md:p-8 lg:p-10 relative">
            {/* Corner accents */}
            <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-destructive" />
            <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-destructive" />
            <div className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-destructive/30" />
            <div className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-destructive/30" />

            {/* Invoice header */}
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <div className="flex items-center gap-3">
                <Receipt className="w-5 h-5 text-foreground/40" />
                <span className="font-mono text-[10px] md:text-xs text-foreground/40 tracking-widest uppercase font-bold">
                  Factura mensual
                </span>
              </div>
              <span className="font-mono text-[10px] md:text-xs text-destructive flex items-center gap-2 uppercase tracking-wider font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
                Pendiente de pago
              </span>
            </div>

            {/* Line items */}
            <div className="space-y-0">
              {invoiceItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-3 md:py-4 border-b border-border/50 group"
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm md:text-base text-foreground/80 font-medium">{item.label}</span>
                    <span className="font-mono text-[10px] text-foreground/40 tracking-wider">{item.note}</span>
                  </div>
                  <span className="font-mono text-sm md:text-base text-destructive line-through decoration-destructive/60 shrink-0 ml-4 font-bold">
                    {item.cost}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-destructive/30 flex items-end justify-between">
              <div>
                <div className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest mb-1 font-bold">
                  Total perdido / mes
                </div>
                <div className="font-mono text-[10px] text-foreground/30">
                  Sin contar publicidad ni tu tiempo
                </div>
              </div>
              <span className="font-heading text-5xl md:text-6xl lg:text-7xl text-destructive leading-none">
                $90+
              </span>
            </div>
          </div>

          {/* Nitro Alternative */}
          <div className="flex flex-col gap-6 h-full">
            {/* Nitro card */}
            <div className="bg-primary/[0.03] border border-primary/20 p-6 md:p-8 lg:p-10 flex-1 relative hover:bg-primary/[0.05] transition-colors">
              {/* Corner accents */}
              <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-primary" />
              <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-primary" />

              <div className="font-mono text-[10px] md:text-xs text-primary tracking-widest uppercase mb-4 md:mb-6 font-bold">
                {'// CON EL MÉTODO NITRO'}
              </div>

              <div className="flex items-end gap-4 mb-6 md:mb-8">
                <span className="font-heading text-6xl md:text-7xl lg:text-8xl text-primary leading-none text-glow">
                  $0
                </span>
                <span className="text-foreground/50 text-sm md:text-base pb-2 font-mono uppercase tracking-widest">/mes</span>
              </div>

              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {[
                  "Hosting gratuito con infraestructura Enterprise",
                  "Base de datos sin costo y ultrarrápida",
                  "Cero % de comisiones por venta",
                  "Sin apps de pago obligatorias que ralentizan la tienda",
                  "Sin sorpresas a fin de mes. Gastos predecibles.",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-primary/80 shrink-0 shadow-[0_0_8px_rgba(0,255,157,0.5)]" />
                    <span className="text-foreground/80 text-sm md:text-base">{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-foreground/60 text-sm md:text-base leading-relaxed border-t border-primary/10 pt-4 md:pt-6">
                Tú construyes con IA. Tu tienda corre en infraestructura real de nivel enterprise super rápida.
                Y solo pagas <strong className="text-foreground">cuando decides escalar operaciones</strong>.
              </p>
            </div>

            {/* Emotional closer */}
            <div className="bg-card border border-border p-5 md:p-6 flex items-start gap-4">
              <X className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed">
                <strong className="text-foreground">Tu producto no era malo.</strong>{" "}
                Es que te obligaron a pagar la renta del local comercial antes de abrir las puertas al público.
                <span className="text-primary font-semibold"> Eso se acabó hoy.</span>
              </p>
            </div>

            {/* CTA inside */}
            <a
              href="#acceso"
              className="btn-glitch flex items-center justify-center gap-3 bg-primary text-primary-foreground font-mono text-xs md:text-sm font-bold uppercase tracking-wider py-4 md:py-5 px-8 text-center hover:bg-primary/90 transition-colors"
            >
              <Zap className="w-4 h-4" />
              QUIERO DEJAR DE PAGAR POR NADA
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
