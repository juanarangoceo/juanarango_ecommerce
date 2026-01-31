"use client"

import { useState } from "react"
import Script from "next/script"

interface ComparisonTableProps {
  title?: string
  headers: string[]
  rows: Array<{
    cells: string[]
    highlight?: boolean
  }>
}

export function ComparisonTable({ title, headers, rows }: ComparisonTableProps) {
  // Generate structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Table",
    "about": title || "Comparison Table"
  }

  return (
    <>
      {/* Structured Data */}
      <Script
        id={`comparison-table-${title?.toLowerCase().replace(/\s+/g, '-')}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <div className="my-8 md:my-12 overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-sm">
        {title && (
          <div className="bg-zinc-50 dark:bg-zinc-900 px-4 md:px-6 py-3 md:py-4 border-b border-zinc-200 dark:border-zinc-800">
            <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white">
              {title}
            </h3>
          </div>
        )}

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-100 dark:bg-zinc-900">
              <tr>
                {headers.map((header, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-4 text-left text-sm font-semibold text-zinc-900 dark:text-white border-b border-zinc-200 dark:border-zinc-800"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {rows.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={`
                    ${row.highlight 
                      ? 'bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500' 
                      : 'bg-white dark:bg-zinc-950 hover:bg-zinc-50 dark:hover:bg-zinc-900'
                    }
                    transition-colors
                  `}
                >
                  {row.cells.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className={`
                        px-6 py-4 text-sm text-zinc-700 dark:text-zinc-300
                        ${cellIdx === 0 ? 'font-medium text-zinc-900 dark:text-white' : ''}
                      `}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-zinc-200 dark:divide-zinc-800">
          {rows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className={`
                p-4
                ${row.highlight 
                  ? 'bg-green-50 dark:bg-green-950/20 border-l-4 border-green-500' 
                  : 'bg-white dark:bg-zinc-950'
                }
              `}
            >
              {row.cells.map((cell, cellIdx) => (
                <div key={cellIdx} className="mb-3 last:mb-0">
                  <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                    {headers[cellIdx]}
                  </div>
                  <div className="text-sm text-zinc-900 dark:text-white font-medium">
                    {cell}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
