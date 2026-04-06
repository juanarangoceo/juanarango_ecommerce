'use client'

import dynamic from 'next/dynamic'

// Lazy-load the heavy component (avoids SSR + keeps PDF capture out of the initial bundle)
const PdfEmailCapture = dynamic(
  () => import('./pdf-email-capture').then(m => m.PdfEmailCapture),
  {
    ssr: false,
    loading: () => (
      <div className="my-8 h-[88px] animate-pulse rounded-2xl bg-zinc-900/60 border border-zinc-800" />
    ),
  }
)

interface PdfEmailCaptureLazyProps {
  postSlug: string
  postTitle: string
  hookTitle?: string
  hookDescription?: string
}

export function PdfEmailCaptureLazy(props: PdfEmailCaptureLazyProps) {
  return <PdfEmailCapture {...props} />
}
