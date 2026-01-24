"use client"

import Image from "next/image"
import { StrategyHotspot } from "./strategy-hotspot"
import type { Treatment } from "./types"

interface TreatmentsGridProps {
  treatments: Treatment[]
  onServiceClick: (treatment: Treatment) => void
}

export function TreatmentsGrid({ treatments, onServiceClick }: TreatmentsGridProps) {
  return (
    <section id="treatments" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif font-light tracking-tight text-4xl md:text-5xl text-stone-900 mb-4">
            Nuestros Tratamientos
          </h2>
          <p className="font-sans text-stone-600 max-w-xl mx-auto">
            Experimenta cuidado personalizado con nuestros servicios estéticos exclusivos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {treatments.map((treatment) => (
            <div
              key={treatment.id}
              className="group relative bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-lg shadow-stone-200/50 hover:shadow-xl hover:shadow-amber-200/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              onClick={() => onServiceClick(treatment)}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={treatment.image}
                  alt={treatment.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={75}
                  loading="lazy"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl ring-1 ring-inset ring-white/20"
                />
              </div>

              <div className="p-6">
                <h3 className="font-serif font-light tracking-tight text-2xl text-stone-900 mb-2">{treatment.name}</h3>
                <p className="font-sans text-stone-600 text-sm mb-4">{treatment.description}</p>
                <div className="flex items-center justify-between">
                  <div className="relative flex items-center gap-2">
                    <span className="text-amber-600 font-medium">{treatment.price}</span>
                  </div>
                  <button
                    className="text-stone-900 text-sm border border-amber-200 hover:border-amber-400 hover:bg-amber-50 hover:shadow-md hover:shadow-amber-200/30 px-4 py-2 rounded-full transition-all hover:-translate-y-0.5"
                    onClick={(e) => {
                      e.stopPropagation()
                      onServiceClick(treatment)
                    }}
                  >
                    Ver Más
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
