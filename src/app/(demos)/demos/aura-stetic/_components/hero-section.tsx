import { HeroContent } from "./hero-content"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image - Static & Prioritized for LCP */}
      {/* Background Video - Optimized for Mobile LCP */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        poster="https://res.cloudinary.com/dohwyszdj/video/upload/f_auto,q_auto,so_0/v1769051872/Creaci%C3%B3n_de_Video_para_Spa_ehp0lh.jpg"
      >
        {/* Mobile Source (Max width 768px) - Serve lighter video */}
        <source
          media="(max-width: 768px)"
          src="https://res.cloudinary.com/dohwyszdj/video/upload/w_640,f_auto,q_auto/v1769051872/Creaci%C3%B3n_de_Video_para_Spa_ehp0lh.mp4"
          type="video/mp4"
        />
        {/* Desktop Source (Default) - Serve HD video */}
        <source
          src="https://res.cloudinary.com/dohwyszdj/video/upload/w_1280,f_auto,q_auto/v1769051872/Creaci%C3%B3n_de_Video_para_Spa_ehp0lh.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay for Text Contrast */}
      <div className="absolute inset-0 bg-black/40 z-10" />


      <HeroContent />
    </section>
  )
}
