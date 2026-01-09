"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function NitroBanner() {
  return (
    <section className="pt-32 md:pt-40 pb-20 px-6 relative z-10">
      <div className="container mx-auto max-w-7xl">
        <div className="animate-fade-in-up">
          <div className="max-w-4xl bg-background/95 backdrop-blur-md p-6 rounded-2xl inline-block border border-white/5 shadow-2xl">
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold leading-none mb-6 text-balance">
              Ingeniería de escalamiento acelerado
              <span className="block text-primary mt-2">para negocios digitales.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed text-pretty max-w-2xl">
              No solo creamos webs. Diseñamos la estrategia, automatizaciones e infraestructura necesarias para eliminar tus cuellos de botella y acelerar tu crecimiento.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6 group h-auto whitespace-normal text-left"
              >
                <span className="flex-1">Solicitar Diagnóstico Estratégico</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-border hover:border-primary bg-background/80 h-auto whitespace-normal"
              >
                Ver Casos de Éxito
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
