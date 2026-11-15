/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F3EA',
        terracotta: {
          DEFAULT: '#9D4935',
          light: '#B85A42',
          dark: '#7A3828',
        },
        forest: {
          DEFAULT: '#354B3D',
          light: '#4A6655',
          dark: '#243329',
        },
        ochre: {
          DEFAULT: '#D5B77A',
          light: '#E2C98F',
          dark: '#B89A5A',
        },
        brown: {
          DEFAULT: '#49372B',
          light: '#6B5245',
          dark: '#2E211A',
        },
        beige: {
          DEFAULT: '#EDE3D3',
          light: '#F5EEE2',
          dark: '#D9CBBA',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'paper-texture': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E\")",
      },
      boxShadow: {
        'card': '0 1px 4px rgba(73, 55, 43, 0.08), 0 0 0 1px rgba(73, 55, 43, 0.04)',
        'card-hover': '0 4px 16px rgba(73, 55, 43, 0.12), 0 0 0 1px rgba(73, 55, 43, 0.06)',
        'sidebar': '2px 0 20px rgba(73, 55, 43, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.25s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-8px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
