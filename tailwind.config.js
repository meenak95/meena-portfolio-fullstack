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
        'neon-green': '#00ff88',
        'neon-blue': '#0088ff',
        'dark-bg': '#0a0a0a',
        'darker-bg': '#050505',
        'accent-gray': '#1a1a1a',
      },
    },
  },
  plugins: [],
}