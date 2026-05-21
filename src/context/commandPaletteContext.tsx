import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from 'react';

interface CommandPaletteContextValue {
  isOpen: boolean;
  showShortcuts: boolean;
  open: (opts?: { showShortcuts?: boolean }) => void;
  openShortcuts: () => void;
  exitShortcuts: () => void;
  close: () => void;
  toggle: () => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextValue | null>(null);

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const open = useCallback((opts?: { showShortcuts?: boolean }) => {
    setShowShortcuts(opts?.showShortcuts ?? false);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setShowShortcuts(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((o) => {
      if (o) setShowShortcuts(false);
      return !o;
    });
  }, []);

  const openShortcuts = useCallback(() => open({ showShortcuts: true }), [open]);
  const exitShortcuts = useCallback(() => setShowShortcuts(false), []);

  return (
    <CommandPaletteContext
      value={{
        isOpen,
        showShortcuts,
        open,
        openShortcuts,
        exitShortcuts,
        close,
        toggle,
      }}
    >
      {children}
    </CommandPaletteContext>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCommandPalette() {
  const ctx = useContext(CommandPaletteContext);
  if (!ctx) throw new Error('useCommandPalette must be used within CommandPaletteProvider');
  return ctx;
}
