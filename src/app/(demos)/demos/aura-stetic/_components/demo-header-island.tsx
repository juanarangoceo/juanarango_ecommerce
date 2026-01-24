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
  // Logic to hide chat when reaching Nitro section using IntersectionObserver
  useEffect(() => {
    const nitroSection = document.getElementById("booking");
    if (!nitroSection) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Hide chat if booking section is intersecting (visible)
        setShowDemoChat(!entry.isIntersecting);
      },
      {
        threshold: 0.1, // Trigger when 10% of the booking section is visible
      }
    );

    observer.observe(nitroSection);

    return () => observer.disconnect();
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
