import { heroui } from "@heroui/react";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#FFFFFF",
            foreground: "#333333",
            focus: "#4169E1",
            content1: {
              DEFAULT: "#FFFFFF",
              foreground: "#333333"
            },
            content2: {
              DEFAULT: "#F8F9FA",
              foreground: "#333333"
            },
            primary: {
              50: "#EEF2FF",
              100: "#E0E7FF",
              200: "#C7D2FE",
              300: "#A5B4FC",
              400: "#818CF8",
              500: "#4169E1", // Royal Blue
              600: "#3B5FCA",
              700: "#3355B3",
              800: "#2C4B9C",
              900: "#244185",
              DEFAULT: "#4169E1",
              foreground: "#FFFFFF"
            },
            secondary: {
              50: "#FFF5F5",
              100: "#FFE0E0",
              200: "#FFC7C7",
              300: "#FFA5A5",
              400: "#FF8181",
              500: "#FF6F61", // Light Red
              600: "#E65C4F",
              700: "#CC493D",
              800: "#B3362B",
              900: "#992319",
              DEFAULT: "#FF6F61",
              foreground: "#FFFFFF"
            },
            success: {
              500: "#4CAF50", // Material Green
              DEFAULT: "#4CAF50",
            },
            warning: {
              500: "#FFD700", // Material Gold
              DEFAULT: "#FFD700",
            },
            danger: {
              500: "#FF9800", // Material Orange
              DEFAULT: "#FF9800",
            }
          }
        }
      }
    })
  ],
};
