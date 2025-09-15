import type { Config } from "tailwindcss";
import radixPlugin from "tailwindcss-radix";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
      },
      animation: {
        fadeIn: "fadeIn 200ms ease-out",
        fadeOut: "fadeOut 200ms ease-in",
      },
    },
  },
  plugins: [radixPlugin],
};

export default config;
