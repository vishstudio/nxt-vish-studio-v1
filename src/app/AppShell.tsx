'use client';

import { useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'motion/react';
import { Loader } from '@/src/components/loader/loader';
import { CustomCursor } from '@/src/components/custom-cursor/custom-cursor';
import { COOKIE_SETTINGS_OPEN_EVENT } from '@/src/lib/cookie-consent';
import { APP_READY_EVENT } from '@/src/lib/site-events';

const CookieSettings = dynamic(
  () => import('@/src/components/cookie-settings/cookie-settings').then((mod) => mod.CookieSettings),
  { ssr: false },
);

const ServiceWorkerRegistration = dynamic(
  () => import('@/src/components/service-worker-registration/service-worker-registration').then((mod) => mod.ServiceWorkerRegistration),
  { ssr: false },
);

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [loadingPath, setLoadingPath] = useState<string | null>(
    pathname === '/' ? pathname : null,
  );
  const [shouldLoadCookieSettings, setShouldLoadCookieSettings] = useState(false);
  const [cookieSettingsOpenSignal, setCookieSettingsOpenSignal] = useState(0);

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

  useEffect(() => {
    const loadCookieSettings = () => {
      setShouldLoadCookieSettings(true);
    };
    const handleCookieSettingsOpen = () => {
      setShouldLoadCookieSettings(true);
      setCookieSettingsOpenSignal((currentSignal) => currentSignal + 1);
    };

    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(loadCookieSettings, { timeout: 3200 })
      : window.setTimeout(loadCookieSettings, 1800);

    window.addEventListener(COOKIE_SETTINGS_OPEN_EVENT, handleCookieSettingsOpen);

    return () => {
      if (window.cancelIdleCallback) {
        window.cancelIdleCallback(idleId);
      } else {
        window.clearTimeout(idleId);
      }

      window.removeEventListener(COOKIE_SETTINGS_OPEN_EVENT, handleCookieSettingsOpen);
    };
  }, []);

  return (
    <>
      {/* Custom cursor lives here so it works on every page */}
      <CustomCursor />
      <ServiceWorkerRegistration />
      {shouldLoadCookieSettings && (
        <CookieSettings openSignal={cookieSettingsOpenSignal} />
      )}
      <AnimatePresence>
        {loadingPath === '/' && (
          <Loader key={`loader-${loadingPath}`} onLoadingComplete={handleLoadingComplete} />
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
