'use client';

import { useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'motion/react';
import { Loader } from '@/src/components/Loader';
import { PostHogProvider } from '@/src/components/PostHogProvider';
import { CustomCursor } from '@/src/components/CustomCursor';

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loadingPath, setLoadingPath] = useState<string | null>(
    pathname === '/' ? pathname : null,
  );

  useEffect(() => {
    if (pathname === '/') {
      setLoadingPath(pathname);
    } else {
      setLoadingPath(null);
    }
  }, [pathname]);

  const handleLoadingComplete = useCallback(() => {
    setLoadingPath(null);
  }, []);

  return (
    <PostHogProvider>
      {/* Custom cursor lives here so it works on every page */}
      <CustomCursor />
      <AnimatePresence>
        {loadingPath === '/' && (
          <Loader key={`loader-${loadingPath}`} onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
      {children}
    </PostHogProvider>
  );
}
