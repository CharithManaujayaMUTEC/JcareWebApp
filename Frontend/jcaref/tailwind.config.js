/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: {
    content: ['./src/**/*.html', './src/**/*.js'],
    safelist: ['dark'],
  },
  content: [],
  theme: {
    extend: {
      
      fontFamily: {
      'Montserrat': ['Montserrat', 'Montserrat-serif']
    }},
  },
  plugins: [],
}
