"use client"

import { Quote, Star, MapPin } from "lucide-react"

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

interface TestimonialsSectionProps {
  pSEO: PSEOVariables
}

export function TestimonialsSection({ pSEO }: TestimonialsSectionProps) {
  const testimonials = [
    {
      quote:
        "Antes dependiamos del boca a boca y los portales genericos. Ahora los compradores nos encuentran directamente y llegan ya interesados en propiedades especificas. Este trimestre cerramos un 40% mas.",
      author: "Ricardo Mendoza",
      role: "Director, Mendoza Bienes Raices",
      location: "Bogota",
      metric: "+40% en cierres trimestrales",
      rating: 5,
    },
    {
      quote:
        "Lo que mas valoro es que entienden el negocio inmobiliario. No nos vendieron tecnologia, nos vendieron resultados. Nuestros agentes ahora reciben prospectos calificados, no curiosos.",
      author: "Carolina Torres",
      role: "Gerente Comercial, Torres Inmobiliaria",
      location: "Medellin",
      metric: "5x mas prospectos calificados",
      rating: 5,
    },
    {
      quote:
        "Habia trabajado con 3 agencias digitales. Todas prometian y ninguna entendia que en bienes raices la confianza lo es todo. Con NitroCommerce vimos resultados desde la segunda semana.",
      author: "Andres Gutierrez",
      role: "Fundador, Gutierrez & Asociados",
      location: "Cali",
      metric: "+200% contactos mensuales",
      rating: 5,
    },
  ]

  return (
    <section id="testimonios" className="py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance leading-tight">
            {"Inmobiliarias como la tuya ya estan "}
            <span className="text-accent">viendo resultados</span>
          </h2>

          <p className="text-lg text-muted-foreground leading-relaxed">
            No tienes que creer en nuestras palabras. Escucha a directores de
            inmobiliarias en {pSEO.departamento} que transformaron su captacion de
            clientes.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl border border-border bg-card hover:border-accent/30 hover:shadow-sm transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                  <Quote className="w-4 h-4 text-accent-foreground" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 pt-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-accent text-accent"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground leading-relaxed mb-6">
                {`"${testimonial.quote}"`}
              </blockquote>

              {/* Metric Highlight */}
              <div className="inline-block px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <span className="text-sm font-medium text-accent">
                  {testimonial.metric}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-lg font-bold text-primary-foreground">
                    {testimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3" />
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
