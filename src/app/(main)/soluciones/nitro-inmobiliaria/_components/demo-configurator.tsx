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
    id: "minimal",
    name: "Minimalist",
    description: "Limpio y atemporal",
    colors: { primary: "#000000", accent: "#525252" },
    preview: "bg-gradient-to-br from-white to-white/70 border border-white/20"
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
      newErrors.brandName = "Requerido";
    } else if (brandName.length > 30) {
      newErrors.brandName = "Máximo 30";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateDemo = () => {
    if (!validateForm()) return;
    const params = new URLSearchParams({
      brand: brandName.trim(),
      theme: selectedTheme,
      ...(city.trim() && { city: city.trim() })
    });
    window.open(`/demos/luxe-estates?${params.toString()}`, '_blank');
  };

  return (
    <Card className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0d110e] shadow-[0_24px_80px_rgba(0,0,0,0.26)]">
      {/* Nitro Brand Effect */}
      <div className="pointer-events-none absolute -right-10 -top-16 size-64 rounded-full bg-primary/[0.09] blur-[90px]" />
      <span className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />
      
      <CardContent className="p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Crea Tu Demo</h3>
          <div className="flex items-center gap-1 rounded-full border border-primary/20 bg-primary/9 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
            <Sparkles className="w-3 h-3" />
            <span>Gratis</span>
          </div>
        </div>

        <div className="space-y-5">
          {/* Brand Name */}
          <div>
            <Label className="mb-2 block text-sm font-medium text-white/58">
              1. Nombre de tu Inmobiliaria <span className="text-primary">*</span>
            </Label>
            <Input
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Ej: Inmobiliaria Premium"
              className={`h-11 border-white/10 bg-[#111512] text-white transition-colors placeholder:text-white/38 focus:border-primary ${
                errors.brandName ? 'border-red-500/50' : ''
              }`}
            />
          </div>

          {/* City */}
          <div>
            <Label className="mb-2 block text-sm font-medium text-white/58">
              2. Ciudad <span className="font-normal text-white/38">(Opcional)</span>
            </Label>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ej: Bogotá"
              className="h-11 border-white/10 bg-[#111512] text-white transition-colors placeholder:text-white/38 focus:border-primary"
            />
          </div>

          {/* Theme Selection */}
          <div>
            <Label className="mb-3 block text-sm font-medium text-white/58">
              3. Elige tu Estilo
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`group relative p-3 rounded-lg border transition-all duration-300 text-left ${
                    selectedTheme === theme.id
                      ? 'border-primary bg-primary/9'
                      : 'border-white/10 bg-[#111512] hover:border-white/25'
                  }`}
                >
                  <div className={`h-12 rounded-md mb-2 ${theme.preview} opacity-80 group-hover:opacity-100 transition-opacity`} />
                  <p className="truncate text-[10px] font-semibold text-white/78">{theme.name}</p>
                  
                  {selectedTheme === theme.id && (
                    <div className="absolute right-2 top-2 flex size-4 items-center justify-center rounded-full bg-primary shadow-lg">
                      <Check size={10} className="font-bold text-primary-foreground" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={handleCreateDemo}
            className="h-13 w-full rounded-full text-base font-bold shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5"
          >
            Ver Mi Demo Ahora <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          
          <div className="flex justify-between px-1 text-[10px] text-white/45">
            <span>🚀 Sin registro</span>
            <span>⚡ Generación instantánea</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
