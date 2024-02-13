// tailwind.config.js

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'quizard-purple': '#6C63FF', // Primary purple
        'quizard-blue': '#4A90E2', // Primary blue
        'quizard-green': '#4CAF50', // Primary green
        'quizard-yellow': '#FFC107', // Primary yellow
        'quizard-pink': '#FF1493', // Primary pink
        'quizard-background': '#F7F7F7', // Light background
        'quizard-text': '#333333', // Primary text color
        'quizard-gray': {
          100: '#F4F5F7',
          200: '#E5E7EB',
          300: '#D2D6DC',
          400: '#9FA6B2',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        'quizard': ['Roboto', 'sans-serif'], // Primary font family
        // Add more font families as needed
      },
      spacing: {
        'quizard-2': '0.5rem',
        'quizard-4': '1rem',
        'quizard-6': '1.5rem',
        'quizard-8': '2rem',
        // Add more spacing utilities as needed
      },
      boxShadow: {
        'quizard': '0 0 20px rgba(108, 99, 255, 0.5)', // Glow box shadow
        // Add more box shadow utilities as needed
      },
      borderRadius: {
        'quizard': '0.75rem', // Rounded corners
        // Add more border radius utilities as needed
      },
      // Add other theme extensions specific to the "Quizard" application
    },
  },
  plugins: [],
};
