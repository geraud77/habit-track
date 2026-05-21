import type { ReactNode } from 'react';
import { useNav } from '@/context/navigationContext';
import { cn } from '@/lib/utils';

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * Directional page enter animation based on sidebar nav order.
 */
export function PageTransition({ children }: PageTransitionProps) {
  const { view, direction } = useNav();

  return (
    <div
      key={view}
      className={cn(
        'min-h-full page-enter',
        direction === 'forward' && 'page-enter-forward',
        direction === 'back' && 'page-enter-back',
      )}
    >
      {children}
    </div>
  );
}
