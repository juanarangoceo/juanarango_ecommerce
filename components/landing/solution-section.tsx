"use client"

import {
  CheckCircle2,
  Sparkles,
  Clock,
  TrendingUp,
  ArrowRight,
} from "lucide-react"
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
      title: "Presencia que genera confianza",
      description:
        "Creamos una presencia digital que refleja el profesionalismo de tu inmobiliaria. Cuando un comprador te encuentra, sabe que esta en el lugar correcto.",
      benefits: [
        "Catalogo de propiedades con fichas profesionales",
        "Posicionamiento en Google para tu zona",
        "Se ve impecable en movil y escritorio",
      ],
    },
    {
      icon: Clock,
      title: "Tu inventario visible 24/7",
      description:
        "Tu presencia digital trabaja mientras duermes. Los compradores pueden explorar tu inventario, agendar visitas y contactarte a cualquier hora.",
      benefits: [
        "Formularios inteligentes que califican prospectos",
        "Fichas de propiedades siempre actualizadas",
        "Integracion con WhatsApp para respuesta inmediata",
      ],
    },
    {
      icon: TrendingUp,
      title: "Resultados que puedes medir",
      description:
        "Nada de metricas confusas. Te mostramos lo que importa: cuantos prospectos llegan, cuales propiedades generan mas interes, y como crece tu negocio.",
      benefits: [
        "Dashboard simple con tus numeros clave",
        "Reportes mensuales claros y accionables",
        "Estrategias basadas en datos reales del mercado",
      ],
    },
  ]

  return (
    <section id="solucion" className="py-20 md:py-28 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">
              La solucion NitroCommerce
            </span>
          </div>

          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
            {"Transformamos tu inmobiliaria en una "}
            <span className="text-accent">maquina de captar clientes</span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Sin complicaciones tecnicas. Sin jerga confusa. Solo resultados claros
            para tu {pSEO.nicho} en{" "}
            <span className="text-foreground font-medium">{pSEO.ciudad}</span>.
          </p>
        </div>

        {/* Solution Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {solutions.map((solution, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl border border-border bg-card hover:border-accent/30 hover:shadow-md transition-all duration-300"
            >
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-4 group-hover:bg-accent/15 transition-colors">
                  <solution.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {solution.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {solution.description}
                </p>
              </div>

              <ul className="space-y-3">
                {solution.benefits.map((benefit, benefitIndex) => (
                  <li key={benefitIndex} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Comparison */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl border border-destructive/20 bg-card">
              <h4 className="font-semibold text-foreground mb-4">
                Sin NitroCommerce:
              </h4>
              <ul className="space-y-2.5 text-muted-foreground text-sm">
                <li>- Propiedades que nadie ve online</li>
                <li>- Prospectos frios que nunca cierran</li>
                <li>- Competencia que te gana los compradores</li>
                <li>- Frustracion con tecnologia que no funciona</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl border border-accent/30 bg-accent/5">
              <h4 className="font-semibold text-foreground mb-4">
                Con NitroCommerce:
              </h4>
              <ul className="space-y-2.5 text-sm">
                <li className="text-foreground">
                  + Catalogo profesional que genera confianza
                </li>
                <li className="text-foreground">
                  + Prospectos calificados llegando constantemente
                </li>
                <li className="text-foreground">
                  + Diferenciacion clara de tu competencia
                </li>
                <li className="text-foreground">
                  + Tranquilidad de que tu digital esta resuelto
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium group"
          >
            <Link href="#contacto">
              Quiero esto para mi inmobiliaria
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
