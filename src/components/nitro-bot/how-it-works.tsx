"use client";

import { motion } from "framer-motion";
import { Upload, Cpu, Rocket, Smartphone } from "lucide-react";

const steps = [
  {
    icon: <Upload className="w-8 h-8" />,
    title: "Ingesta de Conocimiento",
    description: "Subes tus documentos, URLs, catálogos en PDF y bases de datos al sistema. El cerebro del bot procesa y estructura toda la información de tu empresa.",
  },
  {
    icon: <Cpu className="w-8 h-8" />,
    title: "Afinación (Fine-Tuning RAG)",
    description: "Configuramos el tono de voz de la marca, las reglas de negocio, límites operativos y las directivas de seguridad para evitar respuestas no deseadas.",
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Integración Omnicanal",
    description: "Conectamos el agente a tus canales preferidos a través de APIs oficiales: WhatsApp Business API, Meta Instagram y el widget flotante en tu web.",
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "Despliegue y Mejora",
    description: "Lanzamos el bot. Monitorizamos las conversaciones y los casos no resueltos para agregar nueva información a su base de conocimiento, haciéndolo más inteligente cada día.",
  }
];

export function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />
      
      <div className="max-w-7xl mx-auto text-center mb-16">
         <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Proceso de Integración <span className="text-purple-400">Sin Fricción</span>
         </h2>
         <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
            Nosotros nos encargamos de la complejidad técnica. Tú solo nos provees la información de tu negocio.
         </p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.15 }}
            className="flex flex-col items-center text-center relative"
          >
            {/* Connector Line (Desktop) */}
            {index < steps.length - 1 && (
              <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent z-0" />
            )}
            
            <div className="w-24 h-24 rounded-full bg-zinc-900 border-2 border-blue-500/30 flex items-center justify-center text-blue-400 mb-6 relative z-10 shadow-[0_0_30px_rgba(59,130,246,0.15)] group-hover:scale-110 transition-transform">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
