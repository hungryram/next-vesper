/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
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
            maxWidth: '1300px',
          },
        }
      })
    }
  ],
}
