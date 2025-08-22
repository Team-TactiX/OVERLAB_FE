// tailwind.config.js

module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'brand-primary': '#00B140',
      },
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
      },
      fontSize: {
        'heading-1': '2.5rem',
        'heading-2': '2rem',
        'sub-heading-1': '1.5rem',
        'sub-heading-2': '1.25rem',
      },
    },
  },
  plugins: [],
};
