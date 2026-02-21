'use client';

import { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { ContentArea } from '@/components/ContentArea';
import { guideSteps } from '@/lib/guide-content';
import { Menu } from 'lucide-react';
import { motion } from 'motion/react';

export default function Page() {
  const [activeStepId, setActiveStepId] = useState(guideSteps[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Calculate progress
  const activeIndex = guideSteps.findIndex(s => s.id === activeStepId);
  const progress = ((activeIndex + 1) / guideSteps.length) * 100;

  const activeStep = guideSteps[activeIndex];
  const isLastStep = activeIndex === guideSteps.length - 1;

  const handleNextStep = () => {
    if (!isLastStep) {
      setActiveStepId(guideSteps[activeIndex + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <Sidebar 
        steps={guideSteps} 
        activeStepId={activeStepId} 
        onSelectStep={setActiveStepId}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Wrapper */}
      <main className="flex-1 lg:ml-72 min-h-screen flex flex-col">
        {/* Progress Bar (Sticky) */}
        <div className="sticky top-0 z-20 bg-slate-50/80 backdrop-blur-md border-b border-slate-200">
          <div className="h-1 bg-slate-200 w-full">
            <motion.div 
              className="h-full bg-[#95BF47]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
          
          {/* Mobile Header inside sticky area */}
          <div className="lg:hidden p-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#95BF47] rounded-lg flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="font-bold text-slate-900">Shopify Guide</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <ContentArea 
            step={activeStep} 
            onNextStep={handleNextStep}
            isLastStep={isLastStep}
          />
        </div>

        {/* Footer */}
        <footer className="py-8 text-center text-slate-400 text-sm border-t border-slate-200 mt-auto">
          <p>© {new Date().getFullYear()} Shopify Launchpad Guide. No afiliado oficialmente con Shopify Inc.</p>
        </footer>
      </main>
    </div>
  );
}
