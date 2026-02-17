import { config } from 'dotenv';
config({ path: '.env.local' });

const SLUG = 'deja-de-buscar-empieza-a-filtrar-fomo-inverso';
const BASE = 'http://localhost:3000';
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_TOKEN;

async function sanityQuery(query) {
  const url = `https://${projectId}.api.sanity.io/v2023-05-03/data/query/${dataset}?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` }});
  return (await res.json()).result;
}

async function sanityMutate(mutations) {
  const url = `https://${projectId}.api.sanity.io/v2023-05-03/data/mutate/${dataset}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ mutations })
  });
  return await res.json();
}

async function main() {
  // 1. Get the post
  const post = await sanityQuery(`*[_type == "post" && slug.current == "${SLUG}"][0]{_id, title, content}`);
  console.log('Post:', post.title, '| ID:', post._id);

  // 2. Delete any existing broken audioResource
  const existingAudio = await sanityQuery(`*[_type == "audioResource" && post._ref == "${post._id}"]{_id, status, "segCount": count(audioSegments)}`);
  if (existingAudio && existingAudio.length > 0) {
    console.log(`Found ${existingAudio.length} existing audioResource(s), deleting...`);
    for (const doc of existingAudio) {
      console.log(`  Deleting ${doc._id} (status: ${doc.status}, segments: ${doc.segCount})`);
      await sanityMutate([{ delete: { id: doc._id } }]);
    }
    console.log('Deleted all existing audio resources');
  }

  // 3. Create fresh audioResource
  console.log('\nCreating new audioResource...');
  const createRes = await fetch(`${BASE}/api/audio/save-resources`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode: 'create', postId: post._id, status: 'generating', voice: 'onyx' })
  });
  const audioDoc = await createRes.json();
  console.log('Created:', audioDoc._id);

  // 4. Extract and chunk text
  const text = post.content.replace(/[#*`_\[\]()]/g, '').replace(/\n{3,}/g, '\n\n').trim();
  console.log(`Text: ${text.length} chars`);

  const MAX_CHUNK = 1500;
  const chunks = [];
  let current = '';
  for (const para of text.split('\n\n')) {
    if ((current + para).length > MAX_CHUNK && current.trim()) {
      chunks.push(current.trim());
      current = para + '\n\n';
    } else {
      current += para + '\n\n';
    }
  }
  if (current.trim()) chunks.push(current.trim());
  console.log(`Chunks: ${chunks.length}`);

  // 5. Generate audio for each chunk
  const audioUrls = [];
  for (let i = 0; i < chunks.length; i++) {
    console.log(`\nGenerating chunk ${i+1}/${chunks.length} (${chunks[i].length} chars)...`);
    const genRes = await fetch(`${BASE}/api/audio/generate-chunk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: chunks[i], voice: 'onyx', segmentIndex: i, postId: post._id })
    });
    
    if (!genRes.ok) {
      const err = await genRes.text();
      console.log(`❌ FAILED: ${err}`);
      await fetch(`${BASE}/api/audio/save-resources`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mode: 'update', _id: audioDoc._id, status: 'error', audioSegments: [] })
      });
      process.exit(1);
    }
    
    const data = await genRes.json();
    console.log(`✅ ${data.url}`);
    audioUrls.push(data.url);
  }

  // 6. Update Sanity with completed status
  console.log('\nFinalizing...');
  await fetch(`${BASE}/api/audio/save-resources`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mode: 'update', _id: audioDoc._id, status: 'completed', audioSegments: audioUrls })
  });

  // 7. Verify
  const verify = await sanityQuery(`*[_type == "audioResource" && post._ref == "${post._id}"][0]{status, "segCount": count(audioSegments), audioSegments}`);
  console.log('\n=== VERIFICATION ===');
  console.log('Status:', verify.status);
  console.log('Segments:', verify.segCount);
  verify.audioSegments?.forEach((u, i) => console.log(`  ${i+1}: ${u}`));
  console.log('\n✅ DONE! Audio will appear on the blog post page.');
}

main().catch(e => { console.error('FATAL:', e); process.exit(1); });
