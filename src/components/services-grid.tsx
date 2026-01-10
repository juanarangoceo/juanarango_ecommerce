"use client"

import { motion } from "framer-motion"
import { ArrowRight, MessageSquare, ShoppingCart, BarChart3, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SpotlightCard } from "@/components/ui/spotlight-card"

export function ServicesGrid() {
  const services = [
    {
      id: "01",
      icon: MessageSquare,
      title: "NitroBot",
      desc: "Eficiencia Operativa. No es solo un chat, es liberar tiempo de tu equipo mediante automatización inteligente.",
      cta: "Ver Automatización"
    },
    {
      id: "02",
      icon: Search,
      title: "NitroSearch", 
      desc: "Visibilidad inmediata. Estrategias de búsqueda avanzada para dominar tu nicho.",
      cta: "Ver Búsqueda"
    },
    {
      id: "03",
      icon: ShoppingCart,
      title: "NitroCommerce",
      desc: "Velocidad sin fricción. Arquitectura Headless (<200ms) diseñada para soportar tráfico masivo.",
      cta: "Ver Infraestructura"
    },
    {
      id: "04",
      icon: BarChart3,
      title: "NitroStrategy",
      desc: "Consultoría de alto nivel para identificar fugas de capital y diseñar el roadmap técnico.",
      cta: "Ver Consultoría"
    }
  ]

  return (
    <section id="servicios" className="py-24 px-6 relative z-10">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-5xl font-bold mb-6 text-balance tracking-tight">Ecosistema de servicios</h2>
          <p className="text-xl text-slate-400 max-w-2xl text-pretty leading-relaxed">
            Soluciones modulares que trabajan juntas para acelerar tu crecimiento digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="col-span-1"
            >
              <SpotlightCard className="h-full p-8 flex flex-col group">
                <div className="flex items-start justify-between mb-8">
                  <div className="p-4 bg-primary/10 rounded-xl">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <span className="text-sm text-slate-500 font-mono tracking-widest">{service.id}</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors tracking-tight">
                  {service.title}
                </h3>
                <p className="text-zinc-300 mb-8 leading-relaxed text-pretty text-sm flex-1">
                  {service.desc}
                </p>
                <Button
                  variant="ghost"
                  className="text-primary hover:text-white hover:bg-primary p-0 h-auto hover:bg-transparent hover:text-primary justify-start mt-auto group-hover:translate-x-2 transition-all duration-300 w-fit"
                  aria-label={`Ver más detalles sobre ${service.title}`}
                >
                  <span className="mr-2 font-semibold">{service.cta}</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
