import Image from "next/image"
import { HeroContent } from "./hero-content"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* LCP Optimization: High Priority Poster Image */}
      <Image
        src="https://res.cloudinary.com/dohwyszdj/video/upload/f_auto,q_auto:eco,w_1920/v1769051872/Creaci%C3%B3n_de_Video_para_Spa_ehp0lh.jpg"
        alt="Aura Stetic Spa"
        fill
        priority
        quality={80}
        sizes="100vw"
        className="object-cover"
        fetchPriority="high"
      />

      <div className="absolute inset-0 z-0 bg-black/20" />

      {/* Video loads after poster */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 w-full h-full object-cover bg-transparent"
      >
        {/* Mobile Source: 800k bitrate for better quality */}
        <source
          media="(max-width: 768px)"
          src="https://res.cloudinary.com/dohwyszdj/video/upload/f_auto:video,q_auto:good,w_720,br_800k/v1769051872/Creaci%C3%B3n_de_Video_para_Spa_ehp0lh.mp4"
          type="video/mp4"
        />
        
        {/* Desktop Source: 1m bitrate */}
        <source
          media="(min-width: 769px)"
          src="https://res.cloudinary.com/dohwyszdj/video/upload/f_auto:video,q_auto:good,w_1920,br_1m/v1769051872/Creaci%C3%B3n_de_Video_para_Spa_ehp0lh.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay for Text Contrast */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      <HeroContent />
    </section>
  )
}
