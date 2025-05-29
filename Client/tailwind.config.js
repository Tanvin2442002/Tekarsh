/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        zentry: ["zentry", "sans-serif"],
        general: ["general", "sans-serif"],
        "Poppins": ["Poppins", "sans-serif"],
        "Martel": ["Martel", "sans-serif"],
        "kanit": ["Kanit", "sans-serif"],
        "Bai_Jamjuree": ["Bai Jamjuree", "sans-serif"],
        sans: ["Inter", "sans-serif"],
        "circular-web": ["circular-web", "sans-serif"],
        "robert-medium": ["robert-medium", "sans-serif"],
        "robert-regular": ["robert-regular", "sans-serif"],
      },
      clipPath: {
        "custom-full": "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
      },
      colors: {
        blue: {
          50: "#DFDFF0",
          75: "#dfdff2",
          100: "#F0F2FA",
          200: "#010101",
          300: "#4FB7DD",
        },
        violet: {
          300: "#5724ff",
        },
        yellow: {
          100: "#8e983f",
          300: "#edff66",
        },
      },
    },
  },
  plugins: [],
};
