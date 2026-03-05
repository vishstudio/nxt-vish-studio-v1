'use client';

import posthog from 'posthog-js';
import { PostHogProvider as PHProvider, usePostHog } from 'posthog-js/react';
import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

// ── Init ──────────────────────────────────────────────────────────────────────
// Only boot once, on the client, when the key is present.
if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
    // Don't fire the initial $pageview automatically — we capture it ourselves
    // below so Next.js client-side navigations are tracked too.
    capture_pageview: false,
    // Respect Do Not Track headers
    respect_dnt: true,
    persistence: 'localStorage+cookie',
    // ── Session replay ────────────────────────────────────────────────────────
    session_recording: {
      // Record all sessions (set to e.g. 0.5 to sample 50% if volume is high)
      recordCrossOriginIframes: false,
    },
    // Also capture console errors in the recording timeline
    enable_recording_console_log: true,
  });
}

// ── Page-view tracker ─────────────────────────────────────────────────────────
// Needs to be in a Suspense boundary because useSearchParams() suspends.
function PostHogPageViewInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const ph = usePostHog();

  useEffect(() => {
    if (!ph) return;
    const url =
      pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    ph.capture('$pageview', { $current_url: window.location.origin + url });
  }, [pathname, searchParams, ph]);

  return null;
}

function PostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageViewInner />
    </Suspense>
  );
}

// ── Provider export ───────────────────────────────────────────────────────────
export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider client={posthog}>
      <PostHogPageView />
      {children}
    </PHProvider>
  );
}
