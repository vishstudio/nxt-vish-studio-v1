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
    <div className={`page-layout ${className} min-h-screen bg-vish-bg text-white`}>
      <Navbar />
      {showScrollPrompt ? <ScrollCircular /> : null}
      <main className="pt-32">
        {children}
      </main>
    </div>
  );
};
