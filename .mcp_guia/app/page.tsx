'use client';

import React, { useState, useEffect } from 'react';
import { 
  Home, HelpCircle, BookOpen, Shield, Download, 
  Wrench, Lightbulb, Terminal, MessageCircle, 
  Zap, ArrowRight, Network, Menu, X, CheckCircle2, 
  Database, Globe, Cpu, Code2, Bug, FileText
} from 'lucide-react';

type Section = 'inicio' | 'que-es' | 'conceptos' | 'arquitectura' | 'instalacion' | 'servidores' | 'ejemplos' | 'consejos' | 'faq';

export default function MCPGuide() {
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
              Ya seas un principiante curioso o un desarrollador experimentado, esta guía interactiva te llevará paso a paso para entender, instalar y desplegar el <strong>Model Context Protocol (El Conector Universal)</strong>. Descubre cómo potenciar tu IA conectándola a tus datos locales y herramientas.
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

            <div className="w-full aspect-video bg-gradient-to-br from-[#141414] to-[#0a0a0a] rounded-2xl border border-white/10 flex items-center justify-center relative overflow-hidden group">
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
              El <strong>Model Context Protocol (MCP)</strong> es un estándar de código abierto introducido por Anthropic que actúa como un "puerto USB universal" para la Inteligencia Artificial.
            </p>
            
            <h2 className="text-2xl font-semibold text-white mt-12 mb-4 border-b border-white/10 pb-2">El Problema que Resuelve</h2>
            <p className="text-gray-400 mb-4 leading-relaxed">
              Históricamente, los Modelos de Lenguaje Grande (LLMs) han estado aislados. Para que una IA pudiera leer tu base de datos, revisar tu código en GitHub o interactuar con tu Slack, los desarrolladores tenían que escribir integraciones personalizadas para <em className="text-gray-300">cada modelo</em> y <em className="text-gray-300">cada herramienta</em> (el problema N x M).
            </p>

            <h2 className="text-2xl font-semibold text-white mt-12 mb-4 border-b border-white/10 pb-2">La Solución: Un Estándar Universal</h2>
            <p className="text-gray-400 mb-6 leading-relaxed">
              MCP estandariza cómo las aplicaciones de IA se comunican con fuentes de datos externas. Escribes un servidor MCP una sola vez, y cualquier cliente compatible (como Claude Desktop, Cursor, o Zed) puede conectarse a él instantáneamente.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-[#141414] p-6 rounded-xl border border-white/5">
                <Globe className="w-8 h-8 text-[#ff6b4a] mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Código Abierto</h3>
                <p className="text-sm text-gray-400">Un estándar libre y abierto para toda la industria, no bloqueado por un solo proveedor.</p>
              </div>
              <div className="bg-[#141414] p-6 rounded-xl border border-white/5">
                <Shield className="w-8 h-8 text-[#ff6b4a] mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">Seguridad Local</h3>
                <p className="text-sm text-gray-400">Tus datos nunca abandonan tu máquina a menos que la IA los solicite explícitamente y tú lo apruebes.</p>
              </div>
              <div className="bg-[#141414] p-6 rounded-xl border border-white/5">
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
            <p className="text-lg text-gray-400 mb-8">Para dominar MCP, necesitas entender su arquitectura fundamental, la cual se divide en Clientes, Servidores y tres primitivas principales.</p>

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
                      <p className="text-gray-400">Aplicaciones orientadas al usuario como Claude Desktop o IDEs (Cursor, Windsurf) que inician la conexión y muestran la interfaz.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#ff6b4a] shrink-0 mt-1" />
                    <div>
                      <strong className="text-white block mb-1 text-lg">MCP Clients (Clientes)</strong>
                      <p className="text-gray-400">El código dentro del Host que mantiene la comunicación bidireccional con los servidores.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#ff6b4a] shrink-0 mt-1" />
                    <div>
                      <strong className="text-white block mb-1 text-lg">MCP Servers (Servidores)</strong>
                      <p className="text-gray-400">Programas ligeros que exponen capacidades específicas. Por ejemplo, un "Servidor de PostgreSQL" que permite ejecutar consultas SQL.</p>
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
                    <p className="text-sm text-gray-400 leading-relaxed">Datos controlados por el servidor que el cliente puede leer. Piensa en ellos como archivos locales, respuestas de API o esquemas de bases de datos. Son de solo lectura.</p>
                  </div>
                  <div className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5">
                    <h4 className="text-[#ff6b4a] font-bold mb-3 text-lg">2. Tools</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">Funciones ejecutables que el modelo de IA puede decidir llamar. Ejemplos: <code className="text-xs bg-white/10 px-1 py-0.5 rounded">execute_sql</code>, <code className="text-xs bg-white/10 px-1 py-0.5 rounded">git_commit</code>. Permiten a la IA tomar acciones.</p>
                  </div>
                  <div className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5">
                    <h4 className="text-[#ff6b4a] font-bold mb-3 text-lg">3. Prompts</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">Plantillas predefinidas expuestas por el servidor. Ayudan a los usuarios a interactuar con los datos del servidor de manera óptima sin tener que escribir instrucciones complejas.</p>
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
            <p className="text-lg text-gray-400 mb-8">MCP es un protocolo universal. La forma de instalar un servidor depende del <strong>Host (Cliente)</strong> que utilices. A continuación, te mostramos cómo configurar un servidor MCP (ejemplo: SQLite) en los clientes más populares.</p>

            <div className="space-y-8">
              {/* Ejemplo Claude Desktop */}
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-[#ff6b4a]">Ejemplo A:</span> Claude Desktop
                </h3>
                
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-white mb-2">1. Localiza el archivo de configuración</h4>
                  <p className="text-gray-400 mb-3">Edita el archivo <code className="text-sm bg-white/10 px-1.5 py-0.5 rounded text-gray-300">claude_desktop_config.json</code> en las siguientes rutas:</p>
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
                  <p className="text-gray-400 mb-3">Agrega la configuración JSON apuntando al servidor que deseas usar:</p>
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

                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">3. Reinicia y Prueba</h4>
                  <p className="text-gray-400">Cierra completamente Claude y vuelve a abrirlo. Verás un nuevo ícono (enchufe/martillo) indicando que las herramientas están conectadas.</p>
                </div>
              </div>

              {/* Ejemplo Cursor IDE */}
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="text-[#ff6b4a]">Ejemplo B:</span> Cursor IDE
                </h3>
                <p className="text-gray-400 mb-6">En editores de código modernos como Cursor, la integración suele tener una interfaz gráfica (GUI) nativa:</p>
                
                <ol className="space-y-4 text-gray-300 list-decimal list-inside marker:text-[#ff6b4a] marker:font-bold">
                  <li className="pl-2">
                    Abre la configuración: <strong className="text-white">Cursor Settings</strong> {'>'} <strong className="text-white">Features</strong> {'>'} <strong className="text-white">MCP</strong>.
                  </li>
                  <li className="pl-2">
                    Haz clic en el botón <strong className="text-white">+ Add New MCP Server</strong>.
                  </li>
                  <li className="pl-2">
                    Completa el formulario:
                    <ul className="list-disc list-inside ml-6 mt-2 space-y-1 text-gray-400">
                      <li><strong>Name:</strong> <code className="text-xs bg-white/10 px-1 py-0.5 rounded">mi-base-datos</code></li>
                      <li><strong>Type:</strong> <code className="text-xs bg-white/10 px-1 py-0.5 rounded">command</code></li>
                      <li><strong>Command:</strong> <code className="text-xs bg-white/10 px-1 py-0.5 rounded">npx -y @modelcontextprotocol/server-sqlite /ruta/db.sqlite</code></li>
                    </ul>
                  </li>
                  <li className="pl-2">
                    Guarda los cambios. Cursor se conectará automáticamente al servidor y la IA del editor podrá consultar tu base de datos.
                  </li>
                </ol>
              </div>
              
              {/* Otros clientes */}
              <div className="bg-gradient-to-r from-[#ff6b4a]/10 to-transparent p-6 rounded-2xl border border-[#ff6b4a]/20">
                <h4 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-[#ff6b4a]" /> Otros Clientes Compatibles
                </h4>
                <p className="text-sm text-gray-400">
                  El ecosistema crece a diario. Herramientas como <strong>Zed</strong>, <strong>Windsurf</strong>, <strong>Sourcegraph Cody</strong> y frameworks como <strong>LangChain</strong> o <strong>LlamaIndex</strong> ya soportan MCP. La lógica siempre es la misma: indicarle al cliente qué comando ejecutar para levantar el servidor.
                </p>
              </div>
            </div>
          </div>
        );

      case 'arquitectura':
        return (
          <div className="max-w-4xl animate-in fade-in duration-500">
            <h1 className="text-4xl font-bold mb-6 text-white">Arquitectura y Seguridad</h1>
            <p className="text-lg text-gray-400 mb-8">MCP fue diseñado desde cero con la seguridad y la privacidad como pilares fundamentales. Entender su arquitectura te dará la confianza para desplegarlo en entornos empresariales.</p>
            
            <div className="space-y-8">
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Network className="text-[#ff6b4a]" /> Capa de Transporte
                </h3>
                <p className="text-gray-400 mb-6">MCP soporta múltiples mecanismos de transporte para adaptarse a diferentes entornos:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5">
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2"><Terminal className="w-5 h-5 text-[#ff6b4a]"/> Standard I/O (stdio)</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">Ideal para servidores locales. El cliente lanza el servidor como un subproceso y se comunican a través de la entrada/salida estándar. Máxima seguridad ya que no hay puertos de red abiertos.</p>
                  </div>
                  <div className="bg-[#0a0a0a] p-6 rounded-xl border border-white/5">
                    <h4 className="text-white font-bold mb-3 flex items-center gap-2"><Globe className="w-5 h-5 text-[#ff6b4a]"/> Server-Sent Events (SSE)</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">Para integraciones remotas. Utiliza HTTP para enviar mensajes del cliente al servidor y SSE para las respuestas del servidor. Útil para arquitecturas distribuidas.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#141414] border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <Shield className="text-[#ff6b4a]" /> Modelo de Confianza y Seguridad
                </h3>
                <ul className="space-y-6 text-gray-300">
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#ff6b4a] shrink-0 mt-1" />
                    <div>
                      <strong className="text-white block mb-1 text-lg">Control Centrado en el Usuario</strong>
                      <p className="text-gray-400 text-sm leading-relaxed">Los servidores MCP no pueden iniciar acciones por sí mismos ni enviar datos a internet de forma autónoma. Solo responden a las solicitudes explícitas del Host (ej. Claude).</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <CheckCircle2 className="w-6 h-6 text-[#ff6b4a] shrink-0 mt-1" />
                    <div>
                      <strong className="text-white block mb-1 text-lg">Consentimiento Explícito</strong>
                      <p className="text-gray-400 text-sm leading-relaxed">Cuando una IA decide usar una herramienta (como ejecutar un script o borrar un archivo), el Host requiere que el usuario apruebe la acción manualmente, previniendo operaciones destructivas no deseadas.</p>
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
            <h1 className="text-4xl font-bold mb-6 text-white">Servidores y Herramientas</h1>
            <p className="text-lg text-gray-400 mb-8">El ecosistema de MCP está creciendo exponencialmente. Aquí tienes los servidores más importantes que puedes empezar a usar hoy mismo.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-[#141414] p-6 rounded-2xl border border-white/10 hover:border-[#ff6b4a]/50 transition-colors">
                <Database className="w-8 h-8 text-[#ff6b4a] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Bases de Datos</h3>
                <p className="text-sm text-gray-400 mb-4">Permite a la IA consultar, analizar y visualizar datos directamente desde tus bases de datos.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">PostgreSQL</span>
                  <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">SQLite</span>
                  <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">MySQL</span>
                </div>
              </div>
              
              <div className="bg-[#141414] p-6 rounded-2xl border border-white/10 hover:border-[#ff6b4a]/50 transition-colors">
                <Code2 className="w-8 h-8 text-[#ff6b4a] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Desarrollo de Software</h3>
                <p className="text-sm text-gray-400 mb-4">Conecta tu entorno de desarrollo para que la IA lea repositorios, revise PRs y analice código.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">GitHub</span>
                  <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">GitLab</span>
                  <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">File System</span>
                </div>
              </div>

              <div className="bg-[#141414] p-6 rounded-2xl border border-white/10 hover:border-[#ff6b4a]/50 transition-colors">
                <MessageCircle className="w-8 h-8 text-[#ff6b4a] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Comunicación</h3>
                <p className="text-sm text-gray-400 mb-4">Integra la IA en tus canales de comunicación para resumir hilos o buscar información histórica.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">Slack</span>
                  <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">Discord</span>
                </div>
              </div>

              <div className="bg-[#141414] p-6 rounded-2xl border border-white/10 hover:border-[#ff6b4a]/50 transition-colors">
                <FileText className="w-8 h-8 text-[#ff6b4a] mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">Productividad</h3>
                <p className="text-sm text-gray-400 mb-4">Accede a tus documentos, notas y wikis corporativas para generar respuestas contextualizadas.</p>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">Google Drive</span>
                  <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">Notion</span>
                  <span className="text-xs bg-white/5 px-2 py-1 rounded text-gray-300">Confluence</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#ff6b4a]/20 to-transparent p-8 rounded-2xl border border-[#ff6b4a]/30">
              <h3 className="text-xl font-bold text-white mb-2">¿Quieres crear el tuyo?</h3>
              <p className="text-gray-300 mb-4">Anthropic proporciona SDKs oficiales para facilitar la creación de servidores personalizados.</p>
              <div className="flex flex-wrap gap-4">
                <code className="bg-[#0a0a0a] px-3 py-1.5 rounded text-sm text-[#ff6b4a] border border-white/5">npm install @modelcontextprotocol/sdk</code>
                <code className="bg-[#0a0a0a] px-3 py-1.5 rounded text-sm text-[#ff6b4a] border border-white/5">pip install mcp</code>
              </div>
            </div>
          </div>
        );

      case 'ejemplos':
        return (
          <div className="max-w-4xl animate-in fade-in duration-500">
            <h1 className="text-4xl font-bold mb-6 text-white">Ejemplos de Uso en el Mundo Real</h1>
            <p className="text-lg text-gray-400 mb-8">Descubre cómo los profesionales están utilizando MCP para multiplicar su productividad.</p>

            <div className="space-y-6">
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#ff6b4a]/20 rounded-xl flex items-center justify-center">
                    <Database className="w-6 h-6 text-[#ff6b4a]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Analista de Datos Autónomo</h3>
                    <p className="text-gray-400 text-sm">Conectando Claude a PostgreSQL</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  En lugar de exportar CSVs, un analista conecta Claude Desktop a su base de datos local usando el servidor MCP de Postgres.
                </p>
                <div className="bg-[#0a0a0a] p-5 rounded-xl border border-white/5 space-y-4">
                  <div>
                    <strong className="text-[#ff6b4a] text-sm uppercase tracking-wider block mb-1">Prompt del usuario:</strong>
                    <em className="text-gray-300">"Analiza las ventas del Q3. Encuentra los 3 productos con mayor caída en retención y genérame un reporte."</em>
                  </div>
                  <div>
                    <strong className="text-[#ff6b4a] text-sm uppercase tracking-wider block mb-1">Acción de la IA:</strong>
                    <span className="text-gray-400 text-sm">La IA inspecciona el esquema de la BD de forma autónoma, escribe la consulta SQL correcta, la ejecuta a través de MCP, lee los resultados y redacta el reporte final.</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#141414] border border-white/10 rounded-2xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#ff6b4a]/20 rounded-xl flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-[#ff6b4a]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Onboarding de Código Instantáneo</h3>
                    <p className="text-gray-400 text-sm">Conectando Cursor IDE a GitHub MCP</p>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Un desarrollador entra a un nuevo proyecto masivo. Configura el servidor MCP de GitHub para entender el contexto rápidamente.
                </p>
                <div className="bg-[#0a0a0a] p-5 rounded-xl border border-white/5 space-y-4">
                  <div>
                    <strong className="text-[#ff6b4a] text-sm uppercase tracking-wider block mb-1">Prompt del usuario:</strong>
                    <em className="text-gray-300">"Revisa los últimos 5 Pull Requests cerrados en el repositorio frontend y explícame cuál es el patrón actual para el manejo de estado."</em>
                  </div>
                  <div>
                    <strong className="text-[#ff6b4a] text-sm uppercase tracking-wider block mb-1">Acción de la IA:</strong>
                    <span className="text-gray-400 text-sm">La IA utiliza la herramienta de búsqueda de GitHub, lee el código de los PRs recientes, analiza las discusiones y entrega un resumen arquitectónico preciso.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'consejos':
        return (
          <div className="max-w-4xl animate-in fade-in duration-500">
            <h1 className="text-4xl font-bold mb-6 text-white">Consejos Pro y Debugging</h1>
            <p className="text-lg text-gray-400 mb-8">Domina las herramientas avanzadas para desarrollar y depurar tus integraciones MCP.</p>

            <div className="bg-[#141414] border border-white/10 rounded-2xl p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Bug className="text-[#ff6b4a]" /> El Inspector MCP
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Anthropic ha creado una herramienta oficial para probar tus servidores MCP de forma aislada, sin necesidad de conectarlos a Claude Desktop. Es fundamental para el desarrollo.
              </p>
              <div className="bg-[#0a0a0a] p-4 rounded-xl border border-white/5 mb-4">
                <code className="text-[#ff6b4a] font-mono text-sm">npx @modelcontextprotocol/inspector &lt;comando-de-tu-servidor&gt;</code>
              </div>
              <p className="text-sm text-gray-500">Esto abrirá una interfaz web local donde podrás ver exactamente qué Resources, Tools y Prompts está exponiendo tu servidor, y probarlos manualmente.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-white mb-3">Descripciones Claras</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  El LLM decide qué herramienta usar basándose en la descripción que le das en el código. Escribe descripciones detalladas para tus Tools, incluyendo qué parámetros esperan y en qué casos deben usarse.
                </p>
              </div>
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-white mb-3">Manejo de Errores</h4>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Si una Tool falla (ej. error de SQL), no hagas que el servidor crashee. Devuelve el mensaje de error como texto al LLM. Las IAs son excelentes leyendo errores y corrigiendo su propia consulta para intentarlo de nuevo.
                </p>
              </div>
            </div>
          </div>
        );

      case 'faq':
        return (
          <div className="max-w-4xl animate-in fade-in duration-500">
            <h1 className="text-4xl font-bold mb-6 text-white">Preguntas Frecuentes</h1>
            <p className="text-lg text-gray-400 mb-8">Resolvemos las dudas más comunes sobre el Model Context Protocol.</p>

            <div className="space-y-4">
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">¿MCP es exclusivo de Anthropic / Claude?</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  No. Aunque fue creado por Anthropic, MCP es un estándar de código abierto. Cualquier empresa puede implementar soporte para MCP en sus modelos o aplicaciones. Herramientas como Cursor, Zed y Windsurf ya lo soportan de forma nativa.
                </p>
              </div>
              
              <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">¿Tiene algún costo usar MCP?</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  El protocolo en sí, los SDKs y los servidores de código abierto son 100% gratuitos. Sin embargo, si usas MCP a través de Claude Desktop u otra IA, estarás consumiendo los límites de uso o tokens de esa IA específica.
                </p>
              </div>

              <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">¿Es seguro darle acceso a mi base de datos a la IA?</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  MCP está diseñado con el "control del usuario" en mente. La IA no puede ejecutar acciones por su cuenta. Para operaciones de lectura (Resources), la IA solo ve lo que el servidor expone. Para operaciones de escritura o ejecución (Tools), interfaces como Claude Desktop te pedirán confirmación explícita (un botón de "Aprobar") antes de ejecutar la acción. Además, puedes configurar tu servidor MCP con credenciales de solo lectura.
                </p>
              </div>

              <div className="bg-[#141414] border border-white/10 rounded-2xl p-6">
                <h3 className="text-lg font-bold text-white mb-3">¿Necesito saber programar para usarlo?</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Para usar servidores existentes (como conectar tu Google Drive o SQLite), solo necesitas copiar y pegar unas líneas de configuración JSON. No necesitas programar. Sin embargo, si quieres crear un conector personalizado para la API interna de tu empresa, sí necesitarás conocimientos básicos de TypeScript o Python.
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
    <div className="flex min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#ff6b4a]/30 selection:text-white">
      
      {/* Mobile Header */}
      <header className="lg:hidden flex items-center justify-between p-4 border-b border-white/10 bg-[#0a0a0a]/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#ff6b4a] to-[#ff3300] rounded-lg flex items-center justify-center">
            <Terminal className="text-white w-4 h-4" />
          </div>
          <span className="font-bold text-lg tracking-tight">MCP<span className="text-[#ff6b4a]">Guide</span></span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="p-2 text-gray-400 hover:text-white bg-white/5 rounded-lg cursor-pointer"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-72 bg-[#0a0a0a] border-r border-white/5 flex flex-col z-40
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-6 hidden lg:block">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b4a] to-[#ff3300] rounded-xl flex items-center justify-center shadow-lg shadow-[#ff6b4a]/20">
              <Terminal className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-2xl tracking-tight">MCP<span className="text-[#ff6b4a]">Guide</span></span>
          </div>
          <p className="text-[10px] text-gray-500 font-mono uppercase tracking-widest mt-4 ml-1">Guía Oficial 2026</p>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-4 lg:pt-0 mt-16 lg:mt-0 space-y-1 custom-scrollbar">
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
        
        <div className="p-4 border-t border-white/5">
          <div className="bg-[#141414] rounded-xl p-4 border border-white/5 text-center">
            <p className="text-xs text-gray-400 mb-2">¿Necesitas ayuda avanzada?</p>
            <a href="#" className="text-sm text-[#ff6b4a] hover:text-[#ff8f75] font-medium transition-colors">
              Únete a la Comunidad &rarr;
            </a>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-12 px-6 lg:pt-16 lg:px-16 lg:pb-24 overflow-x-hidden">
        {renderContent()}
      </main>

    </div>
  );
}
