import { getCategoryAsset } from '@neighborhub/shared';

type Size = 'sm' | 'md' | 'lg' | 'xl';

const PIXELS: Record<Size, number> = { sm: 48, md: 80, lg: 120, xl: 160 };

type Props = {
  category: string;
  size?:    Size;
  selected?: boolean;
  onSelect?: (slug: string) => void;
  label?:    string;
};

export const MetalPlate = ({
  category,
  size = 'md',
  selected = false,
  onSelect,
  label,
}: Props) => {
  const asset = getCategoryAsset(category);
  const px    = PIXELS[size];
  const isInteractive = Boolean(onSelect);

  const Tag = isInteractive ? 'button' : 'div';

  return (
    <Tag
      type={isInteractive ? 'button' : undefined}
      onClick={isInteractive ? () => onSelect?.(category) : undefined}
      style={{ width: px, height: px }}
      className={[
        'relative flex items-center justify-center rounded-md overflow-hidden',
        'transition-transform shadow-metal',
        selected ? 'outline outline-[3px] outline-toldo translate-x-[2px] translate-y-[2px]' : '',
        isInteractive ? 'hover:scale-105 cursor-pointer' : '',
      ].join(' ')}
      aria-label={label ?? category}
    >
      {asset.plate ? (
        <img src={asset.plate} alt={category} className="w-full h-full object-cover" />
      ) : (
        <div
          className="flex items-center justify-center w-full h-full text-4xl"
          style={{
            background: `linear-gradient(135deg, ${asset.color}, #8A8A8A)`,
          }}
        >
          <span aria-hidden="true">{asset.emoji}</span>
        </div>
      )}
    </Tag>
  );
};
