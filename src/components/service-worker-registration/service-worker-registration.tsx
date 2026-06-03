'use client';

import { useEffect } from 'react';

export const ServiceWorkerRegistration = () => {
  useEffect(() => {
    if (!('serviceWorker' in navigator) || process.env.NODE_ENV !== 'production') {
      return;
    }

    const registerServiceWorker = () => {
      navigator.serviceWorker.register('/sw.js').catch(() => {
        // Caching should never block the app if registration fails.
      });
    };

    if (document.readyState === 'complete') {
      registerServiceWorker();
      return;
    }

    window.addEventListener('load', registerServiceWorker, { once: true });

    return () => {
      window.removeEventListener('load', registerServiceWorker);
    };
  }, []);

  return null;
};
