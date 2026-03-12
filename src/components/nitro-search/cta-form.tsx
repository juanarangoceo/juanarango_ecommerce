"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Shield } from "lucide-react"
import { ContactForm } from "@/components/ui/contact-form"

export function CTAForm() {
  return (
    <section 
      id="consulta" 
      className="py-16 lg:py-24 scroll-mt-20"
      aria-labelledby="cta-title"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left - Value Proposition */}
            <div>
              <Badge 
                variant="outline" 
                className="mb-6 px-4 py-2 border-emerald-500/30 text-emerald-400 bg-emerald-500/10"
              >
                Auditoría SEO Gratuita
              </Badge>

              <h2 
                id="cta-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Hablemos de tu{" "}
                <span className="text-emerald-400">Tráfico Orgánico</span>
              </h2>

              <p className="text-zinc-400 text-lg mb-8">
                Agenda una sesión de diagnóstico sin costo donde analizaremos tu posicionamiento actual, descubriremos oportunidades de palabras clave y trazaremos un plan para dominar Google.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Análisis de tu perfil de enlaces y autoridad",
                  "Identificación de palabras clave 'Quick Win'",
                  "Roadmap de optimización para SGE",
                  "Sin compromiso ni presión de venta"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-zinc-300">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-2 text-sm text-zinc-500">
                <Shield className="w-4 h-4" />
                <span>Tu información está protegida y nunca será compartida</span>
              </div>
            </div>

            {/* Right - Form */}
            <div className="p-6 lg:p-8 rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
              <ContactForm 
                interestOptions={[
                  "Auditoría SEO Local", 
                  "Estrategia SEO E-commerce", 
                  "Optimización para IA (SGE)", 
                  "Otro"
                ]} 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
