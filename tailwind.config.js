/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#4caf50",        // Main green (header, button bg)
        "primary-dark": "#388e3c", // Hover for button
        neon: "#b2ff59",           // Lime-green hover text
        dark: "#1e1e1e",           // Dark body background
      },
      fontFamily: {
        sans: ["'Montserrat Alternates'", "sans-serif"],
        lora: [
  				'Lora', 'serif'
  			]
      },
    },
  },
  plugins: [],
};