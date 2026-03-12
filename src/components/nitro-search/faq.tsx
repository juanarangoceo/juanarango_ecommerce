"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqItems = [
  {
    question: "¿En cuánto tiempo veré resultados?",
    answer: "El SEO es una estrategia a mediano/largo plazo. Generalmente empezamos a ver movimientos iniciales en los primeros 45 a 60 días tras la implementación técnica y On-Page. El crecimiento escalable y el ROI sustancial suelen llegar entre el mes 4 y el 6.",
  },
  {
    question: "¿Garantizan el primer lugar en Google?",
    answer: "Ninguna agencia profesional puede garantizar el primer puesto en Google, ya que los algoritmos son externos. Lo que sí garantizamos es aplicar la mejor ingeniería de búsqueda, optimización SGE comprobada y trabajo ético (White Hat) que históricamente nos ha dado resultados excepcionales.",
  },
  {
    question: "¿Qué es la optimización SGE y por qué importa?",
    answer: "SGE (Search Generative Experience) es la nueva forma en que Google y otros buscadores impulsados por IA (como Perplexity) responden a los usuarios generando textos completos. Optimizamos tu web no solo para enlaces, sino para ser la 'fuente citada' por la Inteligencia Artificial cuando tus clientes preguntan.",
  },
  {
    question: "¿Trabajan el SEO Local para negocios físicos?",
    answer: "Sí. Para clínicas, inmobiliarias y retail implementamos una estrategia robusta de SEO Local basada en Google Business Profile, Schema Markup geolocalizado enfocado en capturar leads en tu radio de influencia.",
  },
  {
    question: "¿Dan reportes de los avances?",
    answer: "Absolutamente. Crearemos un dashboard en tiempo real con Looker Studio donde podrás ver tu tráfico, posiciones de palabras clave, impresiones y las conversiones u oportunidades generadas gracias al SEO.",
  }
];

export function FAQ() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-cyan-400 mb-4 bg-cyan-500/10 px-4 py-1.5 rounded-full text-sm font-semibold">
            <HelpCircle className="w-4 h-4" />
            <span>Preguntas Frecuentes</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Despejamos tus <span className="text-cyan-400">dudas</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-zinc-800 rounded-xl px-6 py-2 bg-zinc-900/50 hover:border-cyan-500/30 transition-all data-[state=open]:border-cyan-500/30"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-cyan-400 hover:no-underline py-4">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-400 pb-4 leading-relaxed text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
