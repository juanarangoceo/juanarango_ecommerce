import Link from "next/link";
import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { constructMetadata } from "@/lib/utils";
import { supabaseAdmin, supabaseClient } from "@/lib/supabase";
import { PromptGalleryClient } from "@/components/blog/prompt-gallery-client";
import { NewsletterForm } from "@/components/newsletter-form";
import { NitroCtaCard } from "@/components/blog/nitro-cta-card";
import { SidebarAppsBanner } from "@/components/blog/sidebar-banners";
import { Zap, ArrowLeft, Sparkles } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Galería de Prompts de IA | Nitro Ecom",
  description:
    "Descubre prompts listos para usar con Midjourney, DALL·E, ChatGPT y más. Copia, da like y explora nuestra colección de prompts de IA.",
  canonical: "https://www.juanarangoecommerce.com/blog/prompts",
});

// ISR: revalidate every 10 minutes
export const revalidate = 600;

const PROMPTS_QUERY = `*[
  _type == "promptGallery"
  && isPublished == true
  && defined(image)
]|order(publishedAt desc, _createdAt desc) {
  _id,
  title,
  prompt,
  "imageUrl": image.asset->url,
  tool,
  category,
  requiresLogin,
  publishedAt
}`;

export default async function PromptsPage() {
  // ── Fetch ALL prompts from Sanity (filtering/pagination handled client-side)
  let allPrompts: any[] = [];

  try {
    allPrompts = await client.fetch(PROMPTS_QUERY);
  } catch (err) {
    console.error("Error fetching prompts:", err);
  }

  // ── Fetch like counts from Supabase ───────────────────────────────────
  let likeCounts: Record<string, number> = {};
  if (allPrompts.length > 0) {
    try {
      const supabase = supabaseAdmin || supabaseClient;
      const { data } = await supabase
        .from("prompt_likes")
        .select("prompt_id, count")
        .in("prompt_id", allPrompts.map((p) => p._id));
      (data || []).forEach((row: { prompt_id: string; count: number }) => {
        likeCounts[row.prompt_id] = row.count;
      });
    } catch {
      // likes fail silently — UI still works, just starts at 0
    }
  }

  return (
    <main className="container mx-auto px-4 py-20 min-h-screen">
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="mb-10">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-300 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver al Blog
        </Link>

        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/20 shrink-0 mt-1">
            <Sparkles className="w-7 h-7 text-purple-400" />
          </div>
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-white mb-2">
              Galería de{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Prompts
              </span>
            </h1>
            <p className="text-zinc-400 text-lg">
              Prompts listos para usar.{" "}
              <span className="text-purple-400 font-medium">Copia</span>, da{" "}
              <span className="text-rose-400 font-medium">like</span> y
              comparte tu favorito.
            </p>
          </div>
        </div>
      </div>

      {/* ── Main 2-Column Layout ─────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* LEFT: Interactive Gallery (col-8) */}
        <div className="lg:col-span-8">
          {allPrompts.length > 0 ? (
            <PromptGalleryClient prompts={allPrompts} likeCounts={likeCounts} />
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <Sparkles className="w-12 h-12 text-purple-400 mb-4 opacity-50" />
              <p className="text-xl text-zinc-400 mb-2">
                Aún no hay prompts publicados.
              </p>
              <p className="text-sm text-zinc-600">
                Vuelve pronto — estamos preparando la colección.
              </p>
            </div>
          )}
        </div>

        {/* RIGHT: Sidebar sticky (col-4) */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-24 space-y-6">
            {/* Prompts Stats Banner */}
            <div className="relative overflow-hidden rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-950/80 via-zinc-900/90 to-zinc-900/80 p-5">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
              <div className="relative flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/15 border border-purple-500/20 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-purple-400/80">
                    Colección
                  </span>
                  <p className="text-sm font-bold text-white leading-tight">
                    {allPrompts.length} Prompts disponibles
                  </p>
                </div>
              </div>
              <p className="relative text-xs text-zinc-400 leading-relaxed">
                Creados y probados con las mejores herramientas de IA.
                Actualizado semanalmente.
              </p>
            </div>

            {/* Top Apps Banner */}
            <SidebarAppsBanner />

            {/* CTA Nitro */}
            <NitroCtaCard />

            {/* Newsletter */}
            <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6">
              <NewsletterForm />
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
