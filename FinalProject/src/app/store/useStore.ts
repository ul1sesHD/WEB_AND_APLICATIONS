// Store global de Barrio Vivo — Zustand
import { create } from 'zustand';
import { Negocio, Usuario, ImpactoDTO, USUARIO_MOCK, IMPACTO_MOCK, NEGOCIOS } from '../data/mockData';

interface FiltrosState {
  categoria: string | null;
  radio: number;
  rating_minimo: number;
  solo_verificados: boolean;
  sort: 'cercano' | 'calificado' | 'visitado';
  search: string;
}

interface BarrioVivoStore {
  // Auth
  usuario: Usuario | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (usuario: Usuario, token: string) => void;
  logout: () => void;

  // Ubicación del usuario
  userLat: number;
  userLng: number;
  coloniaActual: string;
  setUserLocation: (lat: number, lng: number, colonia?: string) => void;

  // Negocios
  negocios: Negocio[];
  negocioSeleccionado: Negocio | null;
  setNegocios: (negocios: Negocio[]) => void;
  setNegocioSeleccionado: (negocio: Negocio | null) => void;

  // Filtros
  filtros: FiltrosState;
  setFiltros: (filtros: Partial<FiltrosState>) => void;
  resetFiltros: () => void;

  // Impacto personal
  impacto: ImpactoDTO | null;
  setImpacto: (impacto: ImpactoDTO) => void;

  // UI
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const filtrosDefecto: FiltrosState = {
  categoria: null,
  radio: 5,
  rating_minimo: 0,
  solo_verificados: false,
  sort: 'cercano',
  search: '',
};

export const useBarrioStore = create<BarrioVivoStore>((set) => ({
  // Auth — simulado con usuario mock
  usuario: null,
  isAuthenticated: false,
  token: null,
  login: (usuario, token) => set({ usuario, isAuthenticated: true, token }),
  logout: () => set({ usuario: null, isAuthenticated: false, token: null }),

  // Ubicación — defaultea al Zócalo CDMX
  userLat: 19.3480,
  userLng: -99.1612,
  coloniaActual: 'Coyoacán',
  setUserLocation: (lat, lng, colonia) =>
    set({ userLat: lat, userLng: lng, coloniaActual: colonia ?? 'Mi Barrio' }),

  // Negocios
  negocios: NEGOCIOS,
  negocioSeleccionado: null,
  setNegocios: (negocios) => set({ negocios }),
  setNegocioSeleccionado: (negocio) => set({ negocioSeleccionado: negocio }),

  // Filtros
  filtros: filtrosDefecto,
  setFiltros: (nuevos) =>
    set((state) => ({ filtros: { ...state.filtros, ...nuevos } })),
  resetFiltros: () => set({ filtros: filtrosDefecto }),

  // Impacto
  impacto: IMPACTO_MOCK,
  setImpacto: (impacto) => set({ impacto }),

  // UI
  activeTab: 'home',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));

// Simula login automático con usuario de prueba
export function simularLogin() {
  const store = useBarrioStore.getState();
  store.login(USUARIO_MOCK, 'mock-jwt-token-barrio-vivo');
}
