// Header — Toldo de mercado con borde serrado inferior y nav visible
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { useBarrioStore } from '../../store/useStore';
import {
  IconBell,
  IconUser,
  IconMap,
  IconSearch,
  IconPlus,
  IconRecycle,
} from './AbstractIcon';

interface TopNavProps {
  showSearch?: boolean;
  onSearchChange?: (q: string) => void;
  searchValue?: string;
  /** Si true, muestra botones ENTRAR / CREAR CUENTA (modo público) */
  publicMode?: boolean;
}

const NAV_TABS = [
  { id: 'home', label: 'MAP', path: '/home', Icon: IconMap, color: '#C0392B' },
  { id: 'explorar', label: 'EXPLORE', path: '/explorar', Icon: IconSearch, color: '#E67E22' },
  { id: 'registrar', label: 'REGISTER', path: '/registrar-negocio', Icon: IconPlus, color: '#F4C430' },
  { id: 'circular', label: 'CIRCULAR', path: '/moda-circular', Icon: IconRecycle, color: '#27AE60' },
  { id: 'perfil', label: 'PROFILE', path: '/perfil', Icon: IconUser, color: '#8B4513' },
];

// Borde serrado tipo toldo de mercado
function SerratedEdge() {
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -10,
        height: 10,
        backgroundImage:
          'linear-gradient(135deg, #C0392B 25%, transparent 25%), linear-gradient(225deg, #C0392B 25%, transparent 25%)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0',
        zIndex: 1,
      }}
    />
  );
}

export function TopNav({
  showSearch = true,
  onSearchChange,
  searchValue = '',
  publicMode = false,
}: TopNavProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { coloniaActual } = useBarrioStore();
  const [hoverTab, setHoverTab] = useState<string | null>(null);
  const [hoverBtn, setHoverBtn] = useState<string | null>(null);

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 50 }}>
      <div
        style={{
          background:
            'linear-gradient(180deg, #C0392B 0%, #C0392B 80%, #a8331f 100%)',
          padding: '14px 20px 12px',
          boxShadow: '0 4px 12px rgba(62,39,35,0.25)',
          position: 'relative',
        }}
      >
        {/* Fila 1: logo + acciones */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: showSearch || !publicMode ? 10 : 0,
          }}
        >
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              display: 'flex',
              alignItems: 'baseline',
              gap: 8,
            }}
          >
            <span
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 28,
                letterSpacing: '0.08em',
                color: '#F4C430',
                lineHeight: 1,
                textShadow: '2px 2px 0 rgba(0,0,0,0.18)',
              }}
            >
              BARRIO
            </span>
            <span
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 28,
                letterSpacing: '0.08em',
                color: '#FFF8EE',
                lineHeight: 1,
                textShadow: '2px 2px 0 rgba(0,0,0,0.18)',
              }}
            >
              VIVO
            </span>
          </button>

          {publicMode ? (
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => navigate('/login')}
                onMouseEnter={() => setHoverBtn('entrar')}
                onMouseLeave={() => setHoverBtn(null)}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 14,
                  letterSpacing: '0.08em',
                  color: '#3E2723',
                  background: hoverBtn === 'entrar' ? '#FFD95C' : '#F4C430',
                  border: 'none',
                  borderBottom: '3px solid #c49a00',
                  borderRadius: 4,
                  padding: '8px 18px',
                  cursor: 'pointer',
                  transform: hoverBtn === 'entrar' ? 'translateY(-1px)' : 'translateY(0)',
                  transition: 'all 0.15s',
                  boxShadow:
                    hoverBtn === 'entrar'
                      ? '0 4px 10px rgba(0,0,0,0.25)'
                      : '0 2px 4px rgba(0,0,0,0.15)',
                }}
              >
                LOGIN
              </button>
              <button
                onClick={() => navigate('/register')}
                onMouseEnter={() => setHoverBtn('crear')}
                onMouseLeave={() => setHoverBtn(null)}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 14,
                  letterSpacing: '0.08em',
                  color: '#F4C430',
                  background: hoverBtn === 'crear' ? '#5d3320' : '#3E2723',
                  border: 'none',
                  borderBottom: '3px solid #2a1a14',
                  borderRadius: 4,
                  padding: '8px 18px',
                  cursor: 'pointer',
                  transform: hoverBtn === 'crear' ? 'translateY(-1px)' : 'translateY(0)',
                  transition: 'all 0.15s',
                  boxShadow:
                    hoverBtn === 'crear'
                      ? '0 4px 10px rgba(0,0,0,0.25)'
                      : '0 2px 4px rgba(0,0,0,0.15)',
                }}
              >
                CREATE ACCOUNT
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => navigate('/por-que-local')}
                onMouseEnter={() => setHoverBtn('bell')}
                onMouseLeave={() => setHoverBtn(null)}
                style={{
                  background:
                    hoverBtn === 'bell' ? 'rgba(244,196,48,0.95)' : 'rgba(255,255,255,0.18)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 36,
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  boxShadow:
                    hoverBtn === 'bell'
                      ? '0 3px 8px rgba(0,0,0,0.25)'
                      : 'inset 0 0 0 1px rgba(255,255,255,0.2)',
                }}
                title="Why local"
              >
                <IconBell color={hoverBtn === 'bell' ? '#3E2723' : '#F4C430'} size={18} />
              </button>
              <button
                onClick={() => navigate('/perfil')}
                onMouseEnter={() => setHoverBtn('user')}
                onMouseLeave={() => setHoverBtn(null)}
                style={{
                  background:
                    hoverBtn === 'user' ? 'rgba(244,196,48,0.95)' : 'rgba(255,255,255,0.18)',
                  border: 'none',
                  borderRadius: '50%',
                  width: 36,
                  height: 36,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                  boxShadow:
                    hoverBtn === 'user'
                      ? '0 3px 8px rgba(0,0,0,0.25)'
                      : 'inset 0 0 0 1px rgba(255,255,255,0.2)',
                }}
                title="My profile"
              >
                <IconUser color={hoverBtn === 'user' ? '#3E2723' : '#F4C430'} size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Búsqueda */}
        {showSearch && !publicMode && (
          <input
            type="text"
            value={searchValue}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search tortilleria, fonda, mechanic..."
            style={{
              width: '100%',
              background: '#FFF8EE',
              border: '2px solid #F4C430',
              borderRadius: 4,
              padding: '8px 14px',
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: '#3E2723',
              outline: 'none',
              boxSizing: 'border-box',
              boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.15)',
            }}
          />
        )}

        {/* Colonia */}
        {!publicMode && (
          <div style={{ marginTop: 8 }}>
            <span
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: 11,
                letterSpacing: '0.05em',
                color: '#FFF8EE',
                background: 'rgba(0,0,0,0.18)',
                padding: '3px 10px',
                borderRadius: 12,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <IconMap color="#F4C430" size={12} />
              {coloniaActual?.toUpperCase?.() ?? 'COYOACÁN'} · 5KM
            </span>
          </div>
        )}
      </div>

      {/* Borde serrado tipo toldo (SVG triangulos) */}
      <svg
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        style={{
          display: 'block',
          width: '100%',
          height: 14,
          filter: 'drop-shadow(0 3px 4px rgba(62,39,35,0.25))',
        }}
      >
        <polygon
          points="0,0 100,0 100,2 97,10 94,2 91,10 88,2 85,10 82,2 79,10 76,2 73,10 70,2 67,10 64,2 61,10 58,2 55,10 52,2 49,10 46,2 43,10 40,2 37,10 34,2 31,10 28,2 25,10 22,2 19,10 16,2 13,10 10,2 7,10 4,2 1,10 0,2"
          fill="#C0392B"
        />
      </svg>

      {/* Navegación visible arriba (solo modo autenticado) */}
      {!publicMode && (
        <div
          style={{
            background: '#3E2723',
            display: 'flex',
            overflowX: 'auto',
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
          }}
        >
          {NAV_TABS.map((tab) => {
            const isActive = location.pathname === tab.path;
            const isHover = hoverTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => navigate(tab.path)}
                onMouseEnter={() => setHoverTab(tab.id)}
                onMouseLeave={() => setHoverTab(null)}
                style={{
                  flex: '1 0 auto',
                  minWidth: 96,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  padding: '12px 14px',
                  background: isActive
                    ? tab.color
                    : isHover
                    ? 'rgba(244,196,48,0.12)'
                    : 'transparent',
                  border: 'none',
                  borderBottom: isActive
                    ? `3px solid ${tab.color}`
                    : '3px solid transparent',
                  cursor: 'pointer',
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 13,
                  letterSpacing: '0.08em',
                  color: isActive
                    ? tab.id === 'registrar'
                      ? '#3E2723'
                      : '#FFF8EE'
                    : isHover
                    ? '#F4C430'
                    : 'rgba(255,248,238,0.75)',
                  transition: 'all 0.15s',
                  whiteSpace: 'nowrap',
                }}
              >
                <tab.Icon
                  color={
                    isActive
                      ? tab.id === 'registrar'
                        ? '#3E2723'
                        : '#FFF8EE'
                      : tab.color
                  }
                  size={18}
                />
                {tab.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
