import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

/**
 * Consistent empty state across all views — icon, copy, optional CTA.
 */
export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-4 rounded-lg border border-dashed border-edge',
        'bg-surface/50 px-6 py-14 text-center animate-fade-up',
        className,
      )}
    >
      <div className="flex size-11 items-center justify-center rounded-lg bg-surface-raised ring-1 ring-edge">
        {Icon ? (
          <Icon size={20} strokeWidth={1.5} className="text-muted-foreground" />
        ) : (
          <span className="text-lg leading-none text-muted-foreground select-none">✦</span>
        )}
      </div>

      <div className="flex max-w-[280px] flex-col gap-1">
        <h3 className="text-[13px] font-medium tracking-[-0.01em] text-foreground">
          {title}
        </h3>
        <p className="text-[12px] leading-relaxed text-muted-foreground">{description}</p>
      </div>

      {action && (
        <button
          type="button"
          onClick={action.onClick}
          className={cn(
            'rounded-md bg-violet-500/10 px-3.5 py-1.5',
            'text-[11px] font-medium text-violet-400',
            'transition-all duration-150',
            'hover:bg-violet-500/20 active:scale-[0.97]',
          )}
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

/** Habits list empty state — used by HabitList */
export function HabitsEmptyState() {
  return (
    <EmptyState
      title="No habits yet"
      description="Add your first habit above to start building your daily routine."
    />
  );
}
