"use client"

import { AlertTriangle, Clock, Users, TrendingDown, Eye } from "lucide-react"

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

interface ProblemSectionProps {
  pSEO: PSEOVariables
}

export function ProblemSection({ pSEO }: ProblemSectionProps) {
  const problems = [
    {
      icon: Eye,
      title: "Tu inventario es invisible online",
      description:
        "Tienes propiedades increibles, pero nadie las encuentra. Los compradores buscan en Google y encuentran a tu competencia antes que a ti.",
    },
    {
      icon: Users,
      title: "Pierdes compradores frente a la competencia",
      description: `Mientras tu dependes del boca a boca, otras ${pSEO.nichoPlural} en ${pSEO.ciudad} llenan sus agendas con prospectos que llegan solos por internet.`,
    },
    {
      icon: Clock,
      title: "Gastas tiempo en prospectos no calificados",
      description:
        "Recibes llamadas de curiosos que no tienen capacidad de compra. Tu equipo pierde horas con personas que nunca cerraran.",
    },
    {
      icon: TrendingDown,
      title: "Tu inversion en publicidad no rinde",
      description:
        "Inviertes en portales, redes sociales y anuncios, pero sin una base digital solida es como construir sobre arena. El dinero se va y los resultados no llegan.",
    },
  ]

  return (
    <section id="problema" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/8 border border-destructive/15 mb-6">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">
              La realidad del mercado inmobiliario
            </span>
          </div>

          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
            {"Cada dia que pasa sin presencia digital, "}
            <span className="text-destructive">estas perdiendo ventas</span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {"No es tu culpa. La mayoria de soluciones digitales para inmobiliarias son genericas y no entienden la dinamica del negocio. Hablan de "}
            <em>{"\"clics\""}</em>
            {" y "}
            <em>{"\"impresiones\""}</em>
            {" cuando tu solo quieres "}
            <strong className="text-foreground">
              cerrar mas propiedades y captar mejores clientes
            </strong>
            .
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="group p-6 rounded-xl border border-border bg-card hover:border-destructive/20 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-destructive/8 text-destructive group-hover:bg-destructive/12 transition-colors flex-shrink-0">
                  <problem.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {problem.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emotional Hook */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="font-serif text-xl md:text-2xl text-foreground font-medium mb-4 text-balance">
            {
              '"Cuantos compradores te estan buscando ahora mismo en Google... y encontrando a tu competencia?"'
            }
          </p>
          <p className="text-muted-foreground">
            La buena noticia: tiene solucion. Y es mas simple de lo que imaginas.
          </p>
        </div>
      </div>
    </section>
  )
}
