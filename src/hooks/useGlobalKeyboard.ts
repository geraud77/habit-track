import { useEffect } from 'react';
import { useCommandPalette } from '@/context/commandPaletteContext';
import { useNav } from '@/context/navigationContext';
import { useThemeContext } from '@/context/themeContext';

const FOCUS_HABIT_FORM = 'habitflow:focus-habit-form';

/** Register app-wide keyboard shortcuts (command palette, theme, navigation helpers). */
export function useGlobalKeyboard() {
  const { open, close, isOpen, toggle } = useCommandPalette();
  const { navigate } = useNav();
  const { toggleTheme } = useThemeContext();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const target = e.target;
      const inInput =
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement ||
        (target instanceof HTMLElement && target.isContentEditable);

      const mod = e.metaKey || e.ctrlKey;

      // Escape — close palette first
      if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        close();
        return;
      }

      // Command palette
      if (mod && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggle();
        return;
      }

      // Theme toggle
      if (mod && e.shiftKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        toggleTheme();
        return;
      }

      if (inInput) return;

      // Shortcuts help (Shift + /)
      if (e.key === '?') {
        e.preventDefault();
        open({ showShortcuts: true });
        return;
      }

      // Focus add-habit form
      if (e.key === '/') {
        e.preventDefault();
        navigate('habits');
        requestAnimationFrame(() => {
          window.dispatchEvent(new CustomEvent(FOCUS_HABIT_FORM));
        });
        return;
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, close, isOpen, toggle, toggleTheme, navigate]);
}

export { FOCUS_HABIT_FORM };
