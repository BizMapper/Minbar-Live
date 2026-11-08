import React, { useState, useEffect, useRef } from 'react';
import { 
  SupportedLanguage, 
  SUPPORTED_LANGUAGES, 
  KhutbahSegment, 
  DemoSpeechSample,
  ActiveAppView,
  MicStatus
} from '../types';
import { DEMO_KHUTBAH_SAMPLES } from '../data/demoSamples';
import { requestKhutbahTranslation, requestAudioTranscription, requestLiveSpeech } from '../services/api';
import { getLocalTheologicalTranslation } from '../services/localTheologicalTranslator';
import { 
  Mic, 
  MicOff, 
  Play, 
  Pause, 
  Square, 
  Radio, 
  Tv, 
  Smartphone, 
  Volume2, 
  BookOpen, 
  RotateCcw, 
  QrCode, 
  Sparkles, 
  Sliders, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  Layers,
  Activity
} from 'lucide-react';

interface BroadcasterConsoleProps {
  segments: KhutbahSegment[];
  onAddSegment: (segment: KhutbahSegment) => void;
  onClearSegments: () => void;
  isCapturing: boolean;
  setIsCapturing: (val: boolean) => void;
  micStatus?: MicStatus;
  setMicStatus?: (status: MicStatus) => void;
  onSwitchView: (view: ActiveAppView) => void;
  mosqueName: string;
  setMosqueName: (name: string) => void;
}

export const BroadcasterConsole: React.FC<BroadcasterConsoleProps> = ({
  segments,
  onAddSegment,
  onClearSegments,
  isCapturing,
  setIsCapturing,
  micStatus = 'ready',
  setMicStatus,
  onSwitchView,
  mosqueName,
  setMosqueName,
}) => {
  const [sourceLang, setSourceLang] = useState<SupportedLanguage>('ar');
  const [selectedDemoId, setSelectedDemoId] = useState<string>(DEMO_KHUTBAH_SAMPLES[0].id);
  const [isPlayingDemo, setIsPlayingDemo] = useState<boolean>(false);
  const [demoSegmentIndex, setDemoSegmentIndex] = useState<number>(0);
  const [isProcessingAi, setIsProcessingAi] = useState<boolean>(false);
  const [micActive, setMicActive] = useState<boolean>(false);
  const [audioLevel, setAudioLevel] = useState<number>(0);
  const [manualInputText, setManualInputText] = useState<string>('');
  const [interimTranscript, setInterimTranscript] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('Ready to capture sermon speech');
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [autoSokujiMode, setAutoSokujiMode] = useState<boolean>(true);

  // Audio / Speech recognition references
  const recognitionRef = useRef<any>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const chunkIntervalRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const demoIntervalRef = useRef<any>(null);
  const isTranslatingRef = useRef<boolean>(false);

  const selectedDemo = DEMO_KHUTBAH_SAMPLES.find((d) => d.id === selectedDemoId) || DEMO_KHUTBAH_SAMPLES[0];

  // Sync source language when sample selection changes
  const handleSelectDemo = (demoId: string) => {
    setSelectedDemoId(demoId);
    const demo = DEMO_KHUTBAH_SAMPLES.find((d) => d.id === demoId);
    if (demo) {
      setSourceLang(demo.sourceLang);
    }
    // Stop any existing demo playback
    if (isPlayingDemo) {
      stopDemoPlayback();
    }
  };

  // Run Demo Audio / Speech simulation
  const startDemoPlayback = () => {
    setIsPlayingDemo(true);
    setIsCapturing(true);
    setDemoSegmentIndex(0);
    setStatusMessage(`Broadcasting sample Khutbah: "${selectedDemo.title}"`);

    let currentIdx = 0;
    // Emit first segment immediately
    emitDemoSegment(currentIdx);
    currentIdx++;

    demoIntervalRef.current = setInterval(() => {
      if (currentIdx < selectedDemo.segments.length) {
        emitDemoSegment(currentIdx);
        setDemoSegmentIndex(currentIdx);
        currentIdx++;
      } else {
        stopDemoPlayback();
        setStatusMessage('Sample Khutbah playback completed');
      }
    }, 7000); // New segment every 7 seconds for comfortable reading cadence
  };

  const stopDemoPlayback = () => {
    if (demoIntervalRef.current) {
      clearInterval(demoIntervalRef.current);
      demoIntervalRef.current = null;
    }
    setIsPlayingDemo(false);
    setIsCapturing(false);
  };

  const emitDemoSegment = (idx: number) => {
    const seg = selectedDemo.segments[idx];
    if (!seg) return;

    const newSegment: KhutbahSegment = {
      id: `seg-${Date.now()}-${idx}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      originalText: seg.originalText,
      sourceLang: selectedDemo.sourceLang,
      translations: {
        en: seg.translations.en || seg.originalText,
        ar: seg.translations.ar || seg.originalText,
        tr: seg.translations.tr || seg.originalText,
        ur: seg.translations.ur || seg.originalText,
        hi: seg.translations.hi || seg.originalText,
        fr: seg.translations.fr || seg.originalText,
        ld: seg.translations.ld || seg.originalText,
      },
      isAyahOrHadith: seg.isAyahOrHadith,
      notes: seg.notes,
    };

    onAddSegment(newSegment);
  };

  // Helper to convert audio blob to base64
  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = (reader.result as string).split(',')[1];
        resolve(base64data);
      };
      reader.onerror = reject;
    });
  };

  // Live Microphone Capture with immediate on-spot translation (Sokuji style)
  const startLiveMicrophone = async () => {
    try {
      setStatusMessage('Requesting microphone access from the podium...');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }
      });
      mediaStreamRef.current = stream;

      // 1. Audio Meter Visualizer
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const audioCtx = new AudioCtx();
      audioContextRef.current = audioCtx;
      const analyser = audioCtx.createAnalyser();
      analyserRef.current = analyser;
      analyser.fftSize = 256;
      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      let lastActiveAudioTime = Date.now();

      const updateMeter = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = sum / bufferLength;
        const level = Math.min(100, Math.round((avg / 128) * 100));
        setAudioLevel(level);

        if (level > 12) {
          lastActiveAudioTime = Date.now();
        }

        animFrameRef.current = requestAnimationFrame(updateMeter);
      };
      updateMeter();

      // 2. Immediate Speech Recognition (Web Speech API with interimResults: true)
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      let recognitionActive = false;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = true;
        recognition.interimResults = true; // Show on-spot immediately as spoken!
        recognition.maxAlternatives = 1;

        const langCodes: Record<SupportedLanguage, string> = {
          ar: 'ar-SA',
          tr: 'tr-TR',
          ur: 'ur-PK',
          hi: 'hi-IN',
          en: 'en-US',
          fr: 'fr-FR',
          ld: 'gu-IN', // Lisan al-Dawat Bohra speech
        };

        recognition.lang = langCodes[sourceLang] || 'ar-SA';

        let debounceTimer: any = null;

        recognition.onresult = async (event: any) => {
          let currentInterim = '';
          let finalTranscript = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            } else {
              currentInterim += event.results[i][0].transcript;
            }
          }

          if (currentInterim.trim()) {
            setInterimTranscript(currentInterim);
            setStatusMessage(`Listening: "${currentInterim}"`);
          }

          if (finalTranscript.trim()) {
            const textToTranslate = finalTranscript.trim();
            setInterimTranscript('');
            await processAndTranslateLiveText(textToTranslate);
          } else if (currentInterim.trim().length > 30) {
            // If speaker speaks continuously without a final pause, translate interim on spot
            if (debounceTimer) clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
              if (currentInterim.trim() && !isTranslatingRef.current) {
                const textToTranslate = currentInterim.trim();
                setInterimTranscript('');
                processAndTranslateLiveText(textToTranslate);
              }
            }, 1200);
          }
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition status:', event.error);
          if (event.error === 'not-allowed') {
            setStatusMessage('Microphone access was denied. Please allow microphone permissions.');
          } else if (event.error === 'network') {
            setStatusMessage('Network speech recognition issue; using direct audio chunk backup mode.');
          }
        };

        recognition.onend = () => {
          // Keep recognition alive while micActive is true
          if (mediaStreamRef.current && mediaStreamRef.current.active) {
            try {
              recognition.start();
            } catch {}
          }
        };

        try {
          recognition.start();
          recognitionActive = true;
        } catch (e) {
          console.warn('Recognition start exception:', e);
        }
      }

      // 3. MediaRecorder Audio Chunk Streamer (Sokuji Fallback)
      // Even if Web Speech API is absent or fails to recognize a foreign dialect,
      // this records 4-second audio chunks and sends them to Gemini for immediate translation
      if (window.MediaRecorder) {
        try {
          const mimeTypes = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/mp4'];
          const selectedMime = mimeTypes.find((m) => MediaRecorder.isTypeSupported(m)) || '';

          const mediaRecorder = new MediaRecorder(stream, selectedMime ? { mimeType: selectedMime } : undefined);
          mediaRecorderRef.current = mediaRecorder;
          audioChunksRef.current = [];

          mediaRecorder.ondataavailable = async (e) => {
            if (e.data && e.data.size > 0) {
              audioChunksRef.current.push(e.data);
            }
          };

          mediaRecorder.start(1000); // collect in 1-second slices

          // Every 4.5 seconds, if voice is detected and no final text was emitted, send audio chunk
          chunkIntervalRef.current = setInterval(async () => {
            if (audioChunksRef.current.length > 0 && !isTranslatingRef.current) {
              const audioBlob = new Blob(audioChunksRef.current, { type: mediaRecorder.mimeType || 'audio/webm' });
              audioChunksRef.current = []; // reset for next slice

              // Only send if there was meaningful sound recently
              if (Date.now() - lastActiveAudioTime < 3500 && audioBlob.size > 5000) {
                try {
                  const base64 = await blobToBase64(audioBlob);
                  setStatusMessage('Transcribing & translating audio snippet on the fly...');
                  const res = await requestLiveSpeech({
                    base64Audio: base64,
                    mimeType: audioBlob.type || 'audio/webm',
                    sourceLang,
                  });

                  if (res && res.spokenText) {
                    const newSegment: KhutbahSegment = {
                      id: `seg-live-${Date.now()}`,
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                      originalText: res.spokenText,
                      sourceLang: (res.data.detectedLanguage as SupportedLanguage) || sourceLang,
                      translations: res.data.translations,
                      isAyahOrHadith: res.data.isAyahOrHadith,
                      notes: res.data.notes,
                    };
                    onAddSegment(newSegment);
                    setStatusMessage('Live speech translated on spot!');
                  }
                } catch (err: any) {
                  console.warn('Audio snippet processing error:', err.message);
                }
              }
            }
          }, 4500);
        } catch (recorderErr) {
          console.warn('MediaRecorder init error:', recorderErr);
        }
      }

      setMicActive(true);
      setIsCapturing(true);
      if (setMicStatus) setMicStatus('listening');
      setStatusMessage('Live podium microphone active! Listening to the sermon...');
    } catch (err: any) {
      console.error('Microphone error:', err);
      if (setMicStatus) setMicStatus('error');
      setStatusMessage(`Microphone unavailable: ${err.message || 'Permission denied'}`);
    }
  };

  const stopLiveMicrophone = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {}
      recognitionRef.current = null;
    }
    if (mediaRecorderRef.current) {
      try {
        if (mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop();
        }
      } catch {}
      mediaRecorderRef.current = null;
    }
    if (chunkIntervalRef.current) {
      clearInterval(chunkIntervalRef.current);
      chunkIntervalRef.current = null;
    }
    setMicActive(false);
    setIsCapturing(false);
    if (setMicStatus) setMicStatus('ready');
    setAudioLevel(0);
    setInterimTranscript('');
    setStatusMessage('Podium microphone stopped');
  };

  // Process and translate text through Gemini API
  const processAndTranslateLiveText = async (text: string) => {
    if (!text.trim()) return;
    isTranslatingRef.current = true;
    setIsProcessingAi(true);

    const segmentId = `seg-${Date.now()}`;
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    // 1. Immediately create optimistic segment so viewers & TV see speech ON THE SPOT
    const initialSegment: KhutbahSegment = {
      id: segmentId,
      timestamp,
      originalText: text,
      sourceLang: sourceLang,
      translations: {
        en: 'Translating on the spot...',
        ar: sourceLang === 'ar' ? text : 'جاري الترجمة فوراً...',
        tr: sourceLang === 'tr' ? text : 'Çevriliyor...',
        ur: sourceLang === 'ur' ? text : 'ترجمہ ہو رہا ہے...',
        hi: sourceLang === 'hi' ? text : 'अनुवाद हो रहा है...',
        fr: sourceLang === 'fr' ? text : 'Traduction en cours...',
        ld: sourceLang === 'ld' ? text : 'तरजुमो थई रह्यो छे...',
      },
    };

    onAddSegment(initialSegment);
    setStatusMessage(`Translating sermon segment with Gemini AI (${sourceLang.toUpperCase()})...`);

    try {
      // Fetch real translation with 4-second timeout to avoid any hang
      const translationPromise = requestKhutbahTranslation(text, sourceLang, `Mosque Khutbah in ${sourceLang}`);
      const timeoutPromise = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Translation request timed out')), 4000)
      );

      const result = await Promise.race([translationPromise, timeoutPromise]);
      
      // Update with final translations
      const completedSegment: KhutbahSegment = {
        id: segmentId,
        timestamp,
        originalText: text,
        sourceLang: (result.detectedLanguage as SupportedLanguage) || sourceLang,
        translations: result.translations,
        isAyahOrHadith: result.isAyahOrHadith,
        notes: result.notes,
      };

      onAddSegment(completedSegment);
      setStatusMessage('Translation broadcasted to TV and attendee phones');
    } catch (err: any) {
      console.warn('API Translation fallback triggered:', err.message);

      // Intelligent local fallback translation
      const localResult = getLocalTheologicalTranslation(text, sourceLang);

      const fallbackSegment: KhutbahSegment = {
        id: segmentId,
        timestamp,
        originalText: text,
        sourceLang: localResult.detectedLanguage,
        translations: localResult.translations,
        isAyahOrHadith: localResult.isAyahOrHadith,
        notes: localResult.notes,
      };

      onAddSegment(fallbackSegment);
      setStatusMessage('Live speech translated on spot!');
    } finally {
      setIsProcessingAi(false);
      isTranslatingRef.current = false;
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualInputText.trim()) {
      processAndTranslateLiveText(manualInputText.trim());
      setManualInputText('');
    }
  };

  useEffect(() => {
    return () => {
      if (demoIntervalRef.current) clearInterval(demoIntervalRef.current);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col">
      {/* Top Bar Contract (3 Zones: Brand - Links/Status - Primary Action) */}
      <header className="px-6 py-4 border-b border-slate-800/80 bg-[#0a0f1a] flex items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Radio className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-white tracking-tight whitespace-nowrap">
                MinbarLive
              </h1>

              {/* Visual Microphone Connection Status Indicator */}
              {micStatus === 'listening' ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm shadow-emerald-500/20">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                  </span>
                  <Mic className="w-3 h-3" />
                  <span>Listening</span>
                </span>
              ) : micStatus === 'error' ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40">
                  <AlertCircle className="w-3 h-3" />
                  <span>Error</span>
                </span>
              ) : isCapturing ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                  <span>Playing Sample</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                  <MicOff className="w-3 h-3 text-slate-400" />
                  <span>Ready</span>
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-400">
              Mosque Real-time Khutbah Translation System
            </p>
          </div>
        </div>

        {/* View Switcher Tabs (TV Display vs Mobile Attendee vs Broadcaster) */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => onSwitchView('controller')}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-amber-500 text-slate-950 shadow-sm flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Broadcaster Console</span>
          </button>
          <button
            onClick={() => onSwitchView('tv')}
            className="px-3.5 py-1.5 text-xs font-medium rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          >
            <Tv className="w-3.5 h-3.5 text-amber-400" />
            <span>Mosque TV Display</span>
          </button>
          <button
            onClick={() => onSwitchView('mobile')}
            className="px-3.5 py-1.5 text-xs font-medium rounded-lg text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1.5"
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Attendee Mobile</span>
          </button>
        </div>

        {/* Primary Action Button */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowShareModal(true)}
            className="px-3.5 py-2 text-xs font-medium text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-lg hover:bg-amber-500/20 transition-colors flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            <span>Attendee QR Code</span>
          </button>
        </div>
      </header>

      {/* Main Grid Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Audio Controls & Source Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Mosque Information Card */}
          <div className="p-5 rounded-2xl bg-[#0e1422] border border-slate-800">
            <h2 className="text-xs uppercase tracking-wider font-bold text-amber-400 mb-3 flex items-center gap-2">
              <Radio className="w-4 h-4" />
              <span>Sanctuary & Audio Source</span>
            </h2>

            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Mosque / Hall Name
                </label>
                <input
                  type="text"
                  value={mosqueName}
                  onChange={(e) => setMosqueName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Spoken Language Picker */}
              <div>
                <label className="text-xs text-slate-400 block mb-1">
                  Imam's Spoken Language
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setSourceLang(lang.code)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border text-left flex items-center gap-2 transition-colors ${
                        sourceLang === lang.code
                          ? 'bg-amber-500/10 border-amber-500 text-amber-300 font-semibold'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span className="truncate">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Audio Input Modes: Live Mic & Audio Samples */}
          <div className="p-5 rounded-2xl bg-[#0e1422] border border-slate-800 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-xs uppercase tracking-wider font-bold text-emerald-400 flex items-center gap-2">
                <Mic className="w-4 h-4" />
                <span>Audio Capture Engine</span>
              </h2>
              {isCapturing && (
                <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Broadcasting Live
                </span>
              )}
            </div>

            {/* Option 1: Live Podium Mic */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="text-sm font-semibold text-white">Live Podium Microphone</h3>
                  <p className="text-xs text-slate-400">Capture the Imam directly from device mic or PA sound card</p>
                </div>
                <button
                  onClick={micActive ? stopLiveMicrophone : startLiveMicrophone}
                  className={`px-4 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 transition-all ${
                    micActive
                      ? 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30'
                      : 'bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/20'
                  }`}
                >
                  {micActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  <span>{micActive ? 'Stop Mic' : 'Start Live Mic'}</span>
                </button>
              </div>

              {/* Audio VU Level Meter & Real-time Live Speech Box */}
              {micActive && (
                <div className="mt-3 pt-3 border-t border-slate-800 space-y-3">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span>Listening Live ({sourceLang.toUpperCase()})</span>
                      </span>
                      <span>Signal: {audioLevel}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full transition-all duration-75 ${
                          audioLevel > 60 ? 'bg-amber-400' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${audioLevel}%` }}
                      />
                    </div>
                  </div>

                  {/* Immediate On-Spot Transcript Bubble (Sokuji style) */}
                  <div className="p-2.5 rounded-lg bg-black/50 border border-emerald-500/30 text-xs">
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold block mb-0.5">
                      Live Speech Stream:
                    </span>
                    <p className="text-slate-200 italic min-h-[20px]" dir={['ar', 'ur', 'ld'].includes(sourceLang) ? 'rtl' : 'ltr'}>
                      {interimTranscript || (
                        <span className="text-slate-500 not-italic">
                          Speak into your microphone in {sourceLang.toUpperCase()} — words and translations appear instantly on spot!
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Browser / Desktop mic tip */}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>💡 Tip: If using Chrome/Edge on Desktop, ensure microphone permission is allowed for this tab.</span>
                  </div>
                </div>
              )}

              {/* Quick Speech Test Phrases for immediate translation preview */}
              <div className="mt-3 pt-3 border-t border-slate-800">
                <span className="text-[11px] text-slate-400 block mb-1.5 font-medium">
                  Instant Test Phrases (Click to simulate speaking):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'الحمد لله رب العالمين', lang: 'ar' as SupportedLanguage },
                    { label: 'اتقوا الله حق تقاته', lang: 'ar' as SupportedLanguage },
                    { label: 'İslam kardeşliği ve samimiyet', lang: 'tr' as SupportedLanguage },
                    { label: 'سب سے بڑا ہتھیار صبر اور دعا ہے', lang: 'ur' as SupportedLanguage },
                    { label: 'हलाल रोज़ी कमावो (Mumineen)', lang: 'ld' as SupportedLanguage },
                  ].map((phrase, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setSourceLang(phrase.lang);
                        processAndTranslateLiveText(phrase.label);
                      }}
                      className="px-2.5 py-1 rounded bg-slate-800/80 hover:bg-slate-700 text-[11px] text-amber-300 border border-slate-700 transition-colors"
                    >
                      🗣️ "{phrase.label}"
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Option 2: Pre-Recorded Multilingual Khutbah Samples */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <span>Built-in Khutbah Samples</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    Test live translation immediately in Arabic, Turkish, Urdu, Hindi, or Lisan al-Dawat
                  </p>
                </div>
                <button
                  onClick={isPlayingDemo ? stopDemoPlayback : startDemoPlayback}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors ${
                    isPlayingDemo
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                      : 'bg-amber-500 text-slate-950 hover:bg-amber-400 shadow-sm'
                  }`}
                >
                  {isPlayingDemo ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isPlayingDemo ? 'Pause Sample' : 'Play Sample'}</span>
                </button>
              </div>

              <div className="mt-3 space-y-2">
                {DEMO_KHUTBAH_SAMPLES.map((demo) => (
                  <button
                    key={demo.id}
                    onClick={() => handleSelectDemo(demo.id)}
                    className={`w-full text-left p-3 rounded-lg border text-xs transition-colors flex items-start justify-between gap-3 ${
                      selectedDemoId === demo.id
                        ? 'bg-slate-800/90 border-amber-500/50 text-white'
                        : 'bg-slate-950/40 border-slate-800/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-slate-200 flex items-center gap-1.5">
                        <span className="uppercase text-[10px] px-1.5 py-0.5 rounded bg-slate-700 text-slate-300 font-mono">
                          {demo.sourceLang.toUpperCase()}
                        </span>
                        <span>{demo.title}</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                        {demo.speaker} · {demo.mosqueContext}
                      </p>
                    </div>
                    {selectedDemoId === demo.id && isPlayingDemo && (
                      <span className="text-amber-400 font-mono text-[11px] shrink-0 animate-pulse">
                        Segment {demoSegmentIndex + 1}/{demo.segments.length}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Option 3: Manual Text / Sentence Test Input */}
            <form onSubmit={handleManualSubmit} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800">
              <label className="text-xs font-semibold text-white block mb-1">
                Direct Speech Injection (Test Prompt)
              </label>
              <p className="text-[11px] text-slate-400 mb-2">
                Type or paste a speech sentence to test Gemini AI's theological translation
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={manualInputText}
                  onChange={(e) => setManualInputText(e.target.value)}
                  placeholder="e.g. أَيُّهَا الإِخْوَةُ الكِرَامُ، اتَّقُوا اللَّهَ"
                  className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
                <button
                  type="submit"
                  disabled={isProcessingAi || !manualInputText.trim()}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-amber-400 hover:bg-slate-700 text-xs font-semibold disabled:opacity-50 transition-colors"
                >
                  Translate
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Live Broadcast Feed & Monitor (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          {/* Status Header Strip */}
          <div className="px-5 py-3 rounded-xl bg-[#0e1422] border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <span className="text-slate-300 font-medium">{statusMessage}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-400">Segments: {segments.length}</span>
              <button
                onClick={onClearSegments}
                className="text-slate-400 hover:text-red-400 transition-colors flex items-center gap-1"
                title="Clear Session History"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Buffer</span>
              </button>
            </div>
          </div>

          {/* Live Translation Monitor Feed */}
          <div className="flex-1 min-h-[500px] p-5 rounded-2xl bg-[#0e1422] border border-slate-800 flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <h3 className="text-xs uppercase tracking-wider font-bold text-slate-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>Live Broadcast Subtitle Stream</span>
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onSwitchView('tv')}
                  className="px-2.5 py-1 text-xs rounded bg-slate-800 text-amber-400 hover:bg-slate-700 flex items-center gap-1"
                >
                  <Tv className="w-3.5 h-3.5" />
                  <span>Open Mosque TV</span>
                </button>
                <button
                  onClick={() => onSwitchView('mobile')}
                  className="px-2.5 py-1 text-xs rounded bg-slate-800 text-emerald-400 hover:bg-slate-700 flex items-center gap-1"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Open Mobile View</span>
                </button>
              </div>
            </div>

            {/* Scrollable Subtitles List */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 max-h-[560px]">
              {segments.length === 0 ? (
                <div className="h-full py-28 flex flex-col items-center justify-center text-center text-slate-500">
                  <Radio className="w-10 h-10 mb-3 opacity-30 text-amber-400" />
                  <p className="text-sm font-medium text-slate-400 mb-1">
                    No sermon speech segments captured yet
                  </p>
                  <p className="text-xs max-w-sm">
                    Click <strong>"Start Live Mic"</strong> to speak into your microphone, or choose <strong>"Play Sample"</strong> to preview a realistic Friday sermon translation.
                  </p>
                </div>
              ) : (
                segments.map((seg, idx) => {
                  const isLatest = idx === segments.length - 1;
                  return (
                    <div
                      key={seg.id}
                      className={`p-4 rounded-xl border transition-all ${
                        isLatest
                          ? 'bg-slate-900 border-amber-500/50 shadow-md ring-1 ring-amber-500/20'
                          : 'bg-slate-950/60 border-slate-800/80 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-2 pb-1.5 border-b border-white/5">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-amber-400">
                            {seg.sourceLang.toUpperCase()}
                          </span>
                          <span className="text-slate-400">{seg.timestamp}</span>
                        </div>
                        {seg.isAyahOrHadith && (
                          <span className="text-[10px] text-amber-400 font-medium flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded">
                            <BookOpen className="w-3 h-3" />
                            <span>{seg.notes || 'Quran / Hadith'}</span>
                          </span>
                        )}
                      </div>

                        {/* Original Transcript */}
                      <p className="text-sm font-medium text-slate-100 mb-2" dir={['ar', 'ur', 'ld'].includes(seg.sourceLang) ? 'rtl' : 'ltr'}>
                        {seg.originalText}
                      </p>

                      {/* Multilingual Grid Preview */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2 border-t border-white/5 text-xs">
                        <div className="bg-slate-950/70 p-2 rounded border border-slate-800">
                          <span className="text-[10px] text-slate-400 block font-mono">🇬🇧 English:</span>
                          <p className="text-slate-200 mt-0.5">{seg.translations.en}</p>
                        </div>
                        <div className="bg-slate-950/70 p-2 rounded border border-slate-800">
                          <span className="text-[10px] text-slate-400 block font-mono">🇹🇷 Turkish:</span>
                          <p className="text-slate-200 mt-0.5">{seg.translations.tr}</p>
                        </div>
                        <div className="bg-slate-950/70 p-2 rounded border border-slate-800">
                          <span className="text-[10px] text-slate-400 block font-mono">🇵🇰 Urdu:</span>
                          <p className="text-slate-200 mt-0.5 font-urdu text-right" dir="rtl">{seg.translations.ur}</p>
                        </div>
                        <div className="bg-slate-950/70 p-2 rounded border border-slate-800">
                          <span className="text-[10px] text-slate-400 block font-mono">🕌 Lisan al-Dawat (Bohra):</span>
                          <p className="text-slate-200 mt-0.5 font-arabic text-right" dir="rtl">{seg.translations.ld}</p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Share / QR Modal */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6 max-w-md w-full shadow-2xl relative text-center">
            <h3 className="text-lg font-bold text-white mb-2">Connect Mosque Congregants</h3>
            <p className="text-xs text-slate-400 mb-6">
              Display this QR code at the mosque entrance or print on bulletin boards so attendees can scan and read translations on their personal smartphones.
            </p>

            <div className="bg-white p-4 rounded-xl inline-block mb-4">
              <div className="w-52 h-52 border-4 border-slate-950 flex flex-col items-center justify-center gap-1.5 p-3 text-slate-900 font-mono text-center">
                <span className="text-2xl font-black tracking-widest text-emerald-800">MINBAR LIVE</span>
                <span className="text-[11px] font-bold text-slate-700">SCAN TO LISTEN</span>
                <div className="my-1 py-1 px-3 bg-amber-100 rounded text-amber-900 font-bold text-xs">
                  ROOM: JUMUA-01
                </div>
                <span className="text-[10px] text-slate-400">Real-time Multilingual Audio Subtitles</span>
              </div>
            </div>

            <p className="text-xs text-amber-400 font-mono mb-6">
              URL: {window.location.origin}/?view=mobile
            </p>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  onSwitchView('mobile');
                  setShowShareModal(false);
                }}
                className="flex-1 py-2 rounded-lg bg-emerald-500 text-slate-950 font-semibold hover:bg-emerald-400 text-xs transition-colors"
              >
                Open Mobile View Now
              </button>
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
