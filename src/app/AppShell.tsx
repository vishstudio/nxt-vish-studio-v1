'use client';

import { useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'motion/react';
import { Loader } from '@/src/components/loader/loader';
import { CustomCursor } from '@/src/components/custom-cursor/custom-cursor';
import { APP_READY_EVENT } from '@/src/lib/site-events';

const CookieSettings = dynamic(
  () => import('@/src/components/cookie-settings/cookie-settings').then((mod) => mod.CookieSettings),
  { ssr: false },
);

const ServiceWorkerRegistration = dynamic(
  () => import('@/src/components/service-worker-registration/service-worker-registration').then((mod) => mod.ServiceWorkerRegistration),
  { ssr: false },
);

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
    window.dispatchEvent(new Event(APP_READY_EVENT));
  }, []);

  return (
    <>
      {/* Custom cursor lives here so it works on every page */}
      <CustomCursor />
      <ServiceWorkerRegistration />
      <CookieSettings />
      <AnimatePresence>
        {loadingPath === '/' && (
          <Loader key={`loader-${loadingPath}`} onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
