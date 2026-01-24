"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { name: "Tratamientos", href: "#treatments" },
  { name: "Reseñas", href: "#reviews" },
  { name: "Reservar", href: "#booking" },
  { name: "Ubicación", href: "#map" },
  { name: "Contacto", href: "#contact", isContact: true },
]

interface NavbarProps {
  onContactClick: () => void
}

export function Navbar({ onContactClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Throttled scroll handler for better performance
  useEffect(() => {
    const handleScroll = () => {
      if (scrollTimeoutRef.current) {
        return
      }
      
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolled(window.scrollY > 50)
        scrollTimeoutRef.current = null
      }, 100)
    }
    
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, link: (typeof navLinks)[0]) => {
    if (link.isContact) {
      e.preventDefault()
      onContactClick()
      setIsMobileMenuOpen(false)
    } else {
      setIsMobileMenuOpen(false)
    }
  }

  const scrollToBooking = () => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <nav
        className={`fixed top-16 md:top-[72px] left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? "bg-white/60 backdrop-blur-xl shadow-lg border-b border-white/20" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="#" className="font-serif text-2xl font-light tracking-tight text-stone-900">
            Aura Stetic
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link)}
                className="text-stone-700 hover:text-amber-600 transition-colors text-sm tracking-wide cursor-pointer"
              >
                {link.name}
              </a>
            ))}
          </div>

          <button
            onClick={scrollToBooking}
            className="hidden md:block bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-stone-900 px-6 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-amber-500/40 hover:shadow-amber-500/50 hover:-translate-y-0.5"
          >
            Reservar Ahora
          </button>

          <button className="md:hidden text-stone-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/60 backdrop-blur-xl border-t border-white/20 overflow-hidden">
            <div className="px-6 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-stone-700 hover:text-amber-600 transition-colors py-2"
                  onClick={(e) => handleNavClick(e, link)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Mobile Sticky Booking Button */}
      <button
        onClick={scrollToBooking}
        className="md:hidden fixed bottom-6 right-6 z-30 bg-gradient-to-r from-amber-300 to-amber-500 hover:from-amber-400 hover:to-amber-600 text-stone-900 px-6 py-3 rounded-full text-sm font-medium shadow-xl shadow-amber-500/40"
      >
        Reservar
      </button>
    </>
  )
}
