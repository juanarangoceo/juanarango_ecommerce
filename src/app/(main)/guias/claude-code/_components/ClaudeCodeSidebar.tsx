"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Terminal, BookOpen, GitBranch, Settings, Zap, ChevronRight, Menu, X, Lightbulb } from 'lucide-react';

const sections = [
  { id: 'intro', title: 'Introducción', icon: BookOpen },
  { id: 'principiante', title: '1. Nivel Principiante', icon: Terminal },
  { id: 'intermedio', title: '2. Nivel Intermedio', icon: GitBranch },
  { id: 'avanzado', title: '3. Nivel Avanzado', icon: Settings },
  { id: 'experto', title: '4. Nivel Experto', icon: Zap },
];

export function ClaudeCodeSidebar() {
  const [activeSection, setActiveSection] = useState('intro');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const scrollPosition = window.scrollY + 150; // Offset for better triggering

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80, // adjusted for fixed header
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden sticky top-[64px] z-40 bg-[#FAF9F6] border-b border-[#E5E3DB] p-4 flex justify-between items-center shadow-sm w-full">
        <div className="flex items-center gap-2 font-serif font-bold text-xl text-[#D97757]">
          <Image src="https://res.cloudinary.com/dohwyszdj/image/upload/v1773288718/claude-ai-icon_ncevrp.webp" alt="Claude Logo" width={28} height={28} className="rounded-md" referrerPolicy="no-referrer" />
          <span className="text-[#2D2D2D]">Claude Code</span>
        </div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-[#2D2D2D]">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 z-30 bg-[#FAF9F6] pt-28 px-6 overflow-y-auto pb-8"
          >
            <nav className="flex flex-col gap-4">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-[#EFECE5] text-[#D97757] font-medium'
                      : 'text-[#5A5A5A] hover:bg-[#F5F3EE]'
                  }`}
                >
                  <section.icon size={20} />
                  <span className="text-lg">{section.title}</span>
                </button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar (Floating Menu) */}
      <aside className="hidden md:flex flex-col w-[320px] sticky top-[64px] h-[calc(100vh-64px)] bg-[#F3F1EC] border-r border-[#E5E3DB] py-8 px-6 overflow-y-auto shrink-0 z-10">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="bg-white p-2 text-[#D97757] rounded-xl shadow-sm border border-[#E5E3DB]">
            <Image src="https://res.cloudinary.com/dohwyszdj/image/upload/v1773288718/claude-ai-icon_ncevrp.webp" alt="Claude Logo" width={32} height={32} className="rounded-md" referrerPolicy="no-referrer" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-2xl text-[#2D2D2D] leading-tight">Claude Code</h1>
            <p className="text-xs text-[#8A8A8A] font-medium tracking-widest uppercase mt-1">Guía Definitiva</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2 flex-1 relative z-20">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200 group ${
                activeSection === section.id
                  ? 'bg-white shadow-sm text-[#D97757] font-medium border border-[#E5E3DB]'
                  : 'text-[#5A5A5A] hover:bg-[#EAE7DF] hover:text-[#2D2D2D] border border-transparent'
              }`}
            >
              <section.icon size={18} className={activeSection === section.id ? 'text-[#D97757]' : 'text-[#8A8A8A] group-hover:text-[#2D2D2D] transition-colors'} />
              <span className="text-sm">{section.title}</span>
              {activeSection === section.id && (
                <ChevronRight size={16} className="ml-auto opacity-50" />
              )}
            </button>
          ))}
        </nav>

        <div className="mt-8 pt-6 px-2">
          <div className="bg-[#EAE7DF] p-5 rounded-xl border border-[#E5E3DB]">
            <div className="flex items-center gap-2 mb-2 text-[#D97757]">
              <Lightbulb size={16} />
              <span className="text-xs font-bold uppercase tracking-wider">Tip de Experto</span>
            </div>
            <p className="text-xs text-[#5A5A5A] leading-relaxed">
              Mantén esta guía abierta mientras programas. Los comandos y atajos te ahorrarán horas de desarrollo.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
