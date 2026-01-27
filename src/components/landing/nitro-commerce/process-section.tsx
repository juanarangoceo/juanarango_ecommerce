"use client"

import { MessageSquare, FileText, Wrench, Rocket, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Conversamos sobre tu negocio",
    description: "En una llamada de 30 minutos entendemos tu negocio, tus clientes ideales y qué te está frenando. Sin tecnicismos, solo preguntas sobre lo que importa: tus metas de crecimiento.",
    duration: "30 minutos",
    deliverable: "Diagnóstico inicial claro",
  },
  {
    number: "02",
    icon: FileText,
    title: "Te presentamos un plan concreto",
    description: "Basados en la conversación, diseñamos una propuesta personalizada. Te explicamos qué haremos, por qué, cuánto cuesta y qué resultados puedes esperar. Todo en español claro.",
    duration: "2-3 días",
    deliverable: "Propuesta detallada sin compromiso",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Construimos tu solución",
    description: "Si decides avanzar, nos ponemos manos a la obra. Cada semana te mostramos avances y puedes dar feedback. Tú participas sin necesitar saber de tecnología.",
    duration: "4-6 semanas",
    deliverable: "Tu presencia digital lista",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Lanzamos y te acompañamos",
    description: "Publicamos tu nueva presencia y te capacitamos en lo básico que necesitas saber. No te dejamos solo: los primeros 30 días estamos disponibles para cualquier ajuste.",
    duration: "Continuo",
    deliverable: "Soporte y seguimiento incluido",
  },
]

export function ProcessSection() {
  return (
    <section id="proceso" className="py-20 md:py-32 relative bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Así de simple es 
            <span className="text-primary"> trabajar con nosotros</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nada de procesos complicados ni reuniones interminables. Cuatro pasos 
            claros y en pocas semanas tienes resultados reales.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-[39px] top-[100px] w-0.5 h-6 bg-border hidden md:block" />
              )}
              
              <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-2xl border border-border bg-background hover:border-primary/30 transition-all duration-300">
                {/* Step Number & Icon */}
                <div className="flex items-center gap-4 md:flex-col md:items-start md:min-w-[80px]">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed max-w-2xl">
                        {step.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-col gap-2 lg:text-right lg:min-w-[220px]">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium w-fit lg:ml-auto">
                        {step.duration}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {step.deliverable}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-xl text-muted-foreground mb-6">
            ¿Listo para dar el primer paso?
          </p>
          <Button 
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_rgba(34,197,94,0.3)] group"
          >
            <Link href="#contacto">
              Quiero mi consulta gratuita
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Sin compromiso. Si después de hablar decides que no somos para ti, no pasa nada.
          </p>
        </div>
      </div>
    </section>
  )
}
