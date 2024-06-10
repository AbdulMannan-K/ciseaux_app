/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}", "./src/**/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
        colors: {
            primaryBlue:'#6A7FDB',
            primarySilver:'#BFC1C2',
            primaryLilac:'#C8A2C8',
            primaryPearl:'#F2EDE4',
            primaryBlack:'#343434',
        },
        fontFamily: {
            body: ["Nunito"],
        },
        borderWidth: {
            6: "6px",
        },
        borderRadius: {
            "4xl": "2rem",
        },
    },
  },
  plugins: [],
}

