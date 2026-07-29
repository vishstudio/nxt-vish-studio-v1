'use client';

interface LogoTextProps {
  suffix?: string;
}

export const LogoText = ({ suffix }: LogoTextProps) => (
  <span
    className="logo-text"
    style={{
      fontFamily: 'var(--font-logo)',
      fontSize: '1.2rem',
      letterSpacing: '0',
      fontOpticalSizing: 'auto',
      fontVariationSettings: '"GRAD" 0',
    } as React.CSSProperties}
  >
    <span className="text-white" style={{ fontWeight: 900 }}>vish</span>
    <span className="text-white" style={{ fontWeight: 900 }}> studio</span>
    {suffix ? <span className="text-white" style={{ fontWeight: 400 }}> {suffix}</span> : null}
  </span>
);
