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
        stiftung: {
          50: "#F0ECE0",
          100: "#E7E5CB",
          200: "#D7DCB2",
          300: "#BFD298",
          400: "#89BA5E",
          500: "#5FA545",
          600: "#3C8637",
          700: "#296631",
          800: "#1C4A2B",
          900: "#0D2114",
          950: "#050D08",
        },
        amber: {
          200: "#fdf1ce",
        },
        rust: {
          50: "#F4DBC9",
          100: "#F1CFB8",
          200: "#EAB896",
          300: "#E3A274",
          400: "#DC8B52",
          500: "#D57430",
          600: "#B86125",
          700: "#89481C",
          800: "#5B3012",
          900: "#2C1709",
          950: "#150B04",
        },
      },
      borderRadius: {
        handdrawn: "255px 15px 225px 15px/15px 225px 15px 255px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
