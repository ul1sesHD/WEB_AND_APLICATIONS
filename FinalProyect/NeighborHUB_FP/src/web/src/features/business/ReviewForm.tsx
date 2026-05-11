import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCreateReview } from '@neighborhub/shared';
import { Button } from '@/components/ui/Button';
import { RatingStars } from '@/components/brand/RatingStars';
import { useAuthStore } from '@/stores/authStore';

const schema = z.object({
  rating:  z.number().int().min(1, 'Pick a rating').max(5),
  comment: z.string().max(1000, 'Max 1000 characters').optional(),
});
type Values = z.infer<typeof schema>;

type Props = {
  businessId: string;
  onDone:     () => void;
};

export const ReviewForm = ({ businessId, onDone }: Props) => {
  const { profile } = useAuthStore();
  const create      = useCreateReview();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register, handleSubmit, formState: { errors }, setValue, watch,
  } = useForm<Values>({ resolver: zodResolver(schema), defaultValues: { rating: 0, comment: '' } });

  const rating = watch('rating');

  const onSubmit = async (values: Values): Promise<void> => {
    setServerError(null);
    if (!profile) {
      setServerError('Sign in to leave a review.');
      return;
    }
    try {
      await create.mutateAsync({
        business_id: businessId,
        author_id:   profile.id,
        rating:      values.rating,
        comment:     values.comment ?? null,
      });
      onDone();
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Could not submit review.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <p className="font-body font-bold text-sm uppercase tracking-wide text-comal mb-1">Your rating</p>
        <RatingStars
          rating={rating}
          size={28}
          interactive
          onChange={(v) => setValue('rating', v, { shouldValidate: true })}
        />
        {errors.rating && <p className="text-toldo text-sm font-bold mt-1">{errors.rating.message}</p>}
      </div>

      <label className="flex flex-col gap-1">
        <span className="font-body font-bold text-sm uppercase tracking-wide text-comal">Comment</span>
        <textarea
          {...register('comment')}
          rows={4}
          maxLength={1000}
          placeholder="What stood out?"
          className="bg-paper border-2 border-comal/30 focus:border-toldo rounded-sharp px-4 py-3 font-body text-comal placeholder-adobe focus:outline-none"
        />
        {errors.comment && <p className="text-toldo text-sm font-bold">{errors.comment.message}</p>}
      </label>

      {serverError && <p className="text-toldo text-sm font-bold">{serverError}</p>}

      <Button type="submit" disabled={create.isPending} fullWidth>
        {create.isPending ? 'Posting…' : 'Post review'}
      </Button>
    </form>
  );
};
