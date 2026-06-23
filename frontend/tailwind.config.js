/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Redefine indigo to professional Royal Blue
        indigo: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc2fc',
          400: '#38a5f8',
          500: '#3b82f6',
          600: '#2563eb', // Royal Blue primary accent
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        // Redefine purple to professional slate-charcoal to create sleek gradients
        purple: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#334155', // Slate Steel Gray
          700: '#1e293b',
          800: '#0f172a',
          900: '#020617',
        }
      },
    },
  },
  plugins: [],
}
