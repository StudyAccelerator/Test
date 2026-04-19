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
        brand: {
          purple: "#2E2557",
          "purple-light": "#3d3370",
          cream: "#F3EBD8",
          "cream-dark": "#E8D9BF",
          gold: "#C9A96E",
          "gold-light": "#e0b577",
          text: "#1a1535",
          muted: "#777",
          "light-gray": "#f8f7f5",
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
