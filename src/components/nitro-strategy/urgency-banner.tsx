import { Button } from "@/components/ui/button"
import { ArrowRight, Clock } from "lucide-react"
import Link from "next/link"

export function UrgencyBanner() {
  return (
    <section className="py-16 lg:py-20 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm mb-6">
            <Clock className="w-4 h-4" />
            <span>Disponibilidad limitada para nuevos clientes este mes</span>
          </div>

          <h2 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Cada semana que pasa sin optimizar tu infraestructura{" "}
            <span className="text-primary">es dinero que dejas en la mesa</span>
          </h2>

          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Mientras lees esto, tu competencia está automatizando procesos, mejorando tiempos de carga y 
            capturando los clientes que tú estás perdiendo por fricciones técnicas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 h-12"
            >
              <Link href="#consulta">
                Solicitar Diagnóstico Ahora
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground">
              Sin costo • Sin compromiso • Respuesta en 24h
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
