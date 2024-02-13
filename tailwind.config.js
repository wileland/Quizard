/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // update this line to match the file patterns of your project
  theme: {
    extend: {
      colors: {
        'neon-purple': '#A020F0', // Replace with the exact hex codes you prefer
        'neon-blue': '#7DF9FF',
        'neon-pink': '#FF1493',
        'neon-yellow': '#FFFF33', // Add more colors as needed
      },
      fontFamily: {
        'wizard': ['"Merriweather"', 'serif'], // Replace with your chosen font-family
        // Add other font families as needed
      },
      // Add other theme extensions as needed
    },
  },
  plugins: [],
  // Add any Tailwind CSS plugins you plan to use here
}
