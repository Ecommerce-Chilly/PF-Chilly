const tailwinds = require('tailwindcss');
module.exports = {
  plugins: [tailwinds('./tailwind.config.js'), require('autoprefixer')],
};
