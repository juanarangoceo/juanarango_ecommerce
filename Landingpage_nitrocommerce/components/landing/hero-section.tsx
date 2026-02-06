"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, CheckCircle2, Star } from "lucide-react"
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
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(34,197,94,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(34,197,94,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          {/* Authority Badge - pSEO */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-sm font-medium text-primary">
              {pSEO.textoAutoridad}
            </span>
          </div>

          {/* Main Headline - pSEO H1 */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
            <span className="text-foreground">Elevamos el estándar digital de </span>
            <span className="text-primary">{pSEO.nichoPlural}</span>
            <span className="text-foreground"> en </span>
            <span className="bg-gradient-to-r from-primary to-emerald-400 bg-clip-text text-transparent">
              {pSEO.ciudad}
            </span>
          </h1>

          {/* Contextual Subtitle - pSEO */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed text-pretty">
            {pSEO.subtituloContextual}
          </p>

          {/* Value Props - Simple, No Tech Jargon */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 mb-10 text-sm md:text-base">
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Más clientes con menos esfuerzo</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Tu negocio abierto 24/7</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span>Resultados en semanas</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              asChild
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_30px_rgba(34,197,94,0.4)] text-lg px-8 py-6 group"
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
              className="border-border text-foreground hover:bg-secondary text-lg px-8 py-6 group bg-transparent"
            >
              <Link href="#proceso">
                <Play className="mr-2 w-5 h-5" />
                Ver cómo funciona
              </Link>
            </Button>
          </div>

          {/* Local Trust Signal - pSEO */}
          <p className="text-sm text-muted-foreground">
            {pSEO.mencionLocal}
          </p>
        </div>

        {/* Visual: Simple Results Preview (No Code) */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm overflow-hidden shadow-2xl shadow-primary/5">
            {/* Browser Header */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-secondary/50">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <div className="ml-4 flex-1 max-w-md">
                <div className="bg-background/50 rounded-full px-4 py-1.5 text-sm text-muted-foreground">
                  tu-{pSEO.nicho.toLowerCase().replace(/\s+/g, '-')}.com
                </div>
              </div>
            </div>
            
            {/* Results Preview */}
            <div className="p-8 md:p-12">
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div className="space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-primary">3x</div>
                  <div className="text-muted-foreground">más consultas</div>
                  <div className="text-sm text-muted-foreground/60">en los primeros 90 días</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-primary">24/7</div>
                  <div className="text-muted-foreground">disponibilidad</div>
                  <div className="text-sm text-muted-foreground/60">tu negocio nunca cierra</div>
                </div>
                <div className="space-y-2">
                  <div className="text-4xl md:text-5xl font-bold text-primary">0</div>
                  <div className="text-muted-foreground">dolores de cabeza</div>
                  <div className="text-sm text-muted-foreground/60">nosotros nos encargamos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
