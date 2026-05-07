import { useQuery, type UseQueryResult } from '@tanstack/react-query';
import { listCategories } from '../services/categoryService';
import { getSupabase } from '../supabase/client';
import type { Category } from '../supabase/database.types';

export const useCategories = (): UseQueryResult<Category[]> =>
  useQuery({
    queryKey: ['categories', 'list'],
    queryFn: async () => {
      const r = await listCategories(getSupabase());
      if (r.error) throw r.error;
      return r.data;
    },
    staleTime: 5 * 60_000,
  });
