import { CheckCircle2, Sparkles, Clock, TrendingUp, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface PSEOVariables {
  ciudad: string
  departamento: string
  nicho: string
  nichoPlural: string
  subtituloContextual: string
  textoAutoridad: string
  mencionLocal: string
  parrafoValor: string
}

interface SolutionSectionProps {
  pSEO: PSEOVariables
}

export function SolutionSection({ pSEO }: SolutionSectionProps) {
  const solutions = [
    {
      icon: Sparkles,
      title: "Tu negocio, visible y profesional",
      description: "Creamos una presencia online que refleja la calidad de tu trabajo. Cuando un cliente potencial te encuentra, sabe inmediatamente que está en el lugar correcto.",
      benefits: [
        "Diseño que transmite confianza y profesionalismo",
        "Fácil de encontrar en Google",
        "Se ve perfecto en celulares y computadoras",
      ],
    },
    {
      icon: Clock,
      title: "Abierto 24 horas, 7 días a la semana",
      description: "Tu presencia digital trabaja mientras duermes. Los clientes pueden conocerte, ver tus servicios y contactarte a cualquier hora, sin que tengas que hacer nada.",
      benefits: [
        "Formularios de contacto inteligentes",
        "Información siempre actualizada",
        "Respuestas automáticas para no perder ningún lead",
      ],
    },
    {
      icon: TrendingUp,
      title: "Resultados que puedes medir",
      description: "Nada de métricas confusas. Te mostramos lo que importa: cuántas personas te contactan, de dónde vienen, y cómo tu inversión se convierte en clientes reales.",
      benefits: [
        "Dashboard simple con tus números clave",
        "Reportes mensuales en español claro",
        "Estrategias basadas en datos, no corazonadas",
      ],
    },
  ]

  return (
    <section id="solucion" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-1/2 left-0 w-1/2 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">La solución NitroCommerce</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Transformamos tu presencia digital en una 
            <span className="text-primary"> máquina de atraer clientes</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Sin complicaciones técnicas. Sin jerga confusa. Solo resultados claros 
            para tu {pSEO.nicho} en <span className="text-foreground font-medium">{pSEO.ciudad}</span>.
          </p>
        </div>

        {/* Solution Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <div 
              key={index}
              className="group p-8 rounded-2xl border border-border bg-card/50 hover:border-primary/30 hover:shadow-[0_0_30px_rgba(34,197,94,0.1)] transition-all duration-300"
            >
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                  <solution.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {solution.title}
                </h3>
                <p className="text-muted-foreground">
                  {solution.description}
                </p>
              </div>
              
              <ul className="space-y-3">
                {solution.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Simple Comparison */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-destructive/30 bg-destructive/5">
              <h4 className="font-semibold text-foreground mb-4">Sin NitroCommerce:</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>- Clientes que no te encuentran online</li>
                <li>- Sitio web que no genera contactos</li>
                <li>- Competencia que te gana los clientes</li>
                <li>- Frustración con tecnología que no funciona</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-primary/30 bg-primary/5">
              <h4 className="font-semibold text-foreground mb-4">Con NitroCommerce:</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li className="text-foreground">+ Presencia profesional que genera confianza</li>
                <li className="text-foreground">+ Contactos llegando de forma constante</li>
                <li className="text-foreground">+ Diferenciación clara de tu competencia</li>
                <li className="text-foreground">+ Tranquilidad de que tu digital está resuelto</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_rgba(34,197,94,0.3)] group"
          >
            <Link href="#contacto">
              Quiero esto para mi negocio
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Consulta inicial 100% gratuita. Sin compromisos.
          </p>
        </div>
      </div>
    </section>
  )
}
