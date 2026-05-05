// Banco de fotos maximalistas de México por sección, alineadas con la paleta
// Cada entrada incluye un color de paleta para usar en el glow del carrusel.

export interface BVPhoto {
  src: string;
  caption: string;
  /** Color de la paleta que mejor combina con la foto */
  glow: string;
}

// HOME — tianguis, mercados, papel picado
export const HOME_PHOTOS: BVPhoto[] = [
  {
    src: 'https://images.unsplash.com/photo-1584208632661-f8db31bb6489?w=1400',
    caption: 'TIANGUIS DEL BARRIO',
    glow: '#C0392B',
  },
  {
    src: 'https://images.unsplash.com/photo-1762355563969-f7b976b925e2?w=1400',
    caption: 'PAPEL PICADO EN LA CALLE',
    glow: '#F4C430',
  },
  {
    src: 'https://images.unsplash.com/photo-1564688283805-6a7938547329?w=1400',
    caption: 'COLORES DEL MERCADO',
    glow: '#E65100',
  },
  {
    src: 'https://images.unsplash.com/photo-1763821530010-89534ec80d19?w=1400',
    caption: 'BANDEROLAS DE FIESTA',
    glow: '#1A7A4A',
  },
];

// EXPLORAR — comida, especias, talavera
export const EXPLORAR_PHOTOS: BVPhoto[] = [
  {
    src: 'https://images.unsplash.com/photo-1578880711837-b028df1bcd06?w=1400',
    caption: 'TACOS DE LA ESQUINA',
    glow: '#E65100',
  },
  {
    src: 'https://images.unsplash.com/photo-1598536040030-c2a13cf6efd8?w=1400',
    caption: 'CHILE FRESCO',
    glow: '#1A7A4A',
  },
  {
    src: 'https://images.unsplash.com/photo-1767668425173-1e5cba163496?w=1400',
    caption: 'TALAVERA POBLANA',
    glow: '#1565C0',
  },
];

// MODA CIRCULAR — textiles, bazares
export const MODA_PHOTOS: BVPhoto[] = [
  {
    src: 'https://images.unsplash.com/photo-1638042780902-1735f72ff1f3?w=1400',
    caption: 'BAZAR DE TEXTILES',
    glow: '#880E4F',
  },
  {
    src: 'https://images.unsplash.com/photo-1741085766062-b1a596c6fb91?w=1400',
    caption: 'TIANGUIS DE ROPA',
    glow: '#C0392B',
  },
  {
    src: 'https://images.unsplash.com/photo-1707539248796-f0d9ee71447d?w=1400',
    caption: 'BORDADOS QUE CUENTAN HISTORIA',
    glow: '#F4C430',
  },
];

// LANDING — hero maximalista
export const LANDING_PHOTOS: BVPhoto[] = [
  {
    src: 'https://images.unsplash.com/photo-1762355563969-f7b976b925e2?w=1600',
    caption: 'TU BARRIO, MÁS VIVO',
    glow: '#C0392B',
  },
  {
    src: 'https://images.unsplash.com/photo-1564688283805-6a7938547329?w=1600',
    caption: 'HECHO A MANO EN EL BARRIO',
    glow: '#F4C430',
  },
  {
    src: 'https://images.unsplash.com/photo-1584208632661-f8db31bb6489?w=1600',
    caption: 'CADA COMPRA SOSTIENE LA CALLE',
    glow: '#1A7A4A',
  },
  {
    src: 'https://images.unsplash.com/photo-1578880711837-b028df1bcd06?w=1600',
    caption: 'SABORES QUE NO SE INDUSTRIALIZAN',
    glow: '#E65100',
  },
];

// REGISTRAR — comercio, manos al trabajo
export const REGISTRAR_PHOTOS: BVPhoto[] = [
  {
    src: 'https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=1400',
    caption: 'TU NEGOCIO ES BARRIO',
    glow: '#C0392B',
  },
  {
    src: 'https://images.unsplash.com/photo-1715216046950-c0d9ef1bf0cc?w=1400',
    caption: 'LEVANTA TU LETRERO',
    glow: '#F4C430',
  },
];
