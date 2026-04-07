/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#050814',
        cyanGlow: '#32d9ff',
        violetGlow: '#8f6bff'
      },
      boxShadow: {
        glow: '0 0 40px rgba(50,217,255,0.25)',
        violet: '0 0 40px rgba(143,107,255,0.3)'
      },
      backgroundImage: {
        'grid-faint':
          'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)'
      }
    }
  },
  plugins: []
};
