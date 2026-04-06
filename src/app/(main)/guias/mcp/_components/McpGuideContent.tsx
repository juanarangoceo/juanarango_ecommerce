'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Home, HelpCircle, BookOpen, Shield, Download, 
  Wrench, Lightbulb, Terminal, MessageCircle, 
  Zap, ArrowRight, Network, Menu, X, CheckCircle2, 
  Database, Globe, Cpu, Code2, Bug, FileText
} from 'lucide-react';
import { NewsletterForm } from "@/components/newsletter-form";

type Section = 'inicio' | 'que-es' | 'conceptos' | 'arquitectura' | 'instalacion' | 'servidores' | 'ejemplos' | 'consejos' | 'faq';

export function McpGuideContent() {
  const [activeSection, setActiveSection] = useState<Section>('inicio');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  const menuItems: { id: Section; label: string; icon: React.ElementType }[] = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'que-es', label: '¿Qué es MCP?', icon: HelpCircle },
    { id: 'conceptos', label: 'Conceptos Básicos', icon: BookOpen },
    { id: 'arquitectura', label: 'Arquitectura y Seguridad', icon: Shield },
    { id: 'instalacion', label: 'Guía de Instalación', icon: Download },
    { id: 'servidores', label: 'Servidores y Herramientas', icon: Wrench },
    { id: 'ejemplos', label: 'Ejemplos de Uso', icon: Lightbulb },
    { id: 'consejos', label: 'Consejos Pro', icon: Terminal },
    { id: 'faq', label: 'Preguntas Frecuentes', icon: MessageCircle },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'inicio':
        return (
          <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#ff6b4a]/30 bg-[#ff6b4a]/10 text-[#ff6b4a] text-xs font-semibold tracking-wide mb-8">
              <Zap className="w-3 h-3" />
              GUÍA DEFINITIVA 2026
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
              Domina <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b4a] to-[#ff8f75]">MCP</span> desde cero.
            </h1>
            <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-3xl">
              Ya seas un principiante curioso o un desarrollador experimentado, esta guía interactiva te llevará paso a paso para entender, instalar y desplegar el <strong>Model Context Protocol (El Conector Universal)</strong>. Descubre cómo potenciar tu <Link href="/blog/ia-automatizacion" className="text-[#ff6b4a] hover:underline">Inteligencia Artificial</Link> conectándola a tus datos locales y herramientas corporativas.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-16">
              <button 
                onClick={() => setActiveSection('instalacion')} 
                className="px-8 py-4 bg-[#ff6b4a] hover:bg-[#ff5733] text-white rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg shadow-[#ff6b4a]/20 cursor-pointer"
              >
                <Download className="w-5 h-5" />
                Instalar Ahora
              </button>
              <button 
                onClick={() => setActiveSection('que-es')} 
                className="px-8 py-4 bg-[#1a1a1a] hover:bg-[#252525] text-white rounded-xl font-semibold transition-all flex items-center gap-2 border border-white/5 cursor-pointer"
              >
                Leer la Guía
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="w-full aspect-video bg-gradient-to-br from-[#141414] to-[#0a0a0a] rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent opacity-80"></div>
              <div className="flex flex-col items-center gap-6 z-10 transform group-hover:scale-105 transition-transform duration-700">
                <div className="w-28 h-28 bg-gradient-to-br from-[#ff6b4a] to-[#cc3b1c] rounded-3xl flex items-center justify-center shadow-2xl shadow-[#ff6b4a]/30 relative">
                  <div className="absolute inset-0 bg-white/20 rounded-3xl animate-ping opacity-20"></div>
                  <Network className="w-14 h-14 text-white" />
                </div>
                <h2 className="text-3xl font-bold tracking-widest text-white/90 drop-shadow-lg text-center">MODEL CONTEXT PROTOCOL</h2>
              </div>
            </div>
          </div>
        );

      case 'que-es':
        return (
          <div className="max-w-4xl animate-in fade-in duration-500">
            <h1 className="text-4xl font-bold mb-6 text-white">¿Qué es el Model Context Protocol (MCP)?</h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              El <strong>Model Context Protocol (MCP)</strong> es un estándar de código abierto introducido por Anthropic que actúa como un "puerto USB universal" para la Inteligencia Artificial, acelerando la integración inteligente en tus <Link href="/soluciones" className="text-[#ff6b4a] hover:underline">sistemas corporativos</Link>.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-12 mb-4 border-b border-white/10 pb-2">El Problema que Resuelve</h2>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Históricamente, los Modelos de Lenguaje Grande (LLMs) han estado aislados. Para que una IA pudiera leer tu base de datos, revisar tu código en GitHub o interactuar con tu Slack, los desarrolladores tenían que escribir integraciones personalizadas para <em className="text-gray-300">cada modelo</em> y <em className="text-gray-300">cada herramienta</em> (el temido problema N x M que ralentiza la automatización).
            </p>

            <h2 className="text-2xl font-semibold text-white mt-12 mb-4 border-b border-white/10 pb-2">La Solución: Un Estándar Universal</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              MCP estandariza cómo las aplicaciones de IA se comunican con fuentes de datos externas. Escribes un servidor MCP una sola vez, y cualquier cliente compatible (como <Link href="/guias/claude-code" className="text-[#ff6b4a] hover:underline">Claude Desktop</Link>, Cursor, o Zed) puede conectarse a él instantáneamente.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-[#141414] p-6 rounded-xl border border-white/5 shadow-md">
                <Globe className="w-8 h-8 text-[#ff6b4a] mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Código Abierto</h3>
                <p className="text-sm text-gray-400">Un estándar libre y abierto para toda la industria, no bloqueado por un solo proveedor.</p>
              </div>
              <div className="bg-[#141414] p-6 rounded-xl border border-white/5 shadow-md">
                <Shield className="w-8 h-8 text-[#ff6b4a] mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Seguridad Local</h3>
                <p className="text-sm text-gray-400">Tus datos nunca abandonan tu máquina a menos que la IA los solicite explícitamente y tú lo apruebes.</p>
              </div>
              <div className="bg-[#141414] p-6 rounded-xl border border-white/5 shadow-md">
                <Zap className="w-8 h-8 text-[#ff6b4a] mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Plug & Play</h3>
                <p className="text-sm text-gray-400">Conecta bases de datos, APIs y sistemas de archivos locales en cuestión de minutos.</p>
              </div>
            </div>
          </div>
        );

      case 'conceptos':
        return (
          <div className="max-w-4xl animate-in fade-in duration-500">
            <h1 className="text-4xl font-bold mb-6 text-white">Conceptos Básicos de MCP</h1>
            <p className="text-lg text-gray-400 mb-8">Para dominar MCP y conectarlo a las <Link href="/soluciones" className="text-[#ff6b4a] hover:underline">necesidades de automatización</Link> de tu empresa, necesitas entender su arquitectura fundamental: Clientes, Servidores y primitivas.</p>

            <div className="space-y-8">
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Cpu className="text-[#ff6b4a]" /> Componentes del Sistema
                </h3>
                <ul className="space-y-6 text-gray-300">
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#ff6b4a] shrink-0 mt-1" />
                    <div>
                      <strong className="text-white block mb-1 text-lg">MCP Hosts (Anfitriones)</strong>
                      <p className="text-gray-400">Aplicaciones orientadas al usuario como Claude Desktop o IDEs innovadores como Cursor que inician la conexión y muestran la interfaz de la IA.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#ff6b4a] shrink-0 mt-1" />
                    <div>
                      <strong className="text-white block mb-1 text-lg">MCP Clients (Clientes)</strong>
                      <p className="text-gray-400">El código dentro del Host que mantiene la comunicación bidireccional segura con los servidores.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#ff6b4a] shrink-0 mt-1" />
                    <div>
                      <strong className="text-white block mb-1 text-lg">MCP Servers (Servidores)</strong>
                      <p className="text-gray-400">Programas ligeros que exponen capacidades específicas. Por ejemplo, un "Servidor de PostgreSQL" que permite ejecutar consultas SQL sobre ventas corporativas directamente desde el chat.</p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-[#141414] border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Database className="text-[#ff6b4a]" /> Las 3 Primitivas de MCP
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5">
                    <h4 className="text-[#ff6b4a] font-bold mb-3 text-lg">1. Resources</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">Datos controlados por el servidor que el cliente puede leer. Piensa en ellos como archivos locales, respuestas de API o esquemas transaccionales. Son de solo lectura.</p>
                  </div>
                  <div className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5">
                    <h4 className="text-[#ff6b4a] font-bold mb-3 text-lg">2. Tools</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">Funciones que potencian el flujo automatizado: <code className="text-xs bg-white/10 px-1 py-0.5 rounded">execute_sql</code>, <code className="text-xs bg-white/10 px-1 py-0.5 rounded">github_pr</code>. Permiten a la IA tomar acciones de impacto real en tus entornos.</p>
                  </div>
                  <div className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5">
                    <h4 className="text-[#ff6b4a] font-bold mb-3 text-lg">3. Prompts</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">Plantillas diseñadas. Ayudan a los usuarios a interactuar óptimamente con agentes complejos sin dominar prompt engineering sofisticado.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'instalacion':
        return (
          <div className="max-w-4xl animate-in fade-in duration-500">
            <h1 className="text-4xl font-bold mb-6 text-white">Guía de Instalación General</h1>
            <p className="text-lg text-gray-400 mb-8">La forma de instalar un servidor depende del <strong>Host (Cliente)</strong> que utilices. Entender cómo conectar estas IAs a tu empresa es el primer peldaño hacia la nueva <Link href="/blog" className="text-[#ff6b4a] hover:underline">estrategia digital B2B</Link>.</p>

            <div className="space-y-8">
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-[#ff6b4a]">Ejemplo A:</span> <Link href="/guias/claude-code" className="hover:underline">Claude Desktop / Claude Code</Link>
                </h3>
                
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-2">1. Localiza el archivo de configuración</h4>
                  <p className="text-gray-400 mb-3">Edita el archivo <code className="text-sm bg-white/10 px-1.5 py-0.5 rounded text-gray-300">claude_desktop_config.json</code>:</p>
                  <div className="space-y-2">
                    <div className="bg-[#0a0a0a] p-3 rounded-lg border border-white/5 font-mono text-sm text-gray-300">
                      <span className="text-gray-500">Mac:</span> ~/Library/Application Support/Claude/claude_desktop_config.json
                    </div>
                    <div className="bg-[#0a0a0a] p-3 rounded-lg border border-white/5 font-mono text-sm text-gray-300">
                      <span className="text-gray-500">Windows:</span> %APPDATA%\Claude\claude_desktop_config.json
                    </div>
                  </div>
                </div>

                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-2">2. Añade el Servidor MCP</h4>
                  <p className="text-gray-400 mb-3">Agrega la configuración JSON apuntando al servidor. Ejemplo SQLite:</p>
                  <pre className="bg-[#0a0a0a] p-4 rounded-xl border border-white/10 overflow-x-auto">
                    <code className="text-sm text-[#a8b1c2] font-mono">
{`{
  "mcpServers": {
    "mi-base-datos": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-sqlite",
        "C:/ruta/absoluta/a/tu/base_de_datos.db"
      ]
    }
  }
}`}
                    </code>
                  </pre>
                </div>
              </div>

              <div className="bg-[#141414] border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-[#ff6b4a]">Ejemplo B:</span> Cursor IDE
                </h3>
                <p className="text-gray-400 mb-6">En editores de código modernos enfocados en IA (como Cursor), la configuración suele ser directa en su interfaz gráfica:</p>
                <ol className="space-y-4 text-gray-300 list-decimal list-inside marker:text-[#ff6b4a] marker:font-bold">
                  <li className="pl-2">Abre: <strong className="text-white">Cursor Settings</strong> {'>'} <strong className="text-white">Features</strong> {'>'} <strong className="text-white">MCP</strong>.</li>
                  <li className="pl-2">Haz clic en el botón <strong className="text-white">+ Add New MCP Server</strong>.</li>
                  <li className="pl-2">
                    Completa el formulario:
                    <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-gray-400">
                      <li><strong>Name:</strong> <code className="text-xs bg-white/10 px-1 py-0.5 rounded">mi-base-datos</code></li>
                      <li><strong>Type:</strong> <code className="text-xs bg-white/10 px-1 py-0.5 rounded">command</code></li>
                      <li><strong>Command:</strong> <code className="text-xs bg-white/10 px-1 py-0.5 rounded">npx -y @modelcontextprotocol/server-sqlite /ruta/db.sqlite</code></li>
                    </ul>
                  </li>
                  <li className="pl-2">Guarda. La IA del editor se conectará a tu herramienta local.</li>
                </ol>
              </div>
            </div>
          </div>
        );

      case 'arquitectura':
        return (
          <div className="max-w-4xl animate-in fade-in duration-500">
            <h1 className="text-4xl font-bold mb-6 text-white">Arquitectura y Seguridad Empresarial</h1>
            <p className="text-lg text-gray-400 mb-8">
              MCP fue diseñado desde cero para entornos enterprise. Si estás pensando en integrarlo con tus <Link href="/blog/ia-automatizacion" className="text-[#ff6b4a] hover:underline">estrategias de automatización corporativa</Link>, entender su capa de red es clave.
            </p>
            
            <div className="space-y-8">
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Network className="text-[#ff6b4a]" /> Transportes Multientorno
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5">
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2"><Terminal className="w-5 h-5 text-[#ff6b4a]"/> Standard I/O (stdio)</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">Máxima seguridad local subproceso. Ideal para escritorios de trabajo y código confidencial donde no quieres exponer puertos LAN/WAN.</p>
                  </div>
                  <div className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5">
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2"><Globe className="w-5 h-5 text-[#ff6b4a]"/> Server-Sent Events (SSE)</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">Conexión web HTTP para equipos distribuidos que necesitan consultar clusters remotos o bases de datos Cloud protegidas.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#141414] border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Shield className="text-[#ff6b4a]" /> Paradigma de Confianza Zero (Zero Trust)
                </h3>
                <ul className="space-y-6 text-gray-300">
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#ff6b4a] shrink-0 mt-1" />
                    <div>
                      <strong className="text-white block mb-1 text-lg">Iniciativa de Usuario ("Human in the Loop")</strong>
                      <p className="text-gray-400 text-sm leading-relaxed">Los agentes no deciden por su cuenta borrar tablas o enviar emails promocionales; MCP escala los requests destructivos o inciertos al GUI para validación manual.</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case 'servidores':
        return (
          <div className="max-w-4xl animate-in fade-in duration-500">
            <h1 className="text-4xl font-bold mb-6 text-white">Directorio de Servidores MCP</h1>
            <p className="text-lg text-gray-400 mb-8">Extiende la memoria de tus asistentes hoy mismo con conectores que impulsan las ventas y la logística.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-[#141414] p-6 rounded-2xl border border-white/10 hover:border-[#ff6b4a]/50 transition-colors cursor-default">
                <Database className="w-8 h-8 text-[#ff6b4a] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Bases de Datos & ERPs</h3>
                <p className="text-sm text-gray-400 mb-4">Pregunta a tu sistema métricas de retención, logística de envíos o LTV de clientes sin usar SQL.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">PostgreSQL</span>
                  <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">Supabase</span>
                </div>
              </div>
              
              <div className="bg-[#141414] p-6 rounded-2xl border border-white/10 hover:border-[#ff6b4a]/50 transition-colors">
                <Code2 className="w-8 h-8 text-[#ff6b4a] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">DevOps y Repositorios</h3>
                <p className="text-sm text-gray-400 mb-4">Audita ramas, lee el progreso de los pull requests y rastrea commits que causaron caídas críticas.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">GitHub</span>
                  <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">GitLab</span>
                </div>
              </div>

              <div className="bg-[#141414] p-6 rounded-2xl border border-white/10 hover:border-[#ff6b4a]/50 transition-colors">
                <MessageCircle className="w-8 h-8 text-[#ff6b4a] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Omnicanalidad</h3>
                <p className="text-sm text-gray-400 mb-4">Interconecta canales de mensajería para que tus agentes puedan notificar alertas o resumir retrospectivas corporativas.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">Slack</span>
                  <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">Zendesk</span>
                </div>
              </div>

              <div className="bg-[#141414] p-6 rounded-2xl border border-white/10 hover:border-[#ff6b4a]/50 transition-colors">
                <FileText className="w-8 h-8 text-[#ff6b4a] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Workspaces</h3>
                <p className="text-sm text-gray-400 mb-4">Conector puente entre la IA y tus intranets ricas en contextos corporativos como SOPs y guiones de venta.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">Google Drive</span>
                  <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">Notion</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#ff6b4a]/20 to-transparent p-8 rounded-2xl border border-[#ff6b4a]/30">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2"><Lightbulb className="text-[#ff6b4a]"/> ¿Solución a Medida?</h3>
              <p className="text-gray-300 mb-4">Si necesitas un conector propio para tu CRM Privado o software de logística regional, nuestro equipo en Nitro Ecom puede estructurarlo usando el SDK de TS/Python.</p>
              <Link href="/soluciones/desarrollo" className="px-5 py-2.5 bg-[#1a1a1a] border border-white/10 text-white rounded-lg text-sm inline-block hover:border-[#ff6b4a] transition-all">Consúltanos hoy</Link>
            </div>
          </div>
        );

      case 'ejemplos':
        return (
          <div className="max-w-4xl animate-in fade-in duration-500">
            <h1 className="text-4xl font-bold mb-6 text-white">Casos Reales y Automatizaciones</h1>
            <p className="text-lg text-gray-400 mb-8">Así revolucionan su productividad las agencias que integran ecosistemas MCP a sus flujos.</p>

            <div className="space-y-6">
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#ff6b4a]/20 rounded-xl flex items-center justify-center">
                    <Database className="w-6 h-6 text-[#ff6b4a]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Reporte y Ventas Inteligentes B2B</h3>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  En startups <Link href="/blog/ia-automatizacion" className="text-[#ff6b4a] hover:underline">orientadas a comercio b2b</Link>, un gerente comercial requiere datos procesados. Un MCP local leyendo Postgres ahorra horas de scripting.
                </p>
                <div className="bg-[#0a0a0a] p-5 rounded-xl border border-white/5 space-y-4">
                  <div>
                    <strong className="text-[#ff6b4a] text-sm uppercase tracking-wider block mb-1">Prompt:</strong>
                    <em className="text-gray-300">"Quiero la lista agrupada de los 5 clientes con ventas estancadas hace 3 meses en Shopify Plus e información cruzada de marketing."</em>
                  </div>
                  <div>
                    <strong className="text-[#ff6b4a] text-sm uppercase tracking-wider block mb-1">Cálculo de la IA:</strong>
                    <span className="text-gray-400 text-sm">El Claude conectando con servidor MCP SQL genera queries de agregación y devuelve una respuesta natural lista para una campaña de Email.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'consejos':
        return (
          <div className="max-w-4xl animate-in fade-in duration-500">
            <h1 className="text-4xl font-bold mb-6 text-white">Tips Técnicos para Creadores</h1>
            <p className="text-lg text-gray-400 mb-8">¿Desarrollando tu propio Servidor MCP? El tooling es muy joven pero maduro.</p>

            <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 mb-8 relative overflow-hidden">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Bug className="text-[#ff6b4a]" /> MCP Inspector Web
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Anthropic ofrece el `inspector` oficial para debugear Tools, Resources y Prompts de manera local y en el navegador, sin usar tokens comerciales:
              </p>
              <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5 relative z-10 w-fit">
                <code className="text-[#ff6b4a] font-mono text-sm">npx @modelcontextprotocol/inspector &lt;comando-de-tu-servidor&gt;</code>
              </div>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="max-w-4xl animate-in fade-in duration-500">
            <h1 className="text-4xl font-bold mb-6 text-white">Preguntas Frecuentes</h1>
            
            <div className="space-y-4">
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">¿MCP consume muchos tokens?</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Depende. Si la lectura pasa miles de logs o datos al sistema, el prompt ingerirá todo ese tamaño resultando en costos de consumo. Herramientas eficientes usan búsqueda indexada SQL donde proveen solo 10 líneas de resultado filtradas en lugar del volcado masivo. 
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <header className="xl:hidden flex items-center justify-between p-4 border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-md fixed top-[64px] lg:top-[64px] left-0 right-0 z-[60]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#ff6b4a] to-[#ff3300] rounded-lg flex items-center justify-center">
            <Terminal className="text-white w-4 h-4" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white">MCP<span className="text-[#ff6b4a]">Guide</span></span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg cursor-pointer transition-colors"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside className={`
        fixed xl:sticky top-[64px] xl:top-[128px] left-0 h-[calc(100vh-64px)] xl:h-[calc(100vh-128px)] w-72 bg-[#0a0a0a] xl:bg-transparent border-r border-white/5 xl:border-0 flex flex-col z-[50]
        transition-transform duration-300 ease-in-out shrink-0 xl:py-10
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'}
      `}>
        <div className="px-6 hidden xl:block">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b4a] to-[#ff3300] rounded-xl flex items-center justify-center shadow-lg shadow-[#ff6b4a]/20">
              <Terminal className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-2xl tracking-tight text-white">MCP<span className="text-[#ff6b4a]">Guide</span></span>
          </div>
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mt-4 ml-1">Tecnología Base 2026</p>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4 pt-24 xl:pt-8 space-y-1 custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 group cursor-pointer ${
                  isActive
                    ? 'bg-[#ff6b4a]/10 text-[#ff6b4a] border border-[#ff6b4a]/30 shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-[#ff6b4a]' : 'text-gray-500 group-hover:text-gray-300'}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      </aside>

      {/* Overlay for mobile nav overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[40] xl:hidden top-[64px]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 px-5 lg:px-12 py-32 xl:py-14 w-full min-w-0 flex flex-col">
        <div className="flex-1 min-h-[60vh]">
          {renderContent()}
        </div>

        <div className="mt-24 pt-16 border-t border-white/10 w-full max-w-4xl">
          <div className="bg-[#141414] rounded-2xl border border-white/5 p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ff6b4a]/5 blur-[100px] rounded-full pointer-events-none"></div>
            <NewsletterForm />
          </div>
        </div>
      </main>
    </>
  );
}
