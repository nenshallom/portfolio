import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05050A", 
        primary: "#8B5CF6", 
        accent: "#22C55E",
        muted: "#9CA3AF",
      },
    },
  },
  plugins: [],
};
export default config;