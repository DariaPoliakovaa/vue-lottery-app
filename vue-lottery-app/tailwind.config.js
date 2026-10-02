/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#e7a2c4',
        'primary-hover': '#cf679e',
        'gray-light': '#F3F4F6',
        'gray-disabled': '#D1D5DB'
      }
    },
  },
  plugins: [],
}
