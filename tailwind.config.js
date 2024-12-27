/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        weather: {
          primary: "#9b87f5",
          secondary: "#7E69AB",
          background: "#F6F6F7",
          text: "#1A1F2C",
          card: "rgba(255, 255, 255, 0.8)",
        }
      }
    },
  },
  plugins: [],
}