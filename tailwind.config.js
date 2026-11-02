/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kaizen: {
          red: {
            DEFAULT: '#DC2626',
            light: '#EF4444',
            dark: '#991B1B',
            deep: '#7F1D1D',
            glow: 'rgba(220, 38, 38, 0.4)',
          },
          dark: {
            DEFAULT: '#09090B',
            surface: '#121215',
            card: '#18181B',
            border: '#27272A',
            muted: '#71717A',
          },
          paper: {
            DEFAULT: '#FFFFFF',
            subtle: '#FAFAFA',
            muted: '#F4F4F5',
            border: '#E4E4E7',
          }
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        japanese: ['"Noto Sans JP"', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}

