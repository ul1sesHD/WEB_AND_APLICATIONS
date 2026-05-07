// SCR-10: Mi Impacto — dashboard personal
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Share2 } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { useBarrioStore } from '../store/useStore';
import { VISITAS_SEMANALES, CATEGORIAS_VISITADAS } from '../data/mockData';
import { BottomNav } from '../components/bv/BottomNav';
import { IconBike, IconEarth, IconMoney, IconStore } from '../components/bv/AbstractIcon';

type Periodo = 'semana' | 'mes' | 'total';

export function MiImpactoScreen() {
  const navigate = useNavigate();
  const { impacto } = useBarrioStore();
  const [periodo, setPeriodo] = useState<Periodo>('semana');

  // Datos según periodo
  const factor = periodo === 'semana' ? 0.25 : periodo === 'mes' ? 1 : 4.2;
  const kmPeriodo = impacto ? impacto.total_km * factor : 0;
  const co2Periodo = impacto ? impacto.total_co2 * factor : 0;
  const dineroLocalPeriodo = impacto ? impacto.total_dinero_local * factor : 0;
  const visitasPeriodo = impacto ? Math.round(impacto.total_visitas * factor) : 0;

  return (
    <div style={{ background: '#FFF8EE', minHeight: '100vh', paddingBottom: 80, maxWidth: 768, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ background: '#C0392B', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
            <ArrowLeft size={20} />
          </button>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: '0.08em', color: '#F4C430' }}>
            MY IMPACT
          </span>
        </div>
        <button
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            borderRadius: 4,
            padding: '6px 10px',
            cursor: 'pointer',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 12,
            letterSpacing: '0.06em',
          }}
        >
          <Share2 size={14} />
          SHARE
        </button>
      </div>

      {/* Tabs de periodo */}
      <div
        style={{
          display: 'flex',
          background: '#fff',
          borderBottom: '2px solid rgba(62,39,35,0.1)',
        }}
      >
        {(['semana', 'mes', 'total'] as Periodo[]).map((p) => (
          <button
            key={p}
            onClick={() => setPeriodo(p)}
            style={{
              flex: 1,
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 15,
              letterSpacing: '0.06em',
              padding: '10px',
              background: 'transparent',
              border: 'none',
              borderBottom: `3px solid ${periodo === p ? '#C0392B' : 'transparent'}`,
              color: periodo === p ? '#C0392B' : '#5D4037',
              cursor: 'pointer',
              textTransform: 'uppercase',
            }}
          >
            {p === 'semana' ? 'THIS WEEK' : p === 'mes' ? 'THIS MONTH' : 'TOTAL'}
          </button>
        ))}
      </div>

      {/* Métricas principales */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 20 }}>
          {[
            { value: `${kmPeriodo.toFixed(1)} km`, label: 'KM SAVED', color: '#1565C0', Icon: IconBike },
            { value: `${co2Periodo.toFixed(2)} kg`, label: 'CO₂ AVOIDED', color: '#1A7A4A', Icon: IconEarth },
            { value: `$${Math.round(dineroLocalPeriodo).toLocaleString()}`, label: 'LOCAL MONEY', color: '#C0392B', Icon: IconMoney },
            { value: `${visitasPeriodo}`, label: 'VISITS', color: '#E65100', Icon: IconStore },
          ].map((m) => (
            <div
              key={m.label}
              style={{
                background: '#fff',
                borderRadius: 8,
                border: '1.5px solid rgba(62,39,35,0.1)',
                borderTop: `4px solid ${m.color}`,
                padding: '14px',
              }}
            >
              <div style={{ marginBottom: 4 }}><m.Icon size={24} color={m.color} /></div>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 22, letterSpacing: '0.04em', color: m.color, lineHeight: 1 }}>
                {m.value}
              </div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 11, color: '#5D4037', marginTop: 3, letterSpacing: '0.04em' }}>
                {m.label}
              </div>
            </div>
          ))}
        </div>

        {/* Comparativa CO₂ */}
        <div
          style={{
            background: '#C3EDCF',
            borderRadius: 8,
            border: '1.5px solid #1A7A4A33',
            padding: '14px 16px',
            marginBottom: 20,
          }}
        >
          <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 14, color: '#1A7A4A', letterSpacing: '0.04em', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
            <IconEarth size={16} color="#1A7A4A" /> VS. CAR RIDE
          </div>
          <div style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 13, color: '#3E2723', lineHeight: 1.6 }}>
            Your saving of <strong>{co2Periodo.toFixed(2)} kg CO₂</strong> equals <strong>{(co2Periodo / 21).toFixed(1)} rides</strong> in a car for 100 km.
          </div>
        </div>

        {/* Gráfica de visitas semanales */}
        <h3
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 18,
            letterSpacing: '0.06em',
            color: '#3E2723',
            margin: '0 0 12px',
            borderBottom: '2px solid #F4C430',
            paddingBottom: 2,
            display: 'inline-block',
          }}
        >
          VISITS PER WEEK
        </h3>
        <div style={{ height: 180, marginBottom: 24 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={VISITAS_SEMANALES} barSize={24}>
              <XAxis
                dataKey="semana"
                tick={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 11, fill: '#5D4037' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  borderRadius: 6,
                  border: '1.5px solid #C0392B',
                  background: '#FFF8EE',
                }}
              />
              <Bar dataKey="visitas" fill="#C0392B" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Distribución por categoría */}
        <h3
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 18,
            letterSpacing: '0.06em',
            color: '#3E2723',
            margin: '0 0 12px',
            borderBottom: '2px solid #F4C430',
            paddingBottom: 2,
            display: 'inline-block',
          }}
        >
          MOST VISITED CATEGORIES
        </h3>
        <div style={{ height: 200, marginBottom: 24 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={CATEGORIAS_VISITADAS}
                cx="50%"
                cy="50%"
                outerRadius={70}
                dataKey="valor"
                label={({ nombre, percent }) => `${nombre} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {CATEGORIAS_VISITADAS.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  fontFamily: "'Nunito', sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  borderRadius: 6,
                  border: '1.5px solid rgba(62,39,35,0.2)',
                  background: '#FFF8EE',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Botón compartir */}
        <button
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Share2 size={18} />
          SHARE MY IMPACT
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
