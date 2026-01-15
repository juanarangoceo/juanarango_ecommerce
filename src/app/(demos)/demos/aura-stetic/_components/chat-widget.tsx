"use client"

import { motion, AnimatePresence } from "framer-motion"
import { MessageCircle, X, Send } from "lucide-react"

const quickReplies = ["Sí, me interesa", "Ver Precios", "Reservar Ahora"]

interface ChatWidgetProps {
  isOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export function ChatWidget({ isOpen, onOpen, onClose }: ChatWidgetProps) {
  return (
    <div className="fixed bottom-6 left-6 md:bottom-8 md:left-8 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl shadow-stone-300/50 w-80 mb-4 overflow-hidden"
          >
            <div className="bg-stone-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium text-sm">Asistente Aura</p>
                  <p className="text-xs text-stone-400">En línea ahora</p>
                </div>
              </div>
              <button onClick={onClose} className="text-stone-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4">
              <div className="bg-stone-100 rounded-2xl rounded-tl-sm p-4 mb-4">
                <p className="text-stone-700 text-sm leading-relaxed">
                  ¡Hola! Me quedan 2 espacios para Hydrafacial hoy con{" "}
                  <span className="text-amber-700 font-semibold">15% OFF</span>. ¿Te interesa?
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    className="bg-stone-50 hover:bg-amber-50 border border-stone-200 hover:border-amber-200 text-stone-700 hover:text-amber-700 text-sm px-4 py-2 rounded-full transition-colors"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-stone-100 p-3 flex items-center gap-2">
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                className="flex-1 text-sm bg-stone-50 rounded-full px-4 py-2.5 outline-none focus:ring-2 focus:ring-amber-200"
              />
              <button className="bg-amber-700 hover:bg-amber-800 text-white w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={onOpen}
          className="bg-amber-700 hover:bg-amber-800 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl shadow-amber-700/30 transition-colors"
        >
          <MessageCircle className="w-6 h-6" />
        </motion.button>
      )}
    </div>
  )
}
