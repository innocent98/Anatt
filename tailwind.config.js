/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        "primary": "rgba(3, 64, 120, 1)",
        "gray": "rgba(174, 171, 171, 1)",
        "secondary": "rgba(221, 161, 94, 1)",
        "lightgray":"rgba(236, 236, 236, 1)",
        "semilightgray": "rgba(217, 217, 217, 1)",
        "green":"rgba(12, 99, 26, 1)",
        "yellow": "rgba(249, 199, 79, 1)",
        "red":"rgba(215, 48, 62, 1)"
      },
    },
  },
  plugins: [],
};
