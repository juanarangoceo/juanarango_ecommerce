"use client";

import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce"; 
// Note: If useDebounce doesn't exist, we'll inline a simple one or create it.
// Assuming we might need to create it, I'll use a local timeout logic strictly for this component 
// if I don't want to assume the hook exists.
// Actually, I'll implement a simple debounce inside.

export function BlogSearch() {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    // Sync local state with URL param on load
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams]);

  useEffect(() => {
    // When debounced query changes, update URL
    // Only if it's different from current param to avoid loops
    const currentQ = searchParams.get("q") || "";
    
    if (debouncedQuery !== currentQ) {
       const params = new URLSearchParams(searchParams.toString());
       if (debouncedQuery) {
         params.set("q", debouncedQuery);
       } else {
         params.delete("q");
       }
       router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [debouncedQuery, router, searchParams]);

  return (
    <div className="relative w-full max-w-2xl mx-auto z-30">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
             <Search className="w-5 h-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="¿Qué quieres aprender hoy? (ej: estrategias de marketing, seo técnico...)"
          className="w-full pl-12 pr-4 py-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-lg backdrop-blur-sm"
        />
      </div>
    </div>
  );
}
