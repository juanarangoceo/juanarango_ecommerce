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
