// SCR-04: Explorar / Búsqueda
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { X, SlidersHorizontal } from 'lucide-react';
import { NegocioListItem } from '../components/bv/NegocioListItem';
import { RatingStars } from '../components/bv/RatingStars';
import { BottomNav } from '../components/bv/BottomNav';
import { CategoryChip } from '../components/bv/CategoryChip';
import { TopNav } from '../components/bv/TopNav';
import { IconStore, IconMap, IconStar, IconHeart } from '../components/bv/AbstractIcon';
import { PhotoCarousel } from '../components/bv/PhotoCarousel';
import { EXPLORAR_PHOTOS } from '../data/photos';
import { useBarrioStore } from '../store/useStore';
import { CATEGORIAS, NEGOCIOS, calcularDistancia, getCategoriaById } from '../data/mockData';

type SortOption = 'cercano' | 'calificado' | 'visitado';

export function ExplorarScreen() {
  const navigate = useNavigate();
  const { userLat, userLng, coloniaActual } = useBarrioStore();
  const [search, setSearch] = useState('');
  const [activeCategoria, setActiveCategoria] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>('cercano');
  const [ratingMin, setRatingMin] = useState(0);
  const [soloVerificados, setSoloVerificados] = useState(false);
  const [radioKm, setRadioKm] = useState(5);
  const [showFilters, setShowFilters] = useState(false);

  const filtrados = NEGOCIOS.filter((n) => {
    if (activeCategoria && n.categoria_id !== activeCategoria) return false;
    if (search && !n.nombre.toLowerCase().includes(search.toLowerCase()) && !n.colonia.toLowerCase().includes(search.toLowerCase())) return false;
    if (n.rating_promedio < ratingMin) return false;
    if (soloVerificados && !n.verificado) return false;
    const dist = calcularDistancia(userLat, userLng, n.lat, n.lng);
    if (dist > radioKm) return false;
    return true;
  }).sort((a, b) => {
    if (sort === 'cercano') {
      return calcularDistancia(userLat, userLng, a.lat, a.lng) - calcularDistancia(userLat, userLng, b.lat, b.lng);
    }
    if (sort === 'calificado') return b.rating_promedio - a.rating_promedio;
    return b.total_visitas - a.total_visitas;
  });

  const activeFilters = [
    activeCategoria ? CATEGORIAS.find((c) => c.id === activeCategoria)?.nombre : null,
    ratingMin > 0 ? `★ ${ratingMin}+` : null,
    soloVerificados ? 'Verified only' : null,
    radioKm !== 5 ? `${radioKm} km` : null,
  ].filter(Boolean) as string[];

  return (
    <div
      style={{
        background: '#FFF8EE',
        minHeight: '100vh',
        paddingBottom: 80,
        maxWidth: 768,
        margin: '0 auto',
      }}
    >
      <TopNav showSearch searchValue={search} onSearchChange={setSearch} />

      {/* Encabezado de sección con color naranja talavera */}
      <div
        style={{
          background: 'linear-gradient(180deg, #E65100 0%, #C44900 100%)',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 4px 10px rgba(230,81,0,0.35)',
        }}
      >
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 26,
            letterSpacing: '0.08em',
            color: '#FFF8EE',
            textShadow: '2px 2px 0 rgba(0,0,0,0.18)',
          }}
        >
          EXPLORE
        </span>
        <button
          onClick={() => setShowFilters(true)}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLElement).style.boxShadow =
              '0 0 0 2px #F4C430, 0 4px 12px rgba(0,0,0,0.3)')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLElement).style.boxShadow =
              '0 2px 6px rgba(0,0,0,0.2)')
          }
          style={{
            background: '#FFF8EE',
            border: 'none',
            borderRadius: 6,
            padding: '8px 14px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: '#3E2723',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 13,
            letterSpacing: '0.06em',
            transition: 'box-shadow 0.2s',
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }}
        >
          <SlidersHorizontal size={16} />
          FILTERS
        </button>
      </div>

      {/* Carrusel maximalista */}
      <div style={{ padding: '14px 16px 6px' }}>
        <PhotoCarousel photos={EXPLORAR_PHOTOS} glowColor="#E65100" height={170} />
      </div>

      {/* Chips de categoría horizontal */}
      <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '10px 16px', background: '#fff', borderBottom: '1px solid rgba(62,39,35,0.08)' }}>
        <CategoryChip nombre="ALL" color="#F4C430" active={!activeCategoria} onClick={() => setActiveCategoria(null)} />
        {CATEGORIAS.map((cat) => (
          <CategoryChip
            key={cat.id}
            nombre={cat.nombre.split(' ')[0].toUpperCase()}
            color={cat.color_hex}
            active={activeCategoria === cat.id}
            onClick={() => setActiveCategoria(activeCategoria === cat.id ? null : cat.id)}
          />
        ))}
      </div>

      {/* Filtros activos */}
      {activeFilters.length > 0 && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: '8px 16px', background: '#fff5e6' }}>
          {activeFilters.map((f) => (
            <span
              key={f}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                background: '#F4C430',
                color: '#3E2723',
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: 12,
                padding: '3px 8px',
                borderRadius: 3,
                border: '1px solid #c49a00',
              }}
            >
              {f}
              <button
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, lineHeight: 1, color: '#3E2723' }}
                onClick={() => {
                  if (f.includes('★')) setRatingMin(0);
                  else if (f === 'Verified only') setSoloVerificados(false);
                  else if (f.includes('km')) setRadioKm(5);
                  else setActiveCategoria(null);
                }}
              >
                <X size={10} />
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Opciones de ordenamiento */}
      <div style={{ display: 'flex', gap: 0, padding: '8px 16px', background: '#fff', borderBottom: '1px solid rgba(62,39,35,0.08)', overflowX: 'auto' }}>
        {(['cercano', 'calificado', 'visitado'] as SortOption[]).map((opt) => {
          const cfg = {
            cercano: { label: 'CLOSEST', color: '#C0392B', Icon: IconMap },
            calificado: { label: 'TOP RATED', color: '#F4C430', Icon: IconStar },
            visitado: { label: 'MOST VISITED', color: '#E65100', Icon: IconHeart },
          }[opt];
          const active = sort === opt;
          return (
            <button
              key={opt}
              onClick={() => setSort(opt)}
              onMouseEnter={(e) => {
                if (!active)
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    `0 0 0 2px ${cfg.color}, 0 6px 14px ${cfg.color}55`;
              }}
              onMouseLeave={(e) => {
                if (!active) (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 13,
                letterSpacing: '0.06em',
                padding: '8px 14px',
                background: active ? cfg.color : '#FFF8EE',
                color: active ? (opt === 'calificado' ? '#3E2723' : '#FFF8EE') : '#3E2723',
                border: `1.5px solid ${active ? cfg.color : 'rgba(62,39,35,0.15)'}`,
                borderRadius: 4,
                cursor: 'pointer',
                marginRight: 6,
                whiteSpace: 'nowrap',
                boxShadow: active ? `0 4px 12px ${cfg.color}55` : 'none',
                transition: 'all 0.2s',
              }}
            >
              <cfg.Icon color={active ? (opt === 'calificado' ? '#3E2723' : '#FFF8EE') : cfg.color} size={14} />
              {cfg.label}
            </button>
          );
        })}
      </div>

      {/* Conteo */}
      <div style={{ padding: '8px 16px' }}>
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 800,
            fontSize: 14,
            color: '#5D4037',
            margin: 0,
          }}
        >
          {filtrados.length} businesses in {coloniaActual}
        </p>
      </div>

      {/* Lista de resultados */}
      <div style={{ background: '#fff', border: '1px solid rgba(62,39,35,0.08)' }}>
        {filtrados.length === 0 ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
              <IconStore color="#C0392B" size={72} />
            </div>
            <p
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 22,
                color: '#5D4037',
                letterSpacing: '0.04em',
                marginBottom: 8,
              }}
            >
              WE FOUND NOTHING...
            </p>
            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                fontSize: 14,
                color: '#9e9e9e',
                marginBottom: 16,
              }}
            >
              Be the first to register this type of business in your neighborhood!
            </p>
            <button
              onClick={() => navigate('/registrar-negocio')}
              style={{
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
          filtrados.map((negocio) => (
            <NegocioListItem
              key={negocio.id}
              negocio={negocio}
              onClick={() => navigate(`/negocio/${negocio.id}`)}
            />
          ))
        )}
      </div>

      {/* Panel de filtros (slide-up) */}
      {showFilters && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}
        >
          <div
            style={{ flex: 1, background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setShowFilters(false)}
          />
          <div
            style={{
              background: '#FFF8EE',
              borderRadius: '12px 12px 0 0',
              padding: '0 0 24px',
              maxHeight: '80vh',
              overflowY: 'auto',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '16px 20px',
                borderBottom: '1px solid rgba(62,39,35,0.1)',
                background: '#C0392B',
                borderRadius: '12px 12px 0 0',
              }}
            >
              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 20,
                  letterSpacing: '0.06em',
                  color: '#F4C430',
                }}
              >
                FILTERS
              </span>
              <button
                onClick={() => setShowFilters(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ padding: '20px' }}>
              {/* Distancia */}
              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 800,
                    fontSize: 13,
                    color: '#3E2723',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    display: 'block',
                    marginBottom: 8,
                  }}
                >
                  Search radius: {radioKm} km
                </label>
                <input
                  type="range"
                  min={0.5}
                  max={10}
                  step={0.5}
                  value={radioKm}
                  onChange={(e) => setRadioKm(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#C0392B' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#9e9e9e', fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}>
                  <span>0.5 km</span><span>10 km</span>
                </div>
              </div>

              {/* Rating mínimo */}
              <div style={{ marginBottom: 20 }}>
                <label
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 800,
                    fontSize: 13,
                    color: '#3E2723',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    display: 'block',
                    marginBottom: 8,
                  }}
                >
                  Minimum rating
                </label>
                <RatingStars rating={ratingMin} interactive onChange={setRatingMin} size="lg" />
              </div>

              {/* Solo verificados */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  background: soloVerificados ? '#C3EDCF' : '#f5f5f5',
                  borderRadius: 6,
                  border: `1.5px solid ${soloVerificados ? '#1A7A4A' : 'rgba(0,0,0,0.1)'}`,
                  cursor: 'pointer',
                  marginBottom: 20,
                }}
                onClick={() => setSoloVerificados(!soloVerificados)}
              >
                <div
                  style={{
                    width: 44,
                    height: 24,
                    borderRadius: 12,
                    background: soloVerificados ? '#1A7A4A' : '#9e9e9e',
                    position: 'relative',
                    transition: 'background 0.2s',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: '#fff',
                      position: 'absolute',
                      top: 2,
                      left: soloVerificados ? 22 : 2,
                      transition: 'left 0.2s',
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 800,
                    fontSize: 14,
                    color: '#3E2723',
                  }}
                >
                  ✓ Verified businesses only
                </span>
              </div>

              {/* Aplicar */}
              <button
                onClick={() => setShowFilters(false)}
                style={{
                  width: '100%',
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 18,
                  letterSpacing: '0.08em',
                  color: '#fff',
                  background: '#C0392B',
                  border: 'none',
                  borderBottom: '3px solid #922b21',
                  borderRadius: 4,
                  padding: '12px',
                  cursor: 'pointer',
                }}
              >
                APPLY FILTERS
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}
