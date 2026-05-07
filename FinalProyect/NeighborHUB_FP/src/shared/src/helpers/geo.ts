import type { GeographyPoint } from '../supabase/database.types';

export type LngLat = { lng: number; lat: number };

export const toGeoPoint = (lng: number, lat: number): string =>
  `SRID=4326;POINT(${lng} ${lat})`;

export const parseGeoPoint = (point: GeographyPoint | null | undefined): LngLat | null => {
  if (!point) return null;

  if (typeof point === 'object' && point.type === 'Point' && Array.isArray(point.coordinates)) {
    const [lng, lat] = point.coordinates;
    return Number.isFinite(lng) && Number.isFinite(lat) ? { lng, lat } : null;
  }

  if (typeof point === 'string') {
    const m = point.match(/POINT\(\s*([-\d.]+)\s+([-\d.]+)\s*\)/);
    if (!m) return null;
    const lng = parseFloat(m[1]!);
    const lat = parseFloat(m[2]!);
    return Number.isFinite(lng) && Number.isFinite(lat) ? { lng, lat } : null;
  }

  return null;
};

const EARTH_RADIUS_KM = 6371;

const toRad = (deg: number): number => (deg * Math.PI) / 180;

export const haversineKm = (a: LngLat, b: LngLat): number => {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(s));
};
