import { create } from 'zustand';

type FiltersState = {
  categoryId: string | null;
  radius:     number;          // kilometers
  search:     string;
  setCategory: (id: string | null) => void;
  setRadius:   (km: number) => void;
  setSearch:   (q: string) => void;
  clearAll:    () => void;
};

const DEFAULT_RADIUS_KM = 5;

export const useFiltersStore = create<FiltersState>((set) => ({
  categoryId: null,
  radius:     DEFAULT_RADIUS_KM,
  search:     '',
  setCategory: (categoryId) => set({ categoryId }),
  setRadius:   (radius)     => set({ radius }),
  setSearch:   (search)     => set({ search }),
  clearAll:    () => set({ categoryId: null, radius: DEFAULT_RADIUS_KM, search: '' }),
}));
