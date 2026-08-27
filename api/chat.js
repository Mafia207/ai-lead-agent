import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    const message = req.body?.message || "Hello";

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: message,
    });

    return res.status(200).json({ reply: response.text });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}