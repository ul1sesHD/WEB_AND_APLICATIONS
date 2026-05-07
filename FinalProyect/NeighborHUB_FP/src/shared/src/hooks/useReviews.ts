import {
  useQuery, useMutation, useQueryClient,
  type UseQueryResult, type UseMutationResult,
} from '@tanstack/react-query';
import { listReviewsForBusiness, createReview, type ReviewWithAuthor } from '../services/reviewService';
import { getSupabase } from '../supabase/client';
import type { Review, ReviewInsert } from '../supabase/database.types';

export const useReviews = (
  businessId: string | undefined,
): UseQueryResult<ReviewWithAuthor[]> =>
  useQuery({
    queryKey: ['reviews', businessId],
    queryFn: async () => {
      if (!businessId) throw new Error('businessId is required');
      const r = await listReviewsForBusiness(getSupabase(), businessId);
      if (r.error) throw r.error;
      return r.data;
    },
    enabled: Boolean(businessId),
  });

export const useCreateReview = (): UseMutationResult<Review, Error, ReviewInsert> => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (payload: ReviewInsert) => {
      const r = await createReview(getSupabase(), payload);
      if (r.error) throw r.error;
      return r.data;
    },
    onSuccess: (review) => {
      qc.invalidateQueries({ queryKey: ['reviews', review.business_id] });
      qc.invalidateQueries({ queryKey: ['businesses', 'detail', review.business_id] });
    },
  });
};
