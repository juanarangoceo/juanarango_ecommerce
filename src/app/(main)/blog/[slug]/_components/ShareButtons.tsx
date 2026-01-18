"use client"

import { Button } from "@/components/ui/button"
import { Twitter, Linkedin, Link2, Facebook } from "lucide-react"

export function ShareButtons({ title, slug }: { title: string, slug: string }) {
  const url = `https://juanarangoecommerce.com/blog/${slug}`
  const encodedTitle = encodeURIComponent(title)
  const encodedUrl = encodeURIComponent(url)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url)
    alert("Enlace copiado!")
  }

  return (
    <div className="flex flex-row md:flex-col gap-2">
      <Button variant="outline" size="icon" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`, '_blank')}>
        <Twitter className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}`, '_blank')}>
        <Linkedin className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank')}>
        <Facebook className="h-4 w-4" />
      </Button>
       <Button variant="outline" size="icon" onClick={copyToClipboard}>
        <Link2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
