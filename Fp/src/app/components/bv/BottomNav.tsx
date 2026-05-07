// Footer — Borde serrado superior, identidad de marca + copyright
import { useNavigate } from 'react-router';

export function BottomNav() {
  const navigate = useNavigate();

  return (
    <footer style={{ marginTop: 32 }}>
      {/* Borde serrado superior */}
      <svg
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: 14 }}
      >
        <polygon
          points="0,10 100,10 100,8 97,0 94,8 91,0 88,8 85,0 82,8 79,0 76,8 73,0 70,8 67,0 64,8 61,0 58,8 55,0 52,8 49,0 46,8 43,0 40,8 37,0 34,8 31,0 28,8 25,0 22,8 19,0 16,8 13,0 10,8 7,0 4,8 1,0 0,8"
          fill="#3E2723"
        />
      </svg>
      {/* Línea decorativa de toldo en franjas */}
      <div
        style={{
          height: 4,
          background:
            'repeating-linear-gradient(90deg, #C0392B 0 18px, #FFF8EE 18px 36px)',
        }}
      />
      <div
        style={{
          background: '#3E2723',
          padding: '28px 24px 24px',
          color: '#FFF8EE',
          fontFamily: "'Nunito', sans-serif",
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
            marginBottom: 10,
          }}
        >
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 26,
              letterSpacing: '0.08em',
              color: '#F4C430',
              lineHeight: 1,
            }}
          >
            BARRIO
          </span>
          <span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 26,
              letterSpacing: '0.08em',
              color: '#FFF8EE',
              lineHeight: 1,
            }}
          >
            VIVO
          </span>
        </button>
        <p
          style={{
            fontWeight: 700,
            fontSize: 14,
            margin: '0 0 12px',
            color: '#FFF8EE',
          }}
        >
          Made with love in CDMX for all neighborhoods.
        </p>
        <p
          style={{
            fontWeight: 700,
            fontSize: 12,
            margin: 0,
            color: 'rgba(255,248,238,0.65)',
          }}
        >
          © 2026 · Barrio Vivo Community
        </p>
      </div>
    </footer>
  );
}
