/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#05070B",
          800: "#090C13",
          700: "#10141F",
          600: "#181D2C",
          500: "#242B40",
        },
        paper: "#F3F6FB",
        muted: "#8892AC",
        marigold: {
          DEFAULT: "#2F7DFF",
          dim: "#1E4FA3",
          glow: "#8BB8FF",
        },
        teal: {
          DEFAULT: "#22C55E",
          dim: "#178C43",
          glow: "#7BE39E",
        },
        coral: "#FF5C5C",
        violet: {
          DEFAULT: "#A78BFA",
          dim: "#7C5CFC",
          glow: "#D8CCFC",
        },
        frost: {
          DEFAULT: "#38BDF8",
          dim: "#0891D8",
          glow: "#BAE6FD",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.4), 0 8px 24px -8px rgba(0,0,0,0.5)",
        glow: "0 0 40px -8px rgba(47,125,255,0.4)",
        tealglow: "0 0 40px -8px rgba(34,197,94,0.4)",
        frostglow: "0 0 40px -8px rgba(56,189,248,0.35)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      animation: {
        "fade-up": "fadeUp 0.5s ease-out both",
        "pop": "pop 0.35s cubic-bezier(.34,1.56,.64,1) both",
        "pulse-slow": "pulseSlow 2.4s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(12px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pop: {
          "0%": { opacity: 0, transform: "scale(0.85)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        pulseSlow: {
          "0%,100%": { opacity: 1 },
          "50%": { opacity: 0.6 },
        },
      },
    },
  },
  plugins: [],
};
