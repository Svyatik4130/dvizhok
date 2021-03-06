module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        jump: {
          '0%, 100%': {
            transform: "translateY(0)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)"
          },
          '50%': {
            transform: "translateY(-25%)",
            animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)"
          },
        }
      },
      animation: {
        jump: 'jump 0.7s infinite',
      },
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
        '1/9': '11.1111%',
        '2/9': '22.2222%',
        '7/9': '77.7778%',
        '8/9': '88.8889%',
      },
      height: {
        '196': '46rem',
        '144': '34rem',
        '124': '32rem',
        '86': '22rem',
      },
      maxHeight: {
        "192": "48rem",
        "138": "36rem",
        "90-screen": "95vh"
      },
      maxWidth: {
        'xxs': '13rem',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
