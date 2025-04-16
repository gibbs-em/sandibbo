import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        chewy: ['Chewy', 'cursive'],
      },
      colors: {
        background: '#FDF1E6',
      },
    },
  },
  plugins: [],
}

export default config 