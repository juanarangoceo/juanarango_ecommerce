"use client"

import { useEffect, useState } from "react"
import { Globe } from "lucide-react"

declare global {
  interface Window {
    google: {
      translate: {
        TranslateElement: {
          new (
            config: {
              pageLanguage: string
              includedLanguages: string
              autoDisplay: boolean
              layout?: number
            },
            elementId: string
          ): void
          InlineLayout: { SIMPLE: number }
        }
      }
    }
    googleTranslateElementInit: () => void
  }
}

/** Borra la cookie de Google Translate para restaurar el idioma original */
function clearTranslateCookie() {
  const domain = window.location.hostname
  // Borra en ruta raíz y en el dominio con punto (para subdomios)
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${domain}`
}

export function LanguageToggle({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const [isEN, setIsEN] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)

    // Inicializar Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "es",
          includedLanguages: "en",
          autoDisplay: false,
        },
        "google_translate_element"
      )
    }

    // Agregar script si no existe
    if (!document.getElementById("google-translate-script")) {
      const script = document.createElement("script")
      script.id = "google-translate-script"
      script.src =
        "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      script.async = true
      document.body.appendChild(script)
    }

    // Detectar si la página ya está traducida (cookie googtrans activa)
    const hasTranslateCookie = document.cookie
      .split(";")
      .some((c) => c.trim().startsWith("googtrans=/es/en"))
    if (hasTranslateCookie) setIsEN(true)
  }, [])

  const triggerTranslation = () => {
    if (!isEN) {
      // ── Traducir a inglés via select oculto de Google Translate ──
      const attempt = () => {
        const selectEl = document.querySelector(
          ".goog-te-combo"
        ) as HTMLSelectElement | null

        if (selectEl) {
          selectEl.value = "en"
          selectEl.dispatchEvent(new Event("change"))
          setIsEN(true)
        } else {
          // Script aún cargando, reintentar en 400ms
          setTimeout(attempt, 400)
        }
      }
      attempt()
    } else {
      // ── Volver a español: borrar cookie y recargar ──
      clearTranslateCookie()
      window.location.reload()
    }
  }

  if (!mounted) return null

  // ── Variante Mobile: ícono + sigla apilados (estilo BottomNav) ──
  if (variant === "mobile") {
    return (
      <button
        onClick={triggerTranslation}
        aria-label={isEN ? "Switch to Spanish" : "Switch to English"}
        className={`flex flex-col items-center gap-1 transition-all duration-200 ${
          isEN ? "text-sky-400 scale-110" : "text-white/50 hover:text-white/80"
        }`}
      >
        <Globe className="w-6 h-6" />
        <span className="text-[10px] font-medium notranslate" translate="no">
          {isEN ? "ES" : "EN"}
        </span>
      </button>
    )
  }

  // ── Variante Desktop: pill button ──
  return (
    <>
      {/* Contenedor oculto necesario para que Google Translate inicialice */}
      <div id="google_translate_element" className="hidden" aria-hidden="true" />

      {/* Botón estilizado */}
      <button
        onClick={triggerTranslation}
        aria-label={isEN ? "Switch to Spanish" : "Switch to English"}
        title={isEN ? "Ver en Español" : "View in English"}
        className={`
          flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold
          border transition-all duration-200 select-none cursor-pointer
          ${
            isEN
              ? "bg-sky-500/15 border-sky-500/40 text-sky-400 hover:bg-sky-500/25 hover:border-sky-500/60"
              : "bg-zinc-800/80 border-zinc-700/60 text-zinc-400 hover:bg-zinc-700/80 hover:text-zinc-200 hover:border-zinc-600"
          }
        `}
      >
        <Globe className="w-3.5 h-3.5 shrink-0" />
        <span className="hidden sm:inline">
          {/* notranslate evita que Google Translate traduzca "ES" → "IS" */}
          <span className="notranslate" translate="no">
            {isEN ? "ES" : "EN"}
          </span>
        </span>
        <span
          className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${
            isEN ? "bg-sky-400 animate-pulse" : "bg-zinc-600"
          }`}
        />
      </button>
    </>
  )
}
