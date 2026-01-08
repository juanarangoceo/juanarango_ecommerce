"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Zap, TrendingUp, ShoppingCart, BarChart3, MessageSquare, Search, Package } from "lucide-react"
import { motion } from "framer-motion"
import { ScrollConnector } from "@/components/home/ScrollConnector"
import Cal, { getCalApi } from "@calcom/embed-react"
import { useEffect } from "react"

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
	  (async function () {
		const cal = await getCalApi({});
		cal("ui", {"theme":"dark", "styles":{"branding":{"brandColor":"#22c55e"}},"hideEventTypeDetails":false,"layout":"month_view"});
	  })();
	}, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* Navigation */}
      <nav className="border-b border-border/50 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold tracking-tight">
              <span className="text-primary">Nitro</span>
              <span className="text-foreground">Tech</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">
                Servicios
              </a>
              <a href="#metricas" className="text-muted-foreground hover:text-foreground transition-colors">
                Resultados
              </a>
              <a href="#contacto" className="text-muted-foreground hover:text-foreground transition-colors">
                Contacto
              </a>
            </div>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 hidden sm:inline-flex">Consulta Gratuita</Button>
          </div>
        </div>
      </nav>

      {/* Scrollytelling Container */}
      <div className="relative">
        {/* Neural Cable Background */}
        <ScrollConnector 
          onScrollChange={setScrollProgress} 
        />

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6 relative z-10">
          <div className="container mx-auto max-w-7xl">
            <div className="animate-fade-in-up">
              <div className="max-w-4xl bg-background/95 backdrop-blur-md p-6 rounded-2xl inline-block border border-white/5 shadow-2xl">
                <h1 className="text-4xl md:text-8xl font-bold leading-none mb-6 text-balance">
                  Ingeniería de escalamiento acelerado
                  <span className="block text-primary mt-2">para negocios digitales.</span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed text-pretty max-w-2xl">
                  No solo creamos webs. Diseñamos la estrategia, automatizaciones e infraestructura necesarias para eliminar tus cuellos de botella y acelerar tu crecimiento.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 group h-auto whitespace-normal text-left"
                  >
                    <span className="flex-1">Solicitar Diagnóstico Estratégico</span>
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 py-6 border-border hover:border-primary bg-background/80 h-auto whitespace-normal"
                  >
                    Ver Casos de Éxito
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Metrics Bar */}
        <section id="metricas" className="py-16 px-6 relative z-10">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { value: "150%", label: "Aumento de Eficiencia", suffix: "" },
                { value: "<200", label: "Infraestructura de Grado Militar", suffix: "ms" },
                { value: "99.9%", label: "Uptime de Sistemas", suffix: "" },
                { value: "50+", label: "Sistemas Automatizados", suffix: "" },
              ].map((metric, index) => (
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

        {/* Services Grid */}
        <section id="servicios" className="py-24 px-6 relative z-10">
          <div className="container mx-auto max-w-7xl">
            <div className="mb-16 text-center md:text-left bg-background/90 backdrop-blur-md p-6 rounded-2xl inline-block border border-white/5">
              <h2 className="text-5xl font-bold mb-4">Ecosistema de servicios</h2>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Soluciones modulares que trabajan juntas para acelerar tu crecimiento digital.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: "01",
                  icon: MessageSquare,
                  title: "NitroBot",
                  desc: "Eficiencia Operativa. No es solo un chat, es liberar tiempo de tu equipo mediante automatización inteligente.",
                  cta: "Ver Automatización"
                },
                {
                  id: "02",
                  icon: ShoppingCart,
                  title: "NitroCommerce",
                  desc: "Velocidad sin fricción. Arquitectura Headless (<200ms) diseñada para soportar tráfico masivo y maximizar la conversión.",
                  cta: "Ver Infraestructura"
                },
                {
                  id: "03",
                  icon: BarChart3,
                  title: "NitroStrategy",
                  desc: "Consultoría de alto nivel para identificar fugas de capital y diseñar el roadmap técnico que tu empresa necesita para escalar sin fricción.",
                  cta: "Ver Consultoría"
                }
              ].map((service, index) => {
                const isLit = scrollProgress > (0.42 + (index * 0.08)) // Staggered: 0.42, 0.50, 0.58
                return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0.5, scale: 1 }}
                  animate={isLit ? {
                    opacity: 1,
                    scale: 1.02,
                    borderColor: "#22c55e", // Primary green
                    boxShadow: "0 0 30px rgba(34,197,94,0.3)"
                  } : {}}
                  transition={{ duration: 0.5 }}
                  className={`bg-card border p-8 transition-all duration-300 group rounded-xl relative overflow-visible ${!isLit ? 'border-border' : ''}`}
                >
                  {/* Horizontal Connection Line */}
                  <div className="absolute top-1/2 right-full w-4 md:w-32 h-[2px] bg-gradient-to-l from-green-500/50 to-transparent block opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <span className="text-sm text-primary font-mono">{service.id}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{service.title}</h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.desc}
                  </p>
                  <Button
                    variant="ghost"
                    className="text-primary hover:text-primary/80 p-0 group-hover:translate-x-2 transition-transform"
                  >
                    {service.cta} <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
                )
              })}
            </div>
          </div>
        </section>


      {/* Why Section */}
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
                {[
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
                ].map((item, index) => (
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

      {/* CTA Section / Booking */}
      <section id="contacto" className="py-24 px-6 relative z-10">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance">¿Listo para escalar tu negocio?</h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
            Agenda una auditoría gratuita y descubre cómo nuestra infraestructura puede acelerar tu crecimiento.
          </p>
          
          <motion.div 
             className="w-full h-[650px] bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden glassmorphism shadow-2xl relative"
             animate={scrollProgress > 0.85 ? {
               borderColor: "#22c55e",
               boxShadow: "0 0 40px rgba(34,197,94,0.2)"
             } : {}}
             transition={{ duration: 0.8 }}
          >
             <Cal 
              calLink="juan-arango-publicidad-ixgzdu/auditoria-tecnica"
              style={{width:"100%",height:"100%",overflow:"scroll"}}
              config={{layout: 'month_view', theme: 'dark'}}
            />
          </motion.div>
        </div>
      </section>
      </div> {/* Scrollytelling Container Ends Here now */}

      {/* Footer */}
      <footer className="border-t border-border/50 py-12 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="text-primary">Nitro</span>
                <span className="text-foreground">Tech</span>
              </div>
              <p className="text-muted-foreground text-sm">Arquitectos de ecosistemas digitales de alto rendimiento</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Servicios</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    NitroBot
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    NitroSearch
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    NitroCommerce
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    NitroStrategy
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Empresa</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Casos de Éxito
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contacto</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>hola@nitrotech.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
            © 2026 NitroTech. Construido con Next.js 16 en Vercel Edge Network.
          </div>
        </div>
      </footer>
    </div>
  )
}
