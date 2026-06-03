'use client';

import { useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'motion/react';
import { Loader } from '@/src/components/loader/loader';
import { CustomCursor } from '@/src/components/custom-cursor/custom-cursor';
import { GoogleAnalytics } from '@/src/components/google-analytics/google-analytics';
import { ProjectInquiryModal } from '@/src/components/project-inquiry-modal/project-inquiry-modal';
import { ServiceWorkerRegistration } from '@/src/components/service-worker-registration/service-worker-registration';

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
    <>
      <GoogleAnalytics />
      {/* Custom cursor lives here so it works on every page */}
      <CustomCursor />
      <ServiceWorkerRegistration />
      <ProjectInquiryModal />
      <AnimatePresence>
        {loadingPath === '/' && (
          <Loader key={`loader-${loadingPath}`} onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
