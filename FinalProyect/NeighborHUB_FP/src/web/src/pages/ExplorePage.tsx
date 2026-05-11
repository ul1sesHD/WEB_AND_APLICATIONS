import { useMemo, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { businessService, type BusinessFilters } from '@neighborhub/shared';
import { getSupabase } from '@/lib/supabase';
import { Button } from '@/components/ui/Button';
import { BusinessList } from '@/features/business/BusinessList';
import { BusinessFilters as FilterBar } from '@/features/business/BusinessFilters';
import { useFiltersStore } from '@/stores/filtersStore';

const PAGE_SIZE = 20;

type SortValue = NonNullable<BusinessFilters['sort']>;
const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Rating' },
  { value: 'name',   label: 'A→Z' },
];

export const ExplorePage = () => {
  const { categoryId, search } = useFiltersStore();
  const [sort, setSort] = useSortFromUrl();

  const query = useInfiniteQuery({
    queryKey: ['businesses', 'explore', { categoryId, search, sort }],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const r = await businessService.listBusinesses(getSupabase(), {
        categoryId: categoryId ?? undefined,
        search:     search || undefined,
        sort,
        limit:      PAGE_SIZE,
        offset:     pageParam * PAGE_SIZE,
      });
      if (r.error) throw r.error;
      return r.data;
    },
    getNextPageParam: (last, pages) => (last.length < PAGE_SIZE ? undefined : pages.length),
  });

  const items = useMemo(() => query.data?.pages.flat() ?? [], [query.data]);

  return (
    <div className="px-4 max-w-3xl mx-auto w-full py-6 flex flex-col gap-5">
      <header>
        <h1 className="font-display text-3xl tracking-wider text-comal">EXPLORE</h1>
        <p className="font-body text-adobe text-sm">All businesses across CDMX.</p>
      </header>

      <FilterBar />

      <div className="flex items-center justify-between">
        <p className="font-body text-sm text-adobe">{items.length} results</p>
        <div className="flex items-center gap-2">
          <span className="font-body text-xs uppercase tracking-wider text-adobe">Sort</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortValue)}
            className="bg-paper border-2 border-comal/20 focus:border-toldo rounded-sharp px-2 py-1 font-body text-sm focus:outline-none"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      <BusinessList
        items={items}
        loading={query.isPending}
        emptyState={<p className="font-body text-adobe">No matches. Try clearing filters.</p>}
      />

      {query.hasNextPage && (
        <div className="flex justify-center pt-2">
          <Button
            variant="outline"
            onClick={() => void query.fetchNextPage()}
            disabled={query.isFetchingNextPage}
          >
            {query.isFetchingNextPage ? 'Loading…' : 'Load more'}
          </Button>
        </div>
      )}
    </div>
  );
};

/** Stateful `?sort=` binding — preserves sort across reloads. */
const readSortFromUrl = (): SortValue => {
  if (typeof window === 'undefined') return 'newest';
  const v = new URLSearchParams(window.location.search).get('sort');
  return v === 'rating' || v === 'name' ? v : 'newest';
};

const useSortFromUrl = (): [SortValue, (value: SortValue) => void] => {
  const [sort, setSort] = useState<SortValue>(readSortFromUrl);
  const update = (value: SortValue): void => {
    setSort(value);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('sort', value);
      window.history.replaceState(null, '', url);
    }
  };
  return [sort, update];
};
