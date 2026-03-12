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
    question: "¿Qué canales de atención soporta Nitro Bot?",
    answer: "Nuestros agentes se conectan nativamente a WhatsApp (API Oficial), Instagram Direct Messages, Facebook Messenger y un widget personalizado para tu sitio web. Todo centralizado desde un solo 'cerebro'.",
  },
  {
    question: "¿Puede el bot conectar con mi Shopify o WooCommerce?",
    answer: "Sí. Mediante integraciones API personalizadas, el bot puede consultar el estado de pedidos, inventario en tiempo real y mostrar tarjetas de productos enriquecidas directamente en el chat.",
  },
  {
    question: "¿Qué pasa si la IA no sabe la respuesta?",
    answer: "Configuramos 'fallbacks' seguros. Si la confianza en la respuesta es menor a un umbral definido, o si el usuario solicita explícitamente a un humano, el bot pausa su intervención y transfiere la conversación a tu equipo de soporte en Zendesk, HubSpot o correo.",
  },
  {
    question: "¿Cómo se entrena el bot con mis datos?",
    answer: "Utilizamos una arquitectura RAG (Retrieval-Augmented Generation). Nos proporcionas PDFs de producto, FAQs, enlaces a tu web y manuales. Nosotros vectorizamos esa información para que el modelo la consulte antes de generar cada respuesta.",
  },
  {
    question: "¿Existen riesgos de 'alucinaciones' o respuestas falsas?",
    answer: "Aplicamos técnicas de 'Guardrailing' o cercos de seguridad. El bot recibe instrucciones sistémicas estrictas para responder ÚNICAMENTE basado en el contexto aportado (tus datos). Si la información no está en la base de datos, el bot responderá educadamente que no tiene el dato en lugar de inventarlo.",
  }
];

export function FAQ() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-zinc-950">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-purple-400 mb-4 bg-purple-500/10 px-4 py-1.5 rounded-full text-sm font-semibold">
            <HelpCircle className="w-4 h-4" />
            <span>Preguntas Frecuentes</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            Resuelve todas <span className="text-purple-400">tus dudas</span>
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border border-zinc-800 rounded-xl px-6 py-2 bg-zinc-900/50 hover:border-purple-500/30 transition-all data-[state=open]:border-purple-500/30"
            >
              <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-purple-400 hover:no-underline py-4">
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
