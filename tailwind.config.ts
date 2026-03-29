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
        forest: "#0d3b2b",
        forest2: "#1a5c42",
        forest3: "#2d7d5f",
        mint: "#52b788",
        gold: "#f0a500",
        "gold-dark": "#d49200",
        amber: "#e07b39",
        crimson: "#c0392b",
        snow: "#f4f7f5",
        ink: "#1a2e25",
        ink2: "#3d5a4d",
        ink3: "#6b8a7a",
        border: "#d0dfd8",
        border2: "#e5eeea",
      },
      fontFamily: {
        barlow: ["Barlow", "sans-serif"],
        "barlow-condensed": ["'Barlow Condensed'", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
