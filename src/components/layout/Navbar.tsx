"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-2xl border-b border-white/[0.08] transition-all">
      {/* Top inner border for 3D effect */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/[0.05]" />
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight" onClick={closeMenu}>
            <span className="text-primary">NITRO</span>
            <span className="text-foreground"> ECOM</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/#servicios" className="text-white hover:text-primary transition-colors">
              Servicios
            </Link>
            <Link href="/nitro-strategy" className="text-white hover:text-primary transition-colors">
              Nitro Strategy
            </Link>
            <Link href="/#negocios" className="text-white hover:text-primary transition-colors">
              Nitro Negocios
            </Link>
            <Link href="/soluciones/nitro-commerce" className="text-white hover:text-primary transition-colors">
              Nitro Commerce
            </Link>
            <Link href="/#contacto" className="text-white hover:text-primary transition-colors">
              Contacto
            </Link>
            <Link href="/blog" className="text-white hover:text-primary transition-colors">
              Blog
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {/* CTA Button (Desktop) */}
            <Link href="/#contacto" className="hidden sm:inline-flex">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Consulta Gratuita
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-white hover:text-primary p-1"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-b border-border/50 shadow-2xl animate-in slide-in-from-top-5">
          <div className="flex flex-col p-6 space-y-4">
            <Link 
              href="/#servicios" 
              className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-2 border-b border-white/5"
              onClick={closeMenu}
            >
              Servicios
            </Link>
            <Link 
              href="/nitro-strategy" 
              className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-2 border-b border-white/5"
              onClick={closeMenu}
            >
              Nitro Strategy
            </Link>
            <Link 
              href="/#negocios" 
              className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-2 border-b border-white/5"
              onClick={closeMenu}
            >
              Nitro Negocios
            </Link>
            <Link 
              href="/soluciones/nitro-commerce" 
              className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-2 border-b border-white/5"
              onClick={closeMenu}
            >
              Nitro Commerce
            </Link>
            <Link 
              href="/#contacto" 
              className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-2 border-b border-white/5"
              onClick={closeMenu}
            >
              Contacto
            </Link>
            <Link 
              href="/blog" 
              className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-2 border-b border-white/5"
              onClick={closeMenu}
            >
              Blog
            </Link>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full mt-4" onClick={closeMenu}>
              Consulta Gratuita
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
