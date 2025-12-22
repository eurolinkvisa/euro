/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,jsx,js}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        lg: '4rem',
        xl: '6rem',
      },
    },
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        midnight: '#0a0c12',
        obsidian: '#0f1624',
        royal: '#1f6feb',
        aurora: '#9a5cff',
        gold: '#c59b3a',
        brand: '#0c2f5c',
        accent: '#3bd2c2',
      },
      boxShadow: {
        glow: '0 20px 60px rgba(31, 111, 235, 0.25)',
        glass: '0 10px 40px rgba(0,0,0,0.35)',
      },
      backgroundImage: {
        'radial-glow': 'radial-gradient(circle at 20% 20%, rgba(155, 92, 255, 0.15), transparent 35%), radial-gradient(circle at 80% 10%, rgba(59, 210, 194, 0.12), transparent 25%)',
        'grid': 'linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(180deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
      },
      animation: {
        'float-slow': 'float 10s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(-6px)' },
          '50%': { transform: 'translateY(6px)' },
        },
      },
    },
  },
  plugins: [],
};
