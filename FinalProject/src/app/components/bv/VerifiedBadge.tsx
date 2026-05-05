// Badge de negocio verificado
export function VerifiedBadge() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        background: '#1A7A4A',
        color: '#F4C430',
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 11,
        letterSpacing: '0.08em',
        padding: '2px 6px',
        borderRadius: 3,
        border: '1px solid #145a36',
      }}
    >
      ✓ VERIFIED
    </span>
  );
}
