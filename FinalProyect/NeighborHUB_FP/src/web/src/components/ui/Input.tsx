import { forwardRef, type InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  hint?:  string;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, hint, className = '', id, ...rest }, ref) => {
    const inputId = id ?? rest.name;
    return (
      <div className="flex flex-col gap-1">
        {label && (
          <label
            htmlFor={inputId}
            className="font-body font-bold text-comal text-sm uppercase tracking-wide"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={[
            'bg-paper border-2 rounded-sharp px-4 py-3',
            'font-body text-comal placeholder-comal/40',
            'focus:outline-none transition-colors',
            error ? 'border-toldo focus:border-toldo' : 'border-comal/30 focus:border-toldo',
            className,
          ].join(' ')}
          aria-invalid={Boolean(error)}
          {...rest}
        />
        {error && <span className="text-toldo text-sm font-body font-bold">{error}</span>}
        {hint && !error && <span className="text-adobe text-sm font-body">{hint}</span>}
      </div>
    );
  },
);

Input.displayName = 'Input';
