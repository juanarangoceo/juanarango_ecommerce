"use client"

import { useState } from "react"
import { ChatMockup } from "./chat-mockup"
import { galleryCases } from "./conversations"

// S4 · NitroBot en acción — tabs con un teléfono por caso de uso
export function ConversationGallery() {
  const [activeId, setActiveId] = useState(galleryCases[0].id)
  const activeCase = galleryCases.find((c) => c.id === activeId) ?? galleryCases[0]

  return (
    <div>
      <div role="tablist" aria-label="Casos de uso de NitroBot" className="flex flex-wrap gap-2 mb-10">
        {galleryCases.map((c) => (
          <button
            key={c.id}
            role="tab"
            id={`tab-${c.id}`}
            aria-selected={c.id === activeId}
            aria-controls={`panel-${c.id}`}
            onClick={() => setActiveId(c.id)}
            className={`px-4 py-2 rounded-full text-sm font-dm-mono uppercase tracking-wider transition-all border ${
              c.id === activeId
                ? "border-primary text-primary bg-primary/10"
                : "border-white/10 text-zinc-400 hover:border-white/30 hover:text-white"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`panel-${activeCase.id}`}
        aria-labelledby={`tab-${activeCase.id}`}
        className="grid md:grid-cols-2 gap-10 lg:gap-16 items-center"
      >
        <div className="order-2 md:order-1">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">{activeCase.title}</h3>
          <p className="text-lg text-muted-foreground leading-relaxed">{activeCase.desc}</p>
        </div>
        <div className="order-1 md:order-2 flex justify-center">
          {/* key fuerza el remount para que la conversación se anime al cambiar de tab */}
          <ChatMockup key={activeCase.id} messages={activeCase.messages} />
        </div>
      </div>
    </div>
  )
}
