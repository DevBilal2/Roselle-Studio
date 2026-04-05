// Tailwind CSS 4 uses @tailwindcss/postcss which handles purging automatically
// Keep postcss.config.mjs as the main config for Tailwind 4
// This file is kept for reference but postcss.config.mjs takes precedence
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
};

