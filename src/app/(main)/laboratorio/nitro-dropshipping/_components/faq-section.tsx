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
    a: "Tan fácil que si consumes el material al comprar, puedes tener tu ecosistema en pie hoy mismo. Literalmente describes el producto, aprietas un botón, la IA genera el layout y Vercel lo lanza a un dominio de internet de forma instantánea. Tomará unas 3-4 horas si vas lento.",
  },
  {
    q: "¿Qué pasa si quiero migrar a otra plataforma (Shopify) después de escalar?",
    a: "Puedes y debes hacerlo cuando tu volumen operativo sea sofocante. La mentalidad Nitro es dominar la fase de validación de mercado quemando la mínima pción de capital ($0 en servidores). Cuando tu caja sea sólida, con un equipo y un volumen brutal, ya migras.",
  },
  {
    q: "¿Esto funciona para Drophippling global o solo local?",
    a: "La infraestructura tecnológica no distingue países. El back-office que implementas nativo y la tienda son tuyos, operables desde Australia hasta Argentina. Dentro, recomendamos enfocarnos en Cash on Delivery (Contraentrega) porque en LatAm y España tiene la fricción más baja, garantizándote mayores cierres.",
  },
  {
    q: "¿Puedo aplicar Nitro si ya tengo mi tienda en Shopify?",
    a: "Sí, puedes cancelar la tienda mensual de tu Shopify hoy mismo o paralizarla, e implementar método Nitro para las nuevas validaciones de mercado. Proteges tu dinero mensual y puedes iterar mucho más relajado. Tu tranquilidad no tendrá precio.",
  },
  {
    q: "¿Y qué pasa si hago todo y no me funciona?",
    a: "Estás blindado. Cuentas con una garantía técnica de acero de 7 días. Si ves todos los videos, sigues las pantallas paso por paso y tu tienda no queda subida y ultra veloz... nos envías un mail. Ese mismo día cancelamos el cobro de tu tarjeta. Queremos vendedores, no víctimas.",
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
