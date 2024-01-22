/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      // padding: "2rem",
      screens: {
        // "2xl": "1400px",
      }
    },
    extend: {
      // v2 theme typography
      fontSize: {
        sRegular: '12px',
        sMedium: '12px',
        sMobileRegular: '10px',
        mRegular: '14px',
        mMedium: '14px',
        mMedium10: '10px',
        lRegular: '16px',
        lMedium: '16px',
        headingS: '20px',
        headingM: '28px',
        headingL: '36px',
        headingXL: '48px'
      },
      fontWeight: {
        regular: 400,
        medium: 500,
        semiBold: 600,
        bold: 700
      },
      lineHeight: {
        sRegular: '1.33',
        sMedium: '1.33',
        sMobileRegular: '1.6',
        mRegular: '1.5',
        mMedium: '1.5',
        mMedium10: '1.6',
        lRegular: '1.5',
        lMedium: '1.5',
        headingS: '1.5',
        headingM: '1.5',
        headingL: '1.5',
        headingXL: '1.5'
      },
      fontFamily: {
        custom: ['Inter', 'sans-serif']
      },
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
        solitaireNonary: 'hsl(var(--solitaire-nonary))', // dark - Emerald 7 / light- Carbon 1
        solitaireDenary: 'hsl(var(--solitaire-denary))', // dark - Emerald 7 / light- Carbon 1
        solitaireOutline: 'hsl(var(--solitaire-outline))', // dark - Emerald 4 / light- Carbon 2
        solitaireBorder: 'hsl(var(--solitaire-border))', // dar  - Emerald 4 / light- white
        solitaireError: 'hsl(var(--solitaire-error))', // dark - Error / light- Error
        solitaireSuccess: 'hsl(var(--solitaire-success))', // dark - Success / light- Success
        //********************* */
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        backgroundDark: 'hsl(var(--background-dark))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },

        // v2 UI theme
        neutral0: 'var(--neutral-0)',
        neutral25: 'var(--neutral-25)',
        neutral50: 'var(--neutral-50)',
        neutral100: 'var(--neutral-100)',
        neutral200: 'var(--neutral-200)',
        neutral300: 'var(--neutral-300)',
        neutral400: 'var(--neutral-400)',
        neutral500: 'var(--neutral-500)',
        neutral600: 'var(--neutral-600)',
        neutral700: 'var(--neutral-700)',
        neutral800: 'var(--neutral-800)',
        neutral900: 'var(--neutral-900)',
        primaryMain: 'var(--primary-main)',
        primarySurface: 'var(--primary-surface)',
        primaryBorder: 'var(--primary-border)',
        primaryHover: 'var(--primary-hover)',
        primaryPressed: 'var(--primary-pressed)',
        primaryFocus: 'var(--primary-focus)',
        primaryIconColor: 'var(--primary-icon-color)',
        dangerMain: 'var(--danger-main)',
        dangerSurface: 'var(--danger-surface)',
        dangerBorder: 'var(--danger-border)',
        dangerHover: 'var(--danger-hover)',
        dangerPressed: 'var(--danger-pressed)',
        dangerFocus: 'var(--danger-focus)',
        successMain: 'var(--success-main)',
        successSurface: 'var(--success-surface)',
        successBorder: 'var(--success-border)',
        successHover: 'var(--success-hover)',
        successPressed: 'var(--success-pressed)',
        successFocus: 'var(--success-focus)',
        warningMain: 'var(--warning-main)',
        warningSurface: 'var(--warning-surface)',
        warningBorder: 'var(--warning-border)',
        warningHover: 'var(--warning-hover)',
        warningPressed: 'var(--warning-pressed)',
        warningFocus: 'var(--warning-focus)',
        infoMain: 'var(--info-main)',
        inputShadow: 'var(--input-shadow)',
        popupsShadow: 'var(--popups-shadow)',
        infoSurface: 'var(--info-surface)',
        infoBorder: 'var(--info-border)',
        infoHover: 'var(--info-hover)',
        infoPressed: 'var(--info-pressed)',
        infoFocus: 'var(--info-focus)',
        accentTeal: 'var(--accent-teal)',
        accentPurple: 'var(--accent-purple)',
        accentJade: 'var(--accent-jade)',
        accentGold: 'var(--accent-gold))'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
