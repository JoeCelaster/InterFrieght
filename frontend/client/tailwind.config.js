// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Adjust according to your folder structure
    "./public/index.html"         // Optional: for static HTML files
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Hubot Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hubot: ['"Hubot Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
