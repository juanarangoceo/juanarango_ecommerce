"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, ArrowRight, Check } from "lucide-react";

const THEMES = [
  {
    id: "trust",
    name: "Legacy Blue",
    description: "Profesional y confiable",
    colors: { primary: "#0f172a", accent: "#3b82f6" },
    preview: "bg-gradient-to-br from-slate-900 to-blue-600"
  },
  {
    id: "luxury",
    name: "Gold Luxury",
    description: "Elegante y premium",
    colors: { primary: "#1c1917", accent: "#d4af37" },
    preview: "bg-gradient-to-br from-stone-900 to-amber-500"
  },
  {
    id: "urban",
    name: "Urban Nature",
    description: "Moderno y ecológico",
    colors: { primary: "#14532d", accent: "#ea580c" },
    preview: "bg-gradient-to-br from-green-900 to-orange-600"
  },
];

export function DemoConfigurator() {
  const [brandName, setBrandName] = useState("");
  const [city, setCity] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("trust");
  const [errors, setErrors] = useState<{ brandName?: string }>({});

  const validateForm = () => {
    const newErrors: { brandName?: string } = {};
    
    if (!brandName.trim()) {
      newErrors.brandName = "El nombre de tu inmobiliaria es requerido";
    } else if (brandName.length > 30) {
      newErrors.brandName = "Máximo 30 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateDemo = () => {
    if (!validateForm()) return;

    // Generate URL with parameters
    const params = new URLSearchParams({
      brand: brandName.trim(),
      theme: selectedTheme,
      ...(city.trim() && { city: city.trim() })
    });

    const demoUrl = `/demos/luxe-estates?${params.toString()}`;
    
    // Open in new tab
    window.open(demoUrl, '_blank');
  };

  return (
    <section id="demo-configurator" className="py-24 bg-gradient-to-br from-blue-950 via-slate-900 to-black text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-blue-400">Prueba Interactiva</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Crea Tu <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-amber-500">Demo Personalizada</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Visualiza cómo se vería tu sitio web inmobiliario con tu marca y colores en menos de 30 segundos
          </p>
        </div>

        {/* Configurator Card */}
        <Card className="bg-white/5 backdrop-blur-md border-white/10 shadow-2xl">
          <CardContent className="p-8 md:p-12">
            <div className="space-y-8">
              {/* Brand Name Input */}
              <div>
                <Label htmlFor="brandName" className="text-white text-lg font-semibold mb-3 block">
                  1. Nombre de tu Inmobiliaria *
                </Label>
                <Input
                  id="brandName"
                  type="text"
                  placeholder="Ej: Inmobiliaria Premium"
                  value={brandName}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBrandName(e.target.value)}
                  maxLength={30}
                  className={`h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-zinc-500 focus:border-blue-400 ${
                    errors.brandName ? 'border-red-500' : ''
                  }`}
                />
                {errors.brandName && (
                  <p className="text-red-400 text-sm mt-2">{errors.brandName}</p>
                )}
                <p className="text-zinc-500 text-sm mt-2">
                  {brandName.length}/30 caracteres
                </p>
              </div>

              {/* City Input */}
              <div>
                <Label htmlFor="city" className="text-white text-lg font-semibold mb-3 block">
                  2. Ciudad (Opcional)
                </Label>
                <Input
                  id="city"
                  type="text"
                  placeholder="Ej: Bogotá"
                  value={city}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
                  maxLength={30}
                  className="h-14 text-lg bg-white/10 border-white/20 text-white placeholder:text-zinc-500 focus:border-blue-400"
                />
              </div>

              {/* Theme Selection */}
              <div>
                <Label className="text-white text-lg font-semibold mb-4 block">
                  3. Elige tu Estilo de Branding
                </Label>
                <div className="grid md:grid-cols-3 gap-4">
                  {THEMES.map((theme) => (
                    <button
                      key={theme.id}
                      type="button"
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                        selectedTheme === theme.id
                          ? 'border-blue-400 bg-blue-500/10 scale-105'
                          : 'border-white/10 bg-white/5 hover:border-white/30'
                      }`}
                    >
                      {/* Theme Preview */}
                      <div className={`h-20 rounded-lg mb-4 ${theme.preview}`}></div>
                      
                      {/* Theme Info */}
                      <h3 className="font-bold text-white mb-1">{theme.name}</h3>
                      <p className="text-sm text-zinc-400">{theme.description}</p>

                      {/* Selected Indicator */}
                      {selectedTheme === theme.id && (
                        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-blue-400 flex items-center justify-center">
                          <Check size={16} className="text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-6">
                <Button
                  onClick={handleCreateDemo}
                  size="lg"
                  className="w-full h-16 text-lg font-bold bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-xl shadow-blue-500/20 transition-all hover:scale-105"
                >
                  <Sparkles className="mr-2 w-5 h-5" />
                  Crear Mi Demo Ahora
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <p className="text-center text-zinc-500 text-sm mt-4">
                  ✨ Se abrirá en una nueva pestaña • 🚀 Sin registro • 💯 Gratis
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trust Indicators */}
        <div className="mt-12 grid grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-400 mb-1">30s</div>
            <div className="text-sm text-zinc-500">Tiempo de creación</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-amber-400 mb-1">100%</div>
            <div className="text-sm text-zinc-500">Personalizable</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-blue-400 mb-1">0€</div>
            <div className="text-sm text-zinc-500">Sin costo</div>
          </div>
        </div>
      </div>
    </section>
  );
}
