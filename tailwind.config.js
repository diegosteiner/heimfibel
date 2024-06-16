/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/**/*.{tsx,astro,html}",
    "./src/pages/**/*.{tsx,astro,html}",
    "./src/layouts/**/*.{tsx,astro,html}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          50: "#F3F7F7",
          100: "#E9F1F1",
          200: "#D4E3E2",
          300: "#B8D1D0",
          400: "#9CBEBD",
          500: "#7BA8A7",
          600: "#5B8B89",
          700: "#3B5A59",
          800: "#304A49",
          900: "#223434",
          950: "#121C1B",
        },
        gold: {
          50: "#FFFEFA",
          100: "#FFFCF5",
          200: "#FFFAEB",
          300: "#FFF7E0",
          400: "#FFF5D6",
          500: "#FFF2CC",
          600: "#FFD761",
          700: "#F5B800",
          800: "#CC9900",
          900: "#946F00",
          950: "#6B5000",
        },
      },
      gridTemplateColumns: {
        appshell: "1fr minmax(20em, 30vw)",
      },
      borderRadius: {
        handdrawn: "255px 15px 225px 15px/15px 225px 15px 255px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
