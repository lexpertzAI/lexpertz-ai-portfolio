import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          // The exact background color for high-contrast OLED screens
          black: "#050505", 
          // my Logo's Primary Cyan (Bright & Electric)
          cyan: "#06b6d4", 
          // my Logo's Secondary Blue (Deep & Trustworthy)
          blue: "#2563eb", 
          // Neutral Zinc for borders/text
          zinc: "#18181b",
        },
      },
      backgroundImage: {
        // Standardized gradient for text-clips and buttons
        "brand-gradient": "linear-gradient(135deg, #06b6d4 0%, #2563eb 100%)",
        // Subtle glow for backgrounds
        "brand-glow": "radial-gradient(circle at center, rgba(6,182,212,0.15) 0%, transparent 70%)",
      },
    },
  },
  plugins: [],
};
export default config;
