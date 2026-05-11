import { getCategoryAsset } from '@neighborhub/shared';

type Props = {
  category: string;
  active?: boolean;
  onClick?: () => void;
};

export const MapPin = ({ category, active, onClick }: Props) => {
  const asset = getCategoryAsset(category);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Open ${category} business`}
      className="relative -translate-x-1/2 -translate-y-full focus:outline-none"
      style={{ filter: active ? 'drop-shadow(0 0 6px rgba(192,57,43,0.6))' : undefined }}
    >
      <svg width="36" height="46" viewBox="0 0 36 46" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M18 0C8 0 0 8 0 18c0 13 18 28 18 28s18-15 18-28C36 8 28 0 18 0z"
          fill={asset.color}
          stroke="#fff"
          strokeWidth="2"
        />
        <circle cx="18" cy="17" r="11" fill="#fff" />
      </svg>
      <span
        aria-hidden="true"
        className="absolute left-1/2 top-[14px] -translate-x-1/2 text-[18px] leading-none"
      >
        {asset.emoji}
      </span>
    </button>
  );
};
