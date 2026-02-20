import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dwl-white': '#ffffff',
        'dwl-offwhite': '#fafafa',
        'dwl-black': '#0a0a0a',
        'dwl-body': '#262626',
        'dwl-gray': '#525252',
        'dwl-border': '#e5e5e5',
        'dwl-muted': '#737373',
        'dwl-light': '#f5f5f5',
      },
      fontFamily: {
        sans: ['var(--font-plex-mono)', 'IBM Plex Mono', 'Courier New', 'monospace'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
      },
      fontSize: {
        'micro': ['10px', { letterSpacing: '0.08em', lineHeight: '1.4' }],
        'meta': ['13px', { letterSpacing: '0.08em', lineHeight: '1.5' }],
        'body': ['18px', { lineHeight: '1.7' }],
        'h2': ['28px', { lineHeight: '1.2' }],
        'title': ['48px', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'hero': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
      },
      maxWidth: {
        'body': '680px',
        'wide': '1200px',
        'narrow': '480px',
      },
      spacing: {
        'section': '80px',
        'section-sm': '48px',
      },
    },
  },
  plugins: [],
}
export default config
