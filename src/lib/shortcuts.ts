/** Modifier key label for the current platform */
export const MOD =
  typeof navigator !== 'undefined' &&
  /Mac|iPhone|iPad/i.test(navigator.platform)
    ? '⌘'
    : 'Ctrl';

export interface ShortcutDef {
  keys: string;
  label: string;
}

export const GLOBAL_SHORTCUTS: ShortcutDef[] = [
  { keys: `${MOD}K`, label: 'Open command palette' },
  { keys: `${MOD}⇧L`, label: 'Toggle light / dark mode' },
  { keys: '/', label: 'Add habit (focus input)' },
  { keys: '?', label: 'Keyboard shortcuts' },
  { keys: 'Esc', label: 'Close palette / dialogs' },
];

export const PALETTE_SHORTCUTS: ShortcutDef[] = [
  { keys: '↑ ↓', label: 'Navigate results' },
  { keys: 'Enter', label: 'Run selected command' },
  { keys: 'Esc', label: 'Close' },
];
