import { SupportedLanguage } from '../types';

export interface TranslationResponse {
  detectedLanguage?: SupportedLanguage;
  isAyahOrHadith?: boolean;
  notes?: string;
  translations: Record<SupportedLanguage, string>;
}

export async function requestKhutbahTranslation(
  text: string,
  sourceLang: string = 'auto',
  contextHint?: string
): Promise<TranslationResponse> {
  const response = await fetch('/api/khutbah/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text,
      sourceLang,
      contextHint,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Translation error: ${response.statusText}`);
  }

  const json = await response.json();
  return json.data;
}

export async function requestLiveSpeech(
  params: { text?: string; base64Audio?: string; mimeType?: string; sourceLang?: string }
): Promise<{ spokenText: string; data: TranslationResponse }> {
  const response = await fetch('/api/khutbah/live-speech', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Speech translation error: ${response.statusText}`);
  }

  const json = await response.json();
  return { spokenText: json.spokenText, data: json.data };
}

export async function requestAudioTranscription(
  base64Audio: string,
  mimeType: string = 'audio/webm',
  sourceLang: string = 'auto'
): Promise<string> {
  const response = await fetch('/api/khutbah/transcribe-audio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      base64Audio,
      mimeType,
      sourceLang,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Transcription error: ${response.statusText}`);
  }

  const json = await response.json();
  return json.transcribedText || '';
}

export async function requestKhutbahSummary(
  segments: string[],
  targetLang: SupportedLanguage
): Promise<{ theme: string; takeaways: string[]; keyReferences: string[] }> {
  const response = await fetch('/api/khutbah/summarize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      transcriptSegments: segments,
      targetLang,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Summary error: ${response.statusText}`);
  }

  const json = await response.json();
  return json.summary;
}
