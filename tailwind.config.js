/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: false,
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}'
  ],
  theme: {
    extend: {
      keyframes: {
        boop: {
          '0%, 100%': { transform: 'scale(1)' },
          '10%': { transform: 'scale(0.9) rotate(-3deg)' },
          '50%': { transform: 'scale(1.2)' },
        }
      },
      animation: {
        boop: 'boop 500ms ease-in-out'
      }
    },
  },
  plugins: [require("daisyui")],
}
