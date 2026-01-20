import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateEmbedding(text: string): Promise<number[]> {
  // OpenAI recommends replacing newlines with spaces for best results
  const input = text.replace(/\n/g, ' ');

  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input,
    encoding_format: 'float',
  });

  return response.data[0].embedding;
}
