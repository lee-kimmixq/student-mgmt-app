module.exports = {
  content: ['./src/*/*.{js,jsx}'],
  theme: {
    extend: {},
    container: {
      padding: '2rem',
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
