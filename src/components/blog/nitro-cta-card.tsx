import Link from "next/link";
import { Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function NitroCtaCard() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl group">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      
      <div className="relative p-6 sm:p-8 flex flex-col items-start text-left">
        {/* Icon / Badge */}
        <div className="inline-flex items-center justify-center p-2.5 rounded-xl bg-green-500/10 text-green-400 mb-6 group-hover:bg-green-500/20 transition-colors">
          <Zap className="w-6 h-6 fill-current" />
        </div>

        {/* Text Content */}
        <h3 className="text-2xl font-bold text-white mb-3">
          ¿Listo para <span className="text-green-400">escalar sin límites?</span>
        </h3>
        
        <p className="text-zinc-400 mb-8 leading-relaxed">
          Infraestructura digital de alto rendimiento. Tiendas que convierten, sistemas que automatizan y estrategia que escala tu negocio.
        </p>

        {/* CTA Button */}
        <Link href="/#contacto" className="w-full">
          <Button 
            className="w-full h-12 bg-green-500 hover:bg-green-400 text-black font-bold text-base shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)] transition-all duration-300 group/btn"
          >
            Agenda tu diagnóstico gratis
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
        
        {/* Social Proof / Tiny Footer */}
        <p className="mt-4 text-xs text-center text-zinc-500 w-full">
          ⚡ +50 negocios escalados con infraestructura Nitro
        </p>
      </div>
    </div>
  );
}
