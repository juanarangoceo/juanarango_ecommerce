import { Check, X } from "lucide-react"

const forYou = [
  "Quieres validar productos sin quemar dinero en suscripciones antes de tu primera venta.",
  "Buscas una tienda rapida, profesional y unica que no se vea como la de todos.",
  "Quieres que la IA haga el trabajo tecnico por ti, sin tocar codigo.",
  "Estas cansado de pagar mensualidades por herramientas que apenas usas.",
  "Quieres un sistema que puedas replicar con cada nuevo producto en minutos.",
]

const notForYou = [
  "Buscas un boton magico para hacerte rico sin hacer nada.",
  "Prefieres pagar $39/mes por comodidad, aunque no estes vendiendo.",
  "No quieres dedicar 3 horas (con pausas) a seguir un paso a paso simple.",
  "Esperas resultados sin probar, ajustar ni aprender del proceso.",
]

export function AudienceFilter() {
  return (
    <section className="py-16 md:py-20 lg:py-28 border-b border-border">
      <div className="max-w-6xl mx-auto px-5 md:px-6 lg:px-12">
        <div className="font-mono text-[11px] md:text-xs text-primary tracking-[0.25em] uppercase mb-5 md:mb-6 text-center">
          {'// TRANSPARENCIA TOTAL'}
        </div>
        <h2 className="font-heading text-[clamp(2.2rem,5vw,5rem)] leading-[0.85] mb-12 md:mb-16 text-center text-balance">
          ESTE CURSO NO ES<br />
          <span className="text-primary">PARA TODOS.</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-border border border-border">
          {/* For You */}
          <div className="bg-background p-6 md:p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-8 h-8 bg-primary/10 border border-primary/30 flex items-center justify-center">
                <Check className="w-4 h-4 text-primary" />
              </div>
              <span className="font-mono text-xs md:text-sm text-primary uppercase tracking-wider font-bold">
                Es para ti si...
              </span>
            </div>
            <ul className="space-y-5 md:space-y-6">
              {forYou.map((text, i) => (
                <li key={i} className="flex gap-3 md:gap-4 items-start">
                  <span className="font-heading text-xl md:text-2xl text-primary leading-none mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-foreground/70 text-sm md:text-base leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Not For You */}
          <div className="bg-background p-6 md:p-8 lg:p-12">
            <div className="flex items-center gap-3 mb-6 md:mb-8">
              <div className="w-8 h-8 bg-destructive/10 border border-destructive/30 flex items-center justify-center">
                <X className="w-4 h-4 text-destructive" />
              </div>
              <span className="font-mono text-xs md:text-sm text-destructive uppercase tracking-wider font-bold">
                No es para ti si...
              </span>
            </div>
            <ul className="space-y-5 md:space-y-6">
              {notForYou.map((text, i) => (
                <li key={i} className="flex gap-3 md:gap-4 items-start">
                  <span className="font-heading text-xl md:text-2xl text-destructive/50 leading-none mt-0.5 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-foreground/50 text-sm md:text-base leading-relaxed">{text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
