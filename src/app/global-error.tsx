'use client';

import { ErrorRecovery } from './error-recovery';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en" style={{ backgroundColor: '#000000', color: '#ffffff' }}>
      <body>
        <ErrorRecovery error={error} reset={reset} />
      </body>
    </html>
  );
}
