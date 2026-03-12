"use client";

import { motion } from "framer-motion";
import { Search, Zap, Target, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-900/20 via-background to-background" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl opacity-50" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <Badge variant="outline" className="mb-6 px-4 py-1.5 border-emerald-500/30 text-emerald-400 bg-emerald-500/10 uppercase tracking-wider text-xs sm:text-sm font-semibold">
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4" /> Optimización de Motores de Búsqueda
            </span>
          </Badge>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
            Domina los resultados de búsqueda con <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
              Nitro Search
            </span>
          </h1>

          <p className="mt-4 text-xl sm:text-2xl text-zinc-400 max-w-3xl mb-10 leading-relaxed font-light">
            Estrategias SEO avanzadas y optimización para la <span className="text-white font-medium">Experiencia Generativa de Búsqueda (SGE)</span> impulsada por Inteligencia Artificial. Haz que tus clientes te encuentren cuando más te necesitan.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-white font-semibold text-lg px-8 h-14 rounded-full group transition-all" asChild>
              <Link href="#consulta">
                Analizar mi Web
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-zinc-700 text-white hover:bg-zinc-800 font-semibold text-lg px-8 h-14 rounded-full transition-all" asChild>
              <Link href="#como-funciona">
                Descubrir la Metodología
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Floating Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-4xl mx-auto"
        >
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 flex items-start gap-4">
            <div className="bg-emerald-500/20 p-3 rounded-lg text-emerald-400">
              <Target className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white font-bold text-xl">+300%</p>
              <p className="text-zinc-500 text-sm">Incremento promedio en tráfico orgánico calificado.</p>
            </div>
          </div>
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 flex items-start gap-4">
            <div className="bg-cyan-500/20 p-3 rounded-lg text-cyan-400">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white font-bold text-xl">Top 3</p>
              <p className="text-zinc-500 text-sm">Posicionamiento en keywords transaccionales clave.</p>
            </div>
          </div>
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 flex items-start gap-4">
            <div className="bg-orange-500/20 p-3 rounded-lg text-orange-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white font-bold text-xl">SGE Ready</p>
              <p className="text-zinc-500 text-sm">Optimización preparada para el futuro de Google AI.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
