"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Zap } from "lucide-react"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 lg:px-8" aria-label="Navegación principal">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Nitro Strategy - Inicio">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight">
                NITRO <span className="text-primary">STRATEGY</span>
              </span>
              <span className="text-[10px] text-muted-foreground -mt-1 hidden sm:block">
                Ingeniería de Escalamiento
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <Link
              href="#servicios"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Servicios
            </Link>
            <Link
              href="#metodologia"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Metodología
            </Link>
            <Link
              href="#sobre-mi"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sobre Mí
            </Link>
            <Link
              href="#resultados"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Resultados
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="#consulta">
                Agendar Consulta Estratégica
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                href="#servicios"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Servicios
              </Link>
              <Link
                href="#metodologia"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Metodología
              </Link>
              <Link
                href="#sobre-mi"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Sobre Mí
              </Link>
              <Link
                href="#resultados"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Resultados
              </Link>
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 mt-2">
                <Link href="#consulta" onClick={() => setIsMenuOpen(false)}>
                  Agendar Consulta Estratégica
                </Link>
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
