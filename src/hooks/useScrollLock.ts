import { useEffect } from 'react';

/**
 * Locks document scroll for full-viewport app shells (dashboard).
 * Landing and marketing pages use natural document scrolling.
 */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    document.body.classList.toggle('scroll-lock', locked);
    document.documentElement.classList.toggle('scroll-lock', locked);
    return () => {
      document.body.classList.remove('scroll-lock');
      document.documentElement.classList.remove('scroll-lock');
    };
  }, [locked]);
}
