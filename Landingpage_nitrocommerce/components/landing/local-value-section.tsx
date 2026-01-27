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
    <section className="py-16 md:py-24 relative bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Local Authority */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                Expertos en {pSEO.ciudad}
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6 text-balance">
              Entendemos los desafíos de {pSEO.nichoPlural} en {pSEO.ciudad}
            </h2>
            
            {/* AI-Generated Value Paragraph - pSEO */}
            <div className="prose prose-invert max-w-none">
              {pSEO.parrafoValor.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Right: Local Stats */}
          <div className="space-y-6">
            <div className="p-6 rounded-xl border border-border bg-background/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    El mercado está cambiando
                  </h3>
                  <p className="text-muted-foreground">
                    En {pSEO.departamento}, las empresas de {pSEO.nicho} que 
                    invierten en presencia digital de calidad captan hasta 
                    <span className="text-primary font-semibold"> 5 veces más clientes</span> que 
                    aquellas con sitios web genéricos o desactualizados.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-border bg-background/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 text-primary">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Tus clientes te buscan online
                  </h3>
                  <p className="text-muted-foreground">
                    El <span className="text-primary font-semibold">87% de las personas</span> en 
                    {" "}{pSEO.ciudad} investigan online antes de elegir un proveedor de servicios. 
                    Si no te encuentran fácilmente, eligen a tu competencia.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-xl border border-primary/30 bg-primary/5">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary text-primary-foreground">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Diseñado para {pSEO.ciudad}
                  </h3>
                  <p className="text-muted-foreground">
                    No usamos plantillas genéricas. Cada solución que creamos está 
                    pensada específicamente para las necesidades y el comportamiento 
                    del consumidor en <span className="text-primary font-semibold">{pSEO.ciudad}</span>.
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
