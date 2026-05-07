// Datos de prueba para Barrio Vivo — basado en negocios reales de CDMX

export interface Categoria {
  id: string;
  nombre: string;
  icono: string;
  descripcion: string;
  color_hex: string;
  activo: boolean;
}

export interface Negocio {
  id: string;
  usuario_id: string;
  categoria_id: string;
  nombre: string;
  descripcion: string;
  historia: string;
  telefono: string;
  whatsapp: string;
  direccion: string;
  colonia: string;
  lat: number;
  lng: number;
  horario: string;
  foto_url: string;
  anios_en_barrio: number;
  verificado: boolean;
  activo: boolean;
  created_at: string;
  rating_promedio: number;
  total_visitas: number;
  total_resenas: number;
  categoria?: Categoria;
}

export interface Resena {
  id: string;
  usuario_id: string;
  negocio_id: string;
  rating: number;
  comentario: string;
  created_at: string;
  activo: boolean;
  usuario_nombre: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  rol: 'usuario' | 'vendedor' | 'admin';
  colonia: string;
  lat: number;
  lng: number;
  activo: boolean;
  created_at: string;
}

export interface ImpactoDTO {
  total_km: number;
  total_co2: number;
  total_dinero_local: number;
  total_visitas: number;
  total_negocios_distintos: number;
  ranking_barrio: number;
}

// Catálogo de categorías
export const CATEGORIAS: Categoria[] = [
  { id: 'cat-01', nombre: 'Food and Markets', icono: '', descripcion: 'Markets, tianguis, and fresh food', color_hex: '#C0392B', activo: true },
  { id: 'cat-02', nombre: 'Diners and Antojitos', icono: '', descripcion: 'Fondas, taquerias, and Mexican snacks', color_hex: '#E65100', activo: true },
  { id: 'cat-03', nombre: 'Tortilla Shop', icono: '', descripcion: 'Artisanal and industrial tortilla shops', color_hex: '#C0392B', activo: true },
  { id: 'cat-04', nombre: 'Dairy and Creamery', icono: '', descripcion: 'Cheese shops, creameries, and dairy products', color_hex: '#1565C0', activo: true },
  { id: 'cat-05', nombre: 'Greengrocer', icono: '', descripcion: 'Fresh fruits and vegetables', color_hex: '#1A7A4A', activo: true },
  { id: 'cat-06', nombre: 'Bakery and Sweets', icono: '', descripcion: 'Artisanal bread, sweets, and pastries', color_hex: '#F4C430', activo: true },
  { id: 'cat-07', nombre: 'Water Purifier', icono: '', descripcion: 'Purified water and jugs', color_hex: '#1565C0', activo: true },
  { id: 'cat-08', nombre: 'Hardware and Services', icono: '', descripcion: 'Tools, plumbing, and home services', color_hex: '#E65100', activo: true },
  { id: 'cat-09', nombre: 'Mechanic and Tire Shop', icono: '', descripcion: 'Mechanics, vulcanizers, and workshops', color_hex: '#E65100', activo: true },
  { id: 'cat-10', nombre: 'Shoe Store', icono: '', descripcion: 'Shoe stores, repair, and accessories', color_hex: '#880E4F', activo: true },
  { id: 'cat-11', nombre: 'Circular Fashion and Bazaar', icono: '', descripcion: 'Second-hand clothes, bazaars, and circular fashion', color_hex: '#880E4F', activo: true },
  { id: 'cat-12', nombre: 'Bulk Stores', icono: '', descripcion: 'Grains, spices, and packaging-free products', color_hex: '#1A7A4A', activo: true },
];

// Negocios de muestra en Coyoacán, CDMX
export const NEGOCIOS: Negocio[] = [
  {
    id: 'neg-01',
    usuario_id: 'usr-01',
    categoria_id: 'cat-01',
    nombre: 'Little Merced Tianguis',
    descripcion: 'The best street market in the neighborhood with over 80 stalls of fresh products direct from the field. Tomato, chili, holy herb, and everything your kitchen needs.',
    historia: 'We\'ve been coming here since I was a kid with my grandmother Consuelo. She taught me how to choose the best mulato chili and negotiate without offending. Today I continue that legacy every Tuesday and Friday.',
    telefono: '55 1234 5678',
    whatsapp: '5512345678',
    direccion: '320 Francisco Sosa Ave',
    colonia: 'Coyoacan',
    lat: 19.3434,
    lng: -99.1621,
    horario: 'Tue-Fri 07:00-15:00, Sat-Sun 06:00-16:00',
    foto_url: '',
    anios_en_barrio: 34,
    verificado: true,
    activo: true,
    created_at: '2024-01-15T10:00:00Z',
    rating_promedio: 4.8,
    total_visitas: 1247,
    total_resenas: 89,
  },
  {
    id: 'neg-02',
    usuario_id: 'usr-02',
    categoria_id: 'cat-02',
    nombre: 'Dona Esperanza Diner',
    descripcion: 'Homemade food made with love. Menu of the day with soup, stew, and fresh water for only $60. Specialty in black mole and green enchiladas.',
    historia: 'I arrived in Coyoacan 28 years ago with my husband and a clay pot. Today my children help me and we already have clients who have been coming to eat for 20 years. That\'s what gives me strength.',
    telefono: '55 8765 4321',
    whatsapp: '5587654321',
    direccion: '45 Malintzin St',
    colonia: 'Del Carmen, Coyoacan',
    lat: 19.3501,
    lng: -99.1634,
    horario: 'Mon-Sat 09:00-18:00',
    foto_url: '',
    anios_en_barrio: 28,
    verificado: true,
    activo: true,
    created_at: '2024-02-01T08:00:00Z',
    rating_promedio: 4.9,
    total_visitas: 2341,
    total_resenas: 156,
  },
  {
    id: 'neg-03',
    usuario_id: 'usr-03',
    categoria_id: 'cat-03',
    nombre: 'Blue Griddle Tortilla Shop',
    descripcion: 'Creole blue corn tortillas ground in a metate. No preservatives, no industrial nixtamal. Every kilo is culture in your hands.',
    historia: 'My family brought the blue corn from Tlaxcala 40 years ago. We are the only tortilla shop in the neighborhood that continues to use non-GMO corn. Blue tortilla is not a trend, it\'s identity.',
    telefono: '55 5555 1234',
    whatsapp: '',
    direccion: '78 Fernandez Leal St',
    colonia: 'Concepcion Neighborhood',
    lat: 19.3456,
    lng: -99.1598,
    horario: 'Mon-Sat 06:30-14:00',
    foto_url: '',
    anios_en_barrio: 40,
    verificado: true,
    activo: true,
    created_at: '2024-01-20T06:00:00Z',
    rating_promedio: 4.7,
    total_visitas: 3012,
    total_resenas: 201,
  },
  {
    id: 'neg-04',
    usuario_id: 'usr-04',
    categoria_id: 'cat-05',
    nombre: 'Three Brothers Greengrocer',
    descripcion: 'Seasonal fruits and vegetables direct from Xochimilco and the State of Mexico. Wholesale market prices without having to travel.',
    historia: 'We are three brothers who inherited our dad Don Aurelio\'s stall. He sold fruit in a wheelbarrow. We already have a shop but we never forget where we come from.',
    telefono: '55 3344 5566',
    whatsapp: '5533445566',
    direccion: 'Coyoacan Market, Stall 34',
    colonia: 'Coyoacan',
    lat: 19.3489,
    lng: -99.1645,
    horario: 'Mon-Sun 07:00-19:00',
    foto_url: '',
    anios_en_barrio: 22,
    verificado: false,
    activo: true,
    created_at: '2024-03-10T07:00:00Z',
    rating_promedio: 4.6,
    total_visitas: 876,
    total_resenas: 45,
  },
  {
    id: 'neg-05',
    usuario_id: 'usr-05',
    categoria_id: 'cat-11',
    nombre: 'The Ragman Circular Bazaar',
    descripcion: 'Curated and washed second-hand clothes. Vintage garments, fabrics, accessories, and shoes in good condition. Give a second life to fashion.',
    historia: 'I started in 2018 tired of seeing good clothes thrown away. First it was a clothesline in my patio. Today we have more than 2,000 garments rotating every week. Circular fashion is not an option, it\'s a responsibility.',
    telefono: '55 9988 7766',
    whatsapp: '5599887766',
    direccion: '12 Centenario Garden, Shop 3',
    colonia: 'Coyoacan Center',
    lat: 19.3512,
    lng: -99.1620,
    horario: 'Thu-Sun 10:00-20:00',
    foto_url: '',
    anios_en_barrio: 6,
    verificado: true,
    activo: true,
    created_at: '2024-02-15T10:00:00Z',
    rating_promedio: 4.5,
    total_visitas: 543,
    total_resenas: 67,
  },
  {
    id: 'neg-06',
    usuario_id: 'usr-06',
    categoria_id: 'cat-12',
    nombre: 'Tepache Bulk Store',
    descripcion: 'Spices, grains, dried chilies, high-altitude coffee, and bulk seeds. Bring your container and save packaging. Over 150 products available.',
    historia: 'We opened because in the neighborhood there was nowhere to buy in bulk without going to Roma. We\'ve been here for 4 years and the neighbors adopted us. Now we even grind Chiapas coffee on the spot.',
    telefono: '55 7711 2233',
    whatsapp: '5577112233',
    direccion: '189 Mexico Ave',
    colonia: 'Del Carmen',
    lat: 19.3478,
    lng: -99.1609,
    horario: 'Mon-Sat 09:00-19:00',
    foto_url: '',
    anios_en_barrio: 4,
    verificado: false,
    activo: true,
    created_at: '2024-04-01T09:00:00Z',
    rating_promedio: 4.4,
    total_visitas: 312,
    total_resenas: 28,
  },
  {
    id: 'neg-07',
    usuario_id: 'usr-07',
    categoria_id: 'cat-06',
    nombre: 'Golden Concha Bakery',
    descripcion: 'Artisanal sweet bread handmade since 4am. Conchas, croissants, polvorones, and pan de muerto in season. The smell guides you from two blocks away.',
    historia: 'My grandfather Refugio arrived from Puebla in 1965 with his concha recipe. We use natural lard and piloncillo. Never margarine, never a shortcut. Bread is sacred.',
    telefono: '55 6655 4433',
    whatsapp: '',
    direccion: '56 Hidalgo Ave',
    colonia: 'Coyoacan',
    lat: 19.3467,
    lng: -99.1637,
    horario: 'Mon-Sun 06:00-21:00',
    foto_url: '',
    anios_en_barrio: 58,
    verificado: true,
    activo: true,
    created_at: '2024-01-05T06:00:00Z',
    rating_promedio: 4.9,
    total_visitas: 4521,
    total_resenas: 312,
  },
  {
    id: 'neg-08',
    usuario_id: 'usr-08',
    categoria_id: 'cat-09',
    nombre: 'The Screw Mechanic Shop',
    descripcion: 'General mechanics, brakes, suspension, and electronic diagnostics. Honest prices and written guarantee on every job.',
    historia: 'I learned from my uncle Ramon and YouTube. I opened alone, with a 13mm wrench and a desire to work clean. Today we are 3 mechanics and we don\'t charge for what is not needed.',
    telefono: '55 4422 3311',
    whatsapp: '5544223311',
    direccion: '234 Ignacio Allende St',
    colonia: 'Santa Catarina',
    lat: 19.3423,
    lng: -99.1584,
    horario: 'Mon-Sat 08:00-19:00',
    foto_url: '',
    anios_en_barrio: 11,
    verificado: false,
    activo: true,
    created_at: '2024-03-20T08:00:00Z',
    rating_promedio: 4.3,
    total_visitas: 189,
    total_resenas: 34,
  },
];

// Reseñas de muestra
export const RESENAS: Resena[] = [
  {
    id: 'res-01',
    usuario_id: 'usr-10',
    negocio_id: 'neg-01',
    rating: 5,
    comentario: 'Without a doubt the best market in Coyoacan. The tomatoes are always super fresh and the prices are very accessible. I come every Tuesday with my cart.',
    created_at: '2024-11-20T14:30:00Z',
    activo: true,
    usuario_nombre: 'Marisol Hernandez',
  },
  {
    id: 'res-02',
    usuario_id: 'usr-11',
    negocio_id: 'neg-01',
    rating: 5,
    comentario: 'The vegetables last longer than those from the supermarket. The lady at the herb stall is charming and always gives you extra epazote.',
    created_at: '2024-11-18T11:00:00Z',
    activo: true,
    usuario_nombre: 'Roberto Gutierrez',
  },
  {
    id: 'res-03',
    usuario_id: 'usr-12',
    negocio_id: 'neg-02',
    rating: 5,
    comentario: '28 years coming and the black mole is still the best in the world. Dona Esperanza is a treasure of the neighborhood.',
    created_at: '2024-11-22T13:00:00Z',
    activo: true,
    usuario_nombre: 'Carmen Lopez',
  },
  {
    id: 'res-04',
    usuario_id: 'usr-13',
    negocio_id: 'neg-02',
    rating: 5,
    comentario: 'The daily special for $60 is incredible. Always full, always on time. Never fails.',
    created_at: '2024-11-19T13:30:00Z',
    activo: true,
    usuario_nombre: 'Miguel Angel Torres',
  },
  {
    id: 'res-05',
    usuario_id: 'usr-14',
    negocio_id: 'neg-03',
    rating: 5,
    comentario: 'The blue corn tortillas have a flavor that does not exist anywhere else. The price is accessible and the texture is perfect.',
    created_at: '2024-11-21T08:00:00Z',
    activo: true,
    usuario_nombre: 'Fernanda Vazquez',
  },
];

// Usuario actual de muestra (sesión)
export const USUARIO_MOCK: Usuario = {
  id: 'usr-me',
  nombre: 'Alejandro Reyes',
  email: 'alejandro@barrio.mx',
  telefono: '55 1122 3344',
  rol: 'usuario',
  colonia: 'Coyoacan',
  lat: 19.3480,
  lng: -99.1612,
  activo: true,
  created_at: '2024-06-15T10:00:00Z',
};

// Impacto personal de muestra
export const IMPACTO_MOCK: ImpactoDTO = {
  total_km: 47.3,
  total_co2: 9.93,
  total_dinero_local: 2840,
  total_visitas: 34,
  total_negocios_distintos: 12,
  ranking_barrio: 7,
};

// Datos para el dashboard de impacto semanal
export const VISITAS_SEMANALES = [
  { semana: 'Wk 1', visitas: 3 },
  { semana: 'Wk 2', visitas: 5 },
  { semana: 'Wk 3', visitas: 2 },
  { semana: 'Wk 4', visitas: 7 },
  { semana: 'Wk 5', visitas: 4 },
  { semana: 'Wk 6', visitas: 6 },
  { semana: 'Wk 7', visitas: 7 },
];

export const CATEGORIAS_VISITADAS = [
  { nombre: 'Food', valor: 12, color: '#C0392B' },
  { nombre: 'Diners', valor: 9, color: '#E65100' },
  { nombre: 'Greengrocer', valor: 6, color: '#1A7A4A' },
  { nombre: 'Bakery', valor: 4, color: '#F4C430' },
  { nombre: 'Other', valor: 3, color: '#880E4F' },
];

// Función Haversine para calcular distancia
export function calcularDistancia(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371; // Radio de la Tierra en km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Formatea la distancia en metros o kilómetros
export function formatearDistancia(km: number): string {
  if (km < 1) return `${Math.round(km * 1000)}m`;
  return `${km.toFixed(1)} km`;
}

// Calcula CO2 ahorrado
export function calcularCO2(km: number): number {
  return km * 0.21;
}

// Obtiene la categoría por ID
export function getCategoriaById(id: string): Categoria | undefined {
  return CATEGORIAS.find((c) => c.id === id);
}

// Estadísticas globales de muestra
export const STATS_GLOBALES = {
  negocios: 312,
  km_ahorrados: 8743,
  co2_evitado: 1836,
};
