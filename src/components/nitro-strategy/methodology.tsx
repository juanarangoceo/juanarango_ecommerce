import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  Map, 
  Rocket, 
  BarChart3
} from "lucide-react"

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Diagnóstico Profundo",
    duration: "Semana 1",
    description: "Analizo tu infraestructura actual, identifico cuellos de botella, fugas de rendimiento y oportunidades de automatización. Entiendo tu negocio antes de tocar una línea de código."
  },
  {
    icon: Map,
    step: "02",
    title: "Roadmap Estratégico",
    duration: "Semana 2",
    description: "Diseño un plan técnico priorizado por ROI. Cada decisión arquitectónica está alineada con tus objetivos de negocio y capacidad de inversión."
  },
  {
    icon: Rocket,
    step: "03",
    title: "Implementación Acelerada",
    duration: "Semanas 3-6",
    description: "Ejecuto las mejoras críticas con metodología ágil. Entregas incrementales que generan valor desde el primer sprint, sin interrumpir tu operación."
  },
  {
    icon: BarChart3,
    step: "04",
    title: "Optimización Continua",
    duration: "Ongoing",
    description: "Monitoreo métricas de rendimiento, ajusto sistemas y capacito a tu equipo. Tu infraestructura evoluciona con tu negocio."
  }
]

export function Methodology() {
  return (
    <section 
      id="metodologia" 
      className="py-16 lg:py-24 scroll-mt-20"
      aria-labelledby="methodology-title"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <Badge 
            variant="outline" 
            className="mb-6 px-4 py-2 border-primary/30 text-primary bg-primary/5"
          >
            Metodología Probada
          </Badge>
          
          <h2 
            id="methodology-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            De diagnóstico a{" "}
            <span className="text-primary">resultados medibles</span>{" "}
            en semanas
          </h2>
          <p className="text-muted-foreground text-lg">
            No trabajo con contratos eternos ni proyectos que nunca terminan. 
            Mi metodología está diseñada para generar impacto rápido y medible.
          </p>
        </div>

        {/* Steps */}
        <div className="relative max-w-4xl mx-auto">
          {/* Connection line */}
          <div className="absolute left-[28px] top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-8">
            {steps.map((item, index) => (
              <article 
                key={index}
                className="relative flex gap-6 md:gap-8"
              >
                {/* Step indicator */}
                <div className="flex-shrink-0 relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-8">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs text-primary font-semibold uppercase tracking-wider">
                      Paso {item.step}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {item.duration}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
