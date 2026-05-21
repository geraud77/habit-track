import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PanelProps {
  children: ReactNode;
  className?: string;
}

/** Standard elevated card surface used across dashboard and analytics */
export function Panel({ children, className }: PanelProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-edge bg-surface p-4 shadow-card',
        className,
      )}
    >
      {children}
    </div>
  );
}
