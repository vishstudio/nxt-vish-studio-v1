'use client';

import { useState, useCallback } from 'react';
import { AnimatePresence } from 'motion/react';
import { Loader } from '@/src/components/Loader';
import { PostHogProvider } from '@/src/components/PostHogProvider';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return (
    <PostHogProvider>
      <AnimatePresence>
        {isLoading && (
          <Loader key="loader" onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
      {children}
    </PostHogProvider>
  );
}
