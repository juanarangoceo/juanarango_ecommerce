
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const genericPage = {
  slug: 'clinicas-esteticas-global',
  nicho: 'Clínicas Estéticas',
  nicho_plural: 'Clínicas Estéticas y Centros de Bienestar',
  ciudad: 'Latinoamérica',
  departamento: 'Global',
  subtitulo_contextual: 'La infraestructura digital que escala tu clínica estética a niveles internacionales.',
  texto_autoridad: 'Líderes en transformación digital para el sector salud y estética.',
  mencion_local: 'Sin importar tu ubicación, llevamos tu clínica al siguiente nivel.',
  parrafo_valor: 'Desde Bogotá hasta Ciudad de México, nuestra tecnología Nitro Commerce elimina fronteras, permitiendo que tu clínica opere con la velocidad y eficiencia de una franquicia global.',
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
