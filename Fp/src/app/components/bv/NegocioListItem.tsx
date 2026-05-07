// Elemento de lista de negocio — fila completa con hover iluminado
import { useState } from 'react';
import { motion } from 'motion/react';
import { Negocio, calcularDistancia, formatearDistancia, getCategoriaById } from '../../data/mockData';
import { RatingStars } from './RatingStars';
import { VerifiedBadge } from './VerifiedBadge';
import { CategoriaIcon } from './AbstractIcon';
import { useBarrioStore } from '../../store/useStore';

interface NegocioListItemProps {
  negocio: Negocio;
  onClick?: () => void;
}

export function NegocioListItem({ negocio, onClick }: NegocioListItemProps) {
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
      whileTap={{ scale: 0.995 }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '12px 16px',
        background: hover ? '#FFFCF3' : '#FFF8EE',
        borderBottom: '1px solid rgba(62,39,35,0.08)',
        borderLeft: hover ? `4px solid ${colorCategoria}` : '4px solid transparent',
        boxShadow: hover ? `inset 0 0 24px ${colorCategoria}14` : 'none',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      <CategoriaIcon categoriaId={negocio.categoria_id} size={48} />
      {/* mantener referencia para evitar warnings */}
      <span style={{ display: 'none' }}>{colorCategoria}</span>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 15,
              letterSpacing: '0.04em',
              color: '#3E2723',
            }}
          >
            {negocio.nombre}
          </span>
          {negocio.verificado && <VerifiedBadge />}
        </div>
        <div
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: 12,
            color: '#5D4037',
            marginTop: 2,
          }}
        >
          {categoria?.nombre}
        </div>
        <RatingStars rating={negocio.rating_promedio} />
      </div>

      {/* Distancia */}
      <div style={{ textAlign: 'right' }}>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 16,
            color: '#C0392B',
            letterSpacing: '0.04em',
          }}
        >
          {distanciaTexto}
        </div>
        <div
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            color: '#5D4037',
          }}
        >
          {negocio.total_visitas} visits
        </div>
      </div>
    </motion.div>
  );
}
