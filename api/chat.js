import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key is missing in Vercel' });
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });
    const userMessage = req.body?.message || "Hello";

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: "You are a helpful virtual receptionist for Bright Smile Dental. Keep answers short and friendly."
      }
    });

    res.status(200).json({ reply: response.text });
    
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: 'Failed to generate response', details: error.message });
  }
}