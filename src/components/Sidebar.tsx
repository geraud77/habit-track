import { Moon, Sparkles, Sun } from 'lucide-react';
import { PRIMARY_NAV, SETTINGS_NAV } from '@/config/navigation';
import { useNav } from '@/context/navigationContext';
import { useThemeContext } from '@/context/themeContext';
import { useHabitStats } from '@/hooks/useHabitStats';
import { NavLinkButton } from '@/components/layout/NavLinkButton';
import { ProgressBar } from '@/components/ui/ProgressBar';

export function Sidebar() {
  const { view, navigate } = useNav();
  const { theme, toggleTheme } = useThemeContext();
  const { doneToday, total } = useHabitStats();

  const progressPct = total > 0 ? Math.round((doneToday / total) * 100) : 0;

  return (
    <div className="flex h-full flex-col select-none">
      <div className="flex h-[52px] shrink-0 items-center gap-2.5 border-b border-edge px-4">
        <div className="flex size-[20px] items-center justify-center rounded-[5px] bg-violet-500/15">
          <Sparkles size={10} className="text-violet-400" aria-hidden />
        </div>
        <span className="text-[13px] font-semibold tracking-[-0.02em] text-foreground">
          HabitFlow
        </span>
      </div>

      <nav className="flex flex-1 flex-col p-2" aria-label="Main navigation">
        <div className="flex flex-col gap-0.5">
          {PRIMARY_NAV.map((item) => (
            <NavLinkButton
              key={item.id}
              label={item.label}
              icon={item.icon}
              isActive={view === item.id}
              onClick={() => navigate(item.id)}
            />
          ))}
        </div>

        <div className="mt-auto flex flex-col gap-0.5 border-t border-edge pt-2">
          <NavLinkButton
            label={SETTINGS_NAV.label}
            icon={SETTINGS_NAV.icon}
            isActive={view === SETTINGS_NAV.id}
            onClick={() => navigate(SETTINGS_NAV.id)}
          />
        </div>
      </nav>

      <div className="shrink-0 space-y-3 border-t border-edge p-4">
        {total > 0 && (
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-[11px] text-subtle">Today's progress</span>
              <span className="tabular-nums text-[11px] font-medium text-muted-foreground">
                {doneToday}/{total}
              </span>
            </div>
            <ProgressBar value={progressPct} />
          </div>
        )}

        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex size-[26px] shrink-0 items-center justify-center rounded-full bg-violet-500/20">
              <span className="text-[10px] font-semibold text-violet-400">A</span>
            </div>
            <div className="min-w-0">
              <p className="truncate text-[12px] font-medium text-foreground">Alex Johnson</p>
              <p className="text-[10px] text-subtle">Free plan</p>
            </div>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="shrink-0 rounded-md p-1.5 text-subtle transition-all duration-150 hover:bg-surface hover:text-muted-foreground active:scale-90"
          >
            {theme === 'dark' ? (
              <Sun size={13} strokeWidth={1.8} aria-hidden />
            ) : (
              <Moon size={13} strokeWidth={1.8} aria-hidden />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
