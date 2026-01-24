import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function Pagination({ 
  currentPage, 
  totalPages 
}: { 
  currentPage: number; 
  totalPages: number;
}) {
  const pages = [];
  const maxVisible = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
  let endPage = Math.min(totalPages, startPage + maxVisible - 1);
  
  if (endPage - startPage < maxVisible - 1) {
    startPage = Math.max(1, endPage - maxVisible + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Previous Button */}
      <Link
        href={`/blog?page=${currentPage - 1}`}
        className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
      >
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === 1}
          className="border-zinc-700 hover:bg-zinc-800"
        >
          Anterior
        </Button>
      </Link>

      {/* Page Numbers */}
      {startPage > 1 && (
        <>
          <Link href="/blog?page=1">
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-700 hover:bg-zinc-800"
            >
              1
            </Button>
          </Link>
          {startPage > 2 && <span className="text-zinc-500">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Link key={page} href={`/blog?page=${page}`}>
          <Button
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            className={
              page === currentPage
                ? "bg-primary text-primary-foreground"
                : "border-zinc-700 hover:bg-zinc-800"
            }
          >
            {page}
          </Button>
        </Link>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-zinc-500">...</span>}
          <Link href={`/blog?page=${totalPages}`}>
            <Button
              variant="outline"
              size="sm"
              className="border-zinc-700 hover:bg-zinc-800"
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
      >
        <Button
          variant="outline"
          size="sm"
          disabled={currentPage === totalPages}
          className="border-zinc-700 hover:bg-zinc-800"
        >
          Siguiente
        </Button>
      </Link>
    </div>
  );
}
