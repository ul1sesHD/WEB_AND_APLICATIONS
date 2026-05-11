import { Search } from 'lucide-react';
import { useCategories } from '@neighborhub/shared';
import { MetalPlate } from '@/components/brand/MetalPlate';
import { useFiltersStore } from '@/stores/filtersStore';

export const BusinessFilters = () => {
  const { categoryId, search, setCategory, setSearch } = useFiltersStore();
  const { data: categories = [], isLoading } = useCategories();

  return (
    <div className="flex flex-col gap-3">
      <label className="relative">
        <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-adobe" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search businesses, neighborhoods…"
          className="w-full bg-paper border-2 border-comal/20 focus:border-toldo rounded-sharp pl-9 pr-4 py-2 font-body text-comal placeholder-adobe focus:outline-none"
        />
      </label>

      <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x">
        <button
          type="button"
          onClick={() => setCategory(null)}
          className={[
            'flex flex-col items-center gap-1 snap-start min-w-[64px]',
            categoryId === null ? 'text-toldo' : 'text-comal hover:text-toldo',
          ].join(' ')}
        >
          <span className="w-12 h-12 rounded-md bg-comal/10 flex items-center justify-center font-display text-lg">
            ALL
          </span>
          <span className="font-body text-[11px] uppercase tracking-wider">All</span>
        </button>

        {isLoading && <span className="font-body text-adobe text-sm">Loading…</span>}

        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setCategory(categoryId === c.id ? null : c.id)}
            className="flex flex-col items-center gap-1 snap-start min-w-[64px] focus:outline-none"
          >
            <MetalPlate
              category={c.name}
              size="sm"
              selected={categoryId === c.id}
            />
            <span className="font-body text-[11px] uppercase tracking-wider">{c.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
