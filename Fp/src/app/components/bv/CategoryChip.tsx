// Chip de categoría con punto de color (sin emoji) y hovers
import { useState } from 'react';

interface CategoryChipProps {
  icono?: string; // ignorado: lo reemplazamos con un punto de color
  nombre: string;
  active?: boolean;
  color?: string;
  onClick?: () => void;
}

export function CategoryChip({
  nombre,
  active = false,
  color = '#F4C430',
  onClick,
}: CategoryChipProps) {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '8px 14px',
        borderRadius: 4,
        border: active ? `1.5px solid ${color}` : '1.5px solid #3E2723',
        background: active ? '#3E2723' : hover ? '#FFEDB8' : '#FFF8EE',
        color: active ? '#F4C430' : '#3E2723',
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 13,
        letterSpacing: '0.06em',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
        transition: 'all 0.15s',
        outline: 'none',
        boxShadow: active
          ? '0 3px 6px rgba(0,0,0,0.2)'
          : hover
          ? '0 2px 4px rgba(0,0,0,0.12)'
          : 'none',
        transform: hover && !active ? 'translateY(-1px)' : 'none',
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: '50%',
          background: color,
          boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.35)',
          display: 'inline-block',
        }}
      />
      {nombre}
    </button>
  );
}
