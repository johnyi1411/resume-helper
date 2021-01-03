module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        darkgreen: '#2AB22F',
        lightgreen: '#D9FFC1',
        darkblue: '#1653AE',
        lightblue: '#C9DEFF',
        darkred: '#FF4848',
      },
      maxWidth: {
        '2xs': '16rem',
      },
      boxShadow: {
        DEFAULT: '0 4px 4px rgba(0, 0, 0, 0.25), 0 4px 4px rgba(0, 0, 0, 0.25)',
      },
      zIndex: {
        '-1': '-1',
      },
      height: {
        '440px': '440px',
      },
      animation: {
        'infinite': 'move-bg 10s linear infinite',
      },
      keyframes: {
        'move-bg': {
          '0%':   { 'opacity': '0' },
          '100%': { 'opacity': '1' },
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
