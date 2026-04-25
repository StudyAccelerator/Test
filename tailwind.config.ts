import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        card: "hsl(var(--card))",
        "card-foreground": "hsl(var(--card-foreground))",
        primary: "var(--primary)",
        "primary-light": "var(--primary-light)",
        brand: {
          purple: "#2E2557",
          "purple-light": "#3d3370",
          cream: "#FBF8F3",
          "cream-dark": "#F3EBD8",
          gold: "#C9A96E",
          "gold-light": "#e0b577",
          text: "#1a1535",
          muted: "#777",
          "light-gray": "#FAF8F4",
        },
      },
      fontFamily: {
        serif: ['Georgia', '"Times New Roman"', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
