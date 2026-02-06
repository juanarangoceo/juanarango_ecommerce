"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "No se nada de tecnologia. Esto es para mi?",
    answer:
      "Absolutamente. La mayoria de nuestros clientes son directores de inmobiliarias que quieren resultados, no aprender programacion. Nosotros nos encargamos de toda la parte tecnica y te explicamos todo en lenguaje claro. Tu solo nos dices que propiedades quieres vender, y nosotros hacemos el resto.",
  },
  {
    question: "Ya tengo pagina web, necesito empezar de cero?",
    answer:
      "No necesariamente. Primero evaluamos lo que tienes. A veces podemos optimizar tu sitio actual para que genere mas prospectos. Otras veces, reconstruir es mas eficiente. En la consulta gratuita te damos un diagnostico honesto de cual opcion es mejor para tu inmobiliaria.",
  },
  {
    question: "Cuanto tiempo toma ver resultados?",
    answer:
      "La mayoria de nuestras inmobiliarias empiezan a ver mas contactos en las primeras 2-4 semanas despues del lanzamiento. Resultados significativos como mas cierres y prospectos calificados tipicamente se ven entre el mes 2 y 3. No prometemos milagros, pero si resultados consistentes y medibles.",
  },
  {
    question: "Cuanto cuesta? Hay costos ocultos?",
    answer:
      "Cada inmobiliaria es diferente, por eso no tenemos precios genericos. Despues de la consulta gratuita, te damos un presupuesto claro y detallado sin sorpresas. Incluimos todo: diseno, desarrollo, configuracion y entrenamiento. Los unicos costos adicionales son opcionales y siempre te los explicamos por adelantado.",
  },
  {
    question: "Que pasa si no funciona?",
    answer:
      "Ofrecemos garantia de satisfaccion. Si despues de implementar todo no ves mejoras medibles en los primeros 90 dias, trabajamos gratis hasta que las veas o te devolvemos tu dinero. Llevamos mas de 50 proyectos y nunca hemos tenido que activar esta garantia.",
  },
  {
    question: "Funcionan con portales inmobiliarios existentes?",
    answer:
      "Si. Nuestra solucion no reemplaza portales como FincaRaiz o Metrocuadrado, los complementa. Creamos tu propia presencia digital donde controlas la experiencia y capturas prospectos directamente, sin pagar comisiones ni competir con otras inmobiliarias en el mismo listado.",
  },
  {
    question: "He tenido malas experiencias con agencias antes...",
    answer:
      "Lo entendemos. Por eso hacemos las cosas diferente: consulta inicial gratuita sin compromiso, comunicacion constante en lenguaje claro, avances semanales visibles, y garantia de satisfaccion. No prometemos mas de lo que podemos entregar.",
  },
  {
    question: "Puedo actualizar mis propiedades yo mismo?",
    answer:
      "Por supuesto. Te entrenamos para que puedas subir y actualizar propiedades facilmente. Tambien ofrecemos planes de mantenimiento donde nuestro equipo se encarga de todo si prefieres enfocarte en vender. Tu decides que nivel de independencia quieres.",
  },
]

export function FAQSection() {
  return (
    <section id="faq" className="py-20 md:py-28 bg-secondary/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
            Preguntas que probablemente tienes
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Respuestas honestas a las dudas mas comunes. Si no encuentras la tuya,
            preguntanos directamente.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="border border-border rounded-xl px-6 bg-card data-[state=open]:border-accent/30 transition-colors"
            >
              <AccordionTrigger className="text-left text-foreground hover:text-accent hover:no-underline py-5 font-medium">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional CTA */}
        <div className="mt-12 text-center p-8 rounded-xl border border-border bg-card">
          <p className="text-lg text-foreground mb-4 font-medium">
            Tienes una pregunta especifica sobre tu inmobiliaria?
          </p>
          <p className="text-muted-foreground mb-6">
            Agenda una consulta gratuita y hablemos de tu caso particular. Sin
            compromiso, sin presion de venta.
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 text-accent hover:underline font-medium"
          >
            {"Quiero hablar con alguien ->"}
          </a>
        </div>
      </div>
    </section>
  )
}
