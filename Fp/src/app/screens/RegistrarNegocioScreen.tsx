// SCR-06: Registrar Negocio — wizard de 3 pasos
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { WizardProgress } from '../components/bv/Wizard';
import { CATEGORIAS } from '../data/mockData';
import { ArrowLeft } from 'lucide-react';
import { TopNav } from '../components/bv/TopNav';
import { BottomNav } from '../components/bv/BottomNav';
import { PhotoCarousel } from '../components/bv/PhotoCarousel';
import { CategoriaIcon, IconStore, IconCheck, IconMap } from '../components/bv/AbstractIcon';
import { REGISTRAR_PHOTOS } from '../data/photos';
import { motion } from 'motion/react';

const STEPS = ['BUSINESS', 'HISTORY', 'LOCATION'];

const DIAS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

interface NegocioForm {
  nombre: string;
  categoria_id: string;
  anios_en_barrio: string;
  descripcion: string;
  historia: string;
  dias: string[];
  horaAbre: string;
  horaCierra: string;
  direccion: string;
  colonia: string;
  telefono: string;
  whatsapp: string;
}

export function RegistrarNegocioScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<NegocioForm>({
    nombre: '',
    categoria_id: '',
    anios_en_barrio: '',
    descripcion: '',
    historia: '',
    dias: [],
    horaAbre: '08:00',
    horaCierra: '18:00',
    direccion: '',
    colonia: '',
    telefono: '',
    whatsapp: '',
  });

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: '#FFF8EE',
    border: '2px solid rgba(62,39,35,0.2)',
    borderRadius: 4,
    padding: '10px 12px',
    fontFamily: "'Nunito', sans-serif",
    fontWeight: 700,
    fontSize: 14,
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
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: '0.04em',
  };

  async function handleFinish() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setDone(true);
  }

  const categoriaSeleccionada = CATEGORIAS.find((c) => c.id === form.categoria_id);

  return (
    <div style={{ background: '#FFF8EE', minHeight: '100vh', maxWidth: 768, margin: '0 auto' }}>
      <TopNav showSearch={false} />

      {/* Encabezado de sección — amarillo maíz */}
      <div
        style={{
          background: 'linear-gradient(180deg, #F4C430 0%, #E0AE12 100%)',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          boxShadow: '0 4px 12px rgba(196,154,0,0.4)',
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: 'rgba(62,39,35,0.15)',
            border: 'none',
            color: '#3E2723',
            cursor: 'pointer',
            borderRadius: 6,
            padding: 6,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <ArrowLeft size={20} />
        </button>
        <span
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 24,
            letterSpacing: '0.08em',
            color: '#3E2723',
            textShadow: '1px 1px 0 rgba(255,255,255,0.4)',
          }}
        >
          REGISTER BUSINESS
        </span>
      </div>

      {/* Carrusel de motivación */}
      {!done && (
        <div style={{ padding: '14px 16px 4px' }}>
          <PhotoCarousel photos={REGISTRAR_PHOTOS} glowColor="#F4C430" height={150} />
        </div>
      )}

      {!done && <WizardProgress steps={STEPS} currentStep={step} />}

      <div style={{ padding: '20px 16px 120px' }}>
        {/* COMPLETADO */}
        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            style={{ textAlign: 'center', padding: '40px 0' }}
          >
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16, gap: 10 }}>
              <IconStore color="#1A7A4A" size={80} />
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                style={{ alignSelf: 'center' }}
              >
                <IconCheck color="#1A7A4A" size={40} />
              </motion.div>
            </div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 30, letterSpacing: '0.06em', color: '#1A7A4A', margin: '0 0 8px' }}>
              YOUR BUSINESS IS NOW IN THE NEIGHBORHOOD!
            </h2>
            <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 15, color: '#5D4037', lineHeight: 1.6, marginBottom: 24 }}>
              <strong>{form.nombre}</strong> was registered. It will be available in the directory once verified.
            </p>
            {/* Preview card */}
            <div
              style={{
                background: '#fff',
                borderRadius: 8,
                border: '1.5px solid rgba(62,39,35,0.1)',
                borderTop: `5px solid ${categoriaSeleccionada?.color_hex ?? '#C0392B'}`,
                padding: '16px',
                marginBottom: 24,
                textAlign: 'left',
              }}
            >
              <div style={{ marginBottom: 8 }}>
                {categoriaSeleccionada ? (
                  <CategoriaIcon categoriaId={categoriaSeleccionada.id} size={48} />
                ) : (
                  <IconStore size={48} />
                )}
              </div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 20, color: '#3E2723', margin: '0 0 4px' }}>
                {form.nombre}
              </h3>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 13, color: '#5D4037', margin: 0 }}>
                {form.colonia} · {categoriaSeleccionada?.nombre}
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => navigate('/home')}
                style={{
                  flex: 1,
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 16,
                  letterSpacing: '0.06em',
                  color: '#fff',
                  background: '#C0392B',
                  border: 'none',
                  borderBottom: '3px solid #922b21',
                  borderRadius: 4,
                  padding: '12px',
                  cursor: 'pointer',
                }}
              >
                GO TO MAP
              </button>
              <button
                style={{
                  flex: 1,
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 16,
                  letterSpacing: '0.06em',
                  color: '#3E2723',
                  background: '#F4C430',
                  border: 'none',
                  borderBottom: '3px solid #c49a00',
                  borderRadius: 4,
                  padding: '12px',
                  cursor: 'pointer',
                }}
              >
                SHARE
              </button>
            </div>
          </motion.div>
        )}

        {/* PASO 1: Datos del negocio */}
        {!done && step === 0 && (
          <div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: '0.06em', color: '#3E2723', marginBottom: 20 }}>
              WHAT IS THE NAME OF YOUR BUSINESS?
            </h2>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Business Name</label>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
                placeholder="Ex: The Hope Bakery"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = '#C0392B')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(62,39,35,0.2)')}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>What kind of business is it?</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                {CATEGORIAS.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setForm((f) => ({ ...f, categoria_id: cat.id }))}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      padding: '10px 6px',
                      background: form.categoria_id === cat.id ? cat.color_hex + '22' : '#fff',
                      border: `1.5px solid ${form.categoria_id === cat.id ? cat.color_hex : 'rgba(62,39,35,0.15)'}`,
                      borderRadius: 6,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    <CategoriaIcon categoriaId={cat.id} size={40} />
                    <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 10, color: '#3E2723', textAlign: 'center', lineHeight: 1.3 }}>
                      {cat.nombre}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>How many years have you been in this neighborhood?</label>
              <input
                type="number"
                value={form.anios_en_barrio}
                onChange={(e) => setForm((f) => ({ ...f, anios_en_barrio: e.target.value }))}
                placeholder="Ex: 15"
                style={inputStyle}
                onFocus={(e) => (e.target.style.borderColor = '#C0392B')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(62,39,35,0.2)')}
              />
            </div>
          </div>
        )}

        {/* PASO 2: Historia */}
        {!done && step === 1 && (
          <div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: '0.06em', color: '#3E2723', marginBottom: 20 }}>
              TELL US YOUR STORY
            </h2>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Business Description</label>
              <textarea
                value={form.descripcion}
                onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))}
                placeholder="What do you sell? What's your specialty? Why should neighbors visit you?"
                rows={3}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={(e) => (e.target.style.borderColor = '#C0392B')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(62,39,35,0.2)')}
              />
            </div>

            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>Your story in the neighborhood</label>
              <textarea
                value={form.historia}
                onChange={(e) => setForm((f) => ({ ...f, historia: e.target.value }))}
                placeholder="How did you start? What is the tradition behind your business? What makes you different?"
                rows={4}
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={(e) => (e.target.style.borderColor = '#C0392B')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(62,39,35,0.2)')}
              />
            </div>

            {/* Horario */}
            <div style={{ marginBottom: 16 }}>
              <label style={labelStyle}>What days are you open?</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {DIAS.map((dia) => (
                  <button
                    key={dia}
                    onClick={() =>
                      setForm((f) => ({
                        ...f,
                        dias: f.dias.includes(dia) ? f.dias.filter((d) => d !== dia) : [...f.dias, dia],
                      }))
                    }
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 13,
                      letterSpacing: '0.06em',
                      padding: '6px 10px',
                      background: form.dias.includes(dia) ? '#C0392B' : '#fff',
                      color: form.dias.includes(dia) ? '#fff' : '#3E2723',
                      border: `1.5px solid ${form.dias.includes(dia) ? '#922b21' : 'rgba(62,39,35,0.2)'}`,
                      borderRadius: 3,
                      cursor: 'pointer',
                    }}
                  >
                    {dia.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={labelStyle}>Opening time</label>
                <input type="time" value={form.horaAbre} onChange={(e) => setForm((f) => ({ ...f, horaAbre: e.target.value }))} style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Closing time</label>
                <input type="time" value={form.horaCierra} onChange={(e) => setForm((f) => ({ ...f, horaCierra: e.target.value }))} style={inputStyle} />
              </div>
            </div>
          </div>
        )}

        {/* PASO 3: Ubicación y contacto */}
        {!done && step === 2 && (
          <div>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, letterSpacing: '0.06em', color: '#3E2723', marginBottom: 20 }}>
              WHERE ARE YOU?
            </h2>

            {[
              { key: 'direccion', label: 'Address', placeholder: 'Street, number, locale' },
              { key: 'colonia', label: 'Neighborhood', placeholder: 'Ex: Downtown, Upper West Side...' },
              { key: 'telefono', label: 'Phone', placeholder: '55 1234 5678' },
              { key: 'whatsapp', label: 'WhatsApp (no spaces)', placeholder: '5512345678' },
            ].map((field) => (
              <div key={field.key} style={{ marginBottom: 14 }}>
                <label style={labelStyle}>{field.label}</label>
                <input
                  type="text"
                  value={(form as any)[field.key]}
                  onChange={(e) => setForm((f) => ({ ...f, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = '#C0392B')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(62,39,35,0.2)')}
                />
              </div>
            ))}

            <button
              onClick={() =>
                setForm((f) => ({
                  ...f,
                  direccion: f.direccion || 'Av. Universidad 1500',
                  colonia: f.colonia || 'Coyoacán',
                }))
              }
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow =
                  '0 0 0 2px #1565C0, 0 6px 16px rgba(21,101,192,0.35)')
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.boxShadow = 'none')
              }
              style={{
                width: '100%',
                fontFamily: "'Nunito', sans-serif",
                fontWeight: 800,
                fontSize: 14,
                color: '#1565C0',
                background: '#e3f0ff',
                border: '1.5px solid #1565C0',
                borderRadius: 6,
                padding: '12px',
                cursor: 'pointer',
                marginTop: 4,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'box-shadow 0.2s',
              }}
            >
              <IconMap color="#1565C0" size={16} />
              USE MY CURRENT LOCATION
            </button>
          </div>
        )}

        {/* Botones de navegación */}
        {!done && (
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, maxWidth: 768, margin: '0 auto', background: '#FFF8EE', borderTop: '2px solid rgba(62,39,35,0.1)', padding: '12px 16px', display: 'flex', gap: 10, zIndex: 100 }}>
            {step > 0 && (
              <button
                onClick={() => setStep((s) => s - 1)}
                style={{
                  flex: 1,
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 15,
                  letterSpacing: '0.06em',
                  color: '#3E2723',
                  background: '#FFF8EE',
                  border: '1.5px solid rgba(62,39,35,0.3)',
                  borderBottom: '3px solid rgba(62,39,35,0.3)',
                  borderRadius: 4,
                  padding: '11px',
                  cursor: 'pointer',
                }}
              >
                ← PREVIOUS
              </button>
            )}
            <button
              onClick={step < 2 ? () => setStep((s) => s + 1) : handleFinish}
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
              {loading ? 'REGISTERING...' : step < 2 ? 'NEXT →' : 'REGISTER BUSINESS'}
            </button>
          </div>
        )}
      </div>

      {done && <BottomNav />}
    </div>
  );
}