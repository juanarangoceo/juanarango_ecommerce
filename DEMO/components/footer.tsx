"use client"

interface FooterProps {
  onContactClick: () => void
}

export function Footer({ onContactClick }: FooterProps) {
  return (
    <footer id="contact" className="bg-stone-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <h3 className="font-serif font-light tracking-tight text-3xl mb-4">Aura Stetic</h3>
            <p className="font-sans text-stone-400 leading-relaxed max-w-sm">
              Donde la ciencia se encuentra con el arte. Experimenta cuidado estético personalizado diseñado para
              revelar tu belleza natural.
            </p>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-amber-400">Enlaces Rápidos</h4>
            <ul className="space-y-3 text-stone-400 font-sans">
              <li>
                <a href="#treatments" className="hover:text-white transition-colors">
                  Tratamientos
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Reseñas
                </a>
              </li>
              <li>
                <a href="#booking" className="hover:text-white transition-colors">
                  Reservar Cita
                </a>
              </li>
              <li>
                <a href="#map" className="hover:text-white transition-colors">
                  Ubicación
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4 text-amber-400">Contacto</h4>
            <ul className="space-y-3 text-stone-400 font-sans">
              <li>hola@aurastetic.com</li>
              <li>+52 (55) 1234-5678</li>
              <li>Av. Reforma 123, CDMX</li>
              <li>
                <button
                  onClick={onContactClick}
                  className="text-amber-400 hover:text-amber-300 transition-colors hover:-translate-y-0.5"
                >
                  Abrir Chat
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 text-center text-stone-500 text-sm font-sans">
          © 2026 Aura Stetic. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  )
}
