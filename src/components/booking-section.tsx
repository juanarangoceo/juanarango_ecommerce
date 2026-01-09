"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import dynamic from "next/dynamic"

// Dynamic Cal import with skeleton loader
const Cal = dynamic(() => import("@calcom/embed-react").then((mod) => mod.default), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-900/50 animate-pulse flex items-center justify-center text-muted-foreground p-8">Cargando Calendario...</div>
})

export function BookingSection() {
  const [loadCalendar, setLoadCalendar] = useState(false)

  return (
    <section id="contacto" className="py-24 px-6 relative z-10">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-balance">¿Listo para escalar tu negocio?</h2>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
          Agenda una auditoría gratuita y descubre cómo nuestra infraestructura puede acelerar tu crecimiento.
        </p>
        
        <motion.div 
           className="w-full h-[650px] bg-slate-900/50 border border-white/10 rounded-2xl overflow-hidden glassmorphism shadow-2xl relative"
           initial={{ opacity: 0, borderColor: "rgba(255,255,255,0.1)" }}
           whileInView={{ 
             opacity: 1, 
             borderColor: "#22c55e", 
             boxShadow: "0 0 40px rgba(34,197,94,0.2)" 
           }}
           viewport={{ once: true }}
           onViewportEnter={() => setLoadCalendar(true)}
           transition={{ duration: 0.8 }}
        >
           {loadCalendar && (
             <Cal 
              calLink="juan-arango-publicidad-ixgzdu/auditoria-tecnica"
              style={{width:"100%",height:"100%",overflow:"scroll"}}
              config={{layout: 'month_view', theme: 'dark'}}
            />
           )}
        </motion.div>
      </div>
    </section>
  )
}
