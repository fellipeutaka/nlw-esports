/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      keyframes: {
        rgb: {
          "0%": { "background-position": "0" },
          "100%": { "background-position": "100%" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        dialogShow: {
          "0%": { opacity: "0", transform: "translate(-50%, -48%) scale(.96)" },
          "100%": { opacity: "1", transform: "translate(-50%, -50%) scale(1)" },
        },
      },
      animation: {
        rgb: "rgb 4s linear alternate infinite",
        fadeIn: "fadeIn 300ms cubic-bezier(0.16, 1, 0.3, 1)",
        dialogShow: "dialogShow 300ms cubic-bezier(0.16, 1, 0.3, 1)",
      },
      backgroundImage: {
        galaxy: "url('/bg.png')",
        "nlw-gradient":
          "linear-gradient(89.86deg, #9572FC 23.08%, #43E7AD 33.94%, #E1D55D 44.57%)",
        "rgb-gradient":
          "linear-gradient(45deg, #FFFF00, #00FF00, #0099FF, #001AFF, #A200FF, #FF0055, #FF0000, #FFFF00, #00FF00, #0099FF, #001AFF, #A200FF)",
        "game-gradient":
          "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)",
      },
    },
  },
  plugins: [],
};
