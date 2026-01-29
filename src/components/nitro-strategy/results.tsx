import { Badge } from "@/components/ui/badge"

const stats = [
  {
    value: "150",
    suffix: "%",
    label: "Aumento de Eficiencia",
    description: "Promedio en operaciones optimizadas"
  },
  {
    value: "<200",
    suffix: "ms",
    label: "Tiempo de Carga",
    description: "Infraestructura de grado militar"
  },
  {
    value: "99.9",
    suffix: "%",
    label: "Uptime de Sistemas",
    description: "Disponibilidad garantizada"
  },
  {
    value: "50",
    suffix: "+",
    label: "Sistemas Automatizados",
    description: "Procesos transformados con IA"
  }
]

const testimonials = [
  {
    quote: "Pasamos de facturar $50K mensuales a $500K en 8 meses. La infraestructura que construyeron aguantó el Black Friday sin un solo problema.",
    author: "CEO, Ecommerce de Moda",
    result: "900% crecimiento en 8 meses"
  },
  {
    quote: "No son developers, son arquitectos. Entendieron nuestro modelo de negocio y construyeron algo que escala con nosotros.",
    author: "Fundador, Tech Startup",
    result: "De MVP a Serie A en 12 meses"
  }
]

export function Results() {
  return (
    <section 
      id="resultados" 
      className="py-20 lg:py-32 bg-card scroll-mt-20"
      aria-labelledby="results-title"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Stats */}
        <div className="text-center mb-16">
          <Badge 
            variant="outline" 
            className="mb-6 px-4 py-2 border-primary/30 text-primary bg-primary/5"
          >
            Números que Hablan por Sí Solos
          </Badge>
          
          <h2 
            id="results-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Resultados reales de{" "}
            <span className="text-primary">empresas reales</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-xl border border-border bg-background"
            >
              <div className="text-4xl lg:text-5xl font-bold text-primary mb-2">
                {stat.value}
                <span className="text-2xl lg:text-3xl">{stat.suffix}</span>
              </div>
              <p className="text-sm font-semibold text-foreground mb-1">
                {stat.label}
              </p>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <article 
              key={index}
              className="p-6 lg:p-8 rounded-xl border border-border bg-background"
            >
              <blockquote className="mb-6">
                <p className="text-lg text-foreground leading-relaxed italic">
                  {`"${testimonial.quote}"`}
                </p>
              </blockquote>
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="font-semibold text-foreground text-sm">
                    — {testimonial.author}
                  </p>
                </div>
                <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                  {testimonial.result}
                </Badge>
              </div>
            </article>
          ))}
        </div>

        {/* Additional metrics */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-xl border border-border bg-background/50">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">50+</p>
            <p className="text-xs text-muted-foreground">Negocios Transformados</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">3x</p>
            <p className="text-xs text-muted-foreground">Más Contactos</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">98%</p>
            <p className="text-xs text-muted-foreground">Clientes Satisfechos</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">4 sem</p>
            <p className="text-xs text-muted-foreground">Primeros Resultados</p>
          </div>
        </div>
      </div>
    </section>
  )
}
