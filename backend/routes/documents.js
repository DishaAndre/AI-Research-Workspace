const express = require('express');
const router = express.Router();
const multer = require('multer');
const pdfParse = require('pdf-parse-fork'); 
const authMiddleware = require('../middleware/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.originalname.endsWith('.pdf')) {
      cb(null, true);
    } else {
      cb(new Error('Validation Error: Target document is not an Adobe PDF file layout.'), false);
    }
  },
  limits: { fileSize: 10 * 1024 * 1024 } 
});

global.documentContextCache = global.documentContextCache || {};

/**
 * Endpoint: POST /api/documents/upload
 * Ingests data files and provides contextual summaries.
 */
router.post('/upload', authMiddleware, upload.single('document'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Ingestion Fault: No file was received.' });
    }

    const userId = req.user.userId;
    const fileName = req.file.originalname;

    const pdfData = await pdfParse(req.file.buffer);
    let extractedText = pdfData.text || "";

    // ADAPTIVE FIX: Handle scanned/image-only documents without crashing the frontend layout
    let structuralWords = 0;
    let isScanned = false;

    if (!extractedText || extractedText.trim().length === 0) {
      extractedText = `[File Notice: ${fileName} appears to be a scanned image or lack digital character layers.]`;
      isScanned = true;
    } else {
      structuralWords = extractedText.trim().split(/\s+/).length;
    }

    // Save the text to context cache
    const contextKey = `${userId}_${fileName}`;
    global.documentContextCache[contextKey] = extractedText;

    // Synthesize the summary message for the dashboard
    let coreOutlineSummary = `[Structural Ingestion Map Complete]\n\n• Target Identity: ${fileName}\n• Document Length: ${pdfData.numpages} page(s) recognized.`;
    
    if (isScanned) {
      coreOutlineSummary += `\n• Status Warning: This file is an image scan. Live text parsing is unavailable, but the workspace terminal is initialized for general reasoning assistance!`;
    } else {
      coreOutlineSummary += `\n• Density Volume: ~${structuralWords} individual structural words parsed successfully.\n\nReady for interactive semantic prompt routing through the AI agent cluster terminal view.`;
    }

    res.status(200).json({
      message: 'Document structural matrix processed securely.',
      summary: coreOutlineSummary
    });

  } catch (error) {
    res.status(500).json({ message: `Internal File Pipeline Fault: ${error.message}` });
  }
});

module.exports = router;