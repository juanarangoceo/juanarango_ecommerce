import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { constructMetadata } from '@/lib/utils';
import { LatestNewsColumn } from '../_components/LatestNewsColumn';
import { McpGuideContent } from './_components/McpGuideContent';

export const metadata: Metadata = constructMetadata({
  title: "Guía Definitiva de MCP 2026 | El Estándar Universal para IAs",
  description: "Descubre cómo instalar y utilizar el Model Context Protocol (MCP) para conectar IAs con tus bases de datos, herramientas locales y repositorios corporativos.",
  canonical: "https://www.juanarangoecommerce.com/guias/mcp",
});

const MCP_POSTS_QUERY = `
  *[_type == "post" && (
    "mcp" in tags[] ||
    "ia-automatizacion" in tags[] ||
    "inteligencia-artificial" in tags[] ||
    "claude" in tags[]
  ) && defined(slug.current)] | order(coalesce(publishedAt, _createdAt) desc) [0...5] {
    _id,
    title,
    slug,
    publishedAt,
    _createdAt,
    mainImage,
    excerpt
  }
`;

export default async function McpGuidePage() {
  const posts = await client.fetch<any[]>(MCP_POSTS_QUERY);
  
  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#ff6b4a]/30 selection:text-white pt-[64px]">
      <div className="flex w-full max-w-[1800px] mx-auto relative content-start flex-col xl:flex-row">
        
        {/* Left Nav & Main Content managed by Client Component */}
        <McpGuideContent />

        {/* Right Sidebar - Desktop */}
        <aside className="hidden xl:block w-[340px] shrink-0 py-10 pr-8">
          <div className="sticky top-[100px] bg-[#141414] rounded-3xl p-6 border border-white/5 shadow-sm">
            <h3 className="font-serif text-2xl font-bold mb-6 text-white border-b border-white/10 pb-4">Últimas Noticias</h3>
            <LatestNewsColumn posts={posts} tagLink="/blog/tags/ia-automatizacion" theme="dark" />
          </div>
        </aside>

        {/* Mobile Right Sidebar block rendered below main content in McpGuideContent, but for structure we can place it here if it's outside main */}
        <div className="xl:hidden pb-24 border-t border-white/10 pt-12 px-6">
           <h3 className="font-serif text-3xl font-bold mb-6 text-white">Noticias Relacionadas</h3>
          <LatestNewsColumn posts={posts} tagLink="/blog/tags/ia-automatizacion" theme="dark" />
        </div>
      </div>
    </div>
  );
}
