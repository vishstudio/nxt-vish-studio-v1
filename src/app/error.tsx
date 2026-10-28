'use client';

import { ErrorRecovery } from './error-recovery';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return <ErrorRecovery error={error} reset={reset} />;
}
