import type { Feature, Polygon } from 'geojson';

const EARTH_RADIUS_KM = 6371;

/**
 * Approximates a geographic circle as a 64-vertex polygon. Used to render the
 * "search radius" overlay on the map.
 */
export const circlePolygon = (
  center: { lng: number; lat: number },
  radiusKm: number,
  vertices = 64,
): Feature<Polygon> => {
  const coords: [number, number][] = [];
  const latRad = (center.lat * Math.PI) / 180;

  for (let i = 0; i <= vertices; i++) {
    const angle = (i / vertices) * 2 * Math.PI;
    const dx    = (radiusKm * Math.cos(angle)) / (EARTH_RADIUS_KM * Math.cos(latRad)) * (180 / Math.PI);
    const dy    = (radiusKm * Math.sin(angle)) / EARTH_RADIUS_KM * (180 / Math.PI);
    coords.push([center.lng + dx, center.lat + dy]);
  }

  return {
    type: 'Feature',
    geometry: { type: 'Polygon', coordinates: [coords] },
    properties: {},
  };
};
