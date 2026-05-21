import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

/**
 * Consistent page-level heading used across all views.
 * 18px / semibold is the premium SaaS standard — large enough to anchor the page,
 * restrained enough to not dominate it.
 */
export function PageHeader({ title, subtitle, action }: PageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 pb-2">
      <div>
        <h1 className="text-[17px] font-semibold leading-tight tracking-[-0.022em] text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-0.5 text-[12px] text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {action && <div className="mt-0.5 shrink-0">{action}</div>}
    </div>
  );
}
