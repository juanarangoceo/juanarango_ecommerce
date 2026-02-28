import { Check, X, ArrowRight, Zap } from "lucide-react"

const forYou = [
  "Quieres validar productos rápido sin desangrarte pagando suscripciones antes de tu primera venta.",
  "Buscas una tienda ultrarrápida (carga en <1s), profesional y única que no parezca el típico template quemado.",
  "Tienes 0 conocimientos de programación y quieres que la IA haga el trabajo técnico duro por ti.",
  "Estás harto de pagar 5 apps mensuales diferentes solo para que tu tienda parezca confiable.",
  "Quieres crear un ecosistema replicable que puedas clonar para cada nuevo producto ganador en minutos.",
]

const notForYou = [
  "Buscas un botón mágico para hacerte millonario la próxima semana desde el sofá sin hacer absolutamente nada.",
  "Prefieres la \"comodidad\" de pagar $78 USD al mes en Shopify + Apps, incluso si no estás vendiendo nada.",
  "No estás dispuesto a dedicar 3 horas (con pausas) a seguir un paso a paso estructurado y probado.",
  "Esperas resultados sin probar, sin iterar, sin ajustar estrategias y sin capacidad crítica.",
]

export function AudienceFilter() {
  return (
    <section className="py-16 md:py-20 lg:py-28 border-b border-border bg-background">
      <div className="max-w-6xl mx-auto px-5 md:px-6 lg:px-12">
        <div className="font-mono text-[11px] md:text-xs text-primary tracking-[0.25em] uppercase mb-5 md:mb-6 text-center font-bold">
          {'// TRANSPARENCIA BRUTAL'}
        </div>
        <h2 className="font-heading text-[clamp(2.2rem,5vw,5rem)] leading-[0.85] mb-12 md:mb-16 text-center text-balance">
          ESTA METODOLOGÍA NO ES<br />
          <span className="text-primary text-glow">PARA TODO EL MUNDO.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border border-border">
          {/* For You */}
          <div className="bg-card p-6 md:p-8 lg:p-12 border-t-4 border-t-primary/50 relative overflow-hidden group hover:bg-card/80 transition-colors">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,157,0.03),transparent_70%)] pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6 md:mb-8 relative z-10">
              <div className="w-10 h-10 bg-primary/10 border border-primary/30 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,157,0.15)] group-hover:bg-primary/20 transition-colors">
                <Check className="w-5 h-5 text-primary" />
              </div>
              <span className="font-heading text-xl md:text-2xl text-primary uppercase tracking-wider">
                Nitro SÍ ES PARA TI SI...
              </span>
            </div>
            
            <ul className="space-y-5 md:space-y-6 relative z-10">
              {forYou.map((text, i) => (
                <li key={i} className="flex gap-3 md:gap-4 items-start">
                  <span className="font-mono text-sm md:text-base text-primary/50 font-bold mt-0.5 shrink-0">
                    {'//'} {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-foreground/80 text-sm md:text-base leading-relaxed font-medium">{text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Not For You */}
          <div className="bg-card p-6 md:p-8 lg:p-12 border-t-4 border-t-destructive/50 relative overflow-hidden group hover:bg-card/80 transition-colors">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,45,45,0.03),transparent_70%)] pointer-events-none" />
            
            <div className="flex items-center gap-3 mb-6 md:mb-8 relative z-10">
              <div className="w-10 h-10 bg-destructive/10 border border-destructive/30 flex items-center justify-center shadow-[0_0_15px_rgba(255,45,45,0.1)] group-hover:bg-destructive/20 transition-colors">
                <X className="w-5 h-5 text-destructive" />
              </div>
              <span className="font-heading text-xl md:text-2xl text-destructive uppercase tracking-wider">
                huye de nitro SI...
              </span>
            </div>
            
            <ul className="space-y-5 md:space-y-6 relative z-10">
              {notForYou.map((text, i) => (
                <li key={i} className="flex gap-3 md:gap-4 items-start opacity-70 group-hover:opacity-100 transition-opacity">
                  <span className="font-mono text-sm md:text-base text-destructive/40 font-bold mt-0.5 shrink-0">
                    {'//'} {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-foreground/60 text-sm md:text-base leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Strategic CTA */}
        <div className="mt-10 md:mt-14 flex flex-col items-center">
          <p className="font-mono text-[10px] md:text-[11px] text-foreground/50 uppercase tracking-widest font-bold mb-4 md:mb-5 text-center">
            {'//'} Si leíste las condiciones y estás listo
          </p>
          <a
            href="#acceso"
            className="btn-glitch inline-flex items-center justify-center gap-3 bg-destructive text-destructive-foreground font-mono text-xs md:text-sm font-bold uppercase tracking-wider px-8 py-4 md:py-5 shadow-[0_0_30px_rgba(255,45,45,0.2)] hover:shadow-[0_0_50px_rgba(255,45,45,0.4)] transition-shadow w-full md:w-auto text-center"
          >
            <Zap className="w-4 h-4 shrink-0" />
            <span>ESTE MÉTODO ES PARA MÍ</span>
            <ArrowRight className="w-4 h-4 shrink-0" />
          </a>
        </div>
      </div>
    </section>
  )
}
