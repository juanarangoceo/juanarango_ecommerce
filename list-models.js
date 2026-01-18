const https = require('https');
require('dotenv').config({ path: '.env.local' });

const apiKey = process.env.GOOGLE_API_KEY;

if (!apiKey) {
  console.error("Missing API Key");
  process.exit(1);
}

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

https.get(url, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      const models = JSON.parse(data);
      console.log("Available Models:");
      models.models.forEach(m => console.log(`- ${m.name} (${m.supportedGenerationMethods})`));
    } else {
      console.error(`Error: Status Code ${res.statusCode}`);
      console.error("Response:", data);
    }
  });

}).on("error", (err) => {
  console.error("Error: ", err.message);
});
