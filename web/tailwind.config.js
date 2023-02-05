/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        "primary" : "#482FF7",
        "offwhite" : "#D9DBE9",
        "placeholder" :"#9DA2B1",
        "darkblue" : "#21273D"
      },
      screens : {
        "sm" : "320px",
        "msm" : "0px"
      }
    },
  },
  plugins: [],
}
