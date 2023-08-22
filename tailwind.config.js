/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {
      padding:{
        '1/3':'33,33333%',
        '2/3':'66,66666%'
      },
      aspectRatio: {
        '1/1': '1/1',
        '4/3': '4 / 3',
        '1/3': '1/3',
        '3/2': '3/2',
        '2/3': '2/3',
        '6/4': '6/4'
      },
    },
  },
  plugins: [],
}

