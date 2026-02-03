"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Search, Award, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

function AnimatedCounter({
  end,
  suffix = "",
  prefix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(end * easeOutCubic);

      setCount(currentValue);

      if (progress === 1) {
        clearInterval(timer);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="font-serif text-3xl sm:text-4xl font-bold text-background">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      const element = document.getElementById("propiedades");
      element?.scrollIntoView({ behavior: "smooth" });
    }, 800);
  };

  const suggestions = [
    "Penthouse con vista al mar",
    "Casa moderna con piscina",
    "Apartamento céntrico",
  ];

  const scrollToProperties = () => {
    document.getElementById("propiedades")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-luxury.jpg"
          alt="Propiedad de lujo"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 backdrop-blur-sm border border-background/20 mb-8">
          <Award className="h-4 w-4 text-secondary" />
          <span className="font-sans text-sm text-background/90">
            15 años de excelencia inmobiliaria
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-background leading-tight mb-6">
          <span className="block text-balance">Tu próximo capítulo</span>
          <span className="block text-secondary">comienza aquí</span>
        </h1>

        {/* Subheadline */}
        <p className="font-sans text-lg sm:text-xl text-background/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Propiedades exclusivas seleccionadas por expertos. Acompañamiento personalizado 
          desde la primera visita hasta las llaves en tu mano.
        </p>

        {/* Search Box */}
        <div className="relative max-w-2xl mx-auto">
          <div className="relative bg-background/95 backdrop-blur-md rounded-2xl shadow-2xl p-2 border border-border/50">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Busca por zona, tipo de propiedad o características..."
                  className="w-full px-4 py-4 bg-transparent font-sans text-primary placeholder:text-muted-foreground focus:outline-none text-base sm:text-lg"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-xl px-6 py-6 font-sans font-medium"
              >
                {isSearching ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-secondary-foreground/30 border-t-secondary-foreground rounded-full animate-spin" />
                    <span className="hidden sm:inline">Buscando...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Search className="h-5 w-5" />
                    <span className="hidden sm:inline">Buscar</span>
                  </div>
                )}
              </Button>
            </div>
          </div>

          {/* Quick Suggestions */}
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {suggestions.map((suggestion) => (
              <button
                type="button"
                key={suggestion}
                onClick={() => setSearchQuery(suggestion)}
                className="px-4 py-2 bg-background/20 backdrop-blur-sm rounded-full font-sans text-sm text-background/90 hover:bg-background/30 transition-colors border border-background/20"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <Button
            onClick={scrollToProperties}
            size="lg"
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-sans px-8 py-6"
          >
            Ver Propiedades
          </Button>
          <Button
            onClick={scrollToContact}
            size="lg"
            variant="outline"
            className="bg-transparent border-background/30 text-background hover:bg-background/10 font-sans px-8 py-6"
          >
            Hablar con un Asesor
          </Button>
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 max-w-xl mx-auto">
          <div className="text-center">
            <AnimatedCounter end={500} suffix="+" />
            <div className="font-sans text-sm text-background/70 mt-1">
              Propiedades
            </div>
          </div>
          <div className="text-center border-x border-background/20">
            <AnimatedCounter end={98} suffix="%" />
            <div className="font-sans text-sm text-background/70 mt-1">
              Clientes satisfechos
            </div>
          </div>
          <div className="text-center">
            <AnimatedCounter end={15} suffix="+" />
            <div className="font-sans text-sm text-background/70 mt-1">
              Años de experiencia
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        type="button"
        onClick={scrollToProperties}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 group cursor-pointer"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-sans text-xs text-background/60 uppercase tracking-widest group-hover:text-background/80 transition-colors">
            Explorar
          </span>
          <div className="w-10 h-10 rounded-full border-2 border-background/30 flex items-center justify-center group-hover:border-background/50 transition-colors">
            <ArrowDown className="h-4 w-4 text-background/60 animate-bounce group-hover:text-background/80" />
          </div>
        </div>
      </button>
    </section>
  );
}
