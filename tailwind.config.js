/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#09090b',
        'bg-2': '#111114',
        surface: '#18181b',
        'surface-2': '#1f1f23',
        border: '#2a2a30',
        'border-2': '#333340',
        text: '#f4f4f5',
        'text-2': '#a1a1aa',
        'text-3': '#71717a',
        cyan: '#06b6d4',
        'cyan-dim': 'rgba(6,182,212,0.12)',
        'cyan-glow': 'rgba(6,182,212,0.3)',
        green: '#22c55e',
        'green-dim': 'rgba(34,197,94,0.12)',
        red: '#ef4444',
        'red-dim': 'rgba(239,68,68,0.08)',
        amber: '#f59e0b',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.85rem',
        base: '1rem',
        lg: '1.05rem',
        xl: '1.2rem',
      }
    },
  },
  plugins: [],
}
