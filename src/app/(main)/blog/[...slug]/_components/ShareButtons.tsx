"use client"

import { useState } from "react"
import { Twitter, Linkedin, Facebook, Link2, Share2, Check, MessageCircle } from "lucide-react"

interface ShareButtonsProps {
  title: string
  slug: string
  category?: string
}

export function ShareButtons({ title, slug, category }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)

  const path = category ? `/blog/${category}/${slug}` : `/blog/${slug}`
  const url = `https://juanarango.com${path}`
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      // Fallback for older browsers
      const el = document.createElement("input")
      el.value = url
      document.body.appendChild(el)
      el.select()
      document.execCommand("copy")
      document.body.removeChild(el)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  const shareLinks = [
    {
      id: "twitter",
      label: "X / Twitter",
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: Twitter,
      color: "hover:bg-black hover:text-white hover:border-black",
    },
    {
      id: "whatsapp",
      label: "WhatsApp",
      href: `https://api.whatsapp.com/send?text=${encodedTitle}%0A${encodedUrl}`,
      icon: MessageCircle,
      color: "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]",
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      href: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`,
      icon: Linkedin,
      color: "hover:bg-[#0077B5] hover:text-white hover:border-[#0077B5]",
    },
    {
      id: "facebook",
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: Facebook,
      color: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
    },
  ]

  return (
    <div className="my-10 py-8 border-t border-b border-zinc-100 dark:border-zinc-800">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-5">
        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
          <Share2 className="w-4 h-4 text-primary" />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">¿Te fue útil este artículo?</p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">Compártelo y ayuda a otros a encontrarlo</p>
        </div>
      </div>

      {/* Buttons grid */}
      <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2.5">
        {shareLinks.map(({ id, label, href, icon: Icon, color }) => (
          <a
            key={id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Compartir en ${label}`}
            title={`Compartir en ${label}`}
            className={`
              inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-3.5 sm:py-2 rounded-lg text-sm font-medium
              border border-zinc-200 dark:border-zinc-700
              text-zinc-700 dark:text-zinc-300
              bg-white dark:bg-zinc-900
              transition-all duration-200
              ${color}
            `}
          >
            <Icon className="w-4 h-4 shrink-0" />
            <span>{label}</span>
          </a>
        ))}

        {/* Copy Link Button */}
        <button
          onClick={copyToClipboard}
          aria-label="Copiar enlace"
          title="Copiar enlace"
          className={`
            inline-flex items-center justify-center gap-2 px-4 py-2.5 sm:px-3.5 sm:py-2 rounded-lg text-sm font-medium
            border transition-all duration-200
            ${copied
              ? "bg-primary/10 border-primary/40 text-primary"
              : "border-zinc-200 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-900 hover:bg-primary/5 hover:text-primary hover:border-primary/30"
            }
          `}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 shrink-0" />
              <span>¡Copiado!</span>
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4 shrink-0" />
              <span>Copiar enlace</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
