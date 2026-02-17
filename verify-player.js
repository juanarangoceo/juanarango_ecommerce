const http = require('http');

const url = 'http://localhost:3000/blog/ecommerce/deja-de-buscar-empieza-a-filtrar-fomo-inverso';

console.log(`Fetching ${url}...`);

http.get(url, (res) => {
  let data = '';
  res.on('data', (chunk) => data += chunk);
  res.on('end', () => {
    if (data.includes('Escuchar:') || data.includes('blog-audio-player')) {
      console.log('✅ Audio player FOUND on page!');
      // Extract the title part to be sure
      const match = data.match(/Escuchar: [^<]+/);
      if (match) console.log(`   Text found: "${match[0]}"`);
    } else {
      console.log('❌ Audio player NOT found on page.');
      console.log('   Page size:', data.length);
      // Check if title exists to ensure 404
      if (data.includes('Deja de buscar, empieza a filtrar')) {
         console.log('   Page loaded successfully (Title found).');
      } else {
         console.log('   Page might be 404 or error.');
      }
    }
  });
}).on('error', (err) => {
  console.error('Error:', err.message);
});
