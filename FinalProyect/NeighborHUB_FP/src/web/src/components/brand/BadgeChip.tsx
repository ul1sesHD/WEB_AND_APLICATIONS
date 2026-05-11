import type { BadgeType } from '@neighborhub/shared';

const META: Record<BadgeType, { label: string; bg: string; fg: string; icon: string }> = {
  community_verified: { label: 'Verified',     bg: '#C3EDCF', fg: '#1A7A4A', icon: '✅' },
  top_rated:          { label: 'Top rated',    bg: '#FFF1B8', fg: '#7A5B00', icon: '⭐' },
  eco_friendly:       { label: 'Eco friendly', bg: '#C3EDCF', fg: '#1A7A4A', icon: '🌿' },
  local_history:      { label: 'Local legend', bg: '#F5C6C2', fg: '#880E4F', icon: '🏛️' },
  most_visited:       { label: 'Most visited', bg: '#FFD2A8', fg: '#7A2900', icon: '🔥' },
};

type Props = { type: BadgeType; size?: 'sm' | 'md' };

export const BadgeChip = ({ type, size = 'sm' }: Props) => {
  const meta = META[type];
  const padding = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-3 py-1 text-sm';
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sharp font-body font-bold uppercase tracking-wider ${padding}`}
      style={{ backgroundColor: meta.bg, color: meta.fg }}
    >
      <span aria-hidden="true">{meta.icon}</span>
      <span>{meta.label}</span>
    </span>
  );
};
