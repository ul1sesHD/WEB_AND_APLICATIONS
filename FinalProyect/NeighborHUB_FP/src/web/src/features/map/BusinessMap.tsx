import { useMemo } from 'react';
import { MapPin as MapPinIcon } from 'lucide-react';
import { type FindNearbyResult, parseGeoPoint } from '@neighborhub/shared';
import { MapPin } from './MapPin';

type Props = {
  center:      { lng: number; lat: number };
  radiusKm:    number;
  businesses:  FindNearbyResult[];
  selectedId:  string | null;
  onSelect:    (id: string) => void;
};

/**
 * Lightweight map placeholder — positions business pins on a CSS grid
 * without requiring any external map provider (Mapbox, Google Maps, etc.).
 * When a map token is configured later, this component can be swapped back.
 */
export const BusinessMap = ({ center, radiusKm, businesses, selectedId, onSelect }: Props) => {
  const positioned = useMemo(() => {
    if (businesses.length === 0) return [];

    return businesses.map((b) => {
      const pt = parseGeoPoint(b.location);
      if (!pt) return null;

      // Project lat/lng to relative % within the radius bounding box
      const dLng = pt.lng - center.lng;
      const dLat = pt.lat - center.lat;
      const scale = radiusKm * 0.012; // rough degree-per-km at CDMX latitude
      const x = 50 + (dLng / scale) * 40; // 40% spread from center
      const y = 50 - (dLat / scale) * 40;

      return {
        ...b,
        x: Math.max(5, Math.min(95, x)),
        y: Math.max(5, Math.min(95, y)),
      };
    }).filter(Boolean) as (FindNearbyResult & { x: number; y: number })[];
  }, [businesses, center, radiusKm]);

  return (
    <div className="relative w-full h-full bg-gradient-to-br from-[#f5f0eb] to-[#e8e0d8] overflow-hidden">
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(#8B7355 1px, transparent 1px), linear-gradient(90deg, #8B7355 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Radius circle */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-[#C0392B]/25 bg-[#C0392B]/5"
        style={{ width: '75%', height: '75%' }}
      />

      {/* Center marker */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
        <span className="block w-4 h-4 rounded-full bg-toldo border-2 border-paper shadow-lg" />
      </div>

      {/* Business pins */}
      {positioned.map((b) => (
        <div
          key={b.id}
          className="absolute z-20 -translate-x-1/2 -translate-y-full transition-transform hover:scale-110"
          style={{ left: `${b.x}%`, top: `${b.y}%` }}
        >
          <MapPin
            category={b.category_name}
            active={b.id === selectedId}
            onClick={() => onSelect(b.id)}
          />
        </div>
      ))}

      {/* Label */}
      <div className="absolute bottom-3 left-3 bg-paper/90 backdrop-blur rounded-md px-3 py-1.5 shadow-sm">
        <div className="flex items-center gap-1.5 text-xs font-body text-adobe">
          <MapPinIcon size={12} />
          <span>{businesses.length} businesses within {radiusKm} km</span>
        </div>
      </div>

      {/* Compass indicator */}
      <div className="absolute top-3 right-3 bg-paper/90 backdrop-blur rounded-md px-2 py-1 shadow-sm">
        <span className="font-display text-xs tracking-wider text-comal">N</span>
      </div>

      {businesses.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6">
            <MapPinIcon size={32} className="text-comal/30 mx-auto mb-2" />
            <p className="font-body text-adobe text-sm">No businesses nearby</p>
          </div>
        </div>
      )}
    </div>
  );
};
