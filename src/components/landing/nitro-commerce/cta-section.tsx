"use client"

import { CheckCircle2, Clock, Shield, MessageSquare } from "lucide-react"
import { ContactForm } from "@/components/ui/contact-form"

interface PSEOVariables {
  ciudad: string
  departamento: string
  nicho: string
  nichoPlural: string
  subtituloContextual: string
  textoAutoridad: string
  mencionLocal: string
  parrafoValor: string
}

interface CTASectionProps {
  pSEO: PSEOVariables
}

const benefits = [
  "Análisis gratuito de tu presencia digital actual",
  "Identificamos por qué no estás atrayendo más clientes",
  "Plan personalizado para tu tipo de negocio",
  "Estimación clara de resultados esperados",
  "Sin compromiso, sin presión de venta",
]

export function CTASection({ pSEO }: CTASectionProps) {
  return (
    <section id="contacto" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Copy */}
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
              Hablemos de cómo hacer crecer tu 
              <span className="text-primary"> {pSEO.nicho}</span> en {pSEO.ciudad}
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              En 30 minutos te mostramos exactamente qué está frenando tu negocio 
              online y cómo podemos ayudarte a conseguir más clientes. Sin 
              tecnicismos, sin jerga, solo conversación honesta sobre tu negocio.
            </p>

            {/* Benefits List */}
            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            {/* Trust Elements */}
            <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-border">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm">Respuesta en 24h</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="w-5 h-5 text-primary" />
                <span className="text-sm">100% gratuito</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MessageSquare className="w-5 h-5 text-primary" />
                <span className="text-sm">Sin compromiso</span>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-xl" />
            
            <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl">
              <h3 className="text-xl font-bold text-foreground mb-2">
                Agenda tu consulta gratuita
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Completa el formulario y te contactamos para coordinar una llamada.
              </p>
              
              <ContactForm />
            </div>
          </div>
        </div>

        {/* Urgency Element */}
        <div className="mt-16 text-center max-w-2xl mx-auto">
          <p className="text-muted-foreground">
            <span className="text-foreground font-medium">Dato importante:</span> Solo tomamos 
            5 proyectos nuevos por mes para garantizar atención personalizada. Si 
            tu competencia llega primero, tendrás que esperar.
          </p>
        </div>
      </div>
    </section>
  )
}
