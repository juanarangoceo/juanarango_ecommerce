import Link from "next/link"

export function Footer() {
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
                <Link href="#" className="hover:text-primary transition-colors">
                  NitroBot
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  NitroSearch
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  NitroCommerce
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  NitroStrategy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Empresa</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Casos de Éxito
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>hola@nitrotech.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          © 2026 NitroTech. Construido con Next.js 16 en Vercel Edge Network.
        </div>
      </div>
    </footer>
  )
}
