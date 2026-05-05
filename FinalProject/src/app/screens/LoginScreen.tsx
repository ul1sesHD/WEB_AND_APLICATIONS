// SCR-01: Login
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useBarrioStore, simularLogin } from '../store/useStore';

export function LoginScreen() {
  const navigate = useNavigate();
  const login = useBarrioStore((s) => s.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    // Simulación de autenticación
    await new Promise((r) => setTimeout(r, 900));
    if (email === 'admin@barrio.mx' && password === 'admin') {
      simularLogin();
      navigate('/admin');
    } else if (email.includes('@')) {
      simularLogin();
      navigate('/home');
    } else {
      setError('Incorrect email or password. Please try again.');
    }
    setLoading(false);
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#FFF8EE',
    border: '2px solid rgba(62,39,35,0.2)',
    borderRadius: 4,
    padding: '10px 12px',
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 700,
    fontSize: 15,
    color: '#3E2723',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s',
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFF8EE',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backgroundImage:
          'repeating-linear-gradient(45deg, rgba(192,57,43,0.03) 0px, rgba(192,57,43,0.03) 1px, transparent 1px, transparent 20px)',
      }}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 8,
          border: '1.5px solid rgba(62,39,35,0.15)',
          borderTop: '5px solid #C0392B',
          padding: '32px 28px',
          width: '100%',
          maxWidth: 420,
          boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 42,
              letterSpacing: '0.1em',
              color: '#C0392B',
              lineHeight: 0.9,
            }}
          >
            BARRIO
          </div>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 42,
              letterSpacing: '0.1em',
              color: '#3E2723',
              lineHeight: 0.9,
            }}
          >
            <span style={{ borderBottom: '3px solid #F4C430' }}>VIVO</span>
          </div>
          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: '#5D4037',
              marginTop: 8,
            }}
          >
            Your neighborhood, more alive
          </p>
        </div>

        <form onSubmit={handleLogin}>
          {/* Email */}
          <div style={{ marginBottom: 16 }}>
            <label
              style={{
                display: 'block',
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: 13,
                color: '#3E2723',
                marginBottom: 5,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Email address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              style={{
                ...inputStyle,
                borderColor: error ? '#C0392B' : 'rgba(62,39,35,0.2)',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#C0392B')}
              onBlur={(e) => (e.target.style.borderColor = error ? '#C0392B' : 'rgba(62,39,35,0.2)')}
            />
          </div>

          {/* Contraseña */}
          <div style={{ marginBottom: 8 }}>
            <label
              style={{
                display: 'block',
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: 13,
                color: '#3E2723',
                marginBottom: 5,
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                ...inputStyle,
                borderColor: error ? '#C0392B' : 'rgba(62,39,35,0.2)',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#C0392B')}
              onBlur={(e) => (e.target.style.borderColor = error ? '#C0392B' : 'rgba(62,39,35,0.2)')}
            />
          </div>

          {/* Error */}
          {error && (
            <p
              style={{
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 700,
                fontSize: 13,
                color: '#C0392B',
                marginBottom: 12,
                marginTop: 4,
              }}
            >
              ⚠ {error}
            </p>
          )}

          {/* Hint */}
          <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 12, color: '#5D4037', marginBottom: 16 }}>
            💡 Demo: any valid email + password enters the app
          </p>

          {/* CTA */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 20,
              letterSpacing: '0.08em',
              color: '#fff',
              background: loading ? '#9e9e9e' : '#C0392B',
              border: 'none',
              borderBottom: `3px solid ${loading ? '#757575' : '#922b21'}`,
              borderRadius: 4,
              padding: '12px',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginBottom: 16,
              transition: 'background 0.15s',
            }}
          >
            {loading ? 'ENTERING...' : 'ENTER'}
          </button>
        </form>

        <p
          style={{
            textAlign: 'center',
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: '#5D4037',
          }}
        >
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            style={{
              background: 'none',
              border: 'none',
              color: '#1565C0',
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
              fontSize: 14,
              cursor: 'pointer',
              textDecoration: 'underline',
              padding: 0,
            }}
          >
            Sign up
          </button>
        </p>

        <p
          style={{
            textAlign: 'center',
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: 13,
            color: 'rgba(93,64,55,0.5)',
            marginTop: 12,
          }}
        >
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: 'none',
              color: 'inherit',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              fontWeight: 'inherit',
            }}
          >
            ← Back to home
          </button>
        </p>
      </div>
    </div>
  );
}