import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NitroCtaCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-[#0d110e] border border-white/10 shadow-xl group">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="relative p-6 sm:p-8 flex flex-col items-start text-left">
        {/* Icon / Badge */}
        <div className="inline-flex items-center justify-center p-2.5 rounded-xl bg-primary/10 text-primary mb-6 group-hover:bg-primary/20 transition-colors">
          <Zap className="w-6 h-6 fill-current" />
        </div>

        {/* Text Content */}
        <h3 className="text-2xl font-bold text-white mb-3">
          ¿Quieres saber <span className="text-primary">qué mejorar primero?</span>
        </h3>
        
        <p className="text-white/58 mb-8 leading-relaxed">
          Revisemos el recorrido, la operación y la tecnología antes de elegir la siguiente mejora.
        </p>

        {/* CTA Button */}
        <Link href="/diagnostico" className="w-full">
          <Button 
            className="w-full h-12 bg-primary hover:bg-primary text-black font-bold text-base shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all duration-300 group/btn"
          >
            Iniciar diagnóstico
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
        
        {/* Social Proof / Tiny Footer */}
        <p className="mt-4 text-xs text-center text-white/45 w-full">
          Orientación inicial sin promesas ni cifras inventadas
        </p>
      </div>
    </div>
  );
}
