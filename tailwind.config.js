/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,jsx,tsx}',
    "./screens/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/components/*.tsx",
    "./src/screens/*.tsx"
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#fb923c",
        "secondary": "#F97316",
        "tertiary": "",
        "error": "#dc2626"
      },
    },
  },
  plugins: [],
}

