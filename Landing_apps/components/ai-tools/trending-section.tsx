import { TrendingUp } from "lucide-react"
import { AppCard } from "./app-card"
import type { AppTool } from "@/lib/ai-tools-data"

export function TrendingSection({ apps }: { apps: AppTool[] }) {
  return (
    <section>
      <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
        <TrendingUp className="size-5 text-primary" aria-hidden="true" />
        Trending Ahora
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {apps.map((app) => (
          <AppCard key={app.id} app={app} />
        ))}
      </div>
    </section>
  )
}
