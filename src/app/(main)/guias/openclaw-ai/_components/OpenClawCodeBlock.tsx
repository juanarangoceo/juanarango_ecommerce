"use client"

import { useState } from "react"
import { Copy, Check } from "lucide-react"

export function OpenClawCodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false)

  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative rounded-xl overflow-hidden bg-[#0a0a0a] border border-white/10 my-6">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
        <span className="text-xs font-mono text-zinc-400">{language}</span>
        <button
          onClick={copy}
          className="text-zinc-400 hover:text-white transition-colors p-1"
          aria-label="Copiar código"
        >
          {copied
            ? <Check size={15} className="text-emerald-400" />
            : <Copy size={15} />
          }
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-zinc-300 whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}
