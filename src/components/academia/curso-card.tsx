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
  BookOpen,
  ShieldCheck,
  Info
} from 'lucide-react';
import { urlForImage } from '@/sanity/lib/image';
import { EarlyAccessModal } from './early-access-modal';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';

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
  const [isEarlyAccessModalOpen, setIsEarlyAccessModalOpen] = useState(false);
  const [videoActive, setVideoActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isProximamente = curso.estado === 'proximamente';
  const isDisponible = curso.estado === 'disponible';
  const imageUrl = curso.imagen ? urlForImage(curso.imagen).width(800).url() : '';
  const hdImageUrl = curso.imagen ? urlForImage(curso.imagen).width(1400).url() : '';

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

  const UNLOCKED_MODULES = 2;

  // The full detailed view rendered inside the modal
  const CourseDetails = () => (
    <div className="flex flex-col gap-6">
      {/* ── Media: 16:9 aspect ratio container ── */}
      <div className="relative w-full aspect-video overflow-hidden bg-black rounded-xl">
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
            {hdImageUrl ? (
              <Image
                src={hdImageUrl}
                alt={curso.titulo}
                fill
                sizes="(max-width: 768px) 100vw, 900px"
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-zinc-700 text-sm">
                Sin imagen
              </div>
            )}

            {/* ── Play button ── */}
            {curso.urlVideo && (
              <button
                onClick={handlePlayClick}
                aria-label="Reproducir video del curso"
                className="absolute inset-0 flex items-center justify-center group/play"
              >
                <span className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover/play:from-black/70 transition-colors duration-200" />
                <span className="relative flex flex-col items-center gap-2">
                  <span className="flex items-center justify-center w-16 h-16 rounded-full bg-primary shadow-lg shadow-primary/50 border-4 border-white/20 group-hover/play:scale-110 transition-all duration-200">
                    <Play className="w-7 h-7 text-white fill-white ml-1" />
                  </span>
                  <span className="relative bg-black/70 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20">
                    Ver Trailer
                  </span>
                </span>
              </button>
            )}

            {/* Badges in Modal */}
            <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2 pointer-events-none">
              {curso.categoria && curso.categoria.length > 0 && (
                <span className="bg-black/70 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white rounded-full border border-white/10">
                  {curso.categoria[0].replace(/-/g, ' ').toUpperCase()}
                </span>
              )}
            </div>
          </>
        )}
      </div>

      <DialogTitle className="text-2xl md:text-3xl font-black text-white leading-tight">
        {curso.titulo}
      </DialogTitle>
      
      <DialogDescription className="text-zinc-300 text-base leading-relaxed font-medium">
        {curso.descripcionCorta}
      </DialogDescription>

      {/* Meta chips */}
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

      {/* Accordion para revelar contenido progresivo */}
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
                      <div key={idx} className={`px-5 py-4 transition-colors ${isLocked ? 'bg-zinc-950/60' : 'bg-transparent'}`}>
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
                            <p className={`text-sm font-bold ${isLocked ? 'text-zinc-500 blur-[2px] select-none' : 'text-white'}`}>
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
                              <li key={lIdx} className={`text-xs flex items-center gap-1.5 ${isLocked ? 'text-zinc-600 blur-[2px] select-none' : 'text-zinc-400'}`}>
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

      {/* BLOQUE DE COMPRA */}
      <div className="mt-2 rounded-2xl border border-zinc-800 bg-zinc-950/50">
        {curso.mensajeUrgencia && (
          <div className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-500/10 border-b border-zinc-800">
            <span className="text-amber-400 text-xs font-bold tracking-wide text-center">
              {curso.mensajeUrgencia}
            </span>
          </div>
        )}
        <div className="p-5 md:p-6 flex flex-col gap-5 items-center text-center">
          {curso.esPago ? (
            <div className="flex flex-col items-center gap-2.5 w-full">
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
              <div className="flex flex-wrap items-center justify-center gap-3">
                {curso.precioAnterior && (
                  <span className="text-xl text-zinc-500 line-through font-medium">
                    {formatMoney(curso.precioAnterior)}
                  </span>
                )}
                {curso.precio !== undefined && (
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none">
                      {formatMoney(curso.precio)}
                    </span>
                    <span className="text-sm font-bold text-zinc-500">USD</span>
                  </div>
                )}
                {curso.precioAnterior && curso.precio !== undefined && (
                  <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-md border border-primary/20">
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
              <span className="text-5xl font-black text-white tracking-tighter">Gratis</span>
              <p className="text-[11px] uppercase tracking-widest font-bold text-zinc-500 mt-2">Acceso inmediato</p>
            </div>
          )}

          {isProximamente ? (
            <button
              onClick={() => setIsEarlyAccessModalOpen(true)}
              className="w-full max-w-sm bg-white hover:bg-zinc-100 text-black text-base font-black py-3 px-8 rounded-xl transition-all"
            >
              Reservar mi Lugar Ahora
            </button>
          ) : isDisponible ? (
            <div className="w-full flex flex-col items-center gap-4">
              <Link
                href={curso.urlPago || curso.urlLanding || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta relative w-full flex items-center justify-center gap-3 bg-primary text-black text-lg font-black py-4 px-8 rounded-xl transition-all hover:bg-primary/90 hover:scale-[1.015] active:scale-[0.99] duration-200 overflow-hidden"
              >
                <span className="absolute inset-0 -translate-x-full group-hover/cta:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <Lock className="w-5 h-5 shrink-0" />
                Desbloquear Ahora
              </Link>
              <div className="flex items-center justify-center gap-4 flex-wrap w-full border-t border-zinc-800/80 pt-4">
                <span className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-medium">
                  <Lock className="w-3.5 h-3.5 text-zinc-500" /> Pago seguro
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-medium">
                  <span className="text-primary text-[10px]">●</span> Inmediato
                </span>
                {curso.garantia && (
                  <span className="flex items-center gap-1.5 text-[11px] text-zinc-400 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-zinc-500" /> {curso.garantia}
                  </span>
                )}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );

  return (
    <>
      <Dialog onOpenChange={(open) => {
        // Stop video when modal closes
        if (!open) setVideoActive(false);
      }}>
        {/* SMALL GRID CARD */}
        <DialogTrigger asChild>
          <div
            className={`w-full flex flex-col rounded-2xl overflow-hidden bg-zinc-900 border transition-all duration-300 group cursor-pointer hover:-translate-y-1 hover:shadow-xl ${
              curso.destacado
                ? 'border-primary/40 ring-1 ring-primary/20 shadow-primary/10 hover:shadow-primary/20'
                : 'border-zinc-800 hover:border-zinc-700'
            }`}
          >
            {/* Aspect Ratio Container for Card */}
            <div className="relative w-full aspect-[4/3] overflow-hidden bg-black flex items-center justify-center">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={curso.titulo}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={curso.destacado}
                />
              ) : (
                <div className="text-sm text-zinc-600">Sin imagen</div>
              )}
              
              {/* Badge Overlay */}
              <div className="absolute top-3 right-3 flex items-start gap-2 pointer-events-none">
                <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full backdrop-blur-md flex items-center gap-1.5 ${getBadgeStyle()}`}>
                  {isProximamente && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />}
                  {isProximamente ? 'PRÓXIMAMENTE' : curso.estado.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Small Card Body */}
            <div className="p-5 flex flex-col flex-1">
              {curso.categoria && curso.categoria.length > 0 && (
                <span className="text-[10px] font-bold text-primary mb-2 uppercase tracking-wider">
                  {curso.categoria[0].replace(/-/g, ' ')}
                </span>
              )}
              
              <h3 className="text-lg font-black text-white leading-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {curso.titulo}
              </h3>
              
              <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-3">
                {curso.descripcionCorta}
              </p>

              <div className="mt-auto pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-medium">
                  <Info className="w-3.5 h-3.5" />
                  Ver más info
                </div>
                
                {curso.precio !== undefined && curso.esPago && (
                  <span className="text-white font-bold text-sm">
                    {formatMoney(curso.precio)}
                  </span>
                )}
                {!curso.esPago && (
                  <span className="text-primary font-bold text-sm uppercase">Gratis</span>
                )}
              </div>
            </div>
          </div>
        </DialogTrigger>

        {/* LARGE MODAL */}
        <DialogContent className="z-[9999] max-w-4xl w-[95vw] max-h-[85vh] overflow-y-auto bg-zinc-950 flex flex-col p-1 border border-zinc-800 rounded-2xl shadow-3xl [&>button]:top-4 [&>button]:right-5 [&>button]:bg-black/50 [&>button]:p-2 [&>button]:text-white hover:[&>button]:bg-black [&>button]:z-[110] [&>button]:rounded-full backdrop-blur-none">
          <div className="w-full bg-zinc-950 rounded-xl p-4 md:p-8 flex flex-col gap-6">
            <CourseDetails />
          </div>
        </DialogContent>
      </Dialog>

      {/* Early Access Modal rendering logic if user opts for "Proximamente" course */}
      <EarlyAccessModal
        isOpen={isEarlyAccessModalOpen}
        onClose={() => setIsEarlyAccessModalOpen(false)}
        cursoId={curso._id}
        cursoTitulo={curso.titulo}
      />
    </>
  );
}
