"use client"

import { useState } from "react"
import { LayoutTemplate, MonitorSmartphone, Database, Bot, Rocket, ChevronDown } from "lucide-react"

const phases = [
  {
    num: "01",
    title: "La Arquitectura de Conversión (El Plano Maestro)",
    icon: LayoutTemplate,
    desc: "El diseño de una oferta irresistible antes de escribir una sola línea de código.",
    modules: [
      {
        title: "El Mindset de Soberanía",
        desc: "Por qué el modelo de \"alquiler\" mensual es el asesino silencioso de tu rentabilidad y cómo escapar de él."
      },
      {
        title: "El Prompt Arquitecto",
        desc: "Copia y pega nuestra instrucción maestra en la IA para que redacte todo tu copy persuasivo y estructure una Landing Page de formato largo, diseñada psicológicamente para el modelo Contraentrega (COD)."
      },
      {
        title: "Dirección de Arte Tech-Premium",
        desc: "Aprende a darle a la IA las directrices visuales exactas para que tu página no parezca un WordPress barato, sino una marca de élite."
      }
    ]
  },
  {
    num: "02",
    title: "El Ecosistema Visual de Alta Gama (Frontend UI)",
    icon: MonitorSmartphone,
    desc: "Transformando el texto en una máquina de ventas interactiva y móvil.",
    modules: [
      {
        title: "Programación sin Código (Vibe Coding)",
        desc: "Usaremos una IA generativa de código para crear una interfaz de vanguardia en segundos. Adiós a los constructores lentos de arrastrar y soltar."
      },
      {
        title: "El Diseño de \"Fricción Cero\"",
        desc: "Implementación de contadores de urgencia reales, botones de compra flotantes y animaciones premium que retienen la atención del cliente."
      },
      {
        title: "El Formulario COD Perfecto",
        desc: "Creación del módulo de pedidos integrado directamente en la página para que el cliente compre con un solo clic, sin pasar por carritos abandonados."
      }
    ]
  },
  {
    num: "03",
    title: "Tu Motor de Datos Privado (Backend a Costo $0)",
    icon: Database,
    desc: "La bóveda donde vivirán tus pedidos, sin pagar suscripciones mensuales.",
    modules: [
      {
        title: "Creación de tu Bóveda de Pedidos",
        desc: "Configuraremos una base de datos profesional y gratuita para recibir los nombres, direcciones y teléfonos de tus clientes al instante."
      },
      {
        title: "Propiedad Absoluta",
        desc: "Dejas de regalarle la data de tus clientes a plataformas de terceros. Tú controlas el 100% de la información de tu negocio."
      },
      {
        title: "Gestión Ligera",
        desc: "Cómo leer y administrar tus envíos de Contraentrega de forma limpia, rápida y sin paneles complicados."
      }
    ]
  },
  {
    num: "04",
    title: "El Vendedor Invisible 24/7 (Inteligencia Conversacional)",
    icon: Bot,
    desc: "Automatización extrema para no perder ni una sola venta por dudas de última hora.",
    modules: [
      {
        title: "Integración del Cerebro IA",
        desc: "Conectaremos un modelo de lenguaje avanzado directamente a tu tienda."
      },
      {
        title: "Entrenamiento del Vendedor",
        desc: "Le inyectaremos a la IA el conocimiento de tu producto (tiempos de envío, garantías, características) para que responda como tu mejor empleado de soporte."
      },
      {
        title: "Cierre y Cualificación",
        desc: "La IA resolverá objeciones en tiempo real y te ayudará a filtrar qué pedidos Contraentrega son reales y cuáles son falsos, ahorrándote dinero en devoluciones logísticas."
      }
    ]
  },
  {
    num: "05",
    title: "Despliegue Global y Soberanía Tecnológica (El Lanzamiento)",
    icon: Rocket,
    desc: "El paso final: ensamblar todo y subirlo a internet con velocidad de la luz.",
    modules: [
      {
        title: "El Agente Orquestador",
        desc: "Usaremos una IA autónoma que se encargará de conectar tu diseño visual con tu base de datos y tu chatbot, sin que tú tengas que lidiar con la integración técnica."
      },
      {
        title: "Control de Versiones y Propiedad",
        desc: "Te enseñamos a guardar tu código en un repositorio propio. Si un producto muere, clonas tu estructura y lanzas el siguiente en 5 minutos."
      },
      {
        title: "Despliegue Edge (Carga en Milisegundos)",
        desc: "Subiremos tu tienda a una red global gratuita. Tu web cargará más rápido que cualquier tienda tradicional, garantizando que el tráfico de tus anuncios de TikTok o Meta no rebote por lentitud."
      }
    ]
  }
]

export function PensumSection() {
  const [openPhase, setOpenPhase] = useState<string | null>("01")

  const togglePhase = (num: string) => {
    setOpenPhase(openPhase === num ? null : num)
  }

  return (
    <section className="py-16 md:py-20 lg:py-28 border-b border-border bg-card">
      <div className="max-w-6xl mx-auto px-5 md:px-6 lg:px-12">
        <div className="font-mono text-[11px] md:text-xs text-primary tracking-[0.25em] uppercase mb-5 md:mb-6 text-center font-bold">
          {'// LO QUE VAS A DOMINAR'}
        </div>
        <h2 className="font-heading text-[clamp(2.2rem,5vw,5rem)] leading-[0.85] mb-5 md:mb-6 text-center text-balance">
          EL SPRINT DE 5 FASES:<br />
          <span className="text-primary text-glow">EL CAMINO NITRO.</span>
        </h2>
        <p className="text-foreground/70 text-base md:text-lg max-w-2xl mx-auto mb-12 md:mb-16 text-center leading-relaxed text-pretty">
          No te enseñamos a usar plantillas; te entregamos los &quot;Prompts Maestros&quot; para que la Inteligencia Artificial construya tu negocio por ti.
        </p>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Línea vertical de progreso */}
            <div className="absolute left-[1.35rem] md:left-[2.25rem] top-4 bottom-4 w-px bg-border hidden sm:block" />

            <div className="space-y-6 md:space-y-8">
              {phases.map((phase) => {
                const isOpen = openPhase === phase.num;
                return (
                  <div key={phase.num} className="relative flex flex-col sm:flex-row gap-4 md:gap-8 group">
                    {/* Indicador Numérico (Timeline Node) */}
                    <div className="shrink-0 flex items-center sm:items-start pl-0 sm:pl-0 z-10 w-full sm:w-auto relative">
                      <div className="absolute top-1/2 -translate-y-1/2 sm:top-auto sm:-translate-y-0 h-px w-full bg-border sm:hidden z-0" />
                      <div
                        className={`relative z-10 w-11 h-11 md:w-16 md:h-16 flex items-center justify-center border font-heading text-lg md:text-2xl transition-all duration-300 mx-auto sm:mx-0 bg-background ${
                          isOpen
                            ? "border-primary text-primary shadow-[0_0_20px_rgba(0,255,157,0.3)]"
                            : "border-border text-foreground/40 group-hover:border-primary/50 group-hover:text-primary/70"
                        }`}
                      >
                        {phase.num}
                      </div>
                    </div>

                    {/* Tarjeta de Contenido */}
                    <div 
                      className={`flex-1 border transition-all duration-300 bg-background ${
                        isOpen ? "border-primary/50 shadow-lg shadow-black/50" : "border-border hover:border-primary/30"
                      }`}
                    >
                      {/* Cabecera (Clickable) */}
                      <button
                        onClick={() => togglePhase(phase.num)}
                        className={`w-full text-left p-5 md:p-6 flex items-start sm:items-center justify-between gap-4 transition-colors ${
                          isOpen ? "bg-primary/[0.03]" : "hover:bg-card"
                        }`}
                      >
                        <div className="flex items-start sm:items-center gap-4">
                          <div className={`p-2.5 sm:p-3 border shrink-0 transition-colors ${
                            isOpen ? "bg-primary/10 border-primary/30 text-primary" : "bg-card border-border text-foreground/50 group-hover:text-primary"
                          }`}>
                            <phase.icon className="w-5 h-5 md:w-6 md:h-6" />
                          </div>
                          <div>
                            <h3 className={`font-bold text-lg md:text-xl xl:text-2xl leading-tight transition-colors ${isOpen ? "text-primary" : "text-foreground group-hover:text-primary/80"}`}>
                              {phase.title}
                            </h3>
                            <p className="text-foreground/60 text-sm md:text-base mt-1.5 leading-snug">
                              {phase.desc}
                            </p>
                          </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 shrink-0 text-foreground/40 transition-transform duration-300 ${isOpen ? "rotate-180 text-primary" : ""}`} />
                      </button>

                      {/* Contenido Desplegable (Módulos) */}
                      <div 
                        className={`overflow-hidden transition-all duration-300 ease-in-out ${
                          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
                        }`}
                      >
                        <div className="p-5 md:p-8 pt-0 md:pt-2 border-t border-border/50">
                          <div className="grid gap-5 md:gap-6 relative">
                             {/* Línea conectora interna */}
                             <div className="absolute left-2.5 top-2 bottom-2 w-px bg-border/50" />
                             
                            {phase.modules.map((mod, idx) => (
                              <div key={idx} className="relative pl-8 md:pl-10">
                                {/* Nodo interno */}
                                <div className="absolute left-0 top-1.5 md:top-2 w-5 h-5 bg-background border border-primary/30 flex items-center justify-center">
                                  <div className="w-1.5 h-1.5 bg-primary/60 rounded-full" />
                                </div>
                                
                                <h4 className="font-bold text-foreground text-sm md:text-base mb-1.5">
                                  {mod.title}
                                </h4>
                                <p className="text-foreground/60 text-xs md:text-sm leading-relaxed text-pretty">
                                  {mod.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
