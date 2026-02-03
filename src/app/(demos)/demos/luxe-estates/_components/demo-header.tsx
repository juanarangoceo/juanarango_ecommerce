"use client";

import { useState } from "react";
import { Menu, X, Phone, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DemoHeaderProps {
  brandName: string;
}

export function DemoHeader({ brandName }: DemoHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo with Brand Name */}
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform hover:scale-105"
              style={{ backgroundColor: 'var(--theme-primary)' }}
            >
              <Building2 size={24} />
            </div>
            <span 
              className="font-bold text-xl md:text-2xl uppercase tracking-tight"
              style={{ color: 'var(--theme-primary)' }}
            >
              {brandName}
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              type="button"
              onClick={() => scrollToSection("propiedades")}
              className="text-sm font-medium text-slate-600 hover:text-[var(--theme-primary)] transition-colors"
            >
              Propiedades
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("servicios")}
              className="text-sm font-medium text-slate-600 hover:text-[var(--theme-primary)] transition-colors"
            >
              Servicios
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("testimonios")}
              className="text-sm font-medium text-slate-600 hover:text-[var(--theme-primary)] transition-colors"
            >
              Testimonios
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("contacto")}
              className="text-sm font-medium text-slate-600 hover:text-[var(--theme-primary)] transition-colors"
            >
              Contacto
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              onClick={() => scrollToSection("contacto")}
              className="shadow-lg hover:opacity-90 transition-opacity text-white font-semibold"
              style={{ backgroundColor: 'var(--theme-primary)' }}
            >
              Contáctanos
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2"
            style={{ color: 'var(--theme-primary)' }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <nav className="flex flex-col p-4 gap-4">
            <button
              type="button"
              onClick={() => scrollToSection("propiedades")}
              className="text-sm font-medium text-slate-600 hover:text-[var(--theme-primary)] transition-colors py-2 text-left"
            >
              Propiedades
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("servicios")}
              className="text-sm font-medium text-slate-600 hover:text-[var(--theme-primary)] transition-colors py-2 text-left"
            >
              Servicios
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("testimonios")}
              className="text-sm font-medium text-slate-600 hover:text-[var(--theme-primary)] transition-colors py-2 text-left"
            >
              Testimonios
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("contacto")}
              className="text-sm font-medium text-slate-600 hover:text-[var(--theme-primary)] transition-colors py-2 text-left"
            >
              Contacto
            </button>
            <div className="pt-4 border-t border-slate-200">
              <Button
                onClick={() => scrollToSection("contacto")}
                className="w-full shadow-lg text-white font-semibold"
                style={{ backgroundColor: 'var(--theme-primary)' }}
              >
                Contáctanos
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
