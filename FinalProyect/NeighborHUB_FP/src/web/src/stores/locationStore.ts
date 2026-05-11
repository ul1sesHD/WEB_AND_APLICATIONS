import { create } from 'zustand';

export type Coords = { lng: number; lat: number };
export type LocationPermission = 'granted' | 'denied' | 'prompt';

const CDMX_CENTRO: Coords = { lng: -99.1332, lat: 19.4326 };

type LocationState = {
  coords:     Coords;
  permission: LocationPermission;
  fromFallback: boolean;
  setCoords:         (c: Coords) => void;
  requestPermission: () => void;
};

export const useLocationStore = create<LocationState>((set) => ({
  coords:       CDMX_CENTRO,
  permission:   'prompt',
  fromFallback: true,

  setCoords: (coords) => set({ coords, fromFallback: false }),

  requestPermission: () => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      set({ permission: 'denied' });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => set({
        coords:       { lng: pos.coords.longitude, lat: pos.coords.latitude },
        permission:   'granted',
        fromFallback: false,
      }),
      () => set({ permission: 'denied' }),
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 60_000 },
    );
  },
}));
