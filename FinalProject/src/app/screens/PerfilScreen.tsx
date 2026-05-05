// SCR-08: User Profile
import React from 'react';
import { useNavigate } from 'react-router';
import { LogOut, Edit2, Trash2, Plus } from 'lucide-react';
import { useBarrioStore } from '../store/useStore';
import { NEGOCIOS, getCategoriaById } from '../data/mockData';
import { BottomNav } from '../components/bv/BottomNav';

export function PerfilScreen() {
  const navigate = useNavigate();
  const { usuario, impacto, logout } = useBarrioStore();

  if (!usuario) {
    return (
      <div style={{ padding: 24, textAlign: 'center', background: '#FFF8EE', minHeight: '100vh' }}>
        <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: '#C0392B' }}>LOGIN REQUIRED</p>
        <button
          onClick={() => navigate('/login')}
          style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: '#fff', background: '#C0392B', border: 'none', borderBottom: '3px solid #922b21', borderRadius: 4, padding: '10px 24px', cursor: 'pointer' }}
        >
          ENTER
        </button>
      </div>
    );
  }

  // Negocios del usuario simulado
  const misNegocios = NEGOCIOS.slice(0, 2);
  const anoRegistro = new Date(usuario.created_at).getFullYear();

  return (
    <div style={{ background: '#FFF8EE', minHeight: '100vh', paddingBottom: 80, maxWidth: 768, margin: '0 auto' }}>
      {/* Header de perfil */}
      <div
        style={{
          background: '#3E2723',
          padding: '24px 20px 28px',
          position: 'relative',
        }}
      >
        <button
          onClick={() => { logout(); navigate('/'); }}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'rgba(255,255,255,0.1)',
            border: 'none',
            borderRadius: 4,
            padding: '6px 10px',
            cursor: 'pointer',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 13,
            letterSpacing: '0.06em',
          }}
        >
          <LogOut size={14} />
          LOG OUT
        </button>

        {/* Avatar */}
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            background: '#C0392B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 32,
            color: '#F4C430',
            border: '3px solid #F4C430',
            marginBottom: 12,
          }}
        >
          {usuario.nombre.charAt(0).toUpperCase()}
        </div>

        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 28,
            letterSpacing: '0.06em',
            color: '#fff',
            margin: 0,
            lineHeight: 1,
          }}
        >
          {usuario.nombre}
        </h1>
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: 13,
            color: 'rgba(255,255,255,0.6)',
            marginTop: 4,
          }}
        >
          Neighbor of {usuario.colonia} · Member since {anoRegistro}
        </p>
      </div>

      {/* Tarjeta de ranking */}
      {impacto && (
        <div
          style={{
            background: '#F4C430',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 48,
              color: '#3E2723',
              letterSpacing: '0.04em',
              lineHeight: 1,
            }}
          >
            #{impacto.ranking_barrio}
          </div>
          <div>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 16,
                letterSpacing: '0.06em',
                color: '#3E2723',
              }}
            >
              TOP CONSCIOUS CONSUMER
            </div>
            <div
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                color: '#5D4037',
              }}
            >
              of {usuario.colonia}
            </div>
          </div>
        </div>
      )}

      {/* Dashboard de impacto 2x2 */}
      {impacto && (
        <div style={{ padding: '20px 16px' }}>
          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 22,
              letterSpacing: '0.06em',
              color: '#3E2723',
              margin: '0 0 12px',
              borderBottom: '2px solid #F4C430',
              paddingBottom: 2,
              display: 'inline-block',
            }}
          >
            MY IMPACT
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { value: `${impacto.total_km.toFixed(1)} km`, label: 'TOTAL KM', color: '#1565C0' },
              { value: `${impacto.total_co2.toFixed(2)} kg`, label: 'CO₂ AVOIDED', color: '#1A7A4A' },
              { value: `$${impacto.total_dinero_local.toLocaleString()}`, label: 'LOCAL MONEY', color: '#C0392B' },
              { value: `${impacto.total_visitas}`, label: 'VISITS', color: '#E65100' },
            ].map((item) => (
              <div
                key={item.label}
                style={{
                  background: '#fff',
                  borderRadius: 8,
                  border: '1.5px solid rgba(62,39,35,0.1)',
                  borderLeft: `4px solid ${item.color}`,
                  padding: '14px 14px',
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 26,
                    letterSpacing: '0.04em',
                    color: item.color,
                    lineHeight: 1,
                  }}
                >
                  {item.value}
                </div>
                <div
                  style={{
                    fontFamily: "'Nunito', sans-serif",
                    fontWeight: 800,
                    fontSize: 11,
                    color: '#5D4037',
                    marginTop: 3,
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate('/mi-impacto')}
            style={{
              width: '100%',
              marginTop: 12,
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 15,
              letterSpacing: '0.06em',
              color: '#1565C0',
              background: '#e3f0ff',
              border: '1.5px solid #1565C0',
              borderRadius: 4,
              padding: '10px',
              cursor: 'pointer',
            }}
          >
            VIEW FULL DASHBOARD →
          </button>
        </div>
      )}

      {/* Mis negocios */}
      <div style={{ padding: '0 16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
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
            MY BUSINESSES
          </h2>
        </div>

        {misNegocios.map((negocio) => {
          const cat = getCategoriaById(negocio.categoria_id);
          return (
            <div
              key={negocio.id}
              style={{
                background: '#fff',
                borderRadius: 8,
                border: '1.5px solid rgba(62,39,35,0.1)',
                borderLeft: `4px solid ${cat?.color_hex ?? '#C0392B'}`,
                padding: '12px',
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <span style={{ fontSize: 28 }}>{cat?.icono ?? '🏪'}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, letterSpacing: '0.04em', color: '#3E2723' }}>
                  {negocio.nombre}
                </div>
                <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 12, color: '#5D4037' }}>
                  {negocio.colonia} · ★ {negocio.rating_promedio.toFixed(1)}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  style={{
                    background: '#e3f0ff',
                    border: '1px solid #1565C0',
                    borderRadius: 4,
                    padding: '6px',
                    cursor: 'pointer',
                    color: '#1565C0',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Edit2 size={14} />
                </button>
                <button
                  style={{
                    background: '#fce4e4',
                    border: '1px solid #C0392B',
                    borderRadius: 4,
                    padding: '6px',
                    cursor: 'pointer',
                    color: '#C0392B',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          );
        })}

        <button
          onClick={() => navigate('/registrar-negocio')}
          style={{
            width: '100%',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 16,
            letterSpacing: '0.06em',
            color: '#fff',
            background: '#1A7A4A',
            border: 'none',
            borderBottom: '3px solid #145a36',
            borderRadius: 4,
            padding: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Plus size={18} />
          REGISTER NEW BUSINESS
        </button>
      </div>

      <BottomNav />
    </div>
  );
}