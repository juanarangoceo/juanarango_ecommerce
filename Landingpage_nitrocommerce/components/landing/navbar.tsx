"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Building2 } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-card/95 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold tracking-tight text-foreground">
              Nitro<span className="text-accent">Commerce</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#problema"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              El Problema
            </Link>
            <Link
              href="#solucion"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              La Solucion
            </Link>
            <Link
              href="#proceso"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Proceso
            </Link>
            <Link
              href="#testimonios"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Resultados
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              FAQ
            </Link>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-6"
            >
              <Link href="#contacto">Agenda tu Consulta</Link>
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
          <div className="md:hidden py-6 border-t border-border bg-card/95 backdrop-blur-lg rounded-b-xl">
            <div className="flex flex-col gap-1 px-2">
              {[
                { label: "El Problema", href: "#problema" },
                { label: "La Solucion", href: "#solucion" },
                { label: "Proceso", href: "#proceso" },
                { label: "Resultados", href: "#testimonios" },
                { label: "FAQ", href: "#faq" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary px-4 py-3 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 px-2">
                <Button
                  asChild
                  className="bg-primary text-primary-foreground hover:bg-primary/90 w-full font-medium"
                >
                  <Link href="#contacto" onClick={() => setIsOpen(false)}>
                    Agenda tu Consulta Gratuita
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
