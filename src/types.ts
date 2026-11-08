export type SupportedLanguage = 'en' | 'ar' | 'tr' | 'ur' | 'hi' | 'fr' | 'ld';

export interface LanguageInfo {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  dir: 'ltr' | 'rtl';
  fontClass?: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', dir: 'ltr' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية', flag: '🇸🇦', dir: 'rtl', fontClass: 'font-arabic' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe', flag: '🇹🇷', dir: 'ltr' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇵🇰', dir: 'rtl', fontClass: 'font-urdu' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
  { code: 'fr', name: 'French', nativeName: 'Français', flag: '🇫🇷', dir: 'ltr' },
  { code: 'ld', name: 'Lisan al-Dawat', nativeName: 'لسان الدعوة (Dawoodi Bohra)', flag: '🕌', dir: 'rtl', fontClass: 'font-arabic' },
];

export interface KhutbahSegment {
  id: string;
  timestamp: string;
  originalText: string;
  sourceLang: SupportedLanguage;
  translations: Record<SupportedLanguage, string>;
  isAyahOrHadith?: boolean;
  notes?: string;
}

export interface DemoSpeechSample {
  id: string;
  title: string;
  sourceLang: SupportedLanguage;
  speaker: string;
  mosqueContext: string;
  description: string;
  durationSeconds: number;
  segments: {
    originalText: string;
    isAyahOrHadith?: boolean;
    translations: Partial<Record<SupportedLanguage, string>>;
    notes?: string;
  }[];
}

export type ActiveAppView = 'controller' | 'tv' | 'mobile';

export type MicStatus = 'ready' | 'listening' | 'error';
