const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');
const authMiddleware = require('../middleware/authMiddleware');

const aiEngine = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Helper to handle retry delays
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

router.post('/chat', authMiddleware, async (req, res) => {
  try {
    const { question, fileName } = req.body;
    const userId = req.user.userId;

    if (!question || !question.trim()) {
      return res.status(400).json({ message: 'Prompt Interface Error: Client prompt query string is missing.' });
    }

    const contextKey = `${userId}_${fileName}`;
    const documentContext = (global.documentContextCache && global.documentContextCache[contextKey]) ? global.documentContextCache[contextKey] : "";

    let engineeringPrompt = `You are an expert academic AI reasoning assistant. Assist users by analyzing their uploaded documents.`;
    const isScanned = documentContext.includes("appears to be a scanned image");

    if (documentContext && !isScanned) {
      engineeringPrompt += `\n\n[CONTEXT DATA]\n${documentContext}\n\nDIRECTIVE: Use the provided document text to answer the query. Stay grounded in the context.`;
    } else {
      engineeringPrompt += `\n\n(Note: The document is a scanned image or empty. Use your general knowledge to answer.)`;
    }

    engineeringPrompt += `\n\nUser Query: ${question}`;

    // Retry Logic for 503 Errors
    let modelResponse;
    const maxRetries = 3;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        modelResponse = await aiEngine.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: engineeringPrompt
        });
        break; // Success
      } catch (err) {
        if (err.message.includes('503') && i < maxRetries - 1) {
          await delay(2000 * (i + 1)); // Wait 2s, 4s, 6s
          continue;
        }
        throw err;
      }
    }

    const generatedReply = modelResponse?.response?.text() || "AI Agent Engine returned empty content.";
    res.status(200).json({ reply: generatedReply });

  } catch (error) {
    console.error("AI Route Error:", error);
    res.status(500).json({ message: `AI Agent Runtime Execution Failure: ${error.message}` });
  }
});

module.exports = router;