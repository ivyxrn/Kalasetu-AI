// KalaSetu AI – Catalogue Data Model & Initial Pre-Saved Catalogues

export const catalogueLayouts = [
  {
    id: 'classic',
    title: 'Classic Editorial',
    description: 'Spacious magazine-style layouts, large artwork hero imagery, serif headlines, and refined gallery typography.',
    icon: 'BookOpen',
    styleTag: 'Editorial Monograph',
    accent: '#49372B',
    borderStyle: 'border-brown/20',
    fontPair: 'Playfair Display + Plus Jakarta Sans',
  },
  {
    id: 'heritage',
    title: 'Heritage Collection',
    description: 'Subtle Indian-inspired decorative details, warm earthy terracotta and ochre accents, and traditional border trim.',
    icon: 'Landmark',
    styleTag: 'Heritage Portfolio',
    accent: '#9D4935',
    borderStyle: 'border-terracotta/30',
    fontPair: 'Cormorant Garamond + Inter',
  },
  {
    id: 'minimal',
    title: 'Minimal Gallery',
    description: 'Contemporary gallery layout with generous white space, clean architectural margins, and maximum visual focus on art.',
    icon: 'LayoutTemplate',
    styleTag: 'Modern Exhibition',
    accent: '#354B3D',
    borderStyle: 'border-forest/20',
    fontPair: 'Cinzel + Plus Jakarta Sans',
  },
];

export const coverStyles = [
  {
    id: 'framed',
    name: 'Archival Matboard Frame',
    description: 'Centered framed artwork surrounded by museum-grade linen matboard and gilded borders.',
  },
  {
    id: 'full-bleed',
    name: 'Full Bleed Artwork',
    description: 'Edge-to-edge artwork background with elegant darkened typography overlay.',
  },
  {
    id: 'minimal-title',
    name: 'Contemporary Inset',
    description: 'Large publication title header with a generous landscape artwork plate below.',
  },
];

export const initialCatalogues = [
  {
    id: 'cat-1',
    title: 'Sacred Traditions: Folk Paintings of Mithila & Sahyadri',
    subtitle: 'An Autumn 2026 Curated Retrospective',
    exhibitionName: 'KalaSetu Inaugural Heritage Exhibition',
    introduction:
      'This publication brings together the sacred dualities of Mithila Madhubani and Sahyadri Warli traditions. Painted with natural mineral pigments, parijat extracts, and crushed rice paste on handmade paper, each creation documents centuries-old ancestral memories and folk symbolism passed down through generations of Indian women masters.',
    coverImage: '/artworks/madhubani_harmony.jpg',
    coverStyle: 'framed',
    layout: 'heritage',
    status: 'Published',
    date: 'Nov 08, 2026',
    rawDate: '2026-11-08',
    artistName: 'Ivy Maiti',
    artworkItems: [
      {
        id: 1,
        title: "Nature's Harmony",
        artForm: 'Madhubani',
        type: 'Painting',
        imageUrl: '/artworks/madhubani_harmony.jpg',
        dimensions: '24 × 18 inches',
        materials: 'Handmade unbleached paper, natural vegetable dyes (kachni & bharni)',
        techniques: 'Double-contour bamboo pen drawing, fine parallel hatching (kachni)',
        description:
          'An auspicious Mithila Madhubani painting depicting twin sacred fish facing each other amidst blossoming lotus vines and traditional floral motifs.',
        customNotes:
          'Features protective concentric borders hand-drawn with single continuous bamboo pen strokes.',
        storyExcerpt:
          'In Mithila folklore, fish represent fertility, abundance, and the ever-flowing stream of universal life.',
      },
      {
        id: 2,
        title: 'Village Celebrations',
        artForm: 'Warli',
        type: 'Painting',
        imageUrl: '/artworks/warli_celebrations.jpg',
        dimensions: '30 × 20 inches',
        materials: 'Terracotta mud wash on canvas board, natural white rice-paste pigment',
        techniques: 'Traditional geometric triangle-coupling (chaukat), rhythmic spiral composition',
        description:
          'An indigenous Warli tribal wall painting from the Sahyadri ranges depicting the joyful post-harvest Tarpa dance.',
        customNotes:
          'The human figures are formed by two inverted triangles meeting at the apex, symbolizing the cosmic balance of masculine and feminine energies.',
        storyExcerpt:
          'The circle spirals outward, welcoming every traveler who approaches with respect in their heart.',
      },
      {
        id: 3,
        title: 'Forest Companions',
        artForm: 'Gond',
        type: 'Painting',
        imageUrl: '/artworks/gond_companions.jpg',
        dimensions: '28 × 22 inches',
        materials: 'Canvas cloth treated with yellow ochre clay, natural stone pigments',
        techniques: 'Signature Gond micro-patterns (bindu dots, rekhavachuk parallel dashes)',
        description:
          'A masterwork of Madhya Pradesh Gond folk art depicting a majestic spotted deer standing quietly under the sacred Mahua Tree of Life.',
        customNotes:
          'In Gond animist belief, every living creature’s body is filled with sacred vibrational dots reflecting ancestral raindrops.',
        storyExcerpt:
          'In Gondi belief, when you view a good image, auspicious fortune visits your home.',
      },
      {
        id: 4,
        title: 'Rath Yatra',
        artForm: 'Pattachitra',
        type: 'Painting',
        imageUrl: '/artworks/pattachitra_rathyatra.jpg',
        dimensions: '36 × 24 inches',
        materials: 'Treated cotton canvas cloth (patta), natural mineral pigments (hingula, haritala)',
        techniques: 'Traditional Chitrakar linework, floral border framing, lacquer finish',
        description:
          'A classical Odisha Pattachitra scroll painting depicting the grand Jagannath Rath Yatra at Puri with Lord Jagannath, Balabhadra, and Devi Subhadra.',
        customNotes:
          'Rendered according to strict dhyana slokas of the Raghurajpur Chitrakar guild.',
        storyExcerpt:
          'The round eyes of Lord Jagannath symbolize unconditional, omnipresent love seeing all devotees as equals.',
      },
    ],
  },
  {
    id: 'cat-2',
    title: 'Rhythms of the Earth: Warli & Gond Expressions',
    subtitle: 'Tribal Narratives of Nature and Community',
    exhibitionName: 'Sahyadri & Vindhya Tribal Showcase',
    introduction:
      'A visual dialogue between the agrarian geometry of the Warli tribe in Maharashtra and the animist vibrancy of Gond masters in Madhya Pradesh. This catalogue celebrates the living harmony between humankind and the natural world.',
    coverImage: '/artworks/warli_celebrations.jpg',
    coverStyle: 'full-bleed',
    layout: 'classic',
    status: 'Published',
    date: 'Oct 31, 2026',
    rawDate: '2026-10-31',
    artistName: 'Ivy Maiti',
    artworkItems: [
      {
        id: 2,
        title: 'Village Celebrations',
        artForm: 'Warli',
        type: 'Painting',
        imageUrl: '/artworks/warli_celebrations.jpg',
        dimensions: '30 × 20 inches',
        materials: 'Terracotta mud wash on canvas board, natural white rice-paste pigment',
        techniques: 'Traditional geometric triangle-coupling (chaukat), rhythmic spiral composition',
        description:
          'An indigenous Warli tribal wall painting from the Sahyadri ranges depicting the joyful post-harvest Tarpa dance.',
      },
      {
        id: 3,
        title: 'Forest Companions',
        artForm: 'Gond',
        type: 'Painting',
        imageUrl: '/artworks/gond_companions.jpg',
        dimensions: '28 × 22 inches',
        materials: 'Canvas cloth treated with yellow ochre clay, natural stone pigments',
        techniques: 'Signature Gond micro-patterns (bindu dots, rekhavachuk parallel dashes)',
        description:
          'A masterwork of Madhya Pradesh Gond folk art depicting a majestic spotted deer standing quietly under the sacred Mahua Tree of Life.',
      },
    ],
  },
  {
    id: 'cat-3',
    title: 'Mithila Sacred Lotus Studies',
    subtitle: 'Ritual Motifs and Auspicious Geometry',
    exhibitionName: 'Studio Archive Vol. II',
    introduction:
      'Detailed studies on the symbolic iconography of the sacred lotus in Mithila culture. Drawn with delicate bamboo pens and vegetable extracts, exploring concentric petal rings and spiritual wholeness.',
    coverImage: '/artworks/madhubani_harmony.jpg',
    coverStyle: 'minimal-title',
    layout: 'minimal',
    status: 'Draft',
    date: 'Oct 22, 2026',
    rawDate: '2026-10-22',
    artistName: 'Ivy Maiti',
    artworkItems: [
      {
        id: 1,
        title: "Nature's Harmony",
        artForm: 'Madhubani',
        type: 'Painting',
        imageUrl: '/artworks/madhubani_harmony.jpg',
        dimensions: '24 × 18 inches',
        materials: 'Handmade unbleached paper, natural vegetable dyes',
        techniques: 'Double-contour bamboo pen drawing, fine parallel hatching (kachni)',
        description:
          'An auspicious Mithila Madhubani painting depicting twin sacred fish facing each other amidst blossoming lotus vines.',
      },
    ],
  },
];
