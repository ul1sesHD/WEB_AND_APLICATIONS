import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { getUserImpact } from '../services/profileService';
import { getSupabase } from '../supabase/client';
import type { UserImpactRow } from '../supabase/database.types';

export const useUserImpact = (userId: string | undefined): UseQueryResult<UserImpactRow | null> =>
  useQuery({
    queryKey: ['profiles', 'impact', userId],
    queryFn: async () => {
      if (!userId) throw new Error('userId is required');
      const r = await getUserImpact(getSupabase(), userId);
      if (r.error) throw r.error;
      return r.data;
    },
    enabled: Boolean(userId),
    staleTime: 30_000,
  });
