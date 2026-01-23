"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Clock, Check, Calendar, ChevronLeft, ChevronRight } from "lucide-react"
import type { Treatment } from "./types"

interface ServiceModalProps {
  treatment: Treatment | null
  onClose: () => void
}

const timeSlots = ["9:00 AM", "10:30 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"]

export function ServiceModal({ treatment, onClose }: ServiceModalProps) {
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(0)

  const months = ["Enero 2026", "Febrero 2026"]
  const daysInMonth = [31, 28]
  const unavailableDays = [4, 11, 18, 25]

  if (!treatment) return null

  const handleConfirm = () => {
    if (selectedDate && selectedTime) {
      // Close this modal
      onClose()
      
      // Scroll to booking section where the real conversion happens
      setTimeout(() => {
        const bookingSection = document.getElementById("booking")
        if (bookingSection) {
            bookingSection.scrollIntoView({ behavior: "smooth" })
        }
      }, 300)
    }
  }

  return (
    <AnimatePresence>
      {treatment && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header con imagen */}
            <div className="relative h-48 md:h-64 overflow-hidden rounded-t-2xl ring-1 ring-inset ring-white/20">
              <img
                src={treatment.image || "/placeholder.svg"}
                alt={treatment.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <button
                onClick={onClose}
                className="absolute top-4 right-4 bg-white/20 backdrop-blur-xl text-white p-2 rounded-full hover:bg-white/30 transition-colors border border-white/20"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="absolute bottom-4 left-6">
                <h2 className="font-serif font-light tracking-tight text-3xl text-white mb-1">{treatment.name}</h2>
                <div className="flex items-center gap-4 text-white/80 text-sm font-sans">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {treatment.duration}
                  </span>
                  <span className="text-amber-400 font-medium">{treatment.price}</span>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Información del servicio */}
                <div>
                  <h3 className="font-serif font-light tracking-tight text-xl text-stone-900 mb-4">Descripción</h3>
                  <p className="font-sans text-stone-600 leading-relaxed mb-6">{treatment.longDescription}</p>

                  <h4 className="font-medium text-stone-900 mb-3">Beneficios</h4>
                  <ul className="space-y-2">
                    {treatment.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-3 text-stone-600 font-sans">
                        <div className="w-5 h-5 bg-gradient-to-br from-amber-200 to-amber-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm shadow-amber-300/30">
                          <Check className="w-3 h-3 text-stone-800" />
                        </div>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Calendario de reservas - glassmorphism */}
                <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-xl p-5 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => setCurrentMonth(0)}
                      disabled={currentMonth === 0}
                      className="p-1 hover:bg-stone-200 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-stone-600" />
                    </button>
                    <h4 className="font-serif font-light tracking-tight text-lg text-stone-900 flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-amber-500" />
                      {months[currentMonth]}
                    </h4>
                    <button
                      onClick={() => setCurrentMonth(1)}
                      disabled={currentMonth === 1}
                      className="p-1 hover:bg-stone-200 rounded-full disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-stone-600" />
                    </button>
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                    {["D", "L", "M", "M", "J", "V", "S"].map((day, i) => (
                      <div key={i} className="text-stone-400 font-medium py-2">
                        {day}
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-7 gap-1 text-center text-sm mb-6">
                    {Array.from({ length: daysInMonth[currentMonth] }, (_, i) => i + 1).map((day) => {
                      const isUnavailable = unavailableDays.includes(day)
                      const isSelected = selectedDate === day
                      return (
                        <button
                          key={day}
                          onClick={() => !isUnavailable && setSelectedDate(day)}
                          disabled={isUnavailable}
                          className={`py-2 rounded-lg transition-all text-sm ${
                            isSelected
                              ? "bg-gradient-to-r from-amber-300 to-amber-500 text-stone-900 shadow-md shadow-amber-500/30"
                              : isUnavailable
                                ? "text-stone-300 cursor-not-allowed"
                                : "hover:bg-amber-100 text-stone-700 hover:-translate-y-0.5"
                          }`}
                        >
                          {day}
                        </button>
                      )
                    })}
                  </div>

                  {selectedDate && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                      <h5 className="text-sm font-medium text-stone-700 mb-3">Horarios Disponibles</h5>
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            onClick={() => setSelectedTime(time)}
                            className={`py-2 px-3 rounded-lg border text-xs font-medium transition-all hover:-translate-y-0.5 ${
                              selectedTime === time
                                ? "border-amber-400 bg-amber-50 text-amber-700 shadow-md shadow-amber-200/30"
                                : "border-stone-200 text-stone-700 hover:border-amber-300 hover:shadow-sm"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  <button
                    onClick={handleConfirm}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-400 hover:to-amber-600 disabled:from-stone-300 disabled:to-stone-400 disabled:cursor-not-allowed text-stone-900 disabled:text-stone-500 py-3 rounded-full font-medium transition-all shadow-lg shadow-amber-500/40 disabled:shadow-none hover:shadow-xl hover:shadow-amber-500/50 hover:-translate-y-0.5"
                  >
                    {selectedDate && selectedTime
                      ? `Confirmar - ${selectedDate} ${months[currentMonth].split(" ")[0]} a las ${selectedTime}`
                      : "Selecciona fecha y hora"}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
