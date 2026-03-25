/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
        colors: {
          'gradent': 'linear-gradient(from #ffffff to #C9FCE9)',
        },
    }
  },
  plugins: [],
}

