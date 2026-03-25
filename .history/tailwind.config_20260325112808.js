/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          'subtext': '#434245',
          'primary': '#75EEA5',
          'btn-text': '#'
        },
    }
  },
  plugins: [],
}

