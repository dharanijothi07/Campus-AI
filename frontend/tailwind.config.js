/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0B0F19',
          card: '#111827',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        cyan: {
          glow: '#00F2FE',
        },
        blue: {
          accent: '#4FACFE',
        }
      }
    },
  },
  plugins: [],
}
