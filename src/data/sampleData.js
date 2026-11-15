// Sample data for the KalaSetu AI dashboard

export const artistProfile = {
  name: 'Ivy Maiti',
  artForm: 'Traditional Artist',
  location: 'West Bengal',
  avatar: null, // placeholder
  joined: 'March 2024',
};

export const stats = [
  { id: 1, label: 'Total Artworks', value: 12, icon: 'Image' },
  { id: 2, label: 'Stories Created', value: 8, icon: 'BookOpen' },
  { id: 3, label: 'Portfolio Published', value: 1, icon: 'LayoutGrid' },
  { id: 4, label: 'Catalogue Listings', value: 3, icon: 'BarChart2' },
];

export const quickActions = [
  {
    id: 1,
    title: 'Upload Artwork',
    description: 'Digitise your creation',
    icon: 'Upload',
    color: 'terracotta',
    route: '/artwork/upload',
  },
  {
    id: 2,
    title: 'Create ArtStory',
    description: "Tell your artwork's story",
    icon: 'Sparkles',
    color: 'forest',
    route: '/artstory/create',
  },
  {
    id: 3,
    title: 'Create Catalogue',
    description: 'Describe and list your artwork',
    icon: 'FileText',
    color: 'ochre',
    route: '/catalogue/create',
  },
  {
    id: 4,
    title: 'My Portfolio',
    description: 'Build your digital identity',
    icon: 'User',
    color: 'brown',
    route: '/portfolio',
  },
];

export const recentArtworks = [
  {
    id: 1,
    title: "Nature's Harmony",
    artForm: 'Madhubani',
    type: 'Painting',
    status: 'Published',
    imageUrl: '/artworks/madhubani_harmony.jpg',
  },
  {
    id: 2,
    title: 'Village Celebrations',
    artForm: 'Warli',
    type: 'Painting',
    status: 'Draft',
    imageUrl: '/artworks/warli_celebrations.jpg',
  },
  {
    id: 3,
    title: 'Rath Yatra',
    artForm: 'Pattachitra',
    type: 'Painting',
    status: 'Published',
    imageUrl: '/artworks/pattachitra_rathyatra.jpg',
  },
];

export const navItems = {
  workspace: [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', route: '/' },
    { id: 'artwork', label: 'My Artwork', icon: 'Image', route: '/artwork' },
    { id: 'artstory', label: 'AI ArtStory', icon: 'Sparkles', route: '/artstory' },
    { id: 'catalogue', label: 'Catalogue', icon: 'BookOpen', route: '/catalogue' },
    { id: 'portfolio', label: 'My Portfolio', icon: 'User', route: '/portfolio' },
    { id: 'heritage', label: 'Heritage Archive', icon: 'Landmark', route: '/heritage' },
  ],
  preferences: [
    { id: 'settings', label: 'Settings', icon: 'Settings', route: '/settings' },
    { id: 'help', label: 'Help & Support', icon: 'HelpCircle', route: '/help' },
  ],
};

export const inspirationQuote = {
  text: 'Every stroke of colour is a word in the language of the soul.',
  author: 'On art, heritage & storytelling',
};

