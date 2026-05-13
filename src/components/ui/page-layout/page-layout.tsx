'use client';
import React from 'react';
import { Navbar } from '../../navbar/navbar';
import { ScrollCircular } from '../../scroll-circular/scroll-circular';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const PageLayout = ({ children, className = '' }: PageLayoutProps) => {
  return (
    <div className={`page-layout ${className} bg-vish-bg min-h-screen text-white selection:bg-vish-accent selection:text-black`}>
      <Navbar />
      <ScrollCircular />
      <main className="pt-32">
        {children}
      </main>
    </div>
  );
};
