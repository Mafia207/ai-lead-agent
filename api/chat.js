export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key is missing' });
    }

    const userMessage = req.body?.message || "Hello";

    // Call Gemini directly via Google's secure REST API endpoint
    const apiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }],
          systemInstruction: { parts: [{ text: "You are a helpful virtual receptionist for Bright Smile Dental. Keep answers short and friendly." }] }
        })
      }
    );

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      return res.status(500).json({ error: data.error?.message || 'Gemini API failed' });
    }

    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Hello! How can I help you with your dental visit today?";

    return res.status(200).json({ reply: replyText });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}