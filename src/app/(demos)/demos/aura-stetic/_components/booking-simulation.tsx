"use client"

import { SimpleBookingForm } from "./simple-booking-form"
import { Star } from "lucide-react"

export function BookingSimulation() {
  return (
    <section id="booking" className="py-24 bg-white relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            
            {/* Left: Text & Context */}
            <div>
              <span className="text-amber-600 font-bold tracking-widest text-sm uppercase mb-3 block">Agenda Tu Visita</span>
              <h2 className="font-serif text-4xl md:text-5xl text-stone-900 mb-6 leading-tight">
                Experimenta el Cuidado que Mereces
              </h2>
              <p className="text-stone-600 text-lg mb-8 leading-relaxed">
                Nuestro sistema de reservas está diseñado para tu comodidad. Elige el tratamiento ideal y asegura tu espacio con nuestros especialistas en cuestión de segundos.
              </p>
              
              <div className="bg-stone-50 border border-stone-100 rounded-2xl p-6 mb-8">
                <div className="flex text-amber-500 mb-3">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-amber-500" />)}
                 </div>
                 <p className="text-stone-700 italic font-serif mb-4">
                   "La facilidad para agendar y la atención personalizada desde el primer momento hacen que Aura Stetic sea incomparable."
                 </p>
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-stone-200" />
                    <div>
                        <p className="text-stone-900 font-bold text-sm">Mariana V.</p>
                        <p className="text-stone-500 text-xs">Cliente Frecuente</p>
                    </div>
                 </div>
              </div>

              <div className="flex items-center gap-4 text-sm font-medium text-stone-500">
                 <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-emerald-100" />
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-amber-100" />
                    <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-100" />
                 </div>
                 <p>Más de 500+ reservas este mes</p>
              </div>
            </div>

            {/* Right: Booking Form Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-stone-200/50 border border-stone-100 p-8 md:p-10 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-300 to-amber-500" />
                <h3 className="text-2xl font-serif text-stone-900 mb-6">Reserva tu Cita</h3>
                <SimpleBookingForm darkMode={false} />
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
