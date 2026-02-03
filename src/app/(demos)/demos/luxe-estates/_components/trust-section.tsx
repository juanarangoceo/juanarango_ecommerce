"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Calendar, Phone } from "lucide-react";
import { useEffect, useState } from "react";

const STATS = [
  { label: "Clientes satisfechos", value: "2,500+" },
  { label: "En ventas cerradas", value: "$50M+" },
  { label: "Tiempo promedio venta", value: "45 días" },
];

export function TrustSection() {
  const scrollToContact = () => {
    const section = document.getElementById("advanced-search");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 bg-[var(--theme-bg)] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 lg:p-16 shadow-xl shadow-black/5 relative overflow-hidden border border-slate-100">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-block mb-4">
                <span 
                  className="uppercase tracking-[0.2em] text-xs font-bold"
                  style={{ color: 'var(--theme-accent)' }}
                >
                  Da el primer paso
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-slate-900 mb-6 leading-tight">
                Tu patrimonio merece el <span className="italic" style={{ color: 'var(--theme-accent)' }}>mejor respaldo</span>
              </h2>
              
              <p className="text-slate-600 text-lg mb-10 leading-relaxed max-w-lg">
                Agenda una consulta sin compromiso con nuestros asesores. 
                Cuéntanos qué buscas y te presentaremos opciones que realmente se ajusten a ti.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={scrollToContact}
                  className="h-14 px-8 text-white text-base rounded-lg shadow-lg hover:brightness-110 transition-all"
                  style={{ backgroundColor: 'var(--theme-accent)' }}
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Agendar Consulta
                </Button>
                
                <Button 
                  variant="outline"
                  className="h-14 px-8 text-base border-2 rounded-lg hover:bg-slate-50 transition-all font-medium"
                  style={{ borderColor: 'var(--theme-primary)', color: 'var(--theme-primary)' }}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Llamar Ahora
                </Button>
              </div>
            </motion.div>

            {/* Right Card (Stats) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div 
                className="rounded-3xl p-10 md:p-12 text-white shadow-2xl relative overflow-hidden group"
                style={{ backgroundColor: 'var(--theme-primary)' }}
              >
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:bg-white/10 transition-colors duration-700"></div>

                <h3 className="text-2xl font-serif mb-10 border-l-4 pl-4" style={{ borderColor: 'var(--theme-accent)' }}>
                  Resultados que hablan
                </h3>

                <div className="space-y-8">
                  {STATS.map((stat, i) => (
                    <div key={i} className="flex justify-between items-end border-b border-white/10 pb-4">
                      <span className="text-white/70 text-sm uppercase tracking-wider font-medium">
                        {stat.label}
                      </span>
                      <span 
                        className="text-3xl font-bold font-serif"
                        style={{ color: 'var(--theme-accent)' }}
                      >
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
