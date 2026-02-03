"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-primary">
              Luxe
            </span>
            <span className="font-sans text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Estates
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              type="button"
              onClick={() => scrollToSection("propiedades")}
              className="font-sans text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors"
            >
              Propiedades
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("signature")}
              className="font-sans text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors"
            >
              Signature
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("nosotros")}
              className="font-sans text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors"
            >
              Nosotros
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("contacto")}
              className="font-sans text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors"
            >
              Contacto
            </button>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="outline"
              className="font-sans text-sm tracking-wide bg-transparent"
              asChild
            >
              <a href="tel:+573001234567" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span className="hidden lg:inline">+57 300 123 4567</span>
                <span className="lg:hidden">Llamar</span>
              </a>
            </Button>
            <Button 
              onClick={() => scrollToSection("contacto")}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-sans text-sm tracking-wide"
            >
              Solicitar Asesoría
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 text-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="flex flex-col p-4 gap-4">
            <button
              type="button"
              onClick={() => scrollToSection("propiedades")}
              className="font-sans text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors py-2 text-left"
            >
              Propiedades
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("signature")}
              className="font-sans text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors py-2 text-left"
            >
              Signature
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("nosotros")}
              className="font-sans text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors py-2 text-left"
            >
              Nosotros
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("contacto")}
              className="font-sans text-sm tracking-wide text-muted-foreground hover:text-primary transition-colors py-2 text-left"
            >
              Contacto
            </button>
            <div className="flex flex-col gap-2 pt-4 border-t border-border">
              <Button
                variant="outline"
                className="font-sans text-sm tracking-wide w-full bg-transparent"
                asChild
              >
                <a href="tel:+573001234567" className="flex items-center justify-center gap-2">
                  <Phone className="h-4 w-4" />
                  +57 300 123 4567
                </a>
              </Button>
              <Button 
                onClick={() => scrollToSection("contacto")}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-sans text-sm tracking-wide w-full"
              >
                Solicitar Asesoría
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
