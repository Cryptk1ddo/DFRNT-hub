module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        branding: {
          orange: '#E85002',
          gradient1: '#000000',
          gradient2: '#C10801',
          gradient3: '#F16001',
          gradient4: '#D9C3AB',
        },
        primary: '#000000',
        white: '#F9F9F9',
        gray: {
          DEFAULT: '#646464',
          light: '#A7A7A7',
          dark: '#333333',
        },
      },
    },
  },
  plugins: [],
}; 