'use client';

import { Suspense, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function GoogleAnalyticsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const queryString = searchParams?.toString();
    const pagePath = queryString ? `${pathname}?${queryString}` : pathname;

    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };

    window.gtag('event', 'page_view', {
      page_path: pagePath,
      page_location: window.location.href,
      page_title: document.title,
      send_to: GA_MEASUREMENT_ID,
    });
  }, [pathname, searchParams]);

  return null;
}

function isTinaPreviewContext(
  pathname: string | null,
  searchParams: { has: (name: string) => boolean } | null,
) {
  if (pathname?.startsWith('/admin')) {
    return true;
  }

  const tinaPreviewParams = [
    'tina',
    'tina-admin',
    'tina-preview',
    'tinaPreview',
    'visualEditing',
    'preview',
  ];

  if (tinaPreviewParams.some((param) => searchParams?.has(param))) {
    return true;
  }

  if (typeof window === 'undefined') {
    return true;
  }

  let isFramed = false;

  try {
    isFramed = window.self !== window.top;
  } catch {
    isFramed = true;
  }

  const referrer = document.referrer.toLowerCase();
  const isTinaReferrer = referrer.includes('/admin') || referrer.includes('tina');

  return isFramed && isTinaReferrer;
}

function GoogleAnalyticsScripts() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [canRenderAnalytics, setCanRenderAnalytics] = useState(false);

  useEffect(() => {
    setCanRenderAnalytics(
      Boolean(GA_MEASUREMENT_ID) && !isTinaPreviewContext(pathname, searchParams),
    );
  }, [pathname, searchParams]);

  if (!GA_MEASUREMENT_ID) {
    return null;
  }

  if (!canRenderAnalytics) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', { send_page_view: false });
          `,
        }}
      />
      <Suspense fallback={null}>
        <GoogleAnalyticsPageView />
      </Suspense>
    </>
  );
}

export function GoogleAnalytics() {
  return (
    <Suspense fallback={null}>
      <GoogleAnalyticsScripts />
    </Suspense>
  );
}
