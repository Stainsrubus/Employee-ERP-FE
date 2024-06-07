/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      pacifico: ['Pacifico', 'cursive'],
    },
    extend: {
      screens:{
        'lg':{'max':'2030px'},
        'md':{'max':'1080px'},
        'sm':{'max':'500px'}
      }
    },
  },
  plugins: [],
}