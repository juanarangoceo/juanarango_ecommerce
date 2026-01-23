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
      const nitroSection = document.getElementById("booking");
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
      {/* --- FLOATING COMMAND BAR (Unified) --- */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 pl-3 pr-1.5 py-1.5 rounded-full border border-white/10 bg-black/80 backdrop-blur-xl shadow-2xl transition-all hover:bg-black/90 group w-[90%] max-w-fit justify-between md:justify-start">
          
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-2 h-2">
                <div className="absolute w-full h-full rounded-full bg-emerald-500 animate-ping opacity-75" />
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            
            <span className="text-zinc-200 text-xs md:text-sm font-medium tracking-wide whitespace-nowrap">
                <span className="md:hidden">Nitro Demo</span>
                <span className="hidden md:inline">Ingeniería de Ventas <span className="text-zinc-600 mx-2">|</span> <span className="text-white font-bold">Nitro Ecom</span></span>
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-px h-4 bg-white/10 mx-1 hidden md:block" />

            <Link href="/" className="flex items-center justify-center w-8 h-8 md:w-auto md:h-auto md:px-4 md:py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all group-hover/btn relative overflow-hidden">
                <ArrowRight className="w-4 h-4 text-white md:hidden" />
                <span className="hidden md:inline text-xs font-bold text-white tracking-wide">Salir</span>
            </Link>
          </div>
      </div>

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
