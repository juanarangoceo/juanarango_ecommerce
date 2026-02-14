"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, ChevronDown } from "lucide-react"

const serviceLinks = [
  { href: "/nitro-strategy", label: "Nitro Strategy" },
  { href: "/soluciones/nitro-commerce", label: "Nitro Commerce" },
]

const negociosLinks = [
  { href: "/soluciones/clinicas", label: "Clínicas" },
  { href: "/soluciones/nitro-inmobiliaria", label: "Nitro Inmobiliaria" },
]

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isNegociosOpen, setIsNegociosOpen] = useState(false)
  const servicesTimeout = useRef<NodeJS.Timeout | null>(null)
  const negociosTimeout = useRef<NodeJS.Timeout | null>(null)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => {
    setIsMenuOpen(false)
    setIsServicesOpen(false)
    setIsNegociosOpen(false)
  }

  // Desktop dropdown hover handlers
  const handleServicesEnter = () => {
    if (servicesTimeout.current) clearTimeout(servicesTimeout.current)
    setIsServicesOpen(true)
  }
  const handleServicesLeave = () => {
    servicesTimeout.current = setTimeout(() => setIsServicesOpen(false), 150)
  }
  const handleNegociosEnter = () => {
    if (negociosTimeout.current) clearTimeout(negociosTimeout.current)
    setIsNegociosOpen(true)
  }
  const handleNegociosLeave = () => {
    negociosTimeout.current = setTimeout(() => setIsNegociosOpen(false), 150)
  }

  useEffect(() => {
    return () => {
      if (servicesTimeout.current) clearTimeout(servicesTimeout.current)
      if (negociosTimeout.current) clearTimeout(negociosTimeout.current)
    }
  }, [])

  // Reusable desktop dropdown component
  const DesktopDropdown = ({ label, links, isOpen, onEnter, onLeave, onToggle }: {
    label: string
    links: { href: string; label: string }[]
    isOpen: boolean
    onEnter: () => void
    onLeave: () => void
    onToggle: () => void
  }) => (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        className="flex items-center gap-1 text-white hover:text-primary transition-colors font-medium"
        onClick={onToggle}
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 min-w-[220px]">
          <div className="bg-black/95 backdrop-blur-xl border border-border/50 rounded-xl shadow-2xl shadow-primary/5 overflow-hidden">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-5 py-3 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all ${
                  i < links.length - 1 ? "border-b border-white/5" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  // Reusable mobile accordion component
  const MobileAccordion = ({ label, links, isOpen, onToggle }: {
    label: string
    links: { href: string; label: string }[]
    isOpen: boolean
    onToggle: () => void
  }) => (
    <>
      <button
        className="flex items-center justify-between text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-3 border-b border-white/5 w-full text-left"
        onClick={onToggle}
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="pl-4 space-y-1 border-b border-white/5 pb-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block text-base text-muted-foreground/70 hover:text-primary transition-colors py-2 pl-3 border-l-2 border-primary/20 hover:border-primary"
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-2xl border-b border-white/[0.08] transition-all">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/[0.05]" />
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold tracking-tight" onClick={closeMenu}>
            <span className="text-primary">NITRO</span>
            <span className="text-foreground"> ECOM</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-10">
            <Link href="/" className="text-primary hover:text-primary/80 transition-colors" aria-label="Inicio">
              <Home className="w-5 h-5" />
            </Link>

            <DesktopDropdown
              label="Servicios Headless"
              links={serviceLinks}
              isOpen={isServicesOpen}
              onEnter={handleServicesEnter}
              onLeave={handleServicesLeave}
              onToggle={() => setIsServicesOpen(!isServicesOpen)}
            />

            <DesktopDropdown
              label="Nitro Negocios"
              links={negociosLinks}
              isOpen={isNegociosOpen}
              onEnter={handleNegociosEnter}
              onLeave={handleNegociosLeave}
              onToggle={() => setIsNegociosOpen(!isNegociosOpen)}
            />

            <Link href="/shopify" className="text-white hover:text-primary transition-colors">
              Shopify
            </Link>

            <Link href="/#contacto" className="text-white hover:text-primary transition-colors">
              Contacto
            </Link>
            <Link href="/blog" className="text-white hover:text-primary transition-colors">
              Blog
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" className="md:hidden text-primary hover:text-primary/80 transition-colors" aria-label="Inicio" onClick={closeMenu}>
              <Home className="w-5 h-5" />
            </Link>
            <Link href="/#contacto" className="hidden sm:inline-flex">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                Consulta Gratuita
              </Button>
            </Link>
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
        <div className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md border-b border-border/50 shadow-2xl animate-in slide-in-from-top-5 max-h-[85vh] overflow-y-auto">
          <div className="flex flex-col p-6 space-y-1">
            <MobileAccordion
              label="Servicios Headless"
              links={serviceLinks}
              isOpen={isServicesOpen}
              onToggle={() => setIsServicesOpen(!isServicesOpen)}
            />
            <MobileAccordion
              label="Nitro Negocios"
              links={negociosLinks}
              isOpen={isNegociosOpen}
              onToggle={() => setIsNegociosOpen(!isNegociosOpen)}
            />
            <Link href="/shopify" className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-3 border-b border-white/5" onClick={closeMenu}>
              Shopify
            </Link>
            <Link href="/#contacto" className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-3 border-b border-white/5" onClick={closeMenu}>
              Contacto
            </Link>
            <Link href="/blog" className="text-lg font-medium text-muted-foreground hover:text-primary transition-colors py-3 border-b border-white/5" onClick={closeMenu}>
              Blog
            </Link>
            <Link href="/#contacto" onClick={closeMenu}>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full mt-4">
                Consulta Gratuita
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
