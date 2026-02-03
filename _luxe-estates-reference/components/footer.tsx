"use client";

import Link from "next/link";
import { Instagram, Linkedin, Facebook, Mail, Phone, MapPin } from "lucide-react";

const footerLinks = {
  propiedades: [
    { label: "Apartamentos", href: "#propiedades" },
    { label: "Casas", href: "#propiedades" },
    { label: "Penthouses", href: "#signature" },
    { label: "Fincas", href: "#propiedades" },
  ],
  servicios: [
    { label: "Búsqueda Personalizada", href: "#contacto" },
    { label: "Tours Virtuales", href: "#nosotros" },
    { label: "Asesoría Legal", href: "#nosotros" },
    { label: "Crédito Hipotecario", href: "#contacto" },
  ],
  empresa: [
    { label: "Nosotros", href: "#nosotros" },
    { label: "Testimonios", href: "#testimonios" },
    { label: "Blog", href: "#" },
    { label: "Contacto", href: "#contacto" },
  ],
};

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const id = href.slice(1);
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-primary text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <span className="font-serif text-3xl font-bold text-background">
                Luxe
              </span>
              <span className="font-sans text-sm uppercase tracking-[0.2em] text-background/70">
                Estates
              </span>
            </Link>
            <p className="font-sans text-background/70 leading-relaxed mb-6 max-w-sm">
              Más de 15 años conectando personas con las propiedades de sus sueños. 
              Profesionalismo, transparencia y resultados garantizados.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-secondary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-sans text-sm uppercase tracking-widest text-secondary mb-4">
              Propiedades
            </h4>
            <ul className="space-y-3">
              {footerLinks.propiedades.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.href)}
                    className="font-sans text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-sm uppercase tracking-widest text-secondary mb-4">
              Servicios
            </h4>
            <ul className="space-y-3">
              {footerLinks.servicios.map((link) => (
                <li key={link.label}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.href)}
                    className="font-sans text-background/70 hover:text-background transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-sm uppercase tracking-widest text-secondary mb-4">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:asesores@luxeestates.com"
                  className="flex items-center gap-2 font-sans text-background/70 hover:text-background transition-colors"
                >
                  <Mail className="h-4 w-4 text-secondary" />
                  asesores@luxeestates.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+573001234567"
                  className="flex items-center gap-2 font-sans text-background/70 hover:text-background transition-colors"
                >
                  <Phone className="h-4 w-4 text-secondary" />
                  +57 300 123 4567
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2 font-sans text-background/70">
                  <MapPin className="h-4 w-4 text-secondary flex-shrink-0 mt-1" />
                  <span>
                    Calle 10 #34-56, El Poblado
                    <br />
                    Medellín, Colombia
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-sm text-background/50">
            © 2026 Luxe Estates. Todos los derechos reservados.
          </p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="font-sans text-sm text-background/50 hover:text-background transition-colors"
            >
              Privacidad
            </Link>
            <Link
              href="#"
              className="font-sans text-sm text-background/50 hover:text-background transition-colors"
            >
              Términos
            </Link>
            <Link
              href="#"
              className="font-sans text-sm text-background/50 hover:text-background transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
