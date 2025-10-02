/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0F19",
        accent: {
          cyan: "#00E0FF",
          purple: "#9D4EDD",
        },
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.05)",
          darker: "rgba(255, 255, 255, 0.02)",
        }
      },
    },
  },
  plugins: [],
}