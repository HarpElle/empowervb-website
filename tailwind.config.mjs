/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'empower-coral': '#FF7F50',
        'empower-lilac': '#C8A2C8',
        'empower-navy': '#1C1F4C',
        'empower-light-gray': '#E8E8E8',
        'empower-mid-gray': '#8C8C8C',
        'empower-dark-gray': '#525252',
      },
      fontFamily: {
        'heading': ['Sports Invation', 'sans-serif'],
        'body': ['Balegare', 'system-ui', 'sans-serif'],
      },
    },
  },
} 