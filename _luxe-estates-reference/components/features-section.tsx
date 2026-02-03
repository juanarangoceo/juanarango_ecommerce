"use client";

import { useState } from "react";
import {
  Shield,
  Clock,
  TrendingUp,
  Home,
  HeartHandshake,
  FileCheck,
  ChevronRight,
} from "lucide-react";
import { FeatureModal } from "./feature-modal";
import type { LucideIcon } from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  details: string[];
  benefit: string;
}

const features: Feature[] = [
  {
    icon: Shield,
    title: "Propiedades Verificadas",
    description:
      "Cada inmueble pasa por un riguroso proceso de verificación legal y documental.",
    details: [
      "Estudio de títulos completo",
      "Verificación de libertad y tradición",
      "Revisión de paz y salvos",
      "Validación de documentos del propietario",
      "Inspección física del inmueble",
    ],
    benefit:
      "Compra con total tranquilidad sabiendo que cada documento está en regla.",
  },
  {
    icon: Clock,
    title: "Tours Virtuales 360°",
    description:
      "Explora propiedades en detalle desde cualquier lugar, en cualquier momento.",
    details: [
      "Recorridos virtuales profesionales",
      "Fotografía de alta resolución",
      "Videos cinematográficos",
      "Planos arquitectónicos detallados",
      "Disponible 24/7 en cualquier dispositivo",
    ],
    benefit:
      "Ahorra tiempo visitando solo las propiedades que realmente te interesan.",
  },
  {
    icon: TrendingUp,
    title: "Análisis de Inversión",
    description:
      "Proyecciones de valorización y análisis de retorno elaborados por expertos.",
    details: [
      "Estudio de mercado de la zona",
      "Proyección de valorización a 5 años",
      "Análisis de rentabilidad por arriendo",
      "Comparativo con propiedades similares",
      "Asesoría en estrategia de inversión",
    ],
    benefit:
      "Toma decisiones informadas con datos reales del mercado inmobiliario.",
  },
  {
    icon: Home,
    title: "Asesoría Premium",
    description:
      "Un asesor dedicado exclusivamente a entender y cumplir tus expectativas.",
    details: [
      "Asesor personal asignado",
      "Búsqueda activa de propiedades",
      "Negociación experta en tu nombre",
      "Comunicación directa y prioritaria",
      "Seguimiento personalizado",
    ],
    benefit:
      "Recibe atención de primera clase con un experto enfocado solo en ti.",
  },
  {
    icon: FileCheck,
    title: "Gestión Legal Completa",
    description:
      "Nos encargamos de todo el proceso legal para que tú solo firmes.",
    details: [
      "Elaboración de promesa de compraventa",
      "Coordinación con notaría",
      "Gestión de escrituras",
      "Registro de la propiedad",
      "Asesoría tributaria incluida",
    ],
    benefit:
      "Proceso legal sin complicaciones, manejado por profesionales.",
  },
  {
    icon: HeartHandshake,
    title: "Acompañamiento Total",
    description:
      "Te guiamos desde la primera llamada hasta que estrenes tu nuevo hogar.",
    details: [
      "Asesoría en financiación",
      "Conexión con entidades bancarias",
      "Coordinación de inspecciones",
      "Apoyo en trámites de servicios públicos",
      "Seguimiento post-venta",
    ],
    benefit:
      "Nunca estarás solo en ningún paso del proceso de compra.",
  },
];

export function FeaturesSection() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (feature: Feature) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
  };

  return (
    <section id="nosotros" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-sm uppercase tracking-[0.2em] text-secondary mb-2 block">
            Por qué elegirnos
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4 text-balance">
            El respaldo que tu inversión merece
          </h2>
          <p className="font-sans text-lg text-muted-foreground leading-relaxed">
            Más de 15 años de experiencia nos respaldan. Conoce cómo hacemos 
            que encontrar tu propiedad ideal sea una experiencia extraordinaria.
          </p>
        </div>

        {/* Features Grid - Bento Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <button
              type="button"
              key={feature.title}
              onClick={() => openModal(feature)}
              className={`group relative bg-card rounded-2xl p-8 border border-border/50 hover:border-secondary/30 transition-all duration-300 hover:shadow-lg text-left cursor-pointer ${
                index === 0 || index === 5 ? "md:col-span-2 lg:col-span-1" : ""
              }`}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-secondary" />
              </div>

              {/* Content */}
              <h3 className="font-serif text-xl font-bold text-primary mb-3">
                {feature.title}
              </h3>
              <p className="font-sans text-muted-foreground leading-relaxed mb-4">
                {feature.description}
              </p>

              {/* Learn More */}
              <div className="flex items-center gap-2 text-secondary font-sans text-sm font-medium group-hover:gap-3 transition-all">
                <span>Conocer más</span>
                <ChevronRight className="h-4 w-4" />
              </div>

              {/* Hover Accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-secondary/0 group-hover:bg-secondary rounded-b-2xl transition-colors" />
            </button>
          ))}
        </div>
      </div>

      {/* Feature Modal */}
      <FeatureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        feature={selectedFeature}
      />
    </section>
  );
}
