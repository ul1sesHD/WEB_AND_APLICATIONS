import type { Config } from 'tailwindcss';
import { colors } from '@neighborhub/shared';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        toldo:    { DEFAULT: colors.toldoRed,      light: colors.toldoRedLight },
        quellite: { DEFAULT: colors.quelliteGreen, light: colors.quelliteGreenLight },
        corn:     colors.cornYellow,
        sign:     colors.signBlue,
        chili:    colors.chiliOrange,
        bazar:    colors.bazarMagenta,
        comal:    colors.comalBrown,
        paper:    colors.paperCream,
        adobe:    colors.adobeGray,
        metal:    { base: colors.metalBase, light: colors.metalLight, dark: colors.metalDark },
      },
      fontFamily: {
        display: ['Bebas Neue', 'sans-serif'],
        body:    ['Nunito',     'sans-serif'],
        quote:   ['Playfair Display', 'serif'],
      },
      boxShadow: {
        hard:  '4px 4px 0 #1A1A1A',
        soft:  '0 4px 12px rgba(0,0,0,0.10)',
        metal: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px rgba(0,0,0,0.4)',
      },
      borderRadius: {
        sharp: '2px',
      },
      letterSpacing: {
        wider:  '0.08em',
        widest: '0.12em',
      },
    },
  },
  plugins: [],
};

export default config;
