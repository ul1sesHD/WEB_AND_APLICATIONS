import type { Sb } from '../supabase/client';
import type { Review, ReviewInsert } from '../supabase/database.types';
import { ServiceError, ok, fail, type Result } from './_base';

export type ReviewWithAuthor = Review & {
  author?: { id: string; name: string; avatar_url: string | null } | null;
};

export const listReviewsForBusiness = async (
  sb: Sb,
  businessId: string,
  limit = 20,
): Promise<Result<ReviewWithAuthor[]>> => {
  const { data, error } = await sb
    .from('reviews')
    .select('*, author:profiles!reviews_author_id_fkey(id,name,avatar_url)')
    .eq('business_id', businessId)
    .eq('active', true)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (error) return fail(new ServiceError(error.message, 'reviews_list_failed'));
  return ok(((data ?? []) as unknown) as ReviewWithAuthor[]);
};

export const createReview = async (sb: Sb, payload: ReviewInsert): Promise<Result<Review>> => {
  const { data, error } = await sb.from('reviews').insert(payload).select().single();
  if (error) return fail(new ServiceError(error.message, 'reviews_create_failed'));
  return ok(data);
};

export const updateReview = async (
  sb: Sb,
  id: string,
  patch: Partial<Pick<Review, 'rating' | 'comment' | 'active'>>,
): Promise<Result<Review>> => {
  const { data, error } = await sb.from('reviews').update(patch).eq('id', id).select().single();
  if (error) return fail(new ServiceError(error.message, 'reviews_update_failed'));
  return ok(data);
};

export const softDeleteReview = (sb: Sb, id: string): Promise<Result<Review>> =>
  updateReview(sb, id, { active: false });
