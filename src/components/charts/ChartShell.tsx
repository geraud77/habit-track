import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ChartShellProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  footer?: ReactNode;
}

export function ChartShell({ title, subtitle, children, className, footer }: ChartShellProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-edge bg-surface p-5 shadow-card',
        className,
      )}
    >
      <div className="mb-4 flex items-baseline justify-between gap-2">
        <span className="label">{title}</span>
        {subtitle && (
          <span className="text-[10px] text-subtle">{subtitle}</span>
        )}
      </div>
      {children}
      {footer && <div className="mt-3 border-t border-edge pt-3">{footer}</div>}
    </div>
  );
}
