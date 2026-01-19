const { GoogleGenAI } = require("@google/genai");
require('dotenv').config({ path: '.env.local' });

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });

async function main() {
  const model = "gemini-3-flash-preview";
  console.log(`Testing model: ${model}...`);
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: "Explain how AI works in a few words",
    });
    console.log("SUCCESS. Response:");
    console.log(typeof response.text === 'function' ? response.text() : response.text);
  } catch (error) {
    console.error("FAILED:");
    console.error(error);
  }
}

main();
