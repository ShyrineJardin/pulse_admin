/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          'gradent': 'linear-gradient(from #ffffff to #f0f0f0)',
        },
    }
  },
  plugins: [],
}

