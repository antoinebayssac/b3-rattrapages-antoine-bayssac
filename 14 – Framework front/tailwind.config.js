/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      padding: {
          page: '6rem',
          small: '0.25rem',
          mid: '0.5rem',
          big: '1rem',
      },
      colors: {
          pri: '#fb923c',
          sec: '#c084fc',
          bg: '#1c1917',
      },
      gap: {
          small: '0.25rem',
          mid: '0.5rem',
          big: '1rem',
      },
      width: {
        quarter: '24%',
        half: '49%'
      }
  },
  },
  plugins: [],
}