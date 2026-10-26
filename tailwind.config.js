/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#F7F8FC",
        surface: "#FFFFFF",
        sidebar: "#171B2E",
        brand: {
          DEFAULT: "#6257C8",
          hover: "#5146B5",
          soft: "#F0EEFF",
        },
        ink: "#191B2A",
        muted: "#696B7B",
        line: "#E7E7EF",
        success: "#087B59",
        warning: "#A85A0A",
        danger: "#C43D4B",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(25, 27, 42, 0.04), 0 2px 8px rgba(25, 27, 42, 0.025)",
        float: "0 12px 28px rgba(25, 27, 42, 0.09)",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
    },
  },
  plugins: [],
};
