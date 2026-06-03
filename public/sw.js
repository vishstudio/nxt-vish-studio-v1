const CACHE_VERSION = 'vish-studio-v1';
const STATIC_CACHE = `${CACHE_VERSION}-static`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;
const MAX_RUNTIME_ENTRIES = 80;

const PRECACHE_URLS = [
  '/',
  '/assets/icon.svg',
  '/assets/favicon.png',
];

const shouldSkipRequest = (request) => {
  const url = new URL(request.url);

  return (
    request.method !== 'GET' ||
    url.pathname.startsWith('/admin') ||
    url.pathname.startsWith('/api') ||
    url.pathname.includes('tina') ||
    url.pathname.includes('emailjs')
  );
};

const trimCache = async (cacheName, maxEntries) => {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();

  if (keys.length <= maxEntries) return;

  await cache.delete(keys[0]);
  await trimCache(cacheName, maxEntries);
};

const cacheFirst = async (request) => {
  const cached = await caches.match(request);
  if (cached) return cached;

  const response = await fetch(request);
  if (response && response.ok) {
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, response.clone());
    trimCache(RUNTIME_CACHE, MAX_RUNTIME_ENTRIES);
  }

  return response;
};

const staleWhileRevalidate = async (request) => {
  const cache = await caches.open(RUNTIME_CACHE);
  const cached = await cache.match(request);
  const networkResponsePromise = fetch(request)
    .then((response) => {
      if (response && response.ok) {
        cache.put(request, response.clone());
        trimCache(RUNTIME_CACHE, MAX_RUNTIME_ENTRIES);
      }

      return response;
    })
    .catch(() => cached);

  return cached || networkResponsePromise;
};

const networkFirst = async (request) => {
  const cache = await caches.open(RUNTIME_CACHE);

  try {
    const response = await fetch(request);
    if (response && response.ok) {
      cache.put(request, response.clone());
      trimCache(RUNTIME_CACHE, MAX_RUNTIME_ENTRIES);
    }

    return response;
  } catch {
    return cache.match(request) || caches.match('/');
  }
};

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting()),
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => !key.startsWith(CACHE_VERSION))
          .map((key) => caches.delete(key)),
      ))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (shouldSkipRequest(request)) return;

  const url = new URL(request.url);
  const isNavigation = request.mode === 'navigate';
  const isStaticAsset = url.pathname.startsWith('/_next/static/')
    || url.pathname.startsWith('/assets/')
    || url.pathname.startsWith('/uploads/');
  const isExternalAsset = ['image', 'font', 'style'].includes(request.destination);

  if (isNavigation) {
    event.respondWith(networkFirst(request));
    return;
  }

  if (isStaticAsset) {
    event.respondWith(cacheFirst(request));
    return;
  }

  if (isExternalAsset) {
    event.respondWith(staleWhileRevalidate(request));
  }
});
