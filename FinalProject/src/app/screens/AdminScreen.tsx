// SCR-11: Admin Panel
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Check, X, Search } from 'lucide-react';
import { NEGOCIOS, CATEGORIAS, getCategoriaById } from '../data/mockData';
import { VerifiedBadge } from '../components/bv/VerifiedBadge';

type AdminTab = 'pending' | 'users' | 'categories';

const USUARIOS_MOCK = [
  { id: 'u1', nombre: 'Marisol Hernández', email: 'marisol@mail.com', rol: 'user', colonia: 'Coyoacán', activo: true },
  { id: 'u2', nombre: 'Roberto Gutiérrez', email: 'roberto@mail.com', rol: 'seller', colonia: 'Roma Norte', activo: true },
  { id: 'u3', nombre: 'Carmen López', email: 'carmen@mail.com', rol: 'user', colonia: 'Tepito', activo: false },
  { id: 'u4', nombre: 'Miguel Torres', email: 'miguel@mail.com', rol: 'seller', colonia: 'Doctores', activo: true },
];

export function AdminScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<AdminTab>('pending');
  const [negociosState, setNegociosState] = useState(NEGOCIOS);
  const [catSearch, setCatSearch] = useState('');
  const [userSearch, setUserSearch] = useState('');

  const pending = negociosState.filter((n) => !n.verificado);
  const verified = negociosState.filter((n) => n.verificado);

  function verify(id: string) {
    setNegociosState((ns) => ns.map((n) => (n.id === id ? { ...n, verificado: true } : n)));
  }

  function reject(id: string) {
    setNegociosState((ns) => ns.filter((n) => n.id !== id));
  }

  return (
    <div style={{ background: '#FFF8EE', minHeight: '100vh', maxWidth: 1024, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ background: '#3E2723', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <button onClick={() => navigate('/home')} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
          <ArrowLeft size={20} />
        </button>
        <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: '0.08em', color: '#F4C430' }}>
          ADMINISTRATION PANEL
        </span>
        <span
          style={{
            marginLeft: 8,
            background: '#C0392B',
            color: '#fff',
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 11,
            letterSpacing: '0.06em',
            padding: '2px 6px',
            borderRadius: 3,
          }}
        >
          ADMIN
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', background: '#fff', borderBottom: '2px solid rgba(62,39,35,0.1)' }}>
        {[
          { id: 'pending', label: `PENDING (${pending.length})` },
          { id: 'users', label: 'USERS' },
          { id: 'categories', label: 'CATEGORIES' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as AdminTab)}
            style={{
              flex: 1,
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 13,
              letterSpacing: '0.06em',
              padding: '12px 8px',
              background: 'transparent',
              border: 'none',
              borderBottom: `3px solid ${activeTab === tab.id ? '#C0392B' : 'transparent'}`,
              color: activeTab === tab.id ? '#C0392B' : '#5D4037',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: '16px' }}>
        {/* TAB: Negocios pendientes */}
        {activeTab === 'pending' && (
          <div>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 13, color: '#5D4037', marginBottom: 16 }}>
              {pending.length} businesses awaiting verification
            </p>
            {pending.map((negocio) => {
              const cat = getCategoriaById(negocio.categoria_id);
              return (
                <div
                  key={negocio.id}
                  style={{
                    background: '#fff',
                    borderRadius: 8,
                    border: '1.5px solid rgba(62,39,35,0.1)',
                    borderLeft: `4px solid ${cat?.color_hex ?? '#C0392B'}`,
                    padding: '14px',
                    marginBottom: 10,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 10 }}>
                    <span style={{ fontSize: 28, flexShrink: 0 }}>{cat?.icono ?? '🏪'}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: '0.04em', color: '#3E2723' }}>
                        {negocio.nombre}
                      </div>
                      <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 12, color: '#5D4037' }}>
                        {cat?.nombre} · {negocio.colonia}
                      </div>
                      <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 11, color: '#9e9e9e', marginTop: 3 }}>
                        {negocio.descripcion.slice(0, 80)}...
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button
                      onClick={() => verify(negocio.id)}
                      style={{
                        flex: 1,
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 14,
                        letterSpacing: '0.06em',
                        color: '#fff',
                        background: '#1A7A4A',
                        border: 'none',
                        borderBottom: '2px solid #145a36',
                        borderRadius: 4,
                        padding: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                      }}
                    >
                      <Check size={14} />
                      VERIFY
                    </button>
                    <button
                      onClick={() => reject(negocio.id)}
                      style={{
                        flex: 1,
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 14,
                        letterSpacing: '0.06em',
                        color: '#fff',
                        background: '#C0392B',
                        border: 'none',
                        borderBottom: '2px solid #922b21',
                        borderRadius: 4,
                        padding: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                      }}
                    >
                      <X size={14} />
                      REJECT
                    </button>
                    <button
                      onClick={() => navigate(`/negocio/${negocio.id}`)}
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 14,
                        letterSpacing: '0.06em',
                        color: '#1565C0',
                        background: '#e3f0ff',
                        border: '1.5px solid #1565C0',
                        borderRadius: 4,
                        padding: '8px 12px',
                        cursor: 'pointer',
                      }}
                    >
                      VIEW
                    </button>
                  </div>
                </div>
              );
            })}

            {pending.length === 0 && (
              <div style={{ textAlign: 'center', padding: '40px', color: '#9e9e9e' }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
                <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 18, letterSpacing: '0.04em' }}>
                  ALL BUSINESSES ARE VERIFIED
                </p>
              </div>
            )}

            {/* Negocios verificados */}
            {verified.length > 0 && (
              <>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, letterSpacing: '0.06em', color: '#1A7A4A', margin: '20px 0 10px' }}>
                  ✓ VERIFIED ({verified.length})
                </h3>
                {verified.map((negocio) => {
                  const cat = getCategoriaById(negocio.categoria_id);
                  return (
                    <div
                      key={negocio.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        padding: '10px 12px',
                        background: '#fff',
                        borderRadius: 6,
                        border: '1.5px solid rgba(26,122,74,0.2)',
                        marginBottom: 8,
                      }}
                    >
                      <span style={{ fontSize: 20 }}>{cat?.icono}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, color: '#3E2723', letterSpacing: '0.04em' }}>
                          {negocio.nombre}
                        </div>
                        <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 11, color: '#5D4037' }}>
                          {negocio.colonia}
                        </div>
                      </div>
                      <VerifiedBadge />
                    </div>
                  );
                })}
              </>
            )}
          </div>
        )}

        {/* TAB: Usuarios */}
        {activeTab === 'users' && (
          <div>
            <div style={{ position: 'relative', marginBottom: 16 }}>
              <Search size={16} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: '#9e9e9e' }} />
              <input
                type="text"
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                placeholder="Search user..."
                style={{
                  width: '100%',
                  background: '#fff',
                  border: '2px solid rgba(62,39,35,0.2)',
                  borderRadius: 4,
                  padding: '9px 12px 9px 34px',
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  fontSize: 14,
                  color: '#3E2723',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ background: '#fff', borderRadius: 8, border: '1.5px solid rgba(62,39,35,0.1)', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr', gap: 0, padding: '8px 12px', background: '#3E2723' }}>
                {['NAME', 'EMAIL', 'ROLE', 'STATUS'].map((h) => (
                  <div key={h} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 12, letterSpacing: '0.06em', color: '#F4C430' }}>
                    {h}
                  </div>
                ))}
              </div>
              {USUARIOS_MOCK.filter((u) =>
                userSearch === '' || u.nombre.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())
              ).map((u, i) => (
                <div
                  key={u.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2fr 2fr 1fr 1fr',
                    gap: 0,
                    padding: '10px 12px',
                    background: i % 2 === 0 ? '#fff' : '#FFF8EE',
                    borderTop: '1px solid rgba(62,39,35,0.06)',
                    alignItems: 'center',
                  }}
                >
                  <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 13, color: '#3E2723' }}>
                    {u.nombre}
                  </div>
                  <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 12, color: '#5D4037' }}>
                    {u.email}
                  </div>
                  <span
                    style={{
                      display: 'inline-block',
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 11,
                      letterSpacing: '0.06em',
                      padding: '2px 6px',
                      borderRadius: 3,
                      background: u.rol === 'seller' ? '#C0392B' : u.rol === 'admin' ? '#3E2723' : '#1565C0',
                      color: '#fff',
                    }}
                  >
                    {u.rol.toUpperCase()}
                  </span>
                  <span
                    style={{
                      display: 'inline-block',
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 11,
                      letterSpacing: '0.06em',
                      padding: '2px 6px',
                      borderRadius: 3,
                      background: u.activo ? '#C3EDCF' : '#fce4e4',
                      color: u.activo ? '#1A7A4A' : '#C0392B',
                    }}
                  >
                    {u.activo ? 'ACTIVE' : 'INACTIVE'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: Categorías */}
        {activeTab === 'categories' && (
          <div>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 13, color: '#5D4037', marginBottom: 12 }}>
              {CATEGORIAS.length} active categories
            </p>
            <div style={{ display: 'grid', gap: 10 }}>
              {CATEGORIAS.map((cat) => (
                <div
                  key={cat.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '12px',
                    background: '#fff',
                    borderRadius: 8,
                    border: '1.5px solid rgba(62,39,35,0.1)',
                    borderLeft: `4px solid ${cat.color_hex}`,
                  }}
                >
                  <span style={{ fontSize: 28 }}>{cat.icono}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 15, letterSpacing: '0.04em', color: '#3E2723' }}>
                      {cat.nombre}
                    </div>
                    <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 11, color: '#5D4037' }}>
                      {cat.descripcion}
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: 6 }}>
                    <button
                      style={{
                        fontFamily: "'Bebas Neue', sans-serif",
                        fontSize: 11,
                        letterSpacing: '0.06em',
                        color: '#1565C0',
                        background: '#e3f0ff',
                        border: '1px solid #1565C0',
                        borderRadius: 3,
                        padding: '4px 8px',
                        cursor: 'pointer',
                      }}
                    >
                      EDIT
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
