import React, { useState, useEffect } from 'react';
import { SupportedLanguage, SUPPORTED_LANGUAGES, KhutbahSegment } from '../types';
import { 
  Smartphone, 
  Volume2, 
  VolumeX, 
  Sun, 
  Moon, 
  Share2, 
  BookOpen, 
  Settings, 
  Check, 
  ArrowLeft,
  Sparkles,
  RefreshCw,
  Sliders,
  Type
} from 'lucide-react';
import { requestKhutbahSummary } from '../services/api';

interface MobileAttendeeViewProps {
  segments: KhutbahSegment[];
  isCapturing: boolean;
  onBackToDashboard?: () => void;
  mosqueName?: string;
}

export const MobileAttendeeView: React.FC<MobileAttendeeViewProps> = ({
  segments,
  isCapturing,
  onBackToDashboard,
  mosqueName = 'Central Mosque Jumu\'ah',
}) => {
  const [selectedLang, setSelectedLang] = useState<SupportedLanguage>('en');
  const [fontSize, setFontSize] = useState<number>(18);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isTtsActive, setIsTtsActive] = useState<boolean>(false);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);
  const [summaryData, setSummaryData] = useState<{ theme: string; takeaways: string[]; keyReferences: string[] } | null>(null);
  const [isSummarizing, setIsSummarizing] = useState<boolean>(false);
  const [autoScroll, setAutoScroll] = useState<boolean>(true);

  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === selectedLang) || SUPPORTED_LANGUAGES[0];

  // Text-To-Speech (Earbud quiet mode using Web Speech synthesis)
  useEffect(() => {
    if (!isTtsActive || segments.length === 0) return;
    const latestSegment = segments[segments.length - 1];
    const textToSpeak = latestSegment.translations[selectedLang] || latestSegment.originalText;

    if ('speechSynthesis' in window && textToSpeak) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      
      const langMapping: Record<SupportedLanguage, string> = {
        en: 'en-US',
        ar: 'ar-SA',
        tr: 'tr-TR',
        ur: 'ur-PK',
        hi: 'hi-IN',
        fr: 'fr-FR',
        ld: 'gu-IN',
      };
      
      utterance.lang = langMapping[selectedLang] || 'en-US';
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  }, [segments.length, isTtsActive, selectedLang]);

  // Request Khutbah Summary
  const handleGenerateSummary = async () => {
    if (segments.length === 0) return;
    setIsSummarizing(true);
    setShowSummaryModal(true);
    try {
      const texts = segments.map((s) => s.translations[selectedLang] || s.originalText);
      const res = await requestKhutbahSummary(texts, selectedLang);
      setSummaryData(res);
    } catch (err) {
      console.error('Failed to generate summary:', err);
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-colors duration-200 ${
        isDarkMode ? 'bg-[#0a0e17] text-slate-100' : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Mobile Top Sticky Navigation */}
      <header
        className={`sticky top-0 z-30 px-4 py-3 border-b flex items-center justify-between backdrop-blur-md ${
          isDarkMode
            ? 'bg-[#0c121e]/90 border-slate-800'
            : 'bg-white/90 border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2.5">
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="p-1.5 -ml-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <div>
            <h2 className="text-sm font-bold tracking-tight leading-none mb-1">
              {mosqueName}
            </h2>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
              {isCapturing ? (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-emerald-400 font-medium">Khutbah Live</span>
                </>
              ) : (
                <span>Connected</span>
              )}
              <span>·</span>
              <span>{segments.length} segments</span>
            </div>
          </div>
        </div>

        {/* Top Right Quick Actions */}
        <div className="flex items-center gap-1">
          {/* Earbud TTS Toggle */}
          <button
            onClick={() => setIsTtsActive(!isTtsActive)}
            title={isTtsActive ? 'Earbud Audio: ON' : 'Earbud Audio: OFF'}
            className={`p-2 rounded-lg border text-xs transition-colors ${
              isTtsActive
                ? 'bg-amber-500/20 border-amber-500/40 text-amber-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {isTtsActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Theme toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="p-2 rounded-lg text-slate-400 hover:text-slate-200"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Summary button */}
          <button
            onClick={handleGenerateSummary}
            disabled={segments.length === 0}
            className="p-2 rounded-lg text-amber-400 hover:bg-amber-500/10 disabled:opacity-40"
            title="Spiritual Takeaways & Summary"
          >
            <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Language Selector Bar (Thumb reachable horizontal strip) */}
      <div
        className={`px-4 py-2.5 border-b overflow-x-auto no-scrollbar flex items-center gap-2 ${
          isDarkMode ? 'bg-[#0f1726] border-slate-800/80' : 'bg-slate-100 border-slate-200'
        }`}
      >
        <span className="text-[11px] text-slate-400 font-medium shrink-0 uppercase tracking-wider">
          Lang:
        </span>
        {SUPPORTED_LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setSelectedLang(lang.code)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex items-center gap-1.5 shrink-0 ${
              selectedLang === lang.code
                ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                : isDarkMode
                ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            <span>{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>

      {/* Font Size Adjuster Control Strip */}
      <div
        className={`px-4 py-2 flex items-center justify-between text-xs border-b ${
          isDarkMode
            ? 'border-slate-800/50 bg-[#0c121e]/50 text-slate-400'
            : 'border-slate-200 bg-white text-slate-500'
        }`}
      >
        <div className="flex items-center gap-2">
          <Type className="w-3.5 h-3.5" />
          <span>Text Size ({fontSize}px)</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFontSize((s) => Math.max(14, s - 2))}
            className="w-7 h-7 rounded border border-slate-700 flex items-center justify-center font-bold hover:bg-slate-800"
          >
            A-
          </button>
          <button
            onClick={() => setFontSize((s) => Math.min(32, s + 2))}
            className="w-7 h-7 rounded border border-slate-700 flex items-center justify-center font-bold hover:bg-slate-800"
          >
            A+
          </button>
        </div>
      </div>

      {/* Main Subtitle Feed (Mobile Touch Area) */}
      <main className="flex-1 p-4 max-w-xl mx-auto w-full space-y-4 pb-20">
        {segments.length === 0 ? (
          <div className="py-20 text-center text-slate-400">
            <Smartphone className="w-12 h-12 mx-auto mb-3 opacity-30 text-amber-400" />
            <p className="text-base font-semibold text-slate-300 mb-1">
              Waiting for Friday Khutbah
            </p>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              The sermon will be translated here in {currentLangObj.name} in real-time as the Imam speaks.
            </p>
          </div>
        ) : (
          segments.map((seg, index) => {
            const isLatest = index === segments.length - 1;
            const translatedText = seg.translations[selectedLang] || seg.originalText;

            return (
              <div
                key={seg.id}
                className={`p-4 rounded-2xl transition-all border ${
                  isLatest
                    ? isDarkMode
                      ? 'bg-slate-900 border-amber-500/40 shadow-lg'
                      : 'bg-white border-amber-400 shadow-md ring-2 ring-amber-400/20'
                    : isDarkMode
                    ? 'bg-[#0f1726]/60 border-slate-800/80 text-slate-300'
                    : 'bg-white border-slate-200 text-slate-700'
                }`}
              >
                {/* Spiritual Tag badge if Quran / Hadith */}
                {seg.isAyahOrHadith && (
                  <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-amber-400">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>{seg.notes || 'Quranic Ayah / Hadith'}</span>
                  </div>
                )}

                {/* Original spoken text subtle line */}
                <p className="text-xs text-slate-400 mb-2 italic">
                  {seg.originalText}
                </p>

                {/* Translated text */}
                <p
                  style={{ fontSize: `${fontSize}px` }}
                  className={`leading-relaxed font-medium ${
                    currentLangObj.fontClass || ''
                  } ${currentLangObj.dir === 'rtl' ? 'text-right' : 'text-left'} ${
                    isLatest
                      ? isDarkMode
                        ? 'text-white'
                        : 'text-slate-900'
                      : ''
                  }`}
                  dir={currentLangObj.dir}
                >
                  {translatedText}
                </p>

                <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-white/5">
                  <span>{seg.timestamp}</span>
                  <span>{currentLangObj.nativeName}</span>
                </div>
              </div>
            );
          })
        )}
      </main>

      {/* Floating Summary Modal */}
      {showSummaryModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div
            className={`w-full max-w-lg rounded-t-3xl sm:rounded-2xl p-6 border shadow-2xl max-h-[85vh] overflow-y-auto ${
              isDarkMode ? 'bg-[#0f1726] border-slate-700 text-slate-100' : 'bg-white border-slate-300 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold">Khutbah Spiritual Takeaways</h3>
              </div>
              <button
                onClick={() => setShowSummaryModal(false)}
                className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white"
              >
                Close
              </button>
            </div>

            {isSummarizing ? (
              <div className="py-12 text-center">
                <RefreshCw className="w-8 h-8 text-amber-400 animate-spin mx-auto mb-3" />
                <p className="text-sm text-slate-400">Summarizing Friday sermon points via AI...</p>
              </div>
            ) : summaryData ? (
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-amber-400 font-bold mb-1">
                    Central Moral Theme
                  </h4>
                  <p className="text-base font-medium text-slate-100 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                    {summaryData.theme}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs uppercase tracking-wider text-emerald-400 font-bold mb-2">
                    Key Practical Reflections for the Week
                  </h4>
                  <ul className="space-y-2">
                    {summaryData.takeaways.map((point, i) => (
                      <li key={i} className="flex items-start gap-2 bg-slate-800/30 p-2.5 rounded-lg border border-slate-700/30">
                        <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-slate-200">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {summaryData.keyReferences && summaryData.keyReferences.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-1">
                      Cited Ayahs & Hadiths
                    </h4>
                    <p className="text-xs text-slate-300 italic">
                      {summaryData.keyReferences.join(' · ')}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-slate-400 text-center py-6">No summary available yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
