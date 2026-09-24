"use client"

import { useState } from "react"
import { Plus, Minus } from "lucide-react"

const faqs = [
  {
    q: "¿Realmente no hay ningún costo mensual oculto?",
    a: "Totalmente correcto. Desplegamos tu tienda aprovechando los \"Free Tiers\" o capas gratuitas de infraestructura para gigantes. Usamos Vercel, Supabase y GitHub. Alguien empezando no superará esa capa gratuita en meses de operación activa. Solo cuando ganes en volumen brutal empezarás a pagar métricas de tráfico, y para entonces la tienda pagará eso sola.",
  },
  {
    q: "¿Necesito saber programar o leer código fuente?",
    a: "Cero. Ni una sola línea. La Inteligencia Artificial redacta el React y tú literalmente te limitas a leer, copiar y pegar en los comandos que muestro en video. Si sabes usar Word, puedes deployar esta infraestructura.",
  },
  {
    q: "¿Qué tan fácil es implementar el método si empiezo hoy?",
    a: "El material recorre diseño, datos y despliegue paso a paso. El tiempo depende de tu experiencia, el producto y las integraciones; la IA acelera partes del trabajo, pero sigue siendo necesario revisar y probar lo construido.",
  },
  {
    q: "¿Qué pasa si quiero migrar a otra plataforma (Shopify) después de escalar?",
    a: "Puedes migrar cuando la operación lo justifique. La decisión debe considerar volumen, equipo, mantenimiento, integraciones y costo total; no existe un umbral universal para todos los negocios.",
  },
  {
    q: "¿Esto funciona para Drophippling global o solo local?",
    a: "La infraestructura tecnológica puede operarse desde distintos países. El back-office y la tienda quedan bajo tu control. En algunos mercados la contraentrega es una alternativa frecuente, pero su conveniencia debe validarse según logística, devoluciones, costos y comportamiento real del cliente.",
  },
  {
    q: "¿Puedo aplicar Nitro si ya tengo mi tienda en Shopify?",
    a: "Sí, puedes cancelar la tienda mensual de tu Shopify hoy mismo o paralizarla, e implementar método Nitro para las nuevas validaciones de mercado. Proteges tu dinero mensual y puedes iterar mucho más relajado. Tu tranquilidad no tendrá precio.",
  },
  {
    q: "¿Y qué pasa si hago todo y no me funciona?",
    a: "El programa enseña el proceso, pero no puede garantizar ventas ni un resultado comercial. Antes de comprar conviene revisar el temario, los requisitos técnicos y las condiciones vigentes de soporte o devolución.",
  },
]

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-20 lg:py-28 border-b border-border bg-card">
      <div className="max-w-3xl mx-auto px-5 md:px-6 lg:px-12">
        <div className="font-mono text-[11px] md:text-xs text-primary tracking-[0.25em] uppercase mb-5 md:mb-6 text-center font-bold">
          {'// RESOLVEMOS TUS DUDAS'}
        </div>
        <h2 className="font-heading text-[clamp(2.2rem,5vw,5rem)] leading-[0.85] mb-12 md:mb-16 text-center text-balance">
          ¿TE QUEDARON<br />
          <span className="text-primary text-glow">DUDAS? ACÁ LAS RESOLVEMOS.</span>
        </h2>

        <div className="space-y-2 md:space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className={`border transition-all bg-background/50 ${
                openIndex === i
                  ? "border-primary bg-primary/[0.04]"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <button
                className="w-full p-4 md:p-6 flex justify-between items-center gap-4 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                aria-expanded={openIndex === i}
              >
                <span className={`font-bold text-sm md:text-base ${openIndex === i ? 'text-primary' : 'text-foreground'}`}>{faq.q}</span>
                {openIndex === i ? (
                  <Minus className="w-4 h-4 md:w-5 md:h-5 text-primary shrink-0" />
                ) : (
                  <Plus className="w-4 h-4 md:w-5 md:h-5 text-foreground/40 shrink-0" />
                )}
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === i ? "max-h-[500px] pb-4 md:pb-6 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 md:px-6">
                  <div className="w-8 border-t-2 border-primary/20 mb-4" />
                  <p className="text-foreground/70 text-sm md:text-base leading-relaxed font-medium">
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
