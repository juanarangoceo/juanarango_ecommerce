"use client"

import Link from "next/link"
import { Zap, Mail, MapPin, Phone, MessageCircle } from "lucide-react"

const footerLinks = {
  navegacion: [
    { label: "Cómo funciona", href: "#proceso" },
    { label: "Beneficios", href: "#beneficios" },
    { label: "Testimonios", href: "#testimonios" },
    { label: "Preguntas frecuentes", href: "#faq" },
  ],
  industrias: [
    { label: "Clínicas y Salud", href: "#" },
    { label: "Servicios Profesionales", href: "#" },
    { label: "Comercio y Retail", href: "#" },
    { label: "Bienes Raíces", href: "#" },
  ],
  recursos: [
    { label: "Consulta gratuita", href: "#contacto" },
    { label: "Casos de éxito", href: "#testimonios" },
    { label: "Blog", href: "#" },
    { label: "Contacto", href: "#contacto" },
  ],
  legal: [
    { label: "Privacidad", href: "#" },
    { label: "Términos", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold text-foreground">
                  Nitro<span className="text-primary">Commerce</span>
                </span>
              </Link>
              
              <p className="text-muted-foreground text-sm mb-6 max-w-xs">
                Ayudamos a empresarios a conseguir más clientes con presencia digital 
                profesional. Sin complicaciones, sin jerga técnica.
              </p>

              <div className="space-y-3">
                <a href="https://wa.me/573001234567" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp: +57 300 123 4567
                </a>
                <a href="mailto:hola@nitrocommerce.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <Mail className="w-4 h-4" />
                  hola@nitrocommerce.com
                </a>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  Colombia y Latinoamérica
                </div>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Navegación</h4>
              <ul className="space-y-3">
                {footerLinks.navegacion.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Industrias</h4>
              <ul className="space-y-3">
                {footerLinks.industrias.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Recursos</h4>
              <ul className="space-y-3">
                {footerLinks.recursos.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} NitroCommerce. Todos los derechos reservados.
            </p>
            
            <p className="text-sm text-muted-foreground">
              Hecho con <span className="text-primary">dedicación</span> para empresarios que quieren crecer.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
