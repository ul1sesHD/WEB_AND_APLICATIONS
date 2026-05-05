// SCR-00: Splash / Landing — página principal pública
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { CATEGORIAS, NEGOCIOS, STATS_GLOBALES } from '../data/mockData';
import { NegocioCard } from '../components/bv/NegocioCard';
import { PuestoCard } from '../components/bv/PuestoCard';
import { TopNav } from '../components/bv/TopNav';
import { BottomNav } from '../components/bv/BottomNav';
import { PhotoCarousel } from '../components/bv/PhotoCarousel';
import { LANDING_PHOTOS } from '../data/photos';
import { PapelPicado, IconMap, IconStore, IconEarth, IconMoney, IconHeart } from '../components/bv/AbstractIcon';
import { motion } from 'motion/react';

export function LandingScreen() {
  const navigate = useNavigate();
  const [counter, setCounter] = useState({ negocios: 0, km: 0, co2: 0 });

  // Animación del contador
  useEffect(() => {
    const duration = 1800;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounter({
        negocios: Math.round(STATS_GLOBALES.negocios * progress),
        km: Math.round(STATS_GLOBALES.km_ahorrados * progress),
        co2: Math.round(STATS_GLOBALES.co2_evitado * progress),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        background: '#FFF8EE',
        minHeight: '100vh',
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      <TopNav publicMode showSearch={false} />
      <PapelPicado />

      {/* Carrusel hero maximalista */}
      <div style={{ padding: '16px', maxWidth: 1100, margin: '0 auto' }}>
        <PhotoCarousel photos={LANDING_PHOTOS} glowColor="#C0392B" height={300} ecoBorder />
      </div>

      {/* HERO */}
      <div
        style={{
          background: 'linear-gradient(135deg, #C0392B 0%, #922b21 60%, #3E2723 100%)',
          padding: '60px 24px 50px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decoración de fondo */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(244,196,48,0.08) 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(56px, 14vw, 96px)',
              letterSpacing: '0.08em',
              color: '#0D2A4F',
              margin: 0,
              lineHeight: 0.9,
              WebkitTextStroke: '2px #FFF8EE',
              textShadow: [
                '1px 1px 0 #E65100',
                '2px 2px 0 #E85A0F',
                '3px 3px 0 #EE7918',
                '4px 4px 0 #F18B22',
                '5px 5px 0 #F39A2A',
                '6px 6px 0 #F4A632',
                '7px 7px 0 #F4B43B',
                '8px 8px 0 #F4C430',
                '10px 10px 14px rgba(0,0,0,0.35)',
              ].join(', '),
              transform: 'rotate(-1.5deg)',
              display: 'inline-block',
            }}
          >
            BARRIO
          </h1>
          <h1
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(56px, 14vw, 96px)',
              letterSpacing: '0.08em',
              color: '#0D2A4F',
              margin: 0,
              lineHeight: 0.9,
              WebkitTextStroke: '2px #FFF8EE',
              textShadow: [
                '1px 1px 0 #E65100',
                '2px 2px 0 #E85A0F',
                '3px 3px 0 #EE7918',
                '4px 4px 0 #F18B22',
                '5px 5px 0 #F39A2A',
                '6px 6px 0 #F4A632',
                '7px 7px 0 #F4B43B',
                '8px 8px 0 #F4C430',
                '10px 10px 14px rgba(0,0,0,0.35)',
              ].join(', '),
              transform: 'rotate(1deg)',
              display: 'inline-block',
              marginLeft: 12,
            }}
          >
            VIVO
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 800,
            fontSize: 18,
            color: 'rgba(255,255,255,0.9)',
            marginTop: 16,
            marginBottom: 24,
          }}
        >
          Your neighborhood, more alive
        </motion.p>

        {/* Contador animado */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          style={{
            display: 'inline-flex',
            gap: 0,
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 6,
            border: '1px solid rgba(244,196,48,0.3)',
            overflow: 'hidden',
            marginBottom: 32,
          }}
        >
          {[
            { value: counter.negocios, label: 'businesses' },
            { value: counter.km, label: 'km saved' },
            { value: counter.co2, label: 'kg CO₂ avoided' },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                padding: '10px 20px',
                borderRight: i < 2 ? '1px solid rgba(244,196,48,0.2)' : 'none',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 28,
                  color: '#F4C430',
                  letterSpacing: '0.06em',
                  lineHeight: 1,
                }}
              >
                {stat.value.toLocaleString()}
              </div>
              <div
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.7)',
                  marginTop: 3,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTAs — Cards con rotación 360 + glass mirror */}
        <div
          style={{
            display: 'flex',
            gap: 18,
            justifyContent: 'center',
            flexWrap: 'wrap',
            perspective: 1000,
          }}
        >
          <CTACard
            title="EXPLORE MAP"
            subtitle="Discover the neighborhood"
            gradient="linear-gradient(135deg, #1565C0 0%, #0d47a1 60%, #3E2723 100%)"
            glow="#1565C0"
            tilt={-3}
            onClick={() => navigate('/home')}
            icon={<IconMap color="#FFF8EE" size={36} />}
          />
          <CTACard
            title="REGISTER BUSINESS"
            subtitle="Join the community"
            gradient="linear-gradient(135deg, #E65100 0%, #C44900 55%, #880E4F 100%)"
            glow="#E65100"
            tilt={3}
            onClick={() => navigate('/registrar-negocio')}
            icon={<IconStore color="#FFF8EE" size={36} />}
          />
        </div>
      </div>

      {/* ¿Por qué local? */}
      <div style={{ padding: '40px 24px', maxWidth: 960, margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 36,
            letterSpacing: '0.06em',
            color: '#3E2723',
            marginBottom: 4,
          }}
        >
          WHY LOCAL?
        </h2>
        <div
          style={{
            height: 3,
            width: 80,
            background: '#F4C430',
            marginBottom: 28,
          }}
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 18,
            perspective: 1200,
          }}
        >
          <InfoCard
            title="LESS CO₂"
            desc="Each visit to your local business avoids an average of 0.5 kg of CO₂ compared to shopping at chains."
            gradient="linear-gradient(135deg, #1A7A4A 0%, #145a36 55%, #3E2723 100%)"
            glow="#1A7A4A"
            tilt={-3}
            icon={<IconEarth color="#FFF8EE" size={36} />}
          />
          <InfoCard
            title="LOCAL ECONOMY"
            desc="For every $100 you spend in your neighborhood, $68 stay circulating in your community."
            gradient="linear-gradient(135deg, #E65100 0%, #C44900 55%, #3E2723 100%)"
            glow="#E65100"
            tilt={2}
            icon={<IconMoney color="#FFF8EE" size={36} />}
          />
          <InfoCard
            title="COMMUNITY"
            desc="Get to know the people behind each business. The neighborhood has history and your support keeps it alive."
            gradient="linear-gradient(135deg, #1565C0 0%, #0d47a1 55%, #880E4F 100%)"
            glow="#1565C0"
            tilt={-2}
            icon={<IconHeart color="#FFF8EE" size={36} />}
          />
        </div>
      </div>

      {/* Categorías */}
      <div style={{ padding: '0 24px 40px', maxWidth: 960, margin: '0 auto' }}>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 36,
            letterSpacing: '0.06em',
            color: '#3E2723',
            marginBottom: 4,
          }}
        >
          CATEGORIES
        </h2>
        <div style={{ height: 3, width: 80, background: '#F4C430', marginBottom: 20 }} />

        <CategoriasMarquee navigate={navigate} />
      </div>

      {/* Negocios destacados — vitrina */}
      <div
        style={{
          background: '#3E2723',
          padding: '40px 0 48px',
          position: 'relative',
        }}
      >
        {/* Placa de premiación */}
        <div
          style={{
            maxWidth: 720,
            margin: '0 auto 28px',
            position: 'relative',
            padding: '0 24px',
          }}
        >
          <AwardPlaque>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 32,
                letterSpacing: '0.08em',
                color: '#3E2723',
                margin: 0,
                lineHeight: 1,
                textShadow: '1px 1px 0 rgba(255,248,238,0.55)',
              }}
            >
              ★ FEATURED BUSINESSES ★
            </h2>
            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                fontSize: 12,
                color: '#5D4037',
                fontStyle: 'italic',
                lineHeight: 1.5,
                margin: '8px 0 0',
                maxWidth: 480,
              }}
            >
              Like in a market, the biggest signs are the neighborhood's favorites.
              Here are the <strong style={{ color: '#C0392B' }}>community verified</strong>
              {' '}with the best rating and most reviews.
            </p>
          </AwardPlaque>
        </div>

        {/* Vitrina de ancho completo */}
        <Vitrina>
          <VitrinaCarousel
            items={NEGOCIOS.filter((n) => n.verificado).slice(0, 6)}
            onItemClick={(id) => navigate(`/negocio/${id}`)}
          />
        </Vitrina>
      </div>

      <BottomNav />
    </div>
  );
}

// === Placa de premiación tipo trofeo ===
function AwardPlaque({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
      {/* Listón superior */}
      <div
        style={{
          position: 'absolute',
          top: -14,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 4,
        }}
      >
        <span
          style={{
            width: 20,
            height: 26,
            background: 'linear-gradient(180deg, #C0392B 0%, #922b21 100%)',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
          }}
        />
        <span
          style={{
            width: 20,
            height: 26,
            background: 'linear-gradient(180deg, #1A7A4A 0%, #0d4a2b 100%)',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
          }}
        />
        <span
          style={{
            width: 20,
            height: 26,
            background: 'linear-gradient(180deg, #F4C430 0%, #c49a00 100%)',
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 70%, 0 100%)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.4)',
          }}
        />
      </div>
      {/* Marco oscuro de madera */}
      <div
        style={{
          position: 'relative',
          background:
            'linear-gradient(180deg, #5d3a25 0%, #3E2723 50%, #2a1a14 100%)',
          padding: 6,
          borderRadius: 10,
          boxShadow: '0 14px 28px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.15)',
          maxWidth: 640,
          width: '100%',
        }}
      >
        {/* Placa de latón/oro */}
        <div
          style={{
            position: 'relative',
            background:
              'linear-gradient(135deg, #f5e7a3 0%, #f4c430 25%, #d4a017 55%, #f4c430 75%, #f5e7a3 100%)',
            padding: '20px 32px 22px',
            borderRadius: 6,
            textAlign: 'center',
            boxShadow:
              'inset 0 2px 4px rgba(255,255,255,0.55), inset 0 -2px 6px rgba(0,0,0,0.3)',
            border: '1px solid rgba(0,0,0,0.25)',
          }}
        >
          {/* Brillo metálico diagonal */}
          <span
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.4) 50%, transparent 65%)',
              pointerEvents: 'none',
              borderRadius: 6,
            }}
          />
          {/* Tornillos en las 4 esquinas */}
          <PlaqueScrew pos={{ top: 6, left: 8 }} />
          <PlaqueScrew pos={{ top: 6, right: 8 }} />
          <PlaqueScrew pos={{ bottom: 6, left: 8 }} />
          <PlaqueScrew pos={{ bottom: 6, right: 8 }} />
          <div style={{ position: 'relative' }}>{children}</div>
        </div>
      </div>
    </div>
  );
}

function PlaqueScrew({ pos }: { pos: React.CSSProperties }) {
  return (
    <span
      style={{
        position: 'absolute',
        ...pos,
        width: 9,
        height: 9,
        borderRadius: '50%',
        background:
          'radial-gradient(circle at 30% 30%, #fff5b4 0%, #c49a00 55%, #6b5300 100%)',
        boxShadow: 'inset 0 -1px 1px rgba(0,0,0,0.6)',
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: '50%',
          left: '15%',
          right: '15%',
          height: 1,
          background: '#3E2723',
          transform: 'translateY(-50%) rotate(-30deg)',
        }}
      />
    </span>
  );
}

// === Carrusel dentro de la vitrina con flechas y bounce de esquina ===
function VitrinaCarousel({
  items,
  onItemClick,
}: {
  items: typeof NEGOCIOS;
  onItemClick: (id: string) => void;
}) {
  const [page, setPage] = useState(0);
  const [swing, setSwing] = useState(0); // -1 izquierda, 1 derecha, 0 reposo
  const visible = 3;
  const totalPages = Math.max(1, Math.ceil(items.length / visible));
  const start = page * visible;
  const slice = items.slice(start, start + visible);

  const trigger = (dir: -1 | 1) => {
    const next = Math.min(totalPages - 1, Math.max(0, page + dir));
    setSwing(dir);
    setPage(next);
    setTimeout(() => setSwing(0), 700);
  };

  const tilts = [-3, 2, -2, 3];

  return (
    <div style={{ position: 'relative' }}>
      <ArrowVitrina direction="left" disabled={page === 0} onClick={() => trigger(-1)} />
      <ArrowVitrina
        direction="right"
        disabled={page >= totalPages - 1}
        onClick={() => trigger(1)}
      />

      <motion.div
        animate={{ rotate: swing * -3, x: swing * -10 }}
        transition={{ type: 'spring', stiffness: 220, damping: 12 }}
        style={{
          display: 'flex',
          gap: 26,
          padding: '32px 64px 32px',
          alignItems: 'flex-end',
          justifyContent: slice.length < visible ? 'flex-start' : 'center',
          transformOrigin: swing >= 0 ? 'top left' : 'top right',
          minHeight: 420,
        }}
      >
        {slice.map((negocio, i) => (
          <PuestoCard
            key={negocio.id}
            negocio={negocio}
            tilt={tilts[i] ?? 0}
            onClick={() => onItemClick(negocio.id)}
          />
        ))}
      </motion.div>

      {/* Indicador de página */}
      <div
        style={{
          display: 'flex',
          gap: 6,
          justifyContent: 'center',
          paddingBottom: 6,
          position: 'relative',
        }}
      >
        {Array.from({ length: totalPages }).map((_, i) => (
          <span
            key={i}
            style={{
              width: i === page ? 22 : 8,
              height: 6,
              borderRadius: 3,
              background: i === page ? '#F4C430' : 'rgba(244,196,48,0.3)',
              transition: 'all 0.3s',
            }}
          />
        ))}
      </div>
    </div>
  );
}

function ArrowVitrina({
  direction,
  onClick,
  disabled,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'left' ? 'Anterior' : 'Siguiente'}
      style={{
        position: 'absolute',
        top: '50%',
        [direction]: 12,
        transform: 'translateY(-50%)',
        width: 46,
        height: 46,
        borderRadius: '50%',
        background: disabled
          ? 'rgba(244,196,48,0.25)'
          : 'linear-gradient(180deg, #F4C430 0%, #c49a00 100%)',
        border: '2px solid #3E2723',
        color: '#3E2723',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        boxShadow: disabled
          ? 'none'
          : '0 6px 14px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.5)',
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 30,
        lineHeight: 1,
        padding: 0,
        opacity: disabled ? 0.5 : 1,
        transition: 'transform 0.2s',
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        if (!disabled) (e.currentTarget as HTMLElement).style.transform = 'translateY(-50%) scale(1.08)';
      }}
      onMouseLeave={(e) => {
        if (!disabled) (e.currentTarget as HTMLElement).style.transform = 'translateY(-50%) scale(1)';
      }}
    >
      {direction === 'left' ? '‹' : '›'}
    </button>
  );
}

// === Vitrina de exhibición ===
function Vitrina({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {/* Marco superior de madera */}
      <div
        style={{
          height: 18,
          background:
            'linear-gradient(180deg, #5d3a25 0%, #3E2723 50%, #2a1a14 100%)',
          borderTop: '2px solid #F4C430',
          boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
          position: 'relative',
        }}
      >
        {/* Línea dorada decorativa */}
        <span
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 4,
            height: 1,
            background: 'rgba(244,196,48,0.6)',
          }}
        />
      </div>

      {/* Cuerpo de la vitrina con cristal */}
      <div
        style={{
          position: 'relative',
          background:
            'linear-gradient(180deg, rgba(20,15,12,0.88) 0%, rgba(40,25,18,0.85) 50%, rgba(25,18,14,0.92) 100%)',
          borderLeft: '14px solid',
          borderRight: '14px solid',
          borderImage:
            'linear-gradient(180deg, #5d3a25 0%, #3E2723 50%, #2a1a14 100%) 1',
          overflow: 'hidden',
        }}
      >
        {/* Reflejos de cristal estáticos */}
        <span
          style={{
            position: 'absolute',
            top: 0,
            left: '8%',
            width: '18%',
            height: '100%',
            background:
              'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.07) 40%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0.07) 60%, transparent 100%)',
            pointerEvents: 'none',
            transform: 'skewX(-12deg)',
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: 0,
            right: '20%',
            width: '8%',
            height: '100%',
            background:
              'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.05) 50%, transparent 100%)',
            pointerEvents: 'none',
            transform: 'skewX(-12deg)',
          }}
        />
        {/* Sombra interna superior (el cristal con borde oscuro) */}
        <span
          style={{
            position: 'absolute',
            inset: 0,
            boxShadow:
              'inset 0 8px 14px rgba(0,0,0,0.55), inset 0 -8px 14px rgba(0,0,0,0.45)',
            pointerEvents: 'none',
          }}
        />
        {/* Iluminación cenital */}
        <span
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 60,
            background:
              'radial-gradient(ellipse at center top, rgba(244,196,48,0.18) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Contenido (cards) */}
        <div style={{ position: 'relative' }}>{children}</div>

        {/* Repisa inferior */}
        <div
          style={{
            position: 'relative',
            height: 18,
            background:
              'linear-gradient(180deg, #2a1a14 0%, #1a0f0a 100%)',
            boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.6)',
            borderTop: '1px solid rgba(244,196,48,0.25)',
          }}
        />
      </div>

      {/* Base inferior gruesa de madera con sombras */}
      <div
        style={{
          height: 22,
          background:
            'linear-gradient(180deg, #3E2723 0%, #2a1a14 70%, #1a0f0a 100%)',
          boxShadow: '0 12px 22px rgba(0,0,0,0.6)',
          borderBottom: '2px solid #1a0f0a',
          position: 'relative',
        }}
      >
        <span
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 4,
            height: 1,
            background: 'rgba(244,196,48,0.4)',
          }}
        />
      </div>
    </div>
  );
}

// === Metal Plate Categorías — placa metálica con letras curvadas ===

const ONE_WORD_LABELS: Record<string, string> = {
  'cat-01': 'MARKET',
  'cat-02': 'EATERY',
  'cat-03': 'TORTILLAS',
  'cat-04': 'DAIRY',
  'cat-05': 'VEGGIES',
  'cat-06': 'BREAD',
  'cat-07': 'WATER',
  'cat-08': 'TOOLS',
  'cat-09': 'GARAGE',
  'cat-10': 'SHOES',
  'cat-11': 'FASHION',
  'cat-12': 'BULK',
};

type FlatIconProps = { color: string; size?: number };

const FlatIconMercado = ({ color, size = 40 }: FlatIconProps) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <path d="M6 14 L34 14 L31 32 L9 32 Z M14 14 L16 8 L24 8 L26 14" fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    <line x1="14" y1="20" x2="14" y2="28" stroke={color} strokeWidth="2" />
    <line x1="20" y1="20" x2="20" y2="28" stroke={color} strokeWidth="2" />
    <line x1="26" y1="20" x2="26" y2="28" stroke={color} strokeWidth="2" />
  </svg>
);

const FlatIconFonda = ({ color, size = 40 }: FlatIconProps) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <path d="M5 18 Q5 30 20 32 Q35 30 35 18 Z" fill={color} />
    <path d="M5 18 L35 18" stroke={color} strokeWidth="2" />
    <path d="M14 12 Q14 6 20 6 Q26 6 26 12" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const FlatIconTortillas = ({ color, size = 40 }: FlatIconProps) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <ellipse cx="20" cy="14" rx="13" ry="4" fill="none" stroke={color} strokeWidth="2.2" />
    <ellipse cx="20" cy="20" rx="13" ry="4" fill="none" stroke={color} strokeWidth="2.2" />
    <ellipse cx="20" cy="26" rx="13" ry="4" fill={color} />
  </svg>
);

const FlatIconLacteos = ({ color, size = 40 }: FlatIconProps) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <path d="M14 10 L26 10 L28 14 L28 33 L12 33 L12 14 Z" fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" />
    <line x1="12" y1="20" x2="28" y2="20" stroke={color} strokeWidth="2" />
    <path d="M16 25 Q20 27 24 25" stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

const FlatIconVerdura = ({ color, size = 40 }: FlatIconProps) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <path d="M20 6 Q8 10 8 22 Q8 34 20 34 Q32 34 32 22 Q32 10 20 6 Z" fill={color} />
    <path d="M20 8 L20 30" stroke="#FFF8EE" strokeWidth="1.5" />
    <path d="M14 14 Q20 18 26 14" stroke="#FFF8EE" strokeWidth="1.5" fill="none" />
    <path d="M14 22 Q20 26 26 22" stroke="#FFF8EE" strokeWidth="1.5" fill="none" />
  </svg>
);

const FlatIconPan = ({ color, size = 40 }: FlatIconProps) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <path d="M6 16 Q6 10 12 10 Q14 6 20 6 Q26 6 28 10 Q34 10 34 16 L34 30 L6 30 Z" fill={color} />
    <path d="M12 14 L12 28 M20 12 L20 28 M28 14 L28 28" stroke="#FFF8EE" strokeWidth="1.5" />
  </svg>
);

const FlatIconAgua = ({ color, size = 40 }: FlatIconProps) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <path d="M20 4 Q10 18 10 26 Q10 34 20 34 Q30 34 30 26 Q30 18 20 4 Z" fill={color} />
    <path d="M16 26 Q16 30 20 30" stroke="#FFF8EE" strokeWidth="1.5" fill="none" strokeLinecap="round" />
  </svg>
);

const FlatIconFierros = ({ color, size = 40 }: FlatIconProps) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <path d="M28 6 L34 12 L26 20 L20 14 Z M22 16 L8 30 L12 34 L26 20" fill={color} />
    <circle cx="29" cy="11" r="2" fill="#FFF8EE" />
  </svg>
);

const FlatIconTaller = ({ color, size = 40 }: FlatIconProps) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <path
      d="M20 4 L23 4 L24 9 L27 10 L31 7 L33 9 L30 13 L31 16 L36 17 L36 20 L31 21 L30 24 L33 28 L31 30 L27 27 L24 28 L23 33 L20 33 L19 28 L16 27 L12 30 L10 28 L13 24 L12 21 L7 20 L7 17 L12 16 L13 13 L10 9 L12 7 L16 10 L19 9 Z"
      fill={color}
    />
    <circle cx="21.5" cy="18.5" r="4" fill="#FFF8EE" />
  </svg>
);

const FlatIconZapatos = ({ color, size = 40 }: FlatIconProps) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <path d="M5 24 L5 30 Q5 32 7 32 L33 32 Q36 32 36 28 Q36 22 28 20 L20 18 L14 12 L10 14 L10 24 Z" fill={color} />
    <line x1="14" y1="14" x2="20" y2="20" stroke="#FFF8EE" strokeWidth="1.5" />
  </svg>
);

const FlatIconModa = ({ color, size = 40 }: FlatIconProps) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <path d="M14 6 L26 6 L24 12 L34 30 L6 30 L16 12 Z" fill={color} />
    <line x1="14" y1="6" x2="20" y2="14" stroke="#FFF8EE" strokeWidth="1.5" />
    <line x1="26" y1="6" x2="20" y2="14" stroke="#FFF8EE" strokeWidth="1.5" />
  </svg>
);

const FlatIconGranel = ({ color, size = 40 }: FlatIconProps) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <path d="M10 8 L30 8 L30 12 L28 12 L28 32 L12 32 L12 12 L10 12 Z" fill={color} />
    <line x1="14" y1="18" x2="26" y2="18" stroke="#FFF8EE" strokeWidth="1.5" />
    <line x1="14" y1="24" x2="26" y2="24" stroke="#FFF8EE" strokeWidth="1.5" />
  </svg>
);

const FlatIconStore = ({ color, size = 40 }: FlatIconProps) => (
  <svg viewBox="0 0 40 40" width={size} height={size}>
    <path d="M6 14 L34 14 L32 32 L8 32 Z" fill={color} />
  </svg>
);

const FLAT_ICONS: Record<string, (p: FlatIconProps) => React.ReactElement> = {
  'cat-01': FlatIconMercado,
  'cat-02': FlatIconFonda,
  'cat-03': FlatIconTortillas,
  'cat-04': FlatIconLacteos,
  'cat-05': FlatIconVerdura,
  'cat-06': FlatIconPan,
  'cat-07': FlatIconAgua,
  'cat-08': FlatIconFierros,
  'cat-09': FlatIconTaller,
  'cat-10': FlatIconZapatos,
  'cat-11': FlatIconModa,
  'cat-12': FlatIconGranel,
};

function MetalRivet({ pos }: { pos: { top?: number; bottom?: number; left?: number; right?: number } }) {
  return (
    <span
      style={{
        position: 'absolute',
        ...pos,
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: 'radial-gradient(circle at 30% 30%, #f5f5f5 0%, #888 50%, #444 100%)',
        boxShadow: 'inset 0 -1px 1px rgba(0,0,0,0.6), 0 1px 1px rgba(255,255,255,0.4)',
      }}
    />
  );
}

interface MetalPlateProps {
  id: string;
  label: string;
  FlatIcon: (p: FlatIconProps) => React.ReactElement;
  onClick: () => void;
}

function MetalPlate({ id, label, FlatIcon, onClick }: MetalPlateProps) {
  const [hover, setHover] = useState(false);
  const pathId = `curve-${id}`;
  // Remaches a lo largo de todo el perímetro
  const topRivets = [10, 35, 60, 85, 110, 135, 160];
  const sideRivets = [10, 50, 90, 130, 170];
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        minWidth: 180,
        width: 180,
        height: 200,
        flexShrink: 0,
        border: '1px solid rgba(0,0,0,0.55)',
        borderRadius: 12,
        cursor: 'pointer',
        padding: '18px 10px 10px',
        background:
          'linear-gradient(135deg, #8a8e94 0%, #5d6168 22%, #9097a0 50%, #4a4e55 78%, #6e7278 100%)',
        boxShadow: hover
          ? 'inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -2px 4px rgba(0,0,0,0.55), 0 16px 28px rgba(0,0,0,0.5), 0 0 0 2px #F4C430'
          : 'inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -2px 4px rgba(0,0,0,0.5), 0 8px 16px rgba(0,0,0,0.4)',
        transform: hover ? 'translateY(-6px) scale(1.03)' : 'translateY(0) scale(1)',
        transition: 'transform 0.22s, box-shadow 0.25s',
        overflow: 'hidden',
      }}
    >
      {/* Brillo metálico diagonal */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.32) 50%, transparent 65%)',
          pointerEvents: 'none',
        }}
      />
      {/* Rayado horizontal sutil tipo cepillado */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0 1px, transparent 1px 2px)',
          pointerEvents: 'none',
        }}
      />
      {/* Remaches en todo el perímetro */}
      {topRivets.map((x) => (
        <MetalRivet key={`t${x}`} pos={{ top: 6, left: x }} />
      ))}
      {topRivets.map((x) => (
        <MetalRivet key={`b${x}`} pos={{ bottom: 6, left: x }} />
      ))}
      {sideRivets.map((y) => (
        <MetalRivet key={`l${y}`} pos={{ left: 6, top: y }} />
      ))}
      {sideRivets.map((y) => (
        <MetalRivet key={`r${y}`} pos={{ right: 6, top: y }} />
      ))}

      {/* Texto curvado estilo letrero pintado */}
      <svg
        viewBox="0 0 180 44"
        width="100%"
        height={44}
        style={{ position: 'relative', display: 'block' }}
      >
        <defs>
          <path id={pathId} d="M 14 36 Q 90 2 166 36" fill="none" />
        </defs>
        <text
          fontFamily="'Bebas Neue', sans-serif"
          fontSize="26"
          fill="#C0392B"
          letterSpacing="1.2"
          style={{
            filter:
              'drop-shadow(0 3px 0 #F4C430) drop-shadow(0 4px 0 #F4C430) drop-shadow(0 5px 1px rgba(0,0,0,0.35))',
            paintOrder: 'stroke',
            stroke: '#3E2723',
            strokeWidth: 0.6,
          }}
        >
          <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
            {label}
          </textPath>
        </text>
      </svg>

      {/* Icono 2D plano */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 14,
          filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.45))',
        }}
      >
        <FlatIcon color="#1a1c1f" size={70} />
      </div>
    </button>
  );
}

function CategoriasMarquee({ navigate }: { navigate: ReturnType<typeof useNavigate> }) {
  const [paused, setPaused] = useState(false);
  // Width per item: 180 + 14 gap = 194
  const itemW = 194;
  const totalW = CATEGORIAS.length * itemW;
  const items = [...CATEGORIAS, ...CATEGORIAS];

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      style={{
        overflow: 'hidden',
        padding: '20px 0 24px',
        margin: '0 -24px',
        WebkitMaskImage:
          'linear-gradient(90deg, transparent 0, #000 60px, #000 calc(100% - 60px), transparent 100%)',
        maskImage:
          'linear-gradient(90deg, transparent 0, #000 60px, #000 calc(100% - 60px), transparent 100%)',
      }}
    >
      <motion.div
        animate={{ x: paused ? undefined : [0, -totalW] }}
        transition={{ duration: 50, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}
        style={{
          display: 'flex',
          gap: 14,
          width: 'max-content',
          paddingLeft: 24,
        }}
      >
        {items.map((cat, i) => (
          <MetalPlate
            key={`${cat.id}-${i}`}
            id={`${cat.id}-${i}`}
            label={ONE_WORD_LABELS[cat.id] ?? cat.nombre.split(' ')[0].toUpperCase()}
            FlatIcon={FLAT_ICONS[cat.id] ?? FlatIconStore}
            onClick={() => navigate('/explorar')}
          />
        ))}
      </motion.div>
    </div>
  );
}

interface InfoCardProps {
  title: string;
  desc: string;
  gradient: string;
  glow: string;
  icon: React.ReactNode;
  tilt?: number;
}

// Estilo "cartel pintado a mano" estilo tianguis mexicano
function CartelBackdrop({ glow }: { glow: string }) {
  return (
    <>
      {/* Mancha de pintura / textura papel */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 20% 18%, rgba(255,255,255,0.18), transparent 45%), radial-gradient(circle at 78% 82%, rgba(0,0,0,0.18), transparent 50%)',
          mixBlendMode: 'overlay',
          pointerEvents: 'none',
        }}
      />
      {/* Borde pintado irregular */}
      <span
        style={{
          position: 'absolute',
          inset: 6,
          border: `2px dashed rgba(255,248,238,0.55)`,
          borderRadius: 10,
          pointerEvents: 'none',
        }}
      />
      {/* Glow halo */}
      <span
        style={{
          position: 'absolute',
          inset: -1,
          boxShadow: `inset 0 0 0 1px ${glow}`,
          borderRadius: 14,
          pointerEvents: 'none',
        }}
      />
    </>
  );
}

function CartelTape({ side }: { side: 'left' | 'right' }) {
  return (
    <span
      style={{
        position: 'absolute',
        top: -10,
        [side]: 18,
        width: 56,
        height: 20,
        background: 'rgba(244,196,48,0.78)',
        border: '1px solid rgba(62,39,35,0.25)',
        boxShadow: '0 2px 6px rgba(0,0,0,0.25)',
        transform: side === 'left' ? 'rotate(-8deg)' : 'rotate(8deg)',
        backdropFilter: 'blur(1px)',
        backgroundImage:
          'repeating-linear-gradient(90deg, rgba(255,255,255,0.18) 0 4px, transparent 4px 10px)',
      } as React.CSSProperties}
    />
  );
}

function InfoCard({ title, desc, gradient, glow, icon, tilt = -2 }: InfoCardProps) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      animate={{ rotate: tilt, y: hover ? -4 : 0, scale: hover ? 1.02 : 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      style={{
        position: 'relative',
        cursor: 'default',
      }}
    >
      <CartelTape side="left" />
      <CartelTape side="right" />
      {/* Cuerpo del cartel con clipping interno */}
      <div
        style={{
          position: 'relative',
          borderRadius: 14,
          padding: '22px 18px 18px',
          background: gradient,
          color: '#FFF8EE',
          boxShadow: hover
            ? `0 0 0 2px ${glow}, 0 22px 44px ${glow}55, 0 10px 22px rgba(62,39,35,0.45)`
            : '0 12px 26px rgba(62,39,35,0.45)',
          overflow: 'hidden',
          transition: 'box-shadow 0.4s',
        }}
      >
        <CartelBackdrop glow={glow} />
        {/* Reflejo glass mirror — clipped por el cuerpo */}
        <span
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: 80,
            left: hover ? '110%' : '-40%',
            background:
              'linear-gradient(115deg, transparent 0%, rgba(255,248,238,0.45) 50%, transparent 100%)',
            transition: 'left 1.2s ease',
            pointerEvents: 'none',
            transform: 'skewX(-18deg)',
          }}
        />
        <div style={{ position: 'relative', padding: 4, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                background: 'rgba(62,39,35,0.5)',
                border: '2px solid rgba(255,248,238,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backdropFilter: 'blur(3px)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 3px 6px rgba(0,0,0,0.25)',
              }}
            >
              {icon}
            </div>
            <h3
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 26,
                letterSpacing: '0.05em',
                color: '#FFF8EE',
                margin: 0,
                lineHeight: 1.05,
                textShadow:
                  '2px 2px 0 rgba(62,39,35,0.85), -1px -1px 0 rgba(0,0,0,0.35), 0 0 12px rgba(255,255,255,0.15)',
                transform: 'rotate(-1deg)',
              }}
            >
              ¡{title}!
            </h3>
            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: 14,
                color: 'rgba(255,248,238,0.95)',
                lineHeight: 1.55,
                margin: 0,
                textShadow: '1px 1px 0 rgba(0,0,0,0.35)',
              }}
            >
              {desc}
            </p>
          </div>
        </div>
    </motion.div>
  );
}

interface CTACardProps {
  title: string;
  subtitle: string;
  gradient: string;
  glow: string;
  icon: React.ReactNode;
  onClick: () => void;
}

function CTACard({ title, subtitle, gradient, glow, icon, onClick, tilt = -2 }: CTACardProps & { tilt?: number }) {
  const [hover, setHover] = useState(false);
  return (
    <motion.div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      animate={{ rotate: tilt, y: hover ? -4 : 0, scale: hover ? 1.02 : 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      style={{ position: 'relative', width: 240 }}
    >
      <CartelTape side="left" />
      <CartelTape side="right" />
      <button
        onClick={onClick}
        style={{
          position: 'relative',
          width: '100%',
          minHeight: 150,
          border: 'none',
          borderRadius: 14,
          cursor: 'pointer',
          padding: 18,
          textAlign: 'left',
          background: gradient,
          color: '#FFF8EE',
          fontFamily: "'Bebas Neue', sans-serif",
          boxShadow: hover
            ? `0 0 0 2px ${glow}, 0 22px 44px ${glow}55, 0 10px 22px rgba(62,39,35,0.45)`
            : '0 12px 26px rgba(62,39,35,0.45)',
          overflow: 'hidden',
          transition: 'box-shadow 0.4s',
        }}
      >
        {/* Borde punteado interno */}
        <span
          style={{
            position: 'absolute',
            inset: 6,
            border: '2px dashed rgba(255,248,238,0.55)',
            borderRadius: 10,
            pointerEvents: 'none',
          }}
        />
        {/* Reflejo deslizante (clipped por overflow:hidden) */}
        <span
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            width: 80,
            left: hover ? '110%' : '-40%',
            background:
              'linear-gradient(115deg, transparent 0%, rgba(255,248,238,0.5) 50%, transparent 100%)',
            transition: 'left 1.2s ease',
            pointerEvents: 'none',
            transform: 'skewX(-18deg)',
          }}
        />
        {/* Textura papel */}
        <span
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 22% 18%, rgba(255,255,255,0.22), transparent 45%), radial-gradient(circle at 78% 82%, rgba(0,0,0,0.18), transparent 50%)',
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: 'rgba(62,39,35,0.5)',
              border: '2px solid rgba(255,248,238,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25), 0 3px 6px rgba(0,0,0,0.25)',
            }}
          >
            {icon}
          </div>
          <div
            style={{
              fontSize: 24,
              letterSpacing: '0.05em',
              color: '#FFF8EE',
              lineHeight: 1.05,
              textShadow:
                '2px 2px 0 rgba(62,39,35,0.85), -1px -1px 0 rgba(0,0,0,0.35)',
              transform: 'rotate(-1deg)',
            }}
          >
            ¡{title}!
          </div>
          <div
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
              fontSize: 12,
              color: 'rgba(255,248,238,0.85)',
              letterSpacing: '0.04em',
              textShadow: '1px 1px 0 rgba(0,0,0,0.4)',
            }}
          >
            {subtitle} →
          </div>
        </div>
      </button>
    </motion.div>
  );
}
