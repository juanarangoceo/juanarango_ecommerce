
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function inspect() {
  console.log('Fetching slugs from pseo_pages...');
  
  const { data, error } = await supabase
    .from('pseo_pages')
    .select('id, slug, nicho, ciudad');

  if (error) {
    console.error('Error fetching pages:', error);
  } else {
    console.log('Found pages:', data.length);
    data.forEach(p => {
      console.log(`- Slug: "${p.slug}" | Nicho: "${p.nicho}" | Ciudad: "${p.ciudad}"`);
    });
  }
  process.exit(0);
}

inspect();
