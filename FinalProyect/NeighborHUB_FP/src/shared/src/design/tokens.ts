export const colors = {
  toldoRed:           '#C0392B',
  toldoRedLight:      '#F5C6C2',
  quelliteGreen:      '#1A7A4A',
  quelliteGreenLight: '#C3EDCF',
  cornYellow:         '#F4C430',
  signBlue:           '#1565C0',
  chiliOrange:        '#E65100',
  bazarMagenta:       '#880E4F',
  comalBrown:         '#3E2723',
  paperCream:         '#FFF8EE',
  adobeGray:          '#5D4037',
  metalBase:          '#8A8A8A',
  metalLight:         '#BDBDBD',
  metalDark:          '#4A4A4A',
} as const;

export const spacing = {
  xs:    4,
  sm:    8,
  md:    12,
  lg:    16,
  xl:    24,
  '2xl': 32,
  '3xl': 48,
  '4xl': 64,
} as const;

export const radii = {
  sharp: 2,
  sm:    4,
  md:    8,
  lg:    14,
  full:  9999,
} as const;

export const shadows = {
  hard:  '4px 4px 0 #1A1A1A',
  soft:  '0 4px 12px rgba(0,0,0,0.10)',
  metal: 'inset 0 1px 0 rgba(255,255,255,0.3), 0 4px 12px rgba(0,0,0,0.4)',
} as const;

export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export type ColorName  = keyof typeof colors;
export type SpacingKey = keyof typeof spacing;
export type RadiusKey  = keyof typeof radii;
