'use client';

import { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Clock,
  BarChart,
  Check,
  Lock,
  Play,
  Users,
  ChevronDown,
  ChevronUp,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';
import { urlForImage } from '@/sanity/lib/image';
import { EarlyAccessModal } from './early-access-modal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface Modulo {
  titulo: string;
  lecciones?: string[];
}

interface CursoNode {
  _id: string;
  titulo: string;
  slug: { current: string };
  descripcionCorta: string;
  descripcionLarga?: string;
  imagen: any;
  categoria?: string[];
  temario?: string[];
  tiempoEstudio?: string;
  nivel?: string;
  precio?: number;
  precioAnterior?: number;
  esPago?: boolean;
  estado: 'disponible' | 'proximamente' | 'borrador';
  fechaLanzamiento?: string;
  destacado?: boolean;
  urlLanding?: string;
  urlVideo?: string;
  urlPago?: string;
  garantia?: string;
  valorTotal?: number;
  sloganOferta?: string;
  mensajeUrgencia?: string;
  publicoObjetivo?: string;
  contenido?: Modulo[];
}

export function CursoCard({ curso }: { curso: CursoNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoActive, setVideoActive] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isProximamente = curso.estado === 'proximamente';
  const isDisponible = curso.estado === 'disponible';
  const imageUrl = curso.imagen ? urlForImage(curso.imagen).width(1400).url() : '';

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);

  const getBadgeStyle = () => {
    if (isProximamente) return 'bg-amber-500/10 text-amber-500 border border-amber-500/20';
    if (isDisponible) return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20';
    return 'bg-zinc-500/10 text-zinc-500 border border-zinc-500/20';
  };

  const getNivelLabel = (nivel?: string) => {
    const labels: Record<string, string> = {
      principiante: 'Principiante',
      intermedio: 'Intermedio',
      avanzado: 'Avanzado',
      todos: 'Todos los niveles',
    };
    return labels[nivel ?? ''] ?? nivel;
  };

  const handlePlayClick = useCallback(() => {
    if (!curso.urlVideo) return;
    setVideoActive(true);
    setTimeout(() => {
      videoRef.current?.play();
    }, 50);
  }, [curso.urlVideo]);

  // Long description expand/collapse
  const DESC_PREVIEW_LENGTH = 260;
  const hasLongDesc = (curso.descripcionLarga?.length ?? 0) > DESC_PREVIEW_LENGTH;
  const descToShow =
    !descExpanded && hasLongDesc
      ? curso.descripcionLarga!.slice(0, DESC_PREVIEW_LENGTH) + '…'
      : curso.descripcionLarga;

  // How many modules to show unlocked vs locked
  const UNLOCKED_MODULES = 2;

  return (
    <>
      <div
        className={`w-full flex flex-col rounded-2xl overflow-hidden bg-zinc-900 border transition-all duration-300 group ${
          curso.destacado
            ? 'border-primary/40 ring-1 ring-primary/20 shadow-2xl shadow-primary/10'
            : 'border-zinc-800 hover:border-zinc-700'
        }`}
      >
        {/* ── Media: 16:9 aspect ratio container ── */}
        <div className="relative w-full aspect-video overflow-hidden bg-black flex items-center justify-center">
          {videoActive && curso.urlVideo ? (
            <video
              ref={videoRef}
              src={curso.urlVideo}
              controls
              playsInline
              preload="none"
              className="w-full h-full object-contain bg-black"
            />
          ) : (
            <>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={curso.titulo}
                  fill
                  sizes="(max-width: 768px) 100vw, 900px"
                  className="object-cover"
                  priority={curso.destacado}
                  loading={curso.destacado ? 'eager' : 'lazy'}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-700 text-sm">
                  Sin imagen
                </div>
              )}

              {/* ── Play button — visible, branded ── */}
              {curso.urlVideo && (
                <button
                  onClick={handlePlayClick}
                  aria-label="Reproducir video del curso"
                  className="absolute inset-0 flex items-center justify-center group/play"
                >
                  {/* Subtle gradient on hover */}
                  <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover/play:from-black/70 transition-colors duration-200" />

                  {/* Play button circle — primary color for brand recognition */}
                  <span className="relative flex flex-col items-center gap-2">
                    <span className="flex items-center justify-center w-20 h-20 rounded-full bg-primary shadow-2xl shadow-primary/50 border-4 border-white/20 group-hover/play:scale-110 group-hover/play:shadow-primary/70 transition-all duration-200">
                      <Play className="w-9 h-9 text-white fill-white ml-1" />
                    </span>
                    <span className="relative bg-black/70 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
                      Ver video
                    </span>
                  </span>
                </button>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2 pointer-events-none">
                {curso.categoria && curso.categoria.length > 0 && (
                  <span className="bg-black/70 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white rounded-full border border-white/10">
                    {curso.categoria[0].replace(/-/g, ' ').toUpperCase()}
                  </span>
                )}
                <span
                  className={`ml-auto px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md flex items-center gap-1.5 ${getBadgeStyle()}`}
                >
                  {isProximamente && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  )}
                  {isProximamente ? 'PRÓXIMAMENTE' : curso.estado.toUpperCase()}
                </span>
              </div>
            </>
          )}
        </div>

        {/* ── Content ── */}
        <div className="p-6 md:p-8 flex flex-col gap-6">

          {/* 1 · Título + hook corto */}
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-3">
              {curso.titulo}
            </h3>
            <p className="text-zinc-200 text-base leading-relaxed font-medium">
              {curso.descripcionCorta}
            </p>
          </div>

          {/* 2 · Accordion para revelar contenido progresivo */}
          <div className="border border-zinc-800 rounded-xl overflow-hidden bg-zinc-950/30">
            <Accordion type="single" collapsible className="w-full">
              
              {/* Información General & Perfil */}
              {(curso.descripcionLarga || curso.publicoObjetivo) && (
                <AccordionItem value="info" className="border-b border-zinc-800">
                  <AccordionTrigger className="px-5 py-4 text-sm font-bold text-white hover:text-primary transition-colors hover:no-underline">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-primary" />
                      Detalles de este material
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5 pt-1 border-t border-zinc-800/50 bg-zinc-950/50">
                    <div className="flex flex-col gap-6 pt-3">
                      {curso.publicoObjetivo && (
                        <div>
                          <p className="text-[10px] uppercase tracking-widest font-bold text-primary mb-2 flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" /> ¿Para quién es?
                          </p>
                          <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line border-l border-primary/20 pl-3">
                            {curso.publicoObjetivo}
                          </p>
                        </div>
                      )}
                      
                      {curso.descripcionLarga && (
                        <div>
                          <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-2">
                            Descripción completa
                          </p>
                          <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                            {curso.descripcionLarga}
                          </p>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Temario / Metodología */}
              {curso.temario && curso.temario.length > 0 && (
                <AccordionItem value="metodologia" className="border-b border-zinc-800">
                  <AccordionTrigger className="px-5 py-4 text-sm font-bold text-white hover:text-primary transition-colors hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-primary" />
                      El método / Lo que lograrás
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-5 pb-5 pt-4 border-t border-zinc-800/50 bg-zinc-950/50">
                    <ul className="grid sm:grid-cols-2 gap-3">
                      {curso.temario.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300">
                          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}

              {/* Contenido Desbloqueable / Módulos */}
              {curso.contenido && curso.contenido.length > 0 && (
                <AccordionItem value="contenido" className="border-none">
                  <AccordionTrigger className="px-5 py-4 text-sm font-bold text-white hover:text-primary transition-colors hover:no-underline">
                    <div className="flex items-center gap-2">
                      <Lock className="w-4 h-4 text-zinc-400 group-data-[state=open]:text-primary" />
                      Programa y Extras Desbloqueables
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-0 pb-0 pt-0 border-t border-zinc-800/50 bg-zinc-950/30">
                    <div className="divide-y divide-zinc-800/60">
                      {curso.contenido.map((modulo, idx) => {
                        const isLocked = idx >= UNLOCKED_MODULES;
                        return (
                          <div
                            key={idx}
                            className={`px-5 py-4 transition-colors ${
                              isLocked ? 'bg-zinc-950/60' : 'bg-transparent'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3 mb-2">
                              <div className="flex items-center gap-2">
                                {isLocked ? (
                                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-zinc-800 border border-zinc-700 shrink-0">
                                    <Lock className="w-2.5 h-2.5 text-zinc-500" />
                                  </span>
                                ) : (
                                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 border border-primary/20 shrink-0 text-[10px] font-black text-primary">
                                    {idx + 1}
                                  </span>
                                )}
                                <p
                                  className={`text-sm font-bold ${
                                    isLocked ? 'text-zinc-500 blur-[2px] select-none' : 'text-white'
                                  }`}
                                >
                                  {modulo.titulo}
                                </p>
                              </div>
                              {isLocked && (
                                <span className="text-[9px] uppercase tracking-widest bg-zinc-800 text-zinc-500 px-2 py-0.5 rounded-sm border border-zinc-700 shrink-0">
                                  Bloqueado
                                </span>
                              )}
                            </div>

                            {modulo.lecciones && modulo.lecciones.length > 0 && (
                              <ul className="ml-7 space-y-1">
                                {modulo.lecciones.map((leccion, lIdx) => (
                                  <li
                                    key={lIdx}
                                    className={`text-xs flex items-center gap-1.5 ${
                                      isLocked
                                        ? 'text-zinc-600 blur-[2px] select-none'
                                        : 'text-zinc-400'
                                    }`}
                                  >
                                    <span className="w-1 h-1 rounded-full bg-current shrink-0" />
                                    {leccion}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {curso.contenido.length > UNLOCKED_MODULES && (
                      <div className="px-5 py-4 bg-gradient-to-b from-zinc-950/0 to-zinc-950 text-center border-t border-zinc-800">
                        <p className="text-[11px] uppercase tracking-wider font-bold text-emerald-500/80 mb-1">
                          🔐 {curso.contenido.length - UNLOCKED_MODULES} elementos más se desbloquean con tu compra
                        </p>
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>

          {/* 6 · Meta chips */}
          {(curso.tiempoEstudio || curso.nivel) && (
            <div className="flex flex-wrap gap-2">
              {curso.tiempoEstudio && (
                <span className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800 text-xs font-medium text-zinc-300">
                  <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  {curso.tiempoEstudio}
                </span>
              )}
              {curso.nivel && (
                <span className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800 text-xs font-medium text-zinc-300">
                  <BarChart className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  {getNivelLabel(curso.nivel)}
                </span>
              )}
            </div>
          )}

          {/* 7 · BLOQUE DE COMPRA — Alta conversión */}
          <div className="mt-2 rounded-2xl border border-zinc-800 bg-zinc-950/50">

            {/* Urgencia / escasez */}
            {curso.mensajeUrgencia && (
              <div className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-500/10 border-b border-zinc-800">
                <span className="text-amber-400 text-xs font-bold tracking-wide text-center">
                  {curso.mensajeUrgencia}
                </span>
              </div>
            )}

            <div className="p-5 md:p-6 flex flex-col gap-5 items-center text-center">

              {/* Precio y Slogan en una sola línea (in-line) */}
              {curso.esPago ? (
                <div className="flex flex-col items-center gap-2.5 w-full">
                  
                  {/* Etiqueta de Oferta especial o Valor Real */}
                  {(curso.sloganOferta || curso.valorTotal) && (
                     <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium">
                        {curso.sloganOferta && (
                          <span className="bg-gradient-to-r from-red-600 to-rose-500 text-white px-2 py-0.5 rounded shadow-sm shadow-red-500/20 uppercase font-black tracking-wider text-[10px]">
                            {curso.sloganOferta}
                          </span>
                        )}
                        {curso.valorTotal && (
                          <span className="text-zinc-500">Valor real: <span className="line-through">{formatMoney(curso.valorTotal)}</span></span>
                        )}
                     </div>
                  )}

                  {/* Todo en una fila compacta: Precio viejo, Nuevo, Ahorro */}
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    {curso.precioAnterior && (
                      <span className="text-xl text-zinc-500 line-through font-medium">
                        {formatMoney(curso.precioAnterior)}
                      </span>
                    )}
                    
                    {curso.precio !== undefined && (
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">
                          {formatMoney(curso.precio)}
                        </span>
                        <span className="text-sm font-bold text-zinc-500">USD</span>
                      </div>
                    )}
                    
                    {curso.precioAnterior && curso.precio !== undefined && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-md border border-primary/20">
                        🔥 Ahorras {formatMoney(curso.precioAnterior - curso.precio)}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-[10px] uppercase tracking-widest font-bold text-zinc-600">
                    Inversión única · Acceso de por vida
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <span className="text-6xl font-black text-white tracking-tighter">Gratis</span>
                  <p className="text-[11px] uppercase tracking-widest font-bold text-zinc-500 mt-2">Acceso inmediato</p>
                </div>
              )}

              {/* CTA */}
              {isProximamente ? (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full max-w-sm bg-white hover:bg-zinc-100 text-black text-base font-black py-4 px-8 rounded-xl transition-all"
                >
                  Reservar mi Lugar Ahora
                </button>
              ) : isDisponible ? (
                <div className="w-full flex flex-col items-center gap-4">
                  <Link
                    href={curso.urlPago || curso.urlLanding || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/cta relative w-full flex items-center justify-center gap-3 bg-primary text-black text-xl font-black py-4 px-8 rounded-xl transition-all hover:bg-primary/90 hover:scale-[1.015] active:scale-[0.99] duration-200 overflow-hidden"
                  >
                    {/* Animated shimmer inside button, no external glow */}
                    <span className="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                    <Lock className="w-5 h-5 shrink-0" />
                    Desbloquear Ahora
                  </Link>

                  {/* Trust icons directly under the button */}
                  <div className="flex items-center justify-center gap-5 flex-wrap w-full border-t border-zinc-800/80 pt-4">
                    <span className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
                      <Lock className="w-3.5 h-3.5 text-zinc-500" /> Pago seguro
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
                      <span className="text-primary text-[10px]">●</span> Acceso inmediato
                    </span>
                    {curso.garantia && (
                      <span className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium">
                        <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" /> {curso.garantia}
                      </span>
                    )}
                  </div>
                </div>
              ) : null}

            </div>
          </div>
        </div>
      </div>

      <EarlyAccessModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        cursoId={curso._id}
        cursoTitulo={curso.titulo}
      />
    </>
  );
}
