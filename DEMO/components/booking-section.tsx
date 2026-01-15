"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, CreditCard, CheckCircle } from "lucide-react"
import { StrategyHotspot } from "./strategy-hotspot"

const features = [
  { icon: Calendar, text: "Elige Tu Fecha" },
  { icon: Clock, text: "Selecciona Horario" },
  { icon: CreditCard, text: "Depósito Seguro" },
  { icon: CheckCircle, text: "Confirmado" },
]

export function BookingSection() {
  return (
    <section id="booking" className="py-24 px-6 bg-stone-50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="relative inline-flex items-center gap-3 mb-4">
            <h2 className="font-serif font-light tracking-tight text-4xl md:text-5xl text-stone-900">
              Asegura Tu Cita
            </h2>
            <StrategyHotspot tip="Eficiencia: Los prepagos reducen ausencias del 40% a casi 0%." className="-mt-4" />
          </div>
          <p className="font-sans text-stone-600 max-w-xl mx-auto">
            Reserva tu espacio con nuestro sistema de citas en línea
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {features.map((feature, index) => (
            <div
              key={feature.text}
              className="flex items-center gap-3 bg-white/60 backdrop-blur-xl border border-white/20 px-5 py-3 rounded-full shadow-md hover:shadow-lg hover:shadow-amber-200/20 hover:-translate-y-0.5 transition-all"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-amber-200 to-amber-400 rounded-full flex items-center justify-center shadow-sm shadow-amber-300/30">
                <feature.icon className="w-4 h-4 text-stone-800" />
              </div>
              <span className="text-stone-700 text-sm font-medium">{feature.text}</span>
              {index < features.length - 1 && <span className="hidden md:block text-stone-300 ml-4">→</span>}
            </div>
          ))}
        </motion.div>

        <motion.div
          className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg shadow-stone-200/50 p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-stone-50/80 rounded-xl p-6">
              <div className="text-center mb-6">
                <h3 className="font-serif font-light tracking-tight text-xl text-stone-900">Enero 2026</h3>
              </div>
              <div className="grid grid-cols-7 gap-2 text-center text-sm">
                {["D", "L", "M", "M", "J", "V", "S"].map((day, i) => (
                  <div key={i} className="text-stone-400 font-medium py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <button
                    key={day}
                    className={`py-2 rounded-lg transition-all ${
                      day === 15
                        ? "bg-gradient-to-r from-amber-300 to-amber-500 text-stone-900 shadow-md shadow-amber-500/30"
                        : "hover:bg-amber-100 text-stone-700 hover:-translate-y-0.5"
                    } ${[4, 11, 18, 25].includes(day) ? "text-stone-300" : ""}`}
                    disabled={[4, 11, 18, 25].includes(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="font-serif font-light tracking-tight text-xl text-stone-900 mb-6">Horarios Disponibles</h3>
              <div className="grid grid-cols-2 gap-3">
                {["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"].map((time, i) => (
                  <button
                    key={time}
                    className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all hover:-translate-y-0.5 ${
                      i === 2
                        ? "border-amber-400 bg-amber-50 text-amber-700 shadow-md shadow-amber-200/30"
                        : "border-stone-200 text-stone-700 hover:border-amber-300 hover:shadow-md hover:shadow-amber-100/30"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
              <button className="mt-8 w-full bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-stone-900 py-4 rounded-full font-medium transition-all shadow-lg shadow-amber-500/40 hover:shadow-xl hover:shadow-amber-500/50 hover:-translate-y-0.5">
                Confirmar y Pagar Depósito
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
