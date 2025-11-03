import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        white: "#FFFFFF",
        darkBlue: "#0A2540", // your dark blue
        magenta: "#FF00FF",  // your magenta
        lightBlue: "#00CFFF", // your light blue
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};

module.exports = config;
