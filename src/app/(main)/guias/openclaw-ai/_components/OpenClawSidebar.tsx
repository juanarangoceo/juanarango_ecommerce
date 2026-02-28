"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Globe, X, Menu } from "lucide-react"

const SECTIONS = [
  { id: "inicio", label: "Inicio" },
  { id: "que-es", label: "¿Qué es OpenClaw?" },
  { id: "conceptos", label: "Conceptos Básicos" },
  { id: "advertencias", label: "Riesgos y Seguridad" },
  { id: "instalacion", label: "Guía de Instalación" },
  { id: "skills", label: "Skills (Habilidades)" },
  { id: "ejemplos", label: "Ejemplos de Uso" },
  { id: "consejos-pro", label: "Consejos Pro" },
  { id: "faq", label: "Preguntas Frecuentes" },
]

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const handler = () => {
      const pos = window.scrollY + 160
      for (const id of [...ids].reverse()) {
        const el = document.getElementById(id)
        if (el && el.offsetTop <= pos) { setActive(id); break }
      }
    }
    window.addEventListener("scroll", handler, { passive: true })
    handler()
    return () => window.removeEventListener("scroll", handler)
  }, [ids])
  return active
}

export function OpenClawSidebar() {
  const sectionIds = SECTIONS.map(s => s.id)
  const active = useActiveSection(sectionIds)
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      {/* Mobile top bar */}
      <div className="md:hidden sticky top-[64px] z-40 bg-[#0a0505]/90 backdrop-blur-md border-b border-white/10 px-4 py-3 flex justify-between items-center">
        <span className="font-bold text-lg text-white tracking-tight">
          OpenClaw<span className="text-[#e05a3a]">.ai</span>
        </span>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white p-1"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-[#0a0505]/95 pt-28 px-6 overflow-y-auto">
          <nav className="flex flex-col space-y-5 pb-10">
            {SECTIONS.map(s => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setMenuOpen(false)}
                className={`text-xl font-medium transition-colors ${
                  active === s.id ? "text-[#e05a3a]" : "text-zinc-400 hover:text-white"
                }`}
              >
                {s.label}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:flex flex-col w-64 h-screen sticky top-[64px] border-r border-white/10 p-6 overflow-y-auto bg-[#0a0505] shrink-0">
        {/* Logo */}
        <div className="mb-10">
          <Image
            src="https://res.cloudinary.com/dohwyszdj/image/upload/v1772308526/openclaw-ai-2026_f496yo.webp"
            alt="OpenClaw AI Logo"
            width={140}
            height={52}
            priority
            className="rounded-lg mb-3"
          />
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">Guía Oficial 2026</p>
        </div>

        <nav className="flex flex-col space-y-1 flex-1">
          {SECTIONS.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active === s.id
                  ? "bg-[#e05a3a]/10 text-[#e05a3a] border border-[#e05a3a]/20"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-white/5 border border-transparent"
              }`}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-white/10">
          <a
            href="https://openclaw.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-zinc-500 hover:text-[#e05a3a] transition-colors"
          >
            <Globe size={14} />
            <span>openclaw.ai</span>
          </a>
        </div>
      </aside>
    </>
  )
}
