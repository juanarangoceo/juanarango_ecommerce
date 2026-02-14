import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Pagination({ 
  currentPage, 
  totalPages 
}: { 
  currentPage: number; 
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  // Show fewer pages on mobile (3) vs desktop (5)
  const maxVisible = 3;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  
  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <nav aria-label="Paginación" className="flex items-center justify-center gap-1 sm:gap-2 mt-12 overflow-hidden px-2">
      {/* Previous Button */}
      <Link
        href={`/blog?page=${currentPage - 1}`}
        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
        aria-label="Página anterior"
      >
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          className="border-zinc-700 hover:bg-zinc-800 h-9 w-9 sm:w-auto sm:px-3 p-0"
        >
          <ChevronLeft className="w-4 h-4 sm:mr-1" />
          <span className="hidden sm:inline">Anterior</span>
        </Button>
      </Link>

      {/* First page + ellipsis */}
      {startPage > 1 && (
        <>
          <Link href="/blog?page=1">
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-700 hover:bg-zinc-800 h-9 w-9 p-0"
            >
              1
            </Button>
          </Link>
          {startPage > 2 && <span className="text-zinc-500 text-sm px-0.5">…</span>}
        </>
      )}

      {/* Visible page numbers */}
      {pages.map((page) => (
        <Link key={page} href={`/blog?page=${page}`}>
          <Button
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            className={`h-9 w-9 p-0 ${
              page === currentPage
                ? "bg-primary text-primary-foreground"
                : "border-zinc-700 hover:bg-zinc-800"
            }`}
          >
            {page}
          </Button>
        </Link>
      ))}

      {/* Last page + ellipsis */}
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-zinc-500 text-sm px-0.5">…</span>}
          <Link href={`/blog?page=${totalPages}`}>
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-700 hover:bg-zinc-800 h-9 w-9 p-0"
            >
              {totalPages}
            </Button>
          </Link>
        </>
      )}

      {/* Next Button */}
      <Link
        href={`/blog?page=${currentPage + 1}`}
        className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
        aria-label="Página siguiente"
      >
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          className="border-zinc-700 hover:bg-zinc-800 h-9 w-9 sm:w-auto sm:px-3 p-0"
        >
          <span className="hidden sm:inline">Siguiente</span>
          <ChevronRight className="w-4 h-4 sm:ml-1" />
        </Button>
      </Link>
    </nav>
  );
}
