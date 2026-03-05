'use client';
export const LogoText = () => (
  <span
    style={{
      fontFamily: 'var(--font-logo)',
      fontSize: '1.2rem',
      letterSpacing: '-0.01em',
      fontOpticalSizing: 'auto',
      fontVariationSettings: '"GRAD" 0',
    } as React.CSSProperties}
  >
    <span className="text-white" style={{ fontWeight: 900 }}>vish</span>
    <span style={{ fontWeight: 400 }}> studio</span>
  </span>
);
