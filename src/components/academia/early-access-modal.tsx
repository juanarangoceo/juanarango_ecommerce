'use client';

import { useState } from 'react';
import { X, Loader2, CheckCircle2 } from 'lucide-react';

interface EarlyAccessModalProps {
  cursoId: string;
  cursoTitulo: string;
  isOpen: boolean;
  onClose: () => void;
}

export function EarlyAccessModal({
  cursoId,
  cursoTitulo,
  isOpen,
  onClose,
}: EarlyAccessModalProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    whatsapp: '',
    mensaje: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/acceso-anticipado', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          curso_id: cursoId,
          curso_titulo: cursoTitulo,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Ocurrió un error inesperado');
      }

      setStatus('success');
    } catch (err: any) {
      console.error(err);
      setStatus('error');
      setErrorMessage(err.message || 'Error al enviar la solicitud');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <div>
            <h3 className="text-xl font-bold text-white">Acceso Anticipado</h3>
            <p className="text-sm text-zinc-400 mt-1 line-clamp-1">{cursoTitulo}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h4 className="text-2xl font-bold text-white mb-2">¡Solicitud  Enviada!</h4>
              <p className="text-zinc-400 mb-6">
                Te notificaremos tan pronto como <strong>{cursoTitulo}</strong> esté disponible.
              </p>
              <button
                onClick={onClose}
                className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-zinc-200 transition-colors"
              >
                Cerrar
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-zinc-400 mb-4">
                Déjanos tus datos para ser de los primeros en enterarte y recibir un descuento especial de lanzamiento.
              </p>

              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-zinc-300 mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  required
                  value={formData.nombre}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-300 mb-1">Correo Electrónico *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="whatsapp" className="block text-sm font-medium text-zinc-300 mb-1">WhatsApp (Opcional)</label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="+57 300..."
                />
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-zinc-300 mb-1">Comentario (Opcional)</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={2}
                  value={formData.mensaje}
                  onChange={handleChange}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  placeholder="¿Qué esperas aprender en este curso?"
                />
              </div>

              {status === 'error' && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-primary text-primary-foreground font-bold py-3.5 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  'Reservar mi lugar'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
