"use client"

import { MessageSquare, FileText, Wrench, Rocket, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Conversamos sobre tu inmobiliaria",
    description:
      "En una llamada de 30 minutos entendemos tu negocio, tu inventario, tu zona y que te esta frenando. Sin tecnicismos, solo preguntas sobre tus metas de crecimiento.",
    duration: "30 minutos",
    deliverable: "Diagnostico inicial claro",
  },
  {
    number: "02",
    icon: FileText,
    title: "Te presentamos un plan concreto",
    description:
      "Basados en la conversacion, disenamos una propuesta personalizada. Te explicamos que haremos, por que, cuanto cuesta y que resultados puedes esperar. Todo claro y transparente.",
    duration: "2-3 dias",
    deliverable: "Propuesta detallada sin compromiso",
  },
  {
    number: "03",
    icon: Wrench,
    title: "Construimos tu solucion",
    description:
      "Si decides avanzar, nos ponemos manos a la obra. Cada semana te mostramos avances y puedes dar feedback. Tu participas sin necesitar saber de tecnologia.",
    duration: "4-6 semanas",
    deliverable: "Tu presencia digital lista",
  },
  {
    number: "04",
    icon: Rocket,
    title: "Lanzamos y te acompanamos",
    description:
      "Publicamos tu nueva presencia y te capacitamos en lo basico. No te dejamos solo: los primeros 30 dias estamos disponibles para cualquier ajuste que necesites.",
    duration: "Continuo",
    deliverable: "Soporte y seguimiento incluido",
  },
]

export function ProcessSection() {
  return (
    <section id="proceso" className="py-20 md:py-28 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
            {"Asi de simple es "}
            <span className="text-accent">trabajar con nosotros</span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            Nada de procesos complicados ni reuniones interminables. Cuatro pasos
            claros y en pocas semanas tienes resultados reales.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-5">
          {steps.map((step, index) => (
            <div key={index} className="group relative">
              <div className="flex flex-col md:flex-row gap-6 p-6 md:p-8 rounded-2xl border border-border bg-card hover:border-accent/30 hover:shadow-sm transition-all duration-300">
                {/* Step Number & Icon */}
                <div className="flex items-center gap-4 md:flex-col md:items-start md:min-w-[80px]">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-2xl bg-primary/8 flex items-center justify-center group-hover:bg-primary/12 transition-colors">
                      <step.icon className="w-7 h-7 text-primary" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">
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
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-medium w-fit lg:ml-auto">
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
          <p className="font-serif text-xl text-foreground mb-6">
            Listo para dar el primer paso?
          </p>
          <Button
            asChild
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium group"
          >
            <Link href="#contacto">
              Quiero mi consulta gratuita
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <p className="mt-4 text-sm text-muted-foreground">
            Sin compromiso. Si despues de hablar decides que no somos para ti, no
            pasa nada.
          </p>
        </div>
      </div>
    </section>
  )
}
