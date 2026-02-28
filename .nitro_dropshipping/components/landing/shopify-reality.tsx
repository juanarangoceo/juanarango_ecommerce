import { Receipt, TrendingDown, X, ArrowRight, Zap } from "lucide-react"

const invoiceItems = [
  { label: "Plan Basic Shopify", cost: "$39 / mes", note: "Cobra aunque no vendas" },
  { label: "App de Resenas", cost: "$15 / mes", note: "Para mostrar que confien" },
  { label: "App de Upsell", cost: "$24 / mes", note: "Para subir el ticket" },
  { label: "App de Envios", cost: "$12 / mes", note: "Para trackear pedidos" },
  { label: "Comision por venta", cost: "2%", note: "Encima de lo que ya pagas" },
]

export function ShopifyReality() {
  return (
    <section className="py-16 md:py-20 lg:py-28 border-b border-border relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(255,45,45,0.04),transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-5 md:px-6 lg:px-12 relative z-10">
        {/* Section label */}
        <div className="font-mono text-[11px] md:text-xs text-destructive tracking-[0.25em] uppercase mb-5 md:mb-6 flex items-center gap-3">
          <TrendingDown className="w-4 h-4" />
          <span>{'// LA REALIDAD QUE NADIE TE CUENTA'}</span>
        </div>

        {/* Big headline */}
        <h2 className="font-heading text-[clamp(3rem,8vw,8rem)] leading-[0.85] tracking-tight mb-6 md:mb-8">
          <span className="text-destructive relative inline-block">
            SHOPIFY
            <span className="absolute left-0 top-1/2 w-full h-[3px] md:h-1 bg-foreground -translate-y-1/2 -rotate-[2deg]" />
          </span>
          <br />
          <span className="text-primary">TE COBRO.</span>
          <br />
          <span className="text-foreground">TU NO VENDISTE.</span>
        </h2>

        <p className="text-foreground/70 text-base md:text-lg lg:text-xl max-w-2xl leading-relaxed mb-10 md:mb-14 text-pretty">
          Cada mes que tu tienda no vende, la plataforma igual cobra.
          Apps, comisiones, suscripciones. El contador no se detiene.
          <strong className="text-foreground font-semibold"> Y tu cuenta de banco si.</strong>
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
                <span className="font-mono text-[10px] md:text-xs text-foreground/40 tracking-widest uppercase">
                  Factura mensual
                </span>
              </div>
              <span className="font-mono text-[10px] md:text-xs text-destructive uppercase tracking-wider font-bold animate-pulse">
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
                    <span className="text-sm md:text-base text-foreground/80">{item.label}</span>
                    <span className="font-mono text-[10px] text-foreground/30 tracking-wider">{item.note}</span>
                  </div>
                  <span className="font-mono text-sm md:text-base text-destructive line-through decoration-destructive/40 shrink-0 ml-4">
                    {item.cost}
                  </span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-6 md:mt-8 pt-4 md:pt-6 border-t border-destructive/30 flex items-end justify-between">
              <div>
                <div className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest mb-1">
                  Total perdido / mes
                </div>
                <div className="font-mono text-[10px] text-foreground/25">
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
            <div className="bg-primary/[0.04] border border-primary/20 p-6 md:p-8 lg:p-10 flex-1 relative">
              {/* Corner accents */}
              <div className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-primary" />
              <div className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-primary" />

              <div className="font-mono text-[10px] md:text-xs text-primary tracking-widest uppercase mb-4 md:mb-6">
                {'// CON EL METODO NITRO'}
              </div>

              <div className="flex items-end gap-4 mb-6 md:mb-8">
                <span className="font-heading text-6xl md:text-7xl lg:text-8xl text-primary leading-none">
                  $0
                </span>
                <span className="text-foreground/50 text-sm md:text-base pb-2">/mes</span>
              </div>

              <div className="space-y-3 md:space-y-4 mb-6 md:mb-8">
                {[
                  "Hosting gratuito con Vercel",
                  "Base de datos sin costo",
                  "Sin comisiones por venta",
                  "Sin apps de pago obligatorias",
                  "Sin sorpresas a fin de mes",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-primary shrink-0" />
                    <span className="text-foreground/80 text-sm md:text-base">{item}</span>
                  </div>
                ))}
              </div>

              <p className="text-foreground/50 text-sm md:text-base leading-relaxed border-t border-primary/10 pt-4 md:pt-6">
                Tu construyes con IA. Tu tienda corre en infraestructura real de nivel enterprise.
                Y solo pagas <strong className="text-foreground/80">cuando decides escalar</strong>.
              </p>
            </div>

            {/* Emotional closer */}
            <div className="bg-card border border-border p-5 md:p-6 flex items-start gap-4">
              <X className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
              <p className="text-foreground/70 text-sm md:text-base leading-relaxed">
                <strong className="text-foreground">No es que tu producto fuera malo.</strong>{" "}
                Es que te obligaron a pagar la renta de la tienda antes de abrir las puertas.
                <span className="text-primary font-semibold"> Eso se acabo.</span>
              </p>
            </div>

            {/* CTA inside */}
            <a
              href="#acceso"
              className="btn-glitch flex items-center justify-center gap-3 bg-primary text-primary-foreground font-mono text-xs md:text-sm font-bold uppercase tracking-wider py-4 md:py-5 px-8 text-center"
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
