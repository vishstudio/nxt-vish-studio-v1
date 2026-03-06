'use client';
import React from 'react';
import { Navbar } from '../Navbar';
import { ScrollCircular } from '../ScrollCircular';

interface PageLayoutProps {
  children: React.ReactNode;
  className?: string;
}

export const PageLayout = ({ children, className = '' }: PageLayoutProps) => {
  return (
    <div className={`bg-vish-bg min-h-screen text-white selection:bg-vish-accent selection:text-black ${className}`}>
      <Navbar />
      <ScrollCircular />
      <main className="pt-32">
        {children}
      </main>
    </div>
  );
};
