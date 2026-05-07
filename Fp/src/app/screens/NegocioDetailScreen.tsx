// SCR-05: Detalle de Negocio — pantalla más importante
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ArrowLeft, Share2, Phone, MapPin, Clock, Calendar, MessageCircle } from 'lucide-react';
import { NEGOCIOS, RESENAS, getCategoriaById, calcularDistancia, formatearDistancia, calcularCO2 } from '../data/mockData';
import { RatingStars } from '../components/bv/RatingStars';
import { VerifiedBadge } from '../components/bv/VerifiedBadge';
import { StatusPill } from '../components/bv/StatusPill';
import { HistoryQuote } from '../components/bv/HistoryQuote';
import { PriceSignChip } from '../components/bv/PriceSignChip';
import { useBarrioStore } from '../store/useStore';
import { CategoriaIcon, IconEarth, IconStar } from '../components/bv/AbstractIcon';

export function NegocioDetailScreen() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { userLat, userLng } = useBarrioStore();

  const negocio = NEGOCIOS.find((n) => n.id === id);
  const [showVisitaModal, setShowVisitaModal] = useState(false);
  const [showResenaModal, setShowResenaModal] = useState(false);
  const [visitaConfirmada, setVisitaConfirmada] = useState(false);
  const [dineroGastado, setDineroGastado] = useState('');
  const [resena, setResena] = useState({ rating: 0, comentario: '' });
  const [resenaEnviada, setResenaEnviada] = useState(false);

  if (!negocio) {
    return (
      <div style={{ padding: 24, textAlign: 'center', background: '#FFF8EE', minHeight: '100vh' }}>
        <p style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: '#C0392B' }}>
          BUSINESS NOT FOUND
        </p>
        <button onClick={() => navigate(-1)} style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 16, color: '#1565C0', background: 'none', border: 'none', cursor: 'pointer' }}>
          ← GO BACK
        </button>
      </div>
    );
  }

  const categoria = getCategoriaById(negocio.categoria_id);
  const distanciaKm = calcularDistancia(userLat, userLng, negocio.lat, negocio.lng);
  const distanciaTexto = formatearDistancia(distanciaKm);
  const co2Ahorrado = calcularCO2(distanciaKm);
  const resenas = RESENAS.filter((r) => r.negocio_id === id);
  const colorCategoria = categoria?.color_hex ?? '#C0392B';

  function handleRegistrarVisita() {
    setVisitaConfirmada(true);
    setTimeout(() => {
      setShowVisitaModal(false);
      setVisitaConfirmada(false);
    }, 2500);
  }

  return (
    <div style={{ background: '#FFF8EE', minHeight: '100vh', paddingBottom: 90, maxWidth: 768, margin: '0 auto' }}>
      {/* Hero imagen / emoji */}
      <div
        style={{
          height: 200,
          background: `linear-gradient(180deg, ${colorCategoria}33 0%, ${colorCategoria}88 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <CategoriaIcon categoriaId={negocio.categoria_id} size={96} />

        {/* Botones top */}
        <button
          onClick={() => navigate(-1)}
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: 'rgba(0,0,0,0.4)',
            border: 'none',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
          }}
        >
          <ArrowLeft size={18} />
        </button>

        <button
          style={{
            position: 'absolute',
            top: 12,
            right: negocio.verificado ? 96 : 12,
            background: 'rgba(0,0,0,0.4)',
            border: 'none',
            borderRadius: '50%',
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
          }}
        >
          <Share2 size={18} />
        </button>

        {negocio.verificado && (
          <div style={{ position: 'absolute', top: 16, right: 12 }}>
            <VerifiedBadge />
          </div>
        )}
      </div>

      {/* Contenido principal */}
      <div style={{ padding: '16px 16px 0' }}>
        {/* Tag de categoría */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 12,
            letterSpacing: '0.08em',
            background: colorCategoria,
            color: '#fff',
            padding: '4px 8px',
            borderRadius: 3,
            marginBottom: 6,
          }}
        >
          {categoria?.nombre}
        </span>

        {/* Nombre del negocio */}
        <h1
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 32,
            letterSpacing: '0.04em',
            color: '#3E2723',
            margin: '0 0 8px',
            lineHeight: 1.1,
          }}
        >
          {negocio.nombre}
        </h1>

        {/* Dirección + distancia */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
          <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 13, color: '#5D4037' }}>
            {negocio.direccion}, {negocio.colonia}
          </span>
          <PriceSignChip value={distanciaTexto} bgColor="#1565C0" />
        </div>

        {/* Rating + estado */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
          <RatingStars rating={negocio.rating_promedio} />
          <PriceSignChip value={`${negocio.rating_promedio.toFixed(1)} ★`} bgColor="#F4C430" color="#3E2723" />
          <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 13, color: '#5D4037' }}>
            {negocio.total_resenas} reviews
          </span>
          <StatusPill horario={negocio.horario} />
        </div>

        {/* Grid de info 2x2 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 10,
            marginBottom: 20,
          }}
        >
          {[
            {
              icon: <Clock size={16} />,
              label: 'HOURS',
              value: negocio.horario,
              accent: '#1A7A4A',
            },
            {
              icon: <MapPin size={16} />,
              label: 'DISTANCE',
              value: distanciaTexto + ' away',
              accent: '#C0392B',
            },
            {
              icon: <Phone size={16} />,
              label: 'CONTACT',
              value: negocio.telefono || 'Not available',
              accent: '#F4C430',
            },
            {
              icon: <Calendar size={16} />,
              label: 'IN THE NEIGHBORHOOD FOR',
              value: `${new Date().getFullYear() - negocio.anios_en_barrio} · ${negocio.anios_en_barrio} years`,
              accent: '#1565C0',
            },
          ].map((card) => (
            <div
              key={card.label}
              style={{
                background: '#fff',
                borderRadius: 8,
                border: '1.5px solid rgba(62,39,35,0.1)',
                borderTop: `4px solid ${card.accent}`,
                padding: '10px 12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: card.accent, marginBottom: 4 }}>
                {card.icon}
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 11, letterSpacing: '0.06em', color: '#5D4037' }}>
                  {card.label}
                </span>
              </div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 13, color: '#3E2723', lineHeight: 1.4 }}>
                {card.value}
              </div>
            </div>
          ))}
        </div>

        {/* Su historia */}
        <div style={{ marginBottom: 20 }}>
          <h3
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 20,
              letterSpacing: '0.06em',
              color: '#3E2723',
              marginBottom: 4,
              borderBottom: '2px solid #F4C430',
              paddingBottom: 2,
              display: 'inline-block',
            }}
          >
            THEIR STORY
          </h3>
          <div style={{ marginTop: 12 }}>
            <HistoryQuote quote={negocio.historia} attribution={`Founder of ${negocio.nombre}`} />
          </div>
        </div>

        {/* Descripción */}
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: 14,
            color: '#5D4037',
            lineHeight: 1.7,
            marginBottom: 20,
          }}
        >
          {negocio.descripcion}
        </p>

        {/* Mini-card de impacto */}
        <div
          style={{
            background: '#1A7A4A',
            borderRadius: 8,
            padding: '14px 16px',
            marginBottom: 20,
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 13,
              letterSpacing: '0.06em',
              color: 'rgba(255,255,255,0.8)',
              marginBottom: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <IconEarth size={16} color="#fff" /> IMPACT OF YOUR VISIT
          </div>
          <div
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
              fontSize: 15,
              color: '#fff',
            }}
          >
            Coming here saves <strong>{distanciaTexto}</strong> · prevents <strong>{co2Ahorrado.toFixed(3)} kg</strong> of CO₂
          </div>
        </div>

        {/* Reseñas */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <h3
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 20,
                letterSpacing: '0.06em',
                color: '#3E2723',
                margin: 0,
                borderBottom: '2px solid #F4C430',
                paddingBottom: 2,
              }}
            >
              NEIGHBORHOOD REVIEWS
            </h3>
            <button
              onClick={() => setShowResenaModal(true)}
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 13,
                letterSpacing: '0.06em',
                color: '#1565C0',
                background: 'none',
                border: '1.5px solid #1565C0',
                borderRadius: 4,
                padding: '4px 10px',
                cursor: 'pointer',
              }}
            >
              + LEAVE REVIEW
            </button>
          </div>

          {resenas.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '24px', background: '#fff', borderRadius: 8 }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: '#5D4037', fontSize: 15 }}>
                "Be the first to review. The neighborhood listens."
              </p>
            </div>
          ) : (
            resenas.map((r) => (
              <div
                key={r.id}
                style={{
                  background: '#fff',
                  borderRadius: 8,
                  border: '1.5px solid rgba(62,39,35,0.1)',
                  padding: '12px',
                  marginBottom: 10,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: '#F5C6C2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: 14,
                      color: '#C0392B',
                      flexShrink: 0,
                    }}
                  >
                    {r.usuario_nombre.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 13, color: '#3E2723' }}>
                      {r.usuario_nombre}
                    </div>
                    <RatingStars rating={r.rating} />
                  </div>
                  <span style={{ marginLeft: 'auto', fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 11, color: '#9e9e9e' }}>
                    {Math.floor((Date.now() - new Date(r.created_at).getTime()) / (86400000))} days
                  </span>
                </div>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 13, color: '#5D4037', margin: 0, lineHeight: 1.6 }}>
                  {r.comentario}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Botón de WhatsApp */}
        {negocio.whatsapp && (
          <a
            href={`https://wa.me/52${negocio.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
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
              textDecoration: 'none',
              marginBottom: 80,
              boxSizing: 'border-box',
            }}
          >
            <MessageCircle size={18} />
            CONTACT VIA WHATSAPP
          </a>
        )}
      </div>

      {/* Barra fija inferior de CTAs */}
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          maxWidth: 768,
          margin: '0 auto',
          background: '#fff',
          borderTop: '2px solid rgba(62,39,35,0.1)',
          padding: '10px 16px',
          display: 'flex',
          gap: 10,
          zIndex: 100,
        }}
      >
        <button
          onClick={() => setShowVisitaModal(true)}
          style={{
            flex: 3,
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 17,
            letterSpacing: '0.08em',
            color: '#fff',
            background: '#C0392B',
            border: 'none',
            borderBottom: '3px solid #922b21',
            borderRadius: 4,
            padding: '12px',
            cursor: 'pointer',
          }}
        >
          ✓ REGISTER VISIT
        </button>
        <a
          href={`https://maps.google.com/?q=${negocio.lat},${negocio.lng}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 14,
            letterSpacing: '0.06em',
            color: '#3E2723',
            background: '#F4C430',
            border: 'none',
            borderBottom: '3px solid #c49a00',
            borderRadius: 4,
            padding: '12px 8px',
            cursor: 'pointer',
            textDecoration: 'none',
            textAlign: 'center',
          }}
        >
          <MapPin size={14} />
          GO HERE
        </a>
      </div>

      {/* Modal: Confirmar Visita */}
      {showVisitaModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.5)', position: 'absolute', inset: 0 }} onClick={() => !visitaConfirmada && setShowVisitaModal(false)} />
          <div
            style={{
              position: 'relative',
              background: '#FFF8EE',
              borderRadius: '12px 12px 0 0',
              padding: '24px 20px 32px',
              width: '100%',
              maxWidth: 768,
              margin: '0 auto',
              zIndex: 1,
            }}
          >
            {visitaConfirmada ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}><IconEarth size={56} /></div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: '0.06em', color: '#1A7A4A', margin: '0 0 8px' }}>
                  THANK YOU!
                </h3>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 15, color: '#5D4037', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
                  You saved <strong>{distanciaTexto}</strong> and avoided <strong>{co2Ahorrado.toFixed(3)} kg</strong> of CO₂ <IconEarth size={16} />
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: '0.06em', color: '#3E2723', marginBottom: 4 }}>
                  CONFIRM VISIT
                </h3>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 14, color: '#5D4037', marginBottom: 16 }}>
                  {negocio.nombre} · {distanciaTexto}
                </p>

                {/* Preview CO₂ */}
                <div style={{ background: '#C3EDCF', borderRadius: 6, padding: '10px 14px', marginBottom: 16, display: 'flex', gap: 12 }}>
                  <span style={{ fontSize: 24, marginTop: 4 }}><IconEarth size={24} /></span>
                  <div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, letterSpacing: '0.04em', color: '#1A7A4A' }}>
                      YOU SAVE ON THIS VISIT
                    </div>
                    <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 13, color: '#3E2723' }}>
                      {distanciaTexto} · {co2Ahorrado.toFixed(3)} kg CO₂ avoided
                    </div>
                  </div>
                </div>

                {/* Dinero gastado */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 13, color: '#3E2723', display: 'block', marginBottom: 6 }}>
                    How much did you spend? (optional)
                  </label>
                  <input
                    type="number"
                    value={dineroGastado}
                    onChange={(e) => setDineroGastado(e.target.value)}
                    placeholder="$0.00"
                    style={{
                      width: '100%',
                      background: '#FFF8EE',
                      border: '2px solid rgba(62,39,35,0.2)',
                      borderRadius: 4,
                      padding: '9px 12px',
                      fontFamily: "'Nunito', sans-serif",
                      fontWeight: 700,
                      fontSize: 15,
                      color: '#3E2723',
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => (e.target.style.borderColor = '#C0392B')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(62,39,35,0.2)')}
                  />
                </div>

                <button
                  onClick={handleRegistrarVisita}
                  style={{
                    width: '100%',
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 18,
                    letterSpacing: '0.08em',
                    color: '#fff',
                    background: '#C0392B',
                    border: 'none',
                    borderBottom: '3px solid #922b21',
                    borderRadius: 4,
                    padding: '13px',
                    cursor: 'pointer',
                  }}
                >
                  CONFIRM VISIT
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Modal: Dejar Reseña */}
      {showResenaModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 300,
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          <div style={{ flex: 1, background: 'rgba(0,0,0,0.5)', position: 'absolute', inset: 0 }} onClick={() => !resenaEnviada && setShowResenaModal(false)} />
          <div
            style={{
              position: 'relative',
              background: '#FFF8EE',
              borderRadius: '12px 12px 0 0',
              padding: '24px 20px 32px',
              width: '100%',
              maxWidth: 768,
              margin: '0 auto',
              zIndex: 1,
            }}
          >
            {resenaEnviada ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}><IconStar size={48} color="#F4C430" /></div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 24, color: '#C0392B' }}>
                  REVIEW PUBLISHED!
                </h3>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 14, color: '#5D4037' }}>
                  Thank you for sharing your experience with the neighborhood.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: '0.06em', color: '#3E2723', marginBottom: 4 }}>
                  LEAVE REVIEW
                </h3>
                <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 13, color: '#5D4037', marginBottom: 16 }}>
                  {negocio.nombre}
                </p>

                <div style={{ marginBottom: 16, textAlign: 'center' }}>
                  <RatingStars rating={resena.rating} interactive size="lg" onChange={(r) => setResena((p) => ({ ...p, rating: r }))} />
                </div>

                <textarea
                  value={resena.comentario}
                  onChange={(e) => setResena((p) => ({ ...p, comentario: e.target.value }))}
                  placeholder="How was your experience? The neighborhood wants to know..."
                  rows={4}
                  style={{
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
                    resize: 'vertical',
                    boxSizing: 'border-box',
                    marginBottom: 16,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = '#C0392B')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(62,39,35,0.2)')}
                />

                <button
                  onClick={() => {
                    if (resena.rating === 0) return;
                    setResenaEnviada(true);
                    setTimeout(() => setShowResenaModal(false), 2000);
                  }}
                  disabled={resena.rating === 0}
                  style={{
                    width: '100%',
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: 18,
                    letterSpacing: '0.08em',
                    color: '#fff',
                    background: resena.rating === 0 ? '#9e9e9e' : '#C0392B',
                    border: 'none',
                    borderBottom: resena.rating === 0 ? '3px solid #757575' : '3px solid #922b21',
                    borderRadius: 4,
                    padding: '12px',
                    cursor: resena.rating === 0 ? 'not-allowed' : 'pointer',
                  }}
                >
                  PUBLISH REVIEW
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
