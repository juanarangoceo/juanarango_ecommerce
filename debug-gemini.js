const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function listModels() {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    console.error("ERROR: GOOGLE_API_KEY is missing");
    return;
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  // Access the model manager to list models is not directly exposed in the high level GoogleGenerativeAI class easily in all versions, 
  // but let's try a standard model first like 'gemini-pro' to see if it works, 
  // OR try to just print the error details more clearly.
  
  // Found via list-models.js: gemini-2.0-flash is available.
  const modelsToTry = ["gemini-2.0-flash"];
  
  for (const modelName of modelsToTry) {
    console.log(`\nTesting model: ${modelName}...`);
    try {
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Test.");
      const response = await result.response;
      console.log(`SUCCESS with ${modelName}`);
      return; 
    } catch (error) {
        console.log(`FAILED with ${modelName}: ${error.message}`);
    }
  }
}

listModels();
