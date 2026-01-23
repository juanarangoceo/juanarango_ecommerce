"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "./navbar";
import { ChatWidget } from "./chat-widget";

export function DemoHeaderIsland() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showDemoChat, setShowDemoChat] = useState(true);

  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);

  // Logic to hide chat when reaching Nitro section
  useEffect(() => {
    const handleScroll = () => {
      const nitroSection = document.getElementById("nitro-footer");
      if (nitroSection) {
        const rect = nitroSection.getBoundingClientRect();
        // If the top of the Nitro section is near the bottom of the viewport
        const triggerPoint = window.innerHeight * 0.8;
        if (rect.top <= triggerPoint) {
            setShowDemoChat(false);
        } else {
            setShowDemoChat(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* --- DEMO BANNER --- */}
      {/* Mobile: Top Fixed Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-10 bg-neutral-950 z-[60] flex items-center justify-between px-4 border-b border-white/10">
          <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] items-center font-bold text-zinc-300 tracking-wide">
                  Demo por <span className="text-white">Nitro Ecom</span>
              </span>
          </div>
          <Link href="/" className="text-[10px] font-medium text-zinc-400 hover:text-white transition-colors border border-white/10 px-3 py-1 rounded-full bg-white/5">
              Salir
          </Link>
      </div>

      {/* Desktop: Floating Capsule & Exit Button */}
      <nav className="hidden md:flex fixed top-0 w-full z-50 pointer-events-none h-20 items-center justify-between px-6">
           <div className="w-10 pointer-events-auto" /> {/* Spacer */}
           
           {/* Center Badge - Pointer Events Auto */}
           <div className="pointer-events-auto flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-neutral-950/80 backdrop-blur-md shadow-2xl transition-all hover:bg-neutral-900">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-[pulse_2s_ease-in-out_infinite]" />
                 <span className="text-zinc-200 text-sm font-medium tracking-wide">
                    Ingeniería de Ventas <span className="text-zinc-500 mx-1">|</span> <span className="text-white font-bold">Ecosistema Construido para tu Empresa</span>
                 </span>
           </div>
           
           {/* Exit Link - Pointer Events Auto */}
           <div className="pointer-events-auto flex items-center z-10">
                <Link href="/" className="text-sm font-medium text-zinc-500 hover:text-white transition-colors flex items-center gap-2 group bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/5 hover:border-white/20">
                    <span>Salir de la demo</span> 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
           </div>
      </nav>

      {/* --- REAL DEMO NAVBAR (Shifted down) --- */}
      <div className="relative z-40">
        <Navbar onContactClick={openChat} />
      </div>

      {showDemoChat && (
        <ChatWidget isOpen={isChatOpen} onOpen={() => setIsChatOpen(true)} onClose={closeChat} />
      )}
    </>
  );
}
