"use client"

import { useState } from "react"
import { ShieldCheck, RefreshCw, BadgeCheck, ArrowRight, Zap, Sparkles } from "lucide-react"
import { EarlyAccessModal } from "@/components/academia/early-access-modal"

const valueItems = [
  {
    title: "Programa Nitro Dropshipping Total",
    sub: "5 módulos tácticos en video, paso a paso con IA",
    price: "$197 USD",
  },
  {
    title: "Templates Maestros para v0.dev",
    sub: "Prompts exactos para generar landing pages de alta conversión",
    price: "$97 USD",
  },
  {
    title: "Acceso VIP a Trincheras",
    sub: "Comunidad Telegram privada — prompts, proyectos e instrucciones 24/7",
    price: "$147 USD",
  },
  {
    title: "Blacklist & Directorio de Proveedores",
    sub: "Contactos directos limpios, sin intermediarios estafadores",
    price: "$47 USD",
  },
  {
    title: "Actualizaciones Ineludibles",
    sub: "El código y la IA mutan cada mes. El programa se actualiza contigo.",
    price: "$97 USD",
  },
]

export function PricingSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section
      id="acceso"
      className="py-16 md:py-20 lg:py-28 border-b border-border bg-background relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 md:px-6 lg:px-12 relative z-10">
        <div className="font-mono text-[11px] md:text-xs text-primary tracking-[0.25em] uppercase mb-5 md:mb-6 text-center font-bold">
          {'// DESBLOQUEA TU INFRAESTRUCTURA HOY'}
        </div>
        <h2 className="font-heading text-[clamp(2.2rem,5vw,5rem)] leading-[0.85] mb-5 md:mb-6 text-center text-balance">
          TODO EL ECOSISTEMA<br />
          <span className="text-primary text-glow">EN UN SOLO PAGO MAESTRO.</span>
        </h2>
        <p className="text-foreground/70 text-sm md:text-base lg:text-lg max-w-2xl mx-auto mb-12 md:mb-16 text-center leading-relaxed font-medium">
          Matamos las suscripciones. Cero costos parasitarios. 
          Pagas una sola vez. Desbloqueas el sistema para toda la vida.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Value Stack */}
          <div className="bg-card border border-border p-6 md:p-8 lg:p-10 shadow-lg">
            <div className="font-mono text-[10px] md:text-xs text-primary tracking-widest uppercase mb-6 md:mb-8 font-bold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              {'// LO QUE INCLUYE TU COMPRA'}
            </div>

            <div className="space-y-4 md:space-y-5 mb-8 md:mb-10">
              {valueItems.map((item) => (
                <div
                  key={item.title}
                  className="flex justify-between items-start border-b border-border/50 pb-3 md:pb-4 group hover:border-primary/30 transition-colors"
                >
                  <div>
                    <div className="text-sm md:text-base text-foreground font-bold group-hover:text-primary transition-colors">{item.title}</div>
                    <div className="text-[11px] md:text-xs text-foreground/50 mt-1 font-medium">
                      {item.sub}
                    </div>
                  </div>
                  <span className="font-mono text-xs md:text-sm text-foreground/30 font-bold shrink-0 ml-4 line-through decoration-destructive/50">
                    {item.price}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-end bg-background border border-border p-4 md:p-5">
              <span className="font-mono text-[10px] md:text-xs text-foreground/50 uppercase tracking-widest font-bold">
                Valor total
              </span>
              <span className="font-heading text-3xl md:text-4xl text-destructive line-through">
                $585 USD
              </span>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="flex flex-col items-center lg:items-start bg-background lg:bg-transparent p-6 lg:p-0 border border-border lg:border-none">
            <div className="flex gap-3 mb-6 md:mb-8 flex-wrap justify-center lg:justify-start">
              <span className="bg-primary text-primary-foreground font-mono text-[10px] md:text-xs font-bold px-3 md:px-4 py-2 uppercase tracking-wider relative overflow-hidden">
                <span className="relative z-10">Precio Lanzamiento</span>
                <span className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse pointer-events-none" />
              </span>
            </div>

            <div className="flex items-baseline gap-2 mb-2">
              <span className="font-heading text-[6rem] md:text-[8rem] lg:text-[10rem] leading-none text-primary text-glow">
                $49
              </span>
              <span className="font-heading text-2xl md:text-4xl text-foreground/80">USD</span>
            </div>

            <p className="font-mono text-xs md:text-sm text-foreground/60 uppercase tracking-wider mb-2 font-bold text-center lg:text-left">
              Pago único radical — Acceso vitalicio
            </p>
            <p className="text-foreground/50 text-xs md:text-sm mb-8 md:mb-10 text-center lg:text-left max-w-sm">
              Acceso sin fricción a todo el contenido, métodos y comunidad en el mismo instante de la compra.
            </p>

            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-glitch w-full flex items-center justify-center gap-3 bg-destructive text-destructive-foreground font-mono text-xs md:text-sm font-bold uppercase tracking-wider py-5 md:py-6 text-center mb-6 md:mb-8 shadow-[0_0_50px_rgba(255,45,45,0.3)] hover:shadow-[0_0_70px_rgba(255,45,45,0.5)] transition-shadow"
            >
              <Zap className="w-4 h-4" />
              RESERVAR CUPO AHORA
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Guarantee */}
            <div className="border border-dashed border-primary/40 bg-primary/[0.02] p-4 md:p-5 mb-6 md:mb-8 flex items-start gap-3 md:gap-4 w-full">
              <div className="w-9 h-9 md:w-10 md:h-10 shrink-0 border border-primary flex items-center justify-center bg-background">
                <BadgeCheck className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <div>
                <div className="text-primary font-bold text-xs md:text-sm mb-1 uppercase tracking-wider">
                  Garantía de Hierro: 7 días
                </div>
                <div className="text-foreground/70 text-[11px] md:text-xs leading-relaxed font-medium">
                  Implementa. Despliega tu tienda. Si no es increíblemente mejor, te devolvemos 100% el dinero a tu tarjeta el mismo día. <strong className="text-foreground">Cero peros, cero burocracia.</strong>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-center lg:justify-start gap-4 md:gap-6 flex-wrap w-full border-t border-border pt-6">
              <div className="flex items-center gap-2 border border-border px-3 py-1.5 bg-card">
                <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                <span className="font-mono text-[9px] md:text-[10px] text-foreground/60 uppercase tracking-wider font-bold">
                  Checkout Seguro
                </span>
              </div>
              <div className="flex items-center gap-2 border border-border px-3 py-1.5 bg-card">
                <RefreshCw className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
                <span className="font-mono text-[9px] md:text-[10px] text-foreground/60 uppercase tracking-wider font-bold">
                  Updates Gratis
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -left-10 md:-left-20 top-1/2 -translate-y-1/2 text-[15vw] md:text-[20vw] font-heading text-primary/[0.02] select-none pointer-events-none">
        $49
      </div>

      <EarlyAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cursoId="nitro-dropshipping"
        cursoTitulo="Nitro Dropshipping"
      />
    </section>
  )
}
