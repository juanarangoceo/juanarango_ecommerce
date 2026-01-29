import { Badge } from "@/components/ui/badge"
import { 
  Terminal, 
  TrendingUp, 
  Globe,
  Award
} from "lucide-react"

const credentials = [
  {
    icon: Terminal,
    label: "+8 AÑOS",
    title: "Full Stack Engineering",
    description: "Arquitectura de software escalable. Desde monolitos hasta microservicios distribuidos."
  },
  {
    icon: TrendingUp,
    label: "$10M+",
    title: "Revenue Generado",
    description: "Sistemas diseñados para procesar millones en transacciones sin caídas durante picos de tráfico."
  },
  {
    icon: Globe,
    label: "GLOBAL",
    title: "Liderazgo Técnico",
    description: "Dirigiendo equipos remotos de alto rendimiento en LATAM y USA."
  }
]

export function About() {
  return (
    <section 
      id="sobre-mi" 
      className="py-20 lg:py-32 bg-card scroll-mt-20"
      aria-labelledby="about-title"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Story */}
          <div>
            <Badge 
              variant="outline" 
              className="mb-6 px-4 py-2 border-primary/30 text-primary bg-primary/5"
            >
              <Award className="w-3 h-3 mr-2" />
              Ingeniero de Escalamiento
            </Badge>

            <h2 
              id="about-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              No soy solo un developer.{" "}
              <span className="text-primary">Soy tu socio técnico.</span>
            </h2>

            <div className="space-y-4 text-muted-foreground">
              <p>
                Mi nombre es <strong className="text-foreground">Juan Arango</strong>. 
                Me especializo en tomar negocios que ya funcionan y reconstruir su infraestructura técnica 
                para que puedan escalar x10 sin romperse.
              </p>
              <p>
                Con <strong className="text-foreground">más de 20 años haciendo estrategias de comercio electrónico</strong>, 
                he facturado millones en marketplaces, lanzado marcas propias y escalado negocios para empresas 
                que hoy son líderes en sus industrias.
              </p>
              <p>
                Combino <strong className="text-foreground">estrategia de negocio</strong> con{" "}
                <strong className="text-foreground">ingeniería de software avanzada</strong>. 
                No entrego código; entrego sistemas que imprimen eficiencia y facturación.
              </p>
            </div>

            <blockquote className="mt-8 pl-4 border-l-2 border-primary italic text-muted-foreground">
              {"\"La velocidad es la nueva moneda del comercio digital.\""}
            </blockquote>
          </div>

          {/* Right Column - Credentials */}
          <div className="space-y-4">
            {credentials.map((credential, index) => (
              <article 
                key={index}
                className="p-6 rounded-xl border border-border bg-background hover:border-primary/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <credential.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
                      {credential.label}
                    </p>
                    <h3 className="text-lg font-semibold mb-1 text-foreground">
                      {credential.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {credential.description}
                    </p>
                  </div>
                </div>
              </article>
            ))}

            {/* Additional trust elements */}
            <div className="mt-8 p-6 rounded-xl border border-border bg-background/50">
              <p className="text-sm text-muted-foreground mb-4">Tecnologías que domino:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js", "React", "Node.js", "TypeScript", 
                  "AWS", "Vercel", "OpenAI", "PostgreSQL",
                  "Headless CMS", "Shopify Plus"
                ].map((tech) => (
                  <span 
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
