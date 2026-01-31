"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import Script from "next/script"

interface CopyableCodeBlockProps {
  title?: string
  language: string
  code: string
}

export function CopyableCodeBlock({ title, language, code }: CopyableCodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  // Structured data for code snippets
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "programmingLanguage": language,
    "text": code,
    ...(title && { "name": title })
  }

  return (
    <>
      {/* Structured Data */}
      <Script
        id={`code-block-${Math.random().toString(36).substr(2, 9)}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="my-8 md:my-10 group">
        {/* Header */}
        <div className="flex items-center justify-between bg-zinc-900 dark:bg-zinc-950 px-4 md:px-6 py-3 rounded-t-lg border border-zinc-800">
          <div className="flex items-center gap-3">
            {title && (
              <span className="text-sm font-medium text-zinc-300">
                {title}
              </span>
            )}
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
              {language}
            </span>
          </div>
          
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-zinc-300 hover:text-white bg-zinc-800 hover:bg-zinc-700 rounded-md transition-all duration-200 border border-zinc-700 hover:border-zinc-600"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-green-400">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copiar</span>
              </>
            )}
          </button>
        </div>

        {/* Code Block */}
        <div className="relative bg-zinc-950 dark:bg-black rounded-b-lg border border-t-0 border-zinc-800 overflow-hidden">
          <pre className="overflow-x-auto p-4 md:p-6 text-sm md:text-base">
            <code className="text-zinc-100 font-mono leading-relaxed">
              {code}
            </code>
          </pre>
          
          {/* Subtle gradient overlay on scroll */}
          <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-zinc-950 dark:from-black to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </>
  )
}
