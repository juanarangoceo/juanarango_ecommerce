"use client"

import { useState } from "react"
import Link from "next/link"
import { PolicyModal } from "@/components/ui/policy-modal"

export function Footer() {
  const [activePolicy, setActivePolicy] = useState<string | null>(null)

  return (
    <footer className="border-t border-border/50 py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-primary">Nitro</span>
              <span className="text-foreground">Tech</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Arquitectos de ecosistemas digitales de alto rendimiento
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Servicios</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/#servicios" className="hover:text-primary transition-colors">
                  NitroBot
                </Link>
              </li>
              <li>
                <Link href="/#servicios" className="hover:text-primary transition-colors">
                  NitroSearch
                </Link>
              </li>
              <li>
                <Link href="/#servicios" className="hover:text-primary transition-colors">
                  NitroCommerce
                </Link>
              </li>
              <li>
                <Link href="/#servicios" className="hover:text-primary transition-colors">
                  NitroStrategy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button 
                  onClick={() => setActivePolicy("privacy")}
                  className="hover:text-primary transition-colors text-left"
                >
                  Política de Privacidad
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActivePolicy("terms")}
                  className="hover:text-primary transition-colors text-left"
                >
                  Términos de Servicio
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setActivePolicy("cookies")}
                  className="hover:text-primary transition-colors text-left"
                >
                  Política de Cookies
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="mailto:nitroecommercecolombia@gmail.com" className="hover:text-primary transition-colors">
                  nitroecommercecolombia@gmail.com
                </a>
              </li>
            </ul>
            {/* Social Media */}
            <div className="flex items-center gap-4 mt-5">
              <a href="https://www.youtube.com/@NitroEcom" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="text-muted-foreground hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="https://www.tiktok.com/@juanarangoecommerce" target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="text-muted-foreground hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </a>
              <a href="https://www.instagram.com/juanarangoecommerce/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
              <a href="https://www.linkedin.com/in/juanarangoecommerce" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          © 2026 NITROECOM. Todos los derechos reservados a NITROECOM.
        </div>
      </div>

      {/* Policy Modals */}
      <PolicyModal
        isOpen={activePolicy === "privacy"}
        onClose={() => setActivePolicy(null)}
        title="Política de Privacidad"
      >
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-4">Última actualización: Enero 2026</p>
          
          <h3 className="text-lg font-bold mt-6 mb-3">1. Información que Recopilamos</h3>
          <p className="text-muted-foreground mb-4">
            Recopilamos información que nos proporcionas directamente, como nombre, email, empresa e interés cuando completas nuestro formulario de contacto.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">2. Uso de la Información</h3>
          <p className="text-muted-foreground mb-4">
            Utilizamos tu información para: contactarte sobre nuestros servicios, enviarte información relevante sobre soluciones tecnológicas, y mejorar nuestros servicios.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">3. Protección de Datos</h3>
          <p className="text-muted-foreground mb-4">
            Implementamos medidas de seguridad para proteger tu información personal. Utilizamos Supabase con encriptación en tránsito y en reposo.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">4. Tus Derechos</h3>
          <p className="text-muted-foreground mb-4">
            Tienes derecho a acceder, corregir o eliminar tu información personal. Contáctanos en nitroecommercecolombia@gmail.com para ejercer tus derechos.
          </p>
        </div>
      </PolicyModal>

      <PolicyModal
        isOpen={activePolicy === "terms"}
        onClose={() => setActivePolicy(null)}
        title="Términos de Servicio"
      >
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-4">Última actualización: Enero 2026</p>
          
          <h3 className="text-lg font-bold mt-6 mb-3">1. Aceptación de Términos</h3>
          <p className="text-muted-foreground mb-4">
            Al acceder y usar este sitio web, aceptas estar sujeto a estos términos de servicio y todas las leyes y regulaciones aplicables.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">2. Servicios</h3>
          <p className="text-muted-foreground mb-4">
            NITROECOM proporciona servicios de desarrollo de software, consultoría tecnológica y soluciones de ecommerce. Los detalles específicos se acuerdan en contratos individuales.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">3. Propiedad Intelectual</h3>
          <p className="text-muted-foreground mb-4">
            Todo el contenido de este sitio, incluyendo texto, gráficos, logos y software, es propiedad de NITROECOM y está protegido por leyes de propiedad intelectual.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">4. Limitación de Responsabilidad</h3>
          <p className="text-muted-foreground mb-4">
            NITROECOM no será responsable de daños indirectos, incidentales o consecuentes que surjan del uso de nuestros servicios o sitio web.
          </p>
        </div>
      </PolicyModal>

      <PolicyModal
        isOpen={activePolicy === "cookies"}
        onClose={() => setActivePolicy(null)}
        title="Política de Cookies"
      >
        <div className="prose prose-invert max-w-none">
          <p className="text-muted-foreground mb-4">Última actualización: Enero 2026</p>
          
          <h3 className="text-lg font-bold mt-6 mb-3">1. Qué son las Cookies</h3>
          <p className="text-muted-foreground mb-4">
            Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">2. Cookies que Utilizamos</h3>
          <p className="text-muted-foreground mb-4">
            <strong>Cookies Esenciales:</strong> Necesarias para el funcionamiento básico del sitio.<br/>
            <strong>Cookies de Análisis:</strong> Nos ayudan a entender cómo los visitantes interactúan con nuestro sitio.
          </p>

          <h3 className="text-lg font-bold mt-6 mb-3">3. Control de Cookies</h3>
          <p className="text-muted-foreground mb-4">
            Puedes controlar y/o eliminar cookies según desees. Puedes eliminar todas las cookies que ya están en tu dispositivo y configurar la mayoría de los navegadores para evitar que se coloquen.
          </p>
        </div>
      </PolicyModal>
    </footer>
  )
}
