"use client";

import { useState, useMemo } from "react";
import { PromptCard, CATEGORY_CONFIG } from "@/components/blog/prompt-card";
import { PromptCardLocked } from "@/components/blog/prompt-card-locked";
import { LoginModal } from "@/components/auth/login-modal";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const PROMPTS_PER_PAGE = 12;

interface Prompt {
  _id: string;
  title: string;
  prompt: string;
  imageUrl: string;
  tool: string;
  category?: string;
  publishedAt?: string;
  requiresLogin?: boolean;
}

interface PromptGalleryClientProps {
  prompts: Prompt[];
  likeCounts: Record<string, number>;
}

const CATEGORIES = [
  { value: "todos", label: "✨ Todos" },
  ...Object.entries(CATEGORY_CONFIG).map(([value, cfg]) => ({
    value,
    label: cfg.label,
  })),
];

export function PromptGalleryClient({ prompts, likeCounts }: PromptGalleryClientProps) {
  const { user, loading: authLoading } = useAuth();
  const [activeCategory, setActiveCategory] = useState("todos");
  const [currentPage, setCurrentPage] = useState(1);
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Filter prompts by category
  const filtered = useMemo(() => {
    if (activeCategory === "todos") return prompts;
    return prompts.filter((p) => p.category === activeCategory);
  }, [prompts, activeCategory]);

  // Paginate
  const totalPages = Math.max(1, Math.ceil(filtered.length / PROMPTS_PER_PAGE));
  const start = (currentPage - 1) * PROMPTS_PER_PAGE;
  const paginated = filtered.slice(start, start + PROMPTS_PER_PAGE);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentPage(1);
  };

  return (
    <div>
      {/* Category Filter Pills */}
      <div className="flex gap-2 overflow-x-auto pb-2 pt-1 scrollbar-hide flex-nowrap mb-8">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.value;
          const cfg = cat.value !== "todos" ? CATEGORY_CONFIG[cat.value] : null;
          return (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={`shrink-0 inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
                isActive
                  ? cfg
                    ? `${cfg.bg} ${cfg.border} ${cfg.color} shadow-sm`
                    : "bg-white/10 border-white/20 text-white shadow-sm"
                  : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 hover:border-zinc-600"
              }`}
            >
              {cat.label}
              <span
                className={`ml-2 text-[10px] font-bold tabular-nums px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-zinc-800 text-zinc-500"
                }`}
              >
                {cat.value === "todos"
                  ? prompts.length
                  : prompts.filter((p) => p.category === cat.value).length}
              </span>
            </button>
          );
        })}
      </div>

      {/* Prompt Grid */}
      {paginated.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginated.map((prompt, index) => {
              const isLocked = prompt.requiresLogin && !user && !authLoading;
              return isLocked ? (
                <PromptCardLocked
                  key={prompt._id}
                  prompt={prompt}
                  onLoginClick={() => setShowLoginModal(true)}
                />
              ) : (
                <PromptCard
                  key={prompt._id}
                  prompt={prompt}
                  initialLikeCount={likeCounts[prompt._id] ?? 0}
                  priority={index < 4}
                />
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav className="flex items-center justify-center gap-3 mt-12">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="border-zinc-700 hover:bg-zinc-800 h-9 px-3 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Anterior
              </Button>
              <span className="text-sm text-zinc-400">
                Página <span className="text-white font-semibold">{currentPage}</span> de{" "}
                <span className="text-white font-semibold">{totalPages}</span>
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="border-zinc-700 hover:bg-zinc-800 h-9 px-3 disabled:opacity-40"
              >
                Siguiente
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </nav>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center bg-zinc-900/40 rounded-2xl border border-zinc-800">
          <p className="text-lg text-zinc-400 mb-1">No hay prompts en esta categoría aún.</p>
          <button
            onClick={() => handleCategoryChange("todos")}
            className="mt-3 text-sm text-purple-400 hover:text-purple-300 underline underline-offset-2 transition-colors"
          >
            Ver todos los prompts
          </button>
        </div>
      )}

      {/* Login Modal */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          title="Accede a los Prompts Premium"
        />
      )}
    </div>
  );
}
