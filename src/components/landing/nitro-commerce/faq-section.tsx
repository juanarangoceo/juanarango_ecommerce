"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "No sé nada de tecnología. ¿Esto es para mí?",
    answer: "¡Absolutamente! De hecho, la mayoría de nuestros clientes no son técnicos. Esa es exactamente la razón por la que existimos. Nosotros nos encargamos de toda la parte técnica y te explicamos todo en español claro. Tú solo nos dices qué quieres lograr con tu negocio, y nosotros lo hacemos realidad.",
  },
  {
    question: "Ya tengo una página web, ¿necesito empezar de cero?",
    answer: "No necesariamente. Primero evaluamos lo que tienes. A veces podemos mejorar y optimizar tu sitio actual. Otras veces, reconstruir desde cero es más eficiente y económico a largo plazo. En la consulta gratuita te damos un diagnóstico honesto de cuál opción es mejor para tu caso específico.",
  },
  {
    question: "¿Cuánto tiempo toma ver resultados?",
    answer: "La mayoría de nuestros clientes empiezan a ver más contactos en las primeras 2-4 semanas después del lanzamiento. Resultados más significativos (agenda más llena, más ingresos) típicamente se ven entre el mes 2 y 3. No prometemos milagros de la noche a la mañana, pero sí resultados consistentes y medibles.",
  },
  {
    question: "¿Cuánto cuesta? ¿Hay costos ocultos?",
    answer: "Cada negocio es diferente, por eso no tenemos precios genéricos. Después de la consulta gratuita, te damos un presupuesto claro y detallado sin sorpresas. Incluimos todo: diseño, desarrollo, configuración, y entrenamiento. Los únicos costos adicionales son opcionales (hosting premium, mantenimiento mensual, etc.) y siempre te los explicamos por adelantado.",
  },
  {
    question: "¿Qué pasa si no funciona?",
    answer: "Entendemos tu preocupación. Por eso ofrecemos garantía de satisfacción. Si después de implementar todo no ves mejoras medibles en los primeros 90 días, trabajamos gratis hasta que las veas o te devolvemos tu dinero. Llevamos 50+ proyectos y nunca hemos tenido que activar esta garantía.",
  },
  {
    question: "¿Tendré que hacer mantenimiento yo mismo?",
    answer: "No te preocupes. Ofrecemos planes de mantenimiento donde nosotros nos encargamos de actualizaciones, seguridad, y cualquier cambio que necesites. Si prefieres hacerlo tú mismo, también te entrenamos para que puedas hacer cambios básicos. Tú decides qué nivel de independencia quieres.",
  },
  {
    question: "He tenido malas experiencias con agencias antes...",
    answer: "Lo entendemos perfectamente. Por eso hacemos las cosas diferente: consulta inicial gratuita sin compromiso, comunicación constante en español claro, avances semanales que puedes ver, y garantía de satisfacción. No prometemos más de lo que podemos entregar. Preferimos bajo-prometer y sobre-entregar.",
  },
  {
    question: "¿Cómo es el proceso de trabajo?",
    answer: "Simple: 1) Consulta gratuita donde entendemos tu negocio y objetivos. 2) Te presentamos una propuesta clara con alcance, tiempos y costos. 3) Si decides avanzar, empezamos con el diseño (te mostramos avances cada semana). 4) Desarrollamos y configuramos todo. 5) Lanzamos y te capacitamos. 6) Te acompañamos post-lanzamiento. En cada paso estás informado y puedes dar feedback.",
  },
]

export function FAQSection() {
  // Generate FAQ Schema for Google Rich Snippets
  const faqSchema = {
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
  };

  return (
    <section id="faq" className="py-20 md:py-32 bg-card/30">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Preguntas que probablemente tienes
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Respuestas honestas a las dudas más comunes. Si no encuentras 
            la tuya, pregúntanos directamente.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-border rounded-xl px-6 bg-background data-[state=open]:border-primary/30 transition-colors"
            >
              <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-6 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional CTA */}
        <div className="mt-12 text-center p-8 rounded-xl border border-border bg-background">
          <p className="text-lg text-foreground mb-4">
            ¿Tienes una pregunta específica sobre tu negocio?
          </p>
          <p className="text-muted-foreground mb-6">
            Agenda una consulta gratuita y hablemos de tu caso particular. Sin compromiso, sin presión de venta.
          </p>
          <a 
            href="#contacto" 
            className="inline-flex items-center gap-2 text-primary hover:underline font-medium"
          >
            Quiero hablar con alguien →
          </a>
        </div>
      </div>
    </section>
  )
}
