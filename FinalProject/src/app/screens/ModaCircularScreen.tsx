// SCR-07: Moda Circular y Bazar
import React from 'react';
import { useNavigate } from 'react-router';
import { Plus, ArrowLeft } from 'lucide-react';
import { NEGOCIOS, getCategoriaById } from '../data/mockData';
import { NegocioListItem } from '../components/bv/NegocioListItem';
import { BottomNav } from '../components/bv/BottomNav';
import { TopNav } from '../components/bv/TopNav';
import { PhotoCarousel } from '../components/bv/PhotoCarousel';
import { IconVestido } from '../components/bv/AbstractIcon';
import { MODA_PHOTOS } from '../data/photos';

const CAT_MODA = 'cat-11';

export function ModaCircularScreen() {
  const navigate = useNavigate();
  const negocios = NEGOCIOS.filter((n) => n.categoria_id === CAT_MODA);

  return (
    <div style={{ background: '#FFF8EE', minHeight: '100vh', maxWidth: 768, margin: '0 auto' }}>
      <TopNav showSearch={false} />

      {/* Carrusel de moda circular */}
      <div style={{ padding: '14px 16px 4px' }}>
        <PhotoCarousel photos={MODA_PHOTOS} glowColor="#880E4F" height={180} />
      </div>

      {/* Hero banner magenta */}
      <div
        style={{
          background: 'linear-gradient(135deg, #880E4F 0%, #560027 100%)',
          padding: '20px 20px 24px',
          position: 'relative',
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
            marginBottom: 16,
          }}
        >
          <ArrowLeft size={18} />
        </button>

        <div style={{ marginBottom: 8 }}><IconVestido size={56} /></div>
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 36,
            letterSpacing: '0.08em',
            color: '#fff',
            margin: 0,
            lineHeight: 1,
          }}
        >
          CIRCULAR FASHION
        </h1>
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 800,
            fontSize: 15,
            color: 'rgba(255,255,255,0.85)',
            marginTop: 8,
            marginBottom: 0,
          }}
        >
          Give it a second life. Buy, sell or trade clothes.
        </p>

        {/* Estadísticas */}
        <div style={{ display: 'flex', gap: 16, marginTop: 16 }}>
          {[
            { value: '2,340', label: 'Active garments' },
            { value: '12', label: 'Bazaars in your area' },
            { value: '94%', label: 'Less textile waste' },
          ].map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 20,
                  color: '#fff',
                  letterSpacing: '0.04em',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.7)',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ¿Por qué moda circular? */}
      <div style={{ background: '#fce4ec', padding: '16px 16px', borderBottom: '1px solid rgba(136,14,79,0.1)' }}>
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: 14,
            color: '#880E4F',
            margin: 0,
            lineHeight: 1.7,
          }}
        >
          "The textile industry is the second most polluting on the planet. Each second-hand garment you buy prevents an average of 3.6 kg of CO₂ and saves 1,500 liters of water."
        </p>
      </div>

      {/* Bazares disponibles */}
      <div style={{ padding: '16px 16px 8px' }}>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 22,
            letterSpacing: '0.06em',
            color: '#3E2723',
            margin: '0 0 2px',
            borderBottom: '2px solid #880E4F',
            paddingBottom: 2,
            display: 'inline-block',
          }}
        >
          BAZAARS NEAR YOU
        </h2>
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: 12,
            color: '#5D4037',
            margin: '4px 0 12px',
          }}
        >
          {negocios.length} registered bazaars
        </p>
      </div>

      <div style={{ background: '#fff', border: '1px solid rgba(62,39,35,0.08)' }}>
        {negocios.length === 0 ? (
          <div style={{ padding: '40px 24px', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}><IconVestido size={48} /></div>
            <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: '#880E4F', letterSpacing: '0.04em' }}>
              NO BAZAARS YET
            </p>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 14, color: '#9e9e9e' }}>
              Register the first circular clothing bazaar in your neighborhood!
            </p>
          </div>
        ) : (
          negocios.map((negocio) => (
            <NegocioListItem
              key={negocio.id}
              negocio={negocio}
              onClick={() => navigate(`/negocio/${negocio.id}`)}
            />
          ))
        )}
      </div>

      {/* Cómo funciona */}
      <div style={{ padding: '24px 16px' }}>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 20,
            letterSpacing: '0.06em',
            color: '#3E2723',
            marginBottom: 12,
          }}
        >
          HOW IT WORKS?
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { num: '01', title: 'EXPLORE BAZAARS', desc: 'Find second-hand clothing bazaars in your neighborhood.', color: '#880E4F' },
            { num: '02', title: 'VISIT AND BUY', desc: 'Every visit to a circular bazaar reduces your carbon footprint.', color: '#C0392B' },
            { num: '03', title: 'REGISTER YOUR BAZAAR', desc: 'Do you have a bazaar? Register it for free and reach more neighbors.', color: '#1A7A4A' },
          ].map((step) => (
            <div
              key={step.num}
              style={{
                display: 'flex',
                gap: 12,
                padding: '12px',
                background: '#fff',
                borderRadius: 8,
                border: `1.5px solid ${step.color}33`,
                borderLeft: `4px solid ${step.color}`,
              }}
            >
              <span
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 22,
                  color: step.color,
                  letterSpacing: '0.04em',
                  minWidth: 30,
                }}
              >
                {step.num}
              </span>
              <div>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, letterSpacing: '0.06em', color: '#3E2723' }}>
                  {step.title}
                </div>
                <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 13, color: '#5D4037' }}>
                  {step.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAB: Publicar artículo */}
      <button
        onClick={() => navigate('/registrar-negocio')}
        style={{
          position: 'fixed',
          bottom: 80,
          right: 16,
          width: 54,
          height: 54,
          borderRadius: '50%',
          background: '#880E4F',
          border: 'none',
          borderBottom: '3px solid #560027',
          boxShadow: '0 4px 12px rgba(136,14,79,0.5)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          zIndex: 50,
        }}
      >
        <Plus size={24} />
      </button>

      <BottomNav />
    </div>
  );
}
