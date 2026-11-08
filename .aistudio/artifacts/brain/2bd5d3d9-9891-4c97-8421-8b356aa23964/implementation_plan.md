# MinbarLive: Real-Time Mosque Khutbah Translation System

MinbarLive is a live speech-to-translated-captions and attendee listening platform designed specifically for Friday Khutbahs (sermons) and Islamic lectures. It captures the speaker's live microphone (or built-in multi-lingual test audio samples) in languages such as Arabic, Turkish, Urdu, Hindi, or Lisan al-Dawat (Dawoodi Bohra Gujarati-Arabic dialect), translates the sermon in real time using Gemini AI with theological precision, and broadcasts synchronized, high-legibility captions to both big-screen mosque TVs and personal smartphone screens.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> The following parameters were confirmed during the interactive interview:
> 
> - **Audio Capture Strategy**: Dual-mode audio capture supporting live microphone input directly in the browser, plus a built-in library of authentic test Khutbah audio samples (Arabic, Turkish, Urdu, Hindi, and Lisan al-Dawat) so the system can be thoroughly tested anytime without an active live speaker.
> - **Display & Viewing Modality**: Dual-screen architecture offering:
>   1. **Mosque TV / Projector Display Mode**: Large-format, high-contrast, distraction-free subtitle display visible from 20–50 feet away in prayer halls.
>   2. **Attendee Mobile Mode**: Personal smartphone view where congregants select their preferred language, adjust typography, and read (or listen via quiet earbud TTS) in real time.
> - **Initial Output Languages**: English, Arabic, Turkish, Urdu, Hindi, and French, with bilingual side-by-side mode (original spoken transcript + translated text).
> - **Theological Context & Terminology**: Built-in prompt tuning preserving sacred expressions (Ayahs, Hadith references, Duas, Taqwa, Insha'Allah, Bohra Lisan al-Dawat salawat and honorifics) without mistranslations.

---

## 1. Overview & Core Concept

### What It Does
In many international and metropolitan mosques, congregants come from diverse linguistic backgrounds (youth, reverts/converts, expatriates, visitors, students, and elders). Often the Friday Khutbah or community speech is delivered entirely in one tongue—such as Arabic, Turkish (common in European mosques), Urdu/Hindi (common across South Asia and the diaspora), or Lisan al-Dawat (in Dawoodi Bohra Masjids and Markaz). 

MinbarLive solves this by listening to the speaker at the minbar/podium in real-time, performing context-aware translation via Gemini AI, and broadcasting readable subtitles simultaneously to:
1. **The Mosque Main TV / Projector**: Displaying the main community language (e.g., English or dual-language) in high-contrast cinema typography.
2. **Attendee Smartphones**: Accessed via a simple QR code or session code, letting each person read the khutbah in their native language in real-time.

### Target Audience & Personas
- **Mosque AV & Tech Volunteers**: Need a reliable, one-click system to start audio capture, monitor volume levels, and cast to screens.
- **Congregants & Community Members**: Need an instantaneous, silent mobile reader that respects the reverence of the prayer hall.
- **Dawoodi Bohra Community**: Need accurate translation of Lisan al-Dawat (which blends Gujarati grammar with Arabic, Persian, and Urdu theological vocabulary).
- **International Visitors & Converts**: Need immediate comprehension of the khutbah's moral and spiritual guidance.

---

## 2. User Experience & Visual Design

### Key User Flows

#### Flow 1: Broadcaster / Khateeb Control Console
- **Start Capture**: The volunteer selects the input source (Live Microphone or Demo Sample Khutbah) and the primary spoken language (Auto-Detect, Arabic, Turkish, Urdu, Hindi, or Lisan al-Dawat).
- **Live Monitoring**: Real-time VU meter and speech indicator show audio activity.
- **Audience Connection**: Generates a quick QR code, 4-letter session code, and direct link for attendees in the hall.
- **Stream Controls**: Pause/resume, clear buffer, and switch audio sources on the fly.

#### Flow 2: Big-Screen TV & Projector Mode
- **Full-Screen Cinema View**: Clean dark slate and gold accent palette (`#090D16` deep navy slate with amber and emerald accents) designed for low-light mosque halls without harsh white glare.
- **Dual Script Display**: Option to display original spoken speech (e.g. Arabic or Turkish) above the live translation (e.g. English) or translation-only for maximum text size.
- **Dynamic Text Scaling**: 4 font size tiers (`Standard`, `Large`, `Extra Large`, `Cinema 4K`) readable from distance.
- **Smooth Subtitle Teleprompter**: Current spoken sentence is highlighted in luminous gold/white, with previous context fading gently upward.

#### Flow 3: Attendee Mobile Reader View
- **Language Switcher**: Single-tap language pills (English, French, Urdu, Arabic, Turkish, Hindi).
- **Personal Customization**: Font size slider (A- / A+), dark/light mode toggle, and RTL (Right-to-Left) auto-layout for Arabic and Urdu.
- **Quiet Mode / Earbud TTS**: Optional gentle text-to-speech option for elderly or visually impaired congregants listening through one earbud.
- **Khutbah Summary & Takeaways**: At the end of the khutbah, generates an instant 3-point spiritual summary and key quotes to reflect on during the week.

#### Flow 4: Built-in Interactive Khutbah Library (Immediate Testing)
- **Sample 1 (Arabic)**: Friday sermon on gratitude and community solidarity with Quranic Ayahs.
- **Sample 2 (Turkish)**: Diyanet-style Khutbah on compassion, brotherhood, and moral character.
- **Sample 3 (Urdu)**: Jumu'ah bayaan on patience (*Sabr*) and sincerity (*Ikhlas*).
- **Sample 4 (Hindi)**: Community speech on harmony and serving humanity.
- **Sample 5 (Lisan al-Dawat - Bohra Gujarati)**: Authentic Waaz discourse featuring traditional Bohra terminology, Arabic citations, and Gujarati narrative flow.

### Visual Identity & Theme
- **Color Palette**:
  - Dominant Canvas (60%): Deep Midnight Mosque Slate (`#0B0F17`) and Dark Minbar Green (`#061814`).
  - Structural Surfaces (30%): Deep tinted obsidian cards (`#111726`), hairline borders (`rgba(255, 255, 255, 0.08)`).
  - Accents (10%): Luminous Minbar Gold (`#EAB308` / `#F59E0B`) and Sanctuary Emerald (`#10B981`).
- **Typography**:
  - Headers & Brand: `Plus Jakarta Sans` with dignified geometric styling.
  - Arabic & Urdu Text: `Amiri` and `Noto Naskh Arabic` for graceful calligraphy and sacred text rendering.
  - Captions & Translations: Clean sans-serif with high x-height for rapid reading at a distance.
- **Spatial Discipline**:
  - Zero-pill metadata: Pure unboxed metadata with subtle typographic separators (`·`).
  - No decorative AI gimmicks: No fake status ticks, no pulsing green dots, no glowing neon slop.

---

## 3. Key Product Decisions & Trade-Offs

### Decision 1: Hybrid Audio Engine (Web Audio + Gemini Translation)
- **Chosen Approach**: 
  - For live microphone input: Capture audio chunks via browser `MediaRecorder` or Web Speech recognition stream, send audio/text segments to the server-side Gemini API endpoint (`/api/translate-khutbah`).
  - For pre-recorded audio / simulation: Built-in synthesized and pre-recorded khutbah streams that stream realistic audio segments into the translation pipeline.
- **Why**: Allows instant evaluation and testing even in a quiet room or off-Friday hours, while being fully functional with real microphones during real Friday prayers.
- **Alternatives Considered**: Pure Web Speech API without AI was rejected because standard browser speech recognition fails on mixed religious terms (e.g. Lisan al-Dawat or Arabic Quranic quotations spoken in an Urdu sermon).

### Decision 2: Specialized Prompt Tuning for Sacred Speech
- **Chosen Approach**: Server-side system prompt instructing Gemini to recognize Islamic discourse markers, Quranic citations (surah/ayah references), prophetic Hadiths, and Dawoodi Bohra specific terms, preserving their dignity while providing clear, fluent translations.
- **Why**: Generic translation models often misinterpret religious concepts (e.g. translating "Zakat" as "taxation" or "Lisan al-Dawat" phrases as nonsense).

### Decision 3: Client-Side Synchronized Broadcast State
- **Chosen Approach**: React state management with lightweight broadcast event synchronization across views (TV Mode, Broadcaster Console, Mobile View), with support for direct URL routing or view switcher.
- **Why**: Keeps setup effortless—mosques do not need complex WebSocket server clusters for local setup; everything works out-of-the-box in the browser while supporting local multi-device view simulation.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        AUDIO CAPTURE LAYER                             │
│                                                                        │
│   [ Live Podium Microphone ]       [ Pre-recorded Khutbah Audio ]      │
│   (Web Audio API / MediaRecorder)  (Arabic / Turkish / Urdu / Bohra)   │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ Audio chunks / transcripts
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     SERVER-SIDE GEMINI TRANSLATION                     │
│                                                                        │
│   POST /api/khutbah/translate                                          │
│   • Model: gemini-3.8-flash (with theological system instructions)    │
│   • Preserves Quranic Ayahs, Hadith citations, Bohra salawat           │
│   • Generates multi-language translation output (EN, AR, TR, UR, HI, FR)│
│   • Streams real-time subtitle chunks                                  │
└──────────────────────────────────┬─────────────────────────────────────┘
                                   │ JSON / SSE Stream
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        PRESENTATION & UI LAYER                         │
│                                                                        │
│   ┌───────────────────────────┐      ┌─────────────────────────────┐   │
│   │   Mosque TV / Projector   │      │   Mobile Attendee Reader    │   │
│   │   • Cinema Large Subtitles│      │   • Personal Language Select│   │
│   │   • Dual-language Display │      │   • Text-to-Speech Earbud   │   │
│   │   • High-contrast Theme   │      │   • Font Sizing & RTL       │   │
│   └───────────────────────────┘      └─────────────────────────────┘   │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │   Broadcaster / AV Operator Console                            │   │
│   │   • Audio VU Meter, Source Language Toggle, Session QR Code    │   │
│   │   • Sample Khutbah Selector & Playback Controls                │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

### Component Structure
1. `src/components/BroadcasterConsole.tsx`: Audio device selection, gain/level meter, source language picker, test khutbah selector, session share QR card.
2. `src/components/TvDisplayView.tsx`: Full-screen cinema mode with dual-language subtitles, active line highlight, font size zoom, contrast toggle.
3. `src/components/MobileAttendeeView.tsx`: Responsive smartphone interface with language dropdown/tabs (English, French, Urdu, Arabic, Turkish, Hindi), font controls, and quiet audio reader.
4. `src/components/KhutbahLibrary.tsx`: Interactive player with authentic speeches in Arabic, Turkish, Urdu, Hindi, and Lisan al-Dawat.
5. `src/services/geminiKhutbahService.ts`: Server-side proxy client connecting to `@google/genai` with `gemini-3.8-flash` and domain prompt constraints.
6. `server.ts` / API endpoints: Express server providing `/api/khutbah/translate` and `/api/khutbah/transcribe` with server-side API key handling.

---

## 5. Verification & Testing Steps

1. **Compilation Check**: Run `compile_applet` to ensure TypeScript and Vite build cleanly.
2. **Microphone Live Capture Test**: Verify browser microphone permissions, speech capture, and audio level meters.
3. **Demo Audio Test**: Play samples in Arabic, Turkish, Urdu, Hindi, and Lisan al-Dawat to verify immediate real-time translation without microphone access.
4. **TV Mode Test**: Test cinema display at 100%, 150%, and 200% zoom levels in full-screen.
5. **Mobile View Test**: Test on mobile screen viewports (375px–430px) with language switching and Right-to-Left (RTL) script alignment.
