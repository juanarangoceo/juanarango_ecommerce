
import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Camera, Upload, Sparkles, RefreshCw, AlertCircle, CheckCircle2, Droplets, User, Info, Crosshair } from 'lucide-react';
import { AppState, AnalysisResult } from './types';
import { analyzeFace } from './geminiService';

const SCAN_STEPS = [
  "Detectando contornos faciales...",
  "Analizando niveles de hidratación...",
  "Escaneando densidad de poros...",
  "Evaluando líneas de expresión...",
  "Midiendo pigmentación y tono...",
  "Calculando elasticidad dérmica...",
  "Sincronizando diagnóstico con IA..."
];

const HOTSPOTS = [
  { id: 'forehead', top: '20%', left: '50%', label: 'Frente' },
  { id: 'l-eye', top: '35%', left: '35%', label: 'Contorno Izq' },
  { id: 'r-eye', top: '35%', left: '65%', label: 'Contorno Der' },
  { id: 'nose', top: '50%', left: '50%', label: 'Zona T' },
  { id: 'l-cheek', top: '60%', left: '30%', label: 'Mejilla Izq' },
  { id: 'r-cheek', top: '60%', left: '70%', label: 'Mejilla Der' },
  { id: 'chin', top: '80%', left: '50%', label: 'Mentón' },
];

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [image, setImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [visibleHotspots, setVisibleHotspots] = useState<string[]>([]);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state === AppState.SCANNING) {
      // Manage steps based on progress
      const stepIdx = Math.min(Math.floor((progress / 100) * SCAN_STEPS.length), SCAN_STEPS.length - 1);
      setActiveStep(stepIdx);

      // Manage hotspots visibility - they appear sequentially
      const hotspotCount = Math.floor((progress / 100) * (HOTSPOTS.length + 2)); 
      const currentHotspots = HOTSPOTS.slice(0, hotspotCount).map(h => h.id);
      setVisibleHotspots(currentHotspots);
    }
  }, [progress, state]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const base64 = event.target?.result as string;
      setImage(base64);
      startAnalysis(base64);
    };
    reader.readAsDataURL(file);
  };

  const startAnalysis = async (imgBase64: string) => {
    setState(AppState.SCANNING);
    setError(null);
    setProgress(0);
    setVisibleHotspots([]);

    // We use a promise for the API call
    const apiPromise = analyzeFace(imgBase64);
    
    // We simulate a smooth progress bar
    let currentProgress = 0;
    const progressTimer = setInterval(() => {
      currentProgress += 1;
      if (currentProgress <= 99) {
        setProgress(currentProgress);
      }
    }, 60); // Total ~6 seconds for 100%

    try {
      const analysisResult = await apiPromise;
      
      // Once API is done, we wait for progress to reach at least 90 for visual effect
      // then we jump to 100 and show results
      const finalize = () => {
        clearInterval(progressTimer);
        setProgress(100);
        setTimeout(() => {
          setResult(analysisResult);
          setState(AppState.RESULTS);
        }, 600);
      };

      if (currentProgress >= 90) {
        finalize();
      } else {
        // If API was super fast, wait a bit to show animation
        const remainingWait = setInterval(() => {
          if (currentProgress >= 95) {
            clearInterval(remainingWait);
            finalize();
          }
        }, 100);
      }
      
    } catch (err) {
      clearInterval(progressTimer);
      console.error(err);
      setError("No pudimos procesar tu imagen. Asegúrate de que tu rostro esté despejado, con buena iluminación y de frente a la cámara.");
      setState(AppState.ERROR);
    }
  };

  const reset = () => {
    setState(AppState.IDLE);
    setImage(null);
    setResult(null);
    setProgress(0);
    setActiveStep(0);
    setVisibleHotspots([]);
    setError(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6] text-[#4a4a4a]">
      {/* Header */}
      <header className="py-6 px-4 md:px-8 flex justify-between items-center border-b border-[#e5e1da] bg-white sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-[#b4a496] p-2 rounded-full">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight serif uppercase">AuraScan AI</span>
        </div>
        <button className="hidden md:block px-6 py-2 bg-[#b4a496] text-white rounded-full hover:bg-[#a39385] transition-all text-sm font-semibold tracking-wide shadow-md">
          RESERVAR CITA
        </button>
      </header>

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-12">
        {state === AppState.IDLE && (
          <div className="text-center space-y-12 animate-in fade-in slide-in-from-top-4 duration-1000">
            <div className="space-y-6">
              <span className="bg-[#f5f2ed] text-[#b4a496] px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">Estética de Nueva Generación</span>
              <h1 className="text-5xl md:text-7xl font-bold text-[#2d2d2d] leading-tight">
                Análisis Facial <br/><span className="italic text-[#b4a496] font-normal">Inteligente</span>
              </h1>
              <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
                Nuestra tecnología avanzada de IA escanea tu rostro para detectar imperfecciones, niveles de hidratación y sugerir rituales de belleza personalizados.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="group p-12 bg-white border border-[#e5e1da] rounded-[2.5rem] hover:border-[#b4a496] hover:shadow-xl transition-all flex flex-col items-center gap-6"
              >
                <div className="w-20 h-20 bg-[#f5f2ed] rounded-3xl flex items-center justify-center group-hover:bg-[#b4a496] transition-all transform group-hover:rotate-6">
                  <Upload className="w-10 h-10 text-[#b4a496] group-hover:text-white" />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-2xl font-bold">Subir Foto</h3>
                  <p className="text-sm text-gray-400">Desde tu carrete de fotos</p>
                </div>
              </button>

              <button 
                onClick={() => fileInputRef.current?.click()}
                className="group p-12 bg-white border border-[#e5e1da] rounded-[2.5rem] hover:border-[#b4a496] hover:shadow-xl transition-all flex flex-col items-center gap-6"
              >
                <div className="w-20 h-20 bg-[#f5f2ed] rounded-3xl flex items-center justify-center group-hover:bg-[#b4a496] transition-all transform group-hover:-rotate-6">
                  <Camera className="w-10 h-10 text-[#b4a496] group-hover:text-white" />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-2xl font-bold">Usar Cámara</h3>
                  <p className="text-sm text-gray-400">Captura frontal en vivo</p>
                </div>
              </button>
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleImageUpload} 
              accept="image/*" 
              className="hidden" 
              capture="user"
            />
          </div>
        )}

        {state === AppState.SCANNING && (
          <div className="flex flex-col items-center justify-center space-y-12 py-6 animate-in fade-in duration-500">
            <div className="relative w-full max-w-md aspect-[3/4] rounded-[3rem] overflow-hidden shadow-[0_32px_64px_-12px_rgba(0,0,0,0.15)] border-[12px] border-white ring-1 ring-gray-100">
              {image && (
                <img src={image} alt="Procesando rostro" className="w-full h-full object-cover transition-all duration-1000 brightness-75 scale-105" />
              )}
              
              <div className="absolute inset-0 z-10">
                <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#b4a496] to-transparent shadow-[0_0_20px_#b4a496] scan-line top-0 pointer-events-none"></div>
                
                {/* Hotspots Dinámicos */}
                {HOTSPOTS.map((hotspot) => (
                  <div 
                    key={hotspot.id}
                    className={`absolute transition-all duration-700 transform ${visibleHotspots.includes(hotspot.id) ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                    style={{ top: hotspot.top, left: hotspot.left }}
                  >
                    <div className="relative group">
                      <div className="w-5 h-5 hotspot-pulse"></div>
                      <div className="absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black/70 backdrop-blur-md text-white text-[11px] px-3 py-1 rounded-full border border-white/20 font-semibold tracking-wide uppercase">
                        {hotspot.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Central Radar */}
              <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                 <div className="w-56 h-56 border border-white/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                 <div className="absolute w-72 h-72 border border-white/10 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
                 <Crosshair className="absolute w-10 h-10 text-white/40 animate-pulse" />
              </div>
            </div>

            <div className="w-full max-w-lg text-center space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between text-xs font-black tracking-[0.2em] text-[#b4a496] uppercase mb-1">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-[#b4a496] rounded-full animate-pulse"></span>
                    {SCAN_STEPS[activeStep]}
                  </span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full h-4 bg-[#e5e1da] rounded-full overflow-hidden p-1 shadow-inner ring-1 ring-[#e5e1da]">
                  <div 
                    className="h-full bg-gradient-to-r from-[#d1c2b4] via-[#b4a496] to-[#a39385] rounded-full transition-all duration-300 ease-out relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.1)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.1)_50%,rgba(255,255,255,0.1)_75%,transparent_75%,transparent)] bg-[length:40px_40px] animate-[scroll_2s_linear_infinite]"></div>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 italic text-sm font-medium">Mantén la aplicación abierta mientras procesamos la biometría facial...</p>
            </div>
          </div>
        )}

        {state === AppState.RESULTS && result && (
          <div className="space-y-12 animate-in slide-in-from-bottom-12 duration-1000">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-1 space-y-8">
                 <div className="bg-white p-8 rounded-[3rem] shadow-2xl shadow-[#e5e1da]/40 border border-[#e5e1da]/50">
                    <div className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden mb-8 ring-8 ring-[#f5f2ed]">
                      <img src={image!} alt="Tu Perfil" className="w-full h-full object-cover" />
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md text-[#b4a496] px-5 py-2 rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 shadow-xl border border-[#e5e1da]">
                        <CheckCircle2 className="w-4 h-4" /> DIAGNÓSTICO FINALIZADO
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-[#f5f2ed] pb-4">
                        <span className="text-gray-400 text-sm font-semibold uppercase tracking-wider">Tipo de Piel</span>
                        <span className="font-bold text-lg text-[#b4a496] italic serif">{result.skinType}</span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-400 text-xs font-black uppercase tracking-widest">Salud Cutánea</span>
                          <span className="font-bold text-[#2d2d2d]">{result.overallHealthScore}%</span>
                        </div>
                        <div className="w-full h-3 bg-[#f5f2ed] rounded-full overflow-hidden p-0.5">
                          <div 
                            className={`h-full rounded-full transition-all duration-1500 ease-out shadow-sm ${
                                result.overallHealthScore > 80 ? 'bg-emerald-400' : 
                                result.overallHealthScore > 60 ? 'bg-amber-400' : 'bg-rose-400'
                            }`} 
                            style={{ width: `${result.overallHealthScore}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                 </div>

                 <div className="bg-[#b4a496] text-white p-10 rounded-[3rem] shadow-xl relative overflow-hidden group">
                    <Sparkles className="absolute -top-6 -right-6 w-32 h-32 text-white/10 group-hover:rotate-12 transition-transform duration-1000" />
                    <h3 className="font-bold text-2xl mb-6 flex items-center gap-3 serif italic">
                      Recomendación Experta
                    </h3>
                    <p className="text-base leading-relaxed text-[#fefefe] italic font-light">
                      "{result.expertAdvice}"
                    </p>
                 </div>
              </div>

              <div className="lg:col-span-2 space-y-12">
                <section>
                  <div className="flex items-center justify-between mb-8 border-b border-[#e5e1da] pb-4">
                    <h2 className="text-3xl font-bold flex items-center gap-4 serif">
                      <span className="bg-[#b4a496] text-white p-2.5 rounded-2xl shadow-lg shadow-[#b4a496]/20"><Info className="w-6 h-6" /></span>
                      Hallazgos Clínicos
                    </h2>
                    <span className="text-[10px] text-gray-400 font-black tracking-widest uppercase">Análisis Realizado Hoy</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {result.concerns.map((concern, idx) => (
                      <div key={idx} className="bg-white p-8 rounded-[2rem] border border-[#e5e1da] hover:border-[#b4a496] hover:shadow-xl transition-all group relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="font-bold text-xl text-gray-800 group-hover:text-[#b4a496] transition-colors pr-4">{concern.name}</h4>
                          <span className={`text-[10px] px-3 py-1 rounded-full font-black tracking-tighter shadow-sm border ${
                            concern.severity === 'high' ? 'bg-rose-50 text-rose-500 border-rose-100' :
                            concern.severity === 'medium' ? 'bg-amber-50 text-amber-500 border-amber-100' :
                            'bg-emerald-50 text-emerald-500 border-emerald-100'
                          }`}>
                            {concern.severity === 'high' ? 'PRIORIDAD ALTA' : concern.severity === 'medium' ? 'PRIORIDAD MEDIA' : 'ÓPTIMO'}
                          </span>
                        </div>
                        <p className="text-gray-500 leading-relaxed text-sm">{concern.description}</p>
                      </div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="flex items-center justify-between mb-8 border-b border-[#e5e1da] pb-4">
                    <h2 className="text-3xl font-bold flex items-center gap-4 serif">
                       <span className="bg-[#b4a496] text-white p-2.5 rounded-2xl shadow-lg shadow-[#b4a496]/20"><Droplets className="w-6 h-6" /></span>
                       Rituales Sugeridos
                    </h2>
                  </div>
                  <div className="space-y-6">
                    {result.treatments.map((treatment, idx) => (
                      <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-[#e5e1da] flex flex-col md:flex-row gap-8 items-center group hover:shadow-2xl transition-all">
                        <div className="bg-[#f5f2ed] w-24 h-24 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-[#b4a496] transition-all transform group-hover:scale-105">
                          <Sparkles className="w-12 h-12 text-[#b4a496] group-hover:text-white" />
                        </div>
                        <div className="flex-grow text-center md:text-left space-y-3">
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                            <h4 className="font-bold text-2xl text-gray-800 tracking-tight serif">{treatment.title}</h4>
                            <span className="inline-flex items-center gap-2 text-[10px] text-[#b4a496] font-black tracking-widest bg-[#f5f2ed] px-4 py-1.5 rounded-full border border-[#e5e1da]">
                                <RefreshCw className="w-3 h-3" /> {treatment.duration.toUpperCase()}
                            </span>
                          </div>
                          <p className="text-gray-500 text-base leading-relaxed">{treatment.benefits}</p>
                        </div>
                        <button className="w-full md:w-auto px-10 py-4 bg-black text-white rounded-[1.5rem] text-sm font-black tracking-widest hover:bg-[#b4a496] transition-all transform hover:-translate-y-1 shadow-2xl shadow-black/10">
                          AGENDAR
                        </button>
                      </div>
                    ))}
                  </div>
                </section>
                
                <div className="pt-12 flex justify-center border-t border-[#e5e1da]">
                  <button 
                    onClick={reset}
                    className="flex items-center gap-3 px-10 py-4 rounded-full border-2 border-[#b4a496] text-[#b4a496] hover:bg-[#b4a496] hover:text-white font-black tracking-widest uppercase transition-all shadow-md"
                  >
                    <RefreshCw className="w-5 h-5" /> Nuevo Escaneo
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {state === AppState.ERROR && (
          <div className="max-w-xl mx-auto text-center space-y-10 py-20 animate-in zoom-in-95 duration-500 bg-white p-12 rounded-[4rem] shadow-2xl border border-rose-100">
            <div className="w-28 h-28 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500 ring-8 ring-rose-50/50">
              <AlertCircle className="w-14 h-14" />
            </div>
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-800 serif">Atención Necesaria</h2>
              <p className="text-lg text-gray-500 leading-relaxed font-medium">{error}</p>
            </div>
            <div className="flex flex-col items-center gap-5">
               <button 
                onClick={reset}
                className="px-14 py-5 bg-[#b4a496] text-white rounded-[2rem] font-black tracking-widest hover:bg-[#a39385] transition-all shadow-xl shadow-[#b4a496]/30 transform hover:-translate-y-1"
              >
                REINTENTAR ESCANEO
              </button>
              <p className="text-xs text-gray-300 uppercase font-black tracking-widest">Revisa tu conexión a internet</p>
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t border-[#e5e1da] py-20 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="bg-[#b4a496] p-2.5 rounded-2xl shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-bold serif tracking-tighter uppercase">AuraScan AI</span>
            </div>
            <p className="text-gray-400 max-w-sm mx-auto md:mx-0 leading-relaxed font-medium">
              Transformando la experiencia estética a través del análisis de datos faciales y protocolos de bienestar premium.
            </p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-end gap-12 text-[10px] font-black text-gray-300 tracking-[0.3em] uppercase">
            <a href="#" className="hover:text-[#b4a496] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#b4a496] transition-colors">WhatsApp</a>
            <a href="#" className="hover:text-[#b4a496] transition-colors">Políticas</a>
          </div>
        </div>
        <div className="max-w-5xl mx-auto pt-16 mt-16 border-t border-[#f5f2ed] text-center text-[9px] text-gray-300 font-black tracking-[0.4em] uppercase">
          © 2024 Aura Esthetics & Spa Intelligence. Tecnología Facial Avanzada.
        </div>
      </footer>
    </div>
  );
};

export default App;
