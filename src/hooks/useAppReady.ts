import { useEffect, useState } from 'react';

/**
 * Brief mount delay so loading skeletons are visible on first paint.
 * Keeps the app from flashing empty → full content instantly.
 */
export function useAppReady(delayMs = 160) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setIsReady(true), delayMs);
    return () => window.clearTimeout(id);
  }, [delayMs]);

  return isReady;
}
