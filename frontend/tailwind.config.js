module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        purple: {
          950: '#48004B'
        },
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
