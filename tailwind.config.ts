import type { Config } from 'tailwindcss';

const { nextui } = require('@nextui-org/react');

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      sm: '320px',
      md: '768px',
      lg: '1080px',
    },
    fontSize: {
      xs: '12px',
      sm: '14px',
      normal: '16px',
      lg: '18px',
      xlg: '24px',
    },
    extend: {
      colors: {
        bg: '#EFEFEF',
        text_default: '#070707',
        text_danger: '#D1345B',
        theme_color: '#3454D1',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
export default config;
