/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        error: "#EF0816",
        black: "#000000",
        white: "#FFFFFF",
        grey: {
          G25: "#FCFCFD",
          G50: "#F9FAFB",
          G100: "#F2F4F7",
          G200: "#EAECF0",
          G300: "#D0D5DD",
          G400: "#98A2B3",
          G500: "#667085",
          G600: "#475467",
          G700: "#344054",
          G800: "#1D2939",
          G900: "#101828",
        },
        blue: {
          B25: "#F8F8FF",
          B50: "#F5F5FF",
          B100: "#E1E1FE",
          B200: "#C3C4FE",
          B300: "#9B9DFD",
          B400: "#4B4EFC",
          B500: "#0000FF",
          B600: "#0408E7",
          B700: "#0000CC",
          B800: "#0306BA",
          B900: "#03068E",
        }
      }
    },
  },
  plugins: [],
}

