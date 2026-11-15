// KalaSetu AI – Settings & Artisan Preferences Data Model
// Designed with empathy, simplicity, and heritage minimalism for traditional artisans.

export const defaultSettingsData = {
  // My Profile
  profile: {
    name: 'Ivy Maiti',
    craftRole: 'Traditional Indian Folk & Tribal Artisan',
    location: 'West Bengal, India',
    bio: 'Dedicated to preserving ancestral Mithila Madhubani, Warli, and Gond art forms passed down through generations. My work draws from village folklore, nature, and sacred rituals.',
    email: 'ivy.maiti.crafts@gmail.com',
    phone: '+91 98765 43210',
    avatar: null, // Default avatar SVG
    joinedDate: 'March 2024',
  },

  // Language Preferences (Strictly English and Hindi for MVP)
  language: {
    interfaceLanguage: 'en', // 'en' | 'hi'
  },

  // Accessibility Preferences
  accessibility: {
    textSize: 'default', // 'small' | 'default' | 'large' | 'xl'
    highContrast: false,
    voiceAssistance: false,
    reducedMotion: false,
  },

  // Notifications Preferences
  notifications: {
    artworkUpdates: true,
    artStoryUpdates: true,
    catalogueUpdates: true,
    heritageUpdates: true,
    announcements: false,
    browserAlerts: false,
  },

  // Privacy & Security Preferences
  privacy: {
    profileVisibility: 'public', // 'public' | 'private'
    showContactPublicly: true,
    showLocationPublicly: true,
    twoFactorEnabled: false,
  },
};

// Supported Interface Languages
export const supportedLanguages = [
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    description: 'All menus, buttons, and guided instructions will be shown in clear English.',
    isDefault: true,
  },
  {
    code: 'hi',
    name: 'Hindi',
    nativeName: 'हिन्दी',
    description: 'सभी मेनू, बटन और मार्गदर्शक निर्देश सरल और स्पष्ट हिन्दी में दिखाए जाएंगे।',
    isDefault: false,
  },
];

// Accessibility Text Sizes
export const textSizeOptions = [
  {
    id: 'small',
    label: 'Small',
    scale: '0.9rem',
    description: 'Compact view for smaller screens or denser layout.',
  },
  {
    id: 'default',
    label: 'Default',
    scale: '1rem',
    description: 'Balanced size, comfortable for general reading.',
  },
  {
    id: 'large',
    label: 'Large',
    scale: '1.125rem',
    description: 'Larger text for comfortable reading without straining eyes.',
  },
  {
    id: 'xl',
    label: 'Extra Large',
    scale: '1.25rem',
    description: 'Maximum readability with bold contrast and clear spacing.',
  },
];

// Frequently Asked Questions
export const faqList = [
  {
    id: 'faq-1',
    question: 'How do I upload my artwork?',
    answer:
      'Go to "My Artwork" from the sidebar and click the "+ Upload New Artwork" button at the top right. You can photograph your painting with your phone or select a photo from your computer, give it a title, choose your art form (such as Madhubani, Warli, Gond, or Pattachitra), and add the traditional materials you used. Uploading is quick and pricing is completely optional.',
    category: 'Artwork',
  },
  {
    id: 'faq-2',
    question: 'How can I create an ArtStory?',
    answer:
      'Navigate to "AI ArtStory" in the sidebar. Select one of your uploaded paintings, choose your preferred storytelling style (Folk Heritage, Cultural Legend, Artisan Journey, or Poetic Reflection), pick your desired story length and language (English or Hindi), and click "Generate Story". KalaSetu AI will create a lyrical, culturally respectful narrative honouring your ancestors.',
    category: 'ArtStory',
  },
  {
    id: 'faq-3',
    question: 'How do I create a catalogue?',
    answer:
      'Click on "Catalogue" in the sidebar. Our catalogue creator arranges your hand-painted creations into an elegant, museum-grade digital collection with high-resolution imagery, historical context, and dimensions—ready to share with art collectors, curators, or craft fair organizers.',
    category: 'Catalogue',
  },
  {
    id: 'faq-4',
    question: 'How can I calculate a fair price?',
    answer:
      'Open any artwork in "My Artwork" and click the terracotta "Estimate Fair Price" button. The Fair Pricing Assistant will guide you through entering your material expenses, the hours you spent painting, and your desired profit margin. It transparently calculates a recommended starting price so you never undervalue your craftsmanship.',
    category: 'Pricing',
  },
  {
    id: 'faq-5',
    question: 'How do I share my portfolio?',
    answer:
      'Click on "My Portfolio" in the sidebar. Once you review your story, craft traditions, and selected artworks, click "Share Portfolio" to copy your unique digital portfolio link or download a print-friendly summary to share directly on WhatsApp or social media.',
    category: 'Portfolio',
  },
  {
    id: 'faq-6',
    question: 'Are my traditional techniques and paintings safe?',
    answer:
      'Yes, absolutely. KalaSetu AI is designed exclusively to celebrate and preserve your ownership. Your artwork, cultural stories, and intellectual craft identity remain 100% yours. We never use your paintings to train public third-party commercial generative art models without your explicit consent.',
    category: 'Privacy',
  },
];
