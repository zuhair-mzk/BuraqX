import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Ultra-premium design system colors
      colors: {
        // Base dark theme
        'dark': '#0d0d0f',
        'surface': {
          DEFAULT: '#151517',
          hover: '#1a1a1c',
          active: '#1f1f21',
        },
        // Glass surfaces
        'glass': {
          subtle: 'rgba(255, 255, 255, 0.03)',
          medium: 'rgba(255, 255, 255, 0.05)',
          strong: 'rgba(255, 255, 255, 0.08)',
        },
        // Text hierarchy
        'text': {
          primary: '#FFFFFF',
          secondary: '#D1D5DB',
          muted: '#9AA0A6',
          disabled: '#6B7280',
        },
        // Accent colors
        'accent': {
          DEFAULT: '#8DE0FF',
          hover: '#A8E8FF',
          active: '#6DD4F5',
        },
        // Borders
        'border': {
          subtle: 'rgba(255, 255, 255, 0.06)',
          medium: 'rgba(255, 255, 255, 0.1)',
          strong: 'rgba(255, 255, 255, 0.15)',
        },
        // Status colors
        'success': '#34D399',
        'warning': '#FBBF24',
        'error': '#F87171',
      },
      
      // Typography
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', '"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"SF Mono"', 'Monaco', '"Cascadia Code"', '"Roboto Mono"', 'monospace'],
      },
      
      fontSize: {
        'hero': 'clamp(3rem, 8vw, 6rem)',
      },
      
      letterSpacing: {
        tighter: '-0.02em',
      },
      
      // Spacing scale
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      
      // Border radius
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      
      // Premium shadows
      boxShadow: {
        'glass': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 0 rgba(0, 0, 0, 0.2)',
        'glass-sm': 'inset 0 1px 2px 0 rgba(255, 255, 255, 0.05)',
        'glow': '0 0 20px rgba(141, 224, 255, 0.15)',
        'glow-strong': '0 0 30px rgba(141, 224, 255, 0.25)',
        'premium-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'premium': '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        'premium-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4)',
        'premium-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
        'premium-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
      },
      
      // Background patterns
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-premium': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03))',
      },
      
      // Backdrop blur
      backdropBlur: {
        xs: '2px',
      },
      
      // Animations
      animation: {
        'fade-in': 'fadeIn 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-fast': 'fadeIn 0.18s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-up': 'fadeInUp 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-in': 'slideIn 0.28s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scroll-left': 'scrollLeft 25s linear infinite',
        'scroll-right': 'scrollRight 25s linear infinite',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        scrollLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-33.333%)' },
        },
        scrollRight: {
          '0%': { transform: 'translateX(-33.333%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      
      // Z-index scale
      zIndex: {
        '60': '60',
        '70': '70',
      },
      
      // Transitions
      transitionDuration: {
        '120': '120ms',
        '180': '180ms',
        '280': '280ms',
      },
      
      transitionTimingFunction: {
        'premium': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
export default config
