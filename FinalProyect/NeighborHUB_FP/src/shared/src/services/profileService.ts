import type { Sb } from '../supabase/client';
import type { Profile, ProfileUpdate, UserImpactRow } from '../supabase/database.types';
import { ServiceError, ok, fail, type Result } from './_base';

export const getProfile = async (sb: Sb, id: string): Promise<Result<Profile>> => {
  const { data, error } = await sb.from('profiles').select('*').eq('id', id).maybeSingle();
  if (error) return fail(new ServiceError(error.message, 'profiles_get_failed'));
  if (!data) return fail(new ServiceError('Profile not found', 'profiles_not_found', 404));
  return ok(data);
};

export const getCurrentProfile = async (sb: Sb): Promise<Result<Profile | null>> => {
  const { data: session } = await sb.auth.getUser();
  if (!session.user) return ok(null);
  const { data, error } = await sb.from('profiles').select('*').eq('id', session.user.id).maybeSingle();
  if (error) return fail(new ServiceError(error.message, 'profiles_current_failed'));
  return ok(data);
};

export const updateProfile = async (
  sb: Sb,
  id: string,
  patch: ProfileUpdate,
): Promise<Result<Profile>> => {
  const { data, error } = await sb.from('profiles').update(patch).eq('id', id).select().single();
  if (error) return fail(new ServiceError(error.message, 'profiles_update_failed'));
  return ok(data);
};

export const softDeleteProfile = (sb: Sb, id: string): Promise<Result<Profile>> =>
  updateProfile(sb, id, { deleted_at: new Date().toISOString(), active: false });

export const getUserImpact = async (sb: Sb, userId: string): Promise<Result<UserImpactRow | null>> => {
  const { data, error } = await sb
    .from('v_user_impact')
    .select('*')
    .eq('user_id', userId)
    .maybeSingle();
  if (error) return fail(new ServiceError(error.message, 'profiles_impact_failed'));
  return ok(data);
};

export const listProfiles = async (sb: Sb, limit = 100): Promise<Result<Profile[]>> => {
  const { data, error } = await sb
    .from('profiles')
    .select('*')
    .is('deleted_at', null)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) return fail(new ServiceError(error.message, 'profiles_list_failed'));
  return ok(data ?? []);
};
