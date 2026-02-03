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
    preview: "bg-gradient-to-br from-white to-zinc-200 border border-zinc-200"
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
    <Card className="bg-[#0B1221] border-[#1E293B] shadow-2xl relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
      
      <CardContent className="p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white">Crea Tu Demo</h3>
          <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Gratis</span>
          </div>
        </div>

        <div className="space-y-5">
          {/* Brand Name */}
          <div>
            <Label className="text-slate-300 text-sm font-medium mb-2 block">
              1. Nombre de tu Inmobiliaria <span className="text-blue-400">*</span>
            </Label>
            <Input
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="Ej: Inmobiliaria Premium"
              className={`bg-[#0F172A] border-[#1E293B] text-white h-11 placeholder:text-slate-600 focus:border-blue-500 transition-colors ${
                errors.brandName ? 'border-red-500/50' : ''
              }`}
            />
          </div>

          {/* City */}
          <div>
            <Label className="text-slate-300 text-sm font-medium mb-2 block">
              2. Ciudad <span className="text-slate-600 font-normal">(Opcional)</span>
            </Label>
            <Input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Ej: Bogotá"
              className="bg-[#0F172A] border-[#1E293B] text-white h-11 placeholder:text-slate-600 focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Theme Selection */}
          <div>
            <Label className="text-slate-300 text-sm font-medium mb-3 block">
              3. Elige tu Estilo
            </Label>
            <div className="grid grid-cols-3 gap-3">
              {THEMES.map((theme) => (
                <button
                  key={theme.id}
                  onClick={() => setSelectedTheme(theme.id)}
                  className={`group relative p-3 rounded-lg border transition-all duration-300 text-left ${
                    selectedTheme === theme.id
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-[#1E293B] bg-[#0F172A] hover:border-slate-600'
                  }`}
                >
                  <div className={`h-12 rounded-md mb-2 ${theme.preview} opacity-80 group-hover:opacity-100 transition-opacity`} />
                  <p className="text-[10px] font-semibold text-slate-300 truncate">{theme.name}</p>
                  
                  {selectedTheme === theme.id && (
                    <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
                      <Check size={10} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* CTA */}
          <Button
            onClick={handleCreateDemo}
            className="w-full h-12 text-base font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 transition-all hover:translate-y-[-1px]"
          >
            Ver Mi Demo Ahora <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          
          <div className="flex justify-between text-[10px] text-slate-500 px-1">
            <span>🚀 Sin registro</span>
            <span>⚡ Generación instantánea</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
