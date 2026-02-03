"use client";

import { X, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
  benefit: string;
}

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: Feature | null;
}

export function FeatureModal({ isOpen, onClose, feature }: FeatureModalProps) {
  if (!isOpen || !feature) return null;

  const scrollToContact = () => {
    onClose();
    setTimeout(() => {
      document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary/80 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="button"
        tabIndex={0}
        aria-label="Cerrar modal"
      />

      {/* Modal */}
      <div className="relative bg-card rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-primary transition-colors z-10"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="bg-secondary/10 p-8 border-b border-border">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-secondary/20 flex items-center justify-center">
              <feature.icon className="h-7 w-7 text-secondary" />
            </div>
            <div>
              <h3 className="font-serif text-2xl font-bold text-primary">
                {feature.title}
              </h3>
              <p className="font-sans text-sm text-muted-foreground mt-1">
                {feature.description}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          <h4 className="font-sans text-sm uppercase tracking-widest text-secondary mb-4">
            Incluye
          </h4>
          <ul className="space-y-3 mb-6">
            {feature.details.map((detail) => (
              <li key={detail} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="font-sans text-muted-foreground">{detail}</span>
              </li>
            ))}
          </ul>

          {/* Benefit Highlight */}
          <div className="bg-primary/5 rounded-xl p-4 mb-6">
            <p className="font-sans text-sm text-primary">
              <span className="font-semibold">Resultado:</span> {feature.benefit}
            </p>
          </div>

          {/* CTA */}
          <div className="flex gap-3">
            <Button
              onClick={scrollToContact}
              className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90 py-6 font-sans"
            >
              Solicitar Este Servicio
            </Button>
            <Button
              variant="outline"
              onClick={onClose}
              className="py-6 font-sans bg-transparent"
            >
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
