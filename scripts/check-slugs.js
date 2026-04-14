const fs = require('fs');
const dotenv = require('dotenv');
const envConfig = dotenv.parse(fs.readFileSync('.env.local'));

fetch('https://75jg16ba.api.sanity.io/v2023-05-03/data/query/production?query=*[_type=="b2bSolution"]{_id, slug}', {
  headers: {
    'Authorization': 'Bearer ' + envConfig.SANITY_API_TOKEN
  }
}).then(r => r.json()).then(r => console.log(JSON.stringify(r.result, null, 2))).catch(console.error);
