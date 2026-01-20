"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, Sparkles } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/use-debounce"; 
import { searchBlog, type SearchResult } from "@/app/actions/search-blog";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function BlogSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Debounce the query for the suggestions fetching (300ms is usually snappy enough)
  const debouncedQuery = useDebounce(query, 300);

  // Sync with URL param on load
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setQuery(q);
  }, [searchParams]);

  // Fetch suggestions when debounced query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (debouncedQuery.length < 3) {
        setSuggestions([]);
        setIsOpen(false);
        return;
      }

      setIsLoading(true);
      try {
        console.log("🔍 Client requesting search for:", debouncedQuery);
        const results = await searchBlog(debouncedQuery);
        console.log("✅ Client received results:", results);
        setSuggestions(results);
        setIsOpen(true);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update URL function (triggered on Enter or selection)
  const handleSearch = (term: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    router.replace(`?${params.toString()}`, { scroll: false });
    setIsOpen(false); // Close dropdown after search
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(query);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto z-30">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
             {isLoading ? (
                <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
             ) : (
                <Search className="w-5 h-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
             )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.length >= 3) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) setIsOpen(true);
          }}
          placeholder="¿Qué quieres aprender hoy? (ej: estrategias de marketing, seo técnico...)"
          className="w-full pl-12 pr-4 py-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-lg backdrop-blur-sm"
        />
        
        {/* Helper Text / Badge */}
        <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
            {query.length > 0 && query.length < 3 && (
                <span className="text-xs text-zinc-500">Escribe al menos 3 caracteres...</span>
            )}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (query.length >= 3) && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900/95 backdrop-blur-xl border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2">
            
            {isLoading ? (
                 <div className="px-4 py-3 text-sm text-zinc-500 flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Buscando...
                 </div>
            ) : suggestions.length > 0 ? (
                <div className="py-2">
                    <div className="px-4 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                        <Sparkles className="w-3 h-3 text-emerald-500" />
                        Sugerencias Inteligentes
                    </div>
                    {suggestions.map((post) => (
                        <Link 
                            key={post.id} 
                            href={`/blog/${post.slug}`}
                            className="block px-4 py-3 hover:bg-zinc-800/50 transition-colors group"
                            onClick={() => setIsOpen(false)}
                        >
                            <h4 className="text-sm font-medium text-zinc-200 group-hover:text-emerald-400 transition-colors">
                                {post.title}
                            </h4>
                            {post.excerpt && (
                                <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1 truncate">
                                    {post.excerpt}
                                </p>
                            )}
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="px-4 py-3 text-sm text-zinc-500 italic">
                    No se encontraron resultados para "{query}"
                </div>
            )}
        </div>
      )}
    </div>
  );
}
