"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Home,
  TrendingUp,
  Key,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const interests = [
  { id: "comprar", label: "Comprar propiedad", icon: Home },
  { id: "invertir", label: "Inversión", icon: TrendingUp },
  { id: "vender", label: "Vender mi propiedad", icon: Key },
  { id: "arrendar", label: "Arrendamiento", icon: Building2 },
];

const propertyTypes = [
  "Apartamento",
  "Casa",
  "Penthouse",
  "Local Comercial",
  "Oficina",
  "Finca",
];

const budgetRanges = [
  "Menos de $200M",
  "$200M - $500M",
  "$500M - $1.000M",
  "$1.000M - $2.000M",
  "Más de $2.000M",
];

export function ContactSection() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    interest: "",
    propertyType: [] as string[],
    budget: "",
    location: "",
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const togglePropertyType = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      propertyType: prev.propertyType.includes(type)
        ? prev.propertyType.filter((t) => t !== type)
        : [...prev.propertyType, type],
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const canProceed = () => {
    if (step === 1) return formData.interest !== "";
    if (step === 2) return formData.propertyType.length > 0 && formData.budget !== "";
    if (step === 3) return formData.name && formData.phone && formData.email;
    return true;
  };

  return (
    <section id="contacto" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12">
          {/* Info Column */}
          <div className="lg:col-span-2">
            <span className="font-sans text-sm uppercase tracking-[0.2em] text-secondary mb-2 block">
              Contáctanos
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6 text-balance">
              Cuéntanos qué estás buscando
            </h2>
            <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-8">
              Nuestros asesores especializados te guiarán en cada paso. 
              Completa el formulario y recibirás una propuesta personalizada en menos de 24 horas.
            </p>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-sans text-sm text-muted-foreground">Línea directa</p>
                  <a href="tel:+573001234567" className="font-sans font-medium text-primary hover:text-secondary transition-colors">
                    +57 300 123 4567
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-sans text-sm text-muted-foreground">Email</p>
                  <a href="mailto:asesores@luxeestates.com" className="font-sans font-medium text-primary hover:text-secondary transition-colors">
                    asesores@luxeestates.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-sans text-sm text-muted-foreground">Oficina principal</p>
                  <p className="font-sans font-medium text-primary">
                    Calle 10 #34-56, El Poblado, Medellín
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/50">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <p className="font-sans text-sm text-muted-foreground">Horario de atención</p>
                  <p className="font-sans font-medium text-primary">
                    Lun - Vie: 8:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-3">
            <div className="bg-card rounded-3xl border border-border/50 shadow-lg overflow-hidden">
              {/* Progress Header */}
              <div className="bg-primary p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-serif text-xl font-bold text-background">
                    {isSuccess ? "Solicitud Enviada" : "Tu búsqueda personalizada"}
                  </h3>
                  <span className="font-sans text-sm text-background/70">
                    {!isSuccess && `Paso ${step} de 3`}
                  </span>
                </div>
                {!isSuccess && (
                  <div className="flex gap-2">
                    {[1, 2, 3].map((s) => (
                      <div
                        key={s}
                        className={`h-1 flex-1 rounded-full transition-colors ${
                          s <= step ? "bg-secondary" : "bg-background/20"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Form Content */}
              <div className="p-6 sm:p-8">
                {isSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="h-10 w-10 text-green-600" />
                    </div>
                    <h4 className="font-serif text-2xl font-bold text-primary mb-3">
                      Gracias por contactarnos
                    </h4>
                    <p className="font-sans text-muted-foreground max-w-md mx-auto mb-6">
                      Un asesor especializado revisará tu solicitud y te contactará 
                      en las próximas horas con opciones personalizadas para ti.
                    </p>
                    <Button
                      onClick={() => {
                        setIsSuccess(false);
                        setStep(1);
                        setFormData({
                          interest: "",
                          propertyType: [],
                          budget: "",
                          location: "",
                          name: "",
                          phone: "",
                          email: "",
                          message: "",
                        });
                      }}
                      variant="outline"
                      className="font-sans bg-transparent"
                    >
                      Enviar otra solicitud
                    </Button>
                  </div>
                ) : (
                  <>
                    {/* Step 1: Interest */}
                    {step === 1 && (
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-sans font-medium text-primary mb-4">
                            ¿Qué te gustaría hacer?
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {interests.map((item) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => setFormData({ ...formData, interest: item.id })}
                                className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                                  formData.interest === item.id
                                    ? "border-secondary bg-secondary/10"
                                    : "border-border hover:border-secondary/50"
                                }`}
                              >
                                <item.icon
                                  className={`h-5 w-5 ${
                                    formData.interest === item.id
                                      ? "text-secondary"
                                      : "text-muted-foreground"
                                  }`}
                                />
                                <span
                                  className={`font-sans text-sm ${
                                    formData.interest === item.id
                                      ? "text-primary font-medium"
                                      : "text-muted-foreground"
                                  }`}
                                >
                                  {item.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Property Details */}
                    {step === 2 && (
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-sans font-medium text-primary mb-4">
                            ¿Qué tipo de propiedad te interesa?
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {propertyTypes.map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() => togglePropertyType(type)}
                                className={`px-4 py-2 rounded-full border-2 font-sans text-sm transition-all ${
                                  formData.propertyType.includes(type)
                                    ? "border-secondary bg-secondary/10 text-primary"
                                    : "border-border text-muted-foreground hover:border-secondary/50"
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-sans font-medium text-primary mb-4">
                            ¿Cuál es tu presupuesto?
                          </h4>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {budgetRanges.map((range) => (
                              <button
                                key={range}
                                type="button"
                                onClick={() => setFormData({ ...formData, budget: range })}
                                className={`px-4 py-3 rounded-xl border-2 font-sans text-sm transition-all ${
                                  formData.budget === range
                                    ? "border-secondary bg-secondary/10 text-primary"
                                    : "border-border text-muted-foreground hover:border-secondary/50"
                                }`}
                              >
                                {range}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-sans font-medium text-primary mb-4">
                            ¿En qué zona buscas? (opcional)
                          </h4>
                          <Input
                            placeholder="Ej: El Poblado, Laureles, Envigado..."
                            className="py-6 font-sans"
                            value={formData.location}
                            onChange={(e) =>
                              setFormData({ ...formData, location: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 3: Contact Info */}
                    {step === 3 && (
                      <div className="space-y-6">
                        <div>
                          <h4 className="font-sans font-medium text-primary mb-4">
                            Tus datos de contacto
                          </h4>
                          <div className="space-y-4">
                            <Input
                              placeholder="Nombre completo"
                              className="py-6 font-sans"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({ ...formData, name: e.target.value })
                              }
                            />
                            <Input
                              type="tel"
                              placeholder="WhatsApp (+57...)"
                              className="py-6 font-sans"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({ ...formData, phone: e.target.value })
                              }
                            />
                            <Input
                              type="email"
                              placeholder="correo@ejemplo.com"
                              className="py-6 font-sans"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({ ...formData, email: e.target.value })
                              }
                            />
                          </div>
                        </div>

                        <div>
                          <h4 className="font-sans font-medium text-primary mb-4">
                            ¿Algo más que debamos saber? (opcional)
                          </h4>
                          <textarea
                            placeholder="Cuéntanos detalles adicionales: número de habitaciones, características especiales, urgencia..."
                            className="w-full px-4 py-4 rounded-xl border border-input bg-background font-sans text-sm resize-none h-24 focus:outline-none focus:ring-2 focus:ring-secondary/50"
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({ ...formData, message: e.target.value })
                            }
                          />
                        </div>
                      </div>
                    )}

                    {/* Navigation */}
                    <div className="flex gap-3 mt-8">
                      {step > 1 && (
                        <Button
                          variant="outline"
                          onClick={() => setStep(step - 1)}
                          className="font-sans bg-transparent"
                        >
                          Atrás
                        </Button>
                      )}
                      {step < 3 ? (
                        <Button
                          onClick={() => setStep(step + 1)}
                          disabled={!canProceed()}
                          className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90 py-6 font-sans"
                        >
                          Continuar
                        </Button>
                      ) : (
                        <Button
                          onClick={handleSubmit}
                          disabled={!canProceed() || isSubmitting}
                          className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90 py-6 font-sans"
                        >
                          {isSubmitting ? (
                            <div className="flex items-center gap-2">
                              <div className="h-4 w-4 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
                              Enviando...
                            </div>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Enviar Solicitud
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
