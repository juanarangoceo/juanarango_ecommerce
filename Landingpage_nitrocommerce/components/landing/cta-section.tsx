"use client"

import React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowRight, CheckCircle2, Clock, Shield, MessageSquare } from "lucide-react"

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
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    challenge: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

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

          {/* Right Column - Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-xl" />
            
            <div className="relative bg-card border border-border rounded-2xl p-8 shadow-2xl">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    ¡Perfecto! Ya recibimos tu mensaje
                  </h3>
                  <p className="text-muted-foreground">
                    Te contactaremos en menos de 24 horas para agendar tu 
                    consulta gratuita. Revisa tu email (y la carpeta de spam, por si acaso).
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Agenda tu consulta gratuita
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Completa el formulario y te contactamos para coordinar una llamada.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-foreground">Tu nombre *</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="¿Cómo te llamas?"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="bg-background border-border focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-foreground">WhatsApp o teléfono *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+57 300 123 4567"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="bg-background border-border focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-foreground">Email *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="tu@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="bg-background border-border focus:border-primary"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="business" className="text-foreground">Nombre de tu negocio</Label>
                        <Input
                          id="business"
                          name="business"
                          placeholder="Tu empresa o marca"
                          value={formData.business}
                          onChange={handleChange}
                          className="bg-background border-border focus:border-primary"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="challenge" className="text-foreground">
                        ¿Cuál es tu mayor desafío para conseguir más clientes online?
                      </Label>
                      <Textarea
                        id="challenge"
                        name="challenge"
                        placeholder="Cuéntanos un poco sobre tu negocio y qué te gustaría mejorar..."
                        value={formData.challenge}
                        onChange={handleChange}
                        rows={3}
                        className="bg-background border-border focus:border-primary resize-none"
                      />
                    </div>

                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_rgba(34,197,94,0.3)] group"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Enviando..."
                      ) : (
                        <>
                          Quiero mi consulta gratuita
                          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Tus datos están seguros. No spam. Solo te contactamos para lo que pediste.
                    </p>
                  </form>
                </>
              )}
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
