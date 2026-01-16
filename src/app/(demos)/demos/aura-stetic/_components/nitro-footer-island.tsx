"use client";

import { useState } from "react";
import Link from "next/link";
import { NitroBookingModal } from "./nitro-booking-modal";
import { BookingSection } from "@/components/booking-section"; // Assuming this is needed if we want to preload or logic, but standard Button trigger is enough.

export function NitroFooterIsland() {
  const [isNitroModalOpen, setIsNitroModalOpen] = useState(false);

  return (
    <>
      {/* --- NITRO ECOM SECTION (Footer Area) --- */}
      <section id="nitro-footer" className="py-24 bg-black relative z-10">
        
        <div className="container mx-auto px-6 relative z-10">
            
            {/* TECH SPECS */}
            <div className="flex flex-col items-center text-center gap-8 mb-20">
                {/* Removed Nitro Badge */}
                
                <h3 className="text-3xl md:text-6xl font-black text-white max-w-5xl leading-tight tracking-tight">
                    La velocidad convierte visitantes en pacientes.
                </h3>
                
                <p className="text-zinc-400 max-w-2xl text-lg md:text-xl leading-relaxed">
                    Esta demo carga en menos de 0.5 segundos. En la industria estética, la primera impresión es la única que cuenta.
                    ¿Tu sitio actual es así de rápido?
                </p>

                <div className="flex gap-4 md:gap-8 justify-center mt-10">
                    <div className="text-center">
                        <span className="block text-4xl md:text-5xl font-black text-white mb-2">100</span>
                        <span className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest font-bold">SEO Score</span>
                    </div>
                    <div className="w-px h-12 md:h-16 bg-white/10" />
                    <div className="text-center">
                        <span className="block text-4xl md:text-5xl font-black text-teal-400 mb-2">98</span>
                        <span className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest font-bold">Performance</span>
                    </div>
                    <div className="w-px h-12 md:h-16 bg-white/10" />
                    <div className="text-center">
                        <span className="block text-4xl md:text-5xl font-black text-emerald-500 mb-2">0s</span>
                        <span className="text-[10px] md:text-xs text-zinc-500 uppercase tracking-widest font-bold">Downtime</span>
                    </div>
                </div>
            </div>

            {/* CALL TO ACTION */}
            <div className="max-w-4xl mx-auto text-center border-t border-white/10 pt-24">
                <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter mb-10">
                    ¿Listo para escalar?
                </h2>
                <p className="text-xl md:text-2xl text-zinc-400 mb-12 leading-relaxed max-w-2xl mx-auto">
                    No solo diseñamos webs bonitas. Construimos ecosistemas digitales que llenan tu agenda automáticamente.
                </p>
                
                <div className="flex flex-col md:flex-row justify-center gap-6">
                    <Link href="/" className="px-8 md:px-10 py-4 md:py-5 rounded-full border border-white/10 hover:bg-white/5 text-white transition-colors font-medium text-base md:text-lg">
                        Volver al inicio
                    </Link>
                    <button 
                        onClick={() => setIsNitroModalOpen(true)}
                        className="px-8 md:px-10 py-4 md:py-5 rounded-full bg-white text-black font-bold text-base md:text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                    >
                        Quiero este sistema
                    </button>
                </div>
            </div>

        </div>
      </section>

      <NitroBookingModal isOpen={isNitroModalOpen} onClose={() => setIsNitroModalOpen(false)} />
    </>
  );
}
