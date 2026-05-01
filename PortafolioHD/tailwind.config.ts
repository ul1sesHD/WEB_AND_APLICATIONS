import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base oscura
        "deep-blue": "#061125",
        "dark-blue": "#122D70",
        // Acentos neón
        "neon-violet": "#5C58ED",
        "neon-cyan": "#56E1E8",
        "neon-blue": "#3FA9F5",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "neon-gradient": "linear-gradient(135deg, #56E1E8 0%, #5C58ED 100%)",
        "blue-gradient": "linear-gradient(135deg, #061125 0%, #122D70 100%)",
      },
      boxShadow: {
        "neon-cyan": "0 0 20px rgba(86, 225, 232, 0.5), 0 0 40px rgba(86, 225, 232, 0.2)",
        "neon-violet": "0 0 20px rgba(92, 88, 237, 0.5), 0 0 40px rgba(92, 88, 237, 0.2)",
        "neon-blue": "0 0 20px rgba(63, 169, 245, 0.5), 0 0 40px rgba(63, 169, 245, 0.2)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "neon-pulse": "neonPulse 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
        "gradient-shift": "gradientShift 8s ease infinite",
      },
      keyframes: {
        neonPulse: {
          "0%, 100%": { opacity: "1", filter: "brightness(1)" },
          "50%": { opacity: "0.85", filter: "brightness(1.3)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          from: { boxShadow: "0 0 10px rgba(86, 225, 232, 0.4)" },
          to: { boxShadow: "0 0 30px rgba(92, 88, 237, 0.7)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
