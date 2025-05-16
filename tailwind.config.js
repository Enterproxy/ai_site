// tailwind.config.js
module.exports = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',     // dotychczasowy niebieski
        secondary: '#1d4ed8',   // ciemniejszy niebieski
        accent: '#3b82f6',      // jaśniejszy niebieski do przycisków itp.
        muted: '#6b7280',       // neutralny szary do tekstu
        background: '#f1f5f9',  // jasne tło (gray-100/gray-200 styl alphaxiv)
        surface: '#ffffff',     // białe powierzchnie
        border: '#e5e7eb',      // linie/granice
        tag: '#e0f2fe',         // tło dla tagów
        tagText: '#0284c7',     // kolor tekstu tagów
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Poppins', 'sans-serif'], // nagłówki
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.06)',
        hover: '0 4px 6px rgba(0,0,0,0.1)',
        '3xl': '0 10px 15px -5px rgba(0,0,0,0.2), 0 4px 6px -5px rgba(0,0,0,0.15)',
        '4xl': '0 15px 30px -10px rgba(0,0,0,0.25), 0 5px 10px -5px rgba(0,0,0,0.15)',
        deep: '0 20px 40px -10px rgba(0,0,0,0.3), 0 7px 14px -5px rgba(0,0,0,0.15)',
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  plugins: [],
}
