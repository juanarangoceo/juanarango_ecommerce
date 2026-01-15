"use client"

import { motion } from "framer-motion"
import { MapPin, Phone, Clock, Navigation } from "lucide-react"

export function MapSection() {
  return (
    <section id="map" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-serif font-light tracking-tight text-4xl md:text-5xl text-stone-900 mb-4">
            Encuéntranos
          </h2>
          <p className="font-sans text-stone-600 max-w-xl mx-auto">
            Visítanos en nuestra ubicación exclusiva en el corazón de la ciudad
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Información de contacto */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:shadow-amber-200/20 hover:-translate-y-0.5 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-amber-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-300/30">
                  <MapPin className="w-6 h-6 text-stone-800" />
                </div>
                <div>
                  <h3 className="font-medium text-stone-900 mb-1">Dirección</h3>
                  <p className="font-sans text-stone-600 text-sm leading-relaxed">
                    Av. Reforma 123, Piso 5<br />
                    Col. Juárez, CDMX
                    <br />
                    CP 06600
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:shadow-amber-200/20 hover:-translate-y-0.5 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-amber-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-300/30">
                  <Phone className="w-6 h-6 text-stone-800" />
                </div>
                <div>
                  <h3 className="font-medium text-stone-900 mb-1">Teléfono</h3>
                  <p className="font-sans text-stone-600 text-sm">+52 (55) 1234-5678</p>
                  <p className="font-sans text-stone-600 text-sm">WhatsApp: +52 (55) 8765-4321</p>
                </div>
              </div>
            </div>

            <div className="bg-white/60 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:shadow-amber-200/20 hover:-translate-y-0.5 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-200 to-amber-400 rounded-full flex items-center justify-center flex-shrink-0 shadow-md shadow-amber-300/30">
                  <Clock className="w-6 h-6 text-stone-800" />
                </div>
                <div>
                  <h3 className="font-medium text-stone-900 mb-1">Horario</h3>
                  <p className="font-sans text-stone-600 text-sm">Lunes - Viernes: 9:00 - 19:00</p>
                  <p className="font-sans text-stone-600 text-sm">Sábado: 10:00 - 15:00</p>
                  <p className="font-sans text-stone-400 text-sm">Domingo: Cerrado</p>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-stone-900 py-4 rounded-full font-medium transition-all shadow-lg shadow-amber-500/40 hover:shadow-xl hover:shadow-amber-500/50 hover:-translate-y-0.5"
            >
              <Navigation className="w-5 h-5" />
              Cómo Llegar
            </a>
          </motion.div>

          {/* Mapa simulado */}
          <motion.div
            className="lg:col-span-2 relative rounded-2xl overflow-hidden shadow-lg shadow-stone-200/50 min-h-[400px] ring-1 ring-inset ring-white/20"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {/* Simulación de mapa estilo Google Maps */}
            <div className="absolute inset-0 bg-stone-100">
              {/* Fondo del mapa */}
              <div className="absolute inset-0 bg-[#e8e4df]">
                {/* Calles principales */}
                <div className="absolute top-1/4 left-0 right-0 h-8 bg-white/80" />
                <div className="absolute top-1/2 left-0 right-0 h-12 bg-amber-100/50" />
                <div className="absolute top-3/4 left-0 right-0 h-6 bg-white/80" />

                <div className="absolute left-1/4 top-0 bottom-0 w-6 bg-white/80" />
                <div className="absolute left-1/2 top-0 bottom-0 w-10 bg-amber-100/50" />
                <div className="absolute left-3/4 top-0 bottom-0 w-6 bg-white/80" />

                {/* Parques */}
                <div className="absolute top-[15%] left-[10%] w-24 h-20 bg-[#c8e6c9] rounded-lg" />
                <div className="absolute bottom-[20%] right-[15%] w-32 h-24 bg-[#c8e6c9] rounded-lg" />

                {/* Edificios */}
                <div className="absolute top-[60%] left-[15%] w-16 h-12 bg-stone-300/50 rounded" />
                <div className="absolute top-[30%] right-[25%] w-20 h-14 bg-stone-300/50 rounded" />
                <div className="absolute bottom-[35%] left-[35%] w-14 h-10 bg-stone-300/50 rounded" />
              </div>

              {/* Marcador de ubicación */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="relative"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-amber-300 to-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/40">
                    <MapPin className="w-6 h-6 text-stone-900" />
                  </div>
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-500 rotate-45" />
                </motion.div>

                {/* Etiqueta - glassmorphism */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-white/80 backdrop-blur-xl rounded-lg shadow-lg px-4 py-2 whitespace-nowrap border border-white/20">
                  <p className="font-medium text-stone-900 text-sm">Aura Stetic</p>
                  <p className="text-stone-500 text-xs">Av. Reforma 123</p>
                </div>
              </div>

              {/* Controles del mapa - glassmorphism */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="w-10 h-10 bg-white/80 backdrop-blur-xl rounded-lg shadow-md flex items-center justify-center text-stone-600 hover:bg-white/90 transition-colors border border-white/20 hover:-translate-y-0.5">
                  <span className="text-xl font-light">+</span>
                </button>
                <button className="w-10 h-10 bg-white/80 backdrop-blur-xl rounded-lg shadow-md flex items-center justify-center text-stone-600 hover:bg-white/90 transition-colors border border-white/20 hover:-translate-y-0.5">
                  <span className="text-xl font-light">−</span>
                </button>
              </div>

              {/* Logo Google Maps simulado */}
              <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-xl rounded px-2 py-1 border border-white/20">
                <span className="text-xs text-stone-500">Mapa interactivo</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
