"use client"

import React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, 
  CheckCircle2, 
  Shield,
  Calendar
} from "lucide-react"

type FormStep = 1 | 2 | 3

export function CTAForm() {
  const [step, setStep] = useState<FormStep>(1)
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    challenge: "",
    revenue: ""
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleNextStep = () => {
    if (step < 3) {
      setStep((step + 1) as FormStep)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <section 
        id="consulta" 
        className="py-20 lg:py-32 scroll-mt-20"
        aria-labelledby="cta-title"
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-3xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
              ¡Solicitud Recibida!
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              Gracias por tu interés, {formData.name}. Revisaré tu caso personalmente y te contactaré en las próximas 24-48 horas hábiles para agendar tu consulta estratégica.
            </p>
            <div className="p-4 rounded-lg bg-card border border-border inline-flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-sm">Espera mi email para confirmar fecha y hora</span>
            </div>
          </div>
        </div>
      </section>
    )
  }

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
              {/* Progress indicator */}
              <div className="flex items-center gap-2 mb-8">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-2">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        s <= step 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-secondary text-muted-foreground'
                      }`}
                    >
                      {s}
                    </div>
                    {s < 3 && (
                      <div 
                        className={`w-8 h-0.5 transition-colors ${
                          s < step ? 'bg-primary' : 'bg-border'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1 */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-1">Empecemos por conocernos</h3>
                      <p className="text-sm text-muted-foreground">¿Cómo te llamas y cuál es tu empresa?</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">Tu nombre</Label>
                      <Input
                        id="name"
                        placeholder="Juan Pérez"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                        className="bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Nombre de tu empresa</Label>
                      <Input
                        id="company"
                        placeholder="Empresa S.A."
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        required
                        className="bg-background"
                      />
                    </div>

                    <Button 
                      type="button" 
                      onClick={handleNextStep}
                      disabled={!formData.name || !formData.company}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Siguiente
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-1">¿Cómo te contactamos?</h3>
                      <p className="text-sm text-muted-foreground">Necesitamos tus datos para agendar la consulta</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email corporativo</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="juan@empresa.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        className="bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono (opcional)</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 234 567 8900"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="bg-background"
                      />
                    </div>

                    <Button 
                      type="button" 
                      onClick={handleNextStep}
                      disabled={!formData.email}
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Siguiente
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                )}

                {/* Step 3 */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-1">Cuéntame sobre tu desafío</h3>
                      <p className="text-sm text-muted-foreground">Esto me ayuda a preparar mejor nuestra sesión</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="challenge">¿Cuál es tu mayor desafío técnico ahora?</Label>
                      <Textarea
                        id="challenge"
                        placeholder="Ej: Nuestra web se cae en días de alto tráfico, necesitamos automatizar procesos manuales, queremos implementar IA..."
                        value={formData.challenge}
                        onChange={(e) => handleInputChange('challenge', e.target.value)}
                        rows={4}
                        className="bg-background resize-none"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="revenue">Facturación mensual aproximada</Label>
                      <select
                        id="revenue"
                        value={formData.revenue}
                        onChange={(e) => handleInputChange('revenue', e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="">Selecciona un rango</option>
                        <option value="0-50k">$0 - $50,000 USD</option>
                        <option value="50k-200k">$50,000 - $200,000 USD</option>
                        <option value="200k-500k">$200,000 - $500,000 USD</option>
                        <option value="500k+">$500,000+ USD</option>
                      </select>
                    </div>

                    <Button 
                      type="submit"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Solicitar Consulta Gratuita
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
