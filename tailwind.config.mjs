/** @type {import('tailwindcss').Config} */
import { addDynamicIconSelectors } from '@iconify/tailwind'

export default {
  content: ['./src/**/*.{mjs,js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: [addDynamicIconSelectors(['mdi-light', 'vscode-icons'])]
}
