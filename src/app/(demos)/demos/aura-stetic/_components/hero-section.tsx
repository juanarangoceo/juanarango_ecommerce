import Image from "next/image"
import { HeroContent } from "./hero-content"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Static & Prioritized for LCP */}
      <div className="absolute inset-0 bg-gradient-to-br from-stone-200 via-stone-100 to-stone-50 z-0">
        <Image
          src="/soft-luxury-spa-abstract-light-texture.jpg"
          alt="Luxury Spa Texture"
          fill
          priority={true}
          quality={90}
          className="object-cover opacity-30"
          sizes="100vw"
        />
      </div>

      <HeroContent />
    </section>
  )
}
