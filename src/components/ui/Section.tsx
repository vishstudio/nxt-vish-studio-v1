'use client';
import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  fullWidth?: boolean;
}

export const Section = ({ children, className = '', id, fullWidth = false }: SectionProps) => {
  return (
    <section className={`px-6 md:px-12 ${className}`} id={id}>
      {fullWidth ? (
        children
      ) : (
        <div className="max-w-[1400px] mx-auto w-full">
          {children}
        </div>
      )}
    </section>
  );
};
