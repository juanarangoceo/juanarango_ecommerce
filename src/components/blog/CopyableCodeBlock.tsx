"use client"

import { useState } from "react"
import { Check, Copy, Zap } from "lucide-react"
import Script from "next/script"
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import tsx from 'react-syntax-highlighter/dist/esm/languages/prism/tsx'
import typescript from 'react-syntax-highlighter/dist/esm/languages/prism/typescript'
import javascript from 'react-syntax-highlighter/dist/esm/languages/prism/javascript'
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css'
import json from 'react-syntax-highlighter/dist/esm/languages/prism/json'
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash'

SyntaxHighlighter.registerLanguage('tsx', tsx)
SyntaxHighlighter.registerLanguage('typescript', typescript)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('json', json)
SyntaxHighlighter.registerLanguage('bash', bash)

interface CopyableCodeBlockProps {
  title?: string
  language: string
  code: string
}

export function CopyableCodeBlock({ title, language, code }: CopyableCodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const isPrompt = language.toLowerCase() === 'prompt';

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
        <div className={`flex items-center justify-between px-4 md:px-6 py-3 rounded-t-lg border border-b-0 ${
            isPrompt 
              ? 'bg-primary/5 border-primary/30'
              : 'bg-[#0d110e] dark:bg-[#0b0e0c] border-white/10'
          }`}>
          <div className="flex items-center gap-3">
            {title && (
              <span className={`text-sm font-medium ${isPrompt ? 'text-primary' : 'text-white/78'}`}>
                {title}
              </span>
            )}
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-medium border ${
                isPrompt
                  ? 'bg-primary/10 text-primary border-primary/20'
                  : 'bg-primary/10 text-primary border-primary/20'
            }`}>
              {isPrompt && <Zap className="w-3 h-3" />}
              {isPrompt ? 'Prompt' : language}
            </span>
          </div>
          
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white/78 hover:text-white bg-[#111512] hover:bg-white/10 rounded-md transition-all duration-200 border border-white/15 hover:border-white/25"
            aria-label="Copy code"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-primary" />
                <span className="text-primary">Copiado!</span>
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
        <div className="relative bg-black rounded-b-lg border border-t-0 border-white/10 overflow-hidden">
           <SyntaxHighlighter
              language={language.toLowerCase()}
              style={vscDarkPlus}
              customStyle={{
                margin: 0,
                padding: '1.5rem',
                background: 'transparent',
                fontSize: '0.875rem', // text-sm
                lineHeight: '1.5',
              }}
              codeTagProps={{
                style: { fontFamily: 'inherit' }
              }}
            >
              {code}
            </SyntaxHighlighter>
        </div>
      </div>
    </>
  )
}
