import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#0B1F3A",
          blue: "#12345B",
          "blue-mid": "#1E4A7A",
          copper: "#C7925B",
          "copper-soft": "#D6A879",
          sand: "#E8D2BA",
          bg: "#F7F4EF",
          "bg-alt": "#F1EEE8",
          surface: "#FFFFFF",
          border: "#E7E5E1",
          text: "#1F2937",
          "text-muted": "#475569",
          "text-on-dark": "#F8FAFC",
        },
      },
      boxShadow: {
        "brand-soft": "0 10px 30px -15px rgba(11, 31, 58, 0.28)",
      },
    },
  },
};

export default config;