"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, Upload, Sparkles, RefreshCw, AlertCircle, CheckCircle2, Droplets, Info, Crosshair } from "lucide-react";
import { analyzeSkin, AnalysisResult } from "../actions/skin-analysis-actions";
import { NitroBookingModal } from "./nitro-booking-modal";

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

enum AppState {
  IDLE = 'IDLE',
  SCANNING = 'SCANNING',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}

export function SkinAnalysisIsland() {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [image, setImage] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [visibleHotspots, setVisibleHotspots] = useState<string[]>([]);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
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

    // Actual API Call
    const apiPromise = analyzeSkin(imgBase64);

    // Simulated progress for UX
    let currentProgress = 0;
    const progressTimer = setInterval(() => {
      currentProgress += 1;
      if (currentProgress <= 99) {
        setProgress(currentProgress);
      }
    }, 60);

    try {
      const analysisResult = await apiPromise;

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
      setError("No pudimos procesar tu imagen. Asegúrate de que tu rostro esté despejado y con buena iluminación.");
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
    <div className="w-full relative z-10">
      <NitroBookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} />

      {state === AppState.IDLE && (
        <div className="text-center space-y-12 animate-in fade-in slide-in-from-top-4 duration-1000 py-12 md:py-24">
          <div className="space-y-6">
            <span className="bg-stone-50 border border-stone-200 text-stone-500 px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase">
              Estética de Nueva Generación
            </span>
            <h1 className="text-5xl md:text-7xl font-bold text-zinc-900 leading-tight">
              Análisis Facial <br />
              <span className="italic text-[#b4a496] font-normal font-serif">Inteligente</span>
            </h1>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
              Nuestra tecnología avanzada de IA escanea tu rostro para sugerir rituales de belleza personalizados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto px-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="group p-12 bg-white border border-stone-200 rounded-[2.5rem] hover:border-[#b4a496] hover:shadow-xl transition-all flex flex-col items-center gap-6"
            >
              <div className="w-20 h-20 bg-stone-50 rounded-3xl flex items-center justify-center group-hover:bg-[#b4a496] transition-all transform group-hover:rotate-6">
                <Upload className="w-10 h-10 text-[#b4a496] group-hover:text-white" />
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-2xl font-bold text-zinc-800">Subir Foto</h3>
                <p className="text-sm text-zinc-400">Desde tu dispositivo</p>
              </div>
            </button>

            <button
              onClick={() => fileInputRef.current?.click()}
              className="group p-12 bg-white border border-stone-200 rounded-[2.5rem] hover:border-[#b4a496] hover:shadow-xl transition-all flex flex-col items-center gap-6"
            >
              <div className="w-20 h-20 bg-stone-50 rounded-3xl flex items-center justify-center group-hover:bg-[#b4a496] transition-all transform group-hover:-rotate-6">
                <Camera className="w-10 h-10 text-[#b4a496] group-hover:text-white" />
              </div>
              <div className="space-y-2 text-center">
                <h3 className="text-2xl font-bold text-zinc-800">Usar Cámara</h3>
                <p className="text-sm text-zinc-400">Captura frontal en vivo</p>
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
        <div className="flex flex-col items-center justify-center space-y-12 py-12 md:py-24 animate-in fade-in duration-500">
          <div className="relative w-full max-w-sm md:max-w-md aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl border-[8px] border-white ring-1 ring-stone-200 bg-black">
            {image && (
              <img src={image} alt="Procesando rostro" className="w-full h-full object-cover transition-all duration-1000 brightness-75 scale-105" />
            )}

            <div className="absolute inset-0 z-10 overflow-hidden">
               <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#b4a496] to-transparent shadow-[0_0_20px_#b4a496] top-0 animate-[scan_3s_linear_infinite]"></div>

              {/* Hotspots Dinámicos */}
              {HOTSPOTS.map((hotspot) => (
                <div
                  key={hotspot.id}
                  className={`absolute transition-all duration-700 transform ${visibleHotspots.includes(hotspot.id) ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}
                  style={{ top: hotspot.top, left: hotspot.left }}
                >
                  <div className="relative group pointer-events-none">
                    <div className="w-5 h-5 border-2 border-[#b4a496] rounded-full animate-ping absolute"></div>
                    <div className="w-2 h-2 bg-[#b4a496] rounded-full absolute top-1.5 left-1.5"></div>
                    <div className="absolute left-7 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black/70 backdrop-blur-md text-white text-[10px] px-3 py-1 rounded-full border border-white/20 font-semibold tracking-wide uppercase">
                      {hotspot.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Central Radar */}
            <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none opacity-50">
              <div className="w-48 h-48 border border-white/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute w-64 h-64 border border-white/10 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
              <Crosshair className="absolute w-10 h-10 text-white/40 animate-pulse" />
            </div>
          </div>

          <div className="w-full max-w-lg text-center space-y-8 px-4">
            <div className="space-y-4">
              <div className="flex justify-between text-xs font-black tracking-[0.2em] text-[#b4a496] uppercase mb-1">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-[#b4a496] rounded-full animate-pulse"></span>
                  {SCAN_STEPS[activeStep]}
                </span>
                <span>{progress}%</span>
              </div>
              <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#d1c2b4] via-[#b4a496] to-[#a39385] transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                >
                </div>
              </div>
            </div>
            <p className="text-zinc-400 italic text-sm font-medium">Mantén esta pestaña abierta mientras procesamos la biometría facial...</p>
          </div>
        </div>
      )}

      {state === AppState.RESULTS && result && (
        <div className="py-12 md:py-24 space-y-12 animate-in slide-in-from-bottom-12 duration-1000 px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-1 space-y-8">
              <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-stone-100">
                <div className="relative w-full aspect-square rounded-[2.5rem] overflow-hidden mb-8 ring-8 ring-stone-50">
                  <img src={image!} alt="Tu Perfil" className="w-full h-full object-cover" />
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-md text-[#b4a496] px-5 py-2 rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 shadow-xl border border-stone-100">
                    <CheckCircle2 className="w-4 h-4" /> DIAGNÓSTICO FINALIZADO
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-stone-100 pb-4">
                    <span className="text-zinc-400 text-sm font-semibold uppercase tracking-wider">Tipo de Piel</span>
                    <span className="font-bold text-lg text-[#b4a496] italic font-serif capitalize">{result.skinType}</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-400 text-xs font-black uppercase tracking-widest">Salud Cutánea</span>
                      <span className="font-bold text-zinc-800">{result.overallHealthScore}%</span>
                    </div>
                    <div className="w-full h-3 bg-stone-100 rounded-full overflow-hidden p-0.5">
                      <div
                        className={`h-full rounded-full transition-all duration-1500 ease-out shadow-sm ${result.overallHealthScore > 80 ? 'bg-emerald-400' :
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
                <h3 className="font-bold text-2xl mb-6 flex items-center gap-3 font-serif italic">
                  Recomendación Experta
                </h3>
                <p className="text-base leading-relaxed text-[#fefefe] italic font-light">
                  "{result.expertAdvice}"
                </p>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-12">
              <section>
                <div className="flex items-center justify-between mb-8 border-b border-stone-200 pb-4">
                  <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-4 font-serif text-zinc-900">
                    <span className="bg-[#b4a496] text-white p-2.5 rounded-2xl shadow-lg shadow-[#b4a496]/20"><Info className="w-6 h-6" /></span>
                    Hallazgos Clínicos
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {result.concerns.map((concern, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[2rem] border border-stone-200 hover:border-[#b4a496] hover:shadow-xl transition-all group relative overflow-hidden">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-bold text-xl text-zinc-800 group-hover:text-[#b4a496] transition-colors pr-4">{concern.name}</h4>
                        <span className={`text-[10px] px-3 py-1 rounded-full font-black tracking-tighter shadow-sm border ${concern.severity === 'high' ? 'bg-rose-50 text-rose-500 border-rose-100' :
                            concern.severity === 'medium' ? 'bg-amber-50 text-amber-500 border-amber-100' :
                              'bg-emerald-50 text-emerald-500 border-emerald-100'
                          }`}>
                          {concern.severity === 'high' ? 'PRIORIDAD ALTA' : concern.severity === 'medium' ? 'PRIORIDAD MEDIA' : 'ÓPTIMO'}
                        </span>
                      </div>
                      <p className="text-zinc-500 leading-relaxed text-sm">{concern.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <div className="flex items-center justify-between mb-8 border-b border-stone-200 pb-4">
                  <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-4 font-serif text-zinc-900">
                    <span className="bg-[#b4a496] text-white p-2.5 rounded-2xl shadow-lg shadow-[#b4a496]/20"><Droplets className="w-6 h-6" /></span>
                    Rituales Sugeridos
                  </h2>
                </div>
                <div className="space-y-6">
                  {result.treatments.map((treatment, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-[2.5rem] border border-stone-200 flex flex-col md:flex-row gap-8 items-center group hover:shadow-2xl transition-all">
                      <div className="bg-stone-50 w-24 h-24 rounded-3xl flex items-center justify-center shrink-0 group-hover:bg-[#b4a496] transition-all transform group-hover:scale-105">
                        <Sparkles className="w-12 h-12 text-[#b4a496] group-hover:text-white" />
                      </div>
                      <div className="flex-grow text-center md:text-left space-y-3">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                          <h4 className="font-bold text-2xl text-zinc-800 tracking-tight font-serif">{treatment.title}</h4>
                          <span className="inline-flex items-center gap-2 text-[10px] text-[#b4a496] font-black tracking-widest bg-stone-50 px-4 py-1.5 rounded-full border border-stone-200">
                            <RefreshCw className="w-3 h-3" /> {treatment.duration.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-zinc-500 text-base leading-relaxed">{treatment.benefits}</p>
                      </div>
                      <button
                        onClick={() => setIsBookingOpen(true)}
                        className="w-full md:w-auto px-10 py-4 bg-black text-white rounded-[1.5rem] text-sm font-black tracking-widest hover:bg-[#b4a496] transition-all transform hover:-translate-y-1 shadow-2xl shadow-black/10"
                      >
                        AGENDAR
                      </button>
                    </div>
                  ))}
                </div>
              </section>

              <div className="pt-12 flex justify-center border-t border-stone-200">
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
        <div className="max-w-xl mx-auto text-center space-y-10 py-20 animate-in zoom-in-95 duration-500 bg-white p-12 rounded-[4rem] shadow-xl border border-rose-100 mt-12 mb-12">
          <div className="w-28 h-28 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-500 ring-8 ring-rose-50/50">
            <AlertCircle className="w-14 h-14" />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-zinc-800 font-serif">Atención Necesaria</h2>
            <p className="text-lg text-zinc-500 leading-relaxed font-medium">{error}</p>
          </div>
          <div className="flex flex-col items-center gap-5">
            <button
              onClick={reset}
              className="px-14 py-5 bg-[#b4a496] text-white rounded-[2rem] font-black tracking-widest hover:bg-[#a39385] transition-all shadow-xl shadow-[#b4a496]/30 transform hover:-translate-y-1"
            >
              REINTENTAR ESCANEO
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
