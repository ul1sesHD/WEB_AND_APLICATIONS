import type { ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost';
type Size    = 'sm' | 'md' | 'lg';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?:    Size;
  fullWidth?: boolean;
  children: ReactNode;
};

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:   'bg-toldo text-white border-comal hover:bg-toldo/90 shadow-hard',
  secondary: 'bg-comal text-paper border-comal hover:bg-comal/90',
  outline:   'bg-transparent text-comal border-comal hover:bg-comal hover:text-paper',
  ghost:     'bg-transparent text-comal border-transparent hover:bg-comal/10',
};

const SIZE_CLASSES: Record<Size, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-5 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button = ({
  variant = 'primary',
  size    = 'md',
  fullWidth,
  className = '',
  children,
  ...rest
}: Props) => (
  <button
    className={[
      'font-display uppercase tracking-wider border-2',
      'rounded-sharp transition-all',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'focus:outline-none focus:ring-2 focus:ring-toldo focus:ring-offset-2',
      VARIANT_CLASSES[variant],
      SIZE_CLASSES[size],
      fullWidth ? 'w-full' : '',
      className,
    ].join(' ')}
    {...rest}
  >
    {children}
  </button>
);
