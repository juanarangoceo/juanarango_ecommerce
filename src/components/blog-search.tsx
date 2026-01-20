"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { searchBlog, SearchResult } from "@/app/actions/search-blog";
import { useDebounce } from "@/hooks/use-debounce"; 
// Note: If useDebounce doesn't exist, we'll inline a simple one or create it.
// Assuming we might need to create it, I'll use a local timeout logic strictly for this component 
// if I don't want to assume the hook exists.
// Actually, I'll implement a simple debounce inside.

export function BlogSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Close dropdown on click outside
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 3) {
        setLoading(true);
        setOpen(true);
        const data = await searchBlog(query);
        setResults(data);
        setLoading(false);
      } else {
        setResults([]);
        setOpen(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl mx-auto mb-16 z-30">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          {loading ? (
             <Loader2 className="w-5 h-5 text-emerald-500 animate-spin" />
          ) : (
             <Search className="w-5 h-5 text-zinc-500 group-focus-within:text-emerald-500 transition-colors" />
          )}
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="¿Qué quieres aprender hoy? (ej: estrategias de marketing, seo técnico...)"
          className="w-full pl-12 pr-4 py-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all shadow-lg backdrop-blur-sm"
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
             <kbd className="hidden md:inline-flex h-6 items-center gap-1 rounded border border-zinc-800 bg-zinc-900 px-2 text-[10px] font-medium text-zinc-500 font-sans">
                Ctrl K
             </kbd>
        </div>
      </div>

      <AnimatePresence>
        {open && (query.length >= 3) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-zinc-950 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden"
          >
            {results.length > 0 ? (
              <div className="py-2">
                 <div className="px-4 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider flex items-center gap-2">
                    <Sparkles className="w-3 h-3 text-emerald-500" />
                    Resultados Relevantes
                 </div>
                 {results.map((post) => (
                   <Link 
                     key={post.id} 
                     href={`/blog/${post.slug}`}
                     onClick={() => setOpen(false)}
                     className="block px-4 py-3 hover:bg-zinc-900 transition-colors group"
                   >
                     <h4 className="text-zinc-200 font-medium group-hover:text-emerald-400 transition-colors flex items-center justify-between">
                        {post.title}
                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-emerald-500" />
                     </h4>
                     <p className="text-sm text-zinc-500 line-clamp-1 mt-1">{post.excerpt}</p>
                   </Link>
                 ))}
              </div>
            ) : (
              !loading && (
                  <div className="p-6 text-center text-zinc-500">
                    <p>No encontramos artículos exactos para eso.</p>
                    <p className="text-sm mt-1">Intenta con otras palabras clave.</p>
                  </div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
