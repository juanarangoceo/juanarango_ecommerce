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
      {/* --- LIVE DEMO HEADER --- */}
      <nav className="fixed top-0 w-full z-50 bg-neutral-950 text-white border-b border-white/10 shadow-2xl h-14 md:h-20 flex items-center justify-between px-4 md:px-6">
           <div className="w-10" />
           
           {/* Center Badge - Absolute Center */}
           <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 md:gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl group transition-all hover:bg-white/10">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-[pulse_2s_ease-in-out_infinite]" />
                 <span className="text-zinc-200 text-[10px] md:text-sm font-medium tracking-wide">
                    Ingeniería de Ventas <span className="hidden md:inline text-zinc-500 mx-1">|</span> <span className="text-white font-bold">Ecosistema Construido para tu Empresa</span>
                 </span>
           </div>
           
           {/* Exit Link */}
           <div className="flex items-center z-10">
                <Link href="/" className="text-xs md:text-sm font-medium text-zinc-500 hover:text-white transition-colors flex items-center gap-2 group">
                    <span className="hidden md:inline">Salir de la demo</span> 
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
