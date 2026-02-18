"use client"

import {
  LayoutGrid,
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
import { CATEGORIES, type CategoryId } from "@/lib/ai-tools-data"

const iconMap: Record<string, LucideIcon> = {
  LayoutGrid,
  MessageSquare,
  PenTool,
  Image,
  Clapperboard,
  Music,
  Code,
  Zap,
  Palette,
  Megaphone,
}

const colorStyles: Record<
  string,
  { active: string; inactive: string; dot: string }
> = {
  slate: {
    active: "border-slate-400/50 bg-slate-500/15 text-slate-200",
    inactive: "text-slate-400 hover:text-slate-200 hover:border-slate-500/30",
    dot: "bg-slate-400",
  },
  emerald: {
    active: "border-emerald-400/50 bg-emerald-500/15 text-emerald-300",
    inactive: "text-emerald-400/70 hover:text-emerald-300 hover:border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  fuchsia: {
    active: "border-fuchsia-400/50 bg-fuchsia-500/15 text-fuchsia-300",
    inactive: "text-fuchsia-400/70 hover:text-fuchsia-300 hover:border-fuchsia-500/30",
    dot: "bg-fuchsia-400",
  },
  violet: {
    active: "border-violet-400/50 bg-violet-500/15 text-violet-300",
    inactive: "text-violet-400/70 hover:text-violet-300 hover:border-violet-500/30",
    dot: "bg-violet-400",
  },
  orange: {
    active: "border-orange-400/50 bg-orange-500/15 text-orange-300",
    inactive: "text-orange-400/70 hover:text-orange-300 hover:border-orange-500/30",
    dot: "bg-orange-400",
  },
  rose: {
    active: "border-rose-400/50 bg-rose-500/15 text-rose-300",
    inactive: "text-rose-400/70 hover:text-rose-300 hover:border-rose-500/30",
    dot: "bg-rose-400",
  },
  sky: {
    active: "border-sky-400/50 bg-sky-500/15 text-sky-300",
    inactive: "text-sky-400/70 hover:text-sky-300 hover:border-sky-500/30",
    dot: "bg-sky-400",
  },
  amber: {
    active: "border-amber-400/50 bg-amber-500/15 text-amber-300",
    inactive: "text-amber-400/70 hover:text-amber-300 hover:border-amber-500/30",
    dot: "bg-amber-400",
  },
  cyan: {
    active: "border-cyan-400/50 bg-cyan-500/15 text-cyan-300",
    inactive: "text-cyan-400/70 hover:text-cyan-300 hover:border-cyan-500/30",
    dot: "bg-cyan-400",
  },
  lime: {
    active: "border-lime-400/50 bg-lime-500/15 text-lime-300",
    inactive: "text-lime-400/70 hover:text-lime-300 hover:border-lime-500/30",
    dot: "bg-lime-400",
  },
}

export function CategoryFilter({
  selected,
  onChange,
}: {
  selected: CategoryId
  onChange: (category: CategoryId) => void
}) {
  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filtrar por categoria">
      {CATEGORIES.map((cat) => {
        const Icon = iconMap[cat.icon]
        const isActive = selected === cat.id
        const colors = colorStyles[cat.color] ?? colorStyles.slate

        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(cat.id)}
            className={cn(
              "flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all cursor-pointer",
              isActive
                ? colors.active
                : cn("border-transparent bg-secondary/40", colors.inactive)
            )}
          >
            {Icon && <Icon className="size-3.5" aria-hidden="true" />}
            <span>{cat.label}</span>
            {isActive && (
              <span className={cn("size-1.5 rounded-full", colors.dot)} aria-hidden="true" />
            )}
          </button>
        )
      })}
    </div>
  )
}
