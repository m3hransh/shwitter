const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/**/*.{html, htm}"
  ],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Vazir', 'sans-serif']
    },
    extend: {
      colors: {
        primary: colors.teal,
        secondary: colors.rose,
        accent: colors.rose,
        main: colors.coolGray,
        background: colors.blueGray

      }
    },
  },
  plugins: [
    require('tailwindcss-rtl'),
  ],
}
