'use client';

interface LogoTextProps {
  suffix?: string;
  className?: string;
}

export const LogoText = ({ suffix, className = '' }: LogoTextProps) => (
  <span className={`logo-text inline-flex items-center gap-1.5 ${className}`}>
    <img
      src="/assets/logo-text.svg"
      alt="vish studio"
      className="h-auto w-[7rem] select-none md:w-[6rem]"
      draggable={false}
    />
    {suffix ? (
      <span className="font-logo text-[1.2rem] font-normal leading-none text-white">
        {suffix}
      </span>
    ) : null}
  </span>
);
