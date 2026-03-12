"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';
import { Terminal, BookOpen, GitBranch, Settings, Zap, ChevronRight, Menu, X, Code2, Cpu, ShieldCheck, CheckCircle2, TerminalSquare, AlertCircle, Lightbulb } from 'lucide-react';

const sections = [
  { id: 'intro', title: 'Introducción', icon: BookOpen },
  { id: 'principiante', title: '1. Nivel Principiante', icon: Terminal },
  { id: 'intermedio', title: '2. Nivel Intermedio', icon: GitBranch },
  { id: 'avanzado', title: '3. Nivel Avanzado', icon: Settings },
  { id: 'experto', title: '4. Nivel Experto', icon: Zap },
];

export default function ClaudeCodeGuide() {
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 40,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FAF9F6]">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-50 bg-[#FAF9F6] border-b border-[#E5E3DB] p-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-2 font-serif font-bold text-xl text-[#D97757]">
          <Image src="https://res.cloudinary.com/dohwyszdj/image/upload/v1773288718/claude-ai-icon_ncevrp.webp" alt="Claude Logo" width={28} height={28} className="rounded-md" referrerPolicy="no-referrer" />
          <span>Claude Code</span>
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
            className="md:hidden fixed inset-0 z-40 bg-[#FAF9F6] pt-20 px-6 overflow-y-auto pb-8"
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
      <aside className="hidden md:flex flex-col w-80 fixed h-screen bg-[#F3F1EC] border-r border-[#E5E3DB] py-8 px-6 overflow-y-auto">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="bg-white p-2 rounded-xl shadow-sm border border-[#E5E3DB]">
            <Image src="https://res.cloudinary.com/dohwyszdj/image/upload/v1773288718/claude-ai-icon_ncevrp.webp" alt="Claude Logo" width={32} height={32} className="rounded-md" referrerPolicy="no-referrer" />
          </div>
          <div>
            <h1 className="font-serif font-bold text-2xl text-[#2D2D2D] leading-tight">Claude Code</h1>
            <p className="text-xs text-[#8A8A8A] font-medium tracking-widest uppercase mt-1">Guía Definitiva</p>
          </div>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
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

        <div className="mt-auto pt-8 px-2">
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

      {/* Main Content */}
      <main className="flex-1 md:ml-80 p-6 md:p-12 lg:p-20 flex justify-center">
        <div className="max-w-4xl w-full space-y-32">
          
          {/* Intro */}
          <section id="intro" className="scroll-mt-20 pt-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FDF8F5] text-[#D97757] text-xs font-bold uppercase tracking-widest mb-6 border border-[#F5E6DF]">
                <BookOpen size={14} /> Edición 2026
              </div>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-[#2D2D2D] mb-8 leading-[1.1] tracking-tight">
                Domina <span className="text-[#D97757] italic">Claude Code</span>
              </h1>
              <p className="text-xl md:text-2xl text-[#5A5A5A] leading-relaxed mb-10 max-w-3xl font-light">
                La guía más completa de 0 a experto para integrar el agente de codificación de Anthropic directamente en tu terminal. Transforma tu flujo de trabajo con lenguaje natural y contexto profundo.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white border border-[#E5E3DB] px-5 py-2.5 rounded-full text-sm font-medium text-[#5A5A5A] shadow-sm">
                  <Terminal size={16} className="text-[#D97757]" /> CLI Nativo
                </div>
                <div className="flex items-center gap-2 bg-white border border-[#E5E3DB] px-5 py-2.5 rounded-full text-sm font-medium text-[#5A5A5A] shadow-sm">
                  <Cpu size={16} className="text-[#D97757]" /> Agentic AI
                </div>
                <div className="flex items-center gap-2 bg-white border border-[#E5E3DB] px-5 py-2.5 rounded-full text-sm font-medium text-[#5A5A5A] shadow-sm">
                  <GitBranch size={16} className="text-[#D97757]" /> Git Integration
                </div>
              </div>
            </motion.div>
          </section>

          {/* Section 1 */}
          <section id="principiante" className="scroll-mt-20">
            <SectionHeader title="1. Nivel Principiante" subtitle="Instalación y Primeros Pasos" />
            
            <div className="text-[#2D2D2D] space-y-8">
              <p className="text-lg leading-relaxed text-[#5A5A5A]">
                Claude Code es una herramienta de línea de comandos (CLI) que lleva la potencia de los modelos de Anthropic directamente a tu terminal. No es solo un autocompletado; es un agente que puede leer archivos, ejecutar comandos y escribir código por ti.
              </p>

              <div>
                <h3 className="font-serif text-2xl font-bold mt-12 mb-6 text-[#2D2D2D]">Requisitos del Sistema</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-[#E5E3DB] shadow-sm">
                    <div className="bg-[#FDF8F5] p-2 rounded-lg shrink-0">
                      <Cpu className="text-[#D97757]" size={24} />
                    </div>
                    <div>
                      <strong className="block text-[#2D2D2D] mb-1">Sistemas Operativos</strong>
                      <span className="text-sm text-[#5A5A5A] leading-relaxed block">macOS 13.0+, Windows 10 1809+ (vía WSL o Git Bash), Ubuntu 20.04+ o Debian 10+</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 bg-white p-6 rounded-2xl border border-[#E5E3DB] shadow-sm">
                    <div className="bg-[#FDF8F5] p-2 rounded-lg shrink-0">
                      <Settings className="text-[#D97757]" size={24} />
                    </div>
                    <div>
                      <strong className="block text-[#2D2D2D] mb-1">Hardware y Red</strong>
                      <span className="text-sm text-[#5A5A5A] leading-relaxed block">Al menos 4 GB de RAM disponible y conexión a internet estable.</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold mt-12 mb-6 text-[#2D2D2D]">Instalación</h3>
                <p className="text-[#5A5A5A] mb-6">Se recomienda encarecidamente utilizar el instalador nativo por su velocidad de ejecución y su capacidad de recibir actualizaciones automáticas (OTA).</p>
                
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl border border-[#E5E3DB] overflow-hidden">
                    <div className="bg-[#F3F1EC] px-6 py-3 border-b border-[#E5E3DB] flex items-center gap-2">
                      <Terminal size={16} className="text-[#5A5A5A]" />
                      <span className="font-bold text-sm text-[#2D2D2D]">macOS / Linux / WSL</span>
                    </div>
                    <div className="p-6">
                      <CodeBlock code="curl -fsSL https://claude.ai/install.sh | bash" language="bash" />
                      <p className="text-sm text-[#5A5A5A] mt-4">Este script descargará el binario adecuado para tu arquitectura (x86_64 o ARM64) y lo colocará en tu PATH.</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl border border-[#E5E3DB] overflow-hidden">
                    <div className="bg-[#F3F1EC] px-6 py-3 border-b border-[#E5E3DB] flex items-center gap-2">
                      <Terminal size={16} className="text-[#5A5A5A]" />
                      <span className="font-bold text-sm text-[#2D2D2D]">Windows (Requiere Git for Windows)</span>
                    </div>
                    <div className="p-6">
                      <CodeBlock code="irm https://claude.ai/install.ps1 | iex" language="powershell" />
                      <p className="text-sm text-[#5A5A5A] mt-4">Asegúrate de ejecutar PowerShell como administrador si encuentras problemas de permisos.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold mt-12 mb-6 text-[#2D2D2D]">Autenticación</h3>
                <div className="bg-[#FDF8F5] border border-[#F5E6DF] p-6 rounded-2xl flex gap-4 items-start">
                  <AlertCircle className="text-[#D97757] shrink-0 mt-1" size={24} />
                  <div>
                    <p className="m-0 text-[#2D2D2D] leading-relaxed">
                      Una vez instalado, ejecuta el comando <code>claude</code>. Esto abrirá tu navegador predeterminado para iniciar sesión. 
                      <br/><br/>
                      <strong>Nota importante:</strong> El uso de Claude Code requiere una cuenta de Claude Pro, Max, Teams, Enterprise o tener créditos disponibles en la Console de Anthropic para el uso de la API.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold mt-12 mb-6 text-[#2D2D2D]">Comandos Esenciales</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <CommandCard cmd="claude" desc="Inicia una sesión interactiva en el directorio actual. El agente leerá la estructura de archivos automáticamente." />
                  <CommandCard cmd='claude &quot;tarea&quot;' desc="Ejecuta una tarea específica directamente (one-shot) y luego abre la sesión interactiva. Ejemplo: claude &quot;explica este error&quot;" />
                  <CommandCard cmd="/help" desc="Muestra todos los comandos de barra (slash commands) y atajos de teclado disponibles." />
                  <CommandCard cmd="/exit" desc="Finaliza la sesión actual de forma segura. También puedes usar el atajo Ctrl+D." />
                  <CommandCard cmd="/bug" desc="Reporta un problema directamente al equipo de Anthropic incluyendo el contexto de la sesión." />
                  <CommandCard cmd="/login" desc="Fuerza un nuevo inicio de sesión o cambia de cuenta." />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section id="intermedio" className="scroll-mt-20">
            <SectionHeader title="2. Nivel Intermedio" subtitle="Flujos de Trabajo y Comandos de Control" />
            
            <div className="text-[#2D2D2D] space-y-8">
              <p className="text-lg leading-relaxed text-[#5A5A5A]">
                Una vez dominas lo básico, Claude Code se convierte en tu compañero de pair programming. Puede entender bases de código complejas, buscar errores, explicar lógica y refactorizar archivos enteros mediante lenguaje natural.
              </p>

              <div className="bg-white border border-[#E5E3DB] p-8 rounded-2xl shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FDF8F5] rounded-bl-full -z-10"></div>
                <h4 className="font-serif text-2xl font-bold text-[#2D2D2D] mb-4 flex items-center gap-3">
                  <Zap className="text-[#D97757]" size={24} /> Gestión de Sesiones y Contexto
                </h4>
                <p className="text-[#5A5A5A] leading-relaxed mb-6">
                  El contexto es oro, pero también cuesta tokens. Si la conversación se alarga, Claude puede consumir mucha memoria y volverse más lento. Tienes dos herramientas vitales:
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <code className="bg-[#F3F1EC] text-[#D97757] px-3 py-1.5 rounded-lg font-mono font-bold text-sm shrink-0">/clear</code>
                    <p className="text-sm text-[#5A5A5A] m-0 pt-1">Reinicia la conversación por completo, liberando todos los tokens de contexto. Ideal cuando cambias de tarea radicalmente.</p>
                  </div>
                  <div className="flex items-start gap-4">
                    <code className="bg-[#F3F1EC] text-[#D97757] px-3 py-1.5 rounded-lg font-mono font-bold text-sm shrink-0">/compact</code>
                    <p className="text-sm text-[#5A5A5A] m-0 pt-1">Le pide a Claude que resuma el historial reciente. Mantiene el contexto vital del problema actual, pero reduce drásticamente el costo y mejora la velocidad de respuesta.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold mt-12 mb-6 text-[#2D2D2D]">Integración con Git</h3>
                <p className="text-[#5A5A5A] mb-6">Claude Code tiene conciencia profunda de tu control de versiones. No necesitas salir de la herramienta para gestionar tu código.</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-[#E5E3DB]">
                    <h4 className="font-bold text-[#2D2D2D] mb-3 flex items-center gap-2">
                      <GitBranch size={18} className="text-[#D97757]" /> Commits Automáticos
                    </h4>
                    <p className="text-sm text-[#5A5A5A] mb-4">Ejecuta el siguiente comando y Claude analizará tus cambios (diff) para generar un mensaje de commit semántico y descriptivo.</p>
                    <CodeBlock code="claude commit" language="bash" />
                    <p className="text-xs text-[#8A8A8A] mt-3 italic">Ejemplo de output: &quot;feat(auth): add JWT validation middleware&quot;</p>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-[#E5E3DB]">
                    <h4 className="font-bold text-[#2D2D2D] mb-3 flex items-center gap-2">
                      <GitBranch size={18} className="text-[#D97757]" /> Ramas y PRs
                    </h4>
                    <p className="text-sm text-[#5A5A5A] mb-4">Puedes pedirle en lenguaje natural: <em>&quot;Crea una nueva rama para esta feature, haz commit de los cambios y prepara un Pull Request explicando la arquitectura.&quot;</em></p>
                    <CodeBlock code="claude &quot;crea un PR para los cambios actuales&quot;" language="bash" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold mt-12 mb-6 text-[#2D2D2D]">Modo de Plano (Plan Mode)</h3>
                <p className="text-[#5A5A5A] mb-6">
                  Para refactorizaciones grandes o arquitecturas complejas, es arriesgado dejar que la IA edite directamente. Activa el modo de plano para que Claude actúe como un arquitecto de software:
                </p>
                <CodeBlock code="claude --permission-mode plan" language="bash" />
                <p className="text-sm text-[#5A5A5A] mt-4 mb-4">En este modo, Claude leerá los archivos, analizará el problema y te presentará un plan detallado paso a paso. Solo cuando apruebes el plan, procederá a escribir el código.</p>
                <div className="bg-[#F3F1EC] p-4 rounded-xl mt-4 flex gap-3 items-start">
                  <Lightbulb className="text-[#D97757] shrink-0 mt-0.5" size={18} />
                  <p className="text-sm text-[#5A5A5A] m-0">
                    <strong>Tip de productividad:</strong> Dentro de una sesión interactiva normal, presiona <code>Shift+Tab</code> para alternar rápidamente a este modo. Claude analizará y propondrá la solución paso a paso sin tocar un solo archivo.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold mt-12 mb-6 text-[#2D2D2D]">Control de Permisos</h3>
                <p className="text-[#5A5A5A] mb-6">
                  Por seguridad, Claude solicita aprobación (Y/n) antes de editar archivos o ejecutar comandos de terminal. 
                  Si confías plenamente en una tarea repetitiva o estás en un entorno seguro, puedes gestionar esto con <code>/permissions</code> o iniciar la sesión permitiendo ediciones automáticas:
                </p>
                <CodeBlock code="claude --accept-edits" language="bash" />
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section id="avanzado" className="scroll-mt-20">
            <SectionHeader title="3. Nivel Avanzado" subtitle="Memoria, MCP y Personalización" />
            
            <div className="text-[#2D2D2D] space-y-8">
              <p className="text-lg leading-relaxed text-[#5A5A5A]">
                El verdadero poder de Claude Code se desbloquea cuando lo personalizas para tu proyecto específico. Los expertos utilizan sistemas de memoria para que Claude siga los estándares del equipo de forma persistente.
              </p>

              <div>
                <h3 className="font-serif text-2xl font-bold mt-12 mb-6 text-[#2D2D2D]">El Archivo CLAUDE.md</h3>
                <p className="text-[#5A5A5A] mb-6">
                  Coloca un archivo <code>CLAUDE.md</code> en la raíz de tu proyecto. Claude lee este archivo automáticamente al inicio de cada sesión. Es el lugar perfecto para definir el &quot;alma&quot; técnica de tu proyecto.
                </p>
                
                <div className="bg-[#1E1E1E] rounded-xl overflow-hidden shadow-inner mb-6">
                  <div className="flex items-center justify-between px-4 py-2.5 bg-[#2D2D2D] border-b border-[#3D3D3D]">
                    <span className="text-xs text-gray-400 font-mono">Ejemplo de CLAUDE.md</span>
                  </div>
                  <div className="p-5 overflow-x-auto">
                    <code className="font-mono text-sm text-gray-200 whitespace-pre">
{`# Guía de Desarrollo
- Usa TypeScript estricto. No uses 'any'.
- Componentes de React: Functional components con hooks.
- Estilos: Tailwind CSS exclusivamente.
- Testing: Ejecuta 'npm run test' antes de confirmar cambios.
- Convención de commits: Conventional Commits (feat, fix, docs).`}
                    </code>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white p-5 rounded-xl border border-[#E5E3DB] flex gap-3">
                    <span className="text-2xl">🎨</span>
                    <div>
                      <strong className="block text-sm mb-1">Guías de estilo</strong>
                      <span className="text-xs text-[#5A5A5A]">&quot;Usa Tailwind, no CSS modules. Prefiere functional components.&quot;</span>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-[#E5E3DB] flex gap-3">
                    <span className="text-2xl">🧪</span>
                    <div>
                      <strong className="block text-sm mb-1">Comandos de prueba</strong>
                      <span className="text-xs text-[#5A5A5A]">&quot;Para testear usa npm run test:watch. No uses Jest directamente.&quot;</span>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-[#E5E3DB] flex gap-3">
                    <span className="text-2xl">🏗️</span>
                    <div>
                      <strong className="block text-sm mb-1">Reglas de arquitectura</strong>
                      <span className="text-xs text-[#5A5A5A]">&quot;Toda la lógica de negocio debe ir en la carpeta /lib/services.&quot;</span>
                    </div>
                  </div>
                  <div className="bg-white p-5 rounded-xl border border-[#E5E3DB] flex gap-3">
                    <span className="text-2xl">🚀</span>
                    <div>
                      <strong className="block text-sm mb-1">Pasos de despliegue</strong>
                      <span className="text-xs text-[#5A5A5A]">&quot;Antes de hacer commit, asegúrate de correr npm run build.&quot;</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold mt-12 mb-6 text-[#2D2D2D]">Model Context Protocol (MCP)</h3>
                <p className="text-[#5A5A5A] mb-6">
                  MCP es un estándar abierto revolucionario que permite conectar a Claude con herramientas y fuentes de datos externas. Convierte a Claude de un simple editor de código a un asistente integral de ingeniería.
                </p>
                
                <div className="bg-[#1E1E1E] rounded-2xl p-6 shadow-xl">
                  <div className="flex items-center gap-2 mb-6 border-b border-[#3D3D3D] pb-4">
                    <Terminal size={18} className="text-[#D97757]" />
                    <span className="text-white font-mono text-sm uppercase tracking-wider">Ejemplos de Integración MCP</span>
                  </div>
                  <div className="space-y-6 font-mono text-sm">
                    <div>
                      <span className="text-gray-500 block mb-1"># Conectar a una base de datos PostgreSQL local para que Claude pueda consultar esquemas</span>
                      <span className="text-[#27C93F]">claude mcp add</span> <span className="text-white">postgresql</span> <span className="text-[#FFBD2E]">&quot;postgres://user:pass@localhost/db&quot;</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1"># Añadir integración con GitHub para leer issues y PRs directamente</span>
                      <span className="text-[#27C93F]">claude mcp add</span> <span className="text-white">github</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block mb-1"># Conectar con Jira para actualizar tickets</span>
                      <span className="text-[#27C93F]">claude mcp add</span> <span className="text-white">jira</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold mt-12 mb-6 text-[#2D2D2D]">Subagentes y Hooks</h3>
                
                <div className="space-y-6">
                  <div className="bg-white p-6 rounded-2xl border border-[#E5E3DB]">
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <Cpu size={20} className="text-[#D97757]" /> Subagentes Personalizados
                    </h4>
                    <p className="text-[#5A5A5A] text-sm leading-relaxed">
                      Crea &quot;especialistas&quot; definiendo archivos Markdown con frontmatter YAML. Esto permite aislar operaciones de alto volumen (como un escaneo profundo de seguridad o una revisión de accesibilidad) para no saturar el contexto de tu sesión principal. Puedes invocar a estos subagentes para tareas específicas.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-[#E5E3DB]">
                    <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
                      <Code2 size={20} className="text-[#D97757]" /> Hooks de Ejecución
                    </h4>
                    <p className="text-[#5A5A5A] text-sm leading-relaxed">
                      Configura comandos que se ejecuten automáticamente antes o después de usar una herramienta. Por ejemplo, puedes configurar un hook para que Claude ejecute automáticamente <code>npm run lint --fix</code> o formatee con Prettier cada vez que termine de editar un archivo, asegurando que el código generado siempre cumpla tus estándares.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4 */}
          <section id="experto" className="scroll-mt-20">
            <SectionHeader title="4. Nivel Experto" subtitle="Orquestación, Plugins y Optimización" />
            
            <div className="text-[#2D2D2D] space-y-8">
              <p className="text-lg leading-relaxed text-[#5A5A5A]">
                En el nivel más alto, Claude Code deja de ser una herramienta interactiva y se convierte en un ciudadano de primera clase en tu infraestructura de desarrollo automatizada.
              </p>

              <div>
                <h3 className="font-serif text-2xl font-bold mt-12 mb-6 text-[#2D2D2D] flex items-center gap-3">
                  Agent Teams <span className="bg-[#FDF8F5] text-[#D97757] text-xs px-2 py-1 rounded font-sans uppercase tracking-wider border border-[#F5E6DF]">Experimental</span>
                </h3>
                <p className="text-[#5A5A5A] mb-6">
                  El futuro del desarrollo asistido. Agent Teams permite coordinar múltiples instancias de Claude trabajando simultáneamente en un proyecto complejo.
                </p>
                <div className="bg-white border border-[#E5E3DB] p-6 rounded-2xl shadow-sm flex flex-col md:flex-row gap-6 items-center">
                  <div className="flex-1">
                    <strong className="block text-[#2D2D2D] mb-2 text-lg">El Team Lead</strong>
                    <p className="text-sm text-[#5A5A5A] leading-relaxed">Analiza el requerimiento de alto nivel, diseña la arquitectura, divide el trabajo en una lista de tareas compartida y supervisa el progreso general.</p>
                  </div>
                  <div className="hidden md:block w-px h-20 bg-[#E5E3DB]"></div>
                  <div className="flex-1">
                    <strong className="block text-[#2D2D2D] mb-2 text-lg">Los Teammates</strong>
                    <p className="text-sm text-[#5A5A5A] leading-relaxed">Instancias paralelas a las que se les asignan tareas específicas (ej. &quot;Crea el componente UI&quot;, &quot;Escribe los tests&quot;, &quot;Configura la API&quot;). Ejecutan en paralelo y reportan al Lead.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold mt-12 mb-6 text-[#2D2D2D]">Plugins y Marketplaces</h3>
                <p className="text-[#5A5A5A] mb-6">
                  Expande las capacidades cognitivas de Claude instalando extensiones. Por ejemplo, añadir inteligencia de lenguaje (LSP) permite a Claude detectar errores de tipos en tiempo real y navegar por el código con la misma precisión que tu IDE.
                </p>
                <CodeBlock code="claude /plugin install typescript-lsp" language="bash" />
                <p className="text-sm mt-3 text-[#5A5A5A]">Usa <code>/plugin</code> para descubrir el marketplace oficial y explorar nuevas integraciones.</p>
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold mt-12 mb-6 text-[#2D2D2D]">Integración CI/CD</h3>
                <p className="text-[#5A5A5A] mb-6">
                  Lleva a Claude a tus pipelines. Puedes configurar Claude en GitHub Actions o GitLab CI/CD (usando un token de API headless) para:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#D97757] shrink-0 mt-1" size={18} />
                    <span className="text-[#5A5A5A]">Automatizar revisiones de código (Code Reviews) exhaustivas en cada PR, detectando bugs lógicos que los linters no ven.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#D97757] shrink-0 mt-1" size={18} />
                    <span className="text-[#5A5A5A]">Generar automáticamente Merge Requests con código funcional basados únicamente en la descripción de un Issue.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="text-[#D97757] shrink-0 mt-1" size={18} />
                    <span className="text-[#5A5A5A]">Escribir tests unitarios faltantes antes de permitir un merge a la rama principal.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-16 bg-[#2D2D2D] text-white p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl">
                <div className="absolute -top-10 -right-10 p-4 opacity-5">
                  <ShieldCheck size={250} />
                </div>
                <h3 className="font-serif text-3xl mt-0 mb-8 text-[#D97757] relative z-10">Optimización de Costos y Consejos Pro</h3>
                
                <div className="space-y-8 relative z-10">
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      <Zap size={20} className="text-[#D97757]" /> Aprovecha el Prompt Caching
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Mantén tus sesiones activas. Las lecturas de caché en los modelos de Anthropic son significativamente más baratas (hasta un 90% menos) y rápidas que procesar tokens nuevos cada vez. No cierres la sesión si vas a seguir trabajando en el mismo contexto.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                      <TerminalSquare size={20} className="text-[#D97757]" /> Monitoreo en Tiempo Real
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      Usa el comando <code>/cost</code> frecuentemente para auditar el gasto de tu sesión actual. Te ayudará a entender qué operaciones consumen más tokens y a optimizar tus peticiones.
                    </p>
                  </div>

                  <div className="bg-[#1E1E1E] p-6 rounded-2xl border border-[#3D3D3D]">
                    <h4 className="text-lg font-bold text-[#D97757] mb-2 flex items-center gap-2">
                      <BookOpen size={20} /> La Regla de Oro del CLAUDE.md
                    </h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                      Mantén tus archivos <code>CLAUDE.md</code> por debajo de las 200 líneas. Un archivo conciso maximiza la adherencia del modelo a tus reglas (evita la pérdida de atención en el medio del contexto) y ahorra miles de tokens en cada interacción, ya que este archivo se inyecta en cada prompt.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Footer */}
          <footer className="pt-16 pb-12 border-t border-[#E5E3DB] mt-32 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FDF8F5] text-[#D97757] mb-6">
              <TerminalSquare size={24} />
            </div>
            <p className="font-serif italic text-2xl text-[#2D2D2D] mb-4">&quot;El código del futuro se escribe conversando.&quot;</p>
            <p className="text-sm text-[#8A8A8A] uppercase tracking-widest font-bold">Guía Definitiva · 2026</p>
          </footer>

        </div>
      </main>
    </div>
  );
}

function SectionHeader({ title, subtitle }: { title: string, subtitle: string }) {
  return (
    <div className="mb-12">
      <span className="text-[#D97757] font-bold tracking-widest uppercase text-xs">{title}</span>
      <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#2D2D2D] mt-3 leading-tight">{subtitle}</h2>
      <div className="h-1 w-24 bg-[#D97757] mt-8 rounded-full"></div>
    </div>
  );
}

function CommandCard({ cmd, desc }: { cmd: string, desc: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-[#E5E3DB] shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="font-mono text-[#D97757] font-bold mb-3 bg-[#FDF8F5] border border-[#F5E6DF] inline-block px-3 py-1.5 rounded-lg text-sm">{cmd}</div>
      <p className="text-sm text-[#5A5A5A] m-0 leading-relaxed">{desc}</p>
    </div>
  );
}

function CodeBlock({ code, language }: { code: string, language: string }) {
  return (
    <div className="bg-[#1E1E1E] rounded-xl overflow-hidden shadow-inner">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#2D2D2D] border-b border-[#3D3D3D]">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
        </div>
        <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">{language}</span>
      </div>
      <div className="p-5 overflow-x-auto">
        <code className="font-mono text-sm text-gray-200 whitespace-pre">
          {code}
        </code>
      </div>
    </div>
  );
}
