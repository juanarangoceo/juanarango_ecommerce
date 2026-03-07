"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, ChevronDown, GraduationCap } from "lucide-react"

/** Rayito verde sólido */
function ZapSolidGreen({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0.5"
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  )
}



const serviceLinks = [
  { href: "/nitro-strategy", label: "Nitro Strategy" },
  { href: "/soluciones/nitro-commerce", label: "Nitro Commerce" },
  { href: "/shopify", label: "Shopify" },
]

const negociosLinks = [
  { href: "/soluciones/clinicas", label: "Clínicas" },
  { href: "/soluciones/nitro-inmobiliaria", label: "Nitro Inmobiliaria" },
  { href: "/soluciones/nitro-retail", label: "Nitro Retail" },
]

const guiasLinks = [
  { href: "/guias/shopify", label: "Guía Shopify" },
  { href: "/guias/openclaw-ai", label: "Guía OpenClaw AI" },
]

/** Tooltip icon link — desktop nav only */
function NavIconLink({ href, label, green = false, children }: {
  href: string
  label: string
  green?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="relative group/tip">
      <Link
        href={href}
        aria-label={label}
        className={`transition-colors duration-200 ${
          green
            ? 'text-[rgba(0,255,157,0.65)] hover:text-[#00ff9d]'
            : 'text-white/55 hover:text-primary'
        }`}
      >
        {children}
      </Link>
      <span
        className={`absolute -bottom-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[11px] font-semibold whitespace-nowrap
          opacity-0 group-hover/tip:opacity-100 pointer-events-none transition-opacity duration-150 ${
          green
            ? 'bg-[#00ff9d]/10 text-[#00ff9d]'
            : 'bg-white/10 text-white'
        }`}
      >
        {label}
      </span>
    </div>
  )
}

// ─── Desktop Dropdown ─── (outside Navbar to avoid re-mount on every render)
function DesktopDropdown({ label, links, isOpen, onEnter, onLeave, onToggle, onClose }: {
  label: string
  links: { href: string; label: string }[]
  isOpen: boolean
  onEnter: () => void
  onLeave: () => void
  onToggle: () => void
  onClose: () => void
}) {
  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        className="flex items-center gap-1 text-white hover:text-primary transition-colors font-medium"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 min-w-[220px] z-50">
          <div className="bg-zinc-950 border border-white/10 rounded-xl shadow-2xl shadow-black/50 overflow-hidden">
            {links.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className={`block px-5 py-3 text-sm font-medium text-zinc-200 hover:text-primary hover:bg-primary/5 transition-all ${
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
}

// ─── Mobile Accordion ─── (outside Navbar to avoid re-mount on every render)
function MobileAccordion({ label, links, isOpen, onToggle, onClose }: {
  label: string
  links: { href: string; label: string }[]
  isOpen: boolean
  onToggle: () => void
  onClose: () => void
}) {
  return (
    <>
      <button
        className="flex items-center justify-between text-lg font-medium text-zinc-200 hover:text-primary transition-colors py-3 border-b border-white/5 w-full text-left"
        onClick={onToggle}
        aria-expanded={isOpen}
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
              className="block text-base text-zinc-300 hover:text-primary transition-colors py-2 pl-3 border-l-2 border-primary/20 hover:border-primary"
              onClick={onClose}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<"services" | "negocios" | "guias" | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const pathname = usePathname()

  const closeAll = () => {
    setIsMenuOpen(false)
    setOpenDropdown(null)
  }

  const clearTimer = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
  }

  const scheduleClose = () => {
    clearTimer()
    timeoutRef.current = setTimeout(() => setOpenDropdown(null), 150)
  }

  const openMenu = (which: "services" | "negocios" | "guias") => {
    clearTimer()
    setOpenDropdown(which)
  }

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current) }
  }, [])

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-2xl border-b border-white/[0.08] transition-all">
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/[0.05]" />
      <div className="container mx-auto px-6 py-4">
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
          {/* LEFT — Logo */}
          <Link href="/" className="flex items-center gap-2" onClick={closeAll}>
            <div className="text-2xl font-bold tracking-tight">
              <span className="text-primary">NITRO</span>
              <span className="text-foreground"> ECOM</span>
            </div>
            <span className="hidden sm:inline-block text-[10px] font-medium tracking-widest text-white/50 uppercase mt-1.5 ml-1">
              [ por Juan Arango ]
            </span>
          </Link>

          {/* CENTER — Desktop Menu (truly centered) */}
          <div className="hidden md:flex items-center justify-center gap-7">

            <DesktopDropdown
              label="Servicios"
              links={serviceLinks}
              isOpen={openDropdown === "services"}
              onEnter={() => openMenu("services")}
              onLeave={scheduleClose}
              onToggle={() => setOpenDropdown(openDropdown === "services" ? null : "services")}
              onClose={closeAll}
            />

            <DesktopDropdown
              label="Negocios"
              links={negociosLinks}
              isOpen={openDropdown === "negocios"}
              onEnter={() => openMenu("negocios")}
              onLeave={scheduleClose}
              onToggle={() => setOpenDropdown(openDropdown === "negocios" ? null : "negocios")}
              onClose={closeAll}
            />

            <DesktopDropdown
              label="Guías"
              links={guiasLinks}
              isOpen={openDropdown === "guias"}
              onEnter={() => openMenu("guias")}
              onLeave={scheduleClose}
              onToggle={() => setOpenDropdown(openDropdown === "guias" ? null : "guias")}
              onClose={closeAll}
            />

            <Link href="/app-tools" className="text-white hover:text-primary transition-colors font-medium">
              IA Apps
            </Link>

          </div>

          {/* RIGHT — Academia + mobile controls */}
          <div className="flex items-center justify-end gap-3">
            {/* Mobile only icons */}
            <Link href="/" className="md:hidden text-primary hover:text-primary/80 transition-colors" aria-label="Inicio" onClick={closeAll}>
              <Home className="w-5 h-5" />
            </Link>
            <Link href="/academia" className="md:hidden text-primary hover:text-primary/80 transition-colors" aria-label="Academia" onClick={closeAll}>
              <GraduationCap className="w-5 h-5" />
            </Link>

            {/* Desktop: separator + Blog button + Academia button */}
            <div className="hidden md:flex items-center gap-2.5">
              <div className="w-px h-5 bg-white/10" />
              <Link href="/blog" onClick={closeAll}>
                <Button className={`gap-1.5 text-sm px-4 py-2 h-auto font-semibold transition-all duration-200 ${
                  pathname.startsWith('/blog')
                    ? 'bg-primary text-black border border-primary shadow-[0_0_12px_rgba(0,255,157,0.35)]'
                    : 'bg-zinc-900 text-white border border-zinc-700 hover:bg-primary hover:text-black hover:border-primary'
                }`}>
                  <ZapSolidGreen className="w-4 h-4" />
                  Blog
                </Button>
              </Link>
              <Link href="/academia" onClick={closeAll}>
                <Button className={`gap-2 text-sm px-4 py-2 h-auto font-semibold transition-all duration-200 ${
                  pathname.startsWith('/academia')
                    ? 'bg-primary text-black border border-primary shadow-[0_0_12px_rgba(0,255,157,0.35)]'
                    : 'bg-zinc-900 text-white border border-zinc-700 hover:bg-primary hover:text-black hover:border-primary'
                }`}>
                  <GraduationCap className="w-4 h-4" />
                  Academia
                </Button>
              </Link>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden text-white hover:text-primary p-1"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
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
              label="Servicios Nitro"
              links={serviceLinks}
              isOpen={openDropdown === "services"}
              onToggle={() => setOpenDropdown(openDropdown === "services" ? null : "services")}
              onClose={closeAll}
            />
            <MobileAccordion
              label="Nitro Negocios"
              links={negociosLinks}
              isOpen={openDropdown === "negocios"}
              onToggle={() => setOpenDropdown(openDropdown === "negocios" ? null : "negocios")}
              onClose={closeAll}
            />
            <MobileAccordion
              label="Guías"
              links={guiasLinks}
              isOpen={openDropdown === "guias"}
              onToggle={() => setOpenDropdown(openDropdown === "guias" ? null : "guias")}
              onClose={closeAll}
            />
            <Link href="/blog" className="text-lg font-semibold text-primary hover:text-primary/80 transition-colors py-3 border-b border-white/5" onClick={closeAll}>
              Blog
            </Link>
            <Link href="/app-tools" className="text-lg font-medium text-zinc-200 hover:text-primary transition-colors py-3 border-b border-white/5" onClick={closeAll}>
              IA Apps
            </Link>
            <Link href="/academia" onClick={closeAll}>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full mt-4 gap-2">
                <GraduationCap className="w-4 h-4" />
                Academia
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
