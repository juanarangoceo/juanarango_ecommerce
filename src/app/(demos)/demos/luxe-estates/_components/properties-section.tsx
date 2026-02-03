"use client";

import { MapPin, BedDouble, Bath, Square, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PropertiesSectionProps {
  city: string;
}

const MOCK_PROPERTIES = [
  {
    id: 1,
    title: "Residencia Moderna Vista Panorámica",
    zone: "Zona Exclusiva",
    price: "$280,000",
    beds: 3,
    baths: 2,
    area: 150,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Penthouse de Lujo Centro",
    zone: "Centro Financiero",
    price: "$520,000",
    beds: 4,
    baths: 3,
    area: 220,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Casa Campestre Premium",
    zone: "Zona Norte",
    price: "$380,000",
    beds: 5,
    baths: 4,
    area: 300,
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Apartamento Ejecutivo",
    zone: "Zona Empresarial",
    price: "$195,000",
    beds: 2,
    baths: 2,
    area: 95,
    image: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 5,
    title: "Villa Mediterránea",
    zone: "Zona Residencial",
    price: "$650,000",
    beds: 6,
    baths: 5,
    area: 450,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=2787&auto=format&fit=crop"
  },
  {
    id: 6,
    title: "Loft Industrial Renovado",
    zone: "Zona Creativa",
    price: "$240,000",
    beds: 2,
    baths: 1,
    area: 120,
    image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=2070&auto=format&fit=crop"
  },
];

export function PropertiesSection({ city }: PropertiesSectionProps) {
  return (
    <section id="propiedades" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
          <div>
            <h2 
              className="text-3xl md:text-4xl font-bold mb-2"
              style={{ color: 'var(--theme-primary)' }}
            >
              Oportunidades en {city}
            </h2>
            <p className="text-slate-500 text-lg">
              Nuevas propiedades listadas en el mercado
            </p>
          </div>
          <Button 
            variant="link" 
            className="font-bold flex items-center gap-2 p-0"
            style={{ color: 'var(--theme-accent)' }}
          >
            Ver todo el catálogo <ArrowRight className="w-4 h-4"/>
          </Button>
        </div>

        {/* Properties Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_PROPERTIES.map((property) => (
            <Card 
              key={property.id} 
              className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white cursor-pointer"
            >
              {/* Property Image */}
              <div className="h-64 bg-slate-200 relative overflow-hidden">
                <img 
                  src={property.image}
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors"></div>
                <div 
                  className="absolute top-4 left-4 text-white px-3 py-1 text-xs font-bold rounded uppercase tracking-wide"
                  style={{ backgroundColor: 'var(--theme-primary)' }}
                >
                  En Venta
                </div>
              </div>

              {/* Property Info */}
              <CardContent className="p-6">
                <div 
                  className="flex items-center gap-1 text-sm mb-2"
                  style={{ color: 'var(--theme-accent)' }}
                >
                  <MapPin size={14} />
                  <span>{property.zone}, {city}</span>
                </div>
                <h3 
                  className="font-bold text-xl mb-4 transition-colors"
                  style={{ color: 'var(--theme-text)' }}
                >
                  {property.title}
                </h3>
                
                {/* Property Stats */}
                <div className="flex gap-4 text-sm text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <BedDouble size={16} />
                    {property.beds}
                  </span>
                  <span className="flex items-center gap-1">
                    <Bath size={16} />
                    {property.baths}
                  </span>
                  <span className="flex items-center gap-1">
                    <Square size={16} />
                    {property.area}m²
                  </span>
                </div>

                <div className="w-full h-px bg-slate-100 mb-4"></div>

                {/* Price and CTA */}
                <div className="flex justify-between items-center">
                  <span 
                    className="text-2xl font-bold"
                    style={{ color: 'var(--theme-primary)' }}
                  >
                    {property.price}
                  </span>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="hover:bg-slate-50 text-slate-600"
                  >
                    Ver Detalles
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More CTA */}
        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="px-8 py-6 text-white font-semibold shadow-lg hover:opacity-90 transition-opacity"
            style={{ backgroundColor: 'var(--theme-primary)' }}
          >
            Cargar Más Propiedades
          </Button>
        </div>
      </div>
    </section>
  );
}
