'use server';

import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export interface SkinConcern {
  name: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
}

export interface RecommendedTreatment {
  title: string;
  benefits: string;
  duration: string;
}

export interface AnalysisResult {
  skinType: string;
  overallHealthScore: number;
  concerns: SkinConcern[];
  treatments: RecommendedTreatment[];
  expertAdvice: string;
}

// For Hobby plan compatibility, we configure timeout in page.tsx


export async function analyzeSkin(imageBase64: string): Promise<AnalysisResult> {
  const apiKey = process.env.API_KEY || process.env.GOOGLE_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("API Key is missing. Checked: API_KEY, GOOGLE_API_KEY, GEMINI_API_KEY");
    throw new Error("Server configuration error: API Key missing.");
  }
  
  // Re-initialize with the found key
  const localAi = new GoogleGenAI({ apiKey });

  // User requested "newest flash", assuming gemini-2.0-flash-exp
  const model = 'gemini-2.0-flash-exp';

  console.log(`Starting skin analysis with model: ${model}`);

  try {
    const response = await localAi.models.generateContent({
      model,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: imageBase64.split(',')[1] || imageBase64,
            },
          },
          {
            text: "Eres un esteticista profesional de clase mundial. Analiza esta imagen facial para evaluar la salud de la piel. Identifica el tipo de piel (seca, grasa, mixta, sensible, normal), preocupaciones específicas (como deshidratación, daño solar, líneas finas, rojeces o acné) y sugiere 3 tratamientos de spa de alta gama. Sé empático y profesional. IMPORTANTE: Toda la respuesta (nombres de tratamientos, descripciones y consejos) debe estar en ESPAÑOL. Devuelve los resultados en formato JSON plano, sin bloques de código markdown.",
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            skinType: { type: Type.STRING },
            overallHealthScore: { type: Type.NUMBER, description: "Puntuación de 0 a 100" },
            concerns: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  description: { type: Type.STRING },
                  severity: { type: Type.STRING, enum: ['low', 'medium', 'high'] },
                },
                required: ['name', 'description', 'severity']
              }
            },
            treatments: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  benefits: { type: Type.STRING },
                  duration: { type: Type.STRING },
                },
                required: ['title', 'benefits', 'duration']
              }
            },
            expertAdvice: { type: Type.STRING }
          },
          required: ['skinType', 'overallHealthScore', 'concerns', 'treatments', 'expertAdvice'],
        },
      },
    });

    const textResponse = response.text || "{}";
    // Sanitize response in case it contains markdown code blocks
    const cleanJson = textResponse.replace(/^```json\n/, '').replace(/\n```$/, '');
    
    console.log("Analysis successful.");
    const result = JSON.parse(cleanJson);
    return result as AnalysisResult;

  } catch (error) {
    console.error("Error analyzing skin:", error);
    // In production, the generic error "An error occurred in the Server Components render" is shown.
    // We log the real error on the server for debugging.
    throw new Error("Failed to analyze skin. Check server logs.");
  }
}
