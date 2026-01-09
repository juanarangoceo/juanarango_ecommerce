import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
    <nav className="border-b border-border/50 backdrop-blur-sm fixed top-0 w-full z-50 bg-background/80">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight">
            <span className="text-primary">Nitro</span>
            <span className="text-foreground">Tech</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#servicios" className="text-muted-foreground hover:text-foreground transition-colors">
              Servicios
            </Link>
            <Link href="#metricas" className="text-muted-foreground hover:text-foreground transition-colors">
              Resultados
            </Link>
            <Link href="#contacto" className="text-muted-foreground hover:text-foreground transition-colors">
              Contacto
            </Link>
          </div>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 hidden sm:inline-flex">
            Consulta Gratuita
          </Button>
        </div>
      </div>
    </nav>
  )
}
