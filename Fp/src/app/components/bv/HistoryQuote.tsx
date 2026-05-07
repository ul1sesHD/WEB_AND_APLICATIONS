// Cita de historia del vendedor — Playfair Display italic
interface HistoryQuoteProps {
  quote: string;
  attribution: string;
}

export function HistoryQuote({ quote, attribution }: HistoryQuoteProps) {
  return (
    <div
      style={{
        borderLeft: '3px solid #C0392B',
        paddingLeft: 16,
        color: '#5D4037',
      }}
    >
      <p
        style={{
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          fontSize: 16,
          lineHeight: 1.7,
          margin: 0,
          marginBottom: 8,
        }}
      >
        "{quote}"
      </p>
      <span
        style={{
          fontFamily: "'Nunito', sans-serif",
          fontWeight: 700,
          fontSize: 13,
          color: '#3E2723',
        }}
      >
        — {attribution}
      </span>
    </div>
  );
}
