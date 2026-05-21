import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CompletionCheckboxProps {
  completed: boolean;
  activeClassName: string;
  size?: 'sm' | 'md';
  className?: string;
}

/**
 * Habit completion control with a pop-in check animation when toggled on.
 */
export function CompletionCheckbox({
  completed,
  activeClassName,
  size = 'sm',
  className,
}: CompletionCheckboxProps) {
  const dim = size === 'sm' ? 'size-[17px]' : 'size-[20px]';
  const iconSize = size === 'sm' ? 9 : 11;

  return (
    <div
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full border transition-all duration-200',
        dim,
        completed
          ? [activeClassName, 'border-transparent scale-100']
          : 'border-edge-strong scale-100 hover:border-muted-foreground/40',
        className,
      )}
    >
      {completed && (
        <Check
          size={iconSize}
          strokeWidth={2.5}
          className="animate-check-pop"
          aria-hidden
        />
      )}
    </div>
  );
}
