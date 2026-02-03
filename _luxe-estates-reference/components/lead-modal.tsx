"use client";

import { useState } from "react";
import { X, Lock, Phone, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string | null;
}

export function LeadModal({ isOpen, onClose, propertyId }: LeadModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    purpose: "",
    creditApproved: "",
    timeline: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false);
      setStep(1);
      setFormData({
        phone: "",
        email: "",
        purpose: "",
        creditApproved: "",
        timeline: "",
      });
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary/80 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="button"
        tabIndex={0}
        aria-label="Close modal"
      />

      {/* Modal */}
      <div className="relative bg-card rounded-3xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-primary transition-colors z-10"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Success State */}
        {isSuccess ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-primary mb-2">
              ¡Acceso Desbloqueado!
            </h3>
            <p className="font-sans text-muted-foreground">
              Te enviaremos el tour virtual a tu correo en segundos.
            </p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="bg-secondary/10 p-6 border-b border-border">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-secondary" />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-primary">
                    Contenido Exclusivo
                  </h3>
                  <p className="font-sans text-sm text-muted-foreground">
                    Desbloquea tour 3D y planos
                  </p>
                </div>
              </div>
              {/* Progress */}
              <div className="flex gap-2">
                {[1, 2, 3].map((s) => (
                  <div
                    key={s}
                    className={`h-1 flex-1 rounded-full ${
                      s <= step ? "bg-secondary" : "bg-border"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Form Steps */}
            <div className="p-6">
              {step === 1 && (
                <div className="space-y-4">
                  <h4 className="font-sans text-sm font-medium text-primary mb-4">
                    ¿Cómo te contactamos?
                  </h4>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="tel"
                      placeholder="WhatsApp (+57...)"
                      className="pl-10 py-6 font-sans"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="correo@ejemplo.com"
                      className="pl-10 py-6 font-sans"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                    />
                  </div>
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!formData.phone || !formData.email}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-6 font-sans"
                  >
                    Continuar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <h4 className="font-sans text-sm font-medium text-primary mb-4">
                    ¿Cuál es tu objetivo?
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {["Vivir", "Invertir", "Ambos", "Explorar"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, purpose: option })
                        }
                        className={`p-4 rounded-xl border-2 font-sans text-sm transition-colors ${
                          formData.purpose === option
                            ? "border-secondary bg-secondary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-secondary/50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!formData.purpose}
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-6 font-sans mt-4"
                  >
                    Continuar
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h4 className="font-sans text-sm font-medium text-primary mb-4">
                    ¿Tienes crédito pre-aprobado?
                  </h4>
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    {["Sí", "No", "En proceso", "Efectivo"].map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() =>
                          setFormData({ ...formData, creditApproved: option })
                        }
                        className={`p-4 rounded-xl border-2 font-sans text-sm transition-colors ${
                          formData.creditApproved === option
                            ? "border-secondary bg-secondary/10 text-primary"
                            : "border-border text-muted-foreground hover:border-secondary/50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                  <h4 className="font-sans text-sm font-medium text-primary mb-4">
                    ¿Cuándo planeas comprar?
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    {["1-3 meses", "3-6 meses", "6-12 meses", "Solo mirando"].map(
                      (option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, timeline: option })
                          }
                          className={`p-4 rounded-xl border-2 font-sans text-sm transition-colors ${
                            formData.timeline === option
                              ? "border-secondary bg-secondary/10 text-primary"
                              : "border-border text-muted-foreground hover:border-secondary/50"
                          }`}
                        >
                          {option}
                        </button>
                      )
                    )}
                  </div>
                  <Button
                    onClick={handleSubmit}
                    disabled={
                      !formData.creditApproved || !formData.timeline || isSubmitting
                    }
                    className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-6 font-sans mt-4"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
                        Procesando...
                      </div>
                    ) : (
                      <>
                        Desbloquear Contenido
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>
              )}

              <p className="font-sans text-xs text-muted-foreground text-center mt-4">
                Al continuar, aceptas nuestra política de privacidad
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
