"use client";

import { motion } from "framer-motion";
import { SearchCode, LineChart, Globe, Zap, Cpu, FileText } from "lucide-react";

const features = [
  {
    title: "Optimización SGE (Search Generative Experience)",
    description: "Preparamos tu contenido no solo para los enlaces azules, sino para ser la respuesta que las IA de Google, Perplexity y Bing ofrecen directamente al usuario.",
    icon: <Cpu className="w-6 h-6" />,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  {
    title: "SEO Técnico a Nivel de Infraestructura",
    description: "Corregimos la velocidad de carga, la estructura de renderizado (SSR/SSG), Core Web Vitals y errores de rastreo que penalizan tu visibilidad.",
    icon: <Zap className="w-6 h-6" />,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
  },
  {
    title: "Estrategia de Contenidos y Autoridad",
    description: "Investigación profunda de palabras clave (Keyword Research) y creación de clusters de contenido (Topic Clusters) para dominar nichos semánticos.",
    icon: <FileText className="w-6 h-6" />,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
  },
  {
    title: "Auditoría SEO Integral",
    description: "Análisis exhaustivo de tu sitio actual, identificando debilidades, enlaces rotos, canibalización de palabras clave y oportunidades de crecimiento rápido.",
    icon: <SearchCode className="w-6 h-6" />,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
  },
  {
    title: "SEO Local y Geolocalizado",
    description: "Dominio de búsquedas hiperlocales. Optimizamos tu presencia en Google Business Profile y construimos citaciones para negocios con presencia física.",
    icon: <Globe className="w-6 h-6" />,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
  },
  {
    title: "Análisis y Reporte Continuo",
    description: "No trabajamos a ciegas. Monitorizamos posiciones, impresiones, CTR y conversiones mediante Looker Studio y Search Console para iterar la estrategia.",
    icon: <LineChart className="w-6 h-6" />,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
  },
];

export function Features() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Ecosistema SEO <span className="text-emerald-400">Integral</span>
          </h2>
          <p className="text-lg text-zinc-400">
            El SEO moderno ya no es solo sobre repetir palabras clave. Es sobre autoridad, intención de búsqueda, experiencia de usuario y adaptarse a la Inteligencia Artificial.
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
