module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        darkgreen: '#2AB22F',
        lightgreen: '#D9FFC1',
        brightgreen: '#58FF5F',
        darkblue: '#1653AE',
        lightblue: '#C9DEFF',
        darkred: '#FF4848',
        lightred: '#FF9595',
      },
      maxWidth: {
        '2xs': '16rem',
      },
      maxHeight: {
        'screen60': '60vh',
       },
      height: {
        'screen60': '60vh',
      },
      boxShadow: {
        DEFAULT: '0 4px 4px rgba(0, 0, 0, 0.25), 0 4px 4px rgba(0, 0, 0, 0.25)',
      },
      zIndex: {
        '-1': '-1',
      },
      inset: {
        '1/8': '12.5%',
        '1/16': '6.25%',
      }
    },
  },
  variants: {
    extend: {
      borderWidth: ['last'],
    },
  },
  plugins: [],
}
