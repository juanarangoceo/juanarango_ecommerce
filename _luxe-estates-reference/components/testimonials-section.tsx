"use client";

import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "María González",
    role: "Empresaria",
    content:
      "Desde el primer contacto sentí que entendían exactamente lo que buscaba. En menos de dos meses encontré mi apartamento ideal en El Poblado.",
    rating: 5,
    avatar: "MG",
  },
  {
    name: "Carlos Restrepo",
    role: "CEO, Tech Solutions",
    content:
      "Lo que más valoro es la transparencia. Me presentaron cada propiedad con todos los pros y contras. Eso generó una confianza que hizo la diferencia.",
    rating: 5,
    avatar: "CR",
  },
  {
    name: "Ana Martínez",
    role: "Arquitecta",
    content:
      "El proceso de compra fue impecable. Se encargaron de todo el papeleo legal y yo solo tuve que firmar. Profesionalismo de principio a fin.",
    rating: 5,
    avatar: "AM",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-primary text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-sm uppercase tracking-[0.2em] text-secondary mb-2 block">
            Testimonios
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-background mb-4 text-balance">
            Ellos ya encontraron su hogar ideal
          </h2>
          <p className="font-sans text-lg text-background/70 leading-relaxed">
            Cada historia es única. Conoce las experiencias de quienes confiaron en nosotros.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-background/5 backdrop-blur-sm rounded-2xl p-8 border border-background/10 hover:bg-background/10 transition-colors"
            >
              {/* Quote Icon */}
              <Quote className="h-8 w-8 text-secondary mb-6" />

              {/* Content */}
              <p className="font-sans text-background/90 leading-relaxed mb-6">
                &quot;{testimonial.content}&quot;
              </p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={`star-${testimonial.name}-${i}`}
                    className="h-4 w-4 fill-secondary text-secondary"
                  />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                  <span className="font-sans text-sm font-medium text-secondary-foreground">
                    {testimonial.avatar}
                  </span>
                </div>
                <div>
                  <div className="font-sans text-sm font-medium text-background">
                    {testimonial.name}
                  </div>
                  <div className="font-sans text-xs text-background/60">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
