import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        mono: ['Monaco', 'Menlo', 'Ubuntu Mono', 'Consolas', 'source-code-pro', 'monospace'],
      },
      borderWidth: {
        "0.75": "0.75px",
      },
      colors: {
        // Shadcn/ui base colors
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },

        // Desktop Environment (Minimal Foundation)
        desktop: {
          primary: '#050505',    // Void Black
          secondary: '#0a0a0a',  // Charcoal Gray
          border: '#1a1a1a',    // Ember Gray
          muted: '#333333',      // Smoke Mist
        },
        
        // App Content (Eye-Friendly Focus)
        app: {
          primary: '#183d56',    // Deep Slate
          secondary: '#2a4a73',  // Ocean Blue
          accent: '#3b8fdb',     // Aurora Blue
          light: '#87ceeb',      // Frost Blue
        },
        
        // Aurora Accents
        aurora: {
          orange: '#dc603f',     // Aurora Orange
          coral: '#ff7f5c',      // Coral Accent
          success: '#10b981',    // Success Emerald
          white: '#ffffff',      // Pure White
        }
      },
      
      // Custom gradients for aurora effects
      backgroundImage: {
        'desktop-aurora': 'radial-gradient(ellipse at 30% 70%, rgba(220, 96, 63, 0.1) 0%, transparent 70%), radial-gradient(ellipse at 70% 30%, rgba(59, 143, 219, 0.08) 0%, transparent 70%)',
        'app-gradient': 'linear-gradient(135deg, #183d56, #2a4a73)',
        'aurora-glow': 'linear-gradient(45deg, #dc603f, #3b8fdb)',
      },
      
      // Custom shadows
      boxShadow: {
        'desktop': '0 20px 40px rgba(0, 0, 0, 0.3)',
        'app': '0 10px 30px rgba(24, 61, 86, 0.2)',
        'aurora': '0 0 20px rgba(220, 96, 63, 0.3)',
      },
      
      // Custom animations
      animation: {
        'aurora-pulse': 'aurora-pulse 4s ease-in-out infinite',
        'fade-in': 'fade-in 0.5s ease-out',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in": "slide-in 0.5s ease-out",
        marquee: "marquee var(--duration) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
        "carousel-progress": "carousel-progress var(--duration) linear",
        "gradient": "gradient 3s linear infinite",
      },
      
      keyframes: {
        'aurora-pulse': {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        "carousel-progress": {
          from: { width: "0%" },
          to: { width: "100%" },
        },
        "gradient": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config