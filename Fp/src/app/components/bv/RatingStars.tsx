// Componente de estrellas de calificación
import React from 'react';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'lg';
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export function RatingStars({ rating, maxRating = 5, size = 'sm', interactive = false, onChange }: RatingStarsProps) {
  const [hovered, setHovered] = React.useState(0);
  const starSize = size === 'lg' ? 32 : 14;

  return (
    <div style={{ display: 'flex', gap: size === 'lg' ? 6 : 2, alignItems: 'center' }}>
      {Array.from({ length: maxRating }).map((_, i) => {
        const filled = i < (interactive && hovered ? hovered : Math.round(rating));
        return (
          <span
            key={i}
            style={{
              fontSize: starSize,
              color: filled ? '#F4C430' : 'rgba(62,39,35,0.2)',
              cursor: interactive ? 'pointer' : 'default',
              lineHeight: 1,
              transition: 'color 0.15s',
            }}
            onMouseEnter={() => interactive && setHovered(i + 1)}
            onMouseLeave={() => interactive && setHovered(0)}
            onClick={() => interactive && onChange && onChange(i + 1)}
          >
            ★
          </span>
        );
      })}
    </div>
  );
}
