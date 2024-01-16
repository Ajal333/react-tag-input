/** @type {import('tailwindcss').Config} */
import { colors } from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: {
          600: "#D93677",
          500: "#FA649B",
          400: "#FFC2D8",
          300: "#FFD6E5",
          200: "#FFEBF2",
          100: "#FFF5F9",
        },
        secondary: {
          600: "#9629CC",
          500: "#D487FA",
          400: "#EBC2FF",
          300: "#F1D6FF",
          200: "#F8EBFF",
          100: "#FCF5FF",
        },
        neutral: {
          600: "#1A1B1C",
          500: "#808080",
          400: "#999999",
          300: "#B3B3B3",
          200: "#CCCCCC",
          100: "#E6E6E6",
        },
      },
    },
  },
  plugins: [],
};
