/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Poppins': ['Poppins','sans-serif'],
      },
      colors: {
        'maingreen': '#C2F2F2', // Add a custom color
      },

      boxShadow: {
        '3xl': ' 0 3px 25px 10px rgb(0 0 0 0.2);',
        '4xl': ' 0 3px 25px 10px rgb(0 0 0 0);',
      }
  },
  plugins: [],
}
};

