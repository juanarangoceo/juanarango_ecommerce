"use client"

import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { SimpleBookingForm } from "./simple-booking-form"

interface NitroBookingModalProps {
  isOpen: boolean
  onClose: () => void
}

export function NitroBookingModal({ isOpen, onClose }: NitroBookingModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
           onClick={onClose}
        >
           <motion.div
             initial={{ scale: 0.95, opacity: 0 }}
             animate={{ scale: 1, opacity: 1 }}
             exit={{ scale: 0.95, opacity: 0 }}
             onClick={(e) => e.stopPropagation()}
             className="relative w-full max-w-lg bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl"
           >
             <div className="flex items-center justify-between p-4 border-b border-zinc-800">
               <h3 className="text-white font-bold">Agendar con Nitro Ecom</h3>
               <button
                 onClick={onClose}
                 className="p-1 rounded-full hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
               >
                 <X className="w-5 h-5" />
               </button>
             </div>
             
             <div className="p-0 max-h-[80vh] overflow-y-auto">
                <div className="p-6">
                  {/* Replaced generic BookingSection (Cal) with our custom Ecom Form */}
                  <SimpleBookingForm darkMode={true} />
                </div>
             </div>
           </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
