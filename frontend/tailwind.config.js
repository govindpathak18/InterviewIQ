/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 8px 30px rgba(34, 211, 238, 0.25)',
      },
      backgroundImage: {
        aurora:
          'radial-gradient(circle at 10% 20%, rgba(59,130,246,0.2), transparent 30%), radial-gradient(circle at 80% 0%, rgba(168,85,247,0.2), transparent 35%), radial-gradient(circle at 50% 80%, rgba(34,211,238,0.2), transparent 30%)',
      },
    },
  },
  plugins: [],
};
