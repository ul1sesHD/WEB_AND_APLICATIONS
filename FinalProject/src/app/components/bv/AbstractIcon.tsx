// Iconos SVG abstractos 2D — formas geométricas con estilo mexicano
// Todos aceptan color y size; muchos vienen con fondo oscuro (café comal) para contraste.
import React from 'react';

interface IconProps {
  color?: string;
  size?: number;
  bg?: string;
}

// Marco contenedor: fondo café comal o color custom para contraste
function Frame({
  size = 56,
  bg = '#3E2723',
  children,
  rounded = 14,
}: {
  size?: number;
  bg?: string;
  rounded?: number;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: bg,
        borderRadius: rounded,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow:
          '0 4px 12px rgba(62,39,35,0.35), inset 0 0 0 2px rgba(244,196,48,0.15)',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}
    >
      {/* Brillo glass */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 50%)',
          pointerEvents: 'none',
        }}
      />
      {children}
    </div>
  );
}

/* ---------- ICONOS BÁSICOS DE NAV ---------- */

export function IconMap({ color = '#C0392B', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M16 2C10 2 6 6 6 12c0 7 10 18 10 18s10-11 10-18c0-6-4-10-10-10z" fill={color} />
      <circle cx="16" cy="12" r="3.5" fill="#FFF8EE" />
    </svg>
  );
}

export function IconSearch({ color = '#E65100', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="13" cy="13" r="8" stroke={color} strokeWidth="3" fill="none" />
      <line x1="19" y1="19" x2="27" y2="27" stroke={color} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function IconPlus({ color = '#F4C430', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" fill={color} />
      <line x1="16" y1="8" x2="16" y2="24" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />
      <line x1="8" y1="16" x2="24" y2="16" stroke="#3E2723" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function IconRecycle({ color = '#1A7A4A', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <path d="M11 14l-4 5 5 1 1-4-2-2z M21 14l4 5-5 1-1-4 2-2z M16 4l-3 5h6l-3-5z" stroke={color} strokeWidth="2.2" fill={color} fillOpacity="0.25" strokeLinejoin="round" />
      <path d="M9 22l3 5 5-2 M23 22l-3 5-5-2 M14 8l2-3h0" stroke={color} strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function IconUser({ color = '#8B4513', size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="11" r="5" fill={color} />
      <path d="M5 28c0-6 5-10 11-10s11 4 11 10" fill={color} />
    </svg>
  );
}

export function IconBell({ color = '#F4C430', size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3a6 6 0 016 6v3l2 3H4l2-3V9a6 6 0 016-6z" fill={color} />
      <path d="M10 19a2 2 0 004 0" stroke={color} strokeWidth="2" fill="none" />
    </svg>
  );
}

export function IconStar({ color = '#F4C430', size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2l3 7 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1z" />
    </svg>
  );
}

export function IconSparkle({ color = '#F4C430', size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M12 2l2 8 8 2-8 2-2 8-2-8-8-2 8-2z" />
    </svg>
  );
}

export function IconCheck({ color = '#1A7A4A', size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11" fill={color} />
      <path d="M7 12l3.5 3.5L17 9" stroke="#FFF8EE" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function IconWarning({ color = '#F4C430', size = 18 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M12 3l11 18H1z" fill={color} stroke="#3E2723" strokeWidth="1.2" strokeLinejoin="round" />
      <line x1="12" y1="10" x2="12" y2="15" stroke="#3E2723" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="18" r="1" fill="#3E2723" />
    </svg>
  );
}

export function IconHeart({ color = '#C0392B', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill={color}>
      <path d="M16 28S4 19 4 11a6 6 0 0112-2 6 6 0 0112 2c0 8-12 17-12 17z" />
    </svg>
  );
}

export function IconMoney({ color = '#F4C430', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="13" fill={color} stroke="#8B4513" strokeWidth="2" />
      <path d="M16 8v16 M12 12c0-2 2-3 4-3s4 1 4 3-2 3-4 3-4 1-4 3 2 3 4 3 4-1 4-3" stroke="#8B4513" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function IconEarth({ color = '#1A7A4A', size = 32 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="13" fill="#1565C0" />
      <path d="M6 12c4 0 6 2 8 2s4-2 8-2 4 4 4 4-2 6-4 6-2-2-4-2-4 4-6 4-2-4-4-4-4-4-4-4 0-4 2-4z" fill={color} />
      <circle cx="16" cy="16" r="13" stroke="#3E2723" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export function IconBike({ color = '#1A7A4A', size = 28 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <circle cx="8" cy="22" r="5" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="24" cy="22" r="5" stroke={color} strokeWidth="2" fill="none" />
      <path d="M8 22l6-10h6l4 10" stroke={color} strokeWidth="2" fill="none" />
      <circle cx="14" cy="12" r="2" fill={color} />
    </svg>
  );
}

/* ---------- ICONOS DE CATEGORÍA — formas 2D abstractas con fondo oscuro ---------- */

// Maíz — granos abstractos en mazorca
export function IconMaiz({ size = 56 }: IconProps) {
  return (
    <Frame size={size} bg="#3E2723">
      <svg viewBox="0 0 48 48" width={size * 0.7} height={size * 0.7}>
        <ellipse cx="24" cy="26" rx="9" ry="16" fill="#F4C430" />
        {[0, 1, 2, 3, 4].map((r) =>
          [0, 1, 2].map((c) => (
            <circle
              key={`${r}-${c}`}
              cx={18 + c * 6}
              cy={14 + r * 5}
              r="2.2"
              fill="#FFD95C"
              stroke="#8B4513"
              strokeWidth="0.6"
            />
          )),
        )}
        <path d="M15 12c-3-2-5-6-3-9 4 0 7 3 8 7" fill="#1A7A4A" />
        <path d="M33 12c3-2 5-6 3-9-4 0-7 3-8 7" fill="#1A7A4A" />
      </svg>
    </Frame>
  );
}

// Fonda — comal con tortilla
export function IconFonda({ size = 56 }: IconProps) {
  return (
    <Frame size={size} bg="#3E2723">
      <svg viewBox="0 0 48 48" width={size * 0.72} height={size * 0.72}>
        <ellipse cx="24" cy="32" rx="18" ry="6" fill="#5D4037" />
        <ellipse cx="24" cy="29" rx="18" ry="5" fill="#8B4513" />
        <ellipse cx="24" cy="27" rx="13" ry="3" fill="#F4C430" />
        <circle cx="20" cy="27" r="0.8" fill="#8B4513" />
        <circle cx="28" cy="26.5" r="0.8" fill="#8B4513" />
        <path d="M14 18c2-4 6-6 10-6s8 2 10 6" stroke="#E65100" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M18 16c0-3 2-5 6-5s6 2 6 5" stroke="#C0392B" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    </Frame>
  );
}

// Tortillería — pila de tortillas
export function IconTortilla({ size = 56 }: IconProps) {
  return (
    <Frame size={size} bg="#3E2723">
      <svg viewBox="0 0 48 48" width={size * 0.72} height={size * 0.72}>
        {[0, 1, 2, 3].map((i) => (
          <ellipse
            key={i}
            cx="24"
            cy={32 - i * 5}
            rx="16"
            ry="4"
            fill={i % 2 === 0 ? '#F4C430' : '#FFD95C'}
            stroke="#8B4513"
            strokeWidth="1"
          />
        ))}
        <ellipse cx="24" cy="13" rx="14" ry="3" fill="#FFEDB8" stroke="#8B4513" strokeWidth="1" />
      </svg>
    </Frame>
  );
}

// Cremería — gota de leche
export function IconLeche({ size = 56 }: IconProps) {
  return (
    <Frame size={size} bg="#3E2723">
      <svg viewBox="0 0 48 48" width={size * 0.7} height={size * 0.7}>
        <path d="M24 6C18 16 12 22 12 30a12 12 0 0024 0c0-8-6-14-12-24z" fill="#FFF8EE" stroke="#1565C0" strokeWidth="2" />
        <ellipse cx="20" cy="28" rx="3" ry="5" fill="rgba(21,101,192,0.25)" />
      </svg>
    </Frame>
  );
}

// Verdulería — hoja
export function IconHoja({ size = 56 }: IconProps) {
  return (
    <Frame size={size} bg="#3E2723">
      <svg viewBox="0 0 48 48" width={size * 0.72} height={size * 0.72}>
        <path d="M8 38C14 14 30 8 42 8c0 18-12 32-30 32-2 0-4 0-4 0z" fill="#1A7A4A" />
        <path d="M10 36c8-12 18-20 30-26" stroke="#C3EDCF" strokeWidth="2" fill="none" />
        <path d="M16 32c2-3 4-5 7-7 M22 30c1-3 3-5 5-7" stroke="#C3EDCF" strokeWidth="1.4" fill="none" />
      </svg>
    </Frame>
  );
}

// Panadería — concha
export function IconConcha({ size = 56 }: IconProps) {
  return (
    <Frame size={size} bg="#3E2723">
      <svg viewBox="0 0 48 48" width={size * 0.72} height={size * 0.72}>
        <circle cx="24" cy="26" r="14" fill="#E67E22" />
        <path d="M14 26c0-6 4-10 10-10 M10 26c0-8 6-14 14-14 M18 26c0-3 2-6 6-6" stroke="#F4C430" strokeWidth="1.6" fill="none" />
        <path d="M30 26c0-6-4-10-10-10 M34 26c0-8-6-14-14-14 M26 26c0-3-2-6-6-6" stroke="#F4C430" strokeWidth="1.6" fill="none" />
      </svg>
    </Frame>
  );
}

// Purificadora — gota azul
export function IconAgua({ size = 56 }: IconProps) {
  return (
    <Frame size={size} bg="#3E2723">
      <svg viewBox="0 0 48 48" width={size * 0.7} height={size * 0.7}>
        <path d="M24 6C18 16 10 22 10 30a14 14 0 0028 0c0-8-8-14-14-24z" fill="#1565C0" />
        <path d="M16 30c0-4 2-7 5-9" stroke="#FFF8EE" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    </Frame>
  );
}

// Ferretería — llave inglesa
export function IconHerramienta({ size = 56 }: IconProps) {
  return (
    <Frame size={size} bg="#3E2723">
      <svg viewBox="0 0 48 48" width={size * 0.72} height={size * 0.72}>
        <rect x="12" y="20" width="24" height="8" rx="2" fill="#E65100" transform="rotate(-30 24 24)" />
        <circle cx="14" cy="32" r="6" fill="#E65100" />
        <circle cx="14" cy="32" r="2.5" fill="#3E2723" />
        <circle cx="34" cy="16" r="6" fill="#E65100" />
        <circle cx="34" cy="16" r="2.5" fill="#3E2723" />
      </svg>
    </Frame>
  );
}

// Mecánico — engrane
export function IconEngrane({ size = 56 }: IconProps) {
  return (
    <Frame size={size} bg="#3E2723">
      <svg viewBox="0 0 48 48" width={size * 0.72} height={size * 0.72}>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <rect
            key={deg}
            x="22"
            y="4"
            width="4"
            height="8"
            fill="#E65100"
            transform={`rotate(${deg} 24 24)`}
          />
        ))}
        <circle cx="24" cy="24" r="12" fill="#E65100" />
        <circle cx="24" cy="24" r="5" fill="#3E2723" />
      </svg>
    </Frame>
  );
}

// Zapatería — silueta de zapato
export function IconZapato({ size = 56 }: IconProps) {
  return (
    <Frame size={size} bg="#3E2723">
      <svg viewBox="0 0 48 48" width={size * 0.72} height={size * 0.72}>
        <path d="M6 30c0-4 4-6 10-6h6c4 0 6-2 10-2 6 0 10 2 12 6v4H6z" fill="#880E4F" />
        <rect x="6" y="32" width="38" height="4" fill="#3E2723" rx="1" />
      </svg>
    </Frame>
  );
}

// Bazar / moda circular — vestido
export function IconVestido({ size = 56 }: IconProps) {
  return (
    <Frame size={size} bg="#3E2723">
      <svg viewBox="0 0 48 48" width={size * 0.72} height={size * 0.72}>
        <path d="M18 8h12l-2 6 8 28H12l8-28z" fill="#880E4F" />
        <path d="M18 8c0 4 12 4 12 0" stroke="#F5C6C2" strokeWidth="2" fill="none" />
        <path d="M16 24h16 M14 30h20 M12 36h24" stroke="#F5C6C2" strokeWidth="1.2" />
      </svg>
    </Frame>
  );
}

// Granel — costales
export function IconGranel({ size = 56 }: IconProps) {
  return (
    <Frame size={size} bg="#3E2723">
      <svg viewBox="0 0 48 48" width={size * 0.72} height={size * 0.72}>
        <path d="M10 18c2-4 6-6 8-6s2 4 0 6c4 0 8 2 8 8v14H6V26c0-4 2-6 4-8z" fill="#1A7A4A" />
        <path d="M24 22c2-4 6-6 8-6s2 4 0 6c4 0 8 2 8 8v10H22V28c0-2 0-4 2-6z" fill="#C3EDCF" />
        <ellipse cx="16" cy="14" rx="3" ry="1.5" fill="#3E2723" />
        <ellipse cx="30" cy="18" rx="3" ry="1.5" fill="#3E2723" />
      </svg>
    </Frame>
  );
}

// Tienda genérica
export function IconStore({ color = '#C0392B', size = 56 }: IconProps) {
  return (
    <Frame size={size} bg="#3E2723">
      <svg viewBox="0 0 48 48" width={size * 0.78} height={size * 0.78}>
        <path d="M6 22l4-10h28l4 10z" fill={color} />
        <path d="M14 22l2-10 M22 22l2-10 M30 22l2-10" stroke="#FFF8EE" strokeWidth="1.2" />
        <rect x="8" y="22" width="32" height="20" fill="#FFF8EE" />
        <rect x="20" y="28" width="8" height="14" fill={color} />
      </svg>
    </Frame>
  );
}

// Devuelve el componente icono según el id de categoría
export function CategoriaIcon({ categoriaId, size = 56 }: { categoriaId: string; size?: number }) {
  const map: Record<string, (p: IconProps) => React.ReactElement> = {
    'cat-01': IconMaiz,
    'cat-02': IconFonda,
    'cat-03': IconTortilla,
    'cat-04': IconLeche,
    'cat-05': IconHoja,
    'cat-06': IconConcha,
    'cat-07': IconAgua,
    'cat-08': IconHerramienta,
    'cat-09': IconEngrane,
    'cat-10': IconZapato,
    'cat-11': IconVestido,
    'cat-12': IconGranel,
  };
  const Cmp = map[categoriaId] ?? IconStore;
  return <Cmp size={size} />;
}

/* ---------- ELEMENTOS DECORATIVOS FLOTANTES ---------- */

// Papel picado triangular
export function PapelPicado({
  count = 5,
  colors = ['#C0392B', '#F4C430', '#1A7A4A', '#1565C0', '#880E4F'],
}: {
  count?: number;
  colors?: string[];
}) {
  return (
    <svg
      viewBox="0 0 400 60"
      preserveAspectRatio="none"
      style={{ width: '100%', height: 50, display: 'block' }}
    >
      {Array.from({ length: count * 2 }).map((_, i) => {
        const x = (i * 400) / (count * 2);
        const w = 400 / (count * 2);
        const c = colors[i % colors.length];
        return (
          <g key={i}>
            <path
              d={`M${x} 0 L${x + w} 0 L${x + w / 2} 28 Z`}
              fill={c}
              opacity="0.92"
            />
            <circle cx={x + w / 2} cy={14} r={2.5} fill="#FFF8EE" />
            <circle cx={x + w / 4} cy={8} r={1.5} fill="#FFF8EE" />
            <circle cx={x + (3 * w) / 4} cy={8} r={1.5} fill="#FFF8EE" />
          </g>
        );
      })}
    </svg>
  );
}

// Talavera tile pattern flotante
export function TalaveraTile({ size = 80, color = '#1565C0' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80">
      <rect width="80" height="80" rx="6" fill="#FFF8EE" />
      <circle cx="40" cy="40" r="22" fill="none" stroke={color} strokeWidth="2" />
      <circle cx="40" cy="40" r="12" fill={color} fillOpacity="0.18" />
      {[0, 90, 180, 270].map((deg) => (
        <path
          key={deg}
          d="M40 18 Q46 28 40 40 Q34 28 40 18"
          fill={color}
          fillOpacity="0.65"
          transform={`rotate(${deg} 40 40)`}
        />
      ))}
      <circle cx="40" cy="40" r="3" fill="#F4C430" />
    </svg>
  );
}

// Sol estilizado
export function IconSol({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 * Math.PI) / 180;
        return (
          <line
            key={i}
            x1={32 + Math.cos(a) * 22}
            y1={32 + Math.sin(a) * 22}
            x2={32 + Math.cos(a) * 30}
            y2={32 + Math.sin(a) * 30}
            stroke="#F4C430"
            strokeWidth="3"
            strokeLinecap="round"
          />
        );
      })}
      <circle cx="32" cy="32" r="16" fill="#F4C430" />
      <circle cx="28" cy="30" r="2" fill="#3E2723" />
      <circle cx="36" cy="30" r="2" fill="#3E2723" />
      <path d="M27 36c2 2 8 2 10 0" stroke="#3E2723" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

// Cactus
export function IconCactus({ size = 56 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64">
      <rect x="26" y="20" width="12" height="36" rx="6" fill="#1A7A4A" />
      <rect x="14" y="30" width="8" height="18" rx="4" fill="#1A7A4A" />
      <rect x="14" y="30" width="8" height="6" rx="3" fill="#1A7A4A" />
      <rect x="42" y="26" width="8" height="22" rx="4" fill="#1A7A4A" />
      <path d="M30 16c0-3 2-5 4-5" stroke="#C0392B" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="32" cy="14" r="3" fill="#C0392B" />
    </svg>
  );
}
