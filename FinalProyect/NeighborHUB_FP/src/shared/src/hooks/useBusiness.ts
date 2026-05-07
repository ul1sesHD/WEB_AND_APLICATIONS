import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { getBusiness } from '../services/businessService';
import { getSupabase } from '../supabase/client';
import type { BusinessDirectoryRow } from '../supabase/database.types';

export const useBusiness = (id: string | undefined): UseQueryResult<BusinessDirectoryRow> =>
  useQuery({
    queryKey: ['businesses', 'detail', id],
    queryFn: async () => {
      if (!id) throw new Error('Business id is required');
      const r = await getBusiness(getSupabase(), id);
      if (r.error) throw r.error;
      return r.data;
    },
    enabled: Boolean(id),
    staleTime: 30_000,
  });
