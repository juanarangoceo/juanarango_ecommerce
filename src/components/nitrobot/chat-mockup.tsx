"use client"

import { useEffect, useRef, useState } from "react"
import { TypingDots } from "./typing-dots"

export type ChatMessage = {
  from: "cliente" | "bot"
  text: string
}

type ChatMockupProps = {
  messages: ChatMessage[]
  /** Solo el hero usa loop; en la galería las conversaciones se animan una vez al entrar en viewport. */
  loop?: boolean
  title?: string
  className?: string
}

const FIRST_DELAY_MS = 500
const READ_MS = 850
const TYPING_MS = 750
const LOOP_PAUSE_MS = 2800

// Marco de teléfono genérico oscuro (CSS puro, sin marca) que renderiza una conversación
// como secuencia de burbujas con typing indicator previo. El verde de WhatsApp solo puede
// existir DENTRO de este mockup, nunca fuera.
export function ChatMockup({ messages, loop = false, title = "NitroBot", className = "" }: ChatMockupProps) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [typing, setTyping] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [started, setStarted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true)
      setVisibleCount(messages.length)
      return
    }
    const node = containerRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [messages.length])

  useEffect(() => {
    if (!started || reducedMotion) return
    let typingTimer: ReturnType<typeof setTimeout> | undefined

    if (visibleCount >= messages.length) {
      if (!loop) return
      const resetTimer = setTimeout(() => setVisibleCount(0), LOOP_PAUSE_MS)
      return () => clearTimeout(resetTimer)
    }

    const readTimer = setTimeout(
      () => {
        setTyping(true)
        typingTimer = setTimeout(() => {
          setTyping(false)
          setVisibleCount((c) => c + 1)
        }, TYPING_MS)
      },
      visibleCount === 0 ? FIRST_DELAY_MS : READ_MS
    )

    return () => {
      clearTimeout(readTimer)
      if (typingTimer) clearTimeout(typingTimer)
    }
  }, [started, visibleCount, messages.length, loop, reducedMotion])

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [visibleCount, typing])

  const nextFrom = messages[visibleCount]?.from
  const botTyping = typing && nextFrom === "bot"

  return (
    <div
      ref={containerRef}
      className={`relative w-[300px] sm:w-[330px] rounded-[2.75rem] border-[6px] border-zinc-800 bg-zinc-900 shadow-2xl shadow-black/60 overflow-hidden ${className}`}
      role="img"
      aria-label={`Conversación de ejemplo con ${title}: ${messages.map((m) => `${m.from === "bot" ? "NitroBot" : "Cliente"}: ${m.text}`).join(" — ")}`}
    >
      {/* Header del chat */}
      <div className="flex items-center gap-3 px-4 py-3 bg-[#1F2C33] border-b border-black/30">
        <div className="w-9 h-9 rounded-full [background:var(--gradiente-nitrobot)] flex items-center justify-center text-white text-xs font-bold shrink-0">
          NB
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">{title}</p>
          <p className="text-[11px] text-zinc-400 font-dm-mono h-4">
            {botTyping ? "escribiendo..." : "en línea"}
          </p>
        </div>
      </div>

      {/* Área de mensajes — colores de WhatsApp permitidos SOLO aquí dentro */}
      <div
        ref={scrollRef}
        className="h-[380px] sm:h-[420px] overflow-y-auto px-3 py-4 space-y-2.5 bg-[#0B141A] scroll-smooth"
        aria-hidden="true"
      >
        {messages.slice(0, visibleCount).map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.from === "cliente" ? "justify-end" : "justify-start"}`}
            style={reducedMotion ? undefined : { animation: "fade-in-up 0.3s ease both" }}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[13px] leading-relaxed whitespace-pre-line ${
                msg.from === "cliente"
                  ? "bg-[#005C4B] text-white rounded-br-md"
                  : "bg-[#1F2C33] text-zinc-100 font-dm-mono rounded-bl-md"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}

        {typing && (
          <div className={`flex ${nextFrom === "cliente" ? "justify-end" : "justify-start"}`}>
            <div
              className={`rounded-2xl px-4 py-3 ${
                nextFrom === "cliente" ? "bg-[#005C4B] text-white" : "bg-[#1F2C33] text-zinc-300"
              }`}
            >
              <TypingDots />
            </div>
          </div>
        )}
      </div>

      {/* Barra de input decorativa */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#1F2C33]">
        <div className="flex-1 h-9 rounded-full bg-[#2A3942]" />
        <div className="w-9 h-9 rounded-full [background:var(--gradiente-nitrobot)]" />
      </div>
    </div>
  )
}
