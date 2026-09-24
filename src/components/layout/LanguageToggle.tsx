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
  const hostname = window.location.hostname
  const domainParts = hostname.split('.')

  // Borrar sin dominio explícito (sirve para localhost / dominios simples)
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${hostname}`
  document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostname}`

  // Si hay subdominios (e.g. www.nitro-commerce.com o app.nitro-commerce.com), borrar también en el root domain
  if (domainParts.length >= 2) {
    const rootDomain = domainParts.slice(-2).join('.')
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${rootDomain}`
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${rootDomain}`
  }
}

export function LanguageToggle({ variant = "desktop" }: { variant?: "desktop" | "mobile" }) {
  const [isEN, setIsEN] = useState(false)

  useEffect(() => {
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
    const translatedStateTimer = hasTranslateCookie
      ? window.setTimeout(() => setIsEN(true), 0)
      : undefined

    return () => {
      if (translatedStateTimer !== undefined) window.clearTimeout(translatedStateTimer)
    }
  }, [])

  const triggerTranslation = () => {
    if (!isEN) {
      // ── Traducir a inglés via select oculto de Google Translate ──
      let attempts = 0
      const attempt = () => {
        attempts += 1
        const selectEl = document.querySelector(
          ".goog-te-combo"
        ) as HTMLSelectElement | null

        if (selectEl) {
          selectEl.value = "en"
          selectEl.dispatchEvent(new Event("change"))
          setIsEN(true)
        } else if (attempts < 10) {
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

  // ── Variante Mobile: ícono + sigla apilados (estilo BottomNav) ──
  if (variant === "mobile") {
    return (
      <button
        onClick={triggerTranslation}
        aria-label={isEN ? "Switch to Spanish" : "Switch to English"}
        className={`flex flex-col items-center gap-1 transition-all duration-200 ${
          isEN ? "text-primary scale-110" : "text-white/50 hover:text-white/80"
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
          flex h-10 items-center gap-1.5 rounded-full px-3 text-xs font-semibold
          border transition-all duration-200 select-none cursor-pointer
          ${
            isEN
              ? "bg-primary/10 border-primary/35 text-primary hover:bg-primary/15 hover:border-primary/55"
              : "bg-[#111512]/80 border-white/15 text-white/58 hover:bg-[#111512]/80 hover:text-white/84 hover:border-white/25"
          }
        `}
      >
        <Globe className="w-3.5 h-3.5 shrink-0" />
        <span>
          {/* notranslate evita que Google Translate traduzca "ES" → "IS" */}
          <span className="notranslate" translate="no">
            {isEN ? "ES" : "EN"}
          </span>
        </span>
      </button>
    </>
  )
}
