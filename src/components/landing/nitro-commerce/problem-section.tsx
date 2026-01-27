import { AlertTriangle, Clock, Users, Frown, TrendingDown } from "lucide-react"

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
      icon: Clock,
      title: "Tu página web no trabaja para ti",
      description: "Tienes un sitio web pero no genera contactos. Los visitantes llegan, miran y se van. Es como tener un local en el mejor centro comercial pero con las luces apagadas.",
    },
    {
      icon: Users,
      title: "Pierdes clientes frente a la competencia",
      description: `Mientras tú luchas por conseguir clientes, otros ${pSEO.nichoPlural} en ${pSEO.ciudad} están llenando sus agendas con presencia online que convierte.`,
    },
    {
      icon: Frown,
      title: "La tecnología te frustra",
      description: "Has intentado con agencias, freelancers, hasta plantillas. Prometen mucho, entregan poco, y terminas con más problemas que soluciones.",
    },
    {
      icon: TrendingDown,
      title: "Inviertes pero no ves resultados",
      description: "Gastas en publicidad, redes sociales, Google Ads... pero sin una base digital sólida, es como llenar un balde con huecos. El dinero se escapa.",
    },
  ]

  return (
    <section className="py-20 md:py-32 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-destructive/5 to-background" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 border border-destructive/20 mb-6">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">Seamos honestos</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Cada día que pasa sin una presencia digital efectiva, 
            <span className="text-destructive"> estás dejando dinero en la mesa</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            No es tu culpa. La mayoría de soluciones digitales están diseñadas por 
            tecnólogos que no entienden de negocios. Hablan de &quot;stacks&quot; y &quot;frameworks&quot; 
            cuando tú solo quieres <strong className="text-foreground">más clientes y menos complicaciones</strong>.
          </p>
        </div>

        {/* Problem Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="group p-6 rounded-xl border border-border bg-card/50 hover:border-destructive/30 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-destructive/10 text-destructive group-hover:bg-destructive/20 transition-colors">
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
          <p className="text-xl md:text-2xl text-foreground font-medium mb-4">
            &quot;¿Cuántos clientes potenciales te están buscando ahora mismo en Google... y encontrando a tu competencia?&quot;
          </p>
          <p className="text-muted-foreground">
            La buena noticia: tiene solución. Y es más simple de lo que imaginas.
          </p>
        </div>
      </div>
    </section>
  )
}
