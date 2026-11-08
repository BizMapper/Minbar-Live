import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '25mb' }));

// Initialize GoogleGenAI SDK with required telemetry User-Agent header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

/**
 * Endpoint to translate spoken khutbah speech chunks into multiple attendee languages
 * with theological sensitivity, Quranic context, and preservation of sacred honorifics.
 */
app.post('/api/khutbah/translate', async (req: Request, res: Response) => {
  try {
    const { text, sourceLang = 'auto', contextHint } = req.body;

    if (!text || typeof text !== 'string' || !text.trim()) {
      return res.status(400).json({ error: 'Missing or invalid "text" parameter' });
    }

    const systemPrompt = `You are a world-class simultaneous Islamic sermon (Khutbah) and theological translator for MinbarLive.
Your job is to translate spoken sermon sentences from the speaker into clean, accurate, and dignified translations for diverse community members in a mosque.

Input speech might be in:
- Arabic (classical fusha or spoken regional)
- Turkish (Diyanet style or conversational)
- Urdu (classical Islamic bayaan)
- Hindi (Hindustani speech)
- Lisan al-Dawat (the traditional religious language of the Dawoodi Bohra Muslim community, which is predominantly Gujarati syntax and grammar heavily infused with Arabic theological vocabulary, Persian honorifics, and Urdu idioms).

CRITICAL TRANSLATION RULES:
1. Preserve Quranic Ayahs, Hadith quotations, and Islamic salawat/duas (e.g., peace be upon him ﷺ, SubhanAllah, Alhamdulillah, Insha'Allah, Taqwa, Ikhlas).
2. For Quranic Ayahs: provide the noble, respectful translation and if easily identifiable, note the Surah/Ayah.
3. For Lisan al-Dawat: recognize Dawoodi Bohra terms like Mumineen, Dai al-Mutlaq, Waaz, Rozi, Raza, etc., and translate into natural English, Turkish, Urdu, Hindi, Arabic, and French.
4. Output MUST be valid strict JSON containing:
{
  "detectedLanguage": "ar" | "tr" | "ur" | "hi" | "fr" | "ld" | "en",
  "isAyahOrHadith": boolean,
  "notes": "optional brief context e.g. Surah name or Hadith source if detected, otherwise null",
  "translations": {
    "en": "English translation here",
    "ar": "Arabic translation here",
    "tr": "Turkish translation here",
    "ur": "Urdu translation here (proper Urdu script)",
    "hi": "Hindi translation here (Devanagari script)",
    "fr": "French translation here",
    "ld": "Lisan al-Dawat translation or phonetic Gujarati-Arabic representation"
  }
}`;

    const userPrompt = `Spoken Khutbah Segment: "${text.trim()}"
${contextHint ? `Context Hint: ${contextHint}` : ''}
Source Language hint: ${sourceLang}

Translate this sermon segment accurately into all target languages (en, ar, tr, ur, hi, fr, ld). Respond only with valid JSON matching the schema.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const rawJson = response.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(rawJson);
    } catch {
      // Fallback clean extraction
      const match = rawJson.match(/\{[\s\S]*\}/);
      if (match) {
        parsedData = JSON.parse(match[0]);
      } else {
        throw new Error('Unable to parse JSON from AI model response');
      }
    }

    return res.json({
      success: true,
      originalText: text,
      data: parsedData,
    });
  } catch (error: any) {
    console.error('Khutbah translation error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to process sermon translation',
    });
  }
});

/**
 * Fast real-time endpoint for immediate speech-to-translation (Sokuji style)
 * Accepts either text or base64 audio snippet and immediately returns translation
 * across all languages without blocking.
 */
app.post('/api/khutbah/live-speech', async (req: Request, res: Response) => {
  try {
    const { text, base64Audio, mimeType = 'audio/webm', sourceLang = 'auto' } = req.body;

    let spokenText = (text || '').trim();

    // If raw audio was provided directly, transcribe it first using gemini-3.5-transcribe
    if (!spokenText && base64Audio) {
      try {
        const audioPart = {
          inlineData: {
            mimeType: mimeType,
            data: base64Audio,
          },
        };
        const transcribeRes = await ai.models.generateContent({
          model: 'gemini-3.5-transcribe',
          contents: {
            parts: [
              audioPart,
              {
                text: 'Transcribe the spoken sermon audio accurately in its original language (Arabic, Turkish, Urdu, Hindi, or Lisan al-Dawat). Return only the transcript.',
              },
            ],
          },
        });
        spokenText = (transcribeRes.text || '').trim();
      } catch (transcribeErr: any) {
        console.warn('Audio transcription failed, using fallback:', transcribeErr);
      }
    }

    if (!spokenText) {
      return res.status(400).json({ error: 'No audio or transcript recognized' });
    }

    const systemPrompt = `You are a lightning-fast simultaneous Islamic sermon (Khutbah) translator for MinbarLive.
Translate the speaker's live sentence into English, Arabic, Turkish, Urdu, Hindi, French, and Lisan al-Dawat (Dawoodi Bohra Gujarati-Arabic).
Preserve Quranic Ayahs, Hadith, and Islamic honorifics (ﷺ, SubhanAllah, Alhamdulillah, Taqwa, Mumineen).
Return ONLY JSON:
{
  "detectedLanguage": "ar" | "tr" | "ur" | "hi" | "fr" | "ld" | "en",
  "isAyahOrHadith": boolean,
  "notes": "Surah/Hadith reference if present, else null",
  "translations": {
    "en": "...",
    "ar": "...",
    "tr": "...",
    "ur": "...",
    "hi": "...",
    "fr": "...",
    "ld": "..."
  }
}`;

    const translationRes = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: `Live Speech [Language hint: ${sourceLang}]: "${spokenText}"`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: 'application/json',
      },
    });

    const rawJson = translationRes.text || '{}';
    let parsedData;
    try {
      parsedData = JSON.parse(rawJson);
    } catch {
      const match = rawJson.match(/\{[\s\S]*\}/);
      if (match) {
        parsedData = JSON.parse(match[0]);
      } else {
        throw new Error('Could not parse model response as JSON');
      }
    }

    return res.json({
      success: true,
      spokenText,
      data: parsedData,
    });
  } catch (error: any) {
    console.error('Live speech processing error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to translate live speech',
    });
  }
});

/**
 * Endpoint for audio chunk transcription via gemini-3.5-transcribe
 * Accepts base64 audio and transcribes it directly with mosque context
 */
app.post('/api/khutbah/transcribe-audio', async (req: Request, res: Response) => {
  try {
    const { base64Audio, mimeType = 'audio/webm', sourceLang = 'auto' } = req.body;

    if (!base64Audio) {
      return res.status(400).json({ error: 'Missing base64Audio in request body' });
    }

    const audioPart = {
      inlineData: {
        mimeType: mimeType,
        data: base64Audio,
      },
    };

    const textPart = {
      text: `Transcribe this spoken Friday Khutbah (mosque sermon) accurately.
The speech is likely in Arabic, Turkish, Urdu, Hindi, or Lisan al-Dawat (Dawoodi Bohra Gujarati-Arabic).
Preserve Quranic recitations, Arabic phrases (Bismillah, Alhamdulillah, Sallallahu Alayhi Wasallam), and religious terminology accurately in their original script.
Return only the transcribed text without extra chatter.`,
    };

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-transcribe',
      contents: { parts: [audioPart, textPart] },
    });

    const transcribedText = (response.text || '').trim();

    return res.json({
      success: true,
      transcribedText,
    });
  } catch (error: any) {
    console.error('Audio transcription error:', error);
    return res.status(500).json({
      error: error.message || 'Audio transcription failed',
    });
  }
});

/**
 * Endpoint for quick sermon summary & spiritual takeaways generator
 */
app.post('/api/khutbah/summarize', async (req: Request, res: Response) => {
  try {
    const { transcriptSegments, targetLang = 'en' } = req.body;

    if (!Array.isArray(transcriptSegments) || transcriptSegments.length === 0) {
      return res.status(400).json({ error: 'transcriptSegments array required' });
    }

    const sermonContent = transcriptSegments.slice(0, 30).join('\n');

    const prompt = `Here are sequential segments from a Friday Mosque Khutbah:
"""
${sermonContent}
"""

Please summarize this Friday sermon into:
1. Core Theme & Moral Lesson (1 sentence)
2. 3 Practical Takeaways / Reflections for the week ahead
3. Key Quranic Ayahs or Hadith mentioned

Provide the summary in the user's selected language: "${targetLang}".
Return response in clean JSON format:
{
  "theme": "...",
  "takeaways": ["...", "...", "..."],
  "keyReferences": ["..."]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const summaryJson = JSON.parse(response.text || '{}');
    return res.json({ success: true, summary: summaryJson });
  } catch (error: any) {
    console.error('Khutbah summary error:', error);
    return res.status(500).json({
      error: error.message || 'Failed to generate sermon summary',
    });
  }
});

// Mount Vite middleware in development
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`MinbarLive Server listening on port ${PORT}`);
  });
}

startServer();
