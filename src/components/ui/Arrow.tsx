const PATHS = {
  left: 'M19 12H5M11 6l-6 6 6 6',
  right: 'M5 12h14M13 6l6 6-6 6',
  'up-right': 'M7 17L17 7M9 7h8v8',
};

type ArrowProps = {
  direction?: keyof typeof PATHS;
  className?: string;
};

export function Arrow({ direction = 'right', className }: ArrowProps) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d={PATHS[direction]} />
    </svg>
  );
}
