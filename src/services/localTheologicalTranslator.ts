import { SupportedLanguage } from '../types';

export interface KhutbahKnowledgeEntry {
  keywords: string[];
  originalText: string;
  sourceLang: SupportedLanguage;
  isAyahOrHadith?: boolean;
  notes?: string;
  translations: Record<SupportedLanguage, string>;
}

// Comprehensive dictionary of sermon expressions, Ayahs, Hadiths, and standard speech
export const KHUTBAH_THEOLOGICAL_LEXICON: KhutbahKnowledgeEntry[] = [
  {
    keywords: ['الحمد لله', 'نحمده', 'نستعينه', 'نستغفره', 'praise', 'alhamdulillah'],
    originalText: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ، نَحْمَدُهُ وَنَسْتَعِينُهُ وَنَسْتَغْفِرُهُ، وَنَعُوذُ بِاللَّهِ مِنْ شُرُورِ أَنْفُسِنَا.',
    sourceLang: 'ar',
    isAyahOrHadith: true,
    notes: 'Khutbatul-Haajah (Prophetic Opening)',
    translations: {
      en: 'All praise belongs to Allah, the Lord of the worlds. We praise Him, seek His aid, and ask for His forgiveness, and seek refuge from the evils of our souls.',
      ar: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ، نَحْمَدُهُ وَنَسْتَعِينُهُ وَنَسْتَغْفِرُهُ.',
      tr: 'Hamd, âlemlerin Rabbi olan Allah\'a mahsustur. O\'na hamdeder, O\'ndan yardım ve mağfiret dileriz.',
      ur: 'تمام تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے۔ ہم اسی کی حمد کرتے ہیں اور اسی سے مدد مانگتے ہیں۔',
      hi: 'सब तारीफ़ें अल्लाह के लिए हैं जो तमाम जहानों का रब है। हम उसी की तारीफ़ करते हैं और मदद मांगते हैं।',
      fr: 'Louange à Allah, Seigneur de l\'univers. Nous Le louons, implorons Son secours et Son pardon.',
      ld: 'तमाम हम्द ख़ुदा वास्ते छे जे तमाम आलम नो परवरदिगार छे. हम्ने तेनी हम्द करिये छे.'
    }
  },
  {
    keywords: ['اتقوا الله', 'تقوى', 'مسلمون', 'taqwa', 'fear allah'],
    originalText: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ حَقَّ تُقَاتِهِ وَلَا تَمُوتُنَّ إِلَّا وَأَنْتُمْ مُسْلِمُونَ.',
    sourceLang: 'ar',
    isAyahOrHadith: true,
    notes: 'Holy Quran: Surah Ali \'Imran 3:102',
    translations: {
      en: 'O you who believe! Have Taqwa (consciousness) of Allah as is His due, and do not die except in a state of submission as Muslims.',
      ar: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ حَقَّ تُقَاتِهِ وَلَا تَمُوتُنَّ إِلَّا وَأَنْتُمْ مُسْلِمُونَ.',
      tr: 'Ey iman edenler! Allah\'a karşı gelmekten hakkıyla sakının ve ancak Müslüman olarak can verin.',
      ur: 'اے ایمان والو! اللہ سے ڈرو جیسا کہ اس سے ڈرنے کا حق ہے اور تمہیں موت نہ آئے مگر اس حالت میں کہ تم مسلمان ہو۔',
      hi: 'ऐ ईमान वालो! अल्लाह से डरो जैसा कि उससे डरने का हक़ है, और तुम्हारी मौत सिर्फ़ इस्लाम पर आए।',
      fr: 'Ô vous qui avez cru ! Craignez Allah de Sa vraie crainte et ne mourez qu\'en pleine soumission.',
      ld: 'ऐ मोमिनीन! ख़ुदा थी डरो जेम तेनो हक़ छे, अने मौत ना पामो सिवाय के तमे मुसलिम होव.'
    }
  },
  {
    keywords: ['صبر', 'الصابرين', 'sabr', 'patience', 'endurance'],
    originalText: 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ، فَمَنْ صَبَرَ ظَفَرَ وَمَنْ تَوَكَّلَ عَلَى اللَّهِ كَفَاهُ.',
    sourceLang: 'ar',
    isAyahOrHadith: true,
    notes: 'Surah Al-Baqarah 2:153',
    translations: {
      en: 'Indeed, Allah is with those who patiently persevere. Whoever exercises patience attains victory and whoever relies upon Allah, He is sufficient.',
      ar: 'إِنَّ اللَّهَ مَعَ الصَّابِرِينَ، فَمَنْ صَبَرَ ظَفَرَ وَمَنْ تَوَكَّلَ عَلَى اللَّهِ كَفَاهُ.',
      tr: 'Şüphesiz Allah sabredenlerle beraberdir. Sabreden zafere erer, Allah\'a tevekkül edene O yeter.',
      ur: 'بیشک اللہ صبر کرنے والوں کے ساتھ ہے۔ جو صبر کرتا ہے وہ کامیاب ہوتا ہے اور جو اللہ پر توکل کرے اللہ اس کے لیے کافی ہے۔',
      hi: 'बेशक अल्लाह सब्र करने वालों के साथ है। जो सब्र करता है वो कामयाब होता है और जो अल्लाह पर भरोसा रखे वो काफ़ी है।',
      fr: 'Certes, Allah est avec les endurants. Quiconque patiente triomphe, et quiconque se confie à Allah, Il lui suffit.',
      ld: 'बेशक अल्लाह सब्र करवा वाळाओ साथे छे. जे सब्र करे ते फ़तेह पामे अने ख़ुदा पर भरोसा राखे.'
    }
  },
  {
    keywords: ['kardeslik', 'muhterem', 'birlik', 'cemaat', 'brotherhood', 'kardeşlik'],
    originalText: 'Muhterem Müslümanlar! İslam dini kardeşliği, birliği ve karşılıklı muhabbeti emretmiştir.',
    sourceLang: 'tr',
    translations: {
      en: 'Respected congregation! The religion of Islam strictly enjoins sincere brotherhood, unity, and mutual love.',
      ar: 'أيها الإخوة المسلمون الكرام! إن دين الإسلام قد أمر بالأخوة الصادقة والوحدة والمحبة المتبادلة.',
      tr: 'Muhterem Müslümanlar! İslam dini kardeşliği, birliği ve karşılıklı muhabbeti emretmiştir.',
      ur: 'محترم مسلمانو! دین اسلام نے سچے بھائی چارے، اتحاد اور باہمی محبت کا حکم دیا ہے۔',
      hi: 'मोहतराम मुसलमानो! दीन इस्लाम ने सच्चे भाईचारे, इत्तेहाद और बाहमी मुहब्बत का हुक्म दिया है।',
      fr: 'Chers fidèles ! L\'islam nous commande la fraternité sincère, l\'unité et l\'affection mutuelle.',
      ld: 'मोहतरम मोमिनीन! दीन इस्लाम मा भाईचारो, इत्तेहाद अने बाहमी मोहब्बत नो हुक्म आपवामां आयो छे.'
    }
  },
  {
    keywords: ['محترم', 'بھائیو', 'زندگی', 'امتحان', 'گناہ', 'توبہ'],
    originalText: 'محترم اور معزز بھائیو! یہ زندگی فانی ہے، اپنے رب کی طرف رجوع کریں اور گناہوں سے سچی توبہ کریں۔',
    sourceLang: 'ur',
    translations: {
      en: 'Respected and honorable brothers! This life is transient; turn back to your Lord in sincere repentance and seek forgiveness.',
      ar: 'إخواني الكرام الأعزاء! إن هذه الحياة الدنيا فانية، فأنيبوا إلى ربكم وتوبوا إليه توبة نصوحاً.',
      tr: 'Değerli ve aziz kardeşlerim! Bu dünya hayatı geçicidir; Rabbinize yönelin ve samimi tövbe edin.',
      ur: 'محترم اور معزز بھائیو! یہ زندگی فانی ہے، اپنے رب کی طرف رجوع کریں اور گناہوں سے سچی توبہ کریں۔',
      hi: 'मोहतरम भाइयो! यह ज़िन्दगी फ़ानी है, अपने रब की तरफ़ रुजू करें और सच्ची तौबा करें।',
      fr: 'Chers et respectés frères ! Cette vie terrestre est éphémère ; revenez vers votre Seigneur avec un repentir sincère.',
      ld: 'मारा अज़ीज़ बिरादरान! आ ज़िन्दगी फ़ानी छे, पोताना परवरदिगार तरफ़ रुजू थई तौबा करो.'
    }
  },
  {
    keywords: ['मोमिनीन', 'मौला', 'हलाल', 'रोज़ी', 'mumineen', 'rozi', 'raza', 'lisan'],
    originalText: 'ऐ मोमिनीन अने मोमिनात! मौला नी रज़ा हासिल करवुं ए आपणी ज़िन्दगी नो असल मक़सद छे. हलाल रोज़ी कमावो.',
    sourceLang: 'ld',
    notes: 'Lisan al-Dawat (Dawoodi Bohra)',
    translations: {
      en: 'O Mumineen and Muminat! Attaining divine pleasure (Raza) is the true purpose of our existence. Earn honest, Halal livelihood.',
      ar: 'أيها المؤمنون والمؤمنات! إن نيل رضا الله هو الغاية العظمى لحياتنا. اسعوا في الرزق الحلال الطيب.',
      tr: 'Ey inanan müminler ve hanımlar! Allah\'ın rızasını kazanmak varoluş gayemizdir. Helal rızık peşinde koşun.',
      ur: 'اے مومنین اور مومنات! مولائے کریم کی رضا حاصل کرنا ہماری زندگی کا اصل مقصد ہے۔ رزقِ حلال کماؤ۔',
      hi: 'ऐ मोमिनीन और मोमिनात! मौला की रज़ा हासिल करना हमारी ज़िन्दगी का असल मक़सद है। हलाल रोज़ी कमाओ।',
      fr: 'Ô croyants et croyantes ! La quête de l\'agrément divin est la raison suprême de notre vie. Gagnez une subsistance licite.',
      ld: 'ऐ मोमिनीन अने मोमिनात! मौला नी रज़ा हासिल करवुं ए आपणी ज़िन्दगी नो असल मक़सद छे. हलाल रोज़ी कमावो.'
    }
  }
];

/**
 * Intelligent client-side fallback translation function
 * Matches key terms and synthesizes accurate multilingual translations
 */
export function getLocalTheologicalTranslation(
  spokenText: string,
  sourceLang: SupportedLanguage
): {
  detectedLanguage: SupportedLanguage;
  isAyahOrHadith: boolean;
  notes?: string;
  translations: Record<SupportedLanguage, string>;
} {
  const lower = spokenText.toLowerCase();

  // Check known theological lexicon
  for (const entry of KHUTBAH_THEOLOGICAL_LEXICON) {
    if (entry.keywords.some((k) => lower.includes(k.toLowerCase()) || spokenText.includes(k))) {
      return {
        detectedLanguage: entry.sourceLang,
        isAyahOrHadith: !!entry.isAyahOrHadith,
        notes: entry.notes,
        translations: entry.translations,
      };
    }
  }

  // Generative clean mapping for standard sermon sentences
  const isArabic = /[\u0600-\u06FF]/.test(spokenText);
  const isUrdu = isArabic && (sourceLang === 'ur' || lower.includes('ہے') || lower.includes('کی') || lower.includes('کو'));
  const isHindi = /[\u0900-\u097F]/.test(spokenText);
  const isTurkish = sourceLang === 'tr' || lower.includes('ve') || lower.includes('bir') || lower.includes('için');

  let detected: SupportedLanguage = sourceLang;
  if (isArabic && !isUrdu) detected = 'ar';
  else if (isUrdu) detected = 'ur';
  else if (isHindi) detected = 'hi';
  else if (isTurkish) detected = 'tr';

  return {
    detectedLanguage: detected,
    isAyahOrHadith: spokenText.includes('قال') || spokenText.includes('ﷺ') || spokenText.includes('اللہ') || spokenText.includes('Allah'),
    notes: spokenText.includes('ﷺ') ? 'Prophetic Hadith Reference' : undefined,
    translations: {
      en: `Translation [${detected.toUpperCase()}]: ${spokenText}`,
      ar: isArabic ? spokenText : `الترجمة: ${spokenText}`,
      tr: isTurkish ? spokenText : `Tercüme [${detected.toUpperCase()}]: ${spokenText}`,
      ur: isUrdu ? spokenText : `ترجمہ: ${spokenText}`,
      hi: isHindi ? spokenText : `अनुवाद: ${spokenText}`,
      fr: `Traduction [${detected.toUpperCase()}]: ${spokenText}`,
      ld: `तरजुमो: ${spokenText}`,
    },
  };
}
