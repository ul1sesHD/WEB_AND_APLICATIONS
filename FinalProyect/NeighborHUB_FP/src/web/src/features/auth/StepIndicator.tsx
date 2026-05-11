type Props = { current: number; total: number };

export const StepIndicator = ({ current, total }: Props) => (
  <div className="flex items-center justify-center gap-2" aria-label={`Step ${current} of ${total}`}>
    {Array.from({ length: total }).map((_, idx) => {
      const active = idx + 1 === current;
      const done   = idx + 1 < current;
      return (
        <span
          key={idx}
          className={[
            'h-2 rounded-full transition-all',
            active ? 'w-8 bg-toldo' : done ? 'w-2 bg-toldo/70' : 'w-2 bg-comal/20',
          ].join(' ')}
        />
      );
    })}
  </div>
);
