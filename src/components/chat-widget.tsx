"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Zap, X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-background/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden origin-bottom-right"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-500 to-emerald-300 flex items-center justify-center">
                    <Zap className="w-5 h-5 text-white fill-white" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-bold text-sm">Asistente Nitro</h3>
                  <span className="text-xs text-green-500 font-medium">En línea ahora</span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none max-w-[85%] text-sm leading-relaxed border border-white/5">
                <p>¡Hola! 👋 Soy tu asistente de ingeniería de escalamiento.</p>
                <p className="mt-2 text-muted-foreground">¿En qué puedo ayudarte hoy?</p>
              </div>
              <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none max-w-[85%] text-sm leading-relaxed border border-white/5 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
                <p>Puedo agendar una auditoría técnica o mostrarte nuestros casos de éxito.</p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-white/5 bg-white/5">
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="text" 
                  placeholder="Escribe tu mensaje..." 
                  className="flex-1 bg-background/50 border border-white/10 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-green-500/50 transition-colors"
                />
                <Button size="icon" className="rounded-full bg-green-600 hover:bg-green-500 h-9 w-9">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Launcher Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34,197,94,0.8)" }}
        whileTap={{ scale: 0.95 }}
        className="h-16 w-16 rounded-full bg-gradient-to-br from-green-400 via-green-500 to-green-700 flex items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.3),inset_0_2px_5px_rgba(255,255,255,0.4),inset_0_-4px_5px_rgba(0,0,0,0.2)] border border-green-300/30 text-white z-50 relative overflow-hidden group"
      >
        {/* Efecto de brillo interno "Energía" */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
        
        {/* Icono Rayo */}
        <Zap className={`w-8 h-8 fill-current drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-transform duration-300 ${isOpen ? 'rotate-45 opacity-0 absolute' : 'scale-100'}`} />
        
        {/* Icono Cerrar (aparece al abrir) */}
        <X className={`w-8 h-8 absolute transition-all duration-300 ${isOpen ? 'rotate-0 opacity-100 scale-100' : '-rotate-45 opacity-0 scale-50'}`} />
      </motion.button>
    </div>
  )
}
