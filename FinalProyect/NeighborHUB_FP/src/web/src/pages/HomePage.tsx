import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass } from 'lucide-react';
import {
  formatCO2, formatCurrency,
  useNearbyBusinesses, useUserImpact,
} from '@neighborhub/shared';
import { Sheet } from '@/components/ui/Sheet';
import { BusinessCard } from '@/components/business/BusinessCard';
import { BusinessList } from '@/features/business/BusinessList';
import { BusinessFilters } from '@/features/business/BusinessFilters';
import { BusinessMap } from '@/features/map/BusinessMap';
import { useLocationStore } from '@/stores/locationStore';
import { useFiltersStore } from '@/stores/filtersStore';
import { useAuthStore } from '@/stores/authStore';
import { ROUTES } from '@/routes';
import { Button } from '@/components/ui/Button';

export const HomePage = () => {
  const { coords, requestPermission, fromFallback } = useLocationStore();
  const { categoryId, search, radius } = useFiltersStore();
  const { profile } = useAuthStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => { requestPermission(); }, [requestPermission]);

  const nearby = useNearbyBusinesses({
    lng:        coords.lng,
    lat:        coords.lat,
    radius:     radius * 1000,
    categoryId: categoryId ?? undefined,
    search:     search || undefined,
    limit:      50,
  });

  const impact = useUserImpact(profile?.id);
  const co2    = formatCO2(impact.data?.total_co2_saved_kg ?? 0);

  const items   = useMemo(() => nearby.data ?? [], [nearby.data]);
  const preview = useMemo(() => items.find((b) => b.id === selectedId) ?? null, [items, selectedId]);

  return (
    <div className="flex flex-col">
      <section className="relative h-[45vh] min-h-[280px] w-full">
        <BusinessMap
          center={coords}
          radiusKm={radius}
          businesses={items}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
        {fromFallback && (
          <div className="absolute top-3 left-3 right-3 sm:right-auto bg-paper/95 border border-comal/15 rounded-md px-3 py-2 shadow-soft text-sm font-body">
            <p className="text-comal">Showing CDMX Centro by default.</p>
            <button
              type="button"
              onClick={requestPermission}
              className="text-toldo font-bold hover:underline inline-flex items-center gap-1"
            >
              <Compass size={14} /> Use my location
            </button>
          </div>
        )}
      </section>

      <section className="px-4 py-4 max-w-3xl mx-auto w-full">
        <BusinessFilters />
      </section>

      <section className="px-4 max-w-3xl mx-auto w-full pb-32">
        <div className="flex items-baseline justify-between mb-3">
          <h2 className="font-display text-2xl tracking-wider text-comal">NEARBY</h2>
          <Link to={ROUTES.explore} className="font-body text-sm text-toldo hover:underline">
            See all →
          </Link>
        </div>
        <BusinessList
          items={items}
          loading={nearby.isLoading}
          emptyState={
            <div>
              <p className="font-body text-comal font-bold mb-2">No businesses in {radius} km.</p>
              <p className="font-body text-adobe text-sm">Try expanding the search radius.</p>
            </div>
          }
        />
      </section>

      <aside className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:max-w-md">
        <Link to={ROUTES.myImpact} className="block">
          <div className="bg-paper border-l-4 border-quellite rounded-md shadow-hard px-4 py-3 flex items-center justify-between">
            <div>
              <p className="font-body text-xs uppercase tracking-wider text-adobe">Your impact</p>
              <p className="font-body font-bold text-comal">
                {co2.value} CO₂ · {impact.data?.total_visits ?? 0} visits ·{' '}
                {formatCurrency(impact.data?.total_local_spending ?? 0)}
              </p>
            </div>
            <Button variant="ghost" size="sm">View</Button>
          </div>
        </Link>
      </aside>

      <Sheet open={preview !== null} onClose={() => setSelectedId(null)} side="bottom">
        {preview && <BusinessCard business={preview} variant="preview" />}
      </Sheet>
    </div>
  );
};
