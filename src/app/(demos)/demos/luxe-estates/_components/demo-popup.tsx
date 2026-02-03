"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const POPUP_DELAY = 15000; // 15 seconds
const STORAGE_KEY = "hasSeenDemoPopup";

export function DemoPagePopup({ brandName }: { brandName: string }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Logic updated: Show on every visit/refresh as per user request
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, POPUP_DELAY);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleCTA = () => {
    setIsVisible(false); // Close popup when clicking CTA
    const section = document.getElementById("demo-contact");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md p-4"
          >
            <div className="relative bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-600 dark:hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>

              {/* Content */}
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
                  <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                </div>

                <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 mb-2">
                  ¿Te gusta {brandName}?
                </h3>
                
                <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                  Esta ingeniería digital de alto rendimiento podría ser tuya hoy mismo. Aumenta tus ventas y mejora tu imagen profesional.
                </p>

                <div className="space-y-3">
                  <Button
                    onClick={handleCTA}
                    className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20"
                  >
                    Quiero esta Web
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  
                  <button
                    onClick={handleClose}
                    className="text-sm text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors"
                  >
                    Solo estoy mirando
                  </button>
                </div>
              </div>
              
              {/* Footer strip */}
              <div className="bg-zinc-50 dark:bg-zinc-800/50 py-3 px-8 text-center text-xs text-zinc-400">
                 Technology by Nitro Inmobiliaria
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
