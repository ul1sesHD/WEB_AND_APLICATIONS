import { useEffect, useRef, useState } from 'react';

type Props = {
  value:    number;
  label:    string;
  suffix?:  string;
  color?:   string;
  duration?: number;
};

export const ImpactCounter = ({ value, label, suffix = '', color, duration = 1200 }: Props) => {
  const [display, setDisplay] = useState(0);
  const startedAt = useRef<number | null>(null);

  useEffect(() => {
    let raf = 0;
    const tick = (now: number): void => {
      if (startedAt.current === null) startedAt.current = now;
      const elapsed = now - startedAt.current;
      const ratio   = Math.min(elapsed / duration, 1);
      setDisplay(Math.round(value * ratio));
      if (ratio < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return (
    <div className="flex flex-col items-center text-center">
      <span
        className="font-display text-5xl md:text-6xl tracking-wider"
        style={{ color: color ?? 'inherit' }}
      >
        {display.toLocaleString()}
        {suffix}
      </span>
      <span className="font-body text-sm uppercase tracking-widest mt-1">{label}</span>
    </div>
  );
};
