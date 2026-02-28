"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface AccordionItemProps {
  question: string
  answer: React.ReactNode
}

function AccordionItem({ question, answer }: AccordionItemProps) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center w-full py-4 text-left group"
        aria-expanded={open}
      >
        <span className="font-medium text-base md:text-lg text-zinc-200 group-hover:text-[#e05a3a] transition-colors pr-4">
          {question}
        </span>
        <ChevronDown
          className={`shrink-0 text-zinc-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          size={20}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ease-in-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
      >
        <div className="overflow-hidden">
          <div className="pb-4 text-zinc-400 leading-relaxed text-sm md:text-base">
            {answer}
          </div>
        </div>
      </div>
    </div>
  )
}

const FAQ_ITEMS = [
  {
    question: "¿OpenClaw AI es completamente gratuito?",
    answer: (
      <>
        Sí, el programa OpenClaw AI es 100% de código abierto y gratuito. Sin embargo, necesitarás pagar por el uso de la API del modelo de lenguaje que elijas (Gemini o OpenAI).<br /><br />
        <em>Nota: Google AI Studio ofrece una capa gratuita muy generosa para desarrolladores.</em>
      </>
    ),
  },
  {
    question: "¿Qué modelos de IA son compatibles?",
    answer: "Actualmente soporta la familia Gemini (1.5 Pro, 2.5 Flash), OpenAI (GPT-4o, GPT-4-turbo), Anthropic (Claude 3.5 Sonnet) y cualquier modelo local compatible con la API de OpenAI vía LM Studio u Ollama.",
  },
  {
    question: "¿Puede OpenClaw modificar mis archivos locales?",
    answer: "Sí. Si le otorgas permisos, OpenClaw puede leer, crear, modificar y eliminar archivos en tu sistema. Por eso es vital usar el modo Human-in-the-Loop o ejecutarlo en un entorno aislado (Docker) para evitar modificaciones no deseadas.",
  },
  {
    question: "Me da error de 'Dependencias no encontradas' al instalar.",
    answer: "Asegúrate de tener instaladas las versiones correctas de Node.js (>=18) y Python (>=3.10). A veces, limpiar la caché de npm con 'npm cache clean --force' y borrar la carpeta 'node_modules' soluciona el problema.",
  },
]

export function OpenClawFAQ() {
  return (
    <div className="space-y-0">
      {FAQ_ITEMS.map((item, i) => (
        <AccordionItem key={i} question={item.question} answer={item.answer} />
      ))}
    </div>
  )
}
