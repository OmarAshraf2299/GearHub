/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neutral-primary': '#ffffff',
        'neutral-secondary-soft': '#f9fafb',
        'neutral-tertiary': '#f3f4f6',
        'heading': '#111827',
        'body': '#4b5563',
        'brand': '#1d4ed8',
        'fg-brand': '#1d4ed8',
        'default': '#e5e7eb',
      },
      borderRadius: {
        'base': '0.5rem',
      }
    },
  },
  plugins: [],
}