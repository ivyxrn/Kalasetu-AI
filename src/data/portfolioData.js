// KalaSetu AI – Artisan Portfolio Data Model
// Designed with empathy, inclusivity, and conversational language for traditional artisans

export const defaultPortfolioData = {
  artisanName: 'Ivy Maiti',
  craftTitle: 'Traditional Indian Folk & Tribal Artisan',
  primaryCrafts: ['Mithila Madhubani', 'Warli Art', 'Gond Painting', 'Pattachitra'],
  location: 'West Bengal, India',
  personalQuote:
    'Every stroke of colour carries the blessings of my grandmother and the rhythm of our village earth.',
  
  // Guided Question 1: How did you learn this craft and who taught you?
  learningStory:
    'I grew up watching my grandmother and mother prepare natural colours from dried flowers, soot, and crushed river clay. My grandmother would sit beside me on the veranda during the Chhath festival, gently guiding my small fingers with a fine bamboo stick to draw the sacred twin fish of fertility on our courtyard floor.',

  // Guided Question 2: What inspires your creations?
  inspirationStory:
    'My creations are inspired by the living rhythm around our village—the morning birds nesting in ancient Mahua branches, the post-harvest Tarpa dance under the autumn moon, and the spiritual bond between villagers and sacred animals.',

  // Guided Question 3: What materials and tools do you use?
  materialsUsed:
    'Handmade unbleached paper, treated cotton canvas, natural stone minerals, crushed parijat flowers, indigo wash, and slender bamboo twig pens.',

  // Guided Question 4: What makes your work special to you?
  whatMakesItSpecial:
    'In our craft, nothing is hurried and nothing is wasted. Each piece is drawn with devotion and prayer, carrying generations of ancestral memory that connects our village to people anywhere in the world.',

  // Optional details (never required for publication)
  howLongPracticing: 'Practicing since childhood (over 15 years)',
  spokenLanguages: ['Bengali', 'Hindi', 'English'],
  contactNumber: '+91 98765 43210',
  whatsappNumber: '+91 98765 43210',
  email: 'ivy.maiti.crafts@gmail.com',
  isAvailableForOrders: true,
  featuredArtworkIds: [1, 2, 3, 4],
  isPublished: true,

  // Optional Community Journey (Village melas, workshops, recognitions)
  journeyMilestones: [
    {
      id: 'm-1',
      year: '2024',
      title: 'Regional Crafts Gathering',
      description: 'Shared hand-painted scrolls and demonstrated natural dye extraction at the district artisan mela.',
    },
    {
      id: 'm-2',
      year: '2023',
      title: 'Heritage Skill Circle',
      description: 'Taught younger village girls the traditional kachni hatching linework to keep our folk memory alive.',
    },
  ],
};

// Guided questions helper for the portfolio editor
export const guidedPortfolioQuestions = [
  {
    id: 'learningStory',
    label: 'How did you learn your craft, and who taught you?',
    subtitle: 'Share memories of family, village elders, or how you first held a brush.',
    placeholder:
      'e.g. My grandmother taught me sitting on our earthen veranda during festive rains, showing me how to mix crushed flowers with water...',
    voicePrompt: 'Speak about who taught you and your earliest memories of making art.',
  },
  {
    id: 'inspirationStory',
    label: 'What inspires your creations?',
    subtitle: 'Nature, village life, sacred folklore, songs, or daily rituals.',
    placeholder:
      'e.g. I am inspired by the morning birds in the Mahua trees, our post-harvest festival songs, and the sacred river waters...',
    voicePrompt: 'Speak about what you love painting the most and what gives you ideas.',
  },
  {
    id: 'materialsUsed',
    label: 'What natural materials and tools do you work with?',
    subtitle: 'The earth, plants, clay, cloth, or brushes you make by hand.',
    placeholder:
      'e.g. Natural plant dyes, river clay, handmade paper, cloth treated with tamarind paste, bamboo twigs...',
    voicePrompt: 'Describe the paints, surfaces, and tools you use in your craft.',
  },
  {
    id: 'whatMakesItSpecial',
    label: 'What makes your creations special to your heart?',
    subtitle: 'The meaning or message you hope people feel when they see your work.',
    placeholder:
      'e.g. In our tradition, every line is a blessing for peace, fertility, and gratitude to mother earth...',
    voicePrompt: 'Tell people what makes your creations unique and meaningful to you.',
  },
];
