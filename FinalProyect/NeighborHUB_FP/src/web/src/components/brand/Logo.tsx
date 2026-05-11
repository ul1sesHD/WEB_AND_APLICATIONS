import { useState } from 'react';

type Size = 'sm' | 'md' | 'lg' | 'xl';

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'max-w-[120px]',
  md: 'max-w-[200px]',
  lg: 'max-w-[320px]',
  xl: 'max-w-[480px]',
};

const TEXT_SIZE: Record<Size, string> = {
  sm: 'text-xl',
  md: 'text-3xl',
  lg: 'text-5xl',
  xl: 'text-6xl',
};

type Props = { size?: Size; className?: string };

export const Logo = ({ size = 'md', className = '' }: Props) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className={[SIZE_CLASSES[size], 'w-full', className].join(' ')}>
        <span className={`font-display ${TEXT_SIZE[size]} tracking-wider text-comal`}>
          NEIGHBORHUB
        </span>
      </div>
    );
  }

  return (
    <img
      src="/LogoNeighborHub.png"
      alt="NeighborHub"
      loading="eager"
      onError={() => setFailed(true)}
      className={[SIZE_CLASSES[size], 'h-auto w-full', className].join(' ')}
    />
  );
};
