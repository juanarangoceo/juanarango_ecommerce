import Link from "next/link";
import { ArrowRight, Bell, Calendar } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string | null;
  _createdAt: string;
  excerpt?: string;
}

interface LatestNewsColumnProps {
  posts: Post[];
  tagLink: string;
  theme?: "light" | "dark";
}

export function LatestNewsColumn({
  posts,
  tagLink,
  theme = "light",
}: LatestNewsColumnProps) {
  const isDark = theme === "dark";

  return (
    <div
      className={`rounded-2xl border p-5 sm:p-6 ${
        isDark
          ? "bg-white/5 border-white/10"
          : "bg-white border-slate-200 shadow-sm"
      }`}
    >
      <div className="flex items-center gap-3 mb-6">
        <div
          className={`p-2 rounded-lg ${
            isDark ? "bg-[#e05a3a]/10 text-[#e05a3a]" : "bg-[#95BF47]/10 text-[#95BF47]"
          }`}
        >
          <Bell size={20} />
        </div>
        <h3
          className={`font-bold text-lg ${
            isDark ? "text-white" : "text-slate-900"
          }`}
        >
          Últimas Noticias
        </h3>
      </div>

      <div className="space-y-6">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Link
              key={post._id}
              href={`/blog/${post.slug.current}`}
              className={`group flex flex-col gap-2 pb-5 border-b border-dashed last:border-0 last:pb-0 ${
                isDark ? "border-white/10" : "border-slate-200"
              }`}
            >
              <h4
                className={`font-semibold text-sm line-clamp-3 leading-snug group-hover:underline ${
                  isDark ? "text-zinc-200 group-hover:text-[#e05a3a]" : "text-slate-800 group-hover:text-[#95BF47]"
                } transition-colors`}
              >
                {post.title}
              </h4>
              <div className="flex items-center gap-1.5 mt-1">
                <Calendar size={13} className={isDark ? "text-zinc-500" : "text-slate-400"} />
                <span className={`text-xs ${isDark ? "text-zinc-500" : "text-slate-500"}`}>
                  {post.publishedAt
                    ? format(new Date(post.publishedAt), "dd MMM yyyy", { locale: es })
                    : format(new Date(post._createdAt), "dd MMM yyyy", { locale: es })}
                </span>
              </div>
            </Link>
          ))
        ) : (
          <div className="py-6 text-center">
            <p className={`text-sm ${isDark ? "text-zinc-500" : "text-slate-500"}`}>
              No hay noticias recientes en esta categoría por el momento.
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-5 border-t border-dashed border-white/10">
        <Link
          href={tagLink}
          className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
            isDark
              ? "text-zinc-400 hover:text-[#e05a3a]"
              : "text-slate-600 hover:text-[#95BF47]"
          }`}
        >
          Ver todos los artículos
          <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
