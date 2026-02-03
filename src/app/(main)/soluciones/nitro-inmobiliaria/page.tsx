import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { ContactForm } from "@/components/ui/contact-form";
import { 
  Building2, 
  Eye, 
  Users, 
  BarChart3, 
  ArrowRight,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  Clock
} from "lucide-react";
import { DemoConfigurator } from "./_components/demo-configurator";

export const metadata: Metadata = {
  title: "Nitro Inmobiliaria | Plataforma Web de Alto Rendimiento para Inmobiliarias",
  description: "Convierte tu sitio web inmobiliario en una máquina de ventas. Captación inteligente de leads, automatización de seguimiento y tecnología que multiplica tus conversiones. Soluciones digitales para el sector inmobiliario.",
  keywords: [
    "plataforma web para inmobiliarias",
    "sitio web inmobiliario alto rendimiento",
    "captación de leads inmobiliarios",
    "marketing digital inmobiliario",
    "web para venta de propiedades",
    "automatización inmobiliaria",
    "conversión leads inmobiliarios Colombia"
  ],
  alternates: {
    canonical: 'https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria'
  },
  openGraph: {
    title: "Nitro Inmobiliaria | Plataforma Digital para Desarrollos Inmobiliarios",
    description: "Convierte tu sitio web inmobiliario en una máquina de ventas con captación inteligente de leads y automatización que multiplica conversiones.",
    url: 'https://www.juanarangoecommerce.com/soluciones/nitro-inmobiliaria',
    type: 'website',
    locale: 'es_CO',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nitro Inmobiliaria | Plataforma Digital para Desarrollos Inmobiliarios",
    description: "Convierte tu sitio web inmobiliario en una máquina de ventas con captación inteligente de leads y automatización que multiplica conversiones.",
  }
};

export default function NitroInmobiliariaPage() {
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Plataforma Digital Inmobiliaria",
            "provider": {
              "@type": "Organization",
              "name": "Nitro Ecom",
              "url": "https://www.juanarangoecommerce.com"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Colombia"
            },
            "description": "Soluciones digitales de alto rendimiento para desarrollos inmobiliarios: webs optimizadas, captación de leads y automatización de ventas"
          })
        }}
      />

      <main className="min-h-screen bg-black text-white selection:bg-blue-500/30">
        <Navbar />

        {/* --- STAGE 1: AWARENESS - HERO SECTION --- */}
        <section className="relative pt-32 pb-20 overflow-hidden border-b border-white/5">
          {/* Premium Gradient Background - Blue to Gold */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/30 via-black to-black pointer-events-none" />
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-amber-500/10 to-transparent blur-3xl pointer-events-none" />
          
          <div className="container mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left Column: Copy */}
              <div className="max-w-4xl lg:max-w-none order-1">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/40 border border-blue-500/30 text-blue-400 text-sm font-medium mb-6">
                  <Building2 className="w-4 h-4" />
                  <span>Especializado en Sector Inmobiliario</span>
                </div>
                
                {/* H1 - Primary SEO Target */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-white leading-[1.1]">
                  Tu Sitio Web Inmobiliario{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-amber-500">
                    Que Vende 24/7
                  </span>
                </h1>
                
                {/* Value Proposition */}
                <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
                  No más webs que solo muestran propiedades. Construimos{" "}
                  <strong className="text-blue-400">plataformas de alto rendimiento</strong> que captan, califican y convierten leads automáticamente.{" "}
                  <strong className="text-blue-400">Tu equipo vende, nosotros multiplicamos resultados.</strong>
                </p>

                {/* Stats Row */}
                <div className="grid grid-cols-3 gap-6 mb-10 max-w-xl">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-1">3x</div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider">Más Leads Calificados</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-amber-400 mb-1">90+</div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider">Performance Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400 mb-1">50%</div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider">Ciclo de Venta Reducido</div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="#contacto"
                    className="bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
                  >
                    Solicitar Auditoría Gratuita <ArrowRight className="w-4 h-4" />
                  </a>
                  <a 
                    href="#soluciones"
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold py-3 px-8 rounded-full transition-all"
                  >
                    Ver Soluciones
                  </a>
                </div>
              </div>

              {/* Right Column: Configurator */}
              <div className="order-2 w-full max-w-md mx-auto lg:max-w-none">
                <DemoConfigurator />
              </div>
            </div>
          </div>
        </section>

        {/* --- STAGE 2: INTEREST - BENEFITS GRID --- */}
        <section id="beneficios" className="py-24 bg-zinc-950/50">
          <div className="container mx-auto px-6">
            {/* Section Header */}
            <div className="text-center mb-16 max-w-3xl mx-auto">
              <span className="text-blue-400 font-mono tracking-widest text-sm uppercase mb-2 block">Por Qué Nitro Inmobiliaria</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Tecnología que Multiplica tus Ventas
              </h2>
              <p className="text-xl text-zinc-400">
                Infraestructura digital diseñada específicamente para desarrollos inmobiliarios de alto valor
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Benefit 1: Web Performance */}
              <SpotlightCard 
                spotlightColor="rgba(59, 130, 246, 0.15)" 
                className="p-8 bg-blue-950/10 border-blue-500/20 hover:border-blue-500/40 transition-all"
              >
                <div className="p-3 bg-blue-500/10 rounded-xl w-fit mb-6">
                  <Clock className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Webs de Alto Rendimiento</h3>
                <p className="text-zinc-400 leading-relaxed mb-4">
                  Sitios web optimizados que cargan en menos de 1 segundo. Tus clientes no esperan, y Google premia la velocidad con mejor posicionamiento y más tráfico orgánico.
                </p>
                <ul className="space-y-2 text-sm text-zinc-500">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Performance 90+ en Google Lighthouse</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>SEO optimizado para posicionamiento local</span>
                  </li>
                </ul>
              </SpotlightCard>

              {/* Benefit 2: Lead Qualification */}
              <SpotlightCard 
                spotlightColor="rgba(59, 130, 246, 0.15)" 
                className="p-8 bg-blue-950/10 border-blue-500/20 hover:border-blue-500/40 transition-all"
              >
                <div className="p-3 bg-amber-500/10 rounded-xl w-fit mb-6">
                  <Users className="w-10 h-10 text-amber-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Captación de Leads Inteligente</h3>
                <p className="text-zinc-400 leading-relaxed mb-4">
                  IA que califica automáticamente a tus prospectos según comportamiento, presupuesto e interés real. Solo hablas con compradores serios.
                </p>
                <ul className="space-y-2 text-sm text-zinc-500">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>Scoring automático de leads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
                    <span>Formularios inteligentes con validación</span>
                  </li>
                </ul>
              </SpotlightCard>

              {/* Benefit 3: Analytics */}
              <SpotlightCard 
                spotlightColor="rgba(59, 130, 246, 0.15)" 
                className="p-8 bg-blue-950/10 border-blue-500/20 hover:border-blue-500/40 transition-all"
              >
                <div className="p-3 bg-blue-500/10 rounded-xl w-fit mb-6">
                  <BarChart3 className="w-10 h-10 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-white">Dashboard en Tiempo Real</h3>
                <p className="text-zinc-400 leading-relaxed mb-4">
                  Métricas de rendimiento actualizadas al segundo. Visualiza qué propiedades generan más interés, de dónde vienen tus leads y cuál es tu ROI exacto.
                </p>
                <ul className="space-y-2 text-sm text-zinc-500">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Tracking de comportamiento de usuarios</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <span>Reportes automáticos semanales</span>
                  </li>
                </ul>
              </SpotlightCard>
            </div>
          </div>
        </section>

        {/* --- STAGE 3: DESIRE - SOLUTIONS DEEP DIVE --- */}
        <section id="soluciones" className="py-24 border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto">
              {/* Section Header */}
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  Soluciones Completas para Desarrollos Inmobiliarios
                </h2>
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                  Desde la captación hasta el cierre, automatizamos cada etapa del proceso de venta
                </p>
              </div>

              {/* Solutions Grid */}
              <div className="space-y-12">
                {/* Solution 1 */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <Sparkles className="w-6 h-6 text-blue-400" />
                      <h3 className="text-3xl font-bold text-white">Presencia Digital Premium</h3>
                    </div>
                    <p className="text-zinc-400 leading-relaxed mb-6">
                      Webs inmobiliarias que impresionan y convierten. Galerías de propiedades optimizadas, filtros inteligentes, y experiencia de usuario diseñada para que tus clientes encuentren su propiedad ideal en segundos.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300">Diseño responsive optimizado para móviles</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300">Galerías de imágenes de alta calidad</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300">Búsqueda avanzada con filtros inteligentes</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-blue-950/30 to-amber-950/20 border border-blue-500/20 rounded-2xl p-8 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <Building2 className="w-16 h-16 text-blue-400 mx-auto mb-4 opacity-50" />
                      <p className="text-zinc-500 text-sm">Plataforma web inmobiliaria</p>
                    </div>
                  </div>
                </div>

                {/* Solution 2 */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1 bg-gradient-to-br from-amber-950/20 to-blue-950/30 border border-amber-500/20 rounded-2xl p-8 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="w-16 h-16 text-amber-400 mx-auto mb-4 opacity-50" />
                      <p className="text-zinc-500 text-sm">Automatización de leads</p>
                    </div>
                  </div>
                  <div className="order-1 md:order-2">
                    <div className="flex items-center gap-3 mb-4">
                      <TrendingUp className="w-6 h-6 text-amber-400" />
                      <h3 className="text-3xl font-bold text-white">Automatización Inteligente</h3>
                    </div>
                    <p className="text-zinc-400 leading-relaxed mb-6">
                      Sistema que captura, califica y nutre leads automáticamente. Integración con WhatsApp, email y CRM para que tu equipo solo hable con prospectos listos para comprar.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300">Formularios inteligentes con validación</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300">Seguimiento automático por email y WhatsApp</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300">Scoring de leads con machine learning</span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Solution 3 */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <BarChart3 className="w-6 h-6 text-blue-400" />
                      <h3 className="text-3xl font-bold text-white">SEO y Posicionamiento</h3>
                    </div>
                    <p className="text-zinc-400 leading-relaxed mb-6">
                      Aparecer en Google cuando buscan propiedades es clave. Optimizamos tu web para posicionamiento local y keywords de alto valor. Más visibilidad = más leads orgánicos.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300">Optimización SEO técnica y de contenido</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300">Posicionamiento local (Google My Business)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                        <span className="text-zinc-300">Analytics y reportes de tráfico</span>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-blue-950/30 to-black border border-blue-500/20 rounded-2xl p-8 h-64 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-5xl font-bold text-blue-400 mb-2">#1</div>
                      <p className="text-zinc-500 text-sm">Posición en Google</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- COMPARISON TABLE --- */}
        <section className="py-20 bg-zinc-950/50">
          <div className="container mx-auto px-6 max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
              Nitro Inmobiliaria vs. Métodos Tradicionales
            </h2>
            <div className="space-y-4">
              {[
                { 
                  feature: "Captación de Leads", 
                  us: "Automática con IA", 
                  them: "Formularios básicos" 
                },
                { 
                  feature: "Calificación de Prospectos", 
                  us: "Scoring predictivo ML", 
                  them: "Manual por vendedor" 
                },
                { 
                  feature: "Experiencia de Visualización", 
                  us: "Galerías optimizadas HD", 
                  them: "Fotos estáticas / PDF" 
                },
                { 
                  feature: "Velocidad de Carga", 
                  us: "< 1 segundo", 
                  them: "3-8 segundos" 
                },
                { 
                  feature: "Analytics", 
                  us: "Dashboard en tiempo real", 
                  them: "Reportes mensuales" 
                },
                { 
                  feature: "Seguimiento", 
                  us: "Automatizado (Email + WhatsApp)", 
                  them: "Llamadas manuales" 
                },
              ].map((item, i) => (
                <div 
                  key={i} 
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-blue-500/20 transition-all items-center"
                >
                  <span className="font-semibold text-zinc-200">{item.feature}</span>
                  <span className="text-blue-400 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> {item.us}
                  </span>
                  <span className="text-zinc-600 line-through text-sm">{item.them}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- TESTIMONIALS / SOCIAL PROOF --- */}
        <section className="py-20 border-y border-white/5">
          <div className="container mx-auto px-6">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
                Desarrollos que Confían en Nitro
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Testimonial 1 */}
                <div className="bg-gradient-to-br from-blue-950/20 to-black border border-blue-500/20 rounded-xl p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">Grupo Constructor Premium</div>
                      <div className="text-sm text-zinc-500">Desarrollos de lujo en Bogotá</div>
                    </div>
                  </div>
                  <p className="text-zinc-400 italic leading-relaxed mb-4">
                    "La nueva web nos posicionó en Google y empezamos a recibir leads cualificados sin pagar publicidad. El ROI fue inmediato y sostenible."
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-blue-400 font-bold">+200% leads orgánicos</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-zinc-500">3 meses</span>
                  </div>
                </div>

                {/* Testimonial 2 */}
                <div className="bg-gradient-to-br from-amber-950/20 to-black border border-amber-500/20 rounded-xl p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <div className="font-bold text-white mb-1">Inmobiliaria Horizonte</div>
                      <div className="text-sm text-zinc-500">Proyectos residenciales Medellín</div>
                    </div>
                  </div>
                  <p className="text-zinc-400 italic leading-relaxed mb-4">
                    "La automatización de leads nos permitió escalar sin contratar más vendedores. El sistema califica y nutre prospectos mientras dormimos."
                  </p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-amber-400 font-bold">3x conversión</span>
                    <span className="text-zinc-600">•</span>
                    <span className="text-zinc-500">6 meses</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* --- STAGE 4: ACTION - CONTACT FORM --- */}
        <section id="contacto" className="py-24 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/10 to-black pointer-events-none" />
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              {/* Final CTA Header */}
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-medium mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>Agenda tu Diagnóstico Digital Gratuito</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                  Multiplica tus Ventas Inmobiliarias
                </h2>
                <p className="text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                  Déjanos tus datos y te contactaremos para una{" "}
                  <strong className="text-blue-400">auditoría gratuita</strong> de tu estrategia digital actual. 
                  Sin compromisos, solo insights accionables.
                </p>
              </div>

              {/* Contact Form */}
              <div className="bg-zinc-900/30 border border-blue-500/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm">
                <ContactForm />
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm text-zinc-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>Respuesta en menos de 24h</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>Sin permanencia mínima</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400" />
                  <span>Soporte técnico incluido</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
