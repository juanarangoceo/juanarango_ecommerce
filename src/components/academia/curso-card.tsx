'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Clock, BarChart, Check, Lock, ExternalLink } from 'lucide-react';
import { urlForImage } from '@/sanity/lib/image';
import { EarlyAccessModal } from './early-access-modal';

interface CursoNode {
  _id: string;
  titulo: string;
  slug: { current: string };
  descripcionCorta: string;
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
}

export function CursoCard({ curso }: { curso: CursoNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isProximamente = curso.estado === 'proximamente';
  const isDisponible = curso.estado === 'disponible';
  const imageUrl = curso.imagen ? urlForImage(curso.imagen).url() : '';

  const formatMoney = (amount: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(amount);

  const getBadgeStyle = () => {
    if (isProximamente) return 'bg-amber-500/10 text-amber-500 border border-amber-500/20';
    if (isDisponible) return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20';
    return 'bg-zinc-500/10 text-zinc-500 border border-zinc-500/20';
  };

  const getNivelLabel = (nivel?: string) => {
    const labels: Record<string, string> = {
      principiante: 'Principiante', intermedio: 'Intermedio',
      avanzado: 'Avanzado', todos: 'Todos los niveles',
    };
    return labels[nivel ?? ''] ?? nivel;
  };

  return (
    <>
      <div className={`w-full flex flex-col rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 group ${
        curso.destacado ? 'ring-1 ring-primary/30 shadow-2xl shadow-primary/5' : ''
      }`}>

        {/* ── Banner 2:1 — Full-width, shows completely at natural proportions ── */}
        <div className="relative w-full overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={curso.titulo}
              width={1280}
              height={640}
              sizes="(max-width: 768px) 100vw, 900px"
              className="w-full h-auto block"
              priority={curso.destacado}
            />
          ) : (
            <div className="w-full aspect-[2/1] bg-zinc-950 flex items-center justify-center text-zinc-700 text-sm">Sin imagen</div>
          )}

          {/* Badges over image */}
          <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-2">
            {curso.categoria && curso.categoria.length > 0 && (
              <span className="bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white rounded-full border border-white/10">
                {curso.categoria[0].replace(/-/g, ' ').toUpperCase()}
              </span>
            )}
            <span className={`ml-auto px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md flex items-center gap-1.5 ${getBadgeStyle()}`}>
              {isProximamente && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />}
              {isProximamente ? 'PRÓXIMAMENTE' : curso.estado.toUpperCase()}
            </span>
          </div>
        </div>

        {/* ── Content below image ── */}
        <div className="p-6 flex flex-col gap-5">

          {/* Title + description */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-2 leading-tight">{curso.titulo}</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">{curso.descripcionCorta}</p>
          </div>

          {/* Meta chips + temario in two column grid on wide cards */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="flex flex-col gap-4">
              {/* Meta */}
              <div className="flex flex-wrap gap-2">
                {curso.tiempoEstudio && (
                  <span className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800 text-xs font-medium text-zinc-300">
                    <Clock className="w-3.5 h-3.5 text-emerald-400 shrink-0" />{curso.tiempoEstudio}
                  </span>
                )}
                {curso.nivel && (
                  <span className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800 text-xs font-medium text-zinc-300">
                    <BarChart className="w-3.5 h-3.5 text-blue-400 shrink-0" />{getNivelLabel(curso.nivel)}
                  </span>
                )}
              </div>
            </div>

            {/* Temario */}
            {curso.temario && curso.temario.length > 0 && (
              <ul className="space-y-1.5">
                {curso.temario.slice(0, 3).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-zinc-400">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
                {curso.temario.length > 3 && (
                  <li className="text-xs text-zinc-500 italic pl-6">+ y mucho más</li>
                )}
              </ul>
            )}
          </div>

          {/* ── Footer: price + CTA ── */}
          <div className="pt-5 border-t border-zinc-800 flex items-end justify-between gap-4 flex-wrap">
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">Inversión única</span>
              {curso.esPago ? (
                <div className="flex items-baseline gap-1.5">
                  {curso.precioAnterior && (
                    <span className="text-sm text-zinc-600 line-through">{formatMoney(curso.precioAnterior)}</span>
                  )}
                  {curso.precio !== undefined ? (
                    <>
                      <span className="text-3xl font-black text-white tracking-tight">{formatMoney(curso.precio)}</span>
                      <span className="text-xs font-semibold text-zinc-500">USD</span>
                    </>
                  ) : (
                    <span className="text-xl font-bold text-zinc-400">Precio TBD</span>
                  )}
                </div>
              ) : (
                <span className="text-3xl font-black text-white tracking-tight">Gratis</span>
              )}
            </div>

            {isProximamente ? (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white hover:bg-zinc-200 text-black text-sm font-bold py-2.5 px-6 rounded-xl transition-all shrink-0"
              >
                Reservar Lugar
              </button>
            ) : isDisponible ? (
              <Link
                href={curso.urlLanding || '#'}
                target={curso.urlLanding ? '_blank' : '_self'}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold py-2.5 px-6 rounded-xl transition-colors flex items-center gap-1.5 shrink-0"
              >
                Ver Curso
                {curso.urlLanding ? <ExternalLink className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              </Link>
            ) : null}
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
