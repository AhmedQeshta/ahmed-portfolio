/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './features/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#000000',
        'bg-main-start': '#0f172a',
        'bg-main-mid': '#581c87',
        'bg-main-end': '#0f172a',
        'card-bg': 'rgba(255,255,255,0.10)',
        'card-hover': 'rgba(255,255,255,0.20)',
        'orb-purple': 'rgba(168,85,247,0.20)',
        'orb-blue': 'rgba(59,130,246,0.20)',
        'orb-pink': 'rgba(236,72,153,0.20)',
        'text-primary': '#ffffff',
        'text-secondary': '#d1d5db',
        'text-accent': '#c4b5fd',
        'footer-text': '#9ca3af',
        placeholder: '#d1d5db',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        slowspin: 'slowspin 12s linear infinite',
        blob: 'blob 7s infinite',
        'spin-slow': 'spin 20s linear infinite',
        fadeInUp: 'fadeInUp 0.6s ease-out forwards',
        slideInLeft: 'slideInLeft 0.5s ease-out forwards',
        slideInRight: 'slideInRight 0.5s ease-out forwards',
        bounceIn: 'bounceIn 0.6s ease-out forwards',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        slowspin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        blob: {
          '0%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
          '100%': {
            transform: 'translate(0px, 0px) scale(1)',
          },
        },
        fadeInUp: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        slideInLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(-30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        slideInRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(30px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        bounceIn: {
          '0%': {
            opacity: '0',
            transform: 'scale(0.3)',
          },
          '50%': {
            opacity: '1',
            transform: 'scale(1.05)',
          },
          '70%': {
            transform: 'scale(0.9)',
          },
          '100%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        pulseGlow: {
          '0%, 100%': {
            boxShadow: '0 0 5px rgba(168,85,247,0.3)',
          },
          '50%': {
            boxShadow: '0 0 20px rgba(168,85,247,0.6)',
          },
        },
      },
      animationDelay: {
        2000: '2s',
        4000: '4s',
      },
    },
  },
  plugins: [],
};
