import { cn } from '@/lib/utils';

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  trackClassName?: string;
  fillClassName?: string;
}

export function Progress({
  value,
  max = 100,
  className,
  trackClassName,
  fillClassName,
}: ProgressProps) {
  const percent = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;

  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      className={cn('h-1.5 w-full overflow-hidden rounded-full', className)}
    >
      <div
        className={cn(
          'h-full rounded-full bg-violet-500 transition-[width] duration-500 ease-out',
          trackClassName,
        )}
      >
        <div className={cn('h-full w-full', fillClassName)} style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}

interface SegmentedProgressProps {
  value: number;
  max: number;
  colorClass?: string;
}

export function SegmentedProgress({
  value,
  max,
  colorClass = 'bg-violet-500',
}: SegmentedProgressProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          className={cn(
            'h-1.5 flex-1 rounded-full transition-all duration-300',
            i < value ? colorClass : 'bg-zinc-800',
          )}
        />
      ))}
    </div>
  );
}
