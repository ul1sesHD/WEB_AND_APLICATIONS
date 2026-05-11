import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import {
  type BusinessDirectoryRow,
  type FindNearbyResult,
  formatDistance,
  getCategoryAsset,
} from '@neighborhub/shared';
import { ROUTES } from '@/routes';
import { RatingStars } from '@/components/brand/RatingStars';
import { BadgeChip } from '@/components/brand/BadgeChip';

type SourceBusiness = BusinessDirectoryRow | FindNearbyResult;

type Props = {
  business: SourceBusiness;
  variant?: 'full' | 'preview' | 'compact';
  distanceMeters?: number;
};

const isDirectory = (b: SourceBusiness): b is BusinessDirectoryRow =>
  'category_image_url' in b;

const categorySlug = (b: SourceBusiness): string => {
  if (isDirectory(b)) return b.category_name;
  return b.category_name;
};

export const BusinessCard = ({ business, variant = 'full', distanceMeters }: Props) => {
  const slug   = categorySlug(business);
  const asset  = getCategoryAsset(slug);
  const photo  = business.photo_url ?? asset.plate;
  const dist   = distanceMeters ?? ('distance_meters' in business ? business.distance_meters : null);

  const isPreview = variant === 'preview';
  const isCompact = variant === 'compact';

  return (
    <Link
      to={ROUTES.businessDetail(business.id)}
      className="block group focus:outline-none"
    >
      <article
        className="bg-paper border border-comal/15 rounded-md overflow-hidden transition-all hover:shadow-soft"
      >
        <div
          className="h-1.5 w-full"
          style={{ backgroundColor: business.category_color }}
          aria-hidden="true"
        />

        <div className={isPreview || isCompact ? 'flex gap-3 p-3' : 'p-3'}>
          {photo ? (
            <img
              src={photo}
              alt={business.name}
              loading="lazy"
              className={[
                'rounded-md object-cover',
                isPreview || isCompact ? 'w-20 h-20 flex-none' : 'w-full aspect-[4/3] mb-3',
              ].join(' ')}
            />
          ) : (
            <div
              className={[
                'rounded-md flex items-center justify-center',
                isPreview || isCompact ? 'w-20 h-20 flex-none' : 'w-full aspect-[4/3] mb-3',
              ].join(' ')}
              style={{ background: `linear-gradient(135deg, ${asset.color}, #8A8A8A)` }}
            >
              <span className={isPreview || isCompact ? 'text-3xl' : 'text-5xl'}>{asset.emoji}</span>
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-xl tracking-wider text-comal truncate group-hover:text-toldo">
                {business.name}
              </h3>
              {dist !== null && Number.isFinite(dist) && (
                <span className="font-body text-xs uppercase tracking-wider text-adobe whitespace-nowrap flex items-center gap-1">
                  <MapPin size={12} /> {formatDistance(dist)}
                </span>
              )}
            </div>

            <p className="font-body text-xs uppercase tracking-wider text-adobe mb-1">{slug}</p>

            <div className="flex items-center justify-between gap-2">
              <RatingStars rating={business.rating_avg} totalReviews={business.total_reviews} />
            </div>

            {!isPreview && !isCompact && isDirectory(business) && business.badges.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {business.badges.slice(0, 3).map((b) => (
                  <BadgeChip key={b.type} type={b.type} />
                ))}
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
};
