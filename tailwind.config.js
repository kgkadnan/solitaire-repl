/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      // padding: "2rem",
      screens: {
        // "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        //*********Customize**************
        solitairePrimary: 'hsl(var(--solitaire-primary))', // dark - Emerald Green / light- white
        solitaireSecondary: 'hsl(var(--solitaire-secondary))', // dark - Emerald 7 / light- white
        solitaireTertiary: 'hsl(var(--solitaire-tertiary))', // dark - Emerald 1 / light- Carbon 6
        solitaireQuaternary: 'hsl(var(--solitaire-quaternary))', // dark - shadow / light- shadow
        solitaireQuinary: 'hsl(var(--solitaire-quinary))', // dark - Emerald Green / light-Carbon 3
        solitaireSenary: 'hsl(var(--solitaire-senary))', // dark -Emerald 4 / light- Carbon 3
        solitaireSeptenary: 'hsl(var(--solitaire-septenary))', // dark - Emerald 7 / light- shadow
        solitaireOctonary: 'hsl(var(--solitaire-octonary))', // dark - Emerald 7 / light- Carbon 1
        solitaireOutline: 'hsl(var(--solitaire-outline))', // dark - Emerald 4 / light- Carbon 2
        solitaireBorder: 'hsl(var(--solitaire-border))', // dark - Emerald 4 / light- white
        //********************* */
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        backgroundDark: 'hsl(var(--background-dark))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      fontFamily: {
        custom: ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
