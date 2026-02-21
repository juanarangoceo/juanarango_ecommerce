import { Step } from '@/lib/guias/guide-content';
import { motion } from 'motion/react';
import { PromptCard } from './PromptCard';
import { ExternalLink, ArrowRight, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

interface ContentAreaProps {
  step: Step;
  onNextStep: () => void;
  isLastStep: boolean;
}

export function ContentArea({ step, onNextStep, isLastStep }: ContentAreaProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleDownloadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setEmail('');
    }, 1500);
  };

  return (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto py-8 px-4 lg:px-12"
    >
      <header className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium mb-4">
          <span className="w-2 h-2 rounded-full bg-[#95BF47]"></span>
          Guía Paso a Paso
        </div>
        <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight mb-3">
          {step.title}
        </h1>
        <p className="text-lg text-slate-500 font-light">
          {step.description}
        </p>
      </header>

      <div className="prose prose-slate prose-lg max-w-none mb-12">
        <div className="bg-white p-6 lg:p-8 rounded-3xl shadow-sm border border-slate-100">
           <ReactMarkdown 
            components={{
              h1: ({node, ...props}) => <h1 className="text-2xl font-bold mt-6 mb-4 text-slate-900" {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-extrabold mt-10 mb-5 text-[#004C3F] border-b border-slate-100 pb-3" {...props} />,
              h3: ({node, ...props}) => <h3 className="text-xl font-bold mt-8 mb-4 text-slate-900 flex items-center gap-2" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-2" {...props} />,
              li: ({node, ...props}) => <li className="text-slate-600" {...props} />,
              p: ({node, ...props}) => <p className="mb-4 text-slate-600 leading-relaxed" {...props} />,
              strong: ({node, ...props}) => <strong className="font-semibold text-slate-900" {...props} />,
              code: ({node, ...props}) => <code className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-sm font-mono border border-slate-200" {...props} />,
              a: ({node, href, children, ...props}) => {
                const isAffiliate = href?.includes('shopify.pxf.io');
                return (
                  <a 
                    href={href} 
                    target={isAffiliate ? "_blank" : undefined}
                    rel={isAffiliate ? "noopener noreferrer" : undefined}
                    className={isAffiliate 
                      ? "inline-flex items-center gap-1 font-bold text-[#3d631f] bg-[#95BF47]/10 hover:bg-[#95BF47]/20 px-2 py-0.5 rounded-md transition-colors border border-[#95BF47]/30 shadow-sm" 
                      : "text-indigo-600 hover:text-indigo-800 underline decoration-indigo-200 underline-offset-4 transition-colors"} 
                    {...props}
                  >
                    {children}
                    {isAffiliate && <ExternalLink size={14} className="ml-0.5" />}
                  </a>
                );
              },
            }}
           >
             {step.content}
           </ReactMarkdown>
        </div>
      </div>

      {step.prompts.length > 0 && (
        <section className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative shrink-0">
                <img 
                  src="https://res.cloudinary.com/dohwyszdj/image/upload/v1771691233/Sidekick_LogoIcon_qyr6zj.avif" 
                  alt="Shopify Sidekick" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Sidekick AI Prompts</h2>
              <span className="px-2 py-0.5 rounded bg-indigo-100 text-indigo-700 text-xs font-bold hidden sm:inline-flex">POWER UP</span>
            </div>
            <p className="text-sm text-slate-500 font-medium hidden md:block">Acelera tu configuración con IA</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {step.prompts.map((prompt, idx) => (
              <PromptCard key={idx} prompt={prompt} index={idx} />
            ))}
          </div>
        </section>
      )}

      {step.affiliateLink && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full mb-12 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 group"
        >
          <a href={step.affiliateLink} target="_blank" rel="noopener noreferrer" className="block relative">
            <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-10"></div>
            {/* Desktop Banner */}
            <img 
              src="https://res.cloudinary.com/dohwyszdj/image/upload/v1771690286/Affiliate_3mPTL_Banners_-_2138_-_Standard_-_Evergreen_-_US_-_English_-_Daydream_to_Dream_Job_-_Static_-_1200x628_zwq04l.png" 
              alt="Empieza en Shopify con una prueba gratis" 
              className="w-full h-auto hidden sm:block object-cover"
            />
            {/* Mobile Banner */}
            <img 
              src="https://res.cloudinary.com/dohwyszdj/image/upload/v1771690286/Affiliate_3mPTL_Banners_-_2138_-_Standard_-_Evergreen_-_US_-_English_-_Daydream_to_Dream_Job_-_Static_-_320x480_y0xtpx.png" 
              alt="Empieza en Shopify con una prueba gratis" 
              className="w-full h-auto block sm:hidden object-cover"
            />
          </a>
        </motion.div>
      )}

      {/* Navigation and Download Section */}
      <div className="flex flex-col gap-8 border-t border-slate-200 pt-8">
        {!isLastStep ? (
          <button
            onClick={onNextStep}
            className="w-full lg:w-auto self-end flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl"
          >
            Siguiente Lección <ArrowRight size={20} />
          </button>
        ) : (
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="max-w-2xl mx-auto text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/20 mb-4">
                <Download size={24} />
              </div>
              <h3 className="text-2xl font-bold mb-2">¡Descarga 50 Prompts Exclusivos!</h3>
              <p className="text-indigo-100 mb-6">
                Lleva tu tienda al siguiente nivel con nuestra colección curada de prompts avanzados para SEO, Email Marketing y Ads.
              </p>
              
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white/10 rounded-xl p-4 border border-white/20"
                >
                  <p className="font-bold text-lg">¡Gracias! Revisá tu correo.</p>
                  <p className="text-sm text-indigo-100">Te hemos enviado el PDF con los prompts.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleDownloadSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    required
                    placeholder="Tu mejor correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-4 py-3 rounded-xl text-slate-900 placeholder:text-slate-400 border-0 focus:ring-2 focus:ring-white/50 outline-none"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-white text-indigo-600 font-bold px-6 py-3 rounded-xl hover:bg-indigo-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Enviando...' : 'Descargar Gratis'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
