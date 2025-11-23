/**
 * BuraqX Design System Tokens
 * Ultra-premium dark theme design tokens
 */

export const colors = {
  // Base backgrounds
  dark: '#0A0A0B',
  surface: '#0F1113',
  surfaceHover: '#14161A',
  surfaceActive: '#1A1C20',
  
  // Glass surfaces (with alpha)
  glass: {
    subtle: 'rgba(255, 255, 255, 0.03)',
    medium: 'rgba(255, 255, 255, 0.05)',
    strong: 'rgba(255, 255, 255, 0.08)',
  },
  
  // Text
  text: {
    primary: '#FFFFFF',
    secondary: '#D1D5DB',
    muted: '#9AA0A6',
    disabled: '#6B7280',
  },
  
  // Accent & Interactive
  accent: {
    primary: '#8DE0FF',
    hover: '#A8E8FF',
    active: '#6DD4F5',
  },
  
  // Borders
  border: {
    subtle: 'rgba(255, 255, 255, 0.06)',
    medium: 'rgba(255, 255, 255, 0.1)',
    strong: 'rgba(255, 255, 255, 0.15)',
  },
  
  // Status
  success: '#34D399',
  warning: '#FBBF24',
  error: '#F87171',
} as const;

export const typography = {
  fontFamily: {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Inter", system-ui, sans-serif',
    mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", monospace',
  },
  
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    hero: 'clamp(3rem, 8vw, 6rem)', // 48px–96px responsive
  },
  
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  
  lineHeight: {
    tight: 1.2,
    snug: 1.375,
    normal: 1.5,
    relaxed: 1.625,
  },
  
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.01em',
  },
} as const;

export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
} as const;

export const radius = {
  sm: '0.375rem',   // 6px
  md: '0.5rem',     // 8px
  lg: '0.75rem',    // 12px
  xl: '1rem',       // 16px
  '2xl': '1.5rem',  // 24px
  full: '9999px',   // pill shape
} as const;

export const shadows = {
  // Soft layered shadows for depth
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.4)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.6)',
  
  // Glass inset shadows
  inset: 'inset 0 1px 2px 0 rgba(255, 255, 255, 0.05)',
  glassInset: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1), inset 0 -1px 0 0 rgba(0, 0, 0, 0.2)',
  
  // Glow effects
  glow: '0 0 20px rgba(141, 224, 255, 0.15)',
  glowStrong: '0 0 30px rgba(141, 224, 255, 0.25)',
} as const;

export const motion = {
  duration: {
    instant: '120ms',
    fast: '180ms',
    normal: '280ms',
    slow: '400ms',
    slower: '600ms',
  },
  
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  
  // Framer Motion variants
  variants: {
    fadeIn: {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
    },
    
    fadeInScale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },
    
    slideIn: {
      initial: { opacity: 0, x: -20 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 20 },
    },
    
    scaleIn: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 0.9, opacity: 0 },
    },
  },
  
  // Transition presets
  transitions: {
    fast: { duration: 0.18, ease: [0.4, 0, 0.2, 1] },
    normal: { duration: 0.28, ease: [0.4, 0, 0.2, 1] },
    spring: { type: 'spring', stiffness: 300, damping: 30 },
    bounce: { type: 'spring', stiffness: 400, damping: 25 },
  },
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
} as const;

// Accessibility
export const accessibility = {
  minTouchTarget: '44px',
  focusRingWidth: '2px',
  focusRingOffset: '2px',
  focusRingColor: colors.accent.primary,
} as const;

// Export all tokens
export const designTokens = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  motion,
  breakpoints,
  zIndex,
  accessibility,
} as const;

export default designTokens;
