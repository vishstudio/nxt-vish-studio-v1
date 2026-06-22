'use client';
import React from 'react';
import { Navbar } from '../../navbar/navbar';
import { ScrollCircular } from '../../scroll-circular/scroll-circular';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
  showScrollPrompt?: boolean;
}

export const PageLayout = ({ children, className = '', showScrollPrompt = true }: PageLayoutProps) => {
  return (
    <div className={`page-layout ${className} bg-vish-bg min-h-screen text-white selection:bg-vish-accent selection:text-black`}>
      <Navbar />
      {showScrollPrompt ? <ScrollCircular /> : null}
      <main className="pt-32">
        {children}
      </main>
    </div>
  );
};
