// KalaSetu AI – Heritage Archive Cultural Data Model
// Curated demonstration entries for traditional Indian crafts, folk art, and community knowledge preservation.
// Note: These entries serve as frontend demonstration data ready for verified RAG & Supabase integration.

export const heritageCategories = [
  'All',
  'Painting',
  'Textile & Weaving',
  'Pottery & Terracotta',
  'Wood & Bamboo Craft',
  'Folk & Tribal Art',
];

export const heritageArtForms = [
  {
    id: 'madhubani',
    name: 'Madhubani (Mithila Painting)',
    category: 'Painting',
    subCategories: ['Painting', 'Folk & Tribal Art'],
    region: 'Mithila Region, Northern Bihar & Southern Nepal border',
    imageUrl: '/artworks/madhubani_harmony.jpg',
    shortIntro:
      'Ancient folk painting tradition characterized by vibrant natural dyes, double contours, fine kachni parallel hatching, and ritual kohbar iconography.',
    originStory:
      'Originated in the ancient kingdom of Mithila. According to folklore, King Janaka first commissioned local artists to paint palace courtyards for the marriage of his daughter Sita to Lord Rama. Passed down through maternal lineages from mothers to daughters across generations.',
    culturalSignificance:
      'In Mithila folklore, every motif carries a sacred blessing. Twin fish represent cosmic fertility and the unbroken stream of life; the lotus symbolizes divine purity rooted in earthly waters; peacocks embody love and beauty, while the sun and moon stand as eternal witnesses to truth.',
    materialsAndTechniques: {
      surfaces: 'Handmade unbleached paper, cow dung-washed cloth, mud-plastered walls',
      colors: 'Parijat flowers (yellow), madder root (red), indigo leaf (blue), lampblack soot (black)',
      tools: 'Hand-whittled bamboo twig pens (kalam), raw cotton dipped on needle points',
      methods: 'Kachni (delicate parallel linework), Bharni (solid color filling), Tantrik (ritual cosmic geometry)',
    },
    galleryPlates: [
      {
        title: "Nature's Harmony (Twin Sacred Fish)",
        imageUrl: '/artworks/madhubani_harmony.jpg',
        caption: 'Sacred fish amidst lotus vines in double-contour kachni hatching.',
      },
      {
        title: 'Lotus of Mithila (Sahasradala Padma)',
        imageUrl: '/artworks/madhubani_harmony.jpg',
        caption: 'Concentric petal rings drawn with uninterrupted bamboo pen strokes.',
      },
    ],
    relatedCraftIds: ['pattachitra', 'warli', 'kalamkari'],
  },
  {
    id: 'warli',
    name: 'Warli Tribal Wall Art',
    category: 'Folk & Tribal Art',
    subCategories: ['Folk & Tribal Art', 'Painting'],
    region: 'Sahyadri Foothills, Northern Maharashtra',
    imageUrl: '/artworks/warli_celebrations.jpg',
    shortIntro:
      'Monochromatic tribal art created with white rice paste on earthy terracotta backgrounds, capturing human rhythm, harvest dances, and reverence for nature.',
    originStory:
      'Practiced by the indigenous Warli tribe inhabiting the northern Sahyadri mountain ranges since the 10th century CE. Traditionally painted on the inner mud walls of homes during wedding ceremonies and harvest celebrations.',
    culturalSignificance:
      'Warli art does not portray mythological deities; instead, it honors mother nature and community cooperation. The human figure is formed by two inverted triangles touching at the apex, representing the sacred balance of masculine and feminine energies. The Tarpa spiral dance never closes, welcoming everyone who arrives in peace.',
    materialsAndTechniques: {
      surfaces: 'Mud and cow-dung wash on canvas boards or village home walls',
      colors: 'Ground white rice paste mixed with water and natural gum binder',
      tools: 'Chewed bamboo twigs used as delicate fibrous brushes',
      methods: 'Basic sacred geometric vocabulary: circles (sun/moon), triangles (trees/mountains), and squares (sacred mother goddess Palghat sanctuary)',
    },
    galleryPlates: [
      {
        title: 'Village Celebrations (Tarpa Dance)',
        imageUrl: '/artworks/warli_celebrations.jpg',
        caption: 'Spiral dance imitating the sacred cosmic serpent and the wheel of life.',
      },
      {
        title: 'Harvest Rituals of the Sahyadri',
        imageUrl: '/artworks/warli_celebrations.jpg',
        caption: 'Agrarian cooperation depicting bullock ploughing and winnowing paddy.',
      },
    ],
    relatedCraftIds: ['gond', 'dhokra', 'madhubani'],
  },
  {
    id: 'gond',
    name: 'Gond Folk Art',
    category: 'Folk & Tribal Art',
    subCategories: ['Folk & Tribal Art', 'Painting'],
    region: 'Vindhya & Satpura Ranges, Madhya Pradesh',
    imageUrl: '/artworks/gond_companions.jpg',
    shortIntro:
      'Vibrant tribal art created with signature micro-textures—thousands of bindu dots and rhythmic dashes filling animals, birds, and sacred trees with vital life energy.',
    originStory:
      'Born from the Gond Pradhan community of central India, known for their oral storytellers (bards) who sang legends of the sacred forest. In the 20th century, master Jangarh Singh Shyam translated these wall prayers to paper and canvas, sparking a global appreciation.',
    culturalSignificance:
      'In Gond animist belief, viewing an auspicious image invites good fortune (Bhari) into the household. Trees and creatures breathe with ancestral spirit. The micro-dots that fill each animal’s body represent raindrops that fell from the sky to nourish the forest floor.',
    materialsAndTechniques: {
      surfaces: 'Treated canvas, handmade paper, seasoned wooden boards',
      colors: 'Colored clays (chuna, geru, peeli mitti), river silt, crushed charcoal, leaf sap',
      tools: 'Fine sable pens, hand-carved wooden styluses, reed pens',
      methods: 'Distinctive family micro-textures: bindu (stippling dots), rekhavachuk (parallel strokes), fish scales, and grain seed patterns',
    },
    galleryPlates: [
      {
        title: 'Forest Companions (Spotted Deer & Mahua Tree)',
        imageUrl: '/artworks/gond_companions.jpg',
        caption: 'Auspicious deer filled with sacred vibrational dots beneath the Mahua canopy.',
      },
      {
        title: 'Tree of Life with Peacocks',
        imageUrl: '/artworks/gond_companions.jpg',
        caption: 'Roots reaching into the underworld while branches cradle nesting birds.',
      },
    ],
    relatedCraftIds: ['warli', 'madhubani', 'dhokra'],
  },
  {
    id: 'pattachitra',
    name: 'Odisha Pattachitra',
    category: 'Painting',
    subCategories: ['Painting', 'Folk & Tribal Art'],
    region: 'Raghurajpur & Puri, Odisha',
    imageUrl: '/artworks/pattachitra_rathyatra.jpg',
    shortIntro:
      'Classical scroll painting known for intricate mythological narratives, disciplined line work, natural stone mineral pigments, and glossy tree-resin lacquer finishing.',
    originStory:
      'Preserved for centuries in the artisan heritage village of Raghurajpur near Puri. Closely tied to the sacred rituals of Lord Jagannath, where chitrakars (painters) created replacement painted icons during the sacred Anavasara period.',
    culturalSignificance:
      'Translates from Sanskrit: "Patta" (cloth canvas) and "Chitra" (painting). Strict iconographic dhyana shlokas govern the proportions, hand mudras, and eye contours. The large round eyes of Lord Jagannath symbolize universal, unconditional love observing all beings as equals.',
    materialsAndTechniques: {
      surfaces: 'Treated cotton canvas glued with boiled tamarind seed paste and crushed conch-shell powder',
      colors: 'Raw stone minerals: hingula (red cinnabar), haritala (yellow orpiment), sankha (white conch), ramraja (indigo)',
      tools: 'Mongoose and buffalo ear-hair brushes bound in bamboo quills',
      methods: 'Chitrakar line work, floral border framing (pata border), natural tree resin lacquer coating',
    },
    galleryPlates: [
      {
        title: 'Rath Yatra of Puri',
        imageUrl: '/artworks/pattachitra_rathyatra.jpg',
        caption: 'Grand chariot procession of Lord Jagannath, Balabhadra, and Devi Subhadra.',
      },
    ],
    relatedCraftIds: ['kalamkari', 'madhubani'],
  },
  {
    id: 'kalamkari',
    name: 'Kalamkari Hand-Painted Textile',
    category: 'Textile & Weaving',
    subCategories: ['Textile & Weaving', 'Painting'],
    region: 'Srikalahasti & Machilipatnam, Andhra Pradesh',
    imageUrl: '/artworks/pattachitra_rathyatra.jpg',
    shortIntro:
      'Ancient organic textile painting using a tamarind bamboo pen (kalam) and vegetable dyes, depicting temple epics, floral vines, and Tree of Life motifs.',
    originStory:
      'Flourished along the Coromandel coast of southern India under royal Golconda and Vijayanagara patronage. Wandering village minstrels carried these large hand-painted scrolls between villages to illustrate their musical recitations.',
    culturalSignificance:
      'Derived from "Kalam" (pen) and "Kari" (craftsmanship). Every stage honors nature: fabric is soaked in buffalo milk to prevent bleeding, and washed in flowing river currents. The Tree of Life motif connects heaven, earth, and the underworld.',
    materialsAndTechniques: {
      surfaces: 'Handspun organic cotton fabric treated with buffalo milk and myrobalan nuts',
      colors: 'Fermented iron rust and jaggery (black ink), madder root (red), pomegranate rind (yellow), indigo',
      tools: 'Sharp bamboo stick wrapped with raw wool yarn reservoir',
      methods: 'Multiple natural river washings, alum mordant fixing, sunlight bleaching',
    },
    galleryPlates: [
      {
        title: 'Tree of Life Scroll Plate',
        imageUrl: '/artworks/pattachitra_rathyatra.jpg',
        caption: 'Hand-drawn botanical scroll with natural vegetable dyes.',
      },
    ],
    relatedCraftIds: ['pattachitra', 'chikankari'],
  },
  {
    id: 'blue-pottery',
    name: 'Jaipur Blue Pottery',
    category: 'Pottery & Terracotta',
    subCategories: ['Pottery & Terracotta'],
    region: 'Jaipur, Rajasthan',
    imageUrl: '/artworks/madhubani_harmony.jpg',
    shortIntro:
      'A unique ceramic tradition made without clay—crafted from ground quartz stone, Fuller’s earth, and glazed with brilliant cobalt blue and turquoise.',
    originStory:
      'Brought to Jaipur in the 19th century by Maharaja Sawai Ram Singh II, who sent local potters to learn Persian glazed ceramic techniques. Evolved into a signature Rajasthani craft blending Turko-Persian glazes with Rajput floral and bird motifs.',
    culturalSignificance:
      'One of the only pottery traditions in the world that uses no clay. The brilliant blue and turquoise hues reflect the desert oasis and clear Rajasthan skies, decorated with lotus rosettes, peacocks, and arabesque leafy borders.',
    materialsAndTechniques: {
      surfaces: 'Fired non-clay ceramic paste molded by hand',
      colors: 'Cobalt oxide (royal dark blue), copper oxide (vibrant turquoise), chrome oxide (green)',
      tools: 'Potter’s low wheel, fine squirrel-hair detail brushes, wood-fired kilns',
      methods: 'Dough kneading of ground quartz, powdered glass, and Multani mitti; low-temperature single firing',
    },
    galleryPlates: [
      {
        title: 'Jaipur Cobalt Tile Medallion',
        imageUrl: '/artworks/madhubani_harmony.jpg',
        caption: 'Turquoise and cobalt floral medallion without traditional clay.',
      },
    ],
    relatedCraftIds: ['dhokra'],
  },
  {
    id: 'dhokra',
    name: 'Dhokra Lost-Wax Bell Metal',
    category: 'Folk & Tribal Art',
    subCategories: ['Folk & Tribal Art', 'Pottery & Terracotta'],
    region: 'Bastar, Chhattisgarh / Bankura, West Bengal / Mayurbhanj, Odisha',
    imageUrl: '/artworks/warli_celebrations.jpg',
    shortIntro:
      'A 4,000-year-old lost-wax (cire perdue) metal casting technique tracing back to the Dancing Girl of Mohenjo-daro, creating non-ferrous bronze tribal figures.',
    originStory:
      'Practiced by nomadic tribal metalsmith clans (Dhokra Damar) across central and eastern India. The ancient technique has remained virtually unchanged for four millennia, passing orally from father to son and mother to daughter.',
    culturalSignificance:
      'Dhokra items are deeply spiritual for forest tribes: guardian deities (Danteshwari, Bhairav), ritual brass elephants, grain measuring bowls, and dancing human figurines. Because each clay mold is broken to free the sculpture, every creation is entirely one-of-a-kind.',
    materialsAndTechniques: {
      surfaces: 'Cast non-ferrous brass and bell-metal bronze',
      colors: 'Natural oxidized golden-brass patina and smoky charcoal earth tones',
      tools: 'Manual wax extruder (pichki), hand furnace, wooden scrapers',
      methods: 'Clay core modeled with red ant-hill soil, wrapped with natural beeswax noodles, encased in second clay mold, baked in open charcoal pit',
    },
    galleryPlates: [
      {
        title: 'Tribal Procession with Elephants',
        imageUrl: '/artworks/warli_celebrations.jpg',
        caption: 'Hand-modeled beeswax lost-wax bronze casting.',
      },
    ],
    relatedCraftIds: ['warli', 'gond'],
  },
  {
    id: 'chikankari',
    name: 'Lucknow Chikankari Embroidery',
    category: 'Textile & Weaving',
    subCategories: ['Textile & Weaving'],
    region: 'Lucknow, Awadh Region, Uttar Pradesh',
    imageUrl: '/artworks/gond_companions.jpg',
    shortIntro:
      'Delicate hand-embroidery featuring over 32 traditional shadow stitches on sheer muslin and fine cotton fabrics, creating ethereal white-on-white textures.',
    originStory:
      'Flourished in the courts of Awadh under the Nawabs of Lucknow in the 18th and 19th centuries, inspired by Mughal architectural marble jali screens. Traditionally practiced by skilled artisan women in their homes.',
    culturalSignificance:
      'Translates literally to "delicate embroidery". Unlike colorful folk stitches, Chikankari relies on subtle light-and-shadow variations on fine muslin. The stitches evoke marble lattice jali screens of royal palaces and gentle paisley teardrops.',
    materialsAndTechniques: {
      surfaces: 'Mulmul (fine cotton muslin), sheer organza, fine voile',
      colors: 'Raw white and ecru silk or cotton threads',
      tools: 'Fine embroidery needles, wooden hand embroidery frames (adda)',
      methods: '32 specialized stitches including Bakhiya (shadow work), Tepchi (running stitch), Murri (rice-grain knot), and Jali (lattice openwork)',
    },
    galleryPlates: [
      {
        title: 'White Muslin Shadow Work Panel',
        imageUrl: '/artworks/gond_companions.jpg',
        caption: 'Intricate 32-stitch hand-embroidered floral vines.',
      },
    ],
    relatedCraftIds: ['kalamkari'],
  },
];

// Initial demo contributions submitted by artisans in the community
export const initialContributions = [
  {
    id: 'contrib-1',
    artisanName: 'Ivy Maiti',
    craftName: 'Mithila Natural Kachni Linework',
    region: 'West Bengal',
    materialsUsed: 'Dried parijat blossoms, soaked tamarind paste, bamboo pen',
    story:
      'My grandmother taught me that you must pick parijat blossoms at dawn when the dew is still fresh. We dry the orange stems in shade and boil them with alum to get the golden ochre that never fades even after fifty years.',
    techniques: 'Drawing single continuous contour lines without lifting the bamboo pen.',
    submittedDate: 'Nov 10, 2026',
    status: 'Verified',
    imageUrl: '/artworks/madhubani_harmony.jpg',
  },
  {
    id: 'contrib-2',
    artisanName: 'Bablu Jadav',
    craftName: 'Warli Terracotta Ground Preparation',
    region: 'Palghar, Maharashtra',
    materialsUsed: 'Red geru clay, cow dung wash, dried rice flour paste',
    story:
      'Before painting the Tarpa dance, the house wall must be washed three times with cow dung and clay. This makes the surface breathe and keeps insects away from our home. The white rice paste is ground on a stone mortar.',
    techniques: 'Dual triangle human coupling and Tarpa spiral geometry.',
    submittedDate: 'Nov 04, 2026',
    status: 'Submitted',
    imageUrl: '/artworks/warli_celebrations.jpg',
  },
];
