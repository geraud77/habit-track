import { format } from 'date-fns';
import { ChevronDown, Moon, Search, Sun } from 'lucide-react';
import { PAGE_LABELS } from '@/config/navigation';
import { useCommandPalette } from '@/context/commandPaletteContext';
import { useNav } from '@/context/navigationContext';
import { useThemeContext } from '@/context/themeContext';
import { MOD } from '@/lib/shortcuts';
import { cn } from '@/lib/utils';

export function TopBar() {
  const { view } = useNav();
  const { open } = useCommandPalette();
  const { theme, toggleTheme } = useThemeContext();

  return (
    <header className="flex h-[49px] shrink-0 items-center justify-between border-b border-edge px-4 md:px-6">
      <div className="flex min-w-0 items-center gap-1.5 text-[13px]">
        <span className="font-medium text-subtle">HabitFlow</span>
        <span className="text-subtle/50 select-none" aria-hidden>
          /
        </span>
        <span className="truncate font-medium text-foreground">{PAGE_LABELS[view]}</span>
      </div>

      <div className="flex items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          onClick={() => open()}
          className={cn(
            'flex items-center gap-2 rounded-lg border border-edge bg-surface px-2.5 py-1.5',
            'text-[12px] text-subtle transition-colors hover:border-edge-strong hover:text-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40',
          )}
          aria-label="Open command palette"
        >
          <Search size={14} strokeWidth={1.75} aria-hidden />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden rounded border border-edge bg-background px-1 font-mono text-[10px] md:inline">
            {MOD}K
          </kbd>
        </button>

        <span className="hidden text-[11px] tabular-nums text-subtle select-none lg:block">
          {format(new Date(), 'EEE, MMM d')}
        </span>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className={cn(
            'rounded-lg p-2 text-subtle transition-colors hover:bg-surface hover:text-foreground',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40',
          )}
        >
          {theme === 'dark' ? (
            <Sun size={16} strokeWidth={1.75} aria-hidden />
          ) : (
            <Moon size={16} strokeWidth={1.75} aria-hidden />
          )}
        </button>

        <button
          type="button"
          aria-label="User profile"
          className={cn(
            'flex items-center gap-2 rounded-full py-1 pl-1 pr-2.5',
            'transition-all duration-150 hover:bg-surface active:scale-[0.98]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/40',
          )}
        >
          <div
            aria-hidden
            className="flex size-[24px] shrink-0 items-center justify-center rounded-full bg-violet-500/20"
          >
            <span className="text-[10px] font-semibold text-violet-400">A</span>
          </div>
          <span className="hidden text-[12px] font-medium text-foreground sm:block">Alex</span>
          <ChevronDown size={10} strokeWidth={2} className="text-subtle" aria-hidden />
        </button>
      </div>
    </header>
  );
}
