const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config({ path: '.env.local' });

async function testImageGen() {
  const apiKey = process.env.GOOGLE_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const modelName = "gemini-2.0-flash";
  console.log(`\nTesting Image Generation with model: ${modelName} (Safe Prompt)...`);
    
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const prompt = "Generate an image of a bowl of fruit on a table. Highly detailed.";
    
    // Some docs suggest sending 'image_generation_config' or similar, but let's try plain prompt first 
    // as gemini 2.0 is supposed to be natively multimodal.
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    console.log("Response text:", response.text ? response.text() : "No text");
    
    if (response.candidates && response.candidates.length > 0) {
        const parts = response.candidates[0].content.parts;
        console.log("Parts count:", parts.length);
        parts.forEach((part, i) => {
            console.log(`Part ${i} keys:`, Object.keys(part));
            if (part.inlineData) {
                console.log(`Part ${i} looks like image/data! MimeType: ${part.inlineData.mimeType}`);
            }
             if (part.executableCode) {
                console.log(`Part ${i} is executable code.`);
            }
        });
    }

  } catch (error) {
      console.log(`FAILED: ${error.message}`);
  }
}

testImageGen();
