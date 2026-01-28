
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const genericPage = {
  slug: 'alto-rendimiento-empresas-mundial',
  nicho: 'Negocios Digitales',
  nicho_plural: 'Empresas de Alto Rendimiento',
  ciudad: 'Global',
  departamento: 'Mundial',
  subtitulo_contextual: 'Infraestructura digital de velocidad obsesiva que impulsa negocios en todo el mundo.',
  texto_autoridad: 'Pioneros en arquitectura web de alto rendimiento y automatización empresarial.',
  mencion_local: 'Desde startups hasta empresas consolidadas, nuestra tecnología elimina fronteras.',
  parrafo_valor: 'Con tiempos de carga <200ms y sistemas automatizados de última generación, transformamos la forma en que las empresas operan digitalmente. Nuestra infraestructura ha impulsado negocios en más de 15 países, desde América Latina hasta Europa, demostrando que la velocidad y la eficiencia no conocen límites geográficos.',
  demo_url: null,
  config: {}
};

async function seed() {
  console.log('STARTING SEED SCIPT');
  // ... code ...
  // Check if exists
  const { data: existing } = await supabase
    .from('pseo_pages')
    .select('id')
    .eq('slug', genericPage.slug)
    .single();

  if (existing) {
    console.log('Generic page already exists, updating...');
    const { error } = await supabase
      .from('pseo_pages')
      .update(genericPage)
      .eq('slug', genericPage.slug);
      
    if (error) console.error('Error updating:', error);
    else console.log('Updated successfully');
  } else {
    console.log('Creating new generic page...');
    const { error } = await supabase
      .from('pseo_pages')
      .insert(genericPage);
      
    if (error) console.error('Error inserting:', error);
    else console.log('Inserted successfully');
  }
  console.log('Finished.');
  process.exit(0);
}

seed();
