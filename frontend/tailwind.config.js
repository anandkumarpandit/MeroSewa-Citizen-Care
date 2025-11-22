/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionProperty: {
        'width': 'width',
        'opacity': 'opacity',
        'transform': 'transform',
      }
    },
  },
  plugins: [],
}


