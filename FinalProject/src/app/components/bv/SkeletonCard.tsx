// Tarjeta esqueleto de carga
export function SkeletonCard() {
  return (
    <div
      style={{
        width: 168,
        minWidth: 168,
        height: 200,
        background: '#FFF8EE',
        borderRadius: 8,
        border: '1.5px solid rgba(62,39,35,0.1)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, transparent 0%, rgba(62,39,35,0.05) 50%, transparent 100%)',
          animation: 'shimmer 1.5s infinite',
        }}
      />
      <div style={{ height: 5, background: '#e0d5c8' }} />
      <div style={{ height: 72, background: '#f0e8db' }} />
      <div style={{ padding: '8px 10px' }}>
        <div style={{ height: 12, width: '60%', background: '#e0d5c8', borderRadius: 3, marginBottom: 6 }} />
        <div style={{ height: 16, width: '90%', background: '#e0d5c8', borderRadius: 3, marginBottom: 6 }} />
        <div style={{ height: 12, width: '50%', background: '#e0d5c8', borderRadius: 3 }} />
      </div>
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}

export function SkeletonListItem() {
  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        padding: '10px 16px',
        borderBottom: '1px solid rgba(62,39,35,0.1)',
        background: '#FFF8EE',
      }}
    >
      <div style={{ width: 44, height: 44, borderRadius: 6, background: '#e0d5c8', flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ height: 14, width: '70%', background: '#e0d5c8', borderRadius: 3, marginBottom: 6 }} />
        <div style={{ height: 12, width: '50%', background: '#e0d5c8', borderRadius: 3 }} />
      </div>
      <div style={{ width: 40 }}>
        <div style={{ height: 16, background: '#e0d5c8', borderRadius: 3 }} />
      </div>
    </div>
  );
}
