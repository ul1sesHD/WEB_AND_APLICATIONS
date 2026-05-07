export const fonts = {
  display: '"Bebas Neue", sans-serif',
  body:    '"Nunito", sans-serif',
  quote:   '"Playfair Display", serif',
} as const;

export const weights = {
  regular: 400,
  medium:  500,
  bold:    700,
  black:   800,
} as const;

export const letterSpacing = {
  tight:  '-0.01em',
  normal: '0em',
  wide:   '0.04em',
  wider:  '0.08em',
  widest: '0.12em',
} as const;

export type FontKey   = keyof typeof fonts;
export type WeightKey = keyof typeof weights;
