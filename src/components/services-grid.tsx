"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, MessageSquare, ShoppingCart, BarChart3, Search, X, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SpotlightCard } from "@/components/ui/spotlight-card"

// Data Structure (could be separate file, but kept here for simplicity/integrity)
const serviceDetails = [
  {
    id: "01",
    icon: MessageSquare,
    title: "NitroBot",
    desc: "Eficiencia Operativa. No es solo un chat, es liberar tiempo de tu equipo mediante automatización inteligente.",
    cta: "Ver Automatización",
    features: [
      "Atención al cliente 24/7 sin humanos",
      "Calificación automática de leads",
      "Agendamiento directo en calendario",
      "Integración con WhatsApp y CRM"
    ]
  },
  {
    id: "02",
    icon: Search,
    title: "NitroSearch", 
    desc: "Visibilidad inmediata. Estrategias de búsqueda avanzada para dominar tu nicho.",
    cta: "Ver Búsqueda",
    features: [
      "Auditoría SEO Técnica profunda",
      "Estrategia de palabras clave de alta intención",
      "Optimización de velocidad (Core Web Vitals)",
      "Indexación prioritaria en Google"
    ]
  },
  {
    id: "03",
    icon: ShoppingCart,
    title: "NitroCommerce",
    desc: "Velocidad sin fricción. Arquitectura Headless (<200ms) diseñada para soportar tráfico masivo.",
    cta: "Ver Infraestructura",
    features: [
      "Headless Shopify / MedusaJS",
      "Cargas de página en < 200ms",
      "Reducción de tasa de rebote",
      "UX optimizada para conversión móvil"
    ]
  },
  {
    id: "04",
    icon: BarChart3,
    title: "NitroStrategy",
    desc: "Consultoría de alto nivel para identificar fugas de capital y diseñar el roadmap técnico.",
    cta: "Ver Consultoría",
    features: [
      "Análisis de fugas en el funnel",
      "Roadmap de deuda técnica",
      "Selección de Stack Tecnológico",
      "Mentoria para equipos in-house"
    ]
  }
]

export function ServicesGrid() {
  const [selectedService, setSelectedService] = useState<typeof serviceDetails[0] | null>(null)

  const handleOpen = (service: typeof serviceDetails[0]) => {
    setSelectedService(service)
    document.body.style.overflow = "hidden" // Prevent scroll
  }

  const handleClose = () => {
    setSelectedService(null)
    document.body.style.overflow = "unset" // Restore scroll
  }

  const handleContact = () => {
    handleClose()
    const contactSection = document.getElementById("contacto")
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="servicios" className="py-12 md:py-24 px-6 relative z-10">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-20 text-center md:text-left">
          <h2 className="text-5xl font-bold mb-6 text-balance tracking-tight">Ecosistema de servicios</h2>
          <p className="text-xl text-slate-400 max-w-2xl text-pretty leading-relaxed">
            Soluciones modulares que trabajan juntas para acelerar tu crecimiento digital.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceDetails.map((service, index) => (
            <motion.div
              key={index}
              layoutId={`card-${service.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="col-span-1"
            >
              <SpotlightCard className="h-full p-8 flex flex-col group relative z-0">
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
                  onClick={() => handleOpen(service)}
                  className="text-primary hover:text-white hover:bg-gradient-to-r hover:from-primary/20 hover:to-primary/10 p-3 px-5 h-auto rounded-lg justify-start mt-auto group-hover:translate-x-2 transition-all duration-300 w-fit cursor-pointer border border-primary/20 hover:border-primary/40"
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

      {/* Modal Overlay directly integrated for performance/style matching */}
      <AnimatePresence>
        {selectedService && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998] cursor-pointer"
            />
            <div className="fixed inset-0 overflow-y-auto z-[9999] pointer-events-none flex items-center justify-center p-4">
              <motion.div
                layoutId={`card-${selectedService.id}`}
                className="w-full max-w-2xl bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 md:p-12 relative pointer-events-auto shadow-2xl shadow-primary/10"
              >
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white transition-colors z-10"
                >
                  <X className="w-6 h-6" />
                </button>

                <div className="flex items-center gap-4 mb-8">
                  <div className="p-4 bg-primary/10 rounded-2xl">
                    <selectedService.icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white">{selectedService.title}</h3>
                </div>

                <p className="text-xl text-zinc-300 leading-relaxed mb-10">
                  {selectedService.desc}
                </p>

                <div className="mb-12">
                  <h4 className="text-sm font-bold text-zinc-500 uppercase tracking-widest mb-6 border-b border-white/10 pb-2">
                    Características Clave
                  </h4>
                  <ul className="grid md:grid-cols-2 gap-4">
                    {selectedService.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3 text-zinc-300">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-col md:flex-row gap-4 relative z-10">
                  <Button
                    onClick={handleContact}
                    className="flex-1 h-14 text-lg bg-primary text-black hover:bg-primary/90 rounded-full font-bold relative z-10"
                  >
                   Solicitar {selectedService.title}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className="md:w-auto h-14 px-8 border-white/10 hover:bg-white/5 hover:text-white rounded-full text-zinc-400 relative z-10"
                  >
                    Cerrar
                  </Button>
                </div>

              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}
