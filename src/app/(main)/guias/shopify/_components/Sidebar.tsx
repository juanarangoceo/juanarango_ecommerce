import { ExternalLink } from 'lucide-react';
import { Step } from '@/lib/guias/guide-content';

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
          fixed lg:sticky lg:top-24 top-0 left-0 z-40 h-screen lg:h-[calc(100vh-6rem)] w-72 bg-white border-r border-slate-200 shadow-xl lg:shadow-none transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header - Visible on both desktop & mobile */}
        <div className="p-6 pb-2 border-b border-slate-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
              <img 
                src="https://res.cloudinary.com/dohwyszdj/image/upload/f_auto,q_auto,w_64,h_64,c_fill/v1771690286/shopify_logo_hmwdrn.webp" 
                alt="Shopify Logo" 
                width={32}
                height={32}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900">Guía Shopify</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-slate-500 lg:hidden">
            ✕
          </button>
        </div>

        <nav className="p-4 space-y-1 overflow-y-auto h-full pb-24">
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
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#95BF47] rounded-r-full transition-all duration-300"
                  />
                )}
              </button>
            );
          })}
          
          <div className="mt-8 p-4 bg-gradient-to-br from-[#95BF47]/10 to-[#95BF47]/20 rounded-2xl border border-[#95BF47]/30 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-2 -mr-2 w-16 h-16 bg-[#95BF47]/10 rounded-full blur-xl"></div>
            <p className="text-xs font-bold text-[#5E8E3E] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#95BF47] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#95BF47]"></span>
              </span>
              Promo Especial
            </p>
            <p className="text-[15px] font-extrabold text-slate-800 mb-1 leading-tight tracking-tight">Primer mes por $1 USD</p>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed font-medium">Lanza tu tienda hoy con la mejor oferta de Shopify.</p>
            <a 
              href="https://shopify.pxf.io/aNREdo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="relative block w-full text-center py-2.5 bg-[#95BF47] hover:bg-[#82A838] shadow-md hover:shadow-lg hover:-translate-y-0.5 text-white text-sm font-bold rounded-xl transition-all duration-300 overflow-hidden group"
            >
              <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black"></span>
              <span className="relative z-10 flex items-center justify-center gap-2">
                Reclamar Oferta <ExternalLink size={14} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
          </div>
        </nav>
      </aside>
    </>
  );
}
