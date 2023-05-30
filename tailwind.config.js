/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'cello': {
          DEFAULT: '#1E3560',
          50: '#C4D2EC',
          100: '#B4C6E8',
          200: '#95AEDE',
          300: '#7697D4',
          400: '#577FCA',
          500: '#3B68BD',
          600: '#31579E',
          700: '#28467F',
          800: '#1E3560',
          900: '#111D35',
          950: '#0A1220'
        },
      }
    },
  },
  plugins: [],
}
