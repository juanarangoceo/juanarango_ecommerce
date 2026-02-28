"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"

const showcaseItems = [
  {
    id: 1,
    title: "Landing de Suplementos",
    category: "Salud & Fitness",
    placeholder: true,
  },
  {
    id: 2,
    title: "Tienda de Accesorios Tech",
    category: "Tecnologia",
    placeholder: true,
  },
  {
    id: 3,
    title: "Skincare Premium",
    category: "Belleza",
    placeholder: true,
  },
  {
    id: 4,
    title: "Gadgets para el Hogar",
    category: "Hogar",
    placeholder: true,
  },
  {
    id: 5,
    title: "Ropa Deportiva",
    category: "Moda",
    placeholder: true,
  },
]

export function ShowcaseCarousel() {
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % showcaseItems.length)
  }, [])

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + showcaseItems.length) % showcaseItems.length)
  }, [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(next, 4000)
    return () => clearInterval(interval)
  }, [isAutoPlaying, next])

  return (
    <section className="py-16 md:py-20 lg:py-28 border-b border-border">
      <div className="max-w-6xl mx-auto px-5 md:px-6 lg:px-12">
        <div className="font-mono text-[11px] md:text-xs text-primary tracking-[0.25em] uppercase mb-5 md:mb-6">
          {'// RESULTADOS REALES'}
        </div>
        <h2 className="font-heading text-[clamp(2.2rem,5vw,5rem)] leading-[0.85] mb-5 md:mb-6 text-balance">
          TIENDAS CONSTRUIDAS<br />
          <span className="text-primary">CON EL METODO NITRO.</span>
        </h2>
        <p className="text-foreground/70 text-base md:text-lg max-w-2xl mb-10 md:mb-14 leading-relaxed">
          Estas son landing pages reales creadas 100% con IA siguiendo el metodo del curso.
          Sin codigo, sin plantillas genericas, sin mensualidades.
        </p>

        {/* Carousel */}
        <div
          className="relative"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main display */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            {/* Big preview */}
            <div className="lg:col-span-2 border border-border bg-nitro-dark overflow-hidden">
              <div className="aspect-[4/3] md:aspect-[16/10] flex flex-col items-center justify-center relative">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,255,0,0.03),transparent)] pointer-events-none" />
                <ExternalLink className="w-8 h-8 text-primary/20 mb-4" />
                <span className="font-mono text-[10px] md:text-xs text-foreground/30 uppercase tracking-widest mb-1">
                  {showcaseItems[current].category}
                </span>
                <span className="font-heading text-2xl md:text-3xl text-foreground/50 text-center px-4">
                  {showcaseItems[current].title}
                </span>
                <span className="font-mono text-[10px] text-foreground/20 mt-3">
                  Imagen proximamente
                </span>
              </div>
              {/* Bottom bar */}
              <div className="border-t border-border p-4 md:p-5 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-sm md:text-base text-foreground">
                    {showcaseItems[current].title}
                  </div>
                  <div className="font-mono text-[10px] md:text-[11px] text-foreground/40 uppercase tracking-wider mt-0.5">
                    {showcaseItems[current].category} — Hecha con IA
                  </div>
                </div>
                <div className="font-mono text-xs text-foreground/30">
                  {String(current + 1).padStart(2, "0")} / {String(showcaseItems.length).padStart(2, "0")}
                </div>
              </div>
            </div>

            {/* Vertical thumbnails */}
            <div className="flex lg:flex-col gap-2 md:gap-3 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto pb-2 lg:pb-0">
              {showcaseItems.map((item, i) => (
                <button
                  key={item.id}
                  onClick={() => setCurrent(i)}
                  className={`shrink-0 border p-3 md:p-4 text-left transition-all w-32 md:w-36 lg:w-full ${
                    i === current
                      ? "border-primary bg-primary/[0.05]"
                      : "border-border hover:border-foreground/20 bg-background"
                  }`}
                >
                  <div className="aspect-[4/3] bg-nitro-dark flex items-center justify-center mb-2 md:mb-3 border border-border/50">
                    <span className="font-mono text-[9px] text-foreground/20 uppercase">{item.category}</span>
                  </div>
                  <div className={`font-mono text-[10px] md:text-[11px] uppercase tracking-wider truncate ${
                    i === current ? "text-primary" : "text-foreground/50"
                  }`}>
                    {item.title}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <div className="flex gap-3 mt-5 md:mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 md:w-12 md:h-12 border border-border flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-foreground/60" />
            </button>
            <button
              onClick={next}
              className="w-10 h-10 md:w-12 md:h-12 border border-border flex items-center justify-center hover:border-primary hover:bg-primary/5 transition-colors"
              aria-label="Siguiente"
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-foreground/60" />
            </button>
            {/* Progress dots */}
            <div className="flex items-center gap-1.5 ml-4">
              {showcaseItems.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 transition-all ${
                    i === current ? "w-6 bg-primary" : "w-1.5 bg-foreground/15"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
