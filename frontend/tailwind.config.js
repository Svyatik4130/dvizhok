module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        purple: {
          850: '#4E0E55',
          950: '#48004B'
        },
        pink: {
          450: '#B068C7'
        },
        yellow: {
          350: '#FADD4A'
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif']
      },
      zIndex: {
        '-10': '-10',
        '100': '100',
      },
      width: {
        '1/7': '14.2857143%',
        '2/7': '28.5714286%',
        '3/7': '42.8571429%',
        '4/7': '57.1428571%',
        '5/7': '71.4285714%',
        '6/7': '85.7142857%',
        '1/9': '11.111%',
        '8/9': '88.889%',
      },
      height: {
        '124': '29rem',
        '86': '22rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
