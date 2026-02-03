"use client";

import { useState } from "react";
import { PropertyCard } from "./property-card";
import { LeadModal } from "./lead-modal";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const properties = [
  {
    id: "1",
    title: "Penthouse Vista Panorámica",
    location: "El Poblado, Medellín",
    price: "$850,000",
    image: "/images/property-1.jpg",
    beds: 4,
    baths: 3,
    sqft: 320,
    viewers: 5,
  },
  {
    id: "2",
    title: "Villa Montaña Encantada",
    location: "La Calera, Bogotá",
    price: "$1,200,000",
    image: "/images/property-2.jpg",
    beds: 5,
    baths: 4,
    sqft: 450,
    isSignature: true,
    viewers: 8,
  },
  {
    id: "3",
    title: "Casa Frente al Mar",
    location: "Cartagena, Bolívar",
    price: "$2,100,000",
    image: "/images/property-3.jpg",
    beds: 6,
    baths: 5,
    sqft: 580,
    isSignature: true,
    viewers: 12,
  },
  {
    id: "4",
    title: "Loft Industrial Moderno",
    location: "Chapinero, Bogotá",
    price: "$420,000",
    image: "/images/property-4.jpg",
    beds: 2,
    baths: 2,
    sqft: 150,
    viewers: 3,
  },
  {
    id: "5",
    title: "Hacienda Valle Verde",
    location: "Rionegro, Antioquia",
    price: "$1,800,000",
    image: "/images/property-5.jpg",
    beds: 7,
    baths: 6,
    sqft: 800,
    isSignature: true,
  },
  {
    id: "6",
    title: "Casa de Cristal",
    location: "Envigado, Antioquia",
    price: "$950,000",
    image: "/images/property-6.jpg",
    beds: 4,
    baths: 3,
    sqft: 380,
    viewers: 6,
  },
];

export function PropertiesGrid() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null);

  const handleUnlock = (propertyId: string) => {
    setSelectedProperty(propertyId);
    setIsModalOpen(true);
  };

  return (
    <section id="propiedades" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="font-sans text-sm uppercase tracking-[0.2em] text-secondary mb-2 block">
              Colección
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary">
              Propiedades Destacadas
            </h2>
          </div>
          <Button
            variant="outline"
            className="font-sans text-sm tracking-wide self-start md:self-auto bg-transparent"
          >
            Ver todas
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onUnlock={() => handleUnlock(property.id)}
            />
          ))}
        </div>
      </div>

      <LeadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        propertyId={selectedProperty}
      />
    </section>
  );
}
