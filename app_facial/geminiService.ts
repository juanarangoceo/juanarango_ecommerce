
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeFace = async (imageBase64: string): Promise<AnalysisResult> => {
  const model = 'gemini-3-flash-preview';
  
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

  const textResponse = response.text;
  const result = JSON.parse(textResponse);
  return result as AnalysisResult;
};
