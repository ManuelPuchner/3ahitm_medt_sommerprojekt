/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-blue": "#0070f3",
        "primary-turquoise": "#6CB6DD",
        "primary-orange": "#F39200",
        "primary-red": "#BE1622",
      },
    },
  },
  plugins: [],
};
