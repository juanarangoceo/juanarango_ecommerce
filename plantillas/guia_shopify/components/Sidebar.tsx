import { LucideIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { Step } from '@/lib/guide-content';

interface SidebarProps {
  steps: Step[];
  activeStepId: string;
  onSelectStep: (id: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function Sidebar({ steps, activeStepId, onSelectStep, isOpen, setIsOpen }: SidebarProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-slate-200 shadow-xl lg:shadow-none lg:translate-x-0 transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#95BF47] rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">Shopify Guide</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-500">
            ✕
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-80px)]">
          {steps.map((step, index) => {
            const isActive = step.id === activeStepId;
            return (
              <button
                key={step.id}
                onClick={() => {
                  onSelectStep(step.id);
                  setIsOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-3 rounded-xl transition-all duration-200 group relative
                  ${isActive 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }
                `}
              >
                <div className="flex items-start gap-3">
                  <span className={`
                    text-xs font-mono mt-0.5 opacity-60
                    ${isActive ? 'text-slate-400' : 'text-slate-400'}
                  `}>
                    {(index).toString().padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-medium text-sm leading-tight">{step.title}</p>
                    <p className={`text-xs mt-1 line-clamp-1 ${isActive ? 'text-slate-400' : 'text-slate-400'}`}>
                      {step.description}
                    </p>
                  </div>
                </div>
                
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#95BF47] rounded-r-full"
                  />
                )}
              </button>
            );
          })}
          
          <div className="mt-8 p-4 bg-gradient-to-br from-[#95BF47]/10 to-emerald-50 rounded-2xl border border-[#95BF47]/20">
            <p className="text-xs font-semibold text-[#5E8E3E] uppercase tracking-wider mb-2">Afiliado</p>
            <p className="text-sm text-slate-700 mb-3">¿Listo para empezar? Crea tu cuenta ahora.</p>
            <a 
              href="https://www.shopify.com/free-trial" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block w-full text-center py-2 bg-[#95BF47] hover:bg-[#82A838] text-white text-sm font-bold rounded-lg transition-colors"
            >
              Prueba Gratis
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
}
