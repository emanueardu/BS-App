import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "var(--brand-navy)",
          blue: "var(--brand-blue)",
          "blue-mid": "var(--brand-blue-mid)",
          copper: "var(--brand-copper)",
          "copper-soft": "var(--brand-copper-soft)",
          sand: "var(--brand-sand)",
          electric: "var(--electric)",
          "electric-soft": "var(--electric-soft)",
          energy: "var(--energy)",
          "energy-soft": "var(--energy-soft)",
          bg: "var(--brand-bg)",
          "bg-alt": "var(--brand-bg-alt)",
          surface: "var(--brand-surface)",
          border: "var(--brand-border)",
          text: "var(--brand-text)",
          "text-muted": "var(--brand-text-muted)",
          "text-on-dark": "var(--brand-text-on-dark)",
        },
        ok: "var(--ok)",
        off: "var(--off)",
        info: "var(--info)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        lg: "0.625rem",
        xl: "0.875rem",
        "2xl": "1.125rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        "brand-soft": "var(--brand-soft)",
        e1: "var(--shadow-e1)",
        e2: "var(--shadow-e2)",
        e4: "var(--shadow-e4)",
        "glow-electric": "var(--glow-electric)",
        "glow-energy": "var(--glow-energy)",
      },
    },
  },
  plugins: [],
};

export default config;
