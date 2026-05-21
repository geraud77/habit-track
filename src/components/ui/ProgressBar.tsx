import { cn } from '@/lib/utils';

interface ProgressBarProps {
  /** 0–100 */
  value: number;
  className?: string;
  barClassName?: string;
  /** Taller bar for emphasis (e.g. sidebar) */
  size?: 'sm' | 'md';
}

/**
 * Animated progress fill — width transitions with a smooth easing curve.
 */
export function ProgressBar({
  value,
  className,
  barClassName,
  size = 'sm',
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn(
        'overflow-hidden rounded-full bg-edge',
        size === 'sm' ? 'h-[3px]' : 'h-1.5',
        className,
      )}
      role="progressbar"
      aria-valuenow={clamped}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={cn(
          'h-full rounded-full progress-fill',
          barClassName ?? 'bg-violet-500',
        )}
        style={{ width: `${clamped}%` }}
      />
    </div>
  );
}
