/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    theme: {
      fontSize: {
        xs: ["2.4rem", { lineHeight: "2.2rem" }],
        sm: ["0.875rem", { lineHeight: "1.25rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.75rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
        "5xl": ["3rem", { lineHeight: "1" }],
      },
    },
    extend: {
      animation: {
        "mobileView": "wiggle .3s ease"
      },
      keyframes: {
        wiggle: {
          '0%':  {transform: 'translateY(-130%)'} ,
          '100%':  {transform: 'translateY(0)'}, 
        }
      },

      colors: {
        black: "#04152d",
        black2: "#041226",
        black3: "#020c1b",
        "black-lighter": "#1c4b91",
        "black-light": "#173d77",
        // pink: "#da2f68",
        // orange: "#f89e00",
        pink: '#0968E5',
        // orange: '#00DBDF',
        orange: '#00a2a5',
        ...defaultTheme.colors,
      },
      maxWidth: {
        '800': "800px",
        '1200': "1200px",
        ...defaultTheme.maxWidth,
      },
    },
  },
  plugins: [],
};
