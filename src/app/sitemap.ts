import type { MetadataRoute } from "next";
import { createClient } from "@supabase/supabase-js";
import { client } from "@/sanity/lib/client";
import { normalizeTagSlug } from "@/lib/normalize-tag";

export const dynamic = "force-dynamic";

const baseUrl = "https://www.juanarangoecommerce.com";

type SanityContent = {
  posts: { slug: string; category?: string; updatedAt: string; tags?: string[] }[];
  comparisons: { slug: string; updatedAt: string }[];
  apps: { slug: string; updatedAt: string }[];
};

async function getPseoRoutes(): Promise<MetadataRoute.Sitemap> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];

  const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
  const { data } = await supabase.from("pseo_pages").select("slug, updated_at");
  return (data ?? []).map((page) => ({
    url: `${baseUrl}/soluciones/nitro-commerce/${page.slug}`,
    lastModified: page.updated_at ? new Date(page.updated_at) : undefined,
    changeFrequency: "monthly" as const,
    priority: 0.55,
  }));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    ["", 1], ["/nitro-complete", 1], ["/soluciones", 0.9], ["/nitrobot", 0.9], ["/soluciones/nitro-landing", 0.9],
    ["/soluciones/nitro-commerce", 0.9], ["/diagnostico", 0.9], ["/casos", 0.75],
    ["/industrias", 0.7], ["/sobre-mi", 0.7], ["/blog", 0.8], ["/guias", 0.7],
    ["/guias/shopify", 0.65], ["/guias/mcp", 0.6], ["/guias/claude-code", 0.6],
    ["/guias/openclaw-ai", 0.6], ["/app-tools", 0.65], ["/comparar", 0.65],
    ["/shopify", 0.7], ["/blog/prompts", 0.55], ["/newsletter", 0.45],
    ["/laboratorio", 0.45], ["/soluciones/clinicas", 0.65], ["/soluciones/nitro-retail", 0.65],
    ["/soluciones/nitro-inmobiliaria", 0.65], ["/soluciones/nitro-search", 0.5],
    ["/nitro-strategy", 0.5], ["/legal", 0.2], ["/legal/privacidad", 0.2],
    ["/legal/terminos", 0.2], ["/legal/cookies", 0.2], ["/legal/aviso-legal", 0.2],
  ].map(([route, priority]) => ({ url: `${baseUrl}${route}`, changeFrequency: route === "" ? "weekly" : "monthly", priority: Number(priority) })) as MetadataRoute.Sitemap;

  const content = await client.fetch<SanityContent>(`{
    "posts": *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))] {
      "slug": slug.current, category, "updatedAt": _updatedAt, tags
    },
    "comparisons": *[_type == "appComparison" && defined(slug.current) && !(_id in path("drafts.**"))] {
      "slug": slug.current, "updatedAt": _updatedAt
    },
    "apps": *[_type == "appTool" && defined(slug.current) && !(_id in path("drafts.**"))] {
      "slug": slug.current, "updatedAt": _updatedAt
    }
  }`);

  const postRoutes = content.posts.map((post) => ({
    url: post.category ? `${baseUrl}/blog/${post.category}/${post.slug}` : `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt), changeFrequency: "monthly" as const, priority: 0.6,
  }));

  const categories = new Map<string, string>();
  const tags = new Map<string, { count: number; updatedAt: string }>();
  for (const post of content.posts) {
    if (post.category && (!categories.has(post.category) || categories.get(post.category)! < post.updatedAt)) categories.set(post.category, post.updatedAt);
    for (const tag of post.tags ?? []) {
      const slug = normalizeTagSlug(tag);
      const current = tags.get(slug);
      tags.set(slug, { count: (current?.count ?? 0) + 1, updatedAt: !current || current.updatedAt < post.updatedAt ? post.updatedAt : current.updatedAt });
    }
  }

  const categoryRoutes = [...categories].map(([slug, updatedAt]) => ({ url: `${baseUrl}/blog/${slug}`, lastModified: new Date(updatedAt), changeFrequency: "weekly" as const, priority: 0.7 }));
  const tagRoutes = [...tags].filter(([, value]) => value.count >= 3).map(([slug, value]) => ({ url: `${baseUrl}/blog/tags/${slug}`, lastModified: new Date(value.updatedAt), changeFrequency: "monthly" as const, priority: 0.45 }));
  const comparisonRoutes = content.comparisons.map((item) => ({ url: `${baseUrl}/comparar/${item.slug}`, lastModified: new Date(item.updatedAt), changeFrequency: "monthly" as const, priority: 0.6 }));
  const appRoutes = content.apps.map((item) => ({ url: `${baseUrl}/app-tools/${item.slug}`, lastModified: new Date(item.updatedAt), changeFrequency: "monthly" as const, priority: 0.55 }));
  const pseoRoutes = await getPseoRoutes();

  return [...staticRoutes, ...categoryRoutes, ...postRoutes, ...tagRoutes, ...comparisonRoutes, ...appRoutes, ...pseoRoutes];
}
