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
