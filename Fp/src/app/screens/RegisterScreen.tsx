// SCR-02: Registro — wizard de 3 pasos
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { WizardProgress } from '../components/bv/Wizard';
import { simularLogin } from '../store/useStore';

const STEPS = ['DATA', 'NEIGHBORHOOD', 'DONE!'];

interface FormData {
  nombre: string;
  email: string;
  password: string;
  confirmPassword: string;
  colonia: string;
  esVendedor: boolean;
}

export function RegisterScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({
    nombre: '',
    email: '',
    password: '',
    confirmPassword: '',
    colonia: '',
    esVendedor: false,
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);

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
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 800,
    fontSize: 13,
    color: '#3E2723',
    marginBottom: 5,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  };

  function validateStep1() {
    const errs: Partial<FormData> = {};
    if (!form.nombre) errs.nombre = 'Enter your name';
    if (!form.email || !form.email.includes('@')) errs.email = 'Invalid email';
    if (!form.password || form.password.length < 6) errs.password = 'Minimum 6 characters';
    if (form.password !== form.confirmPassword) errs.confirmPassword = 'Passwords do not match';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function validateStep2() {
    const errs: Partial<FormData> = {};
    if (!form.colonia) errs.colonia = 'Enter your neighborhood';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleNext() {
    if (step === 0 && !validateStep1()) return;
    if (step === 1) {
      if (!validateStep2()) return;
      setLoading(true);
      await new Promise((r) => setTimeout(r, 1000));
      simularLogin();
      setLoading(false);
    }
    setStep((s) => s + 1);
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#FFF8EE',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '24px 16px',
        backgroundImage:
          'repeating-linear-gradient(45deg, rgba(192,57,43,0.03) 0px, rgba(192,57,43,0.03) 1px, transparent 1px, transparent 20px)',
      }}
    >
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 32,
            letterSpacing: '0.08em',
            color: '#C0392B',
          }}
        >
          BARRIO VIVO
        </span>
      </div>

      <div
        style={{
          background: '#fff',
          borderRadius: 8,
          border: '1.5px solid rgba(62,39,35,0.12)',
          borderTop: '5px solid #C0392B',
          width: '100%',
          maxWidth: 460,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
          overflow: 'hidden',
        }}
      >
        {/* Progreso */}
        <WizardProgress steps={STEPS} currentStep={step} />

        <div style={{ padding: '24px 24px 28px' }}>
          {/* PASO 1: Datos personales */}
          {step === 0 && (
            <div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 26,
                  letterSpacing: '0.06em',
                  color: '#3E2723',
                  marginBottom: 20,
                }}
              >
                CREATE YOUR ACCOUNT
              </h2>

              {[
                { key: 'nombre', label: 'Your name', type: 'text', placeholder: 'Ex: Jane Doe' },
                { key: 'email', label: 'Email address', type: 'email', placeholder: 'you@email.com' },
                { key: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
                { key: 'confirmPassword', label: 'Confirm password', type: 'password', placeholder: '••••••••' },
              ].map((field) => (
                <div key={field.key} style={{ marginBottom: 14 }}>
                  <label style={labelStyle}>{field.label}</label>
                  <input
                    type={field.type}
                    value={(form as any)[field.key]}
                    onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                    placeholder={field.placeholder}
                    style={{
                      ...inputStyle,
                      borderColor: (errors as any)[field.key] ? '#C0392B' : 'rgba(62,39,35,0.2)',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#C0392B')}
                    onBlur={(e) => (e.target.style.borderColor = (errors as any)[field.key] ? '#C0392B' : 'rgba(62,39,35,0.2)')}
                  />
                  {(errors as any)[field.key] && (
                    <p
                      style={{
                        fontFamily: "'Nunito', sans-serif",
                        fontWeight: 700,
                        fontSize: 12,
                        color: '#C0392B',
                        marginTop: 3,
                      }}
                    >
                      ! {(errors as any)[field.key]}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* PASO 2: Barrio */}
          {step === 1 && (
            <div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 26,
                  letterSpacing: '0.06em',
                  color: '#3E2723',
                  marginBottom: 20,
                }}
              >
                WHERE DO YOU LIVE?
              </h2>

              <div style={{ marginBottom: 16 }}>
                <label style={labelStyle}>Your neighborhood</label>
                <input
                  type="text"
                  value={form.colonia}
                  onChange={(e) => setForm((f) => ({ ...f, colonia: e.target.value }))}
                  placeholder="Ex: Downtown, Upper West Side..."
                  style={{
                    ...inputStyle,
                    borderColor: errors.colonia ? '#C0392B' : 'rgba(62,39,35,0.2)',
                  }}
                />
                {errors.colonia && (
                  <p
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 700,
                      fontSize: 12,
                      color: '#C0392B',
                      marginTop: 3,
                    }}
                  >
                    ! {errors.colonia}
                  </p>
                )}
              </div>

              <button
                style={{
                  width: '100%',
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 800,
                  fontSize: 14,
                  color: '#1565C0',
                  background: '#e3f0ff',
                  border: '1.5px solid #1565C0',
                  borderRadius: 4,
                  padding: '10px',
                  cursor: 'pointer',
                  marginBottom: 20,
                }}
              >
                Detect my location automatically
              </button>

              {/* Toggle vendedor */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  background: form.esVendedor ? '#C3EDCF' : '#f5f5f5',
                  borderRadius: 6,
                  border: `1.5px solid ${form.esVendedor ? '#1A7A4A' : 'rgba(0,0,0,0.1)'}`,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onClick={() => setForm((f) => ({ ...f, esVendedor: !f.esVendedor }))}
              >
                <div
                  style={{
                    width: 44,
                    height: 24,
                    borderRadius: 12,
                    background: form.esVendedor ? '#1A7A4A' : '#9e9e9e',
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
                      left: form.esVendedor ? 22 : 2,
                      transition: 'left 0.2s',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.3)',
                    }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 800,
                      fontSize: 14,
                      color: '#3E2723',
                    }}
                  >
                    I'm a seller
                  </div>
                  <div
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 700,
                      fontSize: 12,
                      color: '#5D4037',
                    }}
                  >
                    I want to register my business in the neighborhood
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PASO 3: Confirmación */}
          {step === 2 && (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 60, marginBottom: 16 }}>✦</div>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 32,
                  letterSpacing: '0.06em',
                  color: '#C0392B',
                  marginBottom: 8,
                }}
              >
                WELCOME TO THE NEIGHBORHOOD!
              </h2>
              <p
                style={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  color: '#5D4037',
                  lineHeight: 1.6,
                  marginBottom: 24,
                }}
              >
                Hello <strong>{form.nombre || 'neighbor'}</strong>, you are now part of <strong>Barrio Vivo</strong>. Start discovering and supporting businesses in your neighborhood.
              </p>
              <button
                onClick={() => navigate('/home')}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 20,
                  letterSpacing: '0.08em',
                  color: '#fff',
                  background: '#C0392B',
                  border: 'none',
                  borderBottom: '3px solid #922b21',
                  borderRadius: 4,
                  padding: '12px 40px',
                  cursor: 'pointer',
                }}
              >
                GO TO MAP
              </button>
            </div>
          )}

          {/* Botones de navegación */}
          {step < 2 && (
            <div style={{ marginTop: 24, display: 'flex', gap: 10 }}>
              {step > 0 && (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  style={{
                    flex: 1,
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 16,
                    letterSpacing: '0.06em',
                    color: '#3E2723',
                    background: '#FFF8EE',
                    border: '1.5px solid rgba(62,39,35,0.3)',
                    borderBottom: '3px solid rgba(62,39,35,0.3)',
                    borderRadius: 4,
                    padding: '10px',
                    cursor: 'pointer',
                  }}
                >
                  ← BACK
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={loading}
                style={{
                  flex: 2,
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 18,
                  letterSpacing: '0.08em',
                  color: '#fff',
                  background: loading ? '#9e9e9e' : '#C0392B',
                  border: 'none',
                  borderBottom: `3px solid ${loading ? '#757575' : '#922b21'}`,
                  borderRadius: 4,
                  padding: '12px',
                  cursor: loading ? 'not-allowed' : 'pointer',
                }}
              >
                {loading ? 'CREATING...' : step === 1 ? 'CREATE ACCOUNT' : 'NEXT →'}
              </button>
            </div>
          )}
        </div>
      </div>

      <p
        style={{
          marginTop: 16,
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 700,
          fontSize: 14,
          color: '#5D4037',
          textAlign: 'center',
        }}
      >
        Already have an account?{' '}
        <button
          onClick={() => navigate('/login')}
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
          Log in
        </button>
      </p>
    </div>
  );
}