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
        maroon: {
          DEFAULT: "var(--maroon)",
          dark: "var(--cdk)",
          light: "var(--crimson)",
        },
        gold: {
          DEFAULT: "var(--gold)",
          light: "var(--gold-l)",
          muted: "#C9A87A",
        },
        ivory: "var(--ivory)",
        cream: {
          DEFAULT: "var(--cream)",
          dark: "var(--cream2)",
        },
        ink: "var(--text)",
        muted: "var(--text-m)",
        "border-gold": "var(--border)",
        whatsapp: {
          DEFAULT: "var(--wa)",
          dark: "var(--wa-dk)",
        },
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body: ["var(--font-lato)", "sans-serif"],
        accent: ["var(--font-cormorant)", "serif"],
      },
      zIndex: {
        splash: "9999",
        nav: "800",
        float: "600",
      },
    },
  },
  plugins: [],
};
export default config;
