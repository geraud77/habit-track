import { useState } from 'react';
import { Download, Keyboard, Moon, RotateCcw, Sparkles, Sun, Trash2 } from 'lucide-react';
import { useAppMode } from '@/context/appModeContext';
import { useCommandPalette } from '@/context/commandPaletteContext';
import { useHabits } from '@/context/useHabits';
import { useOnboarding } from '@/context/onboardingContext';
import { useThemeContext } from '@/context/themeContext';
import { SettingsRow, SettingsSection, SETTINGS_ROW_BTN } from '@/components/settings/SettingsRow';
import { PageHeader } from '@/components/PageHeader';
import { exportHabitsJson } from '@/lib/export';
import { MOD } from '@/lib/shortcuts';
import { cn } from '@/lib/utils';

export function SettingsView() {
  const { theme, toggleTheme } = useThemeContext();
  const { habits, clearAllHabits, loadDemoHabits } = useHabits();
  const { resetOnboarding } = useOnboarding();
  const { showLanding } = useAppMode();
  const { open, openShortcuts } = useCommandPalette();
  const [confirmClear, setConfirmClear] = useState(false);

  function handleClear() {
    clearAllHabits();
    setConfirmClear(false);
  }

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-7 px-6 py-7 pb-24 md:pb-10">
      <PageHeader title="Settings" />

      <SettingsSection title="Appearance">
        <SettingsRow
          label="Theme"
          description={`Currently using ${theme} mode`}
          action={
            <button type="button" onClick={toggleTheme} className={SETTINGS_ROW_BTN}>
              {theme === 'dark' ? (
                <Sun size={12} strokeWidth={1.8} />
              ) : (
                <Moon size={12} strokeWidth={1.8} />
              )}
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </button>
          }
        />
      </SettingsSection>

      <SettingsSection title="Shortcuts">
        <SettingsRow
          label="Command palette"
          description="Search pages, habits, and actions"
          action={
            <button type="button" onClick={() => open()} className={SETTINGS_ROW_BTN}>
              <Keyboard size={12} strokeWidth={1.8} />
              {MOD}K
            </button>
          }
        />
        <SettingsRow
          label="Keyboard shortcuts"
          description="View all hotkeys"
          action={
            <button type="button" onClick={openShortcuts} className={SETTINGS_ROW_BTN}>
              ?
            </button>
          }
        />
      </SettingsSection>

      <SettingsSection title="Data">
        <SettingsRow
          label="Replay onboarding"
          description="See the welcome flow and first-habit setup again"
          action={
            <button type="button" onClick={resetOnboarding} className={SETTINGS_ROW_BTN}>
              <RotateCcw size={12} strokeWidth={1.8} />
              Replay
            </button>
          }
        />
        <SettingsRow
          label="Load demo data"
          description="Replace habits with sample data for preview"
          action={
            <button type="button" onClick={loadDemoHabits} className={SETTINGS_ROW_BTN}>
              <Sparkles size={12} strokeWidth={1.8} />
              Load demo
            </button>
          }
        />
        <SettingsRow
          label="Export habits"
          description="Download your full habit history as JSON"
          action={
            <button
              type="button"
              onClick={() => exportHabitsJson(habits)}
              className={SETTINGS_ROW_BTN}
            >
              <Download size={12} strokeWidth={1.8} />
              Export
            </button>
          }
        />
        <SettingsRow
          label="Clear all habits"
          description={
            habits.length > 0
              ? `Permanently delete ${habits.length} habit${habits.length === 1 ? '' : 's'} and all history`
              : 'No habits to clear'
          }
          action={
            confirmClear ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setConfirmClear(false)}
                  className="text-[12px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="rounded-lg bg-rose-500 px-3 py-1.5 text-[12px] font-medium text-white transition-colors hover:bg-rose-600"
                >
                  Confirm
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                disabled={habits.length === 0}
                className={cn(
                  'flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-medium transition-colors',
                  'border-rose-500/30 text-rose-400 hover:bg-rose-500/10',
                  'disabled:pointer-events-none disabled:opacity-30',
                )}
              >
                <Trash2 size={12} strokeWidth={1.8} />
                Clear all
              </button>
            )
          }
        />
      </SettingsSection>

      <SettingsSection title="Portfolio">
        <SettingsRow
          label="Marketing homepage"
          description="Return to the landing page for demos and recruiters"
          action={
            <button type="button" onClick={showLanding} className={SETTINGS_ROW_BTN}>
              View homepage
            </button>
          }
        />
      </SettingsSection>

      <SettingsSection title="About">
        <div className="space-y-1 bg-surface px-4 py-3">
          <p className="text-[13px] font-medium text-foreground">HabitFlow</p>
          <p className="text-[12px] text-subtle">
            Built with React 19, TypeScript, Tailwind CSS v4, and Vite.
          </p>
          <p className="text-[12px] text-subtle">
            Drag-and-drop via{' '}
            <code className="rounded bg-surface-raised px-1 py-0.5 font-mono text-[10px]">
              @dnd-kit
            </code>
            . Local storage persistence. No backend.
          </p>
        </div>
      </SettingsSection>
    </div>
  );
}
