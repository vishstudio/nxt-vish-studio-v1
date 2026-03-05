'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { Loader } from '@/src/components/Loader';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <Loader key="loader" onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
