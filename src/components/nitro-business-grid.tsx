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
      color: "teal", // Custom logic for color styling if needed
      cta: "Ver Solución Médica"
    },
    {
      id: "RETAIL",
      icon: Store,
      title: "Nitro Retail",
      desc: "Transforma tu tienda física o ecommerce con experiencias omnicanal de alta velocidad.",
      href: "#",
      color: "purple",
      cta: "Próximamente",
      disabled: true
    },
    {
      id: "INMOBILIARIA",
      icon: Building2,
      title: "Nitro Estate",
      desc: "Showrooms virtuales y captación de leads cualificados para desarrollos inmobiliarios.",
      href: "#",
      color: "blue",
      cta: "Próximamente",
      disabled: true
    }
  ]

  return (
    <section id="negocios" className="py-24 px-6 relative z-10 bg-zinc-950/50">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-16">
            <span className="text-teal-400 font-mono tracking-widest text-sm uppercase mb-2 block">Sectores Especializados</span>
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
              <Link href={biz.href} className={`block h-full ${biz.disabled ? 'pointer-events-none opacity-60' : ''}`}>
                <SpotlightCard 
                    spotlightColor={biz.color === 'teal' ? "rgba(20, 184, 166, 0.2)" : "rgba(255, 255, 255, 0.05)"}
                    className="h-full p-8 flex flex-col group border-white/5 hover:border-teal-500/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className={`p-4 rounded-xl ${biz.color === 'teal' ? 'bg-teal-500/10 text-teal-400' : 'bg-white/5 text-slate-400'}`}>
                      <biz.icon className="w-8 h-8" />
                    </div>
                    {biz.disabled && (
                         <span className="px-2 py-1 rounded-full bg-white/5 text-[10px] uppercase tracking-wider font-bold text-slate-500">
                             Coming Soon
                         </span>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-teal-400 transition-colors tracking-tight">
                    {biz.title}
                  </h3>
                  
                  <p className="text-zinc-400 mb-8 leading-relaxed text-pretty text-sm flex-1">
                    {biz.desc}
                  </p>
                  
                  {!biz.disabled && (
                      <div className="flex items-center text-teal-400 font-semibold text-sm group-hover:translate-x-2 transition-transform">
                        {biz.cta} <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                  )}
                </SpotlightCard>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
