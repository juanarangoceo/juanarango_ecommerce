"use client"

import {
  Users,
  Clock,
  TrendingUp,
  Shield,
  Smartphone,
  Search,
  HeartHandshake,
  Zap,
} from "lucide-react"

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

interface BenefitsSectionProps {
  pSEO: PSEOVariables
}

export function BenefitsSection({ pSEO }: BenefitsSectionProps) {
  const benefits = [
    {
      icon: Users,
      title: "Prospectos calificados",
      description:
        "Recibes contactos de compradores reales con capacidad de compra, no curiosos que solo preguntan.",
      highlight: "3x",
    },
    {
      icon: Clock,
      title: "Ahorra tiempo valioso",
      description:
        "Deja de perder horas con prospectos frios. Tu equipo solo atiende compradores listos para actuar.",
      highlight: "-70%",
    },
    {
      icon: TrendingUp,
      title: "Crecimiento predecible",
      description:
        "Sal del ciclo de meses buenos y malos. Construye un flujo constante de nuevos compradores.",
      highlight: "+150%",
    },
    {
      icon: Shield,
      title: "Tranquilidad total",
      description:
        "Olvidate de preocuparte por tu sitio web o tus fichas. Nosotros lo mantenemos perfecto.",
      highlight: "24/7",
    },
    {
      icon: Smartphone,
      title: "Impecable en cualquier pantalla",
      description:
        "Tu catalogo de propiedades se ve profesional tanto en el celular como en escritorio.",
      highlight: "100%",
    },
    {
      icon: Search,
      title: `Apareces en Google en ${pSEO.ciudad}`,
      description:
        "Cuando alguien busca propiedades en tu zona, te encuentran a ti primero.",
      highlight: "#1",
    },
    {
      icon: HeartHandshake,
      title: "Confianza instantanea",
      description:
        "Una presencia profesional comunica solidez y seriedad antes de la primera llamada.",
      highlight: "5 est.",
    },
    {
      icon: Zap,
      title: "Implementacion rapida",
      description:
        "No esperes meses. Tu nueva presencia digital esta lista en semanas, no anos.",
      highlight: "4 sem",
    },
  ]

  return (
    <section id="beneficios" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
            {"Lo que realmente importa: "}
            <span className="text-accent">resultados para tu inmobiliaria</span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            No te abrumamos con jerga tecnica. Te entregamos mas compradores,
            menos complicaciones y la tranquilidad de saber que tu presencia
            digital esta en las mejores manos.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border border-border bg-card hover:border-accent/30 hover:shadow-sm transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-lg bg-primary/8 text-primary group-hover:bg-primary/12 transition-colors">
                  <benefit.icon className="w-5 h-5" />
                </div>
                <span className="font-serif text-2xl font-bold text-accent">
                  {benefit.highlight}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-foreground mb-2">
                {benefit.title}
              </h3>

              <p className="text-sm text-muted-foreground leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
