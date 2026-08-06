/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg-main)',
        alt: 'var(--bg-secondary)',
        section: 'var(--bg-section)',
        card: 'var(--card-bg)',
        'card-glass': 'var(--card-glass)',
        line: 'var(--border-subtle)',
        ink: 'var(--text-primary)',
        heading: 'var(--text-heading)',
        muted: 'var(--text-muted)',
        accent: {
          DEFAULT: 'var(--accent-primary)',
          hover: 'var(--accent-hover)',
          small: 'var(--accent-small)',
        },
        success: '#10B981',
      },
      fontFamily: {
        sans: ['Satoshi', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: 'var(--shadow-soft)',
        glass: '0 8px 32px rgba(0,0,0,0.06)',
        nav: 'var(--shadow-nav)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      transitionTimingFunction: {
        premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 40s linear infinite',
        'float': 'float 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
