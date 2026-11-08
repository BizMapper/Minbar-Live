import React, { useState } from 'react';
import { SupportedLanguage, SUPPORTED_LANGUAGES, KhutbahSegment, MicStatus } from '../types';
import { 
  Tv, 
  Volume2, 
  Sliders, 
  Maximize2, 
  Minimize2, 
  Sun, 
  Moon, 
  BookOpen, 
  Radio, 
  Columns, 
  Type,
  Mic,
  MicOff,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

interface TvDisplayViewProps {
  segments: KhutbahSegment[];
  currentLiveSegment?: KhutbahSegment | null;
  isCapturing: boolean;
  micStatus?: MicStatus;
  onExitFullscreen?: () => void;
  mosqueName?: string;
}

export const TvDisplayView: React.FC<TvDisplayViewProps> = ({
  segments,
  currentLiveSegment,
  isCapturing,
  micStatus = 'ready',
  mosqueName = 'Central Mosque Jumu\'ah Sanctuary',
}) => {
  const [primaryLang, setPrimaryLang] = useState<SupportedLanguage>('en');
  const [showOriginal, setShowOriginal] = useState<boolean>(true);
  const [fontSizeTier, setFontSizeTier] = useState<'medium' | 'large' | 'xl' | 'cinema'>('large');
  const [isCinemaDark, setIsCinemaDark] = useState<boolean>(true);
  const [showQrOverlay, setShowQrOverlay] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
  };

  const getFontSizeClasses = () => {
    switch (fontSizeTier) {
      case 'medium':
        return {
          current: 'text-2xl md:text-3xl lg:text-4xl leading-relaxed',
          original: 'text-xl md:text-2xl leading-relaxed',
          history: 'text-lg md:text-xl',
        };
      case 'large':
        return {
          current: 'text-3xl md:text-4xl lg:text-5xl font-semibold leading-relaxed',
          original: 'text-2xl md:text-3xl leading-relaxed',
          history: 'text-xl md:text-2xl',
        };
      case 'xl':
        return {
          current: 'text-4xl md:text-5xl lg:text-6xl font-bold leading-tight',
          original: 'text-2xl md:text-3xl leading-relaxed',
          history: 'text-2xl md:text-3xl',
        };
      case 'cinema':
        return {
          current: 'text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight',
          original: 'text-3xl md:text-4xl leading-relaxed',
          history: 'text-3xl md:text-4xl',
        };
    }
  };

  const fontClasses = getFontSizeClasses();
  const currentLangObj = SUPPORTED_LANGUAGES.find((l) => l.code === primaryLang) || SUPPORTED_LANGUAGES[0];

  // Active or most recent segment to highlight
  const activeSegment = currentLiveSegment || (segments.length > 0 ? segments[segments.length - 1] : null);
  const pastSegments = activeSegment
    ? segments.filter((s) => s.id !== activeSegment.id).slice(-3)
    : [];

  return (
    <div
      className={`min-h-screen flex flex-col justify-between transition-colors duration-300 select-none ${
        isCinemaDark
          ? 'bg-[#080c14] text-slate-100'
          : 'bg-slate-50 text-slate-900'
      }`}
    >
      {/* Top Mosque Header Bar */}
      <header
        className={`px-8 py-5 flex items-center justify-between border-b backdrop-blur-md ${
          isCinemaDark
            ? 'border-slate-800/80 bg-[#0b101c]/90'
            : 'border-slate-200 bg-white/95'
        }`}
      >
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Tv className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                {mosqueName}
              </h1>

              {/* Visual Microphone Connection Status Indicator */}
              {micStatus === 'listening' ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm shadow-emerald-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <Mic className="w-3.5 h-3.5" />
                  <span>Listening</span>
                </span>
              ) : micStatus === 'error' ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Error</span>
                </span>
              ) : isCapturing ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <Radio className="w-3.5 h-3.5" />
                  <span>Broadcasting Sample</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                  <MicOff className="w-3.5 h-3.5 text-slate-400" />
                  <span>Ready</span>
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400">
              Real-time Subtitles · Audio translated simultaneously via AI
            </p>
          </div>
        </div>

        {/* TV Quick Controls (Discreet for Mosque Screen) */}
        <div className="flex items-center gap-3">
          {/* Target language selector */}
          <div className="flex items-center gap-1.5 bg-slate-900/80 border border-slate-800 rounded-lg p-1">
            {SUPPORTED_LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setPrimaryLang(lang.code)}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors ${
                  primaryLang === lang.code
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {lang.name}
              </button>
            ))}
          </div>

          {/* Toggle Bilingual / Original Speech */}
          <button
            onClick={() => setShowOriginal(!showOriginal)}
            title="Toggle Spoken Speech above Translation"
            className={`px-3 py-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors ${
              showOriginal
                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            <span>{showOriginal ? 'Dual Script: ON' : 'Dual Script: OFF'}</span>
          </button>

          {/* Font Size Tier */}
          <div className="flex items-center gap-1 bg-slate-900/80 border border-slate-800 rounded-lg p-1">
            {(['medium', 'large', 'xl', 'cinema'] as const).map((size) => (
              <button
                key={size}
                onClick={() => setFontSizeTier(size)}
                className={`px-2 py-1 text-xs uppercase font-medium rounded transition-colors ${
                  fontSizeTier === size
                    ? 'bg-slate-700 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {size === 'cinema' ? '4K' : size[0].toUpperCase()}
              </button>
            ))}
          </div>

          {/* QR Code toggle for mobile listener link */}
          <button
            onClick={() => setShowQrOverlay(!showQrOverlay)}
            className="px-3 py-1.5 rounded-lg border border-slate-800 bg-slate-900/60 text-xs text-amber-400 hover:bg-slate-800 transition-colors"
          >
            Attendee Link
          </button>

          {/* Fullscreen toggle */}
          <button
            onClick={toggleFullscreen}
            className="p-2 rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 hover:text-white"
            title="Toggle Cinema Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Main Subtitle Projection Canvas */}
      <main className="flex-1 flex flex-col justify-end px-8 md:px-16 lg:px-24 pb-12 pt-6 max-w-7xl mx-auto w-full relative">
        {/* Previous faded subtitles (Teleprompter feel) */}
        <div className="space-y-4 mb-8 opacity-45 transition-opacity">
          {pastSegments.map((seg) => {
            const translatedText = seg.translations[primaryLang] || seg.originalText;
            return (
              <div
                key={seg.id}
                className={`border-b border-white/5 pb-3 ${fontClasses.history}`}
              >
                {showOriginal && (
                  <p className="text-slate-400 text-base md:text-lg mb-1 italic opacity-75">
                    {seg.originalText}
                  </p>
                )}
                <p className={currentLangObj.dir === 'rtl' ? 'text-right' : 'text-left'}>
                  {translatedText}
                </p>
              </div>
            );
          })}
        </div>

        {/* Current Active Sermon Line Highlight */}
        {activeSegment ? (
          <div
            className={`p-6 md:p-8 rounded-3xl transition-all duration-300 relative border ${
              isCinemaDark
                ? 'bg-gradient-to-b from-[#101726]/90 to-[#0d1320]/95 border-amber-500/30 shadow-2xl shadow-black/80'
                : 'bg-white border-amber-400/40 shadow-xl'
            }`}
          >
            {/* Spiritual Tag / Ayah indicator if detected */}
            {activeSegment.isAyahOrHadith && (
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                <BookOpen className="w-3.5 h-3.5" />
                <span>{activeSegment.notes || 'Quranic Ayah / Prophetic Hadith'}</span>
              </div>
            )}

            {/* Original Spoken Language (e.g., Arabic, Turkish, Urdu, Bohra) */}
            {showOriginal && (
              <div className="mb-4 pb-4 border-b border-white/10">
                <span className="text-xs uppercase tracking-wider text-slate-400 mb-1 block font-mono">
                  Original Speech ({activeSegment.sourceLang.toUpperCase()}):
                </span>
                <p
                  className={`${fontClasses.original} ${
                    activeSegment.sourceLang === 'ar' || activeSegment.sourceLang === 'ld'
                      ? 'font-arabic text-amber-200/90 text-right text-3xl'
                      : activeSegment.sourceLang === 'ur'
                      ? 'font-urdu text-amber-200/90 text-right text-3xl'
                      : 'text-slate-200'
                  }`}
                  dir={['ar', 'ur', 'ld'].includes(activeSegment.sourceLang) ? 'rtl' : 'ltr'}
                >
                  {activeSegment.originalText}
                </p>
              </div>
            )}

            {/* Live Translated Text */}
            <div>
              <span className="text-xs uppercase tracking-wider text-amber-400 font-mono flex items-center gap-1.5 mb-1">
                <span>{currentLangObj.flag}</span>
                <span>Live Translation ({currentLangObj.name}):</span>
              </span>
              <p
                className={`${fontClasses.current} text-white font-medium ${
                  currentLangObj.fontClass || ''
                } ${currentLangObj.dir === 'rtl' ? 'text-right' : 'text-left'}`}
                dir={currentLangObj.dir}
              >
                {activeSegment.translations[primaryLang] || activeSegment.originalText}
              </p>
            </div>
          </div>
        ) : (
          /* Empty / Waiting for speech state */
          <div className="py-24 text-center border-2 border-dashed border-slate-800 rounded-3xl bg-slate-900/20">
            <Radio className="w-12 h-12 text-amber-400/40 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-semibold text-slate-300 mb-2">
              Mosque Subtitle Screen Active
            </h2>
            <p className="text-slate-400 max-w-md mx-auto text-sm">
              Waiting for the Khateeb (speaker) to begin the sermon at the minbar. Live translations in {currentLangObj.name} will stream here instantly.
            </p>
          </div>
        )}
      </main>

      {/* Screen Footer Information Strip */}
      <footer
        className={`px-8 py-3 flex items-center justify-between text-xs border-t ${
          isCinemaDark
            ? 'border-slate-800/80 bg-[#090d16] text-slate-400'
            : 'border-slate-200 bg-slate-100 text-slate-600'
        }`}
      >
        <div className="flex items-center gap-3">
          <span>MinbarLive TV Subtitle System</span>
          <span>·</span>
          <span>Target: {currentLangObj.name} ({currentLangObj.nativeName})</span>
          <span>·</span>
          <span>Press ESC or Fullscreen button to adjust view</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-amber-400">Scan QR on entrance board to read on your mobile phone</span>
        </div>
      </footer>

      {/* Attendee Mobile Link Overlay Modal */}
      {showQrOverlay && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-8 max-w-md w-full text-center relative shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Listen on Your Phone</h3>
            <p className="text-sm text-slate-300 mb-6">
              Congregants can open the attendee mobile reader on their personal devices in any language:
            </p>

            {/* Clean QR Mock representation */}
            <div className="bg-white p-4 rounded-xl inline-block mb-4 shadow-inner">
              <div className="w-48 h-48 border-4 border-slate-950 flex flex-col items-center justify-center gap-2 p-3 text-slate-900 font-mono text-center">
                <span className="text-3xl font-extrabold tracking-widest text-emerald-800">MINBAR</span>
                <span className="text-xs font-bold text-slate-600">MOSQUE LIVE AUDIO</span>
                <span className="text-xs bg-slate-100 px-2 py-1 rounded border border-slate-300">Room: JUMUA-01</span>
                <span className="text-[10px] text-slate-400">Scan with Camera</span>
              </div>
            </div>

            <div className="text-xs text-slate-400 mb-6">
              Direct attendee link: <span className="text-amber-400 font-mono">minbar.live/listen</span>
            </div>

            <button
              onClick={() => setShowQrOverlay(false)}
              className="w-full py-2.5 rounded-lg bg-amber-500 text-slate-950 font-semibold hover:bg-amber-400 transition-colors"
            >
              Close Link
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
