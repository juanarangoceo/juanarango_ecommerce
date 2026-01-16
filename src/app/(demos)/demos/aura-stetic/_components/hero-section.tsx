"use client"

import { motion } from "framer-motion"
import { StrategyHotspot } from "./strategy-hotspot"
import Image from "next/image"

export function HeroSection() {
  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-stone-200 via-stone-100 to-stone-50">
        <Image
          src="/soft-luxury-spa-abstract-light-texture.jpg"
          alt="Luxury Spa Texture"
          fill
          priority
          quality={85}
          className="object-cover opacity-30"
          sizes="100vw"
        />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <h1 className="font-serif font-light tracking-tight text-5xl md:text-7xl text-stone-900 mb-6 leading-tight text-balance">
          Revela Tu Belleza Natural
        </h1>

        <p className="font-sans text-stone-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Tecnología Láser Avanzada & Cuidado Holístico
        </p>

        <motion.div
          className="relative inline-flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button
            onClick={scrollToBooking}
            className="bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-stone-900 px-8 py-4 rounded-full text-lg font-medium transition-all shadow-lg shadow-amber-500/40 hover:shadow-xl hover:shadow-amber-500/50 hover:-translate-y-1"
          >
            Inicia Tu Diagnóstico
          </button>

          <StrategyHotspot
            tip="Tip de Conversión: Usamos verbos de acción para aumentar clics en 20%."
            className="absolute -top-2 -right-2"
          />
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-stone-400 rounded-full flex justify-center pt-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-1.5 h-3 bg-stone-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
