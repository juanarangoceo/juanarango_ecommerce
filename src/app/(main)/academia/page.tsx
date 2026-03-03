import { Metadata } from 'next';
import { client } from '@/sanity/lib/client';
import { CursoCard } from '@/components/academia/curso-card';
import { GraduationCap, Sparkles } from 'lucide-react';
import { constructMetadata } from '@/lib/utils';

export const metadata: Metadata = constructMetadata({
  title: 'Nitro Academia | Cursos Especializados en E-commerce',
  description: 'Desbloquea tu potencial. Aprende estrategias avanzadas de E-commerce, IA y Automatización para escalar tu negocio digital.',
  canonical: 'https://www.juanarangoecommerce.com/academia'
});

export const revalidate = 3600; // Cache por 1 hora

const ACADEMIA_QUERY = `
  *[_type == "curso" && estado != "borrador"]
  | order(destacado desc, orden asc, _createdAt desc) {
    _id,
    titulo,
    slug,
    descripcionCorta,
    imagen,
    categoria,
    temario,
    tiempoEstudio,
    nivel,
    precio,
    precioAnterior,
    esPago,
    estado,
    fechaLanzamiento,
    destacado,
    urlLanding,
    urlPago,
    urlVideo,
    descripcionLarga,
    garantia,
    valorTotal,
    mensajeUrgencia,
    sloganOferta,
    publicoObjetivo,
    contenido[] {
      titulo,
      lecciones
    }
  }
`;

export default async function AcademiaPage() {
  let cursos: any[] = [];
  
  try {
    cursos = await client.fetch(ACADEMIA_QUERY);
  } catch (error) {
    console.error('Error fetching cursos for Academia:', error);
  }

  // Separar cursos destacados si es necesario, o visualizarlos directamente.
  // Por ahora renderizaremos todos en un Grid.

  return (
    <main className="bg-background min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header Hero */}
        <header className="mb-16 text-center max-w-3xl mx-auto relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-12 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20 mb-6 text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            La academia para e-commerce
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white tracking-tight mb-6">
            Nitro <span className="text-primary relative">
              Academia
              <GraduationCap className="absolute -top-8 -right-8 w-12 h-12 text-primary/40 -rotate-12" />
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground leading-relaxed">
            Estrategias avanzadas y paso a paso para hacer crecer tu tienda online. Desde la base hasta técnicas de automatización e inteligencia artificial.
          </p>
        </header>

        {/* Content */}
        {cursos.length > 0 ? (
          <div className="flex flex-col gap-6 relative z-10 max-w-5xl mx-auto">
            {cursos.map((curso) => (
              <CursoCard key={curso._id} curso={curso} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-zinc-900/30 rounded-3xl border border-zinc-800/50">
             <div className="w-20 h-20 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="w-10 h-10 text-zinc-500" />
             </div>
             <h3 className="text-2xl font-bold text-white mb-2">Próximamente Formaciones</h3>
             <p className="text-zinc-400 max-w-md mx-auto">
               Estamos preparando el mejor contenido para ayudarte a escalar tu negocio. Regresa pronto para descubrir nuevos cursos.
             </p>
          </div>
        )}
      </div>
    </main>
  );
}
