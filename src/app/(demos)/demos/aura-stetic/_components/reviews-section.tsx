"use client"

import Image from "next/image"
import { Star, Quote } from "lucide-react"

const reviews = [
  {
    name: "María García",
    rating: 5,
    text: "Increíble experiencia. El Hydrafacial dejó mi piel radiante y el equipo fue muy profesional. Definitivamente regresaré.",
    treatment: "Hydrafacial",
    image: "/professional-woman-smiling-portrait.png",
  },
  {
    name: "Carolina López",
    rating: 5,
    text: "Los resultados del Botox fueron naturales y sutiles, exactamente lo que buscaba. El doctor fue muy atento y explicó todo el procedimiento.",
    treatment: "Botox",
    image: "/elegant-woman-portrait.png",
  },
  {
    name: "Ana Martínez",
    rating: 5,
    text: "El masaje terapéutico fue lo mejor que he experimentado. Salí completamente renovada y sin tensiones. El ambiente es muy relajante.",
    treatment: "Masaje Terapéutico",
    image: "/young-woman-portrait-natural.jpg",
  },
  {
    name: "Patricia Rodríguez",
    rating: 5,
    text: "Llevo 6 meses viniendo y los cambios en mi piel son impresionantes. El equipo siempre me hace sentir bienvenida.",
    treatment: "Tratamiento Facial",
    image: "/mature-woman-portrait-smiling.jpg",
  },
]

export function ReviewsSection() {
  return (
    <section id="reviews" className="py-24 px-6 bg-stone-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif font-light tracking-tight text-4xl md:text-5xl text-stone-900 mb-4">
            Lo Que Dicen Nuestras Clientas
          </h2>
          <p className="font-sans text-stone-600 max-w-xl mx-auto">
            Testimonios reales de quienes han experimentado nuestra atención
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg shadow-stone-200/50 hover:shadow-xl hover:shadow-amber-200/30 hover:-translate-y-1 transition-all duration-300"
            >
              <Quote className="w-8 h-8 text-amber-300 mb-4" />

              <p className="font-sans text-stone-600 text-sm leading-relaxed mb-6">"{review.text}"</p>

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden ring-1 ring-inset ring-white/20">
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    sizes="48px"
                    quality={75}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-medium text-stone-900 text-sm">{review.name}</p>
                  <p className="text-amber-600 text-xs">{review.treatment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rating promedio */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-white/20 rounded-full px-6 py-3 shadow-md">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-stone-700 font-medium">4.9/5</span>
            <span className="text-stone-400">|</span>
            <span className="text-stone-600 text-sm">+200 reseñas</span>
          </div>
        </div>
      </div>
    </section>
  )
}
