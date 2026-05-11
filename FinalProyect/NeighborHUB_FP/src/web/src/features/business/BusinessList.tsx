import type { ReactNode } from 'react';
import { Skeleton } from '@/components/ui/Skeleton';
import { BusinessCard } from '@/components/business/BusinessCard';
import type { BusinessDirectoryRow, FindNearbyResult } from '@neighborhub/shared';

type Item = BusinessDirectoryRow | FindNearbyResult;

type Props = {
  items:   readonly Item[];
  loading?: boolean;
  variant?: 'full' | 'compact';
  emptyState?: ReactNode;
};

const Loader = ({ rows = 4 }: { rows?: number }) => (
  <div className="flex flex-col gap-3">
    {Array.from({ length: rows }).map((_, i) => (
      <Skeleton key={i} className="h-32 w-full" />
    ))}
  </div>
);

export const BusinessList = ({ items, loading, variant = 'full', emptyState }: Props) => {
  if (loading && items.length === 0) return <Loader />;
  if (!loading && items.length === 0) {
    return (
      <div className="text-center py-12">
        {emptyState ?? (
          <p className="font-body text-adobe">No businesses to show.</p>
        )}
      </div>
    );
  }
  return (
    <ul className="flex flex-col gap-3">
      {items.map((b) => (
        <li key={b.id}>
          <BusinessCard business={b} variant={variant} />
        </li>
      ))}
    </ul>
  );
};
