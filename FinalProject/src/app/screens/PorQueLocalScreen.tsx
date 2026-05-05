// SCR-09: ¿Por qué local? — storytelling educativo
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft } from 'lucide-react';
import { BottomNav } from '../components/bv/BottomNav';
import { IconEarth, IconMoney, IconHeart } from '../components/bv/AbstractIcon';

const TESTIMONIOS = [
  {
    quote: 'Since I started buying at my local market, I spent less, ate fresher, and met my neighbors. The neighborhood changed for me.',
    nombre: 'Carmen Lopez, Coyoacan',
  },
  {
    quote: 'I came to think that the supermarket was more practical. Now I know that the corner tortilla shop has a better price and tastes infinitely better.',
    nombre: 'Roberto Gutierrez, Tepito',
  },
  {
    quote: 'My children learned that behind every business there is a family. That lesson is priceless.',
    nombre: 'Fernanda Vazquez, Xochimilco',
  },
];

export function PorQueLocalScreen() {
  const navigate = useNavigate();
  const [vecinos, setVecinos] = useState(100);
  const [visitas, setVisitas] = useState(3);

  // CO₂ ahorrado = vecinos * visitas * 0.5 kg * 52 semanas
  const co2Anual = vecinos * visitas * 0.5 * 52;
  const dineroLocal = vecinos * visitas * 150 * 52; // $150 promedio por visita

  const [co2Counter, setCo2Counter] = useState(0);

  useEffect(() => {
    let count = 0;
    const target = 47832; // total comunidad
    const step = target / 80;
    const timer = setInterval(() => {
      count += step;
      if (count >= target) { setCo2Counter(target); clearInterval(timer); }
      else setCo2Counter(Math.round(count));
    }, 20);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ background: '#FFF8EE', minHeight: '100vh', paddingBottom: 80, maxWidth: 768, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ background: '#C0392B', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
          <ArrowLeft size={20} />
        </button>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: '0.08em', color: '#F4C430' }}>
          WHY LOCAL?
        </span>
      </div>

      {/* Hero */}
      <div
        style={{
          background: 'linear-gradient(180deg, #3E2723 0%, #1a0d0a 100%)',
          padding: '40px 24px',
          textAlign: 'center',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}><IconEarth size={48} /></div>
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 40,
            letterSpacing: '0.06em',
            color: '#F4C430',
            margin: '0 0 8px',
          }}
        >
          BUYING LOCAL
          <br />
          CHANGES EVERYTHING
        </h1>
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 800,
            fontSize: 15,
            color: 'rgba(255,255,255,0.8)',
            lineHeight: 1.6,
          }}
        >
          Together in Barrio Vivo we have avoided
        </p>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 52,
            color: '#F4C430',
            letterSpacing: '0.04em',
            lineHeight: 1,
            margin: '12px 0',
          }}
        >
          {co2Counter.toLocaleString()} kg
        </div>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
          of combined CO₂
        </p>
      </div>

      {/* 3 pasos */}
      <div style={{ padding: '32px 20px' }}>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 26,
            letterSpacing: '0.06em',
            color: '#3E2723',
            margin: '0 0 20px',
            borderBottom: '2px solid #F4C430',
            paddingBottom: 4,
            display: 'inline-block',
          }}
        >
          EVERY TIME YOU BUY LOCAL...
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {[
            { num: '1', Icon: IconEarth, title: 'YOU REDUCE YOUR CARBON FOOTPRINT', desc: 'You avoid car trips to malls. Each km not driven = 0.21 kg less CO₂.', color: '#1A7A4A', bg: '#C3EDCF' },
            { num: '2', Icon: IconMoney, title: 'THE MONEY STAYS IN THE NEIGHBORHOOD', desc: '68% of what you spend in local commerce is reinvested in your community. Chains send 80% out.', color: '#C0392B', bg: '#F5C6C2' },
            { num: '3', Icon: IconHeart, title: 'YOU STRENGTHEN YOUR COMMUNITY', desc: 'You meet the families behind each business. The neighborhood becomes safer, more alive, more yours.', color: '#1565C0', bg: '#e3f0ff' },
          ].map((step) => (
            <div
              key={step.num}
              style={{
                background: step.bg,
                borderRadius: 8,
                border: `1.5px solid ${step.color}33`,
                borderLeft: `5px solid ${step.color}`,
                padding: '16px',
                display: 'flex',
                gap: 14,
                alignItems: 'flex-start',
              }}
            >
              <div style={{ flexShrink: 0, marginTop: 4 }}><step.Icon size={32} color={step.color} /></div>
              <div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 17, letterSpacing: '0.06em', color: step.color, margin: '0 0 4px' }}>
                  {step.title}
                </h3>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 13, color: '#3E2723', margin: 0, lineHeight: 1.6 }}>
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonios */}
      <div style={{ background: '#3E2723', padding: '32px 20px' }}>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 24,
            letterSpacing: '0.06em',
            color: '#F4C430',
            margin: '0 0 20px',
          }}
        >
          NEIGHBORHOOD VOICES
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {TESTIMONIOS.map((t, i) => (
            <div
              key={i}
              style={{
                borderLeft: '3px solid #C0392B',
                paddingLeft: 16,
              }}
            >
              <p
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontStyle: 'italic',
                  fontSize: 15,
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.7,
                  margin: '0 0 6px',
                }}
              >
                "{t.quote}"
              </p>
              <span
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 800,
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.5)',
                }}
              >
                — {t.nombre}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Calculadora de impacto */}
      <div style={{ padding: '32px 20px', background: '#FFF8EE' }}>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 24,
            letterSpacing: '0.06em',
            color: '#3E2723',
            margin: '0 0 6px',
          }}
        >
          IMPACT CALCULATOR
        </h2>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 13, color: '#5D4037', marginBottom: 20 }}>
          If {vecinos} neighbors buy local {visitas} times a week...
        </p>

        <div style={{ marginBottom: 16 }}>
          <label style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 13, color: '#3E2723', display: 'block', marginBottom: 6 }}>
            Number of neighbors: {vecinos}
          </label>
          <input
            type="range"
            min={10}
            max={500}
            step={10}
            value={vecinos}
            onChange={(e) => setVecinos(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#C0392B' }}
          />
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 13, color: '#3E2723', display: 'block', marginBottom: 6 }}>
            Visits per week: {visitas}
          </label>
          <input
            type="range"
            min={1}
            max={7}
            step={1}
            value={visitas}
            onChange={(e) => setVisitas(Number(e.target.value))}
            style={{ width: '100%', accentColor: '#C0392B' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div
            style={{
              background: '#C3EDCF',
              borderRadius: 8,
              border: '1.5px solid #1A7A4A33',
              padding: '14px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: '#1A7A4A', letterSpacing: '0.04em' }}>
              {(co2Anual / 1000).toFixed(1)} ton
            </div>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 12, color: '#3E2723' }}>
              CO₂ avoided/year
            </div>
          </div>
          <div
            style={{
              background: '#F5C6C2',
              borderRadius: 8,
              border: '1.5px solid #C0392B33',
              padding: '14px',
              textAlign: 'center',
            }}
          >
            <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: '#C0392B', letterSpacing: '0.04em' }}>
              ${(dineroLocal / 1000000).toFixed(1)}M
            </div>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 12, color: '#3E2723' }}>
              Local money/year
            </div>
          </div>
        </div>
      </div>

      {/* CTA final */}
      <div style={{ padding: '24px 20px', textAlign: 'center', background: '#C0392B' }}>
        <h2
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 28,
            letterSpacing: '0.08em',
            color: '#F4C430',
            margin: '0 0 8px',
          }}
        >
          JOIN THE MOVEMENT
        </h2>
        <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 14, color: 'rgba(255,255,255,0.85)', marginBottom: 16 }}>
          Your neighborhood needs you to choose it.
        </p>
        <button
          onClick={() => navigate('/explorar')}
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 18,
            letterSpacing: '0.08em',
            color: '#C0392B',
            background: '#F4C430',
            border: 'none',
            borderBottom: '3px solid #c49a00',
            borderRadius: 4,
            padding: '12px 40px',
            cursor: 'pointer',
          }}
        >
          EXPLORE LOCAL BUSINESSES
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
