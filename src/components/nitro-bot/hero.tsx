"use client";

import { motion } from "framer-motion";
import { Bot, MessageSquare, Zap, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-background to-background" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl opacity-50" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <Badge variant="outline" className="mb-6 px-4 py-1.5 border-blue-500/30 text-blue-400 bg-blue-500/10 uppercase tracking-wider text-xs sm:text-sm font-semibold">
            <span className="flex items-center gap-2">
              <Bot className="w-4 h-4" /> Inteligencia Artificial Conversacional
            </span>
          </Badge>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-tight">
            Escala tu atención al cliente con <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Nitro Bot
            </span>
          </h1>

          <p className="mt-4 text-xl sm:text-2xl text-zinc-400 max-w-3xl mb-10 leading-relaxed font-light">
            Vende más y atiende mejor. Agentes de IA que conocen tu negocio a la perfección, responden en milisegundos y operan <span className="text-white font-medium">24/7 sin descanso</span>.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg px-8 h-14 rounded-full group transition-all" asChild>
              <Link href="#consulta">
                Configurar mi Agente IA
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto border-zinc-700 text-white hover:bg-zinc-800 font-semibold text-lg px-8 h-14 rounded-full transition-all" asChild>
              <Link href="#como-funciona">
                Ver Funciones
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
            <div className="bg-blue-500/20 p-3 rounded-lg text-blue-400">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white font-bold text-xl">&lt; 1 Segundo</p>
              <p className="text-zinc-500 text-sm">Tiempo de respuesta promedio omnicanal.</p>
            </div>
          </div>
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 flex items-start gap-4">
            <div className="bg-purple-500/20 p-3 rounded-lg text-purple-400">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white font-bold text-xl">80%</p>
              <p className="text-zinc-500 text-sm">De consultas resueltas sin intervención humana.</p>
            </div>
          </div>
          <div className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 flex items-start gap-4">
            <div className="bg-green-500/20 p-3 rounded-lg text-green-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-white font-bold text-xl">100% Entrenado</p>
              <p className="text-zinc-500 text-sm">Respuestas basadas estrictamente en tu base de datos.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
