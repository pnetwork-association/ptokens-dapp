/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Assistant"'
        ],
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#156BF4",
          "secondary": "#101929",
          "secondary-focus": "#1e293b",
          "secondary-content": "#ffffff",
          "accent": "#4299e1",
          "neutral": "#ffffff",
          "ghost": "#ffffff",
          "neutral": "#3d4451",
          "base-100": "#020817",
          "base-200": "#101929",
          "base-300": "#1e293b",
          "lines-color": "#4299e1"
        },
      }
    ],
  },
}

