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

export async function analyzeSkin(imageBase64: string): Promise<AnalysisResult> {
  if (!process.env.API_KEY) {
    throw new Error("API Key not configured");
  }

  const model = 'gemini-2.0-flash'; // Using a stable model

  console.log("Starting skin analysis...");

  try {
    const response = await ai.models.generateContent({
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
            text: "Eres un esteticista profesional de clase mundial. Analiza esta imagen facial para evaluar la salud de la piel. Identifica el tipo de piel (seca, grasa, mixta, sensible, normal), preocupaciones específicas (como deshidratación, daño solar, líneas finas, rojeces o acné) y sugiere 3 tratamientos de spa de alta gama. Sé empático y profesional. IMPORTANTE: Toda la respuesta (nombres de tratamientos, descripciones y consejos) debe estar en ESPAÑOL. Devuelve los resultados en formato JSON.",
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
    const result = JSON.parse(textResponse);
    return result as AnalysisResult;

  } catch (error) {
    console.error("Error analyzing skin:", error);
    throw new Error("Failed to analyze skin.");
  }
}
