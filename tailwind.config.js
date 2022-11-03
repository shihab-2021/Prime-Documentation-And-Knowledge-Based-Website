/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#6b707f",
        darkBlue: "#2C303A",
        primary: "#000",
        buttons: "#0000ff",
        lightBlue: "#4C4CF1",
        lightDark: "#131417",
        offWhite: "#F7F5F5",
        DarkGray: "#1d1e25",
        Dark: "#2c303a",
        midnight: "#140b25",
        blue: "#4C4CF1",
      },
    },
  },
  plugins: [],
};
