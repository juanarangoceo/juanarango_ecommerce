"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Shield } from "lucide-react"
import { ContactForm } from "@/components/ui/contact-form"

export function CTAForm() {
  return (
    <section 
      id="consulta" 
      className="py-20 lg:py-32 scroll-mt-20"
      aria-labelledby="cta-title"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left - Value Proposition */}
            <div>
              <Badge 
                variant="outline" 
                className="mb-6 px-4 py-2 border-primary/30 text-primary bg-primary/5"
              >
                Consulta Estratégica Gratuita
              </Badge>

              <h2 
                id="cta-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Hablemos de{" "}
                <span className="text-primary">Escalar</span>{" "}
                tu Negocio
              </h2>

              <p className="text-muted-foreground text-lg mb-8">
                Agenda una sesión de diagnóstico sin costo donde analizaremos juntos los cuellos de botella de tu infraestructura actual y las oportunidades de mejora.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Análisis de tu arquitectura actual",
                  "Identificación de quick wins",
                  "Roadmap personalizado de alto nivel",
                  "Sin compromiso ni presión de venta"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4" />
                <span>Tu información está protegida y nunca será compartida</span>
              </div>
            </div>

            {/* Right - Form */}
            <div className="p-6 lg:p-8 rounded-xl border border-border bg-card">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
