import type { Config } from 'tailwindcss';

const { nextui } = require('@nextui-org/react');

const config: Config = {
  content: [
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      sm: '320px',
      md: '768px',
      lg: '1080px',
    },
    extend: {
      colors: {
        bg: '#EFEFEF',
        text_default_color: '#070707',
        text_danger: '#D1345B',
        theme_color: '#3454D1',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    nextui({
      prefix: 'nextui',
      addCommonColors: false,
      defaultTheme: 'light',
      defaultExtendTheme: 'light',
    }),
  ],
};
export default config;
