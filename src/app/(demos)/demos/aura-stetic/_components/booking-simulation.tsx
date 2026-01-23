"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, CheckCircle2, Clock, MapPin, Star, User } from "lucide-react"

export function BookingSimulation() {
  const [step, setStep] = useState(1)
  const [isConfirmed, setIsConfirmed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleBook = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setIsConfirmed(true)
    }, 1500)
  }

  return (
    <section id="booking" className="py-24 bg-[url('https://res.cloudinary.com/dohwyszdj/image/upload/v1769051872/Creaci%C3%B3n_de_Video_para_Spa_ehp0lh.jpg')] bg-cover bg-fixed bg-center relative">
      <div className="absolute inset-0 bg-stone-900/70 backdrop-blur-sm" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-serif font-light text-4xl md:text-5xl text-white mb-4">
              Agenda Tu Experiencia
            </h2>
            <p className="text-zinc-300 text-lg">
              Reserva tu cita en menos de 30 segundos
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-10 shadow-2xl relative overflow-hidden">
            {isConfirmed ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h3 className="font-serif text-3xl text-white mb-4">¡Reserva Confirmada!</h3>
                <p className="text-zinc-300 mb-8 max-w-md mx-auto">
                  Hemos enviado los detalles a tu correo. Te esperamos para revelar tu belleza natural.
                </p>
                <button 
                  onClick={() => { setIsConfirmed(false); setStep(1); }}
                  className="text-amber-400 hover:text-amber-300 underline underline-offset-4"
                >
                  Hacer otra reserva
                </button>
              </motion.div>
            ) : (
              <div className="grid md:grid-cols-2 gap-12">
                {/* Form Side */}
                <div className="space-y-6">
                   <div>
                      <label className="block text-amber-400 text-xs uppercase tracking-widest font-bold mb-2">Servicio</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-400 transition-colors">
                        <option>Botox Facial Completo</option>
                        <option>Hydrafacial Premium</option>
                        <option>Masaje Relajante</option>
                      </select>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-amber-400 text-xs uppercase tracking-widest font-bold mb-2">Fecha</label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
                            <input type="text" value="24 Ene 2026" readOnly className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white outline-none focus:border-amber-400 transition-colors cursor-pointer" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-amber-400 text-xs uppercase tracking-widest font-bold mb-2">Hora</label>
                        <div className="relative">
                            <Clock className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
                            <select className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white outline-none focus:border-amber-400 transition-colors appearance-none">
                                <option>10:00 AM</option>
                                <option>02:30 PM</option>
                                <option>04:00 PM</option>
                            </select>
                        </div>
                      </div>
                   </div>

                   <div>
                      <label className="block text-amber-400 text-xs uppercase tracking-widest font-bold mb-2">Tus Datos</label>
                      <div className="space-y-3">
                        <div className="relative">
                            <User className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
                            <input type="text" placeholder="Nombre completo" className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-amber-400 transition-colors" />
                        </div>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-3 w-5 h-5 text-zinc-400" />
                            <input type="email" placeholder="Correo electrónico" className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white placeholder:text-zinc-600 outline-none focus:border-amber-400 transition-colors" />
                        </div>
                      </div>
                   </div>

                   <button 
                     onClick={handleBook}
                     disabled={loading}
                     className="w-full bg-gradient-to-r from-amber-400 to-amber-600 text-stone-950 font-bold py-4 rounded-xl shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-1 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                   >
                     {loading ? (
                       <span className="w-5 h-5 border-2 border-stone-900 border-t-transparent rounded-full animate-spin" />
                     ) : (
                       "Confirmar Reserva"
                     )}
                   </button>
                </div>

                {/* Info Side */}
                <div className="hidden md:flex flex-col justify-center border-l border-white/10 pl-12">
                   <div className="mb-8">
                      <div className="flex text-amber-400 mb-2">
                        {[1,2,3,4,5].map(i => <Star key={i} className="w-5 h-5 fill-amber-400" />)}
                      </div>
                      <p className="text-xl text-white font-serif italic">
                        "La mejor experiencia que he tenido. El sistema de reservas es increíblemente rápido."
                      </p>
                      <div className="mt-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-stone-200" />
                        <div>
                            <p className="text-white font-medium">Ana María G.</p>
                            <p className="text-xs text-zinc-500">Cliente Verificado</p>
                        </div>
                      </div>
                   </div>

                   <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-6">
                     <p className="text-emerald-400 text-sm font-medium mb-1">
                        ✨ Espacios Limitados
                     </p>
                     <p className="text-zinc-400 text-xs">
                        Solo quedan 3 citas disponibles para esta semana con la Dra. Sofia.
                     </p>
                   </div>
                </div>
              </div>
            )}
            
            {/* Demo Watermark */}
            <div className="absolute bottom-4 right-6 text-[10px] text-white/20 pointer-events-none">
                Simulación Interactiva
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
