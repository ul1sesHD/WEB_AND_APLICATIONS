import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { listBusinesses, type BusinessFilters } from '../services/businessService';
import { getSupabase } from '../supabase/client';
import type { BusinessDirectoryRow } from '../supabase/database.types';

export const useBusinesses = (
  filters: BusinessFilters = {},
): UseQueryResult<BusinessDirectoryRow[]> =>
  useQuery({
    queryKey: ['businesses', 'list', filters],
    queryFn: async () => {
      const r = await listBusinesses(getSupabase(), filters);
      if (r.error) throw r.error;
      return r.data;
    },
    staleTime: 60_000,
  });
