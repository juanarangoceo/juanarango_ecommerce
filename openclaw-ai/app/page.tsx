'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, AlertTriangle, Zap, Lock, 
  CheckCircle2, Copy, Check,
  Cpu, Globe, Code2, Lightbulb, ChevronDown,
  Menu, X, ArrowRight, ExternalLink, BookOpen, ShieldAlert, Info,
  Wrench, Database, FileJson, Search
} from 'lucide-react';

const SECTIONS = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'que-es', label: '¿Qué es OpenClaw?' },
  { id: 'conceptos', label: 'Conceptos Básicos' },
  { id: 'advertencias', label: 'Riesgos y Seguridad' },
  { id: 'instalacion', label: 'Guía de Instalación' },
  { id: 'skills', label: 'Skills (Habilidades)' },
  { id: 'ejemplos', label: 'Ejemplos de Uso' },
  { id: 'consejos-pro', label: 'Consejos Pro' },
  { id: 'faq', label: 'Preguntas Frecuentes' },
];

const useActiveSection = (sectionIds: string[]) => {
  const [activeSection, setActiveSection] = useState(sectionIds[0]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;
      for (const id of sectionIds.slice().reverse()) {
        const element = document.getElementById(id);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds]);

  return activeSection;
};

const CodeBlock = ({ code, language }: { code: string, language: string }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/10 my-6">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
        <span className="text-xs font-mono text-gray-400">{language}</span>
        <button 
          onClick={copyToClipboard}
          className="text-gray-400 hover:text-white transition-colors p-1"
          aria-label="Copiar código"
        >
          {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-gray-300">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

const InstallationTabs = () => {
  const [activeTab, setActiveTab] = useState('mac');
  
  const tabs = [
    { id: 'mac', label: 'macOS' },
    { id: 'linux', label: 'Linux (Ubuntu/Debian)' },
    { id: 'windows', label: 'Windows' },
  ];

  const codes = {
    mac: `# 1. Instalar Homebrew (si no lo tienes)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. Instalar dependencias
brew install python node git

# 3. Clonar el repositorio
git clone https://github.com/openclaw/openclaw.ai.git
cd openclaw.ai

# 4. Instalar paquetes de Node
npm install

# 5. Configurar variables de entorno
cp .env.example .env`,
    linux: `# 1. Actualizar repositorios e instalar dependencias
sudo apt update && sudo apt install -y python3 python3-pip nodejs npm git

# 2. Clonar el repositorio
git clone https://github.com/openclaw/openclaw.ai.git
cd openclaw.ai

# 3. Instalar paquetes de Node
npm install

# 4. Configurar variables de entorno
cp .env.example .env`,
    windows: `# Abre PowerShell como Administrador

# 1. Instalar dependencias usando Winget (Gestor de paquetes de Windows)
winget install Python.Python.3.11
winget install OpenJS.NodeJS
winget install Git.Git

# 2. Clonar el repositorio
git clone https://github.com/openclaw/openclaw.ai.git
cd openclaw.ai

# 3. Instalar paquetes de Node
npm install

# 4. Configurar variables de entorno
copy .env.example .env`
  };

  return (
    <div className="mt-8">
      <div className="flex space-x-2 border-b border-white/10 mb-4 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium transition-colors relative whitespace-nowrap ${
              activeTab === tab.id ? 'text-emerald-400' : 'text-gray-400 hover:text-gray-200'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab" 
                className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-emerald-400" 
              />
            )}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <CodeBlock code={codes[activeTab as keyof typeof codes]} language="bash" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const AccordionItem = ({ question, answer }: { question: string, answer: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-white/10">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center w-full py-4 text-left focus:outline-none group"
        aria-expanded={isOpen}
      >
        <span className="font-medium text-lg text-gray-200 group-hover:text-emerald-400 transition-colors">{question}</span>
        <ChevronDown className={`transform transition-transform ${isOpen ? 'rotate-180' : ''} text-gray-400`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-4 text-gray-400 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ConceptCard = ({ title, description, icon: Icon }: { title: string, description: React.ReactNode, icon: any }) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-emerald-500/10 rounded-lg">
        <Icon className="text-emerald-400" size={24} />
      </div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
    </div>
    <div className="text-sm text-gray-400 leading-relaxed space-y-2">
      {description}
    </div>
  </div>
);

export default function OpenClawGuide() {
  const activeSection = useActiveSection(SECTIONS.map(s => s.id));
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative">
      {/* Mobile Header */}
      <div className="md:hidden sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-md border-b border-white/10 px-4 py-3 flex justify-between items-center">
        <span className="font-bold text-xl tracking-tight text-white">OpenClaw<span className="text-emerald-500">.ai</span></span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white p-2">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-0 z-40 bg-[#050505] pt-20 px-6 border-b border-white/10 shadow-2xl overflow-y-auto"
          >
            <nav className="flex flex-col space-y-6 pb-10">
              {SECTIONS.map(section => (
                <a 
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-xl font-medium ${activeSection === section.id ? 'text-emerald-400' : 'text-gray-400'}`}
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-72 h-screen sticky top-0 border-r border-white/10 p-8 overflow-y-auto bg-[#050505]">
        <div className="mb-12">
          <span className="font-bold text-3xl tracking-tight text-white">OpenClaw<span className="text-emerald-500">.ai</span></span>
          <p className="text-xs text-gray-500 mt-2 uppercase tracking-widest font-mono">Guía Oficial</p>
        </div>
        <nav className="flex flex-col space-y-2 flex-1">
          {SECTIONS.map(section => (
            <a 
              key={section.id}
              href={`#${section.id}`}
              className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeSection === section.id 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              {section.label}
            </a>
          ))}
        </nav>
        
        <div className="mt-auto pt-8 border-t border-white/10">
          <a href="https://openclaw.ai" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 text-sm text-gray-400 hover:text-emerald-400 transition-colors">
            <Globe size={16} />
            <span>Visitar openclaw.ai</span>
          </a>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-6 md:px-12 lg:px-24 py-12 max-w-5xl mx-auto">
        <article className="space-y-32">
          
          {/* Hero Section */}
          <section id="inicio" className="pt-10 md:pt-20 scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center space-x-2 bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider mb-8 border border-emerald-500/20">
                <Zap size={14} />
                <span>Guía Definitiva 2026</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white mb-6 leading-[1.1]">
                Domina <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500">OpenClaw AI</span> desde cero.
              </h1>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl leading-relaxed">
                Ya seas un principiante curioso o un desarrollador experimentado, esta guía interactiva te llevará paso a paso para instalar, configurar y desplegar agentes autónomos. Descubre cómo potenciar tu IA con Skills, evita riesgos críticos y automatiza tu trabajo.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="#instalacion" className="inline-flex items-center justify-center space-x-2 bg-white text-black px-8 py-4 rounded-xl font-semibold hover:bg-gray-200 transition-colors shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <Terminal size={18} />
                  <span>Instalar Ahora</span>
                </a>
                <a href="#que-es" className="inline-flex items-center justify-center space-x-2 bg-white/5 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors border border-white/10">
                  <span>Leer la Guía</span>
                  <ArrowRight size={18} />
                </a>
              </div>
            </motion.div>
          </section>

          {/* ¿Qué es OpenClaw AI? */}
          <section id="que-es" className="scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">¿Qué es OpenClaw AI?</h2>
            <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed space-y-6">
              <p className="text-lg">
                <strong>OpenClaw AI</strong> es un framework (marco de trabajo) de código abierto diseñado para crear, gestionar y desplegar <strong>agentes de inteligencia artificial autónomos</strong>. 
              </p>
              <p className="text-lg">
                A diferencia de los chatbots tradicionales como ChatGPT o Claude (donde tú haces una pregunta y ellos responden texto), OpenClaw tiene &quot;garras&quot; (claws). Esto significa que <strong>puede interactuar directamente con tu computadora</strong>: puede abrir el navegador, hacer clics, escribir código, guardarlo en un archivo y ejecutarlo para ver si funciona.
              </p>
              
              <div className="bg-emerald-500/10 border border-emerald-500/20 p-6 rounded-2xl my-8">
                <h4 className="text-emerald-400 font-semibold flex items-center gap-2 mb-2">
                  <Info size={20} /> La diferencia clave
                </h4>
                <p className="text-sm">
                  <strong>Chatbot normal:</strong> &quot;Aquí tienes el código para hacer un script en Python.&quot; (Tú debes copiarlo, pegarlo, guardarlo y ejecutarlo).<br/><br/>
                  <strong>OpenClaw AI:</strong> &quot;He creado el script en Python, lo he guardado en tu carpeta, lo he ejecutado, encontré un error, lo corregí, y aquí tienes el resultado final.&quot;
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-emerald-500/30 transition-colors">
                  <Globe className="text-emerald-400 mb-6" size={36} />
                  <h3 className="text-xl font-semibold text-white mb-3">Navegación Autónoma</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">Capaz de interactuar con el navegador web, hacer clics, rellenar formularios y extraer datos (scraping) de cualquier sitio de forma inteligente.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-emerald-500/30 transition-colors">
                  <Code2 className="text-emerald-400 mb-6" size={36} />
                  <h3 className="text-xl font-semibold text-white mb-3">Ejecución de Código</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">Escribe, depura y ejecuta scripts en Python, Node.js y Bash directamente en tu entorno local o en contenedores seguros.</p>
                </div>
                <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:border-emerald-500/30 transition-colors">
                  <Cpu className="text-emerald-400 mb-6" size={36} />
                  <h3 className="text-xl font-semibold text-white mb-3">Agnóstico de Modelos</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">No estás atado a una sola empresa. Puedes usar Gemini, OpenAI, Anthropic o modelos locales gratuitos en tu propia PC.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Conceptos Básicos */}
          <section id="conceptos" className="scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Conceptos Básicos para Principiantes</h2>
            <p className="text-gray-300 mb-10 text-lg leading-relaxed">
              Si es tu primera vez trabajando con herramientas de desarrollo o IA avanzada, aquí tienes un glosario rápido para que no te pierdas.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <ConceptCard 
                icon={Terminal}
                title="Terminal / Consola"
                description={
                  <>
                    <p>Es una pantalla negra donde escribes comandos de texto para que la computadora los ejecute, en lugar de usar el ratón.</p>
                    <p>En Windows se llama <strong>PowerShell</strong> o <strong>Símbolo del sistema</strong>. En Mac y Linux se llama <strong>Terminal</strong>.</p>
                  </>
                }
              />
              <ConceptCard 
                icon={Lock}
                title="API Key (Clave API)"
                description={
                  <>
                    <p>Es como una contraseña súper secreta que te dan empresas como Google o OpenAI. Le permite a OpenClaw conectarse a sus &quot;cerebros&quot; de IA.</p>
                    <p className="text-red-400 font-semibold">¡Nunca compartas tu API Key con nadie ni la subas a internet!</p>
                  </>
                }
              />
              <ConceptCard 
                icon={BookOpen}
                title="Variables de Entorno (.env)"
                description={
                  <>
                    <p>Es un archivo de texto oculto (llamado <code>.env</code>) donde guardas configuraciones secretas, como tu API Key.</p>
                    <p>OpenClaw lee este archivo para saber cómo conectarse a los servicios sin que tengas que escribir la contraseña cada vez.</p>
                  </>
                }
              />
              <ConceptCard 
                icon={ShieldAlert}
                title="Docker (Contenedores)"
                description={
                  <>
                    <p>Imagina una caja fuerte virtual dentro de tu computadora. <a href="https://www.docker.com/" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Docker</a> permite ejecutar programas dentro de esa caja.</p>
                    <p>Es muy útil para OpenClaw, ya que si la IA comete un error y borra un archivo, solo afectará a la &quot;caja fuerte&quot; y no a tu computadora real.</p>
                  </>
                }
              />
            </div>
          </section>

          {/* Riesgos y Seguridad */}
          <section id="advertencias" className="scroll-mt-24">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20">
                <AlertTriangle className="text-amber-500" size={28} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Riesgos y Seguridad</h2>
            </div>
            <p className="text-gray-300 mb-10 text-lg leading-relaxed">
              Un gran poder conlleva una gran responsabilidad. OpenClaw AI no es un simple generador de texto; es un agente con capacidad de acción real en tu sistema. <strong>Lee esto antes de instalarlo.</strong>
            </p>
            
            <div className="space-y-6">
              <div className="bg-amber-500/5 border border-amber-500/20 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row gap-6 items-start">
                <div className="p-4 bg-amber-500/10 rounded-full shrink-0">
                  <Terminal className="text-amber-500" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-amber-500 mb-2">Ejecución de Código Arbitrario</h3>
                  <p className="text-gray-300 leading-relaxed mb-2">El agente puede ejecutar comandos de terminal. Esto significa que puede crear, modificar o <strong>borrar archivos</strong> si se lo pides (o si se confunde).</p>
                  <p className="text-gray-400 text-sm"><strong>Solución:</strong> Nunca lo ejecutes con permisos de administrador (root). Se recomienda encarecidamente usar Docker o una Máquina Virtual para aislar el entorno.</p>
                </div>
              </div>
              
              <div className="bg-red-500/5 border border-red-500/20 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row gap-6 items-start">
                <div className="p-4 bg-red-500/10 rounded-full shrink-0">
                  <Lock className="text-red-500" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-red-500 mb-2">Exposición de Claves Privadas</h3>
                  <p className="text-gray-300 leading-relaxed mb-2">Si le das acceso a tu sistema de archivos raíz, el agente podría leer tus archivos <code>.env</code> o claves bancarias y enviarlas al modelo de lenguaje (Google/OpenAI) para analizarlas.</p>
                  <p className="text-gray-400 text-sm"><strong>Solución:</strong> Ejecuta OpenClaw solo en carpetas específicas (Workspaces) y usa el archivo <code>.clawignore</code> para bloquear directorios sensibles.</p>
                </div>
              </div>

              <div className="bg-blue-500/5 border border-blue-500/20 p-6 md:p-8 rounded-2xl flex flex-col md:flex-row gap-6 items-start">
                <div className="p-4 bg-blue-500/10 rounded-full shrink-0">
                  <Zap className="text-blue-400" size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-blue-400 mb-2">Costos de API Inesperados</h3>
                  <p className="text-gray-300 leading-relaxed mb-2">Los agentes autónomos pueden entrar en bucles infinitos intentando resolver un error complejo, consumiendo tokens de tu API rápidamente.</p>
                  <p className="text-gray-400 text-sm"><strong>Solución:</strong> Configura siempre un límite de pasos (<code>MAX_STEPS=15</code>) en tu configuración inicial para que se detenga automáticamente si se atasca.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Instalación */}
          <section id="instalacion" className="scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Guía de Instalación</h2>
            <p className="text-gray-300 mb-10 text-lg leading-relaxed">
              Sigue estos pasos para tener OpenClaw AI corriendo en tu máquina en menos de 5 minutos.
            </p>
            
            <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-8 mb-12 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <CheckCircle2 className="text-emerald-400" size={24} /> Requisitos Previos (Programas necesarios)
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-300">
                <li className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> 
                    <a href="https://nodejs.org/" target="_blank" rel="noreferrer" className="font-semibold hover:text-emerald-400 transition-colors flex items-center gap-1">Node.js (v18+) <ExternalLink size={14}/></a>
                  </div>
                  <span className="text-sm text-gray-500 ml-3.5">El motor que ejecuta el código principal de OpenClaw.</span>
                </li>
                <li className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> 
                    <a href="https://www.python.org/downloads/" target="_blank" rel="noreferrer" className="font-semibold hover:text-emerald-400 transition-colors flex items-center gap-1">Python (v3.10+) <ExternalLink size={14}/></a>
                  </div>
                  <span className="text-sm text-gray-500 ml-3.5">Necesario para que el agente ejecute scripts de análisis de datos.</span>
                </li>
                <li className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> 
                    <a href="https://git-scm.com/downloads" target="_blank" rel="noreferrer" className="font-semibold hover:text-emerald-400 transition-colors flex items-center gap-1">Git <ExternalLink size={14}/></a>
                  </div>
                  <span className="text-sm text-gray-500 ml-3.5">Herramienta para descargar el código fuente desde GitHub.</span>
                </li>
                <li className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> 
                    <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" className="font-semibold hover:text-emerald-400 transition-colors flex items-center gap-1">API Key válida <ExternalLink size={14}/></a>
                  </div>
                  <span className="text-sm text-gray-500 ml-3.5">Recomendamos Google Gemini (es gratis para empezar) o OpenAI.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-sm font-mono text-emerald-400">1</span>
                  Clonar e Instalar
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Abre tu terminal y copia los siguientes comandos según tu sistema operativo. Esto descargará OpenClaw y preparará todo lo necesario.
                </p>
                <InstallationTabs />
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-sm font-mono text-emerald-400">2</span>
                  Configuración de Entorno (.env)
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  El paso anterior creó un archivo llamado <code>.env</code> en la carpeta de OpenClaw. Ábrelo con cualquier editor de texto (como el Bloc de notas o VS Code) y añade tu API Key.
                </p>
                <CodeBlock 
                  language="env"
                  code={`# Archivo: .env

# Pega aquí tu clave de Google AI Studio (Gemini)
GEMINI_API_KEY="AIzaSyTuClaveSecretaAqui..."

# Opcional: Si prefieres usar OpenAI (ChatGPT)
# OPENAI_API_KEY="sk-proj-TuClaveSecretaAqui..."

# Carpeta donde el agente guardará sus archivos (por seguridad)
WORKSPACE_DIR="./workspace"

# Número máximo de intentos antes de rendirse (evita gastos)
MAX_STEPS=15

# Permite que el agente ejecute comandos en la terminal
ALLOW_SHELL_EXECUTION=true`}
                />
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-4">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-sm font-mono text-emerald-400">3</span>
                  Iniciar el Agente
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  Vuelve a tu terminal y ejecuta el comando de inicio. Verás la interfaz interactiva de OpenClaw lista para recibir tus instrucciones.
                </p>
                <CodeBlock 
                  language="bash"
                  code={`npm run start`}
                />
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 mt-4">
                  <p className="text-sm text-gray-400">
                    <strong>¡Felicidades!</strong> Si ves el logo de OpenClaw en tu terminal, ya puedes empezar a escribirle tareas. Prueba escribiendo: <code className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">Crea un archivo llamado hola.txt que diga &apos;Hola Mundo&apos;</code>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Skills (Habilidades) */}
          <section id="skills" className="scroll-mt-24">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <Wrench className="text-purple-400" size={28} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Skills (Habilidades)</h2>
            </div>
            <p className="text-gray-300 mb-10 text-lg leading-relaxed">
              La verdadera magia de OpenClaw radica en sus <strong>Skills</strong>. Son herramientas o &quot;superpoderes&quot; que puedes añadirle al agente para que aprenda a hacer cosas nuevas, como conectarse a una base de datos o enviar un correo electrónico.
            </p>

            <div className="bg-white/5 border border-white/10 p-8 rounded-2xl mb-8">
              <h3 className="text-xl font-semibold text-white mb-4">¿Cómo funcionan las Skills?</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                En OpenClaw, una Skill es simplemente un archivo de código (generalmente en la carpeta <code>/skills</code>) que define una función específica. Cuando el agente necesita hacer algo, revisa su &quot;caja de herramientas&quot; (sus skills) y decide cuál usar.
              </p>
              
              <h4 className="text-emerald-400 font-semibold mb-3">Ejemplos de Skills preinstaladas:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-[#0a0a0a] rounded-xl border border-white/5">
                  <Search className="text-blue-400 mt-1" size={20} />
                  <div>
                    <strong className="text-gray-200 block">WebSearchSkill</strong>
                    <span className="text-sm text-gray-500">Permite al agente buscar en Google y leer páginas web.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-[#0a0a0a] rounded-xl border border-white/5">
                  <Terminal className="text-orange-400 mt-1" size={20} />
                  <div>
                    <strong className="text-gray-200 block">BashExecutionSkill</strong>
                    <span className="text-sm text-gray-500">Permite ejecutar comandos en la terminal de tu computadora.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-[#0a0a0a] rounded-xl border border-white/5">
                  <FileJson className="text-yellow-400 mt-1" size={20} />
                  <div>
                    <strong className="text-gray-200 block">FileManagementSkill</strong>
                    <span className="text-sm text-gray-500">Permite leer, escribir y modificar archivos en tu disco duro.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-[#0a0a0a] rounded-xl border border-white/5">
                  <Database className="text-purple-400 mt-1" size={20} />
                  <div>
                    <strong className="text-gray-200 block">SQLQuerySkill</strong>
                    <span className="text-sm text-gray-500">Permite conectarse a bases de datos y hacer consultas.</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-white/10 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold text-white mb-4">Creando tu propia Skill</h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Puedes crear tus propias Skills fácilmente. Por ejemplo, si quieres que el agente pueda enviar mensajes por Slack, crearías un archivo <code>SlackSkill.ts</code>:
              </p>
              <CodeBlock 
                language="typescript"
                code={`// Ejemplo conceptual de una Skill
export const SlackSkill = {
  name: "send_slack_message",
  description: "Envía un mensaje a un canal de Slack específico",
  parameters: {
    channel: "string (ej: #general)",
    message: "string"
  },
  execute: async (args) => {
    // Aquí va tu código para conectarte a la API de Slack
    await slackClient.chat.postMessage({
      channel: args.channel,
      text: args.message
    });
    return "Mensaje enviado con éxito";
  }
};`}
              />
              <p className="text-sm text-gray-500 mt-4">
                Una vez registrada, puedes decirle al agente: <span className="text-gray-300 italic">&quot;Revisa si la web está caída, y si es así, avisa por Slack en el canal #alertas&quot;</span>. El agente usará la <code>WebSearchSkill</code> y luego tu nueva <code>SlackSkill</code> automáticamente.
              </p>
            </div>
          </section>

          {/* Ejemplos de Uso */}
          <section id="ejemplos" className="scroll-mt-24">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ejemplos de Uso (Prompts)</h2>
            <p className="text-gray-300 mb-10 text-lg leading-relaxed">
              ¿No sabes qué pedirle? Aquí tienes ejemplos desde lo más básico hasta flujos de trabajo avanzados.
            </p>

            <div className="space-y-8">
              {/* Nivel Básico */}
              <div>
                <h3 className="text-xl font-semibold text-emerald-400 mb-4 border-b border-white/10 pb-2">Nivel Básico (Gestión de Archivos)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl">
                    <p className="text-gray-200 font-medium mb-3">&quot;Crea una carpeta llamada &apos;proyecto_web&apos;. Dentro, crea un archivo index.html con una estructura HTML5 básica y un archivo styles.css con un fondo oscuro.&quot;</p>
                  </div>
                  <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl">
                    <p className="text-gray-200 font-medium mb-3">&quot;Lee el archivo &apos;lista_compra.txt&apos;, ordénalo alfabéticamente y guárdalo como &apos;lista_ordenada.txt&apos;.&quot;</p>
                  </div>
                </div>
              </div>

              {/* Nivel Intermedio */}
              <div>
                <h3 className="text-xl font-semibold text-blue-400 mb-4 border-b border-white/10 pb-2">Nivel Intermedio (Investigación y Análisis)</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl">
                    <p className="text-gray-200 font-medium mb-3">&quot;Busca en internet las últimas 5 noticias sobre Inteligencia Artificial, haz un resumen de cada una y guárdalo en un archivo Markdown llamado noticias_ia.md&quot;</p>
                    <p className="text-xs text-gray-500 mt-2">Usa: WebSearchSkill + FileManagementSkill</p>
                  </div>
                  <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl">
                    <p className="text-gray-200 font-medium mb-3">&quot;Crea un script en Python que lea el archivo datos.csv, genere un gráfico de barras con las ventas por mes usando matplotlib, y guarde la imagen como grafico.png.&quot;</p>
                    <p className="text-xs text-gray-500 mt-2">Usa: BashExecutionSkill (para instalar matplotlib y ejecutar python)</p>
                  </div>
                </div>
              </div>

              {/* Nivel Avanzado */}
              <div>
                <h3 className="text-xl font-semibold text-purple-400 mb-4 border-b border-white/10 pb-2">Nivel Avanzado (Desarrollo y DevOps)</h3>
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl">
                    <p className="text-gray-200 font-medium mb-3">&quot;Revisa todos los archivos .js en la carpeta /src, encuentra funciones que no se estén utilizando y elimínalas. Luego ejecuta los tests (npm test) y si pasan, haz un commit en git con el mensaje &apos;Limpieza de código&apos;.&quot;</p>
                    <p className="text-sm text-gray-400 mt-2">El agente leerá el código, lo modificará, ejecutará comandos de terminal para probarlo y finalmente interactuará con Git.</p>
                  </div>
                  <div className="bg-[#0a0a0a] border border-white/10 p-6 rounded-2xl">
                    <p className="text-gray-200 font-medium mb-3">&quot;Tengo un error &apos;CORS policy&apos; en mi backend de Express.js. Revisa el archivo server.js, encuentra el problema, instala la librería cors si es necesario, arregla el código y reinicia el servidor para comprobar que funciona.&quot;</p>
                    <p className="text-sm text-gray-400 mt-2">Un flujo completo de depuración autónoma.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Consejos Pro */}
          <section id="consejos-pro" className="scroll-mt-24">
            <div className="flex items-center space-x-4 mb-6">
              <div className="p-3 bg-yellow-400/10 rounded-xl border border-yellow-400/20">
                <Lightbulb className="text-yellow-400" size={28} />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">Consejos Pro y Optimización</h2>
            </div>
            <p className="text-gray-300 mb-10 text-lg leading-relaxed">
              Para dominar OpenClaw AI, aplica estas estrategias avanzadas utilizadas por desarrolladores expertos.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-semibold text-white mb-3">1. System Prompts (Perfiles)</h3>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  El &quot;System Prompt&quot; es la instrucción base que le dice a la IA quién es. No uses el agente en modo &quot;general&quot;. Crea perfiles específicos en la carpeta <code>/prompts</code>. Por ejemplo, un perfil exclusivo para Web Scraping.
                </p>
                <CodeBlock language="json" code={`{\n  "role": "Senior Scraper",\n  "rules": [\n    "No usar regex para parsear HTML",\n    "Respetar siempre el archivo robots.txt",\n    "Devolver los datos en formato JSON"\n  ]\n}`} />
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-semibold text-white mb-3">2. Human-in-the-Loop (HITL)</h3>
                <p className="text-sm text-gray-400 leading-relaxed mb-4">
                  Traducido como &quot;Humano en el bucle&quot;. Activa el modo HITL en tu <code>.env</code> (<code>REQUIRE_APPROVAL=true</code>). 
                </p>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Esto pausará la ejecución antes de comandos destructivos (como <code>git push</code> o <code>rm -rf</code>) y esperará a que tú escribas &quot;Y&quot; (Sí) o &quot;N&quot; (No) en la terminal. Es tu red de seguridad.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-semibold text-white mb-3">3. Ventana de Contexto</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  La IA tiene una memoria a corto plazo limitada (Ventana de Contexto). Si le pides que lea 50 archivos a la vez, se &quot;olvidará&quot; de las instrucciones iniciales o la API te cobrará mucho. Usa el comando <code>/clear</code> periódicamente para borrar la memoria y empezar una tarea nueva limpia.
                </p>
              </div>

              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-semibold text-white mb-3">4. Modelos Locales (Gratis y Privados)</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Si manejas código confidencial de tu empresa, no uses APIs en la nube. Puedes conectar OpenClaw a modelos locales usando <a href="https://ollama.com/" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">Ollama</a> o <a href="https://lmstudio.ai/" target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">LM Studio</a>. Solo cambia la URL de la API en tu <code>.env</code> apuntando a <code>http://localhost:11434/v1</code>.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" className="scroll-mt-24 pb-24">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-10">Preguntas Frecuentes (FAQ)</h2>
            
            <div className="space-y-2">
              <AccordionItem 
                question="¿OpenClaw AI es completamente gratuito?"
                answer={
                  <>
                    Sí, el programa OpenClaw AI es 100% de código abierto y gratuito. Sin embargo, necesitarás pagar por el uso de la API del modelo de lenguaje que elijas (como Gemini o OpenAI). <br/><br/>
                    <em>Nota: Google AI Studio ofrece una capa gratuita muy generosa para desarrolladores.</em>
                  </>
                }
              />
              <AccordionItem 
                question="¿Qué modelos de IA son compatibles?"
                answer="Actualmente soporta la familia Gemini (1.5 Pro, 2.5 Flash), OpenAI (GPT-4o, GPT-4-turbo), Anthropic (Claude 3.5 Sonnet) y cualquier modelo local compatible con la API de OpenAI (vía LM Studio u Ollama)."
              />
              <AccordionItem 
                question="¿Puede OpenClaw modificar mis archivos locales?"
                answer="Sí. Si le otorgas permisos, OpenClaw puede leer, crear, modificar y eliminar archivos en tu sistema. Por eso es vital usar el modo Human-in-the-Loop o ejecutarlo en un entorno aislado (Docker) para evitar modificaciones no deseadas."
              />
              <AccordionItem 
                question="Me da error de 'Dependencias no encontradas' al instalar."
                answer="Asegúrate de tener instaladas las versiones correctas de Node.js (>=18) y Python (>=3.10). A veces, limpiar la caché de npm ejecutando 'npm cache clean --force' y borrando la carpeta 'node_modules' soluciona el problema."
              />
            </div>
          </section>

        </article>
      </main>
    </div>
  );
}
