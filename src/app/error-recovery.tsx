'use client';

import { useEffect } from 'react';

const RELOAD_KEY = 'vish_error_reload_at';
const RELOAD_WINDOW_MS = 15000;

// Stale chunks after a deploy, aborted RSC fetches and translated DOM all surface as
// transient errors that a single reload fixes. Reload once, then fall back to the UI.
function isRecoverable(error: Error) {
  return /ChunkLoadError|Loading chunk|Connection closed|Failed to fetch|removeChild|insertBefore|NotFoundError|dynamically imported module/i.test(
    `${error.name} ${error.message}`,
  );
}

function reloadOnce() {
  try {
    const last = Number(window.sessionStorage.getItem(RELOAD_KEY) ?? 0);
    if (Date.now() - last < RELOAD_WINDOW_MS) return false;
    window.sessionStorage.setItem(RELOAD_KEY, String(Date.now()));
  } catch {
    return false;
  }
  window.location.reload();
  return true;
}

export const ErrorRecovery = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    if (isRecoverable(error)) reloadOnce();
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-black px-6 text-center text-white">
      <h1 className="text-2xl font-semibold">Something went wrong</h1>
      <p className="max-w-md text-sm text-gray-400">
        The page hit an unexpected error. Reloading usually fixes it.
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-full border border-white/20 px-5 py-2 text-sm hover:bg-white/10"
        >
          Try again
        </button>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="rounded-full bg-white px-5 py-2 text-sm text-black"
        >
          Reload page
        </button>
      </div>
    </main>
  );
};
