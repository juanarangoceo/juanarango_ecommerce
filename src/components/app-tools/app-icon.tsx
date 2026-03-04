import {
  MessageSquare,
  PenTool,
  Image as ImageIcon,
  Clapperboard,
  Music,
  Code,
  Zap,
  Palette,
  Megaphone,
  type LucideIcon,
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import type { CategoryId } from "@/lib/app-tools-queries"

const categoryIcons: Record<Exclude<CategoryId, "all">, LucideIcon> = {
  chatbot: MessageSquare,
  writing: PenTool,
  "image-gen": ImageIcon,
  video: Clapperboard,
  audio: Music,
  coding: Code,
  productivity: Zap,
  design: Palette,
  marketing: Megaphone,
}

export function AppIcon({
  category,
  iconBg,
  logoUrl,
  size = "md",
  className,
}: {
  category: Exclude<CategoryId, "all">
  iconBg: string
  logoUrl?: string | null
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const Icon = categoryIcons[category] || Zap
  const sizeClasses = {
    sm: "size-8 rounded-lg",
    md: "size-10 rounded-xl",
    lg: "size-16 rounded-2xl",
  }
  const iconSizes = {
    sm: "size-4",
    md: "size-5",
    lg: "size-7",
  }
  const pxSizes = { sm: 32, md: 40, lg: 64 }

  return (
    <div
      className={cn(
        "flex items-center justify-center shrink-0 overflow-hidden",
        logoUrl ? "bg-white" : iconBg,
        sizeClasses[size],
        className
      )}
    >
      {logoUrl ? (
        <Image
          src={logoUrl}
          alt=""
          width={pxSizes[size]}
          height={pxSizes[size]}
          className="object-contain w-full h-full p-1"
          unoptimized
        />
      ) : (
        <Icon className={cn(iconSizes[size], "text-white")} />
      )}
    </div>
  )
}
