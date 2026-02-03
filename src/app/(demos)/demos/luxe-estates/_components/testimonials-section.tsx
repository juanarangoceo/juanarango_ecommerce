import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const TESTIMONIALS = [
  {
    name: "María González",
    role: "Compradora",
    content: "Encontré mi apartamento ideal en menos de un mes. El equipo fue increíblemente profesional y me acompañaron en cada paso del proceso.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Carlos Ramírez",
    role: "Vendedor",
    content: "Vendí mi propiedad al mejor precio del mercado gracias a su estrategia de marketing. Totalmente recomendados.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
  },
  {
    name: "Ana Martínez",
    role: "Inversionista",
    content: "He trabajado con ellos en múltiples proyectos de inversión. Su conocimiento del mercado es excepcional.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop"
  },
];

export function TestimonialsSection() {
  return (
    <section id="testimonios" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: 'var(--theme-primary)' }}
          >
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Miles de familias han encontrado su hogar ideal con nosotros
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((testimonial, index) => (
            <Card 
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white relative overflow-hidden"
            >
              <CardContent className="p-8">
                {/* Quote Icon */}
                <div 
                  className="absolute top-4 right-4 opacity-10"
                  style={{ color: 'var(--theme-accent)' }}
                >
                  <Quote size={64} />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill="currentColor"
                      style={{ color: 'var(--theme-accent)' }}
                    />
                  ))}
                </div>

                {/* Content */}
                <p className="text-slate-600 leading-relaxed mb-6 relative z-10">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p 
                      className="font-bold"
                      style={{ color: 'var(--theme-primary)' }}
                    >
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div 
              className="text-4xl font-bold mb-2"
              style={{ color: 'var(--theme-accent)' }}
            >
              2,500+
            </div>
            <div className="text-slate-500 text-sm">Propiedades Vendidas</div>
          </div>
          <div>
            <div 
              className="text-4xl font-bold mb-2"
              style={{ color: 'var(--theme-accent)' }}
            >
              98%
            </div>
            <div className="text-slate-500 text-sm">Satisfacción</div>
          </div>
          <div>
            <div 
              className="text-4xl font-bold mb-2"
              style={{ color: 'var(--theme-accent)' }}
            >
              15+
            </div>
            <div className="text-slate-500 text-sm">Años de Experiencia</div>
          </div>
          <div>
            <div 
              className="text-4xl font-bold mb-2"
              style={{ color: 'var(--theme-accent)' }}
            >
              50+
            </div>
            <div className="text-slate-500 text-sm">Agentes Expertos</div>
          </div>
        </div>
      </div>
    </section>
  );
}
