import { HeroContent } from "./hero-content"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* LCP Optimization: High Priority Static Image */}
      {/* LCP Optimization: Picture Tag for Forced Mobile Image */}
      <picture className="absolute inset-0 w-full h-full z-0">
        <source 
          media="(max-width: 768px)" 
          srcSet="https://res.cloudinary.com/dohwyszdj/video/upload/f_auto,q_auto,w_600/v1769051872/Creaci%C3%B3n_de_Video_para_Spa_ehp0lh.jpg"
        />
        <source 
          media="(min-width: 769px)" 
          srcSet="https://res.cloudinary.com/dohwyszdj/video/upload/f_auto,q_auto,w_1920/v1769051872/Creaci%C3%B3n_de_Video_para_Spa_ehp0lh.jpg"
        />
        <img 
          src="https://res.cloudinary.com/dohwyszdj/video/upload/f_auto,q_auto,w_1920/v1769051872/Creaci%C3%B3n_de_Video_para_Spa_ehp0lh.jpg"
          alt="Aura Stetic Background"
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
          decoding="sync"
        />
      </picture>

      <div className="absolute inset-0 z-0 bg-black/20" /> {/* Subtle overlay for image before video loads */}

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover bg-transparent"
      >
        {/* Mobile Source: 720p optimizado para 4G */}
        <source
          media="(max-width: 768px)"
          src="https://res.cloudinary.com/dohwyszdj/video/upload/f_auto:video,q_auto:best,w_720,br_3m/v1769051872/Creaci%C3%B3n_de_Video_para_Spa_ehp0lh.mp4"
          type="video/mp4"
        />
        
        {/* Desktop Source: 1080p alta fidelidad */}
        <source
          media="(min-width: 769px)"
          src="https://res.cloudinary.com/dohwyszdj/video/upload/f_auto:video,q_auto:best,w_1920,br_5m/v1769051872/Creaci%C3%B3n_de_Video_para_Spa_ehp0lh.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay for Text Contrast */}
      <div className="absolute inset-0 bg-black/40 z-10" />


      <HeroContent />
    </section>
  )
}
