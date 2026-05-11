import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Share2 } from 'lucide-react';
import { type BusinessDirectoryRow, getCategoryAsset } from '@neighborhub/shared';
import { RatingStars } from '@/components/brand/RatingStars';

type Props = { business: BusinessDirectoryRow };

const onShare = async (business: BusinessDirectoryRow): Promise<void> => {
  const url   = window.location.href;
  const title = business.name;
  if (navigator.share) {
    await navigator.share({ title, url }).catch(() => undefined);
    return;
  }
  await navigator.clipboard.writeText(url).catch(() => undefined);
};

export const BusinessHero = ({ business }: Props) => {
  const navigate = useNavigate();
  const photo = business.hero_photo_url ?? business.photo_url;
  const asset = getCategoryAsset(business.category_name);

  return (
    <header className="relative h-[55vh] min-h-[320px] w-full overflow-hidden">
      {photo ? (
        <img
          src={photo}
          alt={business.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${asset.color}, #8A8A8A)` }}
        >
          <span className="text-9xl opacity-30">{asset.emoji}</span>
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-comal/85 via-comal/20 to-transparent" />

      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="Go back"
        className="absolute top-4 left-4 bg-paper/90 hover:bg-paper text-comal rounded-full p-2 shadow-soft"
      >
        <ArrowLeft size={20} />
      </button>

      <button
        type="button"
        onClick={() => void onShare(business)}
        aria-label="Share"
        className="absolute top-4 right-4 bg-paper/90 hover:bg-paper text-comal rounded-full p-2 shadow-soft"
      >
        <Share2 size={20} />
      </button>

      <div className="absolute bottom-0 left-0 right-0 p-5 text-paper">
        <span
          className="inline-block font-body text-xs uppercase tracking-widest font-bold px-2 py-0.5 rounded-sharp"
          style={{ backgroundColor: business.category_color, color: '#fff' }}
        >
          {business.category_name}
        </span>
        <h1 className="font-display text-4xl md:text-5xl tracking-wider mt-2">{business.name}</h1>
        <div className="flex items-center gap-3 mt-2">
          <RatingStars rating={business.rating_avg} totalReviews={business.total_reviews} />
          {business.neighborhood && (
            <Link
              to={`/explore?neighborhood=${encodeURIComponent(business.neighborhood)}`}
              className="font-body text-sm underline opacity-90 hover:opacity-100"
            >
              {business.neighborhood}
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
