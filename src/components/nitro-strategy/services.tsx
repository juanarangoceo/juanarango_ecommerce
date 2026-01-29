import { 
  Layers, 
  Bot, 
  Gauge, 
  GitBranch,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    icon: Layers,
    number: "01",
    title: "Arquitectura Headless",
    subtitle: "Infraestructura desacoplada",
    description: "Diseño arquitecturas headless que separan tu frontend de tu backend, permitiendo velocidades de carga <200ms y la flexibilidad de escalar cada componente de forma independiente.",
    features: [
      "Jamstack & Edge Computing",
      "APIs optimizadas para rendimiento",
      "CDN global para latencia mínima",
      "Integración con cualquier CMS"
    ]
  },
  {
    icon: Bot,
    number: "02",
    title: "Automatización con IA Generativa",
    subtitle: "Procesos inteligentes",
    description: "Implemento sistemas de automatización con inteligencia artificial que eliminan tareas repetitivas, optimizan operaciones y liberan a tu equipo para trabajo de alto valor.",
    features: [
      "Chatbots y asistentes inteligentes",
      "Automatización de contenido",
      "Procesamiento de datos con IA",
      "Workflows automatizados"
    ]
  },
  {
    icon: Gauge,
    number: "03",
    title: "Ingeniería de Escalamiento",
    subtitle: "Crecimiento sin límites",
    description: "Reconstruyo tu infraestructura técnica para que soporte desde 100 hasta 100,000 usuarios sin refactorización, con tiempos de respuesta consistentes bajo cualquier carga.",
    features: [
      "Microservicios distribuidos",
      "Auto-scaling inteligente",
      "Monitoreo en tiempo real",
      "99.9% de uptime garantizado"
    ]
  },
  {
    icon: GitBranch,
    number: "04",
    title: "Roadmap Técnico Estratégico",
    subtitle: "Visión a largo plazo",
    description: "Desarrollo un plan técnico alineado con tus objetivos de negocio. Identifico fugas de capital, elimino deuda técnica y diseño la ruta más eficiente hacia tus metas.",
    features: [
      "Auditoría técnica completa",
      "Priorización basada en ROI",
      "Plan de migración gradual",
      "Mentoría para tu equipo"
    ]
  }
]

export function Services() {
  return (
    <section 
      id="servicios" 
      className="py-16 lg:py-24 scroll-mt-20"
      aria-labelledby="services-title"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-primary text-sm font-medium uppercase tracking-wider mb-4">
            Ecosistema de Servicios
          </p>
          <h2 
            id="services-title"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Consultoría de alto nivel para{" "}
            <span className="text-primary">empresas que escalan</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            No entrego código genérico. Diseño soluciones estratégicas que combinan ingeniería de software avanzada con visión de negocio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <article 
              key={index}
              className="group relative p-6 lg:p-8 rounded-xl border border-border bg-card hover:border-primary/50 transition-all duration-300"
            >
              {/* Number indicator */}
              <span className="absolute top-6 right-6 text-6xl font-bold text-border/50 select-none">
                {service.number}
              </span>

              <div className="relative">
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>

                {/* Content */}
                <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">
                  {service.subtitle}
                </p>
                <h3 className="text-xl font-bold mb-3 text-foreground">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li 
                      key={featureIndex}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {feature}
                    </li>
                  ))}
                </ul>


              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
