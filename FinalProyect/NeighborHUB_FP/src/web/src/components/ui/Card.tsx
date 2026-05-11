import type { HTMLAttributes, ReactNode } from 'react';

type Props = HTMLAttributes<HTMLDivElement> & {
  accentColor?: string;
  children: ReactNode;
};

export const Card = ({ accentColor, className = '', children, ...rest }: Props) => (
  <div
    className={[
      'bg-paper border border-comal/20 rounded-md overflow-hidden shadow-soft',
      className,
    ].join(' ')}
    {...rest}
  >
    {accentColor && (
      <div className="h-[5px] w-full" style={{ backgroundColor: accentColor }} />
    )}
    <div className="p-5">{children}</div>
  </div>
);
