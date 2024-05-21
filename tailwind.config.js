/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      brightness: {
        125: "1.25",
        150: "1.5",
        175: "1.75",
        200: "2",
      },
    },
  },
  plugins: [],
};
