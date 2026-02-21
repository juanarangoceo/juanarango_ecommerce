import { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, BookOpen } from "lucide-react"

export const metadata: Metadata = {
  title: "Guías Gratuitas | E-commerce y Negocios Online",
  description: "Aprende todo lo necesario para escalar tu comercio electrónico con nuestras guías completas paso a paso.",
  openGraph: {
    title: "Guías Gratuitas | E-commerce y Negocios Online",
    description: "Aprende todo lo necesario para escalar tu comercio electrónico con nuestras guías completas paso a paso.",
    url: "https://nitro-commerce.com/guias",
    siteName: "Nitro Commerce",
    locale: "es_ES",
    type: "website",
  },
}

const guides = [
  {
    title: "Guía Definitiva Shopify 2024",
    description: "Aprende paso a paso cómo crear y configurar tu tienda Shopify desde cero. Guía completa con prompts de IA, estrategias y configuración.",
    href: "/guias/shopify",
    image: "/visual/shopify-guide-thumb.jpg", // Placeholder until an image exists
    badge: "Nuevo"
  },
  // Add more guides here in the future
]

export default function GuiasIndexPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-6xl">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
            Guías <span className="text-primary">Especializadas</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Domina el comercio electrónico, el marketing digital y las operaciones con nuestras completas guías paso a paso.
          </p>
        </header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {guides.map((guide, idx) => (
            <Link 
              key={idx} 
              href={guide.href}
              className="group block bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1"
            >
              <div className="aspect-[16/9] w-full bg-gradient-to-br from-primary/20 to-indigo-900/30 relative flex items-center justify-center border-b border-white/5 overflow-hidden">
                <BookOpen className="w-16 h-16 text-primary/80 group-hover:scale-110 group-hover:text-primary transition-transform duration-500 ease-out" />
                {guide.badge && (
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full z-10 shadow-lg">
                    {guide.badge}
                  </span>
                )}
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                  {guide.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                  {guide.description}
                </p>
                <div className="flex items-center text-primary font-semibold text-sm tracking-wide">
                  Comenzar Guía
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
