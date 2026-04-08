import { ArrowRight, Zap } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 md:py-24 lg:py-32 border-b border-border relative overflow-hidden text-center bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,255,157,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-5 md:px-6 relative z-10 flex flex-col items-center">
        <h2 className="font-heading text-[clamp(2.5rem,8vw,8rem)] leading-[0.85] mb-6 md:mb-8 text-balance">
          DEJA DE PAGAR RENTA POR<br />
          <span className="text-primary text-glow">INTENTAR VENDER.</span>
        </h2>

        <p className="text-base md:text-lg lg:text-xl text-foreground/70 max-w-xl mx-auto mb-8 md:mb-12 leading-relaxed text-pretty">
          Cada mes que pasa sin vender, Shopify si cobró su mensualidad por adelantado.
          Ese es dinero que podrías haber invertido en testear un anuncio ganador.{" "}
          <strong className="text-foreground mt-4 block">
            Rompe la cadena mensual hoy. Construye tu tienda nivel Enterprise a $0.
          </strong>
        </p>

        <a
          href="#acceso"
          className="btn-glitch inline-flex items-center gap-3 bg-destructive text-destructive-foreground font-mono text-xs md:text-sm font-bold uppercase tracking-wider py-5 md:py-6 px-10 md:px-14 shadow-[0_0_40px_rgba(255,45,45,0.2)] hover:shadow-[0_0_60px_rgba(255,45,45,0.4)] transition-shadow"
        >
          <Zap className="w-4 h-4" />
          RESERVAR MI LUGAR
          <ArrowRight className="w-4 h-4" />
        </a>

        <div className="mt-8 font-mono text-[10px] md:text-xs text-foreground/40 uppercase tracking-widest flex flex-wrap justify-center gap-4 border border-border px-6 py-3 bg-card/50">
          <span>PAGO ÚNICO</span>
          <span className="text-primary">///</span>
          <span>ACCESO DE POR VIDA</span>
          <span className="text-primary">///</span>
          <span>GARANTÍA DE 7 DÍAS</span>
        </div>
      </div>
    </section>
  )
}
