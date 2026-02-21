'use client';

import { useState } from 'react';
import { Sidebar } from './Sidebar';
import dynamic from 'next/dynamic';
import { guideSteps } from '@/lib/guias/guide-content';

const DynamicContentArea = dynamic(
  () => import('./ContentArea').then((mod) => mod.ContentArea),
  { ssr: false }
);
import { Menu } from 'lucide-react';
import { motion } from 'motion/react';

export default function GuideInteractiveViewer() {
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
    <div className="flex bg-slate-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar 
        steps={guideSteps} 
        activeStepId={activeStepId} 
        onSelectStep={setActiveStepId}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Progress Bar (Sticky) */}
        <div className="sticky top-[72px] lg:top-24 z-20 bg-slate-50/80 backdrop-blur-md border-b border-slate-200">
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
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 relative shrink-0">
                <img 
                  src="https://res.cloudinary.com/dohwyszdj/image/upload/f_auto,q_auto,w_64,h_64,c_fill/v1771690286/shopify_logo_hmwdrn.webp" 
                  alt="Shopify Logo" 
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="font-bold text-slate-900">Guía Shopify</span>
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
          <DynamicContentArea 
            step={activeStep} 
            onNextStep={handleNextStep}
            isLastStep={isLastStep}
          />
        </div>
      </div>
    </div>
  );
}
