import dynamic from "next/dynamic"
import { Zap, TrendingUp, BarChart3 } from "lucide-react"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ServicesGrid } from "@/components/services-grid"
import { BookingSection } from "@/components/booking-section"

// Dynamic import for the heavy interactive banner
// Using ssr: true ensures the H1 is present in the initial HTML for SEO
const NitroBanner = dynamic(() => import("@/components/nitro-banner"), {
  ssr: true,
  loading: () => <div className="min-h-[80vh] w-full bg-background animate-pulse" />,
})

export default function Home() {
  const metrics = [
    { value: "150%", label: "Aumento de Eficiencia", suffix: "" },
    { value: "<200", label: "Infraestructura de Grado Militar", suffix: "ms" },
    { value: "99.9%", label: "Uptime de Sistemas", suffix: "" },
    { value: "50+", label: "Sistemas Automatizados", suffix: "" },
  ]

  const whyItems = [
    {
      icon: Zap,
      title: "Velocidad Obsesiva",
      desc: "Infraestructura optimizada para tiempos de carga <200ms",
    },
    {
      icon: TrendingUp,
      title: "Escalabilidad Real",
      desc: "Arquitectura que soporta de 100 a 100,000 usuarios sin refactorización",
    },
    { icon: BarChart3, title: "ROI Medible", desc: "Tracking completo con dashboards en tiempo real" },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        {/* ISLA 1: Banner Interactivo */}
        <NitroBanner />
        
        {/* Metrics Bar - Server Component Content */}
        <section id="metricas" className="py-16 px-6 relative z-10">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center bg-background/50 backdrop-blur-sm p-4 rounded-lg">
                  <div className="text-5xl font-bold text-primary mb-2">
                    {metric.value}
                    {metric.suffix}
                  </div>
                  <div className="text-muted-foreground">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ISLA 2: Services Grid (Interactive) */}
        <ServicesGrid />

        {/* Why Section - Server Component Content */}
        <section className="py-24 px-6 bg-secondary/30">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-5xl font-bold mb-6 leading-tight text-balance">
                  Por qué las empresas que escalan nos eligen
                </h2>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Somos tus socios estratégicos de infraestructura. Integramos estrategia de negocio con ingeniería avanzada para automatizar tu éxito.
                </p>
                <div className="space-y-6">
                  {whyItems.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 p-3 bg-primary/10 rounded-lg h-fit">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-card border border-border rounded-lg p-8">
                <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-6">
                    <p className="text-lg italic text-muted-foreground mb-4">
                      "Pasamos de facturar $50K mensuales a $500K en 8 meses. La infraestructura que construyeron aguantó
                      el Black Friday sin un solo problema."
                    </p>
                    <div className="font-bold">— CEO, Ecommerce de Moda</div>
                    <div className="text-sm text-muted-foreground">500% crecimiento en 8 meses</div>
                  </div>
                  <div className="border-l-4 border-primary pl-6">
                    <p className="text-lg italic text-muted-foreground mb-4">
                      "No son developers, son arquitectos. Entendieron nuestro modelo de negocio y construyeron algo que
                      escala con nosotros."
                    </p>
                    <div className="font-bold">— Fundador, Tech Startup</div>
                    <div className="text-sm text-muted-foreground">De MVP a Serie A en 12 meses</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ISLA 3: Booking Section (Interactive) */}
        <BookingSection />

      </main>

      <Footer />
    </div>
  )
}
