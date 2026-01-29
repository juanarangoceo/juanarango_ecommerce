import { AlertTriangle, Clock, DollarSign, Users } from "lucide-react"

const painPoints = [
  {
    icon: AlertTriangle,
    title: "Tu infraestructura no soporta el crecimiento",
    description: "Cada vez que escalas, tu sistema colapsa. Los tiempos de carga aumentan, los errores se multiplican y pierdes ventas en los momentos más críticos."
  },
  {
    icon: Clock,
    title: "Procesos manuales que consumen tiempo",
    description: "Tu equipo pasa horas en tareas repetitivas que podrían automatizarse. Mientras tanto, la competencia ya usa IA para operar 10x más rápido."
  },
  {
    icon: DollarSign,
    title: "Inviertes en tecnología sin ver retorno",
    description: "Has pagado por desarrollos que prometían mucho pero entregaron poco. Frameworks modernos que nadie sabe mantener y deuda técnica acumulada."
  },
  {
    icon: Users,
    title: "Dependes de equipos que no entienden tu negocio",
    description: "Tus developers hablan de 'stacks' y 'microservicios' cuando tú solo quieres más clientes y menos dolores de cabeza."
  }
]

export function PainPoints() {
  return (
    <section className="py-16 lg:py-24 bg-card" aria-labelledby="pain-points-title">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 
            id="pain-points-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Cada día que pasa sin una{" "}
            <span className="text-primary">infraestructura escalable</span>,{" "}
            estás dejando dinero en la mesa
          </h2>
          <p className="text-muted-foreground text-lg">
            No es tu culpa. La mayoría de soluciones digitales están diseñadas por tecnólogos que no entienden de negocios.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {painPoints.map((point, index) => (
            <article 
              key={index}
              className="group relative p-6 lg:p-8 rounded-xl border border-border bg-background hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
                  <point.icon className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">
                    {point.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Agitation */}
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <p className="text-lg text-muted-foreground">
            <strong className="text-foreground">¿Cuántos clientes potenciales te están buscando ahora mismo</strong> y terminan eligiendo a tu competencia porque su sitio carga más rápido, 
            su proceso de compra es más fluido, o simplemente porque ellos ya automatizaron lo que tú sigues haciendo manualmente?
          </p>
        </div>
      </div>
    </section>
  )
}
