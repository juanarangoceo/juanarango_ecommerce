import { 
  Users, 
  Clock, 
  TrendingUp, 
  Shield,
  Smartphone,
  Search,
  HeartHandshake,
  Zap
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
      title: "Más clientes, menos esfuerzo",
      description: "Tu presencia online atrae clientes de forma automática. Tú te enfocas en lo que mejor sabes hacer.",
      highlight: "3x",
    },
    {
      icon: Clock,
      title: "Ahorra tiempo valioso",
      description: "Deja de perder horas en llamadas que no llegan a nada. Recibe contactos calificados listos para comprar.",
      highlight: "-70%",
    },
    {
      icon: TrendingUp,
      title: "Crece de forma predecible",
      description: "Sal del ciclo de meses buenos y meses malos. Construye un flujo constante de nuevos clientes.",
      highlight: "+150%",
    },
    {
      icon: Shield,
      title: "Tranquilidad total",
      description: "Olvídate de preocuparte por tu sitio web. Nosotros lo mantenemos funcionando perfecto 24/7.",
      highlight: "0",
    },
    {
      icon: Smartphone,
      title: "Perfecto en cualquier pantalla",
      description: "Tu negocio se ve profesional tanto en el celular de tus clientes como en una computadora.",
      highlight: "100%",
    },
    {
      icon: Search,
      title: `Apareces en Google en ${pSEO.ciudad}`,
      description: "Cuando alguien busca lo que ofreces en tu zona, te encuentran a ti primero, no a tu competencia.",
      highlight: "#1",
    },
    {
      icon: HeartHandshake,
      title: "Genera confianza instantánea",
      description: "Una presencia profesional comunica que eres serio y confiable antes de la primera conversación.",
      highlight: "5★",
    },
    {
      icon: Zap,
      title: "Rápido de implementar",
      description: "No esperes meses para ver resultados. Tu nueva presencia digital está lista en semanas, no años.",
      highlight: "4 sem",
    },
  ]

  return (
    <section id="beneficios" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Lo que realmente importa: 
            <span className="text-primary"> resultados para tu negocio</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            No te abrumamos con jerga técnica. Te entregamos lo que necesitas: 
            más clientes, menos complicaciones, y la tranquilidad de saber que 
            tu presencia digital está en buenas manos.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group p-6 rounded-xl border border-border bg-card/30 hover:bg-card/60 hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <benefit.icon className="w-5 h-5" />
                </div>
                <span className="text-2xl font-bold text-primary">
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
