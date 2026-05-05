// Wrapper que ilumina el borde de un elemento al hacer hover, con color por sección.
import { useState, ReactNode, CSSProperties } from 'react';
import { motion } from 'motion/react';

interface HoverGlowProps {
  glowColor?: string;
  rounded?: number;
  children: ReactNode;
  style?: CSSProperties;
  onClick?: () => void;
  lift?: boolean;
  /** intensidad 0-1 */
  intensity?: number;
}

export function HoverGlow({
  glowColor = '#C0392B',
  rounded = 12,
  children,
  style,
  onClick,
  lift = true,
  intensity = 1,
}: HoverGlowProps) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={onClick}
      whileTap={{ scale: 0.985 }}
      animate={{ y: hover && lift ? -3 : 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      style={{
        position: 'relative',
        borderRadius: rounded,
        cursor: onClick ? 'pointer' : 'default',
        boxShadow: hover
          ? `0 0 0 2px ${glowColor}, 0 12px 28px rgba(62,39,35,0.28), 0 0 28px ${glowColor}${Math.round(
              0x55 * intensity,
            )
              .toString(16)
              .padStart(2, '0')}`
          : '0 3px 10px rgba(62,39,35,0.12)',
        transition: 'box-shadow 0.25s ease',
        ...style,
      }}
    >
      {children}
      {/* Resplandor superior glass */}
      {hover && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: rounded,
            pointerEvents: 'none',
            background: `linear-gradient(160deg, ${glowColor}10 0%, transparent 40%)`,
          }}
        />
      )}
    </motion.div>
  );
}
