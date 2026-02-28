"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    q: "Realmente no hay costo mensual?",
    a: "Correcto. Usamos el tier gratuito de Vercel, GitHub y Supabase. Solo pagarias si escalas a niveles masivos de trafico que un principiante no alcanza en meses. Y cuando eso pase, ya estaras vendiendo de sobra.",
  },
  {
    q: "Necesito saber programar?",
    a: "Para nada. La IA genera todo el codigo por ti. Si sabes copiar, pegar y escribir lo que quieres, puedes hacerlo. El curso te guia paso a paso con video, sin tocar una sola linea de codigo.",
  },
  {
    q: "Que tan facil es implementar el metodo Nitro?",
    a: "Muy facil. Literalmente le dices a la IA que producto vendes, ella genera tu tienda, y tu la publicas con un click. En 3 horas (tomando cafe y con pausas) tienes tu tienda online recibiendo pedidos.",
  },
  {
    q: "Que pasa si quiero migrar a otra plataforma despues?",
    a: "Puedes hacerlo cuando quieras. La estrategia ideal es usar Nitro para validar productos a costo $0, y solo migrar cuando tengas flujo de caja positivo y realmente necesites escalar la operacion.",
  },
  {
    q: "Funciona para cualquier pais?",
    a: "El stack tecnologico funciona globalmente. El sistema de contraentrega esta optimizado para Latinoamerica y Espana, pero puedes adaptarlo a cualquier mercado.",
  },
  {
    q: "Cuanto tiempo tengo acceso al curso?",
    a: "Acceso de por vida. Incluyendo todas las actualizaciones futuras. La IA y las herramientas evolucionan rapido, y nosotros actualizamos el contenido constantemente.",
  },
  {
    q: "Y si no logro hacer funcionar mi tienda?",
    a: "Tienes 7 dias de garantia. Si sigues el proceso paso a paso y no logras tener tu tienda en linea, te devolvemos el 100% de tu dinero. Sin preguntas, sin complicaciones.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-20 lg:py-28 border-b border-border">
      <div className="max-w-3xl mx-auto px-5 md:px-6 lg:px-12">
        <div className="font-mono text-[11px] md:text-xs text-primary tracking-[0.25em] uppercase mb-5 md:mb-6 text-center">
          {'// PREGUNTAS FRECUENTES'}
        </div>
        <h2 className="font-heading text-[clamp(2.2rem,5vw,5rem)] leading-[0.85] mb-12 md:mb-16 text-center text-balance">
          RESOLVEMOS<br />
          <span className="text-primary">TUS DUDAS.</span>
        </h2>

        <div className="space-y-2 md:space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border transition-all ${
                openIndex === i
                  ? "border-primary bg-primary/[0.03]"
                  : "border-border hover:border-foreground/20"
              }`}
            >
              <button
                className="w-full p-4 md:p-6 flex justify-between items-center gap-4 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className="text-foreground font-semibold text-sm md:text-base">{faq.q}</span>
                {openIndex === i ? (
                  <Minus className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" />
                ) : (
                  <Plus className="w-4 h-4 md:w-5 md:h-5 text-foreground/40 shrink-0" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-56 pb-4 md:pb-6 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="px-4 md:px-6 text-foreground/60 text-sm md:text-base leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
