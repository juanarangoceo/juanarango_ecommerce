import dynamic from "next/dynamic"
import Link from "next/link"
import { Metadata } from "next"
import { NitroBanner } from "@/components/nitro-banner"
import { ServicesGrid } from "@/components/services-grid"
import { NitroBusinessGrid } from "@/components/nitro-business-grid"
import { MetricsIsland } from "@/components/metrics-island"
import { AboutSection } from "@/components/about-section"
import { ContactForm } from "@/components/ui/contact-form"
import { Zap, TrendingUp, BarChart3 } from "lucide-react"
import { LatestPostsSection } from "@/components/landing/latest-posts-section"

export const metadata: Metadata = {
  title: 'Nitro Ecom | Infraestructura Digital de Alto Rendimiento',
  description: 'Transformamos negocios con tecnología de velocidad obsesiva. E-commerce, automatización y consultoría estratégica.',
  alternates: {
    canonical: 'https://www.juanarangoecommerce.com'
  },
  openGraph: {
    title: 'Nitro Ecom | Infraestructura Digital de Alto Rendimiento',
    description: 'Transformamos negocios con tecnología de velocidad obsesiva. E-commerce, automatización y consultoría estratégica.',
    url: 'https://www.juanarangoecommerce.com',
    siteName: 'Nitro Ecom',
    type: 'website',
    locale: 'es_CO',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nitro Ecom | Infraestructura Digital de Alto Rendimiento',
    description: 'Transformamos negocios con tecnología de velocidad obsesiva. E-commerce, automatización y consultoría estratégica.',
  }
}

// NitroBanner: Importado estáticamente para que el Hero (LCP element) esté en el HTML inicial.
// Esto elimina el skeleton de carga que retrasaba el LCP en móviles.

const AnimatedBanner = dynamic(
  () => import("@/components/ui/animated-banner").then((mod) => mod.AnimatedBanner)
)

export const revalidate = 3600; // Cache homepage for 1 hour

export default function Page() {
  const metrics = [
    { value: 150, suffix: "%", label: "Aumento de Eficiencia" },
    { value: 200, prefix: "<", suffix: "ms", label: "Infraestructura de Grado Militar" },
    { value: 99.9, suffix: "%", label: "Uptime de Sistemas", decimals: 1 },
    { value: 50, suffix: "+", label: "Sistemas Automatizados" },
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
    <div className="flex flex-col min-h-screen font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Impact.com Site Verification */}
      <p className="sr-only">Impact-Site-Verification: edd0ee3e-a913-4b07-8829-d13195efdd99</p>
      
      {/* Notification Bar */}
      <div className="w-full bg-teal-950/30 border-b border-teal-500/20 py-1.5 text-center relative z-40 backdrop-blur-sm">
        <Link 
          href="/soluciones/clinicas" 
          className="text-xs md:text-sm text-teal-400 hover:text-teal-300 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"/>
          Soluciones especializadas para Clínicas 
          <span aria-hidden="true" className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
        </Link>
      </div>

      {/* Aurora Background */}
      {/* Aurora Background & Virtual Mesh - Optimized */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#050505]">
        
        {/* Blobs - hidden on mobile for LCP performance, animated on desktop */}
        <div className="hidden md:block absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[100px] animate-aurora-1 opacity-20" />
        <div className="hidden md:block absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[100px] animate-aurora-2 opacity-20" />
        

      </div>
      
      <main className="flex-1 flex flex-col">
        {/* 2. ISLA: Banner Interactivo (Carga Diferida) */}
        <NitroBanner />

        {/* 3. CONTENIDO: Espacio preparado para secciones estáticas (SEO) */}
        
        {/* Metrics Bar - Client Component Island */}
        <MetricsIsland metrics={metrics} />

        {/* About Section - Server Component */}
        <AboutSection />

        {/* ISLA 2: Services Grid (Interactive) */}
        <ServicesGrid />

        {/* ISLA 2.5: Nitro Negocios (Verticals) */}
        <NitroBusinessGrid />

        {/* Animated Banner from External Source - Desktop Only */}
        <div className="hidden md:block">
          <AnimatedBanner />
        </div>

        {/* Why Section - Server Component Content */}
        <section className="py-12 md:py-24 px-6 bg-secondary/30">
          <div className="container mx-auto max-w-7xl">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-balance">
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

      {/* ISLA 3: Contact Form (Replazo de Booking) */}
        <div id="contacto" className="py-12 md:py-24 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Hablemos de Escalar</h2>
              <p className="text-xl text-muted-foreground">
                Déjanos tus datos. Te contactaremos para una auditoría inicial.
              </p>
            </div>
            <ContactForm />
          </div>
        </div>

        {/* Latest Blog Posts */}
        <LatestPostsSection />
      </main>
    </div>
  )
}
