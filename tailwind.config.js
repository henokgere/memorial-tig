/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          memorial: {
            dark: '#1a1a2e',
            primary: '#16213e',
            accent: '#0f3460',
            light: '#194560',
          },
        },
      },
    },
    plugins: [],
  }