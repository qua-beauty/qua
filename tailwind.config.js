/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "button-border": "rgba(17, 14, 52, 0.16)",
        "text-primary": "#110e34",
        pink: "#ffcbcb",
        secondary: "rgba(17, 14, 52, 0.54)",
        darkslategray: "#323232",
        "text-white": "#fff",
        "brand-lime": "#edffb1",
        blueviolet: "rgba(137, 81, 255, 0.96)",
        telegram: "#8951ff",
        gray: "rgba(255, 255, 255, 0.62)",
        black: "#000",
      },
      fontFamily: {
        "sf-pro-text": "'SF Pro Text'",
        "sf-pro-display": "'SF Pro Display'",
        quicksand: "Quicksand",
      },
      borderRadius: {
        "21xl": "40px",
        "13xl": "32px",
      },
    },
    fontSize: {
      mid: "1.06rem",
      sm: "0.88rem",
      smi: "0.81rem",
      "4xs": "0.56rem",
      base: "1rem",
      lg: "1.13rem",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
