/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        error: "#EF0816",
        "grey-500": "#667085",
        primary: "#1D2939",
        blue: '#181CF9'
      }
    },
  },
  plugins: [],
}

