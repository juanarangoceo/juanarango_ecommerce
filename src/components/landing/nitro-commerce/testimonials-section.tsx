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
      quote: "Antes gastaba en publicidad sin ver resultados claros. Ahora los clientes me encuentran solos. Este mes tuve que rechazar trabajo porque tenía la agenda llena.",
      author: "María González",
      role: "Dueña de Clínica Estética",
      location: "Bogotá",
      metric: "Agenda llena en 3 meses",
      rating: 5,
    },
    {
      quote: "Lo que más valoro es que me explican todo en español normal, sin tecnicismos. Por fin entiendo qué está pasando con mi negocio online y puedo tomar decisiones informadas.",
      author: "Carlos Ramírez",
      role: "Director de Centro Médico",
      location: "Medellín",
      metric: "5x más consultas web",
      rating: 5,
    },
    {
      quote: "Había intentado con 3 agencias antes. Promesas vacías. Con NitroCommerce vi resultados en la primera semana. Ahora mis pacientes me dicen que me encontraron en Google.",
      author: "Ana Martínez",
      role: "Fundadora de Spa Premium",
      location: "Cali",
      metric: "+200% contactos mensuales",
      rating: 5,
    },
  ]

  return (
    <section id="testimonios" className="py-20 md:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Empresarios como tú ya están 
            <span className="text-primary"> viendo resultados</span>
          </h2>
          
          <p className="text-lg text-muted-foreground leading-relaxed">
            No tienes que creer en nuestras palabras. Escucha a dueños de negocio en 
            {" "}{pSEO.departamento} que transformaron su presencia digital.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="group relative p-8 rounded-2xl border border-border bg-card/50 hover:border-primary/30 transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                  <Quote className="w-4 h-4 text-primary-foreground" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4 pt-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-foreground leading-relaxed mb-6">
                &quot;{testimonial.quote}&quot;
              </blockquote>

              {/* Metric Highlight */}
              <div className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <span className="text-sm font-medium text-primary">
                  {testimonial.metric}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-lg font-bold text-foreground">
                    {testimonial.author.split(' ').map(n => n[0]).join('')}
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

        {/* Trust Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">50+</div>
            <div className="text-sm text-muted-foreground">Negocios transformados</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-sm text-muted-foreground">Clientes satisfechos</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">3x</div>
            <div className="text-sm text-muted-foreground">Aumento promedio en leads</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold text-primary mb-2">5</div>
            <div className="text-sm text-muted-foreground">Ciudades en {pSEO.departamento}</div>
          </div>
        </div>
      </div>
    </section>
  )
}
