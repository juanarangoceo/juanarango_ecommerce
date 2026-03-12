"use client";

import { motion } from "framer-motion";
import { MessageCircle, ShoppingBag, Database, Clock, Smartphone, BrainCircuit } from "lucide-react";

const features = [
  {
    title: "Atención 24/7 Ininterrumpida",
    description: "Tus clientes no tienen horario comercial para comprar en internet. Nitro Bot responde dudas a las 3:00 AM con la misma precisión y amabilidad que a las 10:00 AM.",
    icon: <Clock className="w-6 h-6" />,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
  },
  {
    title: "Ventas y Recomendaciones Cruzadas",
    description: "No es solo un bot de FAQs. Analiza la intención de compra y sugiere productos complementarios de tu catálogo, incrementando el AOV (Ticket Promedio).",
    icon: <ShoppingBag className="w-6 h-6" />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    title: "Omnicanalidad Real",
    description: "Un solo cerebro, múltiples canales. Despliega el mismo agente en WhatsApp, Instagram DM, Facebook Messenger y el chat web de tu tienda de forma simultánea.",
    icon: <Smartphone className="w-6 h-6" />,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
  {
    title: "Memoria Contextual",
    description: "Los usuarios odian repetir información. El bot recuerda la conversación completa, entiende el contexto y mantiene diálogos naturales y fluidos de múltiples turnos.",
    icon: <BrainCircuit className="w-6 h-6" />,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
  {
    title: "Transferencia Humana Inteligente",
    description: "Si el bot detecta fricción, clientes molestos o consultas demasiado complejas, detiene la IA y transfiere la sesión al instante a un agente humano de tu equipo de soporte.",
    icon: <MessageCircle className="w-6 h-6" />,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
  },
  {
    title: "Entrenamiento RAG Personalizado",
    description: "El bot no inventa (alucina). Solo responde usando la información de tus PDFs, centro de ayuda, políticas de envío y catálogo de productos (RAG - Retrieval-Augmented Generation).",
    icon: <Database className="w-6 h-6" />,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
];

export function Features() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Más que un Chatbot. Un <span className="text-blue-400">Experto en tu Marca.</span>
          </h2>
          <p className="text-lg text-zinc-400">
            Olvídate de los viejos bots de menú rígido. Nitro Bot entiende el lenguaje natural y mantiene conversaciones reales que convierten dudas en ventas confirmadas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 hover:border-zinc-700 transition-colors group"
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${feature.bg} ${feature.color} group-hover:scale-110 transition-transform`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4 leading-tight">{feature.title}</h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
