"use client"

import { motion } from "framer-motion"
import { ArrowRight, Stethoscope, Building2, Store } from "lucide-react"
import Link from "next/link"
import { SpotlightCard } from "@/components/ui/spotlight-card"

export function NitroBusinessGrid() {
  const businesses = [
    {
      id: "CLÍNICAS",
      icon: Stethoscope,
      title: "Nitro Salud",
      desc: "Ecosistema digital completo para clínicas estéticas y dentales. Agendamiento automático y reputación online.",
      href: "/soluciones/clinicas",
      color: "emerald", // Unified to emerald
      cta: "Ver Solución Médica"
    },
    {
      id: "RETAIL",
      icon: Store,
      title: "Nitro Retail",
      desc: "Transforma tu tienda física o ecommerce con experiencias omnicanal de alta velocidad.",
      href: "/soluciones/nitro-retail",
      color: "orange",
      cta: "Ver Solución Retail"
    },
    {
      id: "INMOBILIARIA",
      icon: Building2,
      title: "Nitro Inmobiliaria",
      desc: "Webs de alto rendimiento para inmobiliarias. Captación automática de leads y SEO optimizado para vender más.",
      href: "/soluciones/nitro-inmobiliaria",
      color: "blue",
      cta: "Ver Solución Inmobiliaria"
    }
  ]

  return (
    <section id="negocios" className="py-12 md:py-24 px-6 relative z-0 bg-zinc-950/50">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16">
            <span className="text-emerald-400 font-mono tracking-widest text-sm uppercase mb-2 block">Sectores Especializados</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">Nitro Negocios</h2>
            <p className="text-xl text-slate-400 max-w-2xl text-pretty leading-relaxed">
                Tecnología adaptada a las necesidades específicas de tu industria. No vendemos generalidades.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {businesses.map((biz, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="col-span-1 h-full"
            >
              <Link href={biz.href} className="block h-full">
                <SpotlightCard 
                    spotlightColor={
                      biz.color === 'emerald' ? "rgba(16, 185, 129, 0.2)" : 
                      biz.color === 'blue' ? "rgba(59, 130, 246, 0.2)" : 
                      biz.color === 'orange' ? "rgba(249, 115, 22, 0.2)" : 
                      "rgba(255, 255, 255, 0.05)"
                    }
                    className="h-full p-8 flex flex-col group border-white/5 hover:border-emerald-500/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className={`p-4 rounded-xl ${
                      biz.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-400' : 
                      biz.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : 
                      biz.color === 'orange' ? 'bg-orange-500/10 text-orange-400' : 
                      'bg-white/5 text-slate-400'
                    }`}>
                      <biz.icon className="w-8 h-8" />
                    </div>

                  </div>
                  
                  <h3 className={`text-2xl font-bold mb-4 text-white transition-colors tracking-tight ${
                    biz.color === 'blue' ? 'group-hover:text-blue-400' : 
                    biz.color === 'orange' ? 'group-hover:text-orange-400' : 
                    'group-hover:text-emerald-400'
                  }`}>
                    {biz.title}
                  </h3>
                  
                  <p className="text-zinc-400 mb-8 leading-relaxed text-pretty text-sm flex-1">
                    {biz.desc}
                  </p>
                  
                  <div className={`flex items-center font-semibold text-sm group-hover:translate-x-2 transition-transform ${
                    biz.color === 'blue' ? 'text-blue-400' : 
                    biz.color === 'orange' ? 'text-orange-400' : 
                    biz.color === 'purple' ? 'text-violet-400' : 
                    'text-emerald-400'
                  }`}>
                    {biz.cta} <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </SpotlightCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
