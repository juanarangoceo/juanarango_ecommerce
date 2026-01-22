"use client";

import { useState } from "react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ_ITEMS = [
  {
    question: "¿Qué tecnología utilizan para el análisis facial?",
    answer: "Utilizamos algoritmos de Inteligencia Artificial de última generación (Google Gemini Pro Vision) para mapear 72 puntos biométricos de tu rostro, analizando textura, hidratación y pigmentación en tiempo real."
  },
  {
    question: "¿Los tratamientos son personalizados?",
    answer: "Absolutamente. Nuestro sistema no solo diagnostica, sino que cruza los datos con nuestra base de conocimientos dermatológicos para diseñar un 'Ritual' único que combina aparatología y productos específicos para tu tipo de piel."
  },
  {
    question: "¿Cómo funciona la reserva de citas?",
    answer: "Es instantáneo. Una vez que recibes tu diagnóstico, puedes seleccionar el tratamiento sugerido y ver la disponibilidad en tiempo real de nuestros especialistas. Sin llamadas, sin esperas."
  },
  {
    question: "¿Es seguro subir mi foto para el análisis?",
    answer: "La privacidad es nuestra prioridad. Tu imagen se procesa en servidores encriptados y se elimina inmediatamente después del análisis. Nunca almacenamos datos biométricos de nuestros clientes."
  }
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-[#faf9f6]">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <span className="bg-[#b4a496]/10 text-[#b4a496] px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase inline-flex items-center gap-2">
            <HelpCircle className="w-3 h-3" /> Dudas Comunes
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 font-serif">Preguntas Frecuentes</h2>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-[2rem] border border-stone-200 overflow-hidden transition-all duration-300 hover:border-[#b4a496]/50"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-8 text-left group"
              >
                <span className={`text-lg md:text-xl font-bold font-serif transition-colors ${openIndex === index ? 'text-[#b4a496]' : 'text-zinc-800 group-hover:text-[#b4a496]'}`}>
                  {item.question}
                </span>
                <span className={`p-2 rounded-full border transition-all ${openIndex === index ? 'bg-[#b4a496] border-[#b4a496] text-white rotate-180' : 'border-stone-200 text-stone-400 group-hover:border-[#b4a496] group-hover:text-[#b4a496]'}`}>
                  {openIndex === index ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </span>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-8 pt-0">
                      <p className="text-zinc-500 leading-relaxed text-lg border-t border-stone-100 pt-6">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
