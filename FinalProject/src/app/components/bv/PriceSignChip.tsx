// Chip estilo letrero de precio "$15.00 KILO"
interface PriceSignChipProps {
  value: string;
  color?: string;
  bgColor?: string;
}

export function PriceSignChip({ value, color = '#fff', bgColor = '#C0392B' }: PriceSignChipProps) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 13,
        letterSpacing: '0.06em',
        padding: '2px 8px',
        background: bgColor,
        color: color,
        border: `1.5px solid ${color}33`,
        borderRadius: 3,
        lineHeight: 1.4,
      }}
    >
      {value}
    </span>
  );
}
