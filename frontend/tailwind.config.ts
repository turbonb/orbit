import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}"
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px"
      }
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-fahkwang)", "system-ui", "sans-serif"],
        display: ["var(--font-game-paused)", "var(--font-fahkwang)", "sans-serif"]
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        brand: {
          void: "hsl(var(--brand-void))",
          indigo: "hsl(var(--brand-persian-indigo))",
          tekhelet: "hsl(var(--brand-tekhelet))",
          amethyst: "hsl(var(--brand-amethyst))",
          sunset: "hsl(var(--brand-sunset))",
          orange: "hsl(var(--brand-princeton))",
          aurora: "hsl(var(--brand-aurora))",
          celeste: "hsl(var(--brand-celeste))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      boxShadow: {
        "orbit-xl": "0 25px 80px hsl(var(--brand-void) / 0.55)",
        "orbit-lg": "0 18px 55px hsl(var(--brand-persian-indigo) / 0.45)",
        "orbit-emblem": "0 22px 70px hsl(var(--brand-persian-indigo) / 0.55)",
        "orbit-card": "0 22px 70px hsl(var(--brand-void) / 0.5)"
      },
      dropShadow: {
        orbit: "0 18px 70px hsl(var(--glow-warm) / 0.4)",
        "orbit-logo": "0 16px 55px hsl(var(--glow-warm) / 0.45)"
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.95)", opacity: "0.6" },
          "75%": { transform: "scale(1.25)", opacity: "0" },
          "100%": { transform: "scale(1.35)", opacity: "0" }
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out forwards",
        "pulse-ring": "pulse-ring 2s cubic-bezier(0.65, 0, 0.35, 1) infinite",
        marquee: "marquee 32s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
