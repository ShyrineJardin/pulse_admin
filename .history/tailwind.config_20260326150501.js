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
          'btn-text': '#112432',
          'dark-primary': '#007C5E',
          'border': 'A0A0A0',
        },
    }
  },
  plugins: [],
}

