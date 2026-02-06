"use client"

import Link from "next/link"
import { Building2, Mail, MapPin, MessageCircle } from "lucide-react"

const footerLinks = {
  navegacion: [
    { label: "El Problema", href: "#problema" },
    { label: "La Solucion", href: "#solucion" },
    { label: "Proceso", href: "#proceso" },
    { label: "Resultados", href: "#testimonios" },
    { label: "Preguntas frecuentes", href: "#faq" },
  ],
  industrias: [
    { label: "Inmobiliarias", href: "#" },
    { label: "Constructoras", href: "#" },
    { label: "Corredores de Bienes Raices", href: "#" },
    { label: "Desarrolladores", href: "#" },
  ],
  recursos: [
    { label: "Consulta gratuita", href: "#contacto" },
    { label: "Casos de exito", href: "#testimonios" },
    { label: "Blog", href: "#" },
    { label: "Contacto", href: "#contacto" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 bg-accent rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-accent-foreground" />
                </div>
                <span className="text-xl font-semibold tracking-tight text-primary-foreground">
                  Nitro<span className="text-accent">Commerce</span>
                </span>
              </Link>

              <p className="text-primary-foreground/70 text-sm mb-6 max-w-xs leading-relaxed">
                Ayudamos a inmobiliarias a captar mas compradores con presencia
                digital profesional. Sin complicaciones, sin jerga tecnica.
              </p>

              <div className="space-y-3">
                <a
                  href="https://wa.me/573001234567"
                  className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp: +57 300 123 4567
                </a>
                <a
                  href="mailto:hola@nitrocommerce.com"
                  className="flex items-center gap-2 text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  hola@nitrocommerce.com
                </a>
                <div className="flex items-center gap-2 text-sm text-primary-foreground/70">
                  <MapPin className="w-4 h-4" />
                  Colombia y Latinoamerica
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="font-semibold text-primary-foreground mb-4 text-sm">
                Navegacion
              </h4>
              <ul className="space-y-3">
                {footerLinks.navegacion.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-primary-foreground mb-4 text-sm">
                Industrias
              </h4>
              <ul className="space-y-3">
                {footerLinks.industrias.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-primary-foreground mb-4 text-sm">
                Recursos
              </h4>
              <ul className="space-y-3">
                {footerLinks.recursos.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/50">
              {`© ${new Date().getFullYear()} NitroCommerce. Todos los derechos reservados.`}
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="#"
                className="text-sm text-primary-foreground/50 hover:text-primary-foreground/70 transition-colors"
              >
                Privacidad
              </Link>
              <Link
                href="#"
                className="text-sm text-primary-foreground/50 hover:text-primary-foreground/70 transition-colors"
              >
                Terminos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
