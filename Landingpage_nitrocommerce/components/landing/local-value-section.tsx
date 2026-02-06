"use client"

import { MapPin, TrendingUp, Users } from "lucide-react"

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

interface LocalValueSectionProps {
  pSEO: PSEOVariables
}

export function LocalValueSection({ pSEO }: LocalValueSectionProps) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Local Authority */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
              <MapPin className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium text-accent">
                Expertos en {pSEO.ciudad}
              </span>
            </div>

            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance leading-tight">
              Entendemos los desafios de las inmobiliarias en {pSEO.ciudad}
            </h2>

            {/* Value Paragraphs */}
            <div className="space-y-4">
              {pSEO.parrafoValor.split("\n\n").map((paragraph, index) => (
                <p
                  key={index}
                  className="text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Right: Local Stats */}
          <div className="space-y-5">
            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/10 text-accent flex-shrink-0">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    El mercado inmobiliario esta cambiando
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    En {pSEO.departamento}, las inmobiliarias que invierten en presencia
                    digital de calidad captan hasta{" "}
                    <span className="text-accent font-semibold">
                      5 veces mas compradores
                    </span>{" "}
                    que aquellas con sitios web genericos o desactualizados.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-card">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-accent/10 text-accent flex-shrink-0">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Tus compradores te buscan online
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    El{" "}
                    <span className="text-accent font-semibold">
                      92% de los compradores
                    </span>{" "}
                    en {pSEO.ciudad} investigan propiedades online antes de contactar
                    una inmobiliaria. Si no te encuentran facilmente, eligen a tu
                    competencia.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-accent/30 bg-accent/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary text-primary-foreground flex-shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Disenado para {pSEO.ciudad}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    No usamos plantillas genericas. Cada solucion esta pensada
                    especificamente para el comportamiento del comprador inmobiliario
                    en{" "}
                    <span className="text-accent font-semibold">{pSEO.ciudad}</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
