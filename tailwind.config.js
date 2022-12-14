/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    colors: {
      lightBG: '#000000',
      lightContrast: '#ffffff'
    },
    extend: {},
    plugins: [
      require('tailwind-scrollbar-hide')
    ]
  }
}
