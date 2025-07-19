/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Nadpisz domyślne kolory Tailwind
        gray: {
          900: '#0A0A0A',  // Twój primary
          800: '#1A1A1A',  // Twój secondary  
          700: '#333333',  // Twój border
          600: '#333333',  // Używane w borderach
          500: '#666666',  // Twój text-muted
          400: '#666666',
          300: '#B3B3B3',  // Twój text-secondary
          200: '#B3B3B3',
          100: '#FFFFFF',  // Twój text-primary
        },
        red: {
          600: '#E60012',  // Twój accent
          700: '#CC0010',  // Ciemniejsza wersja
          500: '#E60012',
        },
      },
    },
  },
  plugins: [],
}
