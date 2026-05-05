// PuestoCard — Tarjeta estilo "letrero de puesto callejero" para Negocios Destacados
// Tamaño fijo, rating como precio, texto muted explicando por qué destaca.
import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Negocio,
  calcularDistancia,
  formatearDistancia,
  getCategoriaById,
} from '../../data/mockData';
import { CategoriaIcon, IconMap, IconStar } from './AbstractIcon';
import { useBarrioStore } from '../../store/useStore';

interface PuestoCardProps {
  negocio: Negocio;
  onClick?: () => void;
  tilt?: number;
}

const PALETA_LETRERO = ['#F4C430', '#E65100', '#C0392B', '#1A7A4A', '#1565C0', '#880E4F'];

export function PuestoCard({ negocio, onClick, tilt = 0 }: PuestoCardProps) {
  const { userLat, userLng } = useBarrioStore();
  const categoria = getCategoriaById(negocio.categoria_id);
  const distanciaKm = calcularDistancia(userLat, userLng, negocio.lat, negocio.lng);
  const distanciaTexto = formatearDistancia(distanciaKm);
  const colorCat = categoria?.color_hex ?? '#C0392B';
  const [hover, setHover] = useState(false);

  // Color del letrero según hash del id
  const sigla = negocio.id.charCodeAt(negocio.id.length - 1) % PALETA_LETRERO.length;
  const colorLetrero = PALETA_LETRERO[sigla];
  const textoOscuro = colorLetrero === '#F4C430';

  // Razón de destacado (texto muted)
  const razon = negocio.verificado
    ? 'Featured by the community · verified'
    : `Top ${categoria?.nombre.toLowerCase() ?? 'of the neighborhood'}`;

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      animate={{
        rotate: hover ? 0 : tilt,
        y: hover ? -6 : 0,
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      style={{
        width: 270,
        minWidth: 270,
        height: 380,
        flexShrink: 0,
        background: colorLetrero,
        border: 'none',
        borderRadius: 8,
        padding: 14,
        cursor: 'pointer',
        textAlign: 'left',
        position: 'relative',
        boxShadow: hover
          ? `0 0 0 2px ${colorLetrero}, 0 22px 40px rgba(0,0,0,0.45), 0 0 28px ${colorLetrero}aa`
          : '0 10px 22px rgba(0,0,0,0.4)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        transformOrigin: 'center top',
        transition: 'box-shadow 0.3s',
        fontFamily: "'Bebas Neue', sans-serif",
      }}
    >
      {/* Cinta amarilla pegada arriba */}
      <span
        style={{
          position: 'absolute',
          top: -10,
          left: '50%',
          transform: 'translateX(-50%) rotate(-3deg)',
          width: 70,
          height: 18,
          background: 'rgba(244,196,48,0.85)',
          border: '1px solid rgba(62,39,35,0.3)',
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(255,255,255,0.18) 0 4px, transparent 4px 10px)',
          boxShadow: '0 2px 5px rgba(0,0,0,0.25)',
        }}
      />

      {/* Borde interno punteado tipo cartulina */}
      <span
        style={{
          position: 'absolute',
          inset: 6,
          border: `2px dashed ${textoOscuro ? 'rgba(62,39,35,0.5)' : 'rgba(255,248,238,0.55)'}`,
          borderRadius: 5,
          pointerEvents: 'none',
        }}
      />

      {/* Textura papel sucio */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 22% 18%, rgba(255,255,255,0.3), transparent 45%), radial-gradient(circle at 78% 82%, rgba(0,0,0,0.18), transparent 50%)',
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
          borderRadius: 8,
        }}
      />

      {/* Header: categoría + ícono */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: 8 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 8,
            background: 'rgba(62,39,35,0.85)',
            border: '2px solid rgba(255,248,238,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 3px 5px rgba(0,0,0,0.25)',
          }}
        >
          <CategoriaIcon categoriaId={negocio.categoria_id} size={38} />
        </div>
        <div
          style={{
            fontSize: 11,
            letterSpacing: '0.08em',
            color: textoOscuro ? '#3E2723' : '#FFF8EE',
            background: textoOscuro ? 'rgba(62,39,35,0.18)' : 'rgba(0,0,0,0.25)',
            padding: '3px 8px',
            borderRadius: 3,
            textShadow: textoOscuro ? 'none' : '1px 1px 0 rgba(0,0,0,0.3)',
            lineHeight: 1.1,
          }}
        >
          {categoria?.nombre.toUpperCase() ?? 'BARRIO'}
        </div>
      </div>

      {/* Nombre tipo letrero pintado a mano */}
      <div
        style={{
          position: 'relative',
          fontSize: 26,
          letterSpacing: '0.03em',
          lineHeight: 1.02,
          color: textoOscuro ? '#3E2723' : '#FFF8EE',
          textShadow: textoOscuro
            ? '1px 1px 0 rgba(255,248,238,0.4)'
            : '2px 2px 0 rgba(62,39,35,0.85), -1px -1px 0 rgba(0,0,0,0.35)',
          transform: 'rotate(-1deg)',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical' as const,
          flex: '0 0 auto',
          minHeight: 84,
        }}
      >
        ¡{negocio.nombre.toUpperCase()}!
      </div>

      {/* Rating como "precio" — protagonista */}
      <div
        style={{
          position: 'relative',
          alignSelf: 'flex-start',
          background: textoOscuro ? '#C0392B' : '#F4C430',
          color: textoOscuro ? '#FFF8EE' : '#3E2723',
          padding: '6px 12px',
          borderRadius: 4,
          border: '2px solid rgba(62,39,35,0.5)',
          boxShadow: '2px 3px 0 rgba(0,0,0,0.3)',
          transform: 'rotate(-2deg)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <IconStar color={textoOscuro ? '#F4C430' : '#C0392B'} size={18} />
        <span
          style={{
            fontSize: 32,
            letterSpacing: '0.02em',
            lineHeight: 1,
            textShadow: '1px 1px 0 rgba(0,0,0,0.25)',
          }}
        >
          {negocio.rating_promedio.toFixed(1)}
        </span>
        <span
          style={{
            fontSize: 11,
            letterSpacing: '0.06em',
            opacity: 0.85,
          }}
        >
          /5
        </span>
      </div>

      {/* Distancia */}
      <div
        style={{
          position: 'relative',
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 800,
          fontSize: 11,
          color: textoOscuro ? '#3E2723' : '#FFF8EE',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 5,
          textShadow: textoOscuro ? 'none' : '1px 1px 0 rgba(0,0,0,0.35)',
        }}
      >
        <IconMap color={textoOscuro ? '#3E2723' : '#FFF8EE'} size={11} />
        {distanciaTexto} · {negocio.total_resenas} reseñas
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Razón de destacado — muted */}
      <div
        style={{
          position: 'relative',
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 700,
          fontSize: 10.5,
          letterSpacing: '0.02em',
          color: textoOscuro ? 'rgba(62,39,35,0.65)' : 'rgba(255,248,238,0.7)',
          fontStyle: 'italic',
          lineHeight: 1.35,
          borderTop: textoOscuro
            ? '1px dashed rgba(62,39,35,0.35)'
            : '1px dashed rgba(255,248,238,0.4)',
          paddingTop: 6,
        }}
      >
        {razon}
      </div>
    </motion.button>
  );
}
