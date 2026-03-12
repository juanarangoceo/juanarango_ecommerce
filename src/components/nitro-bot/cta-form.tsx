"use client"

import React from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Shield } from "lucide-react"
import { ContactForm } from "@/components/ui/contact-form"

export function CTAForm() {
  return (
    <section 
      id="consulta" 
      className="py-16 lg:py-24 scroll-mt-20 bg-zinc-950 border-t border-zinc-900"
      aria-labelledby="cta-title"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left - Value Proposition */}
            <div>
              <Badge 
                variant="outline" 
                className="mb-6 px-4 py-2 border-blue-500/30 text-blue-400 bg-blue-500/10"
              >
                Demostración Gratuita
              </Badge>

              <h2 
                id="cta-title"
                className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                Hablemos de Automatizar tu{" "}
                <span className="text-blue-400">Soporte y Ventas</span>
              </h2>

              <p className="text-zinc-400 text-lg mb-8">
                Agenda una sesión estratégica sin costo de 15 minutos donde te mostraremos en vivo cómo un Agente Inteligente atenderá a tus clientes 24/7 sin fallar.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  "Demostración del bot en vivo",
                  "Análisis de viabilidad para tu caso de uso",
                  "Cálculo del ROI de la automatización",
                  "Sin compromiso ni presión de venta"
                ].map((item, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-400 flex-shrink-0" />
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
                  "Bot para Atención al Cliente", 
                  "Bot para Cierre de Ventas", 
                  "Automatización de Reservas", 
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
