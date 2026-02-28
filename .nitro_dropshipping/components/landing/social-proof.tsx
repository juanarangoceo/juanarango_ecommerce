import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Carlos M.",
    role: "Dropshipper — Colombia",
    text: "Monte mi primera tienda en una tarde. Sin saber programar. La IA hizo todo y yo solo subi el producto. Ya llevo 3 tiendas activas.",
    stars: 5,
  },
  {
    name: "Valentina R.",
    role: "Emprendedora — Mexico",
    text: "Estaba pagando $60/mes en Shopify sin vender nada. Con Nitro valide 4 productos a costo $0 hasta encontrar el que funciono.",
    stars: 5,
  },
  {
    name: "Andres P.",
    role: "Seller — Espana",
    text: "Lo mejor es la velocidad. Mi tienda carga en menos de 1 segundo. Las conversiones subieron un 40% comparado con mi antigua tienda.",
    stars: 5,
  },
]

export function SocialProof() {
  return (
    <section className="py-16 md:py-20 lg:py-28 border-b border-border bg-card">
      <div className="max-w-6xl mx-auto px-5 md:px-6 lg:px-12">
        <div className="font-mono text-[11px] md:text-xs text-primary tracking-[0.25em] uppercase mb-5 md:mb-6 text-center">
          {'// LO QUE DICEN NUESTROS ALUMNOS'}
        </div>
        <h2 className="font-heading text-[clamp(2.2rem,5vw,5rem)] leading-[0.85] mb-12 md:mb-16 text-center text-balance">
          RESULTADOS REALES<br />
          <span className="text-primary">DE PERSONAS REALES.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border">
          {testimonials.map((t) => (
            <div key={t.name} className="bg-background p-6 md:p-8 lg:p-10 flex flex-col">
              {/* Stars */}
              <div className="flex gap-1 mb-5 md:mb-6">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary fill-primary" />
                ))}
              </div>

              <p className="text-foreground/70 text-sm md:text-base leading-relaxed mb-6 md:mb-8 flex-1 italic">
                {'"'}{t.text}{'"'}
              </p>

              <div className="border-t border-border pt-4 md:pt-5">
                <div className="font-semibold text-sm md:text-base text-foreground">{t.name}</div>
                <div className="font-mono text-[10px] md:text-[11px] text-foreground/40 uppercase tracking-wider mt-0.5">
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom stat */}
        <div className="mt-6 md:mt-8 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 text-center">
          <div>
            <div className="font-heading text-3xl md:text-4xl text-primary">+120</div>
            <div className="font-mono text-[10px] md:text-[11px] text-foreground/40 uppercase tracking-wider mt-1">Alumnos activos</div>
          </div>
          <div className="hidden md:block w-px h-10 bg-border" />
          <div>
            <div className="font-heading text-3xl md:text-4xl text-primary">4.9/5</div>
            <div className="font-mono text-[10px] md:text-[11px] text-foreground/40 uppercase tracking-wider mt-1">Satisfaccion promedio</div>
          </div>
          <div className="hidden md:block w-px h-10 bg-border" />
          <div>
            <div className="font-heading text-3xl md:text-4xl text-primary">+350</div>
            <div className="font-mono text-[10px] md:text-[11px] text-foreground/40 uppercase tracking-wider mt-1">Tiendas creadas</div>
          </div>
        </div>
      </div>
    </section>
  )
}
