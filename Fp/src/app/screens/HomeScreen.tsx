// SCR-03: Home / Mapa — pantalla principal autenticada
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { TopNav } from '../components/bv/TopNav';
import { BottomNav } from '../components/bv/BottomNav';
import { CategoryChip } from '../components/bv/CategoryChip';
import { PhotoCarousel } from '../components/bv/PhotoCarousel';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { HOME_PHOTOS } from '../data/photos';
import { IconStore, PapelPicado, IconSol, IconMap } from '../components/bv/AbstractIcon';
import { motion } from 'motion/react';
import { NegocioCard } from '../components/bv/NegocioCard';
import { NegocioListItem } from '../components/bv/NegocioListItem';
import { ImpactBanner } from '../components/bv/ImpactBanner';
import { useBarrioStore } from '../store/useStore';
import { CATEGORIAS, NEGOCIOS, getCategoriaById, calcularDistancia } from '../data/mockData';

export function HomeScreen() {
  const navigate = useNavigate();
  const { userLat, userLng, impacto, filtros, setFiltros, coloniaActual } = useBarrioStore();
  const [search, setSearch] = useState('');

  // Filtra negocios por categoría y búsqueda
  const negociosFiltrados = NEGOCIOS.filter((n) => {
    if (filtros.categoria && n.categoria_id !== filtros.categoria) return false;
    if (search && !n.nombre.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }).sort((a, b) => {
    const dA = calcularDistancia(userLat, userLng, a.lat, a.lng);
    const dB = calcularDistancia(userLat, userLng, b.lat, b.lng);
    return dA - dB;
  });

  return (
    <div
      style={{
        background: '#FFF8EE',
        minHeight: '100vh',
        paddingBottom: 70,
        maxWidth: 768,
        margin: '0 auto',
        position: 'relative',
      }}
    >
      <TopNav
        showSearch={true}
        searchValue={search}
        onSearchChange={setSearch}
      />

      {/* Papel picado decorativo */}
      <PapelPicado />

      {/* Carrusel hero del barrio */}
      <div style={{ padding: '14px 16px 6px', position: 'relative' }}>
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <PhotoCarousel glowColor="#C0392B" height={200} photos={HOME_PHOTOS} />
        </motion.div>
        {/* Sol flotante */}
        <motion.div
          animate={{ y: [0, -6, 0], rotate: [0, 6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: -18, right: 18, zIndex: 2 }}
        >
          <IconSol size={56} />
        </motion.div>
      </div>

      {/* Mapa — preview estático con panel de datos */}
      <div
        style={{
          margin: '8px 16px 0',
          borderRadius: 12,
          overflow: 'hidden',
          boxShadow:
            '0 12px 28px rgba(62,39,35,0.25), inset 0 0 0 2px rgba(244,196,48,0.4)',
          background: '#FFF8EE',
          aspectRatio: '16 / 11',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        {/* Imagen del mapa */}
        <div style={{ position: 'relative', flex: '1 1 auto', overflow: 'hidden' }}>
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1754298994778-514e0a285479?w=1400"
            alt="Vista de mapa del barrio"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: 'sepia(0.15) saturate(1.1)',
            }}
          />
          {/* Overlay viñeta */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(ellipse at center, transparent 50%, rgba(62,39,35,0.35) 100%)',
              pointerEvents: 'none',
            }}
          />
          {/* Pin central usuario */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -100%)',
              filter: 'drop-shadow(0 3px 4px rgba(0,0,0,0.4))',
            }}
          >
            <svg viewBox="0 0 32 40" width="36" height="46">
              <path
                d="M16 0C7.163 0 0 7.163 0 16c0 11 16 24 16 24s16-13 16-24C32 7.163 24.837 0 16 0z"
                fill="#C0392B"
                stroke="#FFF8EE"
                strokeWidth="2"
              />
              <circle cx="16" cy="14" r="5" fill="#FFF8EE" />
            </svg>
          </div>
          {/* Pill colonia */}
          <div
            style={{
              position: 'absolute',
              top: 10,
              left: 10,
              background: 'rgba(62,39,35,0.85)',
              color: '#FFF8EE',
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
              fontSize: 11,
              padding: '6px 10px',
              borderRadius: 999,
              letterSpacing: '0.05em',
              border: '1px solid rgba(244,196,48,0.5)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <IconMap color="#F4C430" size={12} />
            {coloniaActual?.toUpperCase?.() ?? 'COYOACAN'} · 5 KM
          </div>
        </div>

        {/* Panel de campos del mapa */}
        <div
          style={{
            background: 'rgba(255,248,238,0.95)',
            borderTop: '2px solid rgba(244,196,48,0.5)',
            padding: '10px 12px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 8,
            fontFamily: "'Nunito', sans-serif",
          }}
        >
          <MapField label="Businesses" value={`${negociosFiltrados.length}`} color="#C0392B" />
          <MapField
            label="Location"
            value={`${userLat.toFixed(3)}, ${userLng.toFixed(3)}`}
            color="#1565C0"
          />
          <MapField label="Radius" value="5 km" color="#1A7A4A" />
        </div>
      </div>

      {/* Botón EXPLORAR + leyenda glass debajo del mapa */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          alignItems: 'center',
          padding: '12px 16px 4px',
        }}
      >
        <button
          onClick={() => navigate('/explorar')}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.boxShadow =
              '0 0 0 2px #F4C430, 0 12px 22px rgba(230,81,0,0.45)')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.boxShadow =
              '0 6px 14px rgba(230,81,0,0.35)')
          }
          style={{
            flex: 1,
            background: 'linear-gradient(180deg, #E65100 0%, #C44900 100%)',
            color: '#FFF8EE',
            border: 'none',
            borderRadius: 999,
            padding: '10px 18px',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 15,
            letterSpacing: '0.08em',
            cursor: 'pointer',
            boxShadow: '0 6px 14px rgba(230,81,0,0.35)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: 'box-shadow 0.2s',
          }}
        >
          EXPLORE BIG
        </button>
        <span
          style={{
            background: 'rgba(62,39,35,0.85)',
            color: '#FFF8EE',
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 800,
            fontSize: 11,
            padding: '8px 12px',
            borderRadius: 999,
            letterSpacing: '0.05em',
            border: '1px solid rgba(244,196,48,0.5)',
            whiteSpace: 'nowrap',
          }}
        >
          {negociosFiltrados.length} businesses · 5 km
        </span>
      </div>

      {/* Chips de categoría */}
      <div
        style={{
          display: 'flex',
          gap: 8,
          overflowX: 'auto',
          padding: '10px 16px',
          background: '#fff',
          borderBottom: '1px solid rgba(62,39,35,0.1)',
        }}
      >
        <CategoryChip
          nombre="ALL"
          color="#F4C430"
          active={!filtros.categoria}
          onClick={() => setFiltros({ categoria: null })}
        />
        {CATEGORIAS.map((cat) => (
          <CategoryChip
            key={cat.id}
            nombre={cat.nombre.split(' ')[0].toUpperCase()}
            color={cat.color_hex}
            active={filtros.categoria === cat.id}
            onClick={() => setFiltros({ categoria: filtros.categoria === cat.id ? null : cat.id })}
          />
        ))}
      </div>

      {/* Banner de impacto */}
      {impacto && (
        <ImpactBanner
          km={impacto.total_km}
          co2={impacto.total_co2}
          dineroLocal={impacto.total_dinero_local}
        />
      )}

      {/* Cerca de ti */}
      <div style={{ padding: '16px 0 0' }}>
        <div style={{ padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 22,
              letterSpacing: '0.06em',
              color: '#3E2723',
              margin: 0,
              borderBottom: '2px solid #F4C430',
              paddingBottom: 2,
            }}
          >
            NEAR YOU
          </h2>
          <button
            onClick={() => navigate('/explorar')}
            style={{
              background: 'none',
              border: 'none',
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
              fontSize: 12,
              color: '#1565C0',
              cursor: 'pointer',
            }}
          >
            See all →
          </button>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 12,
            overflowX: 'auto',
            padding: '0 16px 16px',
          }}
        >
          {negociosFiltrados.slice(0, 6).map((negocio) => (
            <NegocioCard
              key={negocio.id}
              negocio={negocio}
              onClick={() => navigate(`/negocio/${negocio.id}`)}
            />
          ))}
        </div>
      </div>

      {/* Directorio */}
      <div style={{ padding: '0 16px', marginBottom: 12 }}>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 22,
            letterSpacing: '0.06em',
            color: '#3E2723',
            margin: '0 0 2px',
            borderBottom: '2px solid #F4C430',
            paddingBottom: 2,
            display: 'inline-block',
          }}
        >
          DIRECTORY
        </h2>
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: 12,
            color: '#5D4037',
            margin: '4px 0 0',
          }}
        >
          {negociosFiltrados.length} businesses in {coloniaActual}
        </p>
      </div>

      <div style={{ background: '#fff', border: '1px solid rgba(62,39,35,0.08)' }}>
        {negociosFiltrados.length === 0 ? (
          <div style={{ padding: '40px 16px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
              <IconStore color="#C0392B" size={64} />
            </div>
            <p
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 20,
                color: '#5D4037',
                letterSpacing: '0.04em',
              }}
            >
              NO RESULTS
            </p>
            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: '#9e9e9e',
              }}
            >
              Be the first to register a business in your neighborhood
            </p>
            <button
              onClick={() => navigate('/registrar-negocio')}
              style={{
                marginTop: 12,
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 16,
                letterSpacing: '0.06em',
                color: '#fff',
                background: '#C0392B',
                border: 'none',
                borderBottom: '3px solid #922b21',
                borderRadius: 4,
                padding: '10px 24px',
                cursor: 'pointer',
              }}
            >
              + REGISTER BUSINESS
            </button>
          </div>
        ) : (
          negociosFiltrados.map((negocio) => (
            <NegocioListItem
              key={negocio.id}
              negocio={negocio}
              onClick={() => navigate(`/negocio/${negocio.id}`)}
            />
          ))
        )}
      </div>

      <BottomNav />
    </div>
  );
}

function MapField({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div
      style={{
        background: '#fff',
        border: `1px solid ${color}33`,
        borderLeft: `3px solid ${color}`,
        borderRadius: 6,
        padding: '6px 8px',
        minWidth: 0,
      }}
    >
      <div
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 10,
          letterSpacing: '0.08em',
          color: '#5D4037',
        }}
      >
        {label.toUpperCase()}
      </div>
      <div
        style={{
          fontWeight: 800,
          fontSize: 12,
          color: '#3E2723',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
        }}
      >
        {value}
      </div>
    </div>
  );
}