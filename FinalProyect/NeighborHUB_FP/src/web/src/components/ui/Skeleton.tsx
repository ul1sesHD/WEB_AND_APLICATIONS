type Props = {
  className?: string;
  rounded?: boolean;
};

export const Skeleton = ({ className = '', rounded = true }: Props) => (
  <div
    className={[
      'animate-pulse bg-comal/10',
      rounded ? 'rounded-md' : '',
      className,
    ].join(' ')}
    aria-hidden="true"
  />
);
