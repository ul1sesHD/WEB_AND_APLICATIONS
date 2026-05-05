// Banner de impacto ambiental
interface ImpactBannerProps {
  km: number;
  co2: number;
  dineroLocal: number;
}

export function ImpactBanner({ km, co2, dineroLocal }: ImpactBannerProps) {
  return (
    <div
      style={{
        background: '#1A7A4A',
        padding: '12px 16px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 22,
            color: '#fff',
            letterSpacing: '0.04em',
          }}
        >
          🚶 {km.toFixed(1)} km
        </div>
        <div
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            color: 'rgba(255,255,255,0.75)',
            marginTop: 2,
          }}
        >
          Km ahorrados
        </div>
      </div>

      <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.3)' }} />

      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 22,
            color: '#fff',
            letterSpacing: '0.04em',
          }}
        >
          🌿 {co2.toFixed(2)} kg
        </div>
        <div
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            color: 'rgba(255,255,255,0.75)',
            marginTop: 2,
          }}
        >
          CO₂ evitado
        </div>
      </div>

      <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.3)' }} />

      <div style={{ textAlign: 'center' }}>
        <div
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 22,
            color: '#fff',
            letterSpacing: '0.04em',
          }}
        >
          💵 ${dineroLocal.toLocaleString()}
        </div>
        <div
          style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: 700,
            fontSize: 11,
            color: 'rgba(255,255,255,0.75)',
            marginTop: 2,
          }}
        >
          Dinero local
        </div>
      </div>
    </div>
  );
}
