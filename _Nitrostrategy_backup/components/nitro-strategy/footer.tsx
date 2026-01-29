import Link from "next/link"
import { Zap, Linkedin, Twitter } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 lg:py-16 border-t border-border bg-card" role="contentinfo">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4" aria-label="Nitro Strategy">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-tight">
                  NITRO <span className="text-primary">STRATEGY</span>
                </span>
              </div>
            </Link>
            <p className="text-sm text-muted-foreground max-w-md mb-4">
              Consultoría en ingeniería de alto escalamiento, arquitectura headless y automatización con inteligencia artificial generativa para empresas de alto rendimiento.
            </p>
            <div className="flex items-center gap-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <nav aria-label="Servicios">
            <h3 className="font-semibold mb-4 text-foreground">Servicios</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">
                  Arquitectura Headless
                </Link>
              </li>
              <li>
                <Link href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">
                  Automatización con IA
                </Link>
              </li>
              <li>
                <Link href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">
                  Ingeniería de Escalamiento
                </Link>
              </li>
              <li>
                <Link href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">
                  Roadmap Técnico
                </Link>
              </li>
            </ul>
          </nav>

          {/* Company */}
          <nav aria-label="Empresa">
            <h3 className="font-semibold mb-4 text-foreground">Empresa</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#sobre-mi" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sobre Mí
                </Link>
              </li>
              <li>
                <Link href="#metodologia" className="text-muted-foreground hover:text-foreground transition-colors">
                  Metodología
                </Link>
              </li>
              <li>
                <Link href="#resultados" className="text-muted-foreground hover:text-foreground transition-colors">
                  Casos de Éxito
                </Link>
              </li>
              <li>
                <Link href="#consulta" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Nitro Strategy. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link href="/privacidad" className="text-muted-foreground hover:text-foreground transition-colors">
              Política de Privacidad
            </Link>
            <Link href="/terminos" className="text-muted-foreground hover:text-foreground transition-colors">
              Términos de Servicio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
