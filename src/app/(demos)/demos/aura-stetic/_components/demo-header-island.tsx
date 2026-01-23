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
      <nav className="fixed top-0 w-full z-50 bg-neutral-950 text-white border-b border-white/10 shadow-2xl flex flex-col md:flex-row md:items-center md:justify-between h-auto md:h-20 transition-all">
           
           {/* Top Bar for Mobile - Exit & Logo or Spacing */}
           <div className="flex items-center justify-between px-4 py-3 md:py-0 w-full md:w-auto">
               <div className="w-10 hidden md:block" /> {/* Spacer for desktop center alignment */}
               
               {/* Mobile Full Width Banner Content (Visible on MD as centered capsule) */}
               <div className="md:hidden w-full">
                    {/* Placeholder for layout if needed, but we'll use a separate bar below for the 'Badge' on mobile */}
               </div>

               {/* Exit Link - Always Visible */}
               <Link href="/" className="md:absolute md:right-6 md:top-1/2 md:-translate-y-1/2 text-xs md:text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-2 group ml-auto md:ml-0">
                    <span>Salir de la demo</span> 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </Link>
           </div>

           {/* Badge: Full Width Bar on Mobile / Centered Capsule on Desktop */}
           <div className="relative w-full md:w-auto md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                
                {/* Mobile Version: Full Width Banner */}
                <div className="md:hidden w-full bg-gradient-to-r from-emerald-900/50 to-neutral-900 py-2 px-4 border-t border-white/10 flex items-center justify-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                     <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
                        Demo Construida por Nitro Ecom
                     </span>
                </div>

                {/* Desktop Version: Capsule */}
                <div className="hidden md:flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl transition-all hover:bg-white/10">
                     <div className="w-2 h-2 rounded-full bg-emerald-500 animate-[pulse_2s_ease-in-out_infinite]" />
                     <span className="text-zinc-200 text-sm font-medium tracking-wide">
                        Ingeniería de Ventas <span className="text-zinc-500 mx-1">|</span> <span className="text-white font-bold">Ecosistema Construido para tu Empresa</span>
                     </span>
                </div>
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
