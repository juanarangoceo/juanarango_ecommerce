import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Play, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section 
      className="relative min-h-screen flex items-center justify-center pt-20 pb-16 lg:pt-32 lg:pb-24 overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
      
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl lg:max-w-6xl mx-auto text-center">
          {/* Badge */}
          <Badge 
            variant="outline" 
            className="mb-6 px-4 py-2 border-primary/30 text-primary bg-primary/5"
          >
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Consultoría de Alto Nivel para Empresas que Escalan
          </Badge>

          {/* Main Headline - H1 for SEO */}
          <h1 
            id="hero-title"
            className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold tracking-tight mb-8 text-balance"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Ingeniería de{" "}
            <span className="text-primary">Alto Escalamiento</span>{" "}
            para Proyectos Headless y{" "}
            <span className="text-primary">Automatización con IA</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Consultoría personalizada para empresas que necesitan infraestructura digital de alto rendimiento. 
            Diseño arquitecturas que eliminan cuellos de botella y aceleran tu crecimiento con inteligencia artificial generativa.
          </p>

          {/* Value Props */}
          <div className="flex flex-wrap justify-center gap-4 mb-10 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>+20 años de experiencia</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Millones facturados en e-commerce</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Resultados en semanas</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              asChild 
              size="lg" 
              className="bg-primary text-primary-foreground hover:bg-primary/90 text-base px-8 h-12 w-full sm:w-auto"
            >
              <Link href="#consulta">
                Solicitar Diagnóstico Gratuito
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild
              className="border-border hover:bg-secondary text-base px-8 h-12 w-full sm:w-auto bg-transparent"
            >
              <Link href="#metodologia">
                <Play className="mr-2 w-4 h-4" />
                Ver Cómo Funciona
              </Link>
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-border/50">
            <p className="text-xs text-muted-foreground mb-6 uppercase tracking-wider">
              Empresas que han confiado en mi metodología
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
              <div className="text-lg font-semibold tracking-tight">TechStartup</div>
              <div className="text-lg font-semibold tracking-tight">E-Commerce Pro</div>
              <div className="text-lg font-semibold tracking-tight">ScaleUp Inc</div>
              <div className="text-lg font-semibold tracking-tight">Digital First</div>
              <div className="text-lg font-semibold tracking-tight">Growth Labs</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
