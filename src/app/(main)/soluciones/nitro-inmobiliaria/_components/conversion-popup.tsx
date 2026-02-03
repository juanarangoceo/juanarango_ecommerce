"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const POPUP_DELAY = 15000; // 15 seconds
const STORAGE_KEY = "nitro-inmobiliaria-popup-shown";

export function ConversionPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if popup was already shown in this session
    const wasShown = sessionStorage.getItem(STORAGE_KEY);
    if (wasShown) return;

    // Show popup after delay
    const timer = setTimeout(() => {
      setIsVisible(true);
      sessionStorage.setItem(STORAGE_KEY, "true");
    }, POPUP_DELAY);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  const handleScrollToDemo = () => {
    handleClose();
    setTimeout(() => {
      document.getElementById("demo-configurator")?.scrollIntoView({ 
        behavior: "smooth",
        block: "center"
      });
    }, 400);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
      />

      {/* Popup */}
      <div 
        className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md mx-4 transition-all duration-300 ${
          isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
      >
        <div className="bg-gradient-to-br from-blue-950 via-slate-900 to-black rounded-2xl shadow-2xl border border-blue-500/20 overflow-hidden">
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>

          {/* Content */}
          <div className="p-8 text-center">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Sparkles size={32} className="text-blue-400" />
            </div>

            {/* Headline */}
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              ¿Listo para crear tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-500">próximo proyecto</span>?
            </h3>

            {/* Description */}
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              Prueba cómo se vería tu sitio web inmobiliario con tu marca y colores. 
              <strong className="text-white"> Toma solo 30 segundos.</strong>
            </p>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleScrollToDemo}
                size="lg"
                className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl shadow-blue-500/20"
              >
                <Sparkles className="mr-2 w-5 h-5" />
                Crear Mi Demo Gratis
                <ArrowDown className="ml-2 w-5 h-5" />
              </Button>
              <Button
                onClick={handleClose}
                size="lg"
                variant="ghost"
                className="w-full text-zinc-400 hover:text-white hover:bg-white/5"
              >
                Tal vez después
              </Button>
            </div>

            {/* Trust Badge */}
            <p className="text-zinc-600 text-xs mt-6">
              ✨ Sin registro • 🚀 Instantáneo • 💯 Gratis
            </p>
          </div>

          {/* Decorative Gradient */}
          <div className="h-1 bg-gradient-to-r from-blue-500 via-blue-400 to-amber-500"></div>
        </div>
      </div>
    </>
  );
}
