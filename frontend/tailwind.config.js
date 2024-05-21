/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
          lg: '2rem',
          xl: '0rem',
          '2xl': '0rem',
        },
        margin: {
          DEFAULT: '0px auto'
        }
      },
      colors: {
        'primary': '#614ab3',
        'acent': '#ff5e4e',
        // 'acent': '#ff7e47',
        // 'acent': '#38bdf8',
        'extralightacent': '#d7f2fe',
        'riskpage-container': '#f8f9fd',
        'gray': '#f2f2f2',
        'border-gray': '#d1d5db',
        'hover-back': '#eeeff4',
        'dark-gray': '#7f7f7f',
        'light-gray': '#ebebeb',
        'blue': '#0076e1',
        'extra-light-gray': '#cccccc',
        'yellow': '#fbbf24',
        'red': '#dc2626',
        'green': '#15803d',
        'lightGreen': '#dcfce7',
        'rose': '#e11d48',
        'lightRose': "#ffe4e6",
        'orange': '#fb923c',
        'lightOrange': '#ffedd5',
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
      },
      boxShadow: {
        'theme': '0px 0px 15px 1px rgba(0,0,0,0.1)',
      },
      // colors: {
      //   border: "hsl(var(--border))",
      //   input: "hsl(var(--input))",
      //   ring: "hsl(var(--ring))",
      //   background: "hsl(var(--background))",
      //   foreground: "hsl(var(--foreground))",
      //   primary: {
      //     DEFAULT: "hsl(var(--primary))",
      //     foreground: "hsl(var(--primary-foreground))",
      //   },
      //   secondary: {
      //     DEFAULT: "hsl(var(--secondary))",
      //     foreground: "hsl(var(--secondary-foreground))",
      //   },
      //   destructive: {
      //     DEFAULT: "hsl(var(--destructive))",
      //     foreground: "hsl(var(--destructive-foreground))",
      //   },
      //   muted: {
      //     DEFAULT: "hsl(var(--muted))",
      //     foreground: "hsl(var(--muted-foreground))",
      //   },
      //   accent: {
      //     DEFAULT: "hsl(var(--accent))",
      //     foreground: "hsl(var(--accent-foreground))",
      //   },
      //   popover: {
      //     DEFAULT: "hsl(var(--popover))",
      //     foreground: "hsl(var(--popover-foreground))",
      //   },
      //   card: {
      //     DEFAULT: "hsl(var(--card))",
      //     foreground: "hsl(var(--card-foreground))",
      //   },
      // },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    backgroundImage: {
      'header-menu-items': "linear-gradient(90deg,rgba(255,255,255,.05),rgba(255,255,255,.1) 50%,rgba(255,255,255,.05))",
      'hero-section': "url('https://assets-global.website-files.com/633d92770fc68548a10ca623/65a7c4df41cfc072e497da15_NOISE%20\(lower%20opacity\).webp'),linear-gradient(to bottom,var(--gradient--midnight--1)15%,var(--gradient--midnight--2)75%,var(--gradient--midnight--3))"
      // 'ticket-svg': "url('./src/assets/images/svg/ticket.svg')",
    }

  },
  plugins: [require("tailwindcss-animate")],
}