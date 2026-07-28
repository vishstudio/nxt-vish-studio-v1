'use client';
interface SectionTitleProps {
  /** The heading text. Multi-word titles render the last word grey with an accent '.' appended. */
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
  const text = children.trim().replace(/\.+$/, '');
  const words = text.split(/\s+/).filter(Boolean);
  const shouldMuteLastWord = words.length > 1;
  const lastWord = shouldMuteLastWord ? words[words.length - 1] : undefined;
  const leadingText = shouldMuteLastWord ? words.slice(0, -1).join(' ') : text;

  return (
    <h2
      className={`section-title ${className} font-display text-white ${sizes[size]}`}
      data-tina-field={tinaField}
    >
      {leadingText}
      {lastWord && ' '}
      {lastWord && <span className="text-vish-gray">{lastWord}</span>}
      <span className="text-vish-accent">.</span>
    </h2>
  );
};
