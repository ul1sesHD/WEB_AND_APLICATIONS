import { Star } from 'lucide-react';

type Props = {
  rating: number;
  size?: number;
  totalReviews?: number;
  interactive?: boolean;
  onChange?: (rating: number) => void;
};

const FILLED = '#F4C430';
const EMPTY  = '#BDBDBD';

export const RatingStars = ({ rating, size = 16, totalReviews, interactive, onChange }: Props) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <span className="inline-flex items-center gap-1" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
      {stars.map((value) => {
        const filled = rating >= value - 0.25;
        const StarBtn = interactive ? 'button' : 'span';
        return (
          <StarBtn
            key={value}
            type={interactive ? 'button' : undefined}
            onClick={interactive && onChange ? () => onChange(value) : undefined}
            className={interactive ? 'cursor-pointer focus:outline-none focus:ring-1 focus:ring-toldo' : ''}
            aria-label={interactive ? `Set rating to ${value}` : undefined}
          >
            <Star size={size} fill={filled ? FILLED : 'none'} stroke={filled ? FILLED : EMPTY} />
          </StarBtn>
        );
      })}
      {typeof totalReviews === 'number' && (
        <span className="font-body text-sm text-adobe ml-1">({totalReviews})</span>
      )}
    </span>
  );
};
