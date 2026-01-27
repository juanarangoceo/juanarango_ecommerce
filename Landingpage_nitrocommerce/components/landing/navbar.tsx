"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Zap } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">
              Nitro<span className="text-primary">Commerce</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#beneficios" className="text-muted-foreground hover:text-foreground transition-colors">
              Beneficios
            </Link>
            <Link href="#proceso" className="text-muted-foreground hover:text-foreground transition-colors">
              Proceso
            </Link>
            <Link href="#testimonios" className="text-muted-foreground hover:text-foreground transition-colors">
              Testimonios
            </Link>
            <Link href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(34,197,94,0.3)]"
            >
              <Link href="#contacto">
                Consulta Gratuita
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link 
                href="#beneficios" 
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Beneficios
              </Link>
              <Link 
                href="#proceso" 
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Proceso
              </Link>
              <Link 
                href="#testimonios" 
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                Testimonios
              </Link>
              <Link 
                href="#faq" 
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
              <Button 
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 w-full mt-2"
              >
                <Link href="#contacto" onClick={() => setIsOpen(false)}>
                  Solicitar Diagnóstico
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
