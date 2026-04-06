'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2, CheckCircle2, AlertTriangle, Mail, FileText } from 'lucide-react'

// ── Types ──────────────────────────────────────────────────────────────────
type State = 'idle' | 'loading' | 'success' | 'error'

interface PdfEmailCaptureProps {
  postSlug: string
  postTitle: string
  hookTitle?: string
  hookDescription?: string
}

// ── Component ───────────────────────────────────────────────────────────────
export function PdfEmailCapture({
  postSlug,
  postTitle,
  hookTitle = '¿Te parece largo este post?',
  hookDescription = 'Recibe el resumen en PDF directo en tu bandeja de entrada para leerlo cuando quieras.',
}: PdfEmailCaptureProps) {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<State>('idle')
  const [message, setMessage] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || state === 'loading') return

    setState('loading')
    setMessage('')

    try {
      const res = await fetch('/api/send-pdf-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), postSlug }),
      })

      const data = await res.json()

      if (!res.ok) {
        setState('error')
        setMessage(data.error ?? 'Algo salió mal. Intenta de nuevo.')
        return
      }

      setState('success')
      setMessage(data.message ?? '¡Revisa tu bandeja de entrada!')
      setEmail('')
    } catch {
      setState('error')
      setMessage('Error de conexión. Por favor intenta de nuevo.')
    }
  }

  const reset = () => {
    setState('idle')
    setMessage('')
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="relative my-8 overflow-hidden rounded-2xl"
      style={{
        background: 'linear-gradient(135deg, #0f0f0f 0%, #111111 50%, #0d1a12 100%)',
        border: '1px solid #282828',
        boxShadow: '0 0 0 1px rgba(74,222,128,0.06), 0 8px 32px -8px rgba(0,0,0,0.5)',
      }}
    >
      {/* Green accent line top */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg, transparent, #4ade80, transparent)' }}
      />

      {/* Subtle green glow bottom-right */}
      <div
        className="pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #4ade80, transparent 70%)' }}
      />

      <div className="relative px-6 py-6 sm:px-8 sm:py-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-7">

          {/* LEFT: Icon + Text */}
          <div className="flex items-start gap-4 sm:flex-1">
            {/* Icon badge */}
            <div
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
              style={{
                background: 'rgba(74, 222, 128, 0.1)',
                border: '1px solid rgba(74, 222, 128, 0.2)',
              }}
            >
              <FileText className="h-5 w-5" style={{ color: '#4ade80' }} />
            </div>

            <div className="min-w-0">
              <p className="text-[15px] font-bold leading-snug text-white sm:text-base">
                {hookTitle}
              </p>
              <p className="mt-1 text-[13px] leading-relaxed text-zinc-400 sm:text-sm">
                {hookDescription}
              </p>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="w-full sm:w-auto sm:min-w-[300px]">
            <AnimatePresence mode="wait">

              {/* ── IDLE / LOADING state ── */}
              {(state === 'idle' || state === 'loading') && (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-2 sm:flex-row"
                >
                  <div className="relative flex-1">
                    <Mail
                      className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
                    />
                    <input
                      ref={inputRef}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                      disabled={state === 'loading'}
                      className="w-full rounded-xl py-2.5 pl-9 pr-4 text-sm text-white placeholder-zinc-600 outline-none transition-all duration-200 disabled:opacity-50"
                      style={{
                        background: '#1a1a1a',
                        border: '1px solid #303030',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)',
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = 'rgba(74, 222, 128, 0.5)'
                        e.target.style.boxShadow = '0 0 0 3px rgba(74, 222, 128, 0.08)'
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#303030'
                        e.target.style.boxShadow = 'inset 0 1px 3px rgba(0,0,0,0.3)'
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!email.trim() || state === 'loading'}
                    className="flex shrink-0 items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-black transition-all duration-200 disabled:opacity-40"
                    style={{
                      background: 'linear-gradient(135deg, #4ade80, #22c55e)',
                      boxShadow: '0 2px 12px rgba(74,222,128,0.25)',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget
                      el.style.boxShadow = '0 4px 20px rgba(74,222,128,0.4)'
                      el.style.transform = 'translateY(-1px)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget
                      el.style.boxShadow = '0 2px 12px rgba(74,222,128,0.25)'
                      el.style.transform = 'translateY(0)'
                    }}
                  >
                    {state === 'loading' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span className="hidden sm:inline">Generando…</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>Recibir PDF</span>
                      </>
                    )}
                  </button>
                </motion.form>
              )}

              {/* ── SUCCESS state ── */}
              {state === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="flex items-center gap-3 rounded-xl px-4 py-3"
                  style={{
                    background: 'rgba(74, 222, 128, 0.08)',
                    border: '1px solid rgba(74, 222, 128, 0.2)',
                  }}
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0" style={{ color: '#4ade80' }} />
                  <p className="text-sm font-medium text-white">{message}</p>
                </motion.div>
              )}

              {/* ── ERROR state ── */}
              {state === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-3 rounded-xl px-4 py-3"
                  style={{
                    background: 'rgba(239, 68, 68, 0.08)',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                  }}
                >
                  <AlertTriangle className="h-5 w-5 shrink-0 text-red-400" />
                  <div className="flex flex-1 items-center justify-between gap-2">
                    <p className="text-sm font-medium text-red-300">{message}</p>
                    <button
                      onClick={reset}
                      className="shrink-0 text-xs font-semibold text-zinc-400 underline-offset-2 hover:text-white hover:underline"
                    >
                      Reintentar
                    </button>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Hint text */}
            {(state === 'idle' || state === 'loading') && (
              <p className="mt-2 text-center text-[11px] text-zinc-600 sm:text-left">
                Sin spam. Solo tu resumen en PDF, una vez.
              </p>
            )}
          </div>

        </div>
      </div>
    </motion.div>
  )
}
