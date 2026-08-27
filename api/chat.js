import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  // 1. Check if it's a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 2. Check if the API key is actually loading
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'The GEMINI_API_KEY is completely missing or empty.' });
    }

    // 3. Connect to the Google Gen AI SDK
    const ai = new GoogleGenAI({ apiKey: apiKey });
    
    // 4. Get the message safely
    const userMessage = req.body?.message || "Hello";

    // 5. Ask the AI
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: "You are a helpful virtual receptionist for Bright Smile Dental. Keep answers short and friendly."
      }
    });

    // 6. Send success
    res.status(200).json({ reply: response.text });
    
  } catch (error) {
    // 7. SEND THE EXACT ERROR TO THE BROWSER
    res.status(500).json({ 
      error: error.message || 'Unknown API Error',
      details: 'Check your Network tab response for this message'
    });
  }
}s