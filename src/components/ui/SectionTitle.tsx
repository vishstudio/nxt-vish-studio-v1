interface SectionTitleProps {
  /** The heading text. The last word will be rendered in the accent colour with a '.' appended. */
  children: string;
  /** Responsive size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  /** Extra classes (e.g. margin, tracking overrides) */
  className?: string;
  /** data-tina-field value for TinaCMS click-to-edit */
  tinaField?: string;
}

const sizes: Record<NonNullable<SectionTitleProps['size']>, string> = {
  sm: 'text-3xl md:text-5xl lg:text-6xl font-medium',
  md: 'text-4xl md:text-5xl lg:text-6xl font-medium',
  lg: 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium',
  xl: 'text-5xl md:text-6xl font-medium',
  '2xl': 'text-6xl md:text-8xl tracking-tight leading-none',
};

export const SectionTitle = ({
  children,
  size = 'md',
  className = '',
  tinaField,
}: SectionTitleProps) => {
  const words = children.trim().split(/\s+/);
  const last = words.pop()!;
  const rest = words.join(' ');

  return (
    <h2
      className={`font-display text-white ${sizes[size]} ${className}`}
      data-tina-field={tinaField}
    >
      {rest && <>{rest} </>}
      <span className="text-vish-accent">{last}.</span>
    </h2>
  );
};
