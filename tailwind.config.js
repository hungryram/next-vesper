/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    {
      pattern: /grid-cols-(1|2|3|4|5|6|7|8|9|10|11|12)/,
    }
  ],
  theme: {
    container: {
      center: true
    },
    extend: {},
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.container': {
          paddingLeft: '20px',
          paddingRight: '20px',
          '@screen xl': {
            maxWidth: '1400px',
          },
        }
      })
    }
  ],
}
