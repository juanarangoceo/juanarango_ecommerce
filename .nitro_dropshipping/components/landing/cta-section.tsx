import { ArrowRight, Zap } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-20 md:py-24 lg:py-32 border-b border-border relative overflow-hidden text-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,255,0,0.06),transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-5 md:px-6 relative z-10">
        <h2 className="font-heading text-[clamp(3rem,8vw,8rem)] leading-[0.85] mb-6 md:mb-8 text-balance">
          DEJA DE PAGAR POR<br />
          <span className="text-primary">INTENTAR.</span>
        </h2>

        <p className="text-base md:text-lg lg:text-xl text-foreground/60 max-w-xl mx-auto mb-8 md:mb-12 leading-relaxed text-pretty">
          Cada mes que pasa pagando suscripciones sin vender, es dinero que podrias
          invertir en publicidad.{" "}
          <strong className="text-foreground">
            Aprende a construir tu tienda con IA a costo $0.
          </strong>
        </p>

        <a
          className="btn-glitch inline-flex items-center gap-3 bg-primary text-primary-foreground font-mono text-xs md:text-sm font-bold uppercase tracking-wider py-5 md:py-6 px-10 md:px-14 shadow-[0_0_40px_rgba(200,255,0,0.2)] hover:shadow-[0_0_60px_rgba(200,255,0,0.4)] transition-shadow"
          href="#acceso"
        >
          <Zap className="w-4 h-4" />
          QUIERO EL CURSO AHORA
          <ArrowRight className="w-4 h-4" />
        </a>

        <div className="mt-6 md:mt-8 font-mono text-[10px] md:text-xs text-foreground/40 uppercase tracking-widest">
          {'PAGO UNICO  ·  ACCESO DE POR VIDA  ·  GARANTIA 7 DIAS'}
        </div>
      </div>
    </section>
  )
}
