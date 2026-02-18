import {
  MessageSquare,
  PenTool,
  Image,
  Clapperboard,
  Music,
  Code,
  Zap,
  Palette,
  Megaphone,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"
import type { CategoryId } from "@/lib/app-tools-queries"

const categoryIcons: Record<Exclude<CategoryId, "all">, LucideIcon> = {
  chatbot: MessageSquare,
  writing: PenTool,
  "image-gen": Image,
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
  size = "md",
  className,
}: {
  category: Exclude<CategoryId, "all">
  iconBg: string
  size?: "sm" | "md" | "lg"
  className?: string
}) {
  const Icon = categoryIcons[category] || Zap
  const sizeClasses = {
    sm: "size-8 rounded-lg",
    md: "size-10 rounded-xl",
    lg: "size-14 rounded-2xl",
  }
  const iconSizes = {
    sm: "size-4",
    md: "size-5",
    lg: "size-7",
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center shrink-0",
        iconBg,
        sizeClasses[size],
        className
      )}
    >
      <Icon className={cn(iconSizes[size], "text-white")} />
    </div>
  )
}
