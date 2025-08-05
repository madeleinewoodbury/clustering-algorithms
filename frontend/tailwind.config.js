/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "480px",
        md: "768px",
        lg: "992px",
        xl: "1100px",
      },
      container: {
        screens: {
          sm: "480px",
          md: "768px",
          lg: "992px",
          xl: "1100px",
        },
        padding: "2rem",
      },
    },
  },
  plugins: [],
};
