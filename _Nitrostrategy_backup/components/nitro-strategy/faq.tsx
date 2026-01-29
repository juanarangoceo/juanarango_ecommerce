"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

const faqs = [
  {
    question: "¿Qué es exactamente la consultoría en arquitectura headless?",
    answer: "La arquitectura headless separa el frontend (lo que ven los usuarios) del backend (donde están los datos y la lógica). Esto permite que tu sitio web o aplicación cargue en menos de 200ms, escale sin límites y se integre con cualquier sistema. Mi consultoría te guía en el diseño e implementación de esta arquitectura adaptada a las necesidades específicas de tu negocio."
  },
  {
    question: "¿Cómo puede la IA generativa automatizar mis procesos empresariales?",
    answer: "La inteligencia artificial generativa puede automatizar tareas como generación de contenido, atención al cliente con chatbots inteligentes, análisis de datos, procesamiento de documentos y personalización a escala. Identifico los procesos de tu empresa que más tiempo consumen y diseño sistemas de automatización que pueden reducir el trabajo manual hasta en un 80%."
  },
  {
    question: "¿Cuánto tiempo toma ver resultados con tu metodología?",
    answer: "Mi metodología está diseñada para generar quick wins desde las primeras semanas. El diagnóstico inicial toma 1 semana, el roadmap estratégico otra semana, y la implementación de mejoras críticas se completa en 4-6 semanas. La mayoría de mis clientes ven mejoras medibles en rendimiento y eficiencia en menos de un mes."
  },
  {
    question: "¿Para qué tipo de empresas es esta consultoría?",
    answer: "Mi consultoría es ideal para empresas B2B y e-commerce que ya tienen tracción pero su infraestructura técnica se está convirtiendo en un cuello de botella para el crecimiento. Típicamente trabajo con empresas que facturan entre $50K y $500K+ mensuales y necesitan escalar sin que su sistema colapse."
  },
  {
    question: "¿Qué diferencia hay entre contratar un consultor y una agencia de desarrollo?",
    answer: "Las agencias entregan código; yo entrego sistemas estratégicos. No me limito a programar lo que pides - analizo tu negocio, identifico las verdaderas oportunidades técnicas y diseño soluciones que maximizan tu ROI. Además, con 20+ años de experiencia en e-commerce, entiendo tanto el lado técnico como el comercial."
  },
  {
    question: "¿Ofreces soporte continuo después de la implementación?",
    answer: "Sí. La fase de 'Optimización Continua' de mi metodología incluye monitoreo de métricas, ajustes de sistemas y capacitación para tu equipo. Ofrezco planes de retainer mensuales para empresas que necesitan soporte técnico estratégico continuo y quieren mantener su ventaja competitiva."
  }
]

export function FAQ() {
  return (
    <section 
      className="py-20 lg:py-32 bg-card"
      aria-labelledby="faq-title"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <Badge 
              variant="outline" 
              className="mb-6 px-4 py-2 border-primary/30 text-primary bg-primary/5"
            >
              Preguntas Frecuentes
            </Badge>
            
            <h2 
              id="faq-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-balance"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Resuelve tus dudas sobre{" "}
              <span className="text-primary">consultoría técnica</span>
            </h2>
          </div>

          {/* FAQ Schema for SEO */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqs.map(faq => ({
                  "@type": "Question",
                  "name": faq.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.answer
                  }
                }))
              })
            }}
          />

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border-border"
              >
                <AccordionTrigger className="text-left hover:text-primary hover:no-underline py-6">
                  <span className="text-base font-semibold pr-4">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
