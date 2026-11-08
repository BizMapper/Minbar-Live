import { DemoSpeechSample } from '../types';

export const DEMO_KHUTBAH_SAMPLES: DemoSpeechSample[] = [
  {
    id: 'arabic-jumua',
    title: 'The Blessings of Gratitude & Community Harmony',
    sourceLang: 'ar',
    speaker: 'Sheikh Dr. Tariq Al-Hashimi',
    mosqueContext: 'Central Mosque - Friday Khutbah',
    description: 'An eloquent classical Arabic sermon exploring spiritual gratitude, community unity, and moral character with Quranic citations.',
    durationSeconds: 90,
    segments: [
      {
        originalText: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ، نَحْمَدُهُ وَنَسْتَعِينُهُ وَنَسْتَغْفِرُهُ، وَنَعُوذُ بِاللَّهِ مِنْ شُرُورِ أَنْفُسِنَا وَمِنْ سَيِّئَاتِ أَعْمَالِنَا.',
        isAyahOrHadith: true,
        translations: {
          en: 'All praise belongs to Allah, the Lord of the worlds. We praise Him, seek His aid, and ask for His forgiveness, and we seek refuge in Allah from the evils of our souls.',
          tr: 'Hamd, âlemlerin Rabbi olan Allah\'a mahsustur. O\'na hamdeder, O\'ndan yardım ve mağfiret dileriz. Nefislerimizin şerrinden Allah\'a sığınırız.',
          ur: 'تمام تعریفیں اللہ ہی کے لیے ہیں جو تمام جہانوں کا پالنے والا ہے۔ ہم اسی کی حمد کرتے ہیں، اسی سے مدد مانگتے ہیں اور اپنے گناہوں کی بخشش چاہتے ہیں۔',
          hi: 'सब तारीफ़ें अल्लाह के लिए हैं जो तमाम जहानों का रब है। हम उसी की तारीफ़ करते हैं, उसी से मदद मांगते हैं और उसी से माफ़ी के तलबगार हैं।',
          fr: 'Louange à Allah, Seigneur des mondes. Nous Le louons, implorons Son secours et Son pardon, et nous cherchons refuge auprès d\'Allah contre les maux de nos âmes.',
          ld: 'तमाम हम्द ख़ुदा वास्ते छे जे तमाम आलम नो परवरदिगार छे. हम्ने तेनी हम्द करिये छे अने मग्फ़िरत तलब करिये छे.'
        },
        notes: 'Khutbatul-Haajah (Opening Supplication)'
      },
      {
        originalText: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اتَّقُوا اللَّهَ حَقَّ تُقَاتِهِ وَلَا تَمُوتُنَّ إِلَّا وَأَنْتُمْ مُسْلِمُونَ.',
        isAyahOrHadith: true,
        translations: {
          en: 'O you who believe! Fear Allah as He ought to be feared, and do not die except while you are Muslims. [Surah Ali \'Imran: 102]',
          tr: 'Ey iman edenler! Allah\'a karşı gelmekten nasıl sakınmak gerekiyorsa öylece sakının ve ancak Müslümanlar olarak can verin. [Âl-i İmrân: 102]',
          ur: 'اے ایمان والو! اللہ سے ڈرو جیسا کہ اس سے ڈرنے کا حق ہے اور تمہیں موت نہ آئے مگر اس حالت میں کہ تم مسلمان ہو۔ [آل عمران: ۱۰۲]',
          hi: 'ऐ ईमान वालो! अल्लाह से डरो जैसा कि उससे डरने का हक़ है, और तुम्हारी मौत सिर्फ़ इस्लाम की हालत में आए। [आल-ए-इमरान: 102]',
          fr: 'Ô vous qui croyez ! Craignez Allah comme Il mérite d\'être craint, et ne mourez qu\'en étant musulmans. [Sourate Al-Imran : 102]',
          ld: 'ऐ मोमिनीन! ख़ुदा थी डरो जेम तेनो हक़ छे, अने तमे मौत ना पामो सिवाय के तमे मुसलिम होव.'
        },
        notes: 'Holy Quran: Surah Ali \'Imran 3:102'
      },
      {
        originalText: 'أَيُّهَا الإِخْوَةُ الكِرَامُ، إِنَّ النِّعَمَ تَدُومُ بِالشُّكْرِ، وَإِنَّ القُلُوبَ تَطْمَئِنُّ بِذِكْرِ اللَّهِ تَعَالَى.',
        translations: {
          en: 'Honorable brothers and sisters, verily blessings endure through gratitude, and hearts truly find tranquility in the remembrance of Allah Almighty.',
          tr: 'Aziz kardeşlerim, şüphesiz nimetler şükürle daim olur ve kalpler ancak Yüce Allah\'ı anmakla huzur bulur.',
          ur: 'محترم بھائیو اور بہنو، یقیناً نعمتیں شکر سے قائم رہتی ہیں اور دل اللہ تعالیٰ کے ذکر ہی سے سکون پاتے ہیں۔',
          hi: 'ऐ मोहतराम भाइयो और बहनो, बेशक नेअमतें शुक्र अदा करने से बाक़ी रहती हैं और दिलों को अल्लाह के ज़िक्र से ही सुकून मिलता है।',
          fr: 'Chers frères et sœurs, en vérité les bienfaits perdurent par la gratitude, et les cœurs ne trouvent l\'apaisement que dans le rappel d\'Allah.',
          ld: 'ऐ बिरादरान-ए-गिरामी, बेशक नेअमत शुक्र थी क़ायम रहे छे, अने दिल ख़ुदा ताला ना ज़िक्र थी मुतमईन थाय छे.'
        }
      },
      {
        originalText: 'تَرَاحَمُوا فِيمَا بَيْنَكُمْ، وَأَعِينُوا الضَّعِيفَ، وَاحْفَظُوا أَلْسِنَتَكُمْ، فَقَدْ قَالَ النَّبِيُّ ﷺ: «المُسْلِمُ مَنْ سَلِمَ المُسْلِمُونَ مِنْ لِسَانِهِ وَيَدِهِ».',
        isAyahOrHadith: true,
        translations: {
          en: 'Show compassion to one another, support the vulnerable, and guard your tongues, for the Prophet ﷺ said: "The true Muslim is one from whose tongue and hand other Muslims are safe."',
          tr: 'Birbirinize merhamet gösterin, zayıflara yardım edin ve dillerinizi koruyun. Nitekim Peygamber Efendimiz ﷺ buyurdu: "Müslüman, dilinden ve elinden diğer Müslümanların güvende olduğu kimsedir."',
          ur: 'آپس میں رحم دلی کا برتاؤ کرو، کمزوروں کی مدد کرو، اور اپنی زبانوں کی حفاظت کرو، کیونکہ نبی کریم ﷺ نے فرمایا: "مسلمان وہ ہے جس کی زبان اور ہاتھ سے دوسرے مسلمان محفوظ رہیں۔"',
          hi: 'आपस में रहमदिली बरतो, कमज़ोरों की मदद करो और अपनी ज़बान की हिफ़ाज़त करो, क्योंकि नबी करीम ﷺ ने फ़रमाया: "सच्चा मुसलमान वह है जिसकी ज़बान और हाथ से दूसरे मुसलमान महफ़ूज़ रहें।"',
          fr: 'Faites preuve de compassion mutuelle, soutenez les plus faibles et préservez vos langues, car le Prophète ﷺ a dit : « Le musulman est celui dont les gens sont à l\'abri de sa langue et de sa main ».',
          ld: 'आपसमा रहम करो, ज़ईफ़ो नी मदद करो अने ज़बान ने महफ़ूज़ राखो, नबी करीम ﷺ फ़रमावे छे: "मुसलमान ते छे जेनी ज़बान अने हाथ थी बीजा महफ़ूज़ रहे."'
        },
        notes: 'Sahih Al-Bukhari & Muslim'
      }
    ]
  },
  {
    id: 'turkish-jumua',
    title: 'Kardeşlik ve Birlik Ahlakı (Brotherhood & Moral Conduct)',
    sourceLang: 'tr',
    speaker: 'İmam Mehmet Özkan',
    mosqueContext: 'Mevlana Mosque - Berlin / Istanbul',
    description: 'A traditional Turkish Friday sermon focused on social compassion, youth guidance, and neighborly ethics.',
    durationSeconds: 85,
    segments: [
      {
        originalText: 'Muhterem Müslümanlar! Bugün hutbemizin konusu, yüce dinimiz İslam\'ın emrettiği samimi kardeşlik ve karşılıklı hürmettir.',
        translations: {
          en: 'Respected Muslims! Today the topic of our Khutbah is sincere brotherhood and mutual reverence enjoined by our sublime religion of Islam.',
          ar: 'أيها المسلمون الكرام! موضوع خطبتنا اليوم هو الأخوة الصادقة والاحترام المتبادل الذي يحثنا عليه ديننا الإسلامي الحنيف.',
          ur: 'محترم مسلمانو! آج ہمارے خطبے کا موضوع وہ مخلصانہ بھائی چارہ اور باہمی احترام ہے جس کا ہمارے عظیم دین اسلام نے حکم دیا ہے۔',
          hi: 'मोहतराम मुसलमानो! आज हमारे ख़ुत्बे का उनवान वह ख़ालिस भाईचारा और बाहमी इज़्ज़त है जिसका हमारे दीन इस्लाम ने हुक्म दिया है।',
          fr: 'Chers fidèles musulmans ! Le sujet de notre prêche d\'aujourd\'hui porte sur la fraternité sincère et le respect mutuel prescrit par notre noble religion.',
          ld: 'मोहतरम मुसलिम भाईओ! आज ना ख़ुत्बा नो मौज़ू मुख़लिस भाईचारो अने बाहमी इज़्ज़त छे जेनो आपणा दीन इस्लाम मा हुक्म आपवामां आयो छे.'
        }
      },
      {
        originalText: 'Peygamberimiz Hz. Muhammed Mustafa (s.a.v.) bir hadis-i şeriflerinde şöyle buyurmaktadır: "Müminler birbirlerini sevmede, birbirlerine merhamet ve şefkat göstermede tek bir vücut gibidir."',
        isAyahOrHadith: true,
        translations: {
          en: 'Our Prophet Muhammad Mustafa (peace be upon him) states in an honorable Hadith: "The believers in their mutual love, mercy, and compassion are like a single living body."',
          ar: 'يقول نبينا المصطفى ﷺ في الحديث الشريف: "مَثَلُ المؤمنين في تَوَادِّهِمْ وتَرَاحُمِهِمْ وتَعَاطُفِهِمْ مَثَلُ الجَسَدِ الواحد."',
          ur: 'ہمارے پیارے نبی حضرت محمد مصطفیٰ ﷺ نے ایک حدیث شریف میں ارشاد فرمایا: "مومن آپسی محبت، ہمدردی اور شفقت میں ایک جسم کی مانند ہیں۔"',
          hi: 'हमारे प्यारे नबी हज़रत मुहम्मद मुस्तफ़ा ﷺ ने हदीस में फ़रमाया: "मोमिन आपस की मोहब्बत, हमदर्दी और रहमदिली में एक ज़िंदा जिस्म की तरह हैं।"',
          fr: 'Notre Prophète bien-aimé ﷺ enseigne dans un noble hadith : « L\'exemple des croyants dans leur affection mutuelle, leur miséricorde et leur compassion est comparable à un seul corps ».',
          ld: 'आपणा नबी करीम ﷺ फ़रमावे छे: "मोमिनीन आपस नी मोहब्बत अने रहमदिली मा एक जिस्म नी मानिंद छे."'
        },
        notes: 'Sahih Muslim 2586'
      },
      {
        originalText: 'Camilerimiz sadece ibadet mekânı değil, aynı zamanda gönüllerimizi birleştiren, dertlerimize ortak olduğumuz sevgi yuvalarıdır.',
        translations: {
          en: 'Our mosques are not merely places of ritual prayer; they are spiritual sanctuaries that unite our hearts where we share one another\'s joys and hardships.',
          ar: 'إن مساجدنا ليست مجرد أماكن للعبادة فحسب، بل هي واحات محبة تجمع قلوبنا ونتقاسم فيها الهموم ونتعاون على البر.',
          ur: 'ہماری مساجد صرف عبادت گاہیں نہیں ہیں، بلکہ یہ وہ محبت کے گہوارے ہیں جو ہمارے دلوں کو جوڑتے ہیں اور جہاں ہم ایک دوسرے کے دکھ درد بانٹتے ہیں۔',
          hi: 'हमारी मस्जिदें सिर्फ़ इबादत की जगह नहीं हैं, बल्कि वे दिलों को जोड़ने वाले मुहब्बत के मरकज़ हैं जहाँ हम एक दूसरे का सुख-दुख बाँटते हैं।',
          fr: 'Nos mosquées ne sont pas seulement des lieux de prière rituelle ; ce sont des havres de fraternité qui unissent nos cœurs et où nous partageons nos joies et nos peines.',
          ld: 'आपणी मस्जिदो फ़क़त नमाज़ नी जगह नथी, बल्कि दिलो ने जोड़वा वाळा मरकज़ छे.'
        }
      }
    ]
  },
  {
    id: 'urdu-jumua',
    title: 'صبر، شکر اور حسنِ اخلاق (Patience & Sincerity in Times of Trial)',
    sourceLang: 'ur',
    speaker: 'Maulana Salman Farooqi',
    mosqueContext: 'Jamia Masjid - Lahore / London',
    description: 'An evocative Urdu Friday sermon on spiritual steadfastness, sincerity (Ikhlas), and character excellence.',
    durationSeconds: 95,
    segments: [
      {
        originalText: 'میرے محترم اور معزز بھائیو اور بزرگو! زندگی امتحانات اور آزمائشوں کا نام ہے، اور ایک مومن کا سب سے بڑا ہتھیار صبر اور دعا ہے۔',
        translations: {
          en: 'My respected and honorable brothers and elders! Life is fundamentally an arena of tests, and a believer\'s greatest fortress is patience and earnest prayer.',
          ar: 'إخواني الكرام وأفاضلنا! إن الحياة دار ابتلاء واختبار، وإن أعظم سلاح للمؤمن هو الصبر والدعاء والتضرع إلى الله.',
          tr: 'Değerli ve muhterem kardeşlerim! Hayat bir imtihan meydanıdır; bir müminin en büyük kalkanı ise sabır ve samimi duadır.',
          hi: 'मेरे मोहतरम और मुअज़्ज़ज़ भाइयो और बुज़ुर्गो! ज़िन्दगी इम्तिहान और आज़माइश का नाम है, और एक मोमिन का सबसे बड़ा हथियार सब्र और दुआ है।',
          fr: 'Mes respectés frères et aînés ! Cette vie d\'ici-bas est faite d\'épreuves, et la plus grande forteresse du croyant réside dans la patience et la supplication sincère.',
          ld: 'मारा मोहतरम बिरादरान अने बुज़ुर्गो! ज़िन्दगी इम्तेहान नी जगह छे, अने मोमिन नो सबसे मोटो हथियार सब्र अने दुआ छे.'
        }
      },
      {
        originalText: 'قرآن پاک میں اللہ رب العزت نے ارشاد فرمایا: "إِنَّ اللَّهَ مَعَ الصَّابِرِينَ"۔ جب بندہ صبر کا دامن تھامتا ہے تو نصرتِ خداوندی اس کے ساتھ ہو جاتی ہے۔',
        isAyahOrHadith: true,
        translations: {
          en: 'In the Holy Quran, Allah the Lord of Honor proclaims: "Indeed, Allah is with those who are patient." [Al-Baqarah: 153]. When a servant holds fast to patience, divine aid accompanies them.',
          ar: 'يقول الله تعالى في محكم كتابه: «إِنَّ اللَّهَ مَعَ الصَّابِرِينَ» [البقرة: ١٥٣]. فحين يعتصم العبد بالصبر، تكون معية الله وعونه حليفه.',
          tr: 'Yüce Rabbimiz Kur\'an-ı Kerim\'de şöyle buyurmuştur: "Şüphesiz Allah sabredenlerle beraberdir." [Bakara: 153]. Kul sabra sarıldığında, ilahi yardım onunla olur.',
          hi: 'क़ुरआन मजीद में अल्लाह रब्बुल इज़्ज़त ने फ़रमाया: "बेशक अल्लाह सब्र करने वालों के साथ है।" जब बंदा सब्र करता है तो अल्लाह की मदद उसके साथ होती है।',
          fr: 'Dans le Noble Coran, Allah le Tout-Puissant affirme : « Certes, Allah est avec les endurants » [Sourate Al-Baqarah : 153]. Quand le serviteur s\'arme de patience, le soutien divin l\'accompagne.',
          ld: 'क़ुरआन पाक मा ख़ुदा फ़रमावे छे: "बेशक अल्लाह सब्र करवा वाळाओ साथे छे." ज्यारे बंदो सब्र करे छे तो ख़ुदा नी मदद सामे आवे छे.'
        },
        notes: 'Surah Al-Baqarah 2:153'
      },
      {
        originalText: 'اپنے گھروں میں نرمی پیدا کرو، والدین کی خدمت کو اپنی نجات کا ذریعہ سمجھو، اور دنیا کی وقتی چمک دمک میں آخرت کو فراموش نہ کرو۔',
        translations: {
          en: 'Cultivate gentleness inside your households, regard the devoted service of parents as the vehicle for your eternal salvation, and never let transient worldly glamor eclipse the Hereafter.',
          ar: 'انشروا الرفق والرحمة في بيوتكم، واجعلوا بر الوالدين طريقكم للفوز بالجنة، ولا تشغلنكم بهارج الدنيا الفانية عن دار الخلود.',
          tr: 'Evlerinizde nezaketi ve şefkati hâkim kılın, ana-babaya hizmeti ebedi kurtuluş vesilesi bilin ve geçici dünya meşgalesiyle ahireti unutmayın.',
          hi: 'अपने घरों में नरमी पैदा करो, वालदैन की ख़िदमत को अपनी नजात का ज़रिया समझो और दुनिया की चकाचौंध में आख़िरत को मत भूलो।',
          fr: 'Faites régner la douceur au sein de vos foyers, considérez le dévouement envers vos parents comme la clé de votre salut éternel, et ne laissez pas les vanités éphémères de ce monde vous faire oublier l\'au-delà.',
          ld: 'पोताना घर मा नरमी राखो, वालदैन नी ख़िदमत करो अने आख़िरत ने याद राखो.'
        }
      }
    ]
  },
  {
    id: 'bohra-lisan-dawat',
    title: 'لسان الدعوة: مجلس موعظة (Lisan al-Dawat Bohra Discourse)',
    sourceLang: 'ld',
    speaker: 'Janab Amil Saheb',
    mosqueContext: 'Dawoodi Bohra Masjid / Markaz - Friday Majlis',
    description: 'An authentic Dawoodi Bohra Waaz delivering moral guidance in Lisan al-Dawat (Gujarati syntax infused with Arabic, Persian, and Urdu theological vocabulary).',
    durationSeconds: 100,
    segments: [
      {
        originalText: 'الحمد لله الذي هدانا لهذا وما كنا لنهتدي لولا أن هدانا الله. صلوات الله وسلامه على رسوله المصطفى محمد وعترته الطاهرة الأطهار.',
        isAyahOrHadith: true,
        translations: {
          en: 'All praise is for Allah who has guided us to this, and we would never have been guided had Allah not guided us. Blessings and peace upon His chosen Messenger Muhammad and his pure, purified lineage.',
          ar: 'الْحَمْدُ لِلَّهِ الَّذِي هَدَانَا لِهَٰذَا وَمَا كُنَّا لِنَهْتَدِيَ لَوْلَا أَنْ هَدَانَا اللَّهُ. صلوات الله وسلامه على رسوله المصطفى وعترته الأطهار.',
          tr: 'Bizi buna hidayet eden Allah\'a hamdolsun; Allah bizi doğru yola iletmeseydi biz kendiliğimizden erişemezdik. Salat ve selam Seçilmiş Elçi Hz. Muhammed ve onun tertemiz Ehl-i Beyti üzerine olsun.',
          ur: 'تمام تعریف اللہ کے لیے ہے جس نے ہمیں اس راستے کی ہدایت بخشی، اور ہم ہرگز ہدایت نہ پا سکتے اگر اللہ ہماری رہنمائی نہ فرماتا۔ درود و سلام ہو رسولِ مصطفیٰ ﷺ اور ان کی پاکیزہ آل پر۔',
          hi: 'सब हम्द अल्लाह के लिए है जिसने हमें यह हिदायत बख़्शी। दुरूद ओ सलाम हो रसूल-ए-मुस्तफ़ा ﷺ और उनकी पाकीज़ा औलाद पर।',
          fr: 'Louange à Allah qui nous a guidés vers ceci ; nous n\'aurions pas trouvé la voie si Allah ne nous avait pas guidés. Que la paix et la bénédiction soient sur Son Messager élu Muhammad et sa sainte famille.',
          ld: 'الحمد لله जेणे हम्ने आ रस्तो बताव्यो. सलावात अने सलाम थाय रसूलुल्लाह ﷺ अने आपना पाक अहले बैत पर.'
        },
        notes: 'Opening Hamd & Salawat in Lisan al-Dawat'
      },
      {
        originalText: 'ऐ मोमिनीन अने मोमिनात! मौला नी रज़ा अने ख़ुशी हासिल करवुं ए आपणी ज़िन्दगी नो असल मक़सद छे. हलाल रोज़ी कमावो अने हक़ नी राह पर क़ायम रहो.',
        translations: {
          en: 'O Mumineen and Muminat (believing brothers and sisters)! Attaining divine contentment and spiritual grace is the true purpose of our existence. Earn lawful, pure sustenance (Halal Rozi) and remain steadfast on the path of truth.',
          ar: 'أيها المؤمنون والمؤمنات! إن نيل رضا الله تعالى وقبوله هو الغاية العظمى لحياتنا. اسعوا في الرزق الحلال الطيب، واثبتوا على صراط الحق.',
          tr: 'Ey inanan müminler ve mümine hanımlar! Yüce Yaradan\'ın rızasına ve lütfuna erişmek hayatımızın asıl gayesidir. Helal kazanç peşinde koşun ve hakikat yolunda sebat gösterin.',
          ur: 'اے مومنین اور مومنات! مولائے کریم کی رضا اور خوشنودی حاصل کرنا ہماری زندگی کا اصل مقصد ہے۔ رزقِ حلال کماؤ اور حق کی راہ پر ثابت قدم رہو۔',
          hi: 'ऐ मोमिनीन और मोमिनात! मौला की रज़ा और ख़ुशनूदी हासिल करना हमारी ज़िन्दगी का असल मक़सद है। हलाल रोज़ी कमाओ और हक़ की राह पर क़ायम रहो।',
          fr: 'Ô croyants et croyantes ! Rechercher l\'agrément divin et la grâce spirituelle est le but suprême de notre vie. Gagnez une subsistance pure et licite (Halal) et demeurez inébranlables sur le chemin de la vérité.',
          ld: 'ऐ मोमिनीन अने मोमिनात! मौला नी रज़ा हासिल करवुं आपणी ज़िन्दगी नो मक़सद छे. हलाल रोज़ी कमावो अने हक़ पर रहो.'
        },
        notes: 'Lisan al-Dawat core guidance'
      },
      {
        originalText: 'आपस मा उल्फ़त राखो, हर एक साथे भलाई करो, अने मस्जिद ना माहौल नी पाकीज़गी अने हुर्मत ने हमेशा महफ़ूज़ राखो.',
        translations: {
          en: 'Maintain genuine affection and cordiality among one another, do good to all people, and always preserve the sanctity, cleanliness, and honor of the Masjid atmosphere.',
          ar: 'حافظوا على الألفة والمودة فيما بينكم، وأحسنوا إلى الناس كافة، وصونوا طهارة بيوت الله وقدسيتها ووقارها دائماً.',
          tr: 'Aranızdaki samimi sevgiyi ve muhabbeti koruyun, herkese iyilikle muamele edin ve mescidimizin manevi vakar ve hürmetini daima muhafaza edin.',
          ur: 'آپس میں الفت اور محبت رکھو، ہر ایک کے ساتھ حسنِ سلوک کرو، اور مسجد کے ماحول کی پاکیزگی اور تقدس کو ہمیشہ برقرار رکھو۔',
          hi: 'आपस में उल्फ़त और मुहब्बत रखो, हर एक के साथ भलाई करो, और मस्जिद के माहौल की पाकीज़गी और इज़्ज़त को हमेशा महफ़ूज़ रखो।',
          fr: 'Entretenez une affection fraternelle sincère, agissez avec bonté envers tous, et préservez en tout temps la sainteté, la pureté et la dignité de la mosquée.',
          ld: 'आपसमा उल्फ़त राखो, बधा साथे भलाई करो अने मस्जिद नी हुर्मत ने महफ़ूज़ राखो.'
        }
      }
    ]
  },
  {
    id: 'hindi-speech',
    title: 'इंसानियत और खिदमत-ए-खल्क (Service to Humanity & Goodwill)',
    sourceLang: 'hi',
    speaker: 'Mufti Mohammad Imran',
    mosqueContext: 'Delhi Markazi Masjid - Pre-Khutbah Bayan',
    description: 'A clear, universal sermon delivered in Hindustani emphasizing public service, compassion for neighbors, and honesty.',
    durationSeconds: 80,
    segments: [
      {
        originalText: 'अज़ीज़ भाइयो और दोस्तो! इस्लाम सिर्फ़ इबादतगाह तक महदूद नहीं है, बल्कि यह हर इंसान के दुख-दर्द में शरीक होने का पैग़ाम देता है।',
        translations: {
          en: 'Dear brothers and friends! Islam is not confined within the walls of places of worship; rather, it is a universal calling to stand shoulder-to-shoulder with every human being in their hardships.',
          ar: 'أيها الإخوة الأعزاء! إن دين الإسلام ليس منحصراً في جدران المساجد ودور العبادة، بل هو رسالة رحمة تدعونا لمشاطرة كل إنسان آلامه وهمومه.',
          tr: 'Değerli kardeşlerim ve dostlar! İslam sadece ibadethanenin duvarları arasına sıkışmış bir din değildir; her insanın derdiyle dertlenmeyi öğütleyen evrensel bir merhamet çağrısıdır.',
          ur: 'عزیز بھائیو اور دوستو! اسلام صرف عبادت گاہ تک محدود نہیں ہے، بلکہ یہ ہر انسان کے دکھ درد میں شریک ہونے کا پیغام دیتا ہے۔',
          hi: 'अज़ीज़ भाइयो और दोस्तो! इस्लाम सिर्फ़ इबादतगाह तक महदूद नहीं है, बल्कि यह हर इंसान के दुख-दर्द में शरीक होने का पैग़ाम देता है।',
          fr: 'Chers frères et amis ! L\'islam ne se limite pas aux murs des lieux de culte ; c\'est un message universel qui nous appelle à partager les peines et les épreuves de chaque être humain.',
          ld: 'अज़ीज़ बिरादरान! इस्लाम फ़क़त इबादतगाह सुधी महदूद नथी, बल्कि हर इन्सान ना दुख-दर्द मा शरीक थवानो पैग़ाम आपे छे.'
        }
      },
      {
        originalText: 'रसूलुल्लाह ﷺ ने फ़रमाया: "ख़ैरुन-नास मन यन्फ़उ-न्नास" यानी लोगों में सबसे बेहतरीन इंसान वह है जो दूसरों को सबसे ज़्यादा फ़ायदा पहुँचाए।',
        isAyahOrHadith: true,
        translations: {
          en: 'The Messenger of Allah ﷺ said: "The best among people is the one who brings the greatest benefit to mankind." [Al-Mu\'jam Al-Awsat]',
          ar: 'قال رسول الله ﷺ: «خَيْرُ النَّاسِ أَنْفَعُهُمْ لِلنَّاسِ».',
          tr: 'Resulullah ﷺ şöyle buyurdu: "İnsanların en hayırlısı, insanlara en çok faydası dokunandır."',
          ur: 'رسول اللہ ﷺ نے فرمایا: "خیر الناس من ینفع الناس" یعنی لوگوں میں سب سے بہتر انسان وہ ہے جو دوسروں کو سب سے زیادہ فائدہ پہنچائے۔',
          hi: 'रसूलुल्लाह ﷺ ने फ़रमाया: "ख़ैरुन-नास मन यन्फ़उ-न्नास" यानी लोगों में सबसे बेहतरीन इंसान वह है जो दूसरों को सबसे ज़्यादा फ़ायदा पहुँचाए।',
          fr: 'Le Messager d\'Allah ﷺ a dit : « Le meilleur des hommes est celui qui est le plus utile aux autres ».',
          ld: 'रसूलुल्लाह ﷺ फ़रमावे छे: "लोको मा सबसे सारो इन्सान ते छे जे बीजा ने फायदो पहुँचावे."'
        },
        notes: 'Hadith: Al-Tabarani'
      }
    ]
  }
];
