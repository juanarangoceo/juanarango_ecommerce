"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Loader2, Sparkles, Command } from "lucide-react";
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
    <div ref={containerRef} className="relative w-full max-w-3xl mx-auto z-30 px-4">
      <div className="relative group perspective-1000">
        <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-0 group-focus-within:opacity-20 group-hover:opacity-10 transition duration-1000 blur-xl"></div>
        <div className="relative flex items-center bg-zinc-900/80 backdrop-blur-xl border border-white/5 rounded-full shadow-2xl overflow-hidden transition-all duration-300 group-focus-within:border-emerald-500/30 group-focus-within:bg-zinc-900/90 group-focus-within:ring-1 group-focus-within:ring-emerald-500/20">
            <div className="pl-6 pr-4 py-6 text-zinc-500 group-focus-within:text-emerald-400 transition-colors">
                 {isLoading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                 ) : (
                    <Search className="w-6 h-6" />
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
              placeholder="Encuentra soluciones de escalamiento..."
              className="w-full bg-transparent text-lg text-white placeholder:text-zinc-500 focus:outline-none py-4 font-light tracking-wide"
            />
            <div className="pr-6 pl-4">
                <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/5">
                    <Command className="w-4 h-4 text-zinc-500" />
                </div>
            </div>
        </div>
        
        {/* Helper Text / Badge */}
        <div className="absolute top-full left-0 right-0 mt-3 text-center pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity duration-500">
            {query.length > 0 && query.length < 3 && (
                <span className="text-xs text-zinc-500 animate-pulse">Teclea un poco más para buscar...</span>
            )}
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {isOpen && (query.length >= 3) && (
        <div className="absolute top-full left-4 right-4 mt-4 bg-zinc-950/90 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 z-50">
            
            {isLoading ? (
                 <div className="px-6 py-8 text-center text-sm text-zinc-500 flex flex-col items-center gap-3">
                    <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />
                    <span className="font-light">Explorando base de conocimiento...</span>
                 </div>
            ) : suggestions.length > 0 ? (
                <div className="py-2">
                    <div className="px-6 py-3 text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em] flex items-center gap-2 border-b border-white/5 mb-1">
                        <Sparkles className="w-3 h-3" />
                        Resultados encontrados
                    </div>
                    {suggestions.map((post) => (
                        <Link 
                            key={post.id} 
                            href={`/blog/${post.slug}`}
                            className="block px-6 py-4 hover:bg-white/5 transition-all duration-200 group relative overflow-hidden"
                            onClick={() => setIsOpen(false)}
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/0 to-emerald-500/0 group-hover:from-emerald-500/0 group-hover:via-emerald-500/5 group-hover:to-emerald-500/0 transition-all duration-500"></div>
                            
                            <h4 className="text-base font-medium text-zinc-200 group-hover:text-emerald-400 transition-colors relative z-10">
                                {post.title}
                            </h4>
                            {post.excerpt && (
                                <p className="text-sm text-zinc-500 mt-1 line-clamp-1 truncate font-light relative z-10 group-hover:text-zinc-400">
                                    {post.excerpt}
                                </p>
                            )}
                        </Link>
                    ))}
                    <div className="px-6 py-3 bg-white/5 text-center">
                         <button 
                            onClick={() => handleSearch(query)}
                            className="text-xs text-zinc-400 hover:text-white transition-colors"
                         >
                            Ver todos los resultados
                         </button>
                    </div>
                </div>
            ) : (
                <div className="px-6 py-8 text-center">
                    <div className="w-12 h-12 rounded-full bg-zinc-900 mx-auto flex items-center justify-center mb-3">
                        <Search className="w-5 h-5 text-zinc-600" />
                    </div>
                    <p className="text-sm text-zinc-400">
                        No encontramos nada sobre "<span className="text-white font-medium">{query}</span>"
                    </p>
                </div>
            )}
        </div>
      )}
    </div>
  );
}
