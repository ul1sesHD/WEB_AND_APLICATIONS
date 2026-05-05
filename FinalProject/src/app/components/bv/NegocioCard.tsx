// Tarjeta compacta de negocio con borde iluminado al hover y icono 2D abstracto
import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Negocio,
  calcularDistancia,
  formatearDistancia,
  getCategoriaById,
} from '../../data/mockData';
import { RatingStars } from './RatingStars';
import { VerifiedBadge } from './VerifiedBadge';
import { StatusPill } from './StatusPill';
import { CategoriaIcon, IconMap } from './AbstractIcon';
import { useBarrioStore } from '../../store/useStore';

interface NegocioCardProps {
  negocio: Negocio;
  onClick?: () => void;
}

export function NegocioCard({ negocio, onClick }: NegocioCardProps) {
  const { userLat, userLng } = useBarrioStore();
  const categoria = getCategoriaById(negocio.categoria_id);
  const distanciaKm = calcularDistancia(userLat, userLng, negocio.lat, negocio.lng);
  const distanciaTexto = formatearDistancia(distanciaKm);
  const colorCategoria = categoria?.color_hex ?? '#C0392B';
  const [hover, setHover] = useState(false);

  return (
    <motion.div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      whileTap={{ scale: 0.98 }}
      animate={{ y: hover ? -4 : 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      style={{
        width: 178,
        minWidth: 178,
        background: '#FFF8EE',
        borderRadius: 10,
        overflow: 'hidden',
        cursor: 'pointer',
        boxShadow: hover
          ? `0 0 0 2px ${colorCategoria}, 0 14px 28px rgba(62,39,35,0.32), 0 0 24px ${colorCategoria}55`
          : '0 3px 10px rgba(62,39,35,0.14)',
        transition: 'box-shadow 0.25s ease',
        flexShrink: 0,
        position: 'relative',
      }}
    >
      {/* Banda de color superior */}
      <div
        style={{
          height: 6,
          background: `linear-gradient(90deg, ${colorCategoria} 0%, ${colorCategoria}cc 100%)`,
        }}
      />

      {/* Área de icono 2D abstracto sobre fondo coloreado */}
      <div
        style={{
          height: 86,
          background: `linear-gradient(135deg, ${colorCategoria}33, ${colorCategoria}11)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* patrón de fondo decorativo */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(244,196,48,0.18) 0 4px, transparent 4px), radial-gradient(circle at 80% 70%, rgba(192,57,43,0.12) 0 5px, transparent 5px)',
            backgroundSize: '40px 40px',
            opacity: hover ? 1 : 0.65,
            transition: 'opacity 0.25s',
          }}
        />
        <CategoriaIcon categoriaId={negocio.categoria_id} size={56} />
      </div>

      <div style={{ padding: '10px 10px 12px' }}>
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 10,
            letterSpacing: '0.08em',
            background: colorCategoria,
            color: '#fff',
            padding: '2px 7px',
            borderRadius: 3,
            boxShadow: 'inset 0 -2px 0 rgba(0,0,0,0.18)',
          }}
        >
          {categoria?.nombre ?? 'Negocio'}
        </span>

        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 16,
            letterSpacing: '0.04em',
            color: '#3E2723',
            lineHeight: 1.2,
            marginTop: 6,
            marginBottom: 5,
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const,
          }}
        >
          {negocio.nombre}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 5 }}>
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 12,
              color: '#1565C0',
              letterSpacing: '0.04em',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <IconMap color="#1565C0" size={11} />
            {distanciaTexto}
          </span>
          <StatusPill horario={negocio.horario} />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <RatingStars rating={negocio.rating_promedio} />
          <span
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              fontSize: 11,
              color: '#5D4037',
            }}
          >
            {negocio.rating_promedio.toFixed(1)}
          </span>
        </div>

        {negocio.verificado && (
          <div style={{ marginTop: 6 }}>
            <VerifiedBadge />
          </div>
        )}
      </div>
    </motion.div>
  );
}
