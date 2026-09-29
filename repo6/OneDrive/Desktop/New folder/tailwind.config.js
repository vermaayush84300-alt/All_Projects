/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        base: '#07090F',
        surface: '#0D1117',
        card: '#111827',
        layer: '#1A2233',
        edge: {
          subtle: '#1A2333',
          DEFAULT: '#243554',
          strong: '#334466',
        },
        brand: {
          DEFAULT: '#4F8EF7',
          soft: '#0D1F45',
          dim: '#2456B0',
          light: '#93B8FB',
        },
        win: {
          DEFAULT: '#22C55E',
          soft: '#071F10',
          dim: '#178C43',
          light: '#86EFAC',
        },
        fire: {
          DEFAULT: '#FB923C',
          soft: '#1C0A00',
          dim: '#C2621A',
          light: '#FED7AA',
        },
        risk: {
          DEFAULT: '#F87171',
          soft: '#1A0000',
          light: '#FCA5A5',
        },
        gem: {
          DEFAULT: '#A78BFA',
          soft: '#160B30',
          dim: '#7C5CFC',
          light: '#DDD6FE',
        },
        ice: {
          DEFAULT: '#38BDF8',
          soft: '#061520',
          dim: '#0891D8',
          light: '#BAE6FD',
        },
        snow: '#EEF2FF',
        ash: '#94A3B8',
        dusk: '#4B5A72',
      },
      fontFamily: {
        display: ["'Space Grotesk'", 'sans-serif'],
        body: ["'Inter'", 'sans-serif'],
        mono: ["'JetBrains Mono'", 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.5), 0 8px 32px -8px rgba(0,0,0,0.65)',
        'card-hover': '0 2px 6px rgba(0,0,0,0.5), 0 16px 40px -8px rgba(0,0,0,0.7)',
        'glow-brand': '0 0 40px -8px rgba(79,142,247,0.55)',
        'glow-win': '0 0 40px -8px rgba(34,197,94,0.5)',
        'glow-fire': '0 0 40px -8px rgba(251,146,60,0.45)',
        'glow-gem': '0 0 40px -8px rgba(167,139,250,0.45)',
        'glow-ice': '0 0 40px -8px rgba(56,189,248,0.4)',
        inner: 'inset 0 1px 0 rgba(255,255,255,0.06)',
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out both',
        'fade-in': 'fadeIn 0.4s ease-out both',
        'pop': 'pop 0.4s cubic-bezier(.34,1.56,.64,1) both',
        'slide-up': 'slideUp 0.35s cubic-bezier(.16,1,.3,1) both',
        'pulse-slow': 'pulseSlow 2.5s ease-in-out infinite',
        'shimmer': 'shimmer 1.8s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'ping-once': 'pingOnce 0.6s ease-out both',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(18px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        pop: {
          '0%': { opacity: 0, transform: 'scale(0.88)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { opacity: 0, transform: 'translateY(40px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%,100%': { opacity: 1 },
          '50%': { opacity: 0.45 },
        },
        shimmer: {
          '0%': { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pingOnce: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(1.6)', opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
