// KalaSetu AI – AI ArtStory Data Model & Demo Engine

export const storyStyles = [
  {
    id: 'traditional',
    title: 'Traditional & Cultural',
    description: 'Focus on heritage, traditions, sacred folklore, and cultural significance.',
    icon: 'Landmark',
    tag: 'Cultural Heritage',
    accentColor: '#354B3D',
    bgColor: 'bg-forest/10',
    textColor: 'text-forest',
    borderColor: 'border-forest/30',
  },
  {
    id: 'personal',
    title: 'Personal & Emotional',
    description: "Focus on your personal inspiration, heartfelt memories, and inner emotions.",
    icon: 'Heart',
    tag: "Artist's Journey",
    accentColor: '#9D4935',
    bgColor: 'bg-terracotta/10',
    textColor: 'text-terracotta',
    borderColor: 'border-terracotta/30',
  },
  {
    id: 'poetic',
    title: 'Poetic & Expressive',
    description: 'A lyrical, metaphorical, and evocative artistic narrative.',
    icon: 'Sparkles',
    tag: 'Poetic Voice',
    accentColor: '#D5B77A',
    bgColor: 'bg-ochre/15',
    textColor: 'text-ochre-dark',
    borderColor: 'border-ochre/40',
  },
  {
    id: 'informative',
    title: 'Informative & Educational',
    description: 'Explain the artwork, its art form origins, symbolic iconography, and techniques.',
    icon: 'BookOpen',
    tag: 'Artisan Study',
    accentColor: '#49372B',
    bgColor: 'bg-brown/10',
    textColor: 'text-brown',
    borderColor: 'border-beige-dark',
  },
];

// Supported MVP languages for KalaSetu AI
export const languages = [
  { id: 'en', name: 'English', native: 'English', script: 'Latin' },
  { id: 'hi', name: 'Hindi', native: 'हिन्दी', script: 'Devanagari' },
];

export const storyLengths = [
  {
    id: 'short',
    label: 'Short',
    subtitle: '~100 words',
    description: '1 concise paragraph. Ideal for quick gallery tags, social sharing, and QR exhibition cards.',
  },
  {
    id: 'medium',
    label: 'Medium',
    subtitle: '~250 words',
    description: '2-3 balanced paragraphs. Perfect for exhibition catalogues, buyer prints, and online portfolios.',
  },
  {
    id: 'detailed',
    label: 'Detailed',
    subtitle: '~400 words',
    description: '3-4 comprehensive paragraphs. Complete cultural documentation, monographs, and archive preservation.',
  },
];

// Initial pre-saved demo stories for artist Ivy Maiti
export const initialSavedStories = [
  {
    id: 'story-1',
    artworkId: 1,
    artworkTitle: "Nature's Harmony",
    artworkImage: "/artworks/madhubani_harmony.jpg",
    artForm: "Madhubani",
    title: "Twin Souls in the Sacred Waters of Mithila",
    style: "traditional",
    styleName: "Traditional & Cultural",
    language: "en",
    languageName: "English",
    length: "medium",
    date: "Nov 02, 2026",
    rawDate: "2026-11-02",
    artistNotes: "Inspired by the pond behind my maternal grandmother's courtyard in Mithila during the Chhath festival.",
    paragraphs: [
      "In the tranquil villages of Mithila, every stroke upon handmade paper carries the breath of ritual memory. 'Nature's Harmony' is rooted in an age-old tradition where twin sacred fish mirror one another in cosmic dialogue. In Mithila folklore, fish represent fertility, abundance, and the ever-flowing stream of universal life, while the blossoming lotus cradles them in untouched sacred waters.",
      "Created with delicate bamboo twigs and natural mineral dyes extracted from parijat blossoms and crushed indigo, this piece follows the revered kachni hatching technique. The parallel lines are not merely decorative; they form a protective geometric rhythm handed down across three generations of women artists in my family.",
      "When we paint the fish and the lotus, we do not paint nature as an outside observer. We celebrate ourselves as an indivisible part of the living cosmos, honoring the silent blessings of our ancestors and the sacred earth."
    ],
  },
  {
    id: 'story-2',
    artworkId: 2,
    artworkTitle: "Village Celebrations",
    artworkImage: "/artworks/warli_celebrations.jpg",
    artForm: "Warli",
    title: "अटूट घेरा: दहाणू की फसल कटाई की पावन स्मृतियाँ",
    style: "personal",
    styleName: "Personal & Emotional",
    language: "hi",
    languageName: "Hindi",
    length: "medium",
    date: "Oct 29, 2026",
    rawDate: "2026-10-29",
    artistNotes: "दहाणू की फसल कटाई के उत्सव के दौरान। वारली चिंतन में कला केवल सजावट नहीं, बल्कि प्रार्थना और सामूहिक स्मृति है।",
    paragraphs: [
      "दहाणू की शाम में जब तारपा वाद्य की सम्मोहक ध्वनि गूँजती है, तो मन बरबस उस लोक-परंपरा में खो जाता है। 'विलेज सेलीब्रेशन्स' मेरे जीवन के उस पावन क्षण की अभिव्यक्ति है जब हम सबने एक-दूसरे का हाथ थामकर फसल कटाई के उत्सव का आरंभ किया था।",
      "वारली परंपरा में केवल दो त्रिकोणों के मिलन से मानव आत्मा का रूप गढ़ा जाता है। जब नर्तक हाथ पकड़कर गोल घेरा बनाते हैं, तो वह घेरा समय के आदि-सर्प का रूप ले लेता है। यह घेरा कभी बंद नहीं होता; यह हर उस व्यक्ति का स्वागत करता है जो सच्चे मन से इसमें शामिल होना चाहता है।",
      "गेरू की पृष्ठभूमि पर चावल के लेप से उकेरी गई यह रचना प्रकृति और धरती माँ के प्रति मेरी कृतज्ञता की प्रार्थना है। यह हमें याद दिलाती है कि हमारी वास्तविक शक्ति मिल-जुलकर कदम मिलाने में है।"
    ],
  },
  {
    id: 'story-3',
    artworkId: 3,
    artworkTitle: "Forest Companions",
    artworkImage: "/artworks/gond_companions.jpg",
    artForm: "Gond",
    title: "Vibrations of the Sacred Forest: Whispers of the Mahua Tree",
    style: "poetic",
    styleName: "Poetic & Expressive",
    language: "en",
    languageName: "English",
    length: "short",
    date: "Oct 24, 2026",
    rawDate: "2026-10-24",
    artistNotes: "In Gondi belief, when you view a good image, auspicious fortune visits your home.",
    paragraphs: [
      "Beneath the emerald canopy of the ancient Mahua tree, silence is not emptiness—it is the gathering breath of spirits. The spotted deer stands listening to the slow heartbeat of the roots, its coat illuminated by thousands of sacred bindu dots. In Gond belief, every living creature vibrates with the memory of the rain that birthed the earth. To gaze upon this companion is to welcome peace into the sanctuary of the home."
    ],
  },
];

// Multilingual Demo Content Synthesizer (English & Hindi)
export function generateDemoStoryContent({
  artwork,
  artistStory = '',
  inspiration = '',
  culturalSignificance = '',
  materials = '',
  personalMemory = '',
  style = 'traditional',
  language = 'en',
  length = 'medium',
}) {
  const artTitle = artwork?.title || "Sacred Creation";
  const artForm = artwork?.artForm || "Traditional Art";
  const artistName = "Ivy Maiti";

  // Combine artist inputs if provided
  const userNotes = [artistStory, inspiration, personalMemory].filter(Boolean).join(" ");
  const materialsUsed = materials || artwork?.materials || "Natural pigments on handcrafted surface";
  const culturalContext = culturalSignificance || artwork?.description || "An indigenous creation celebrating spiritual harmony";

  // Titles per style & language
  const titles = {
    en: {
      traditional: `The Living Spirit of ${artTitle}: Ancestral Lore & Symbolism`,
      personal: `Memories in Ochre: The Personal Journey of ${artTitle}`,
      poetic: `Whispers of the Sacred Brush: A Poem of ${artTitle}`,
      informative: `Understanding ${artTitle}: Iconography & Heritage of ${artForm} Art`,
    },
    hi: {
      traditional: `${artTitle} की जीवंत आत्मा: ${artForm} की पावन परम्परा`,
      personal: `स्मृतियों के रंग: ${artTitle} के पीछे मेरी आत्मीय यात्रा`,
      poetic: `तुलिका की मौन गूँज: ${artTitle} की एक काव्य गाथा`,
      informative: `${artTitle} का रहस्य: ${artForm} कला और सांस्कृतिक प्रतीक`,
    },
  };

  const selectedTitle =
    titles[language]?.[style] ||
    titles.en[style] ||
    `${artTitle}: A Story of ${artForm} Art`;

  // Paragraph Generator based on Language and Length
  let paragraphs = [];

  if (language === 'hi') {
    // Hindi Narratives
    if (style === 'traditional') {
      paragraphs.push(
        `'${artTitle}' केवल एक चित्र नहीं, बल्कि ${artForm} की उस पवित्र धरोहर का सजीव रूप है जो पीढ़ियों से लोक-जीवन को ऊर्जा देती आई है। इस कलाकृति में उकेरे गए प्रतीक प्रकृति, दिव्यता और जीवन के शाश्वत संतुलन की कथा कहते हैं।`
      );
      if (length === 'medium' || length === 'detailed') {
        paragraphs.push(
          userNotes
            ? `कलाकार आईवी माइती के शब्दों में: "${userNotes}"। इस रचना में प्रयुक्त तकनीकें और प्राकृतिक रंग हमारी मिट्टी और सांस्कृतिक जड़ों के प्रति कृतज्ञता प्रकट करते हैं।`
            : `इस रचना में प्रयुक्त रंग और पारंपरिक रेखाएं हमारे पुरखों की साधना का परिणाम हैं। हर सूक्ष्म विवरण और रेखांकन भारतीय लोक-कला के दार्शनिक चिंतन को उजागर करता है।`
        );
      }
      if (length === 'detailed') {
        paragraphs.push(
          `सामग्रियों में ${materialsUsed} का सुंदर सम्मिश्रण है। यह कलाकृति देखने वाले को केवल दृश्यात्मक आनंद ही नहीं देती, बल्कि उसे अपनी मिट्टी, लोक-परंपरा और चेतना से भी जोड़ती है।`
        );
      }
    } else if (style === 'personal') {
      paragraphs.push(
        `जब मैंने '${artTitle}' की पहली रेखा खींची थी, तब मन में एक गहरी अनुभूति थी। यह कलाकृति मेरे जीवन के उन क्षणों, आत्मीय अनुभवों और संस्कारों से जन्मी है जो मुझे मेरी कला-यात्रा में निरंतर प्रेरित करते रहे हैं।`
      );
      if (length === 'medium' || length === 'detailed') {
        paragraphs.push(
          userNotes
            ? `मेरे अपने अनुभव का यह अंश इस कृति की आत्मा है: "${userNotes}"। कैनवास पर उतरने वाला हर रंग मेरी भावनाओं का ही एक रूप है।`
            : `पारंपरिक कला मेरे लिए केवल शिल्प नहीं, बल्कि अपनी आत्मा से संवाद करने का माध्यम है। यह रचना मेरे अंतर्मन की अभिव्यक्ति है।`
        );
      }
      if (length === 'detailed') {
        paragraphs.push(
          `इस कलाकृति के माध्यम से मैं दर्शकों को अपनी उस दुनिया में आमंत्रित करती हूँ जहाँ हर रंग एक कहानी कहता है और हर रूप एक आत्मीय स्पर्श बन जाता है।`
        );
      }
    } else if (style === 'poetic') {
      paragraphs.push(
        `मौन कैनवास पर जब तुलिका थिरकती है, तब '${artTitle}' एक मधुर राग बनकर प्रस्फुटित होता है। ${artForm} की कोमल रेखाओं में प्रकृति की साँसें और धरती की धड़कनें एकाकार हो उठी हैं।`
      );
      if (length === 'medium' || length === 'detailed') {
        paragraphs.push(
          `यहाँ रंग बोलते हैं, और आकृतियाँ मौन में प्रार्थना करती हैं। यह रचना समय की सीमाओं को पार कर हमें उस लोक-स्मृति की ओर ले जाती है जहाँ जीवन स्वयं एक उत्सव है।`
        );
      }
      if (length === 'detailed') {
        paragraphs.push(
          `दीपशिखा की भाँति चमकते ये रंग दर्शक के हृदय में एक शांत, पावन विस्मय जगाते हैं। यही भारतीय कला का असली सौंदर्य है।`
        );
      }
    } else {
      // informative
      paragraphs.push(
        `'${artTitle}' ${artForm} कला शैली की प्रामाणिक परंपरा का प्रतिनिधित्व करती है। इस शैली की ऐतिहासिक जड़ें भारत की समृद्ध लोक-संस्कृति से जुड़ी हैं, जहाँ प्रत्येक आकृति का अपना विशिष्ट प्रतीकात्मक अर्थ होता है।`
      );
      if (length === 'medium' || length === 'detailed') {
        paragraphs.push(
          `इस कृति में प्रयुक्त तकनीकें (${materialsUsed}) पारंपरिक ज्ञान और धैर्यपूर्ण श्रम का साक्ष्य हैं। ज्यामितीय और जैविक रूपों का संतुलन दर्शक को लोक-शिल्प की बारीकियों से परिचित कराता है।`
        );
      }
      if (length === 'detailed') {
        paragraphs.push(
          `सांस्कृतिक दृष्टि से, यह कलाकृति समकालीन कला प्रेमियों और शोधकर्ताओं के लिए पारंपरिक भारतीय कला-विधाओं के संरक्षण और अध्ययन का एक उत्कृष्ट उदाहरण प्रस्तुत करती है।`
        );
      }
    }
  } else {
    // English Narratives (Default)
    if (style === 'traditional') {
      paragraphs.push(
        `In the timeless vernacular of traditional Indian art, every line is a prayer and every motif carries the heartbeat of the cosmos. '${artTitle}' stands as a profound testament to the ancient ${artForm} lineage, where folklore, sacred geometry, and devotion converge.`
      );
      if (length === 'medium' || length === 'detailed') {
        paragraphs.push(
          userNotes
            ? `Rooted in the artist's own memories: "${userNotes}". In Mithila and regional lore, every element bears symbolic resonance—celebrating the eternal dance between humanity, living creatures, and the divine.`
            : `The composition breathes with authentic indigenous iconography. As preserved in the Chitrakar and tribal guilds, art is not created as passive decoration, but as a living sanctuary of cultural memory and community gratitude.`
        );
      }
      if (length === 'detailed') {
        paragraphs.push(
          `Rendered with ${materialsUsed}, this masterwork honors the tactile wisdom of our ancestors. KalaSetu AI helps ensure that the profound philosophy behind ${artistName}'s brushwork travels across generations and borders without losing its sacred soul.`
        );
      }
    } else if (style === 'personal') {
      paragraphs.push(
        `Every brushstroke in '${artTitle}' was born from an intimate memory—a quiet moment of observation where heritage met the artist's personal heart. For Ivy Maiti, this creation is not merely an artistic exercise, but an emotional sanctuary.`
      );
      if (length === 'medium' || length === 'detailed') {
        paragraphs.push(
          userNotes
            ? `In Ivy's own words: "${userNotes}". It is these fragile, heartfelt recollections that transform simple pigments into a story that lingers long after the viewer steps away.`
            : `Behind the traditional motifs lies a journey of quiet perseverance. To practice ${artForm} art today is to carry the warmth of ancestral courtyards into modern spaces, finding stillness amidst the world's rush.`
        );
      }
      if (length === 'detailed') {
        paragraphs.push(
          `When you look into this painting, you are not merely seeing an artwork—you are listening to a personal whisper from the artist's soul, sharing gratitude for family, nature, and the timeless gift of creativity.`
        );
      }
    } else if (style === 'poetic') {
      paragraphs.push(
        `Where the brush touches the handmade page, stillness blossoms into music. '${artTitle}' is an evocative poem inscribed in earth tones and natural dyes, capturing the breath of morning mist across sacred waters.`
      );
      if (length === 'medium' || length === 'detailed') {
        paragraphs.push(
          `The rhythms of ${artForm} flow like an ancient river through this canvas. Here, forms do not compete for attention; they converse in whispers of ochre and terracotta, mirroring the eternal dialogue between root and flower, earth and sky.`
        );
      }
      if (length === 'detailed') {
        paragraphs.push(
          `To experience this piece is to pause in the courtyard of timeless wonder—where each line is a gentle reminder that beauty is not manufactured, but remembered.`
        );
      }
    } else {
      // informative
      paragraphs.push(
        `'${artTitle}' is a distinguished example of the ${artForm} art tradition, an indigenous visual practice with centuries of cultural and regional significance in India.`
      );
      if (length === 'medium' || length === 'detailed') {
        paragraphs.push(
          `Technically, the piece demonstrates mastery over traditional methods: ${materialsUsed}. The deliberate arrangement of geometric contours, rhythmic hatching, and emblematic motifs reflects the strict iconographic codes handed down through regional artisan guilds.`
        );
      }
      if (length === 'detailed') {
        paragraphs.push(
          `For curators, collectors, and scholars, this work provides valuable documentation of how traditional Indian folk art continues to thrive in contemporary hands, combining authentic materials with personal artistic authorship.`
        );
      }
    }
  }

  return {
    title: selectedTitle,
    paragraphs,
  };
}
