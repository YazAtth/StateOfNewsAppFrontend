/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    './src/components/Navbar.tsx',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      maxWidth: {
        custom: "1280px"
      },
      textColor: {
        standard: "#60A5FA",
        standardDark: "#5693de"
      },
      backgroundColor: {
        standard: "#60A5FA",
        standardDark: "#5693de",
        lightBlueCard: "#b2c6ea"
      },
      colors: {
        standardBlue: "#60A5FA",
        standardBlueDark: "#5693de"
      }
    },
  },
  plugins: [],
}

