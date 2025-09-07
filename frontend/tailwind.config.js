/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  safelist: [
    // Dynamic classes used in `Portfolio.tsx` via template strings
    'bg-yellow-500/20', 'bg-blue-500/20', 'bg-green-500/20',
    'text-yellow-400', 'text-blue-400', 'text-green-400',
    'group-hover:text-yellow-400', 'group-hover:text-blue-400', 'group-hover:text-green-400',
    'from-yellow-500/50', 'from-blue-500/50', 'from-green-500/50',
  ],
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out forwards',
        'float-1': 'float-1 6s ease-in-out infinite',
        'float-2': 'float-2 8s ease-in-out infinite',
        'float-gentle': 'float-gentle 4s ease-in-out infinite',
        'spin-slow': 'spin-slow 3s linear infinite',
        'spin-very-slow': 'spin-very-slow 20s linear infinite',
        'pulse-slow': 'pulse-slow 2s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 3s ease-in-out infinite',
        'bounce-subtle': 'bounce-subtle 2s ease-in-out infinite',
        'scroll-indicator': 'scroll-indicator 2s ease-in-out infinite',
        'cloud-float': 'cloud-float linear infinite',
        'particle-explosion': 'particle-explosion 1s ease-out forwards',
        'shimmer': 'shimmer 2s ease-in-out infinite',
        'twinkle': 'twinkle ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
        'icon-glow': 'icon-glow 2.5s ease-in-out infinite',
        'pulse-gentle': 'pulse-slow 3s ease-in-out infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
        'fade-in-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(3rem)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'float-1': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(180deg)' },
        },
        'float-2': {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(-180deg)' },
        },
        'float-gentle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'spin-slow': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'spin-very-slow': {
          'from': { transform: 'rotate(0deg)' },
          'to': { transform: 'rotate(360deg)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.8)' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-subtle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'scroll-indicator': {
          '0%': { transform: 'translateY(0)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateY(16px)', opacity: '0' },
        },
        'cloud-float': {
          '0%': { transform: 'translateX(-100px)' },
          '100%': { transform: 'translateX(calc(100vw + 100px))' },
        },
        'particle-explosion': {
          '0%': {
            transform: 'rotate(var(--rotation)) translateY(0)',
            opacity: '1',
          },
          '100%': {
            transform: 'rotate(var(--rotation)) translateY(-30px)',
            opacity: '0',
          },
        },
        'shimmer': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        'twinkle': {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
        'glow': {
          '0%, 100%': { boxShadow: '0 0 5px currentColor' },
          '50%': { boxShadow: '0 0 20px currentColor' },
        },
        'icon-glow': {
          '0%, 100%': {
            filter: 'drop-shadow(0 0 2px rgba(255, 255, 255, 0.7))',
          },
          '50%': {
            filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 1)) drop-shadow(0 0 8px rgba(0, 255, 255, 0.6))',
          },
        },
      },
      backgroundSize: {
        '300%': '300% 300%',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(circle, var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        '2rem': '2rem 2rem',
      },
    },
  },
  plugins: [],
}
