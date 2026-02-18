"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ExternalLink, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AppIcon } from "./app-icon"
import { PricingBadge } from "./pricing-badge"
import { CategoryFilter } from "./category-filter"
import type { AppToolSanity } from "@/lib/app-tools-queries"
import { getCategoryLabel, getAppUrl, type CategoryId } from "@/lib/app-tools-queries"
import { cn } from "@/lib/utils"

const ITEMS_PER_PAGE = 5

export function RankingTable({ apps }: { apps: AppToolSanity[] }) {
  const [category, setCategory] = useState<CategoryId>("all")
  const [currentPage, setCurrentPage] = useState(1)

  const filteredApps = useMemo(() => {
    if (category === "all") return apps
    return apps.filter((app) => app.category === category)
  }, [apps, category])

  const totalPages = Math.ceil(filteredApps.length / ITEMS_PER_PAGE)
  const paginatedApps = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredApps.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredApps, currentPage])

  function handleCategoryChange(cat: CategoryId) {
    setCategory(cat)
    setCurrentPage(1)
  }

  return (
    <div className="flex flex-col gap-5">
      {/* Category filter inside the table */}
      <CategoryFilter selected={category} onChange={handleCategoryChange} />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full" role="table">
          <thead>
            <tr className="border-b border-border text-xs font-medium uppercase tracking-wider text-muted-foreground">
              <th className="w-16 pb-3 text-left" scope="col">Rank</th>
              <th className="pb-3 text-left" scope="col">App</th>
              <th className="hidden pb-3 text-left md:table-cell" scope="col">Categoría</th>
              <th className="hidden pb-3 text-left sm:table-cell" scope="col">Precio</th>
              <th className="pb-3 text-right" scope="col">Acción</th>
            </tr>
          </thead>
          <tbody>
            {paginatedApps.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-muted-foreground">
                  No hay apps en esta categoría todavía.
                </td>
              </tr>
            ) : (
              paginatedApps.map((app, index) => {
                const globalIndex = (currentPage - 1) * ITEMS_PER_PAGE + index + 1
                return (
                  <tr
                    key={app._id}
                    className={cn(
                      "group border-b border-border/50 transition-colors hover:bg-secondary/30",
                      globalIndex <= 3 && category === "all" && "bg-primary/[0.03]"
                    )}
                  >
                    {/* Rank */}
                    <td className="py-4 pr-2">
                      <span
                        className={cn(
                          "text-xl font-bold tabular-nums",
                          globalIndex <= 3 && category === "all" ? "text-primary" : "text-muted-foreground"
                        )}
                      >
                        {app.rank || globalIndex}
                      </span>
                    </td>

                    {/* App Name */}
                    <td className="py-4">
                      <Link
                        href={`/app-tools/${app.slug.current}`}
                        className="flex items-center gap-3"
                      >
                        <AppIcon
                          category={app.category}
                          iconBg={app.iconBg}
                          size="sm"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                            {app.appName}
                          </p>
                          <p className="text-xs text-muted-foreground truncate max-w-[200px] md:max-w-[300px]">
                            {app.description}
                          </p>
                        </div>
                      </Link>
                    </td>

                    {/* Category */}
                    <td className="hidden py-4 md:table-cell">
                      <button
                        onClick={() => handleCategoryChange(app.category)}
                        className="inline-block rounded-md border border-border bg-secondary/50 px-2 py-0.5 text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors cursor-pointer"
                      >
                        {getCategoryLabel(app.category)}
                      </button>
                    </td>

                    {/* Pricing */}
                    <td className="hidden py-4 sm:table-cell">
                      <PricingBadge pricing={app.pricing} />
                    </td>

                    {/* Action */}
                    <td className="py-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
                      >
                        <a
                          href={getAppUrl(app)}
                          target="_blank"
                          rel="noopener noreferrer sponsored"
                        >
                          VISITAR
                          <ExternalLink className="size-3" />
                        </a>
                      </Button>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">
            Mostrando {((currentPage - 1) * ITEMS_PER_PAGE) + 1}-{Math.min(currentPage * ITEMS_PER_PAGE, filteredApps.length)} de {filteredApps.length} apps
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-foreground disabled:opacity-30"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              aria-label="Página anterior"
            >
              <ChevronLeft className="size-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "size-8 text-xs font-medium",
                  page === currentPage
                    ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="ghost"
              size="icon"
              className="size-8 text-muted-foreground hover:text-foreground disabled:opacity-30"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              aria-label="Página siguiente"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
