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

interface CursoCardProps {
  curso: CursoNode;
}

export function CursoCard({ curso }: CursoCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isProximamente = curso.estado === 'proximamente';
  const isDisponible = curso.estado === 'disponible';
  const imageUrl = curso.imagen ? urlForImage(curso.imagen).url() : '';

  // Formato de precios
  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getBadgeStyle = () => {
    if (isProximamente) return 'bg-amber-500/10 text-amber-500 border border-amber-500/20';
    if (isDisponible) return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20';
    return 'bg-zinc-500/10 text-zinc-500 border border-zinc-500/20';
  };

  const getNivelLabel = (nivel?: string) => {
    const levels: Record<string, string> = {
      principiante: 'Principiante',
      intermedio: 'Intermedio',
      avanzado: 'Avanzado',
      todos: 'Todos los niveles'
    };
    return nivel && levels[nivel] ? levels[nivel] : nivel;
  };

  return (
    <>
      <div className={`flex flex-col rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 group ${curso.destacado ? 'ring-1 ring-primary/30 shadow-2xl shadow-primary/5' : ''}`}>
        
        {/* Imagen y Badges */}
        <div className="relative h-56 w-full overflow-hidden bg-zinc-950">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={curso.titulo}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-80" />
          
          {/* Categoría superior izquierda */}
          {curso.categoria && curso.categoria.length > 0 && (
            <div className="absolute top-4 left-4">
              <span className="bg-black/60 backdrop-blur-md px-3 py-1 text-xs font-semibold text-white rounded-full border border-white/10">
                {curso.categoria[0].replace(/-/g, ' ').toUpperCase()}
              </span>
            </div>
          )}

          {/* Badge Estado */}
          <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md shadow-lg flex items-center gap-1.5 ${getBadgeStyle()}`}>
              {isProximamente && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />}
              {isProximamente ? 'PRÓXIMAMENTE' : curso.estado.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="flex-1 p-6 flex flex-col">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
            {curso.titulo}
          </h3>
          <p className="text-zinc-400 text-sm mb-6 line-clamp-2 leading-relaxed">
            {curso.descripcionCorta}
          </p>

          <div className="flex items-center gap-4 text-xs font-medium text-zinc-300 mb-6">
            {curso.tiempoEstudio && (
              <div className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800">
                <Clock className="w-4 h-4 text-emerald-400" />
                {curso.tiempoEstudio}
              </div>
            )}
            {curso.nivel && (
              <div className="flex items-center gap-1.5 bg-zinc-950 px-3 py-1.5 rounded-lg border border-zinc-800">
                <BarChart className="w-4 h-4 text-blue-400" />
                {getNivelLabel(curso.nivel)}
              </div>
            )}
          </div>

          {curso.temario && curso.temario.length > 0 && (
            <ul className="mb-6 space-y-2 mt-auto">
              {curso.temario.slice(0, 3).map((item, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm text-zinc-400">
                  <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{item}</span>
                </li>
              ))}
              {curso.temario.length > 3 && (
                <li className="text-xs text-zinc-500 italic pl-6">+ y mucho más</li>
              )}
            </ul>
          )}

          <div className="pt-6 border-t border-zinc-800 mt-auto flex items-end justify-between gap-4">
            
            <div className="flex flex-col">
              {curso.esPago ? (
                <>
                  {curso.precioAnterior && (
                    <span className="text-xs text-zinc-500 line-through mb-0.5">
                      {formatMoney(curso.precioAnterior)}
                    </span>
                  )}
                  {curso.precio !== undefined ? (
                    <span className="text-2xl font-black text-white">
                      {formatMoney(curso.precio)}
                    </span>
                  ) : (
                    <span className="text-lg font-bold text-zinc-400">Precio TBD</span>
                  )}
                </>
              ) : (
                <span className="text-xl font-bold text-emerald-400">Gratis</span>
              )}
            </div>

            {/* Action Buttons */}
            {isProximamente ? (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-white hover:bg-zinc-200 text-black text-sm font-bold py-2.5 px-5 rounded-xl transition-all flex items-center justify-center shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]"
              >
                Reservar Lugar
              </button>
            ) : isDisponible ? (
              <Link
                href={curso.urlLanding || '#'}
                target={curso.urlLanding ? '_blank' : '_self'}
                className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-bold py-2.5 px-5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                Ver Curso
                {curso.urlLanding && <ExternalLink className="w-4 h-4" />}
                {!curso.urlLanding && <Lock className="w-4 h-4" />}
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
