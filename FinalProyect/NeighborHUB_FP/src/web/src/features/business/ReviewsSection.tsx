import { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { useReviews, type ReviewWithAuthor } from '@neighborhub/shared';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Skeleton } from '@/components/ui/Skeleton';
import { RatingStars } from '@/components/brand/RatingStars';
import { ReviewForm } from './ReviewForm';

const PAGE = 5;

const ReviewItem = ({ review }: { review: ReviewWithAuthor }) => {
  const author = review.author?.name ?? 'Neighbor';
  const when   = formatDistanceToNow(new Date(review.created_at), { addSuffix: true });
  return (
    <li className="flex gap-3 border-b border-comal/10 last:border-b-0 py-4">
      {review.author?.avatar_url ? (
        <img src={review.author.avatar_url} alt="" className="w-10 h-10 rounded-full object-cover" />
      ) : (
        <div className="w-10 h-10 rounded-full bg-comal/15 flex items-center justify-center text-comal font-display">
          {author.charAt(0).toUpperCase()}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <p className="font-body font-bold text-comal">{author}</p>
          <span className="font-body text-xs text-adobe">{when}</span>
        </div>
        <RatingStars rating={review.rating} size={14} />
        {review.comment && (
          <p className="font-body text-sm text-comal mt-2 whitespace-pre-line">{review.comment}</p>
        )}
      </div>
    </li>
  );
};

export const ReviewsSection = ({ businessId }: { businessId: string }) => {
  const { data, isLoading } = useReviews(businessId);
  const [shown, setShown] = useState(PAGE);
  const [open,  setOpen]  = useState(false);

  const reviews = data ?? [];
  const visible = reviews.slice(0, shown);

  return (
    <section className="px-5 py-6 max-w-3xl mx-auto w-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-display text-2xl tracking-wider text-comal">REVIEWS ({reviews.length})</h2>
        <Button variant="outline" size="sm" onClick={() => setOpen(true)}>Leave a review</Button>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} className="h-20" />)}
        </div>
      ) : reviews.length === 0 ? (
        <p className="font-body text-adobe">Be the first to review this business.</p>
      ) : (
        <ul>
          {visible.map((r) => <ReviewItem key={r.id} review={r} />)}
        </ul>
      )}

      {shown < reviews.length && (
        <div className="text-center mt-4">
          <Button variant="ghost" onClick={() => setShown((n) => n + PAGE)}>Show more</Button>
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title="LEAVE A REVIEW">
        <ReviewForm businessId={businessId} onDone={() => setOpen(false)} />
      </Modal>
    </section>
  );
};
