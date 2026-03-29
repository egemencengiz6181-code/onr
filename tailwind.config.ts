import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          DEFAULT: "#F8F5F0",
          50: "#FDFCFA",
          100: "#F8F5F0",
          200: "#F0EBE2",
          300: "#E4DDD2",
        },
        gold: {
          light: "#E8D5A3",
          DEFAULT: "#C9A84C",
          dark: "#9A7B2E",
          muted: "#B8965A",
        },
        charcoal: {
          DEFAULT: "#2C2C2C",
          light: "#444444",
          lighter: "#666666",
        },
        onyx: "#0A0A0A",
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "Times New Roman", "serif"],
        sans: ["var(--font-montserrat)", "Helvetica Neue", "Arial", "sans-serif"],
      },
      letterSpacing: {
        luxury: "0.25em",
        "luxury-wide": "0.4em",
        "luxury-xwide": "0.6em",
      },
      transitionDuration: {
        slow: "700ms",
        slower: "1000ms",
        slowest: "1400ms",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        "luxury-in": "cubic-bezier(0.55, 0, 1, 0.45)",
        "luxury-out": "cubic-bezier(0, 0.55, 0.45, 1)",
      },
      backgroundImage: {
        "gold-gradient":
          "linear-gradient(135deg, #C9A84C 0%, #E8D5A3 50%, #C9A84C 100%)",
        "dark-gradient":
          "linear-gradient(to bottom, rgba(10,10,10,0) 0%, rgba(10,10,10,0.7) 100%)",
      },
      animation: {
        "fade-in": "fadeIn 1.2s ease-out forwards",
        "fade-up": "fadeUp 0.9s cubic-bezier(0.25,0.46,0.45,0.94) forwards",
        "scale-in": "scaleIn 1.4s ease-out forwards",
        shimmer: "shimmer 2.5s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(28px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { transform: "scale(1.08)" },
          "100%": { transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
