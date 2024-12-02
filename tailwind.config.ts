import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--background)",
        "bg-primary": "var(--background-primary)",
        "bg-secondary": "var(--background-secondary)",
        "border-primary": "var(--border-primary)",
        "border-secondary": "var(--border-secondary)",
        "button-primary-bg": "var(--button-primary-background)",
        "button-primary-border": "var(--button-primary-border)",
        "button-primary-fg": "var(--button-primary-foreground)",
        "button-secondary-bg": "var(--button-secondary-background)",
        "button-secondary-border": "var(--button-secondary-border)",
        "button-secondary-fg": "var(--button-secondary-foreground)",
        "button-tertiary-bg": "var(--button-tertiary-background)",
        "button-tertiary-border": "var(--button-tertiary-border)",
        "button-tertiary-fg": "var(--button-tertiary-foreground)",
        "text-primary": "var(--text-primary)",
        "text-secondary": " var(--text-secondary)",
        "text-tertiary": "var(--text-tertiary)",
        "text-placeholder": "var(--text-placeholder)",
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
