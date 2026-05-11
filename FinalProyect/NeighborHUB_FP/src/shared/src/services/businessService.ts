import type { Sb } from '../supabase/client';
import type {
  Business,
  BusinessInsert,
  BusinessUpdate,
  BusinessDirectoryRow,
  FindNearbyResult,
} from '../supabase/database.types';
import { toGeoPoint } from '../helpers/geo';
import { ServiceError, ok, fail, type Result } from './_base';

export type BusinessFilters = {
  categoryId?: string;
  search?: string;
  neighborhood?: string;
  limit?: number;
  offset?: number;
  sort?: 'newest' | 'rating' | 'name';
};

export const listBusinesses = async (
  sb: Sb,
  filters: BusinessFilters = {},
): Promise<Result<BusinessDirectoryRow[]>> => {
  const limit  = filters.limit  ?? 20;
  const offset = filters.offset ?? 0;
  let q = sb.from('v_business_directory').select('*').range(offset, offset + limit - 1);

  if (filters.categoryId)   q = q.eq('category_id', filters.categoryId);
  if (filters.neighborhood) q = q.eq('neighborhood', filters.neighborhood);
  if (filters.search)       q = q.ilike('name', `%${filters.search}%`);

  if (filters.sort === 'rating')      q = q.order('rating_avg',  { ascending: false });
  else if (filters.sort === 'name')   q = q.order('name',        { ascending: true });
  else                                q = q.order('created_at',  { ascending: false });

  const { data, error } = await q;
  if (error) return fail(new ServiceError(error.message, 'businesses_list_failed'));
  return ok(data ?? []);
};

export const getBusiness = async (sb: Sb, id: string): Promise<Result<BusinessDirectoryRow>> => {
  const { data, error } = await sb
    .from('v_business_directory')
    .select('*')
    .eq('id', id)
    .maybeSingle();
  if (error)    return fail(new ServiceError(error.message, 'businesses_get_failed'));
  if (!data)    return fail(new ServiceError('Business not found', 'businesses_not_found', 404));
  return ok(data);
};

export type NearbyArgs = {
  lng: number;
  lat: number;
  radius?: number;
  categoryId?: string;
  search?: string;
  limit?: number;
};

export const findNearby = async (sb: Sb, args: NearbyArgs): Promise<Result<FindNearbyResult[]>> => {
  const { data, error } = await sb.rpc('find_nearby_businesses', {
    user_location:   toGeoPoint(args.lng, args.lat),
    radius_meters:   args.radius     ?? 5000,
    category_filter: args.categoryId ?? null,
    search_query:    args.search     ?? null,
    result_limit:    args.limit      ?? 50,
  });
  if (error) return fail(new ServiceError(error.message, 'businesses_rpc_failed'));
  return ok(data ?? []);
};

export const createBusiness = async (sb: Sb, payload: BusinessInsert): Promise<Result<Business>> => {
  const { data, error } = await sb.from('businesses').insert(payload).select().single();
  if (error) return fail(new ServiceError(error.message, 'businesses_create_failed'));
  return ok(data);
};

export const updateBusiness = async (
  sb: Sb,
  id: string,
  patch: BusinessUpdate,
): Promise<Result<Business>> => {
  const { data, error } = await sb.from('businesses').update(patch).eq('id', id).select().single();
  if (error) return fail(new ServiceError(error.message, 'businesses_update_failed'));
  return ok(data);
};

export const softDeleteBusiness = (sb: Sb, id: string): Promise<Result<Business>> =>
  updateBusiness(sb, id, { deleted_at: new Date().toISOString() });
