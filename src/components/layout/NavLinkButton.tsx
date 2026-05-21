import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavLinkButtonProps {
  label: string;
  icon: LucideIcon;
  isActive: boolean;
  onClick: () => void;
  layout?: 'sidebar' | 'mobile';
}

export function NavLinkButton({
  label,
  icon: Icon,
  isActive,
  onClick,
  layout = 'sidebar',
}: NavLinkButtonProps) {
  if (layout === 'mobile') {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-current={isActive ? 'page' : undefined}
        className={cn(
          'flex flex-1 flex-col items-center justify-center gap-1',
          'transition-all duration-200 ease-out active:scale-95',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500/50',
          isActive ? 'text-violet-400' : 'text-subtle hover:text-muted-foreground',
        )}
      >
        <Icon size={18} strokeWidth={1.75} aria-hidden />
        <span className="text-[9px] font-medium">{label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={cn(
        'flex w-full items-center gap-2.5 rounded-[7px] px-2.5 py-[7px]',
        'text-[13px] font-medium transition-all duration-200 ease-out active:scale-[0.98]',
        isActive
          ? 'bg-surface-raised text-foreground'
          : 'text-muted-foreground hover:bg-surface hover:text-foreground',
      )}
    >
      <Icon size={14} strokeWidth={1.8} aria-hidden />
      {label}
    </button>
  );
}
