import dynamic from "next/dynamic"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { ServicesGrid } from "@/components/services-grid"
import { BookingSection } from "@/components/booking-section"
import { Zap, TrendingUp, BarChart3 } from "lucide-react"

// OPTIMIZACIÓN NITRO: Carga dinámica (Lazy Load)
// Esto aísla el código pesado de animaciones (Cliente) del renderizado inicial (Servidor).
const NitroBanner = dynamic(
  () => import("@/components/nitro-banner").then((mod) => mod.NitroBanner),
  {
    ssr: true, // Mantenemos SSR para que el H1 sea legible por Google
    loading: () => (
      // Skeleton de carga para evitar CLS (Saltos de diseño)
      <div className="h-[600px] w-full bg-background/50 flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground font-mono text-sm">Cargando experiencia Nitro...</div>
      </div>
    ),
  }
)

export default function Page() {
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
    <div className="flex flex-col min-h-screen font-sans selection:bg-primary selection:text-primary-foreground">
      {/* 1. SHELL: Navbar de Servidor (Carga Instantánea) */}
      <Navbar />

      {/* Aurora Background */}
      {/* Aurora Background & Virtual Mesh - Optimized */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[#050505]">
        {/* Optimized SVG Mesh Pattern - Lightweight & GPU friendly */}
        <div className="absolute inset-0 opacity-[0.03]"
             style={{
               backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415-.828-.828-.828.828-1.415-1.415.828-.828-.828-.828 1.415-1.415.828.828.828-.828 1.415 1.415-.828.828zM22.485 0l.83.828-1.415 1.415-.828-.828-.828.828-1.415-1.415.828-.828-.828-.828 1.415-1.415.828.828.828-.828 1.415 1.415-.828.828zM0 22.485l.828.83-1.415 1.415-.828-.828-.828.828L-2.83 22.485l.828-.828-.828-.828 1.415-1.415.828.828.828-.828 1.415 1.415-.828.828zM0 54.627l.828.83-1.415 1.415-.828-.828-.828.828L-2.83 54.627l.828-.828-.828-.828 1.415-1.415.828.828.828-.828 1.415 1.415-.828.828zM56.627 60V0h-3.254v60h3.254zM24.485 60V0h-3.254v60h3.254zM0 60V0h-3.254v60h3.254zM60 27.74H0v-3.254h60v3.254zM60 59.882H0v-3.254h60v3.254zM60 0H0V-3.254h60V0z' fill='%23ffffff' fill-opacity='1' fill-rule='evenodd'/%3E%3C/svg%3E")`
             }}
        />
        
        {/* Blobs - opacity reduced for better text contrast */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[100px] animate-aurora-1 opacity-20" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/10 blur-[100px] animate-aurora-2 opacity-20" />
        
        {/* Noise - kept for texture but very subtle */}
        <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
      </div>
      
      <main className="flex-1 flex flex-col">
        {/* 2. ISLA: Banner Interactivo (Carga Diferida) */}
        <NitroBanner />

        {/* 3. CONTENIDO: Espacio preparado para secciones estáticas (SEO) */}
        
        {/* Metrics Bar - Server Component Content */}
        <section id="resultados" className="py-12 md:py-24 px-6 relative z-10 border-y border-white/5 bg-white/[0.02]">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {metrics.map((metric, index) => (
                <div key={index} className="text-center group">
                  <div className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-primary to-emerald-600 mb-3 tracking-tight">
                    {metric.value}
                    <span className="text-3xl text-primary/50 ml-1 align-top">{metric.suffix}</span>
                  </div>
                  <div className="text-xs uppercase tracking-widest text-slate-500 font-medium">{metric.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ISLA 2: Services Grid (Interactive) */}
        <ServicesGrid />

        {/* Why Section - Server Component Content */}
        <section className="py-16 md:py-24 px-6 bg-secondary/30">
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

        {/* ISLA 3: Booking Section (Interactive) */}
        <div id="contacto">
            <BookingSection />
        </div>

      </main>

      {/* 4. SHELL: Footer de Servidor */}
      <Footer />
    </div>
  )
}
