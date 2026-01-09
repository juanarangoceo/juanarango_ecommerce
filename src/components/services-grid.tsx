"use client"

import { motion } from "framer-motion"
import { ArrowRight, MessageSquare, ShoppingCart, BarChart3 } from "lucide-react"
import { Button } from "@/components/ui/button"

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                borderColor: "rgba(34,197,94,0.3)", 
                boxShadow: "0 0 30px rgba(34,197,94,0.1)" 
              }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/[0.03] backdrop-blur-sm border border-white/10 p-8 rounded-2xl flex flex-col h-full hover:border-primary/50 transition-colors duration-300 group"
            >
              <div className="flex items-start justify-between mb-8">
                <div className="p-4 bg-primary/10 rounded-xl">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <span className="text-sm text-slate-500 font-mono tracking-widest">{service.id}</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-primary transition-colors">{service.title}</h3>
              <p className="text-slate-400 mb-8 leading-relaxed text-pretty flex-1">
                {service.desc}
              </p>
              <Button
                variant="ghost"
                className="text-primary hover:text-white hover:bg-primary p-2 px-4 rounded-lg justify-start mt-auto group-hover:translate-x-2 transition-all duration-300"
              >
                {service.cta} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
