/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { KhutbahSegment, ActiveAppView, MicStatus } from './types';
import { BroadcasterConsole } from './components/BroadcasterConsole';
import { TvDisplayView } from './components/TvDisplayView';
import { MobileAttendeeView } from './components/MobileAttendeeView';
import { DEMO_KHUTBAH_SAMPLES } from './data/demoSamples';

export default function App() {
  const [currentView, setCurrentView] = useState<ActiveAppView>('controller');
  const [segments, setSegments] = useState<KhutbahSegment[]>([]);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [micStatus, setMicStatus] = useState<MicStatus>('ready');
  const [mosqueName, setMosqueName] = useState<string>('Central Mosque Jumu\'ah Sanctuary');

  // Load initial demo segment so user immediately sees how it looks
  useEffect(() => {
    const initialSample = DEMO_KHUTBAH_SAMPLES[0];
    const initialSeg = initialSample.segments[0];
    const firstSegment: KhutbahSegment = {
      id: 'init-0',
      timestamp: '12:30:15 PM',
      originalText: initialSeg.originalText,
      sourceLang: initialSample.sourceLang,
      translations: {
        en: initialSeg.translations.en || '',
        ar: initialSeg.translations.ar || initialSeg.originalText,
        tr: initialSeg.translations.tr || '',
        ur: initialSeg.translations.ur || '',
        hi: initialSeg.translations.hi || '',
        fr: initialSeg.translations.fr || '',
        ld: initialSeg.translations.ld || '',
      },
      isAyahOrHadith: initialSeg.isAyahOrHadith,
      notes: initialSeg.notes,
    };
    setSegments([firstSegment]);
  }, []);

  // Handle URL query parameter ?view=tv or ?view=mobile if attendees or screens open directly
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view') as ActiveAppView;
    if (viewParam && ['controller', 'tv', 'mobile'].includes(viewParam)) {
      setCurrentView(viewParam);
    }
  }, []);

  const handleAddSegment = (seg: KhutbahSegment) => {
    setSegments((prev) => {
      const existingIdx = prev.findIndex((s) => s.id === seg.id);
      if (existingIdx !== -1) {
        const updated = [...prev];
        updated[existingIdx] = seg;
        return updated;
      }
      return [...prev, seg];
    });
  };

  const handleClearSegments = () => {
    setSegments([]);
  };

  return (
    <div className="w-full min-h-screen bg-[#070b12] text-slate-100 font-sans selection:bg-amber-500/30">
      {/* Switch between views */}
      {currentView === 'controller' && (
        <BroadcasterConsole
          segments={segments}
          onAddSegment={handleAddSegment}
          onClearSegments={handleClearSegments}
          isCapturing={isCapturing}
          setIsCapturing={setIsCapturing}
          micStatus={micStatus}
          setMicStatus={setMicStatus}
          onSwitchView={(view) => setCurrentView(view)}
          mosqueName={mosqueName}
          setMosqueName={setMosqueName}
        />
      )}

      {currentView === 'tv' && (
        <div className="relative">
          <div className="fixed top-4 right-4 z-50">
            <button
              onClick={() => setCurrentView('controller')}
              className="px-3 py-1.5 bg-black/70 hover:bg-black/90 text-amber-400 border border-slate-700 rounded-lg text-xs font-semibold backdrop-blur-md transition-colors"
            >
              ← Back to Broadcaster
            </button>
          </div>
          <TvDisplayView
            segments={segments}
            isCapturing={isCapturing}
            micStatus={micStatus}
            mosqueName={mosqueName}
          />
        </div>
      )}

      {currentView === 'mobile' && (
        <div className="relative">
          <div className="fixed top-3 right-20 z-50">
            <button
              onClick={() => setCurrentView('controller')}
              className="px-2.5 py-1 bg-black/70 hover:bg-black/90 text-slate-300 border border-slate-700 rounded-md text-[11px] font-medium backdrop-blur-md transition-colors"
            >
              Switch View
            </button>
          </div>
          <MobileAttendeeView
            segments={segments}
            isCapturing={isCapturing}
            onBackToDashboard={() => setCurrentView('controller')}
            mosqueName={mosqueName}
          />
        </div>
      )}
    </div>
  );
}
