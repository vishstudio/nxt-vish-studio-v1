'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { COOKIE_CONSENT_KEY } from '@/src/lib/cookie-consent';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function GoogleAnalyticsPageViewInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!window.gtag) return;
    try {
      const storedConsent = window.localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!storedConsent || JSON.parse(storedConsent).analytics !== true) return;
    } catch {
      return;
    }

    const queryString = searchParams?.toString();
    const pagePath = queryString ? `${pathname}?${queryString}` : pathname;

    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname, searchParams]);

  return null;
}

export function GoogleAnalyticsPageView() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsPageViewInner />
    </Suspense>
  );
}
