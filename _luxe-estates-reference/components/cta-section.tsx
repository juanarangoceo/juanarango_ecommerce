"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Calendar, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

function AnimatedStat({
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
    <div ref={ref} className="font-serif text-3xl font-bold text-secondary">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}

export function CTASection() {
  const scrollToContact = () => {
    document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-24 bg-secondary/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative bg-card rounded-3xl overflow-hidden shadow-xl">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-secondary/20 via-transparent to-transparent" />

          <div className="relative grid lg:grid-cols-2 gap-12 p-8 sm:p-12 lg:p-16">
            {/* Content */}
            <div>
              <span className="font-sans text-sm uppercase tracking-[0.2em] text-secondary mb-2 block">
                Da el primer paso
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-6 text-balance">
                Tu patrimonio merece el mejor respaldo
              </h2>
              <p className="font-sans text-lg text-muted-foreground leading-relaxed mb-8">
                Agenda una consulta sin compromiso con nuestros asesores. Cuéntanos 
                qué buscas y te presentaremos opciones que realmente se ajusten a ti.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={scrollToContact}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-sans px-8 py-6"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Agendar Consulta
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="font-sans px-8 py-6 bg-transparent"
                  asChild
                >
                  <a href="tel:+573001234567">
                    <Phone className="mr-2 h-5 w-5" />
                    Llamar Ahora
                  </a>
                </Button>
              </div>
            </div>

            {/* Stats Card */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="bg-primary text-background rounded-2xl p-8 w-full max-w-sm">
                <h3 className="font-serif text-2xl font-bold mb-6">
                  Resultados que hablan
                </h3>
                <div className="space-y-6">
                  <div className="flex items-baseline justify-between border-b border-background/20 pb-4">
                    <span className="font-sans text-background/70">
                      Clientes satisfechos
                    </span>
                    <AnimatedStat end={2500} suffix="+" />
                  </div>
                  <div className="flex items-baseline justify-between border-b border-background/20 pb-4">
                    <span className="font-sans text-background/70">
                      En ventas cerradas
                    </span>
                    <AnimatedStat end={50} prefix="$" suffix="M+" />
                  </div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-sans text-background/70">
                      Tiempo promedio venta
                    </span>
                    <AnimatedStat end={45} suffix=" días" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
