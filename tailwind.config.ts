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
        dark: '#0A0E17',       // tło/kolor tła
        accent: '#FF9500',     // pomarańczowy akcent
        light: '#FFFFFF',      // biały tekst
      },
    },
  },
  plugins: [],
}

export default config