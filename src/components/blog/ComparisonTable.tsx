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

      <div className="my-8 md:my-12 overflow-hidden rounded-lg border border-white/10 shadow-sm">
        {title && (
          <div className="bg-[#0d110e] px-4 md:px-6 py-3 md:py-4 border-b border-white/10">
            <h3 className="text-lg md:text-xl font-bold text-white">
              {title}
            </h3>
          </div>
        )}

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#0d110e]">
              <tr>
                {headers.map((header, idx) => (
                  <th
                    key={idx}
                    className="px-6 py-4 text-left text-sm font-semibold text-white border-b border-white/10"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/9">
              {rows.map((row, rowIdx) => (
                <tr
                  key={rowIdx}
                  className={`
                    ${row.highlight 
                      ? 'bg-primary/10 dark:bg-primary/5 border-l-4 border-primary'
                      : 'bg-white dark:bg-[#0b0e0c] hover:bg-white/10 dark:hover:bg-[#0d110e]'
                    }
                    transition-colors
                  `}
                >
                  {row.cells.map((cell, cellIdx) => (
                    <td
                      key={cellIdx}
                      className={` px-6 py-4 text-sm text-white/78 ${cellIdx === 0 ? 'font-medium text-white dark:text-white' : ''}
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
        <div className="md:hidden divide-y divide-white/9">
          {rows.map((row, rowIdx) => (
            <div
              key={rowIdx}
              className={`
                p-4
                ${row.highlight 
                  ? 'bg-primary/10 dark:bg-primary/5 border-l-4 border-primary'
                  : 'bg-white dark:bg-[#0b0e0c]'
                }
              `}
            >
              {row.cells.map((cell, cellIdx) => (
                <div key={cellIdx} className="mb-3 last:mb-0">
                  <div className="text-xs font-semibold text-white/58 uppercase tracking-wider mb-1">
                    {headers[cellIdx]}
                  </div>
                  <div className="text-sm text-white font-medium">
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
