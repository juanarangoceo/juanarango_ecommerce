"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConversionCTAProps {
  brandName: string;
}

export function ConversionCTA({ brandName }: ConversionCTAProps) {
  const handleContactSales = () => {
    // Redirect to Nitro Inmobiliaria landing contact section
    window.location.href = "/soluciones/nitro-inmobiliaria#contacto";
  };

  const handleScheduleDemo = () => {
    // Redirect to Nitro Inmobiliaria landing
    window.location.href = "/soluciones/nitro-inmobiliaria";
  };

  return (
    <section 
      id="contacto"
      className="py-20 text-white text-center relative overflow-hidden"
      style={{ backgroundColor: 'var(--theme-primary)' }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 backdrop-blur-sm mb-6">
          <Sparkles 
            size={32} 
            style={{ color: 'var(--theme-accent)' }}
          />
        </div>

        {/* Headline */}
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          ¿Te gusta cómo se ve <span style={{ color: 'var(--theme-accent)' }}>{brandName}</span>?
        </h2>

        {/* Description */}
        <p className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed max-w-2xl mx-auto">
          Esta página fue generada automáticamente con la <strong>tecnología Nitro</strong>. 
          Podemos personalizarla completamente con tu inventario real, WhatsApp, CRM y más 
          en <strong>menos de 5 días</strong>.
        </p>

        {/* Features List */}
        <div className="grid md:grid-cols-3 gap-6 mb-10 text-left max-w-3xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="font-bold mb-1">✨ Diseño Personalizado</div>
            <div className="text-sm opacity-80">Tu marca, tus colores, tu estilo</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="font-bold mb-1">🚀 Performance 90+</div>
            <div className="text-sm opacity-80">Velocidad de carga optimizada</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
            <div className="font-bold mb-1">📈 SEO Incluido</div>
            <div className="text-sm opacity-80">Posicionamiento en Google</div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg"
            onClick={handleContactSales}
            className="bg-white font-bold text-lg px-8 py-6 shadow-xl hover:scale-105 transition-transform"
            style={{ color: 'var(--theme-primary)' }}
          >
            Quiero esta Web para Mí
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button 
            size="lg"
            variant="outline"
            onClick={handleScheduleDemo}
            className="border-2 border-white text-white hover:bg-white/10 font-bold text-lg px-8 py-6"
          >
            Ver Más Información
          </Button>
        </div>

        {/* Trust Badge */}
        <div className="mt-10 pt-8 border-t border-white/20">
          <p className="text-sm opacity-70">
            🔒 Sin compromiso • ⚡ Implementación rápida • 💯 Soporte incluido
          </p>
        </div>
      </div>
    </section>
  );
}
