"use client"

import { motion } from "framer-motion"
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
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif font-light tracking-tight text-4xl md:text-5xl text-stone-900 mb-4">
            Nuestros Tratamientos
          </h2>
          <p className="font-sans text-stone-600 max-w-xl mx-auto">
            Experimenta cuidado personalizado con nuestros servicios estéticos exclusivos
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {treatments.map((treatment, index) => (
            <motion.div
              key={treatment.id}
              className="group relative bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden shadow-lg shadow-stone-200/50 hover:shadow-xl hover:shadow-amber-200/30 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onServiceClick(treatment)}
            >
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={treatment.image || "/placeholder.svg"}
                  alt={treatment.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-2xl ring-1 ring-inset ring-white/20"
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
