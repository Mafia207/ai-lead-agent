const { GoogleGenAI } = require('@google/genai');

module.exports = async function handler(req, res) {
  // 1. Check if it's a POST request
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // 2. Load the key
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'The GEMINI_API_KEY is missing from Vercel.' });
    }

    // 3. Connect to Google Gen AI
    const ai = new GoogleGenAI({ apiKey: apiKey });
    const userMessage = req.body?.message || "Hello";

    // 4. Generate the response
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: userMessage,
      config: {
        systemInstruction: "You are a helpful virtual receptionist for Bright Smile Dental. Keep answers short and friendly."
      }
    });

    // 5. Send success reply
    res.status(200).json({ reply: response.text });
    
  } catch (error) {
    console.error("Runtime Error:", error);
    res.status(500).json({ 
      error: 'API Error',
      details: error.message
    });
  }
};