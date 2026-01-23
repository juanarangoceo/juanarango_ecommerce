"use client"

import { useState } from "react"
import { Calendar, CheckCircle2, Clock, MapPin, User, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

interface SimpleBookingFormProps {
  darkMode?: boolean
}

export function SimpleBookingForm({ darkMode = false }: SimpleBookingFormProps) {
  const [loading, setLoading] = useState(false)
  const [isConfirmed, setIsConfirmed] = useState(false)

  const handleBook = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setIsConfirmed(true)
    }, 1500)
  }

  const textColor = darkMode ? "text-white" : "text-stone-900"
  const mutedColor = darkMode ? "text-zinc-400" : "text-stone-500"
  const inputBg = darkMode ? "bg-white/5 border-white/10 text-white" : "bg-stone-50 border-stone-200 text-stone-900"
  const labelColor = darkMode ? "text-amber-400" : "text-amber-600"

  if (isConfirmed) {
    return (
      <div className="text-center py-12 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="w-10 h-10 text-white" />
          </div>
          <h3 className={`font-serif text-3xl ${textColor} mb-4`}>¡Reserva Confirmada!</h3>
          <p className={`${mutedColor} mb-8 max-w-md mx-auto`}>
            Hemos enviado los detalles a tu correo. Te esperamos para revelar tu belleza natural.
          </p>
          <button 
            onClick={() => setIsConfirmed(false)}
            className="text-amber-500 hover:text-amber-600 underline underline-offset-4 font-medium"
          >
            Hacer otra reserva
          </button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-1">
       <div>
          <label className={`block ${labelColor} text-xs uppercase tracking-widest font-bold mb-2`}>Servicio</label>
          <div className="relative">
            <select className={`w-full ${inputBg} border rounded-xl px-4 py-3 outline-none focus:border-amber-400 transition-colors appearance-none cursor-pointer`}>
              <option>Botox Facial Completo</option>
              <option>Hydrafacial Premium</option>
              <option>Masaje Relajante</option>
              <option>Evaluación Láser</option>
            </select>
            <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 ${mutedColor} pointer-events-none`} />
          </div>
       </div>

       <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={`block ${labelColor} text-xs uppercase tracking-widest font-bold mb-2`}>Fecha</label>
            <div className="relative">
                <Calendar className={`absolute left-3 top-3 w-5 h-5 ${mutedColor}`} />
                <input type="text" value="24 Ene 2026" readOnly className={`w-full ${inputBg} border rounded-xl pl-10 pr-4 py-3 outline-none focus:border-amber-400 transition-colors cursor-pointer`} />
            </div>
          </div>
          <div>
            <label className={`block ${labelColor} text-xs uppercase tracking-widest font-bold mb-2`}>Hora</label>
            <div className="relative">
                <Clock className={`absolute left-3 top-3 w-5 h-5 ${mutedColor}`} />
                <select className={`w-full ${inputBg} border rounded-xl pl-10 pr-4 py-3 outline-none focus:border-amber-400 transition-colors appearance-none cursor-pointer`}>
                    <option>10:00 AM</option>
                    <option>02:30 PM</option>
                    <option>04:00 PM</option>
                </select>
                <ChevronDown className={`absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 ${mutedColor} pointer-events-none`} />
            </div>
          </div>
       </div>

       <div>
          <label className={`block ${labelColor} text-xs uppercase tracking-widest font-bold mb-2`}>Tus Datos</label>
          <div className="space-y-3">
            <div className="relative">
                <User className={`absolute left-3 top-3 w-5 h-5 ${mutedColor}`} />
                <input type="text" placeholder="Nombre completo" className={`w-full ${inputBg} border rounded-xl pl-10 pr-4 py-3 placeholder:${mutedColor} outline-none focus:border-amber-400 transition-colors`} />
            </div>
            <div className="relative">
                <MapPin className={`absolute left-3 top-3 w-5 h-5 ${mutedColor}`} />
                <input type="email" placeholder="Correo electrónico" className={`w-full ${inputBg} border rounded-xl pl-10 pr-4 py-3 placeholder:${mutedColor} outline-none focus:border-amber-400 transition-colors`} />
            </div>
          </div>
       </div>

       <button 
         onClick={handleBook}
         disabled={loading}
         className="w-full bg-gradient-to-r from-amber-400 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
       >
         {loading ? (
           <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
         ) : (
           "Confirmar Reserva"
         )}
       </button>
    </div>
  )
}
