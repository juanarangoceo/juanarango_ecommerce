"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Auditoría y Diagnóstico",
    description: "Realizamos un escaneo profundo de tu arquitectura técnica, perfil de enlaces (backlinks) y calidad del contenido actual para entender el punto de partida exacto.",
  },
  {
    number: "02",
    title: "Keyword Research e Intención",
    description: "Mapeamos las intenciones de búsqueda de tus clientes potenciales. No buscamos volumen vacío, buscamos palabras clave con alto valor comercial que generen ventas.",
  },
  {
    number: "03",
    title: "Optimización On-Page y Técnica",
    description: "Aplicamos las mejoras técnicas: optimización de velocidad (Core Web Vitals), estructura de encabezados (H1, H2), metaetiquetas y schema markup.",
  },
  {
    number: "04",
    title: "Autoridad y Crecimiento (Off-Page)",
    description: "Ejecutamos estrategias de contenido pilar y link building focalizado para incrementar la autoridad de tu dominio a los ojos de los motores de búsqueda.",
  }
];

export function Process() {
  return (
    <section id="como-funciona" className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          <div className="lg:w-1/3 lg:sticky lg:top-32">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Nuestra <span className="text-cyan-400">Metodología</span>
            </h2>
            <p className="text-lg text-zinc-400 mb-8">
              Un enfoque metódico y basado en datos empíricos. Sin atajos, sin técnicas obsoletas. Solo ingeniería de visibilidad que perdura en el tiempo.
            </p>
          </div>

          <div className="lg:w-2/3">
            <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-800 before:to-transparent">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
                >
                  {/* Timeline dot */}
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-black bg-zinc-800 text-zinc-400 font-bold shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_0_2px_rgba(255,255,255,0.05)] z-10 transition-colors group-hover:bg-cyan-500 group-hover:text-black">
                    {index + 1}
                  </div>
                  
                  {/* Content box */}
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-zinc-900 border border-zinc-800 group-hover:border-zinc-700 transition-all">
                    <div className="flex items-center gap-4 mb-3">
                      <span className="text-cyan-500 font-mono text-sm font-bold">{step.number}</span>
                      <h3 className="font-bold text-white text-xl">{step.title}</h3>
                    </div>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
