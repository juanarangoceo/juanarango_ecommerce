"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Star } from "lucide-react"
import Link from "next/link"

interface PSEOVariables {
  ciudad: string
  departamento: string
  nicho: string
  nichoPlural: string
  subtituloContextual: string
  textoAutoridad: string
  mencionLocal: string
  parrafoValor: string
}

interface HeroSectionProps {
  pSEO: PSEOVariables
}

export function HeroSection({ pSEO }: HeroSectionProps) {
  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden">
      {/* Subtle warm background */}
      <div className="absolute inset-0 bg-secondary/40" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Authority Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8">
            <Star className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">
              {pSEO.textoAutoridad}
            </span>
          </div>

          {/* Main Headline — Serif for headings */}
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6 text-balance text-foreground">
            {"Tu inmobiliaria merece una "}
            <span className="text-accent">presencia digital</span>
            {" que venda por ti"}
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
            Ayudamos a inmobiliarias en {pSEO.ciudad} a captar compradores calificados,
            posicionar su inventario y cerrar mas negocios con una presencia online
            profesional que trabaja 24/7.
          </p>

          {/* Value Props */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 mb-10 text-sm md:text-base">
            {[
              "Mas prospectos calificados",
              "Tu inventario siempre visible",
              "Resultados en semanas",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-muted-foreground">
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 py-6 font-medium group"
            >
              <Link href="#contacto">
                Quiero una consulta gratuita
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-border text-foreground hover:bg-secondary text-base px-8 py-6 font-medium bg-card"
            >
              <Link href="#proceso">Ver como funciona</Link>
            </Button>
          </div>

          {/* Trust signal */}
          <p className="text-sm text-muted-foreground">
            {pSEO.mencionLocal}
          </p>
        </div>

        {/* Results Preview Card */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="relative rounded-2xl border border-border bg-card overflow-hidden shadow-lg">
            {/* Browser Header */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border bg-secondary/50">
              <div className="w-3 h-3 rounded-full bg-destructive/60" />
              <div className="w-3 h-3 rounded-full bg-accent/60" />
              <div className="w-3 h-3 rounded-full bg-primary/40" />
              <div className="ml-4 flex-1 max-w-md">
                <div className="bg-background rounded-full px-4 py-1.5 text-sm text-muted-foreground">
                  tu-inmobiliaria.com
                </div>
              </div>
            </div>

            {/* Results Grid */}
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <div className="font-serif text-4xl md:text-5xl font-bold text-primary">3x</div>
                  <div className="text-foreground font-medium">mas prospectos</div>
                  <div className="text-sm text-muted-foreground">en los primeros 90 dias</div>
                </div>
                <div className="space-y-2">
                  <div className="font-serif text-4xl md:text-5xl font-bold text-primary">24/7</div>
                  <div className="text-foreground font-medium">disponibilidad</div>
                  <div className="text-sm text-muted-foreground">tu inventario siempre visible</div>
                </div>
                <div className="space-y-2">
                  <div className="font-serif text-4xl md:text-5xl font-bold text-primary">+150%</div>
                  <div className="text-foreground font-medium">conversion</div>
                  <div className="text-sm text-muted-foreground">de visitante a contacto</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
