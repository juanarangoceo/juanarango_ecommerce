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
        <div className="relative overflow-hidden rounded-[1.75rem] border border-primary/18 bg-[#0b0f0c] shadow-[0_24px_80px_rgba(0,0,0,0.26)]">
          <span className="pointer-events-none absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
          <div className="pointer-events-none absolute -right-16 -top-20 size-64 rounded-full bg-primary/[0.09] blur-[90px]" />
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>

          {/* Content */}
          <div className="relative p-8 text-center">
            {/* Icon */}
            <div className="mb-6 inline-flex size-16 items-center justify-center rounded-2xl bg-primary/9 text-primary">
              <Sparkles size={32} />
            </div>

            {/* Headline */}
            <h3 className="mb-4 text-balance font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
              ¿Quieres ver tu marca en <span className="text-primary">una demo real?</span>
            </h3>

            {/* Description */}
            <p className="mb-8 text-lg leading-relaxed text-white/58">
              Prueba cómo se vería tu sitio web inmobiliario con tu marca y colores. 
              <strong className="text-white"> Toma solo 30 segundos.</strong>
            </p>

            {/* CTA Buttons */}
            <div className="space-y-3">
              <Button
                onClick={handleScrollToDemo}
                size="lg"
                className="h-14 w-full rounded-full text-lg font-bold shadow-xl shadow-primary/20"
              >
                <Sparkles className="mr-2 size-5" />
                Crear mi demo gratis
                <ArrowDown className="ml-2 size-5" />
              </Button>
              <Button
                onClick={handleClose}
                size="lg"
                variant="ghost"
                className="w-full rounded-full text-white/58 hover:bg-white/5 hover:text-white"
              >
                Tal vez después
              </Button>
            </div>

            {/* Trust Badge */}
            <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-white/38">
              Sin registro · Instantáneo · Gratis
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
