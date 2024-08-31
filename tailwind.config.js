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
        '1530px': '1530px',
        '1600px': '1600px',
        '1920px': '1920px'
      }
    },
    extend: {
      // v2 theme typography
      fontSize: {
        sRegular: 'var(--font-size-sRegular)',
        sMedium: 'var(--font-size-sMedium)',
        sMobileRegular: 'var(--font-size-sMobileRegular)',
        mRegular: 'var(--font-size-mRegular)',
        mMedium: 'var(--font-size-mMedium)',
        mMedium10: 'var(--font-size-mMedium10)',
        lRegular: 'var(--font-size-lRegular)',
        lMedium: 'var(--font-size-lMedium)',
        headingS: 'var(--font-size-headingS)',
        headingM: 'var(--font-size-headingM)',
        headingL: 'var(--font-size-headingL)',
        headingXL: 'var(--font-size-headingXL)'
      },
      lineHeight: {
        sRegular: 'var(--line-height-sRegular)',
        sMedium: 'var(--line-height-sMedium)',
        sMobileRegular: 'var(--line-height-sMobileRegular)',
        mRegular: 'var(--line-height-mRegular)',
        mMedium: 'var(--line-height-mMedium)',
        mMedium10: 'var(--line-height-mMedium10)',
        lRegular: 'var(--line-height-lRegular)',
        lMedium: 'var(--line-height-lMedium)',
        headingS: 'var(--line-height-headingS)',
        headingM: 'var(--line-height-headingM)',
        headingL: 'var(--line-height-headingL)',
        headingXL: 'var(--line-height-headingXL)'
      },
      fontWeight: {
        regular: 'var(--font-weight-regular)',
        medium: 'var(--font-weight-medium)',
        semiBold: 'var(--font-weight-semiBold)',
        bold: 'var(--font-weight-bold)'
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      },
      colors: {
        //********************* */
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
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
        neutralShapeDefault: 'var(--neutral-shape-default)',
        neutralShapeHover: 'var(--neutral-shape-hover)',
        neutralShapeSelected: 'var(--neutral-shape-selected)',
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
        visRed: 'var(--vis-red)',
        infoMain: 'var(--info-main)',
        infoSurface: 'var(--info-surface)',
        infoBorder: 'var(--info-border)',
        infoHover: 'var(--info-hover)',
        infoPressed: 'var(--info-pressed)',
        infoFocus: 'var(--info-focus)',
        accentTeal: 'var(--accent-teal)',
        accentPurple: 'var(--accent-purple)',
        accentJade: 'var(--accent-jade)',
        accentGold: 'var(--accent-gold)',
        legendInCartFill: 'var(--legend-InCart-Fill)',
        lengendInCardBorder: 'var(--legend-Incart-border)',
        legendInCart: 'var(--legend-Incart)',
        legendHoldFill: 'var(--legend-OnHold-Fill)',
        lengendHoldBorder: 'var(--legend-OnHold-border)',
        legendHold: 'var(--legend-Hold)',
        legendMemoFill: 'var(--legend-Memo-fill)',
        lengendMemoBorder: 'var(--legend-memo-border)',
        legendMemo: 'var(--legend-Memo)',
        primaryModalRing: 'var(--primary-modal-ring)',
        primaryModalRingRed: 'var(--primary-modal-ring-red)',
        primaryModalFillRed: 'var(--primary-modal-fill-red)',

        gradientStart: 'hsla(198, 85%, 92%, 1)',
        gradientEnd: 'hsla(240, 100%, 95%, 1)'
      },
      screens: {
        // "2xl": "1400 px",
        xl: '1380px'
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
        },
        zoom: {
          '0%': { transform: 'scale(0.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        gradientAnimation: {
          '0%': { 'background-position': '0% 0%' },
          '50%': { 'background-position': '100% 100%' },
          '100%': { 'background-position': '0% 0%' }
        },
        worldMapPulse: {
          '0%': {
            boxShadow: '0 0 0 0 rgba(52, 68, 68, 0.7)' // Pulse starts from the center
          },
          '50%': {
            boxShadow: '0 0 0 10px rgba(52, 68, 68, 0)' /* Fully transparent */
          },
          '100%': {
            boxShadow: '0 0 0 0 rgba(52, 68, 68, 0)' /* Fully transparent */
          }
        },

        'horizontal-reveal': {
          '0%': { width: '0%', height: '0%' },
          '30%': { width: '50px', height: '0%' },
          '60%': { width: '50px', height: '80px' },
          '100%': { width: '100%', height: '100%' }
        },
        'slide-left': {
          from: {
            marginLeft: '100%'
          },
          to: {
            marginLeft: '0%'
          }
        },
        shimmer: {
          '0%': {
            backgroundPosition: '0 0'
          },
          '100%': {
            backgroundPosition: '-200% 0'
          }
        }
      },
      boxShadow: {
        inputShadow: 'var(--input-shadow)',
        popupsShadow: 'var(--popups-shadow)'
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        zoom: 'zoom 3s ease-in-out ',
        gradient: 'gradientAnimation 10s ease infinite',
        pulse: 'worldMapPulse 2s infinite',
        'horizontal-reveal': 'horizontal-reveal 2s linear forwards',
        slideLeft: 'slide-left 3s linear',
        shimmer: 'shimmer 2s linear infinite'
      },
      backgroundImage: {
        'animated-gradient': ` linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, white 100%),
            linear-gradient(90deg, #FFD490,#A5A5FF, #92DEFF, #9EFFE8)`,

        // linear-gradient(90deg, #44C4FC,#4AF6CD, #8989FD, #FFE0B0)`,
        // 'linear-gradient(180deg, #ffffff, #FFF4E3, #E8E8FF, #DBF2FC, #FFFFFF,#FFFFFF)',
        'timeline-gradient':
          'linear-gradient(to bottom, #FFAD05, #168B85, #5995ED)',
        'radial-grad-kam': 'radial-gradient(circle, #F9FAFB, #949495)'
      },
      backgroundSize: {
        200: '200% 200%'
      },
      transitionProperty: {
        height: 'height',
        spacing: 'margin, padding'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
