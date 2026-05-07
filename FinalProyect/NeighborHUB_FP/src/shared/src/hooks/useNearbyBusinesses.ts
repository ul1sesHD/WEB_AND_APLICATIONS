import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { findNearby, type NearbyArgs } from '../services/businessService';
import { getSupabase } from '../supabase/client';
import type { FindNearbyResult } from '../supabase/database.types';

export const useNearbyBusinesses = (args: NearbyArgs): UseQueryResult<FindNearbyResult[]> =>
  useQuery({
    queryKey: ['businesses', 'nearby', args],
    queryFn: async () => {
      const r = await findNearby(getSupabase(), args);
      if (r.error) throw r.error;
      return r.data;
    },
    enabled: Number.isFinite(args.lng) && Number.isFinite(args.lat),
    staleTime: 60_000,
  });
