import type { Sb } from '../supabase/client';
import type { Verification, VerificationInsert } from '../supabase/database.types';
import { ServiceError, ok, fail, type Result } from './_base';

export const listVerificationsForBusiness = async (
  sb: Sb,
  businessId: string,
): Promise<Result<Verification[]>> => {
  const { data, error } = await sb
    .from('verifications')
    .select('*')
    .eq('business_id', businessId)
    .order('created_at', { ascending: false });
  if (error) return fail(new ServiceError(error.message, 'verifications_list_failed'));
  return ok(data ?? []);
};

export const createVerification = async (
  sb: Sb,
  payload: VerificationInsert,
): Promise<Result<Verification>> => {
  const { data, error } = await sb.from('verifications').insert(payload).select().single();
  if (error) return fail(new ServiceError(error.message, 'verifications_create_failed'));
  return ok(data);
};

export const removeVerification = async (sb: Sb, id: string): Promise<Result<true>> => {
  const { error } = await sb.from('verifications').delete().eq('id', id);
  if (error) return fail(new ServiceError(error.message, 'verifications_delete_failed'));
  return ok(true);
};
