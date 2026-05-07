import { useCallback, useEffect, useState } from 'react';

export type Coords = { lng: number; lat: number };

export type GeolocationState = {
  coords: Coords;
  error: string | null;
  loading: boolean;
  fromFallback: boolean;
  request: () => void;
};

const CDMX_CENTRO: Coords = { lng: -99.1332, lat: 19.4326 };

export const useGeolocation = (): GeolocationState => {
  const [coords, setCoords]             = useState<Coords>(CDMX_CENTRO);
  const [error, setError]               = useState<string | null>(null);
  const [loading, setLoading]           = useState(false);
  const [fromFallback, setFromFallback] = useState(true);

  const request = useCallback((): void => {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setError('Geolocation not available');
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lng: pos.coords.longitude, lat: pos.coords.latitude });
        setFromFallback(false);
        setError(null);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setFromFallback(true);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 60_000 },
    );
  }, []);

  useEffect(() => { request(); }, [request]);

  return { coords, error, loading, fromFallback, request };
};
