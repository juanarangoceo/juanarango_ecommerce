import { Copy } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'motion/react';
import { Prompt } from '@/lib/guias/guide-content';

interface PromptCardProps {
  prompt: Prompt;
  index: number;
}

export function PromptCard({ prompt, index }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group relative bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-300"
    >
      <div className="absolute top-4 right-4">
        <button
          onClick={handleCopy}
          className="p-2 text-slate-400 hover:text-[#95BF47] hover:bg-slate-50 rounded-lg transition-colors"
          title="Copiar prompt"
        >
          {copied ? (
            <span className="text-xs font-bold text-[#95BF47]">¡Copiado!</span>
          ) : (
            <Copy size={16} />
          )}
        </button>
      </div>
      
      <div className="flex items-start gap-3 mb-3">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-[10px] text-white font-bold">AI</span>
        </div>
        <div className="pr-8">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Sidekick Prompt</span>
          <h3 className="text-sm font-bold text-slate-900 leading-tight">{prompt.title}</h3>
        </div>
      </div>
      
      <p className="text-slate-700 text-sm leading-relaxed font-mono bg-slate-50 p-3 rounded-lg border border-slate-100">
        {prompt.content}
      </p>
    </motion.div>
  );
}
