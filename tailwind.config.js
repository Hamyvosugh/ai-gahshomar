/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'iransans': ['IRANSans', 'sans-serif'],
      },
      backdropBlur: {
        'xs': '2px',
      },
      borderWidth: {
        '0.5': '0.5px',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-gradient': {
          backgroundClip: 'text',
          '-webkit-background-clip': 'text',
          color: 'transparent',
        },
        '.backdrop-saturate': {
          backdropFilter: 'saturate(180%) blur(5px)',
          '-webkit-backdrop-filter': 'saturate(180%) blur(5px)',
        },
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'var(--color-ai-dark)',
          },
          '&::-webkit-scrollbar-thumb': {
            background: 'var(--color-ai-primary)',
            borderRadius: '3px',
          },
        },
        '.ai-clickable': {
          transition: 'all 0.2s ease',
          '&:hover': {
            transform: 'translateY(-1px)',
          },
          '&:active': {
            transform: 'translateY(0px)',
          },
        },
      };
      addUtilities(newUtilities);
    },
  ],
  darkMode: 'class',
};

export default config;