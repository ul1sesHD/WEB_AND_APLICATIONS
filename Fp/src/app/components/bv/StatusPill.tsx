// Chip de estado: ABIERTO / CERRADO
interface StatusPillProps {
  horario: string;
}

function isAbierto(horario: string): boolean {
  const now = new Date();
  const hour = now.getHours();
  const day = now.getDay(); // 0=Dom, 1=Lun...
  // Lógica simple: si tiene "Lun-Dom" está abierto siempre, si dice "Lun-Sáb" cierra domingo
  if (horario.includes('Lun-Dom')) {
    const match = horario.match(/(\d{2}):(\d{2})-(\d{2}):(\d{2})/);
    if (match) {
      const open = parseInt(match[1]);
      const close = parseInt(match[3]);
      return hour >= open && hour < close;
    }
  }
  // Por defecto, entre 7am y 8pm está abierto
  return hour >= 7 && hour < 20;
}

export function StatusPill({ horario }: StatusPillProps) {
  const abierto = isAbierto(horario);
  return (
    <span
      style={{
        display: 'inline-block',
        fontFamily: "'Bebas Neue', sans-serif",
        fontSize: 11,
        letterSpacing: '0.06em',
        padding: '2px 6px',
        borderRadius: 3,
        background: abierto ? '#3E2723' : '#e0e0e0',
        color: abierto ? '#F4C430' : '#9e9e9e',
        border: abierto ? '1px solid #1a0d0a' : '1px solid #bdbdbd',
      }}
    >
      {abierto ? 'ABIERTO AHORA' : 'CERRADO'}
    </span>
  );
}
