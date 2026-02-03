"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Search, Award, ArrowDown, BedDouble, Bath, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DemoHeroProps {
  brandName: string;
  city: string;
}

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
    <div ref={ref} className="text-3xl sm:text-4xl font-bold text-white">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}

export function DemoHero({ brandName, city }: DemoHeroProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      document.getElementById("propiedades")?.scrollIntoView({ behavior: "smooth" });
    }, 800);
  };

  const suggestions = [
    `Penthouse en ${city}`,
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-6ad4c728fdbe?q=80&w=2075&auto=format&fit=crop"
          alt="Propiedad de lujo"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div 
          className="absolute inset-0 opacity-80"
          style={{ background: 'linear-gradient(to bottom, var(--theme-primary), var(--theme-primary) 50%, var(--theme-primary) 80%)' }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8 animate-in fade-in slide-in-from-top duration-700">
          <Award className="h-4 w-4" style={{ color: 'var(--theme-accent)' }} />
          <span className="text-sm text-white/90">
            #1 en Bienes Raíces en {city}
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-in fade-in slide-in-from-bottom duration-700">
          <span className="block">Encuentra tu</span>
          <span className="block relative inline-block mt-2">
            <span className="relative z-10">Lugar Ideal</span>
            <span 
              className="absolute bottom-2 left-0 w-full h-4 -z-0 opacity-30"
              style={{ backgroundColor: 'var(--theme-accent)' }}
            ></span>
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom duration-1000">
          Propiedades exclusivas seleccionadas por <span className="font-bold">{brandName}</span>. 
          Acompañamiento personalizado desde la primera visita hasta las llaves en tu mano.
        </p>

        {/* Search Box */}
        <div className="relative max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom duration-1000 delay-200">
          <div className="relative bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-2 border border-white/50">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Busca por zona, tipo de propiedad o características..."
                  className="w-full px-4 py-4 bg-transparent text-slate-900 placeholder:text-slate-500 focus:outline-none text-base sm:text-lg"
                />
              </div>
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="rounded-xl px-6 py-6 font-medium text-white"
                style={{ backgroundColor: 'var(--theme-accent)' }}
              >
                {isSearching ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm text-white/90 hover:bg-white/30 transition-colors border border-white/20"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 animate-in fade-in slide-in-from-bottom duration-1000 delay-300">
          <Button
            onClick={scrollToProperties}
            size="lg"
            className="px-8 py-6 text-white font-semibold shadow-xl hover:translate-y-[-2px] transition-transform"
            style={{ backgroundColor: 'var(--theme-accent)' }}
          >
            Ver Propiedades
          </Button>
          <Button
            onClick={scrollToContact}
            size="lg"
            variant="outline"
            className="px-8 py-6 bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold"
          >
            Hablar con un Asesor
          </Button>
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 max-w-xl mx-auto animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
          <div className="text-center">
            <AnimatedCounter end={500} suffix="+" />
            <div className="text-sm text-white/70 mt-1">
              Propiedades
            </div>
          </div>
          <div className="text-center border-x border-white/20">
            <AnimatedCounter end={98} suffix="%" />
            <div className="text-sm text-white/70 mt-1">
              Clientes satisfechos
            </div>
          </div>
          <div className="text-center">
            <AnimatedCounter end={15} suffix="+" />
            <div className="text-sm text-white/70 mt-1">
              Años de experiencia
            </div>
          </div>
        </div>

        {/* Featured Property Card (Floating) */}
        <div className="mt-12 max-w-md mx-auto bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-2xl border border-white/20 animate-in fade-in slide-in-from-bottom duration-1000 delay-700">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p 
                className="text-xs font-bold uppercase tracking-wider mb-1"
                style={{ color: 'var(--theme-accent)' }}
              >
                Propiedad Destacada
              </p>
              <p className="font-bold text-slate-900 text-xl">Penthouse {city} Central</p>
            </div>
            <span 
              className="text-white px-3 py-1 rounded-full text-sm font-bold"
              style={{ backgroundColor: 'var(--theme-primary)' }}
            >
              $450,000 USD
            </span>
          </div>
          <div className="flex gap-6 text-slate-500 text-sm font-medium border-t pt-4">
            <span className="flex items-center gap-2"><BedDouble size={18}/> 3 Habs</span>
            <span className="flex items-center gap-2"><Bath size={18}/> 2 Baños</span>
            <span className="flex items-center gap-2"><Square size={18}/> 180m²</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        type="button"
        onClick={scrollToProperties}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 group cursor-pointer animate-in fade-in duration-1000 delay-1000"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-white/60 uppercase tracking-widest group-hover:text-white/80 transition-colors">
            Explorar
          </span>
          <div className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-white/50 transition-colors">
            <ArrowDown className="h-4 w-4 text-white/60 animate-bounce group-hover:text-white/80" />
          </div>
        </div>
      </button>
    </section>
  );
}
