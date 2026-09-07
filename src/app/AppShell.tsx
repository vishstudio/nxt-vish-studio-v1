'use client';

import { useState, useCallback, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'motion/react';
import { Loader } from '@/src/components/loader/loader';
import { CustomCursor } from '@/src/components/custom-cursor/custom-cursor';
import { COOKIE_SETTINGS_OPEN_EVENT } from '@/src/lib/cookie-consent';
import { APP_READY_EVENT, HERO_REVEALED_EVENT } from '@/src/lib/site-events';

const CookieSettings = dynamic(
  () => import('@/src/components/cookie-settings/cookie-settings').then((mod) => mod.CookieSettings),
  { ssr: false },
);

const ServiceWorkerRegistration = dynamic(
  () => import('@/src/components/service-worker-registration/service-worker-registration').then((mod) => mod.ServiceWorkerRegistration),
  { ssr: false },
);

const NewsletterPopup = dynamic(
  () => import('@/src/components/newsletter-popup/newsletter-popup').then((mod) => mod.NewsletterPopup),
  { ssr: false },
);

export const AppShell = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [loadingPath, setLoadingPath] = useState<string | null>(
    pathname === '/' ? pathname : null,
  );
  const [isHomeScrollLocked, setIsHomeScrollLocked] = useState(pathname === '/');
  const [shouldLoadCookieSettings, setShouldLoadCookieSettings] = useState(false);
  const [cookieSettingsOpenSignal, setCookieSettingsOpenSignal] = useState(0);

  useEffect(() => {
    if (pathname === '/') {
      setLoadingPath(pathname);
      setIsHomeScrollLocked(true);
    } else {
      setLoadingPath(null);
      setIsHomeScrollLocked(false);
    }
  }, [pathname]);

  const handleLoadingComplete = useCallback(() => {
    setLoadingPath(null);
    window.dispatchEvent(new Event(APP_READY_EVENT));
  }, []);

  useEffect(() => {
    const unlockHomeScroll = () => setIsHomeScrollLocked(false);

    window.addEventListener(HERO_REVEALED_EVENT, unlockHomeScroll);
    return () => window.removeEventListener(HERO_REVEALED_EVENT, unlockHomeScroll);
  }, []);

  useEffect(() => {
    if (!isHomeScrollLocked) return undefined;

    const htmlOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
    };
  }, [isHomeScrollLocked]);

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
      <NewsletterPopup />
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
