import {
  useQuery, useMutation, useQueryClient,
  type UseQueryResult, type UseMutationResult,
} from '@tanstack/react-query';
import { getProfile, getCurrentProfile, updateProfile } from '../services/profileService';
import { getSupabase } from '../supabase/client';
import type { Profile, ProfileUpdate } from '../supabase/database.types';

export const useProfile = (id: string | undefined): UseQueryResult<Profile> =>
  useQuery({
    queryKey: ['profiles', id],
    queryFn: async () => {
      if (!id) throw new Error('Profile id is required');
      const r = await getProfile(getSupabase(), id);
      if (r.error) throw r.error;
      return r.data;
    },
    enabled: Boolean(id),
  });

export const useCurrentProfile = (): UseQueryResult<Profile | null> =>
  useQuery({
    queryKey: ['profiles', 'me'],
    queryFn: async () => {
      const r = await getCurrentProfile(getSupabase());
      if (r.error) throw r.error;
      return r.data;
    },
  });

export const useUpdateProfile = (): UseMutationResult<Profile, Error, { id: string; patch: ProfileUpdate }> => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, patch }) => {
      const r = await updateProfile(getSupabase(), id, patch);
      if (r.error) throw r.error;
      return r.data;
    },
    onSuccess: (profile) => {
      qc.invalidateQueries({ queryKey: ['profiles', profile.id] });
      qc.invalidateQueries({ queryKey: ['profiles', 'me'] });
    },
  });
};
