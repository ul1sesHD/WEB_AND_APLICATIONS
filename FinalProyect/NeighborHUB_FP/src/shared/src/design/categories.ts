import { colors } from './tokens';

export type CategoryAsset = {
  plate: string | null;
  emoji: string;
  color: string;
};

export const categoryAssets = {
  tortillas:    { plate: '/categories/Tortillas.png', emoji: '🌽', color: colors.cornYellow },
  fonda:        { plate: '/categories/Fonda.png',     emoji: '🥗', color: colors.toldoRed },
  verduleria:   { plate: '/categories/Grosery.png',   emoji: '🥦', color: colors.quelliteGreen },
  lacteos:      { plate: '/categories/Dairy.png',     emoji: '🥛', color: colors.paperCream },
  tianguis:     { plate: '/categories/Tianguis.png',  emoji: '🏪', color: colors.chiliOrange },
  purificadora: { plate: '/categories/Purifying.png', emoji: '💧', color: colors.signBlue },
  mecanico:     { plate: '/categories/Mechanic.png',  emoji: '🔧', color: colors.adobeGray },
  herreria:     { plate: '/categories/Smithy.png',    emoji: '⚒️', color: colors.metalDark },
  sastreria:    { plate: '/categories/Tailoring.png', emoji: '🧵', color: colors.bazarMagenta },
  paca:         { plate: '/categories/Paca.png',      emoji: '👗', color: colors.bazarMagenta },
  panaderia:    { plate: null,                        emoji: '🍞', color: colors.chiliOrange },
  polleria:     { plate: null,                        emoji: '🐔', color: colors.toldoRed },
} as const satisfies Record<string, CategoryAsset>;

export type CategorySlug = keyof typeof categoryAssets;

const FALLBACK: CategoryAsset = {
  plate: null,
  emoji: '🏪',
  color: colors.metalBase,
};

export const getCategoryAsset = (slug: string): CategoryAsset =>
  (categoryAssets as Record<string, CategoryAsset>)[slug] ?? FALLBACK;
